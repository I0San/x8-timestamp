# X8 AG TimeStamping Service — Implementation Plan

## Overview

This document provides the detailed implementation guide for the development team. It includes setup instructions, code structure, implementation steps, and technical specifications.

---

## Project Structure

```
TimeStamping/
├── docs/                          # Documentation
│   ├── 01-product-overview.md
│   ├── 02-solution-design.md
│   └── 03-implementation-plan.md
├── contracts/                     # Hardhat project
│   ├── contracts/
│   │   └── TimestampRegistry.sol
│   ├── scripts/
│   │   └── deploy.ts
│   ├── test/
│   │   └── TimestampRegistry.test.ts
│   ├── hardhat.config.ts
│   ├── package.json
│   └── tsconfig.json
├── frontend/                      # React Vite project
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
└── README.md
```

---

## Part 1: Smart Contract Implementation

### 1.1 Setup

```bash
cd TimeStamping/contracts
npm init -y
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox typescript ts-node
npm install @openzeppelin/contracts
npx hardhat init  # Select TypeScript project
```

### 1.2 TimestampRegistry Contract

**File:** `contracts/TimestampRegistry.sol`

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract TimestampRegistry is Ownable, ReentrancyGuard {
    
    struct TimestampRecord {
        address owner;
        uint256 timestamp;
        uint256 blockNumber;
        string metadata;
        bool exists;
    }
    
    mapping(bytes32 => TimestampRecord) public timestamps;
    mapping(address => bytes32[]) private userTimestamps;
    
    uint256 public fee;
    
    event TimestampCreated(
        bytes32 indexed hash,
        address indexed owner,
        uint256 timestamp,
        uint256 blockNumber,
        string metadata
    );
    
    event FeeUpdated(uint256 oldFee, uint256 newFee);
    
    constructor(uint256 _fee) Ownable(msg.sender) {
        fee = _fee;
    }
    
    function registerTimestamp(
        bytes32 _hash,
        string calldata _metadata
    ) external payable nonReentrant {
        require(!timestamps[_hash].exists, "Hash already timestamped");
        require(msg.value >= fee, "Insufficient fee");
        require(bytes(_metadata).length <= 256, "Metadata too long");
        
        timestamps[_hash] = TimestampRecord({
            owner: msg.sender,
            timestamp: block.timestamp,
            blockNumber: block.number,
            metadata: _metadata,
            exists: true
        });
        
        userTimestamps[msg.sender].push(_hash);
        
        emit TimestampCreated(
            _hash,
            msg.sender,
            block.timestamp,
            block.number,
            _metadata
        );
        
        // Refund excess payment
        if (msg.value > fee) {
            payable(msg.sender).transfer(msg.value - fee);
        }
    }
    
    function getTimestamp(bytes32 _hash) external view returns (
        address owner,
        uint256 timestamp,
        uint256 blockNumber,
        string memory metadata,
        bool exists
    ) {
        TimestampRecord memory record = timestamps[_hash];
        return (
            record.owner,
            record.timestamp,
            record.blockNumber,
            record.metadata,
            record.exists
        );
    }
    
    function getUserTimestamps(address _user) external view returns (bytes32[] memory) {
        return userTimestamps[_user];
    }
    
    function getUserTimestampCount(address _user) external view returns (uint256) {
        return userTimestamps[_user].length;
    }
    
    function verifyTimestamp(
        bytes32 _hash,
        address _owner
    ) external view returns (bool) {
        TimestampRecord memory record = timestamps[_hash];
        return record.exists && record.owner == _owner;
    }
    
    function setFee(uint256 _newFee) external onlyOwner {
        emit FeeUpdated(fee, _newFee);
        fee = _newFee;
    }
    
    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        payable(owner()).transfer(balance);
    }
}
```

### 1.3 Hardhat Configuration

**File:** `hardhat.config.ts`

```typescript
import { HardhatUserConfig } from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox"
import * as dotenv from "dotenv"

dotenv.config()

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    hardhat: {},
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL || "",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  }
}

export default config
```

### 1.4 Deployment Script

**File:** `scripts/deploy.ts`

```typescript
import { ethers } from "hardhat"

