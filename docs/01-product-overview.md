# X8 AG TimeStamping Service — Product Overview

## Executive Summary

X8 AG is introducing a **document timestamping service** as part of its User Portal. This service enables users to create immutable, blockchain-verified proof that a specific document existed at a specific point in time. The timestamping leverages Ethereum's distributed ledger technology (DLT) to provide tamper-proof evidence of document authenticity and ownership.

---

## Business Objectives

### Primary Goals

1. **Compliance & Trust** — Provide legally defensible proof of document existence and integrity, supporting regulatory requirements across jurisdictions.

2. **Commercialization** — Extend X8 AG's service portfolio beyond stablecoins, creating new revenue streams and increasing platform stickiness.

3. **User Value** — Give users a simple, accessible way to protect intellectual property, contracts, and sensitive documents without relying on centralized authorities.

### Target Use Cases

| Use Case | Example |
|----------|---------|
| Intellectual Property | Timestamp creative works, inventions, or designs before public disclosure |
| Legal Documents | Prove contract versions, agreements, or evidence existed at a given time |
| Compliance Records | Create auditable trails for regulatory filings and internal policies |
| Personal Records | Protect wills, medical directives, or personal agreements |

---

## How It Works

### For the User

1. **Upload a Document** — User selects any file from their device (PDF, image, audio, video, etc.)

2. **Pay & Timestamp** — User pays a small fee in ETH and submits the document for timestamping

3. **Receive Certificate** — Once the blockchain transaction confirms, the user receives a certificate proving the timestamp

4. **Verify Anytime** — User (or any third party) can later verify a document against the blockchain record

### What Gets Stored

| Location | Data |
|----------|------|
| User's Device | The original document (never leaves the user's control) |
| Blockchain | Document fingerprint (SHA-256 hash), timestamp, and ownership record |

**Key principle:** The document itself is never uploaded to X8 AG servers or the blockchain. Only a mathematical fingerprint (hash) is recorded. This ensures privacy while providing verifiable proof.

---

## Key Features

### MVP (Phase 1)

| Feature | Description |
|---------|-------------|
| **Timestamp Entry** | Upload file, generate hash, submit to blockchain, pay in ETH |
| **Activity Dashboard** | View all past timestamps with status (pending/confirmed) |
| **Certificate Generation** | Downloadable proof document with transaction details |
| **Document Validator** | Re-verify any document against blockchain records |
| **Wallet Integration** | Connect MetaMask or compatible Ethereum wallet |

### Future Phases

| Feature | Description |
|---------|-------------|
| **IPFS Storage** | Option to store documents on decentralized storage |
| **Multi-Chain Support** | Bitcoin (Elite tier) and alternative EVM chains (Budget tier) |
| **Scheduled Timestamps** | Set future date/time for automatic timestamping |
| **Access Delegation** | Share document access with selected parties |
| **Batch Timestamping** | Timestamp multiple documents in a single transaction |

---

## User Journey

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Connect Wallet │ ──► │  Upload File    │ ──► │  Review & Pay   │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                                        │
                                                        ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Share/Verify   │ ◄── │  Get Certificate│ ◄── │  Wait for       │
│  Document       │     │                 │     │  Confirmation   │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

---

## Value Proposition

### For Users

- **Proof without trust** — No need to trust X8 AG or any single authority; the blockchain is the source of truth
- **Privacy preserved** — Documents stay on the user's device; only the hash is public
- **Permanent record** — Blockchain records are immutable and persist indefinitely
- **Low cost** — Only pay network transaction fees (gas) plus a small service fee

### For X8 AG

- **New revenue stream** — Per-transaction fees for timestamping service
- **Platform stickiness** — Users with timestamps have ongoing reason to return
- **Ecosystem growth** — Complements the X8 stablecoin offering with practical utility
- **Compliance alignment** — Positions X8 AG as a forward-thinking, regulation-ready platform

---

## Technical Foundation

The service is built on Ethereum, the world's largest smart contract platform:

- **Smart Contract** — Immutable code that records timestamps and enforces rules
- **Sepolia Testnet** — Initial deployment for testing (mainnet for production)
- **Open Standards** — SHA-256 hashing, EIP-compatible wallet connections

---

## Success Metrics

| Metric | Description |
|--------|-------------|
| Timestamps Created | Total documents timestamped (volume indicator) |
| Active Users | Unique wallets using the service monthly |
| Verification Rate | How often certificates are verified (trust indicator) |
| Transaction Success Rate | Percentage of timestamps completing without error |
| Average Confirmation Time | Time from submission to blockchain confirmation |

---

## Timeline & Phases

### Phase 1: MVP
- Core timestamping functionality
- Single chain (Ethereum/Sepolia)
- Local document storage only
- Basic certificate and validator

### Phase 2: Enhanced Features
- IPFS document storage option
- Scheduled timestamping
- Improved UX and mobile optimization

### Phase 3: Enterprise & Scale
- Multi-chain support (Bitcoin, L2 chains)
- Access delegation and sharing
- Batch operations
- API access for integrations

---

## Conclusion

The X8 AG TimeStamping Service transforms the User Portal into a comprehensive digital trust platform. By leveraging blockchain technology, we provide users with an accessible, private, and permanent way to prove document authenticity — creating value for users while expanding X8 AG's commercial opportunities.

---

*Document version: 1.0*  
*Last updated: March 2026*
