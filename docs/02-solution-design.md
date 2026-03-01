# X8 AG TimeStamping Service — Solution Design

## Overview

This document describes the technical architecture and design decisions for the X8 AG TimeStamping Service. It is intended for technical stakeholders including architects, tech leads, and senior developers.

---

## System Architecture

### High-Level Components

```
┌─────────────────────────────────────────────────────────────────────┐
│                           User's Browser                            │
├─────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────┐ │
│  │  React Frontend │  │  Wallet Provider │  │  File Hash Engine  │ │
│  │  (Vite + TS)    │  │  (MetaMask etc)  │  │  (Web Crypto API)  │ │
│  └────────┬────────┘  └────────┬────────┘  └──────────┬──────────┘ │
│           │                    │                      │            │
│           └────────────────────┼──────────────────────┘            │
│                                │                                    │
└────────────────────────────────┼────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        Ethereum Network                             │
├─────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                  TimestampRegistry Contract                  │   │
│  │  - registerTimestamp(bytes32 hash, string metadata)         │   │
│  │  - getTimestamp(bytes32 hash) → TimestampRecord             │   │
│  │  - getUserTimestamps(address) → bytes32[]                   │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│                         Sepolia Testnet                             │
└─────────────────────────────────────────────────────────────────────┘
```

### Data Flow

```
1. Document Selection
   User selects file ──► File loaded into browser memory

2. Hash Generation (Client-Side)
   File bytes ──► Web Crypto API ──► SHA-256 hash (32 bytes)

3. Transaction Submission
   Hash + metadata ──► Wallet signature ──► Smart contract call

4. Blockchain Confirmation
   Transaction mined ──► Event emitted ──► Frontend notified

5. Certificate Generation
   On-chain data ──► Certificate template ──► PDF download
```

---

## Smart Contract Design

### TimestampRegistry Contract

The core contract is a registry that maps document hashes to timestamp records.

#### Data Structures

```solidity
struct TimestampRecord {
    address owner;          // Wallet that created the timestamp
    uint256 timestamp;      // Block timestamp when registered
    uint256 blockNumber;    // Block number for additional proof
    string metadata;        // Optional: filename, description (max 256 chars)
    bool exists;            // Flag to check existence
}

mapping(bytes32 => TimestampRecord) public timestamps;
mapping(address => bytes32[]) public userTimestamps;
```

#### Key Functions

| Function | Description | Access |
|----------|-------------|--------|
| `registerTimestamp(bytes32 hash, string metadata)` | Create new timestamp record | Public (payable) |
| `getTimestamp(bytes32 hash)` | Retrieve timestamp record | Public (view) |
| `getUserTimestamps(address user)` | Get all hashes for a user | Public (view) |
| `verifyTimestamp(bytes32 hash, address owner)` | Check if hash was registered by owner | Public (view) |
| `withdraw()` | Withdraw collected fees | Owner only |

#### Events

```solidity
event TimestampCreated(
    bytes32 indexed hash,
    address indexed owner,
    uint256 timestamp,
    uint256 blockNumber,
    string metadata
);
```

#### Fee Structure

- Base fee: Configurable by contract owner
- Payment: Native ETH
- Fee collection: Accumulated in contract, withdrawable by owner

#### Security Considerations

| Concern | Mitigation |
|---------|------------|
| Double registration | Reject if hash already exists |
| Reentrancy | No external calls before state changes |
| Front-running | Hash is already computed; front-running doesn't help attacker |
| Overflow | Solidity 0.8+ has built-in overflow checks |

---

## Frontend Architecture

### Technology Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| Framework | React 18 | Industry standard, large ecosystem |
| Build Tool | Vite | Fast dev server, optimized builds |
| Language | TypeScript | Type safety, better DX |
| Styling | Tailwind CSS | Utility-first, rapid development |
| Web3 | wagmi + viem | Modern React hooks for Ethereum |
| Wallet | RainbowKit or Web3Modal | Polished wallet connection UX |
| State | React Query (via wagmi) | Caching, sync with chain state |

