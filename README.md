# X8 AG Timestamping Service

A blockchain-based document timestamping service that allows users to create immutable, verifiable proof of document existence on the Ethereum blockchain.

## Overview

This service enables users to:
- **Timestamp documents** - Create blockchain proof that a document existed at a specific time
- **View activity** - Track all timestamped documents
- **Download certificates** - Get verifiable proof documents
- **Validate documents** - Verify if a document has been timestamped

Documents are processed client-side; only the SHA-256 hash is stored on-chain, ensuring privacy.

## Project Structure

```
TimeStamping/
├── docs/                      # Documentation
│   ├── 01-product-overview.md # For all stakeholders
│   ├── 02-solution-design.md  # Technical architecture
│   └── 03-implementation-plan.md # Development guide
├── contracts/                 # Hardhat smart contract project
│   ├── contracts/             # Solidity contracts
│   ├── scripts/               # Deployment scripts
│   └── test/                  # Contract tests
└── frontend/                  # React Vite frontend
    └── src/
        ├── components/        # UI components
        ├── hooks/             # Custom React hooks
        ├── lib/               # Utilities
        └── pages/             # Page components
```

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- MetaMask or another Ethereum wallet
- Sepolia testnet ETH (for testing)

### Smart Contracts

```bash
cd contracts

# Install dependencies
npm install

# Compile contracts
npm run compile

# Run tests
npm run test

# Deploy to local network
npm run deploy:local

# Deploy to Sepolia (requires .env configuration)
npm run deploy:sepolia
```

### Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Environment Configuration

**contracts/.env:**
```
SEPOLIA_RPC_URL=https://rpc.sepolia.org
PRIVATE_KEY=your_deployer_private_key
ETHERSCAN_API_KEY=your_etherscan_api_key
```

**frontend/.env:**
```
VITE_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
VITE_CONTRACT_ADDRESS=deployed_contract_address
```

## Technology Stack

### Smart Contracts
- Solidity 0.8.20
- Hardhat
- OpenZeppelin Contracts
- TypeScript tests

### Frontend
- React 18
- Vite
- TypeScript
- Tailwind CSS
- wagmi + viem
- RainbowKit

## Network

- **Testnet:** Sepolia
- **Contract:** TimestampRegistry

## Documentation

See the `/docs` folder for detailed documentation:
- [Product Overview](docs/01-product-overview.md) - Business context and features
- [Solution Design](docs/02-solution-design.md) - Technical architecture
- [Implementation Plan](docs/03-implementation-plan.md) - Development guide

## License

Proprietary - X8 AG
