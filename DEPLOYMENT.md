# Smart Contract Deployment Guide

## Overview

The BaseNFT smart contract is an ERC-721 NFT contract deployed on Base network with the following features:
- **Minting Price**: 0.0003 ETH (updatable by owner)
- **Max Supply**: 1000 NFTs
- **Metadata**: Stored on IPFS
- **Owner Functions**: Update price, withdraw funds

## Prerequisites

1. **Wallet with ETH/Base ETH**
   - For Base Mainnet: Need ETH on Base
   - For Base Sepolia: Get free testnet ETH from [Base Sepolia Faucet](https://www.coinbase.com/faucets/base-ethereum-goerli-faucet)

2. **API Keys**
   - Basescan API Key: [Get from Basescan](https://basescan.org/myapikey)
   - (Optional) WalletConnect Project ID: [Get from WalletConnect Cloud](https://cloud.walletconnect.com)

## Deployment Steps

### 1. Configure Environment Variables

Create a `.env.local` file in the project root:

```bash
# Required for deployment
PRIVATE_KEY=your_private_key_here
BASESCAN_API_KEY=your_basescan_api_key_here

# Optional - defaults are provided
BASE_RPC_URL=https://mainnet.base.org
BASE_SEPOLIA_RPC_URL=https://sepolia.base.org
```

> ⚠️ **IMPORTANT**: Never commit your `.env.local` file! It's already in `.gitignore`.

### 2. Compile the Contract

```bash
npx hardhat compile
```

This will compile the Solidity contract and generate artifacts.

### 3. Deploy to Testnet (Recommended First)

Deploy to Base Sepolia testnet for testing:

```bash
npx hardhat run scripts/deploy.ts --network base-sepolia
```

The script will:
- Deploy the contract
- Wait for confirmations
- Verify on Basescan
- Save deployment info to `deployments/deployment-base-sepolia.json`

### 4. Update Frontend Configuration

After deployment, update `.env.local` with the contract address:

```bash
NEXT_PUBLIC_CONTRACT_ADDRESS=0x... # Address from deployment
NEXT_PUBLIC_BASE_CHAIN_ID=84532    # 84532 for Sepolia, 8453 for Mainnet
```

### 5. Test on Testnet

1. Restart the dev server: `npm run dev`
2. Connect your wallet to Base Sepolia
3. Try minting an NFT
4. Verify the transaction on [Base Sepolia Explorer](https://sepolia.basescan.org)

### 6. Deploy to Mainnet (When Ready)

```bash
npx hardhat run scripts/deploy.ts --network base-mainnet
```

Update `.env.local`:
```bash
NEXT_PUBLIC_CONTRACT_ADDRESS=0x... # New mainnet address
NEXT_PUBLIC_BASE_CHAIN_ID=8453     # Base Mainnet
```

## Contract Functions

### Public Functions

#### `mint(address to, string memory tokenURI)`
Mint a new NFT with IPFS metadata URI.
- **Payment Required**: 0.0003 ETH
- **Parameters**:
  - `to`: Address to receive the NFT
  - `tokenURI`: IPFS URI for metadata (e.g., `ipfs://Qm...`)
- **Reverts if**:
  - Insufficient payment
  - Max supply reached (1000)

#### `totalSupply()`
Get the current number of minted NFTs.
- **Returns**: uint256

#### `remainingSupply()`
Get the number of NFTs that can still be minted.
- **Returns**: uint256

#### `mintPrice()`
Get the current minting price.
- **Returns**: uint256 (in wei)

#### `MAX_SUPPLY()`
Get the maximum supply.
- **Returns**: 1000

### Owner-Only Functions

#### `updateMintPrice(uint256 newPrice)`
Update the minting price.
- **Access**: Owner only
- **Parameters**:
  - `newPrice`: New price in wei

#### `withdraw()`
Withdraw all collected funds to owner address.
- **Access**: Owner only

## Verification

The deployment script automatically verifies the contract on Basescan. If verification fails, you can manually verify:

```bash
npx hardhat verify --network base-sepolia DEPLOYED_CONTRACT_ADDRESS "OWNER_ADDRESS"
```

Replace:
- `DEPLOYED_CONTRACT_ADDRESS`: Your contract address
- `OWNER_ADDRESS`: The address that deployed the contract

## Troubleshooting

### "Insufficient funds" error
- Make sure your wallet has enough ETH/Base ETH for deployment
- Deployment costs vary but typically ~0.01-0.05 ETH

### "Nonce too high" error
- Reset your wallet's transaction history in MetaMask
- Or wait a few minutes and try again

### Contract not verifying
- Check that BASESCAN_API_KEY is correct
- Manually verify using the command above
- Ensure you're using the correct network

### Wrong network in wallet
- Switch to Base Mainnet or Base Sepolia in your wallet
- Network details:
  - **Base Mainnet**: Chain ID 8453, RPC: https://mainnet.base.org
  - **Base Sepolia**: Chain ID 84532, RPC: https://sepolia.base.org

## Testing

Run the test suite:

```bash
npx hardhat test
```

This will test:
- Minting with correct price
- Minting fails with incorrect price
- Max supply enforcement
- Owner functions
- Withdraw functionality

## Security Notes

1. **Private Key Security**
   - Never share your private key
   - Never commit `.env.local` to git
   - Use a separate wallet for deployment (not your main wallet)

2. **Contract Ownership**
   - The deployer address becomes the owner
   - Owner can update price and withdraw funds
   - Transfer ownership carefully if needed

3. **Audit**
   - This contract uses OpenZeppelin's audited contracts
   - For production, consider a professional audit

## Support

For issues or questions:
1. Check the [Hardhat documentation](https://hardhat.org/docs)
2. Check the [Base documentation](https://docs.base.org)
3. Open an issue on GitHub