### Component Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Layout.tsx
│   ├── wallet/
│   │   ├── ConnectButton.tsx
│   │   └── AccountInfo.tsx
│   ├── timestamp/
│   │   ├── FileUpload.tsx
│   │   ├── HashDisplay.tsx
│   │   ├── TimestampForm.tsx
│   │   └── ConfirmationModal.tsx
│   ├── activity/
│   │   ├── ActivityList.tsx
│   │   ├── ActivityItem.tsx
│   │   └── ActivityFilters.tsx
│   ├── certificate/
│   │   ├── CertificateView.tsx
│   │   └── CertificateDownload.tsx
│   └── validator/
│       ├── ValidatorForm.tsx
│       └── ValidationResult.tsx
├── hooks/
│   ├── useTimestamp.ts
│   ├── useFileHash.ts
│   └── useUserTimestamps.ts
├── lib/
│   ├── contracts.ts       # Contract addresses, ABIs
│   ├── hash.ts            # File hashing utilities
│   └── certificate.ts     # PDF generation
├── pages/
│   ├── Home.tsx
│   ├── Timestamp.tsx
│   ├── Activity.tsx
│   ├── Certificate.tsx
│   └── Validator.tsx
└── App.tsx
```

### Key Frontend Behaviors

#### File Hashing (Client-Side)

```typescript
async function hashFile(file: File): Promise<string> {
  const buffer = await file.arrayBuffer()
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return '0x' + hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}
```

**Important:** The file never leaves the browser. Only the hash is transmitted.

#### Transaction Flow

1. User uploads file → hash computed
2. User reviews summary → clicks "Timestamp"
3. Wallet prompts for signature
4. Transaction submitted → pending state shown
5. Transaction confirmed → success state, certificate available

#### Error Handling

| Error | User-Facing Message | Recovery |
|-------|---------------------|----------|
| Wallet not connected | "Please connect your wallet" | Show connect button |
| Insufficient funds | "Insufficient ETH for transaction" | Show balance, link to faucet |
| Hash already exists | "This document was already timestamped" | Show existing record |
| Transaction rejected | "Transaction was cancelled" | Allow retry |
| Network error | "Network error, please try again" | Auto-retry with backoff |

---

## Security Architecture

### Client-Side Security

| Aspect | Implementation |
|--------|----------------|
| File privacy | Files processed in-memory, never uploaded |
| Hash integrity | Web Crypto API (browser-native, audited) |
| Wallet security | Delegated to user's wallet (MetaMask, etc.) |
| XSS prevention | React's default escaping, CSP headers |

### Smart Contract Security

| Aspect | Implementation |
|--------|----------------|
| Access control | OpenZeppelin Ownable for admin functions |
| Reentrancy | Checks-effects-interactions pattern |
| Input validation | Hash format validation, metadata length limits |
| Upgrade path | Initially non-upgradeable for simplicity; consider proxy pattern for mainnet |

### Operational Security

| Aspect | Implementation |
|--------|----------------|
| Contract verification | Verify source on Etherscan |
| Monitoring | Event indexing for anomaly detection |
| Key management | Owner key in secure wallet (hardware for mainnet) |

---

## Data Model

### On-Chain Data

```
TimestampRecord
├── hash: bytes32 (primary key)
├── owner: address
├── timestamp: uint256
├── blockNumber: uint256
├── metadata: string (max 256 chars)
└── exists: bool
```

### Client-Side Data (Local Storage)

```
UserSession
├── connectedAddress: string
├── recentHashes: string[] (for quick access)
└── preferences: { theme, filters }

CachedTimestamp
├── hash: string
├── localFilename: string (user's original filename)
├── createdAt: Date
└── txHash: string
```

---

## Integration Points

### External Dependencies

| Dependency | Purpose | Fallback |
|------------|---------|----------|
| Ethereum RPC | Blockchain interaction | Multiple providers (Infura, Alchemy, public) |
| Wallet Provider | Transaction signing | Support multiple (MetaMask, WalletConnect, Coinbase) |
| Block Explorer | Transaction links | Etherscan (Sepolia) |

### Future Integrations

| Integration | Phase | Notes |
|-------------|-------|-------|
| IPFS | Phase 2 | Pinata or similar pinning service |
| Bitcoin | Phase 3 | Separate service for OP_RETURN transactions |
| X8 Wallet System | Phase 2 | Replace standalone wallet connect |

---

## Performance Considerations

### Frontend

- **File hashing:** Web Workers for large files (>10MB) to avoid UI blocking
- **List rendering:** Virtualization for activity lists with many items
- **Caching:** React Query caches contract reads, invalidates on events

### Blockchain

- **Gas optimization:** Minimal storage, events for queryable data
- **Batch operations:** Future feature for multiple timestamps in one tx

---

## Testing Strategy

| Level | Scope | Tools |
|-------|-------|-------|
| Unit (Contract) | Individual functions | Hardhat, Chai |
| Integration (Contract) | Multi-function flows | Hardhat |
| Unit (Frontend) | Components, hooks | Vitest, React Testing Library |
| E2E | Full user flows | Playwright or Cypress |
| Manual | Wallet interactions | Testnet with real wallets |

---

## Deployment Architecture

### MVP (Testnet)

```
┌─────────────────┐     ┌─────────────────┐
│  Static Host    │     │  Sepolia RPC    │
│  (Vercel/etc)   │     │  (Public/Infura)│
│                 │     │                 │
│  React App      │────►│  Smart Contract │
└─────────────────┘     └─────────────────┘
```

### Production (Future)

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  CDN            │     │  RPC Provider   │     │  IPFS Pinning   │
│  (CloudFlare)   │     │  (Alchemy)      │     │  (Pinata)       │
│                 │     │                 │     │                 │
│  React App      │────►│  Mainnet        │     │  Doc Storage    │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

---

## Open Decisions

| Decision | Options | Recommendation |
|----------|---------|----------------|
| Wallet library | RainbowKit vs Web3Modal | RainbowKit (better UX) |
| PDF generation | Client-side vs server | Client-side (jsPDF) |
| Event indexing | The Graph vs direct RPC | Direct RPC for MVP, Graph for scale |
| Contract upgradeability | Immutable vs proxy | Immutable for MVP |

---

*Document version: 1.0*  
*Last updated: March 2026*