async function main() {
  const initialFee = ethers.parseEther("0.001") // 0.001 ETH fee
  
  console.log("Deploying TimestampRegistry...")
  
  const TimestampRegistry = await ethers.getContractFactory("TimestampRegistry")
  const registry = await TimestampRegistry.deploy(initialFee)
  
  await registry.waitForDeployment()
  
  const address = await registry.getAddress()
  console.log(`TimestampRegistry deployed to: ${address}`)
  console.log(`Initial fee: ${ethers.formatEther(initialFee)} ETH`)
  
  // Wait for confirmations before verification
  console.log("Waiting for confirmations...")
  await registry.deploymentTransaction()?.wait(5)
  
  console.log("Deployment complete!")
  console.log("\nTo verify on Etherscan:")
  console.log(`npx hardhat verify --network sepolia ${address} ${initialFee}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
```

### 1.5 Test Suite

**File:** `test/TimestampRegistry.test.ts`

```typescript
import { expect } from "chai"
import { ethers } from "hardhat"
import { TimestampRegistry } from "../typechain-types"
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers"

describe("TimestampRegistry", function () {
  let registry: TimestampRegistry
  let owner: SignerWithAddress
  let user1: SignerWithAddress
  let user2: SignerWithAddress
  const FEE = ethers.parseEther("0.001")
  
  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners()
    const TimestampRegistry = await ethers.getContractFactory("TimestampRegistry")
    registry = await TimestampRegistry.deploy(FEE)
  })
  
  describe("Deployment", function () {
    it("Should set the correct owner", async function () {
      expect(await registry.owner()).to.equal(owner.address)
    })
    
    it("Should set the correct initial fee", async function () {
      expect(await registry.fee()).to.equal(FEE)
    })
  })
  
  describe("Timestamp Registration", function () {
    const testHash = ethers.keccak256(ethers.toUtf8Bytes("test document"))
    const metadata = "test-document.pdf"
    
    it("Should register a timestamp", async function () {
      await registry.connect(user1).registerTimestamp(testHash, metadata, { value: FEE })
      
      const record = await registry.getTimestamp(testHash)
      expect(record.exists).to.be.true
      expect(record.owner).to.equal(user1.address)
      expect(record.metadata).to.equal(metadata)
    })
    
    it("Should emit TimestampCreated event", async function () {
      await expect(registry.connect(user1).registerTimestamp(testHash, metadata, { value: FEE }))
        .to.emit(registry, "TimestampCreated")
        .withArgs(testHash, user1.address, (v: any) => true, (v: any) => true, metadata)
    })
    
    it("Should reject duplicate hash", async function () {
      await registry.connect(user1).registerTimestamp(testHash, metadata, { value: FEE })
      
      await expect(
        registry.connect(user2).registerTimestamp(testHash, "other.pdf", { value: FEE })
      ).to.be.revertedWith("Hash already timestamped")
    })
    
    it("Should reject insufficient fee", async function () {
      await expect(
        registry.connect(user1).registerTimestamp(testHash, metadata, { value: 0 })
      ).to.be.revertedWith("Insufficient fee")
    })
    
    it("Should refund excess payment", async function () {
      const excessPayment = ethers.parseEther("0.01")
      const balanceBefore = await ethers.provider.getBalance(user1.address)
      
      const tx = await registry.connect(user1).registerTimestamp(testHash, metadata, { value: excessPayment })
      const receipt = await tx.wait()
      const gasUsed = receipt!.gasUsed * receipt!.gasPrice
      
      const balanceAfter = await ethers.provider.getBalance(user1.address)
      const expectedBalance = balanceBefore - FEE - gasUsed
      
      expect(balanceAfter).to.be.closeTo(expectedBalance, ethers.parseEther("0.0001"))
    })
    
    it("Should track user timestamps", async function () {
      const hash1 = ethers.keccak256(ethers.toUtf8Bytes("doc1"))
      const hash2 = ethers.keccak256(ethers.toUtf8Bytes("doc2"))
      
      await registry.connect(user1).registerTimestamp(hash1, "doc1.pdf", { value: FEE })
      await registry.connect(user1).registerTimestamp(hash2, "doc2.pdf", { value: FEE })
      
      const userHashes = await registry.getUserTimestamps(user1.address)
      expect(userHashes).to.have.lengthOf(2)
      expect(userHashes).to.include(hash1)
      expect(userHashes).to.include(hash2)
    })
  })
  
  describe("Verification", function () {
    const testHash = ethers.keccak256(ethers.toUtf8Bytes("test document"))
    
    beforeEach(async function () {
      await registry.connect(user1).registerTimestamp(testHash, "test.pdf", { value: FEE })
    })
    
    it("Should verify correct owner", async function () {
      expect(await registry.verifyTimestamp(testHash, user1.address)).to.be.true
    })
    
    it("Should reject incorrect owner", async function () {
      expect(await registry.verifyTimestamp(testHash, user2.address)).to.be.false
    })
    
    it("Should return false for non-existent hash", async function () {
      const fakeHash = ethers.keccak256(ethers.toUtf8Bytes("fake"))
      expect(await registry.verifyTimestamp(fakeHash, user1.address)).to.be.false
    })
  })
  
  describe("Admin Functions", function () {
    it("Should allow owner to update fee", async function () {
      const newFee = ethers.parseEther("0.002")
      await registry.setFee(newFee)
      expect(await registry.fee()).to.equal(newFee)
    })
    
    it("Should reject non-owner fee update", async function () {
      await expect(
        registry.connect(user1).setFee(ethers.parseEther("0.002"))
      ).to.be.revertedWithCustomError(registry, "OwnableUnauthorizedAccount")
    })
    
    it("Should allow owner to withdraw", async function () {
      const testHash = ethers.keccak256(ethers.toUtf8Bytes("test"))
      await registry.connect(user1).registerTimestamp(testHash, "test.pdf", { value: FEE })
      
      const balanceBefore = await ethers.provider.getBalance(owner.address)
      const tx = await registry.withdraw()
      const receipt = await tx.wait()
      const gasUsed = receipt!.gasUsed * receipt!.gasPrice
      const balanceAfter = await ethers.provider.getBalance(owner.address)
      
      expect(balanceAfter).to.equal(balanceBefore + FEE - gasUsed)
    })
  })
})
```

### 1.6 Deployment Commands

```bash
# Compile contracts
npx hardhat compile

# Run tests
npx hardhat test

# Deploy to local network
npx hardhat run scripts/deploy.ts

# Deploy to Sepolia
npx hardhat run scripts/deploy.ts --network sepolia

# Verify on Etherscan
npx hardhat verify --network sepolia <CONTRACT_ADDRESS> <FEE_IN_WEI>
```

---

## Part 2: Frontend Implementation

### 2.1 Setup

```bash
cd TimeStamping/frontend
npm create vite@latest . -- --template react-ts
npm install
npm install wagmi viem @tanstack/react-query @rainbow-me/rainbowkit
npm install react-router-dom
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 2.2 Key Implementation Files

#### Wagmi Configuration

**File:** `src/lib/wagmi.ts`

```typescript
import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { sepolia } from 'wagmi/chains'

export const config = getDefaultConfig({
  appName: 'X8 Timestamping',
  projectId: 'YOUR_WALLETCONNECT_PROJECT_ID', // Get from cloud.walletconnect.com
  chains: [sepolia],
})
```

#### Contract Configuration

**File:** `src/lib/contracts.ts`

```typescript
export const TIMESTAMP_REGISTRY_ADDRESS = '0x...' // Deployed contract address

export const TIMESTAMP_REGISTRY_ABI = [
  // ABI will be copied from artifacts after compilation
] as const
```

#### File Hashing Utility

**File:** `src/lib/hash.ts`

```typescript
export async function hashFile(file: File): Promise<string> {
  const buffer = await file.arrayBuffer()
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return '0x' + hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

export function formatHash(hash: string, chars: number = 8): string {
  if (hash.length <= chars * 2 + 2) return hash
  return `${hash.slice(0, chars + 2)}...${hash.slice(-chars)}`
}
```

#### Custom Hook for Timestamping

**File:** `src/hooks/useTimestamp.ts`

```typescript
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { TIMESTAMP_REGISTRY_ADDRESS, TIMESTAMP_REGISTRY_ABI } from '../lib/contracts'

export function useRegisterTimestamp() {
  const { writeContract, data: hash, isPending, error } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })
  
  const register = (documentHash: `0x${string}`, metadata: string, fee: bigint) => {
    writeContract({
      address: TIMESTAMP_REGISTRY_ADDRESS as `0x${string}`,
      abi: TIMESTAMP_REGISTRY_ABI,
      functionName: 'registerTimestamp',
      args: [documentHash, metadata],
      value: fee,
    })
  }
  
  return {
    register,
    txHash: hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  }
}
```

### 2.3 Component Specifications

#### FileUpload Component

**Purpose:** Handle file selection and hash computation

**Props:**
- `onHashComputed: (hash: string, file: File) => void`
- `disabled?: boolean`

**Behavior:**
1. Accept drag-and-drop or click-to-select
2. Compute SHA-256 hash using Web Crypto API
3. Show file name, size, and computed hash
4. Call `onHashComputed` when ready

#### TimestampForm Component

**Purpose:** Main form for creating timestamps

**State:**
- `file: File | null`
- `hash: string`
- `metadata: string`
- `step: 'upload' | 'confirm' | 'pending' | 'success'`

**Flow:**
1. Upload → compute hash
2. Show confirmation summary
3. Submit transaction
4. Show pending state
5. Show success with certificate link

#### ActivityList Component

**Purpose:** Display user's timestamp history

**Data:** Fetched from contract using `getUserTimestamps`

**Features:**
- Status indicators (confirmed/pending)
- Filter by time (newest/oldest)
- Click to view certificate

#### CertificateView Component

**Purpose:** Display and download timestamp certificate

**Data:**
- Transaction hash
- Block number and timestamp
- Document hash
- Owner address
- Metadata

**Actions:**
- Copy certificate data
- Download as PDF

#### ValidatorForm Component

**Purpose:** Verify documents against blockchain records

**Modes:**
1. **By hash:** Enter document hash directly
2. **By file:** Upload file to compute hash, then check

**Output:**
- Found: Show timestamp record details
- Not found: "No record found for this document"

### 2.4 Routing Structure

```typescript
// src/App.tsx routes
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/timestamp" element={<TimestampPage />} />
  <Route path="/activity" element={<ActivityPage />} />
  <Route path="/certificate/:hash" element={<CertificatePage />} />
  <Route path="/validate" element={<ValidatorPage />} />
</Routes>
```

### 2.5 Styling Guidelines

- Use Tailwind CSS utility classes
- Dark mode support (optional for MVP)
- Responsive design (mobile-first)
- Consistent spacing scale
- X8 AG brand colors (if provided)

---

## Part 3: Implementation Checklist

### Phase 1: Contract Development

- [ ] Initialize Hardhat project
- [ ] Implement TimestampRegistry.sol
- [ ] Write comprehensive tests
- [ ] Configure Sepolia network
- [ ] Deploy to Sepolia
- [ ] Verify on Etherscan
- [ ] Document deployed address

### Phase 2: Frontend Foundation

- [ ] Initialize Vite React project
- [ ] Configure Tailwind CSS
- [ ] Set up wagmi and RainbowKit
- [ ] Create layout components (Header, Footer)
- [ ] Implement wallet connection
- [ ] Configure routing

### Phase 3: Core Features

- [ ] Implement file hashing utility
- [ ] Build FileUpload component
- [ ] Build TimestampForm component
- [ ] Build confirmation modal
- [ ] Handle transaction states
- [ ] Build ActivityList component
- [ ] Build CertificateView component
- [ ] Implement PDF download

### Phase 4: Validator

- [ ] Build ValidatorForm component
- [ ] Implement hash lookup
- [ ] Implement file verification
- [ ] Build ValidationResult component

### Phase 5: Polish & Deploy

- [ ] Error handling and edge cases
- [ ] Loading states and skeletons
- [ ] Mobile responsive testing
- [ ] Build production bundle
- [ ] Deploy to hosting (Vercel/Netlify)

---

## Environment Variables

### Contracts (.env)

```
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
PRIVATE_KEY=your_deployer_private_key
ETHERSCAN_API_KEY=your_etherscan_api_key
```

### Frontend (.env)

```
VITE_WALLETCONNECT_PROJECT_ID=your_project_id
VITE_CONTRACT_ADDRESS=deployed_contract_address
```

---

## Testing Commands

### Contracts

```bash
npm run test           # Run all tests
npm run test:coverage  # Run with coverage report
npm run test:gas       # Run with gas reporting
```

### Frontend

```bash
npm run dev            # Start dev server
npm run build          # Production build
npm run preview        # Preview production build
npm run lint           # Run ESLint
npm run test           # Run Vitest
```

---

## Useful Resources

- [Hardhat Documentation](https://hardhat.org/docs)
- [wagmi Documentation](https://wagmi.sh)
- [RainbowKit Documentation](https://www.rainbowkit.com/docs)
- [Sepolia Faucet](https://sepoliafaucet.com)
- [Sepolia Etherscan](https://sepolia.etherscan.io)

---

*Document version: 1.0*  
*Last updated: March 2026*
