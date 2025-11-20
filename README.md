# Farcaster NFT Minter Mini App

A Farcaster Mini App that allows users to upload images and mint them as NFTs with IPFS storage.

## Features

- 🖼️ **NFT Minting**: Upload images and create NFT metadata
- 📦 **IPFS Storage**: Permanent, decentralized storage via Pinata
- 👤 **Profile View**: Display Farcaster user information
- ℹ️ **Info Tab**: Learn about the app and how to use it
- 🎨 **Modern UI**: Beautiful gradient design with smooth animations

## Tech Stack

- **Framework**: Next.js 16 with React 19
- **Styling**: Tailwind CSS 4
- **IPFS**: Pinata Web3 SDK
- **Farcaster**: Frame SDK for user context
- **Icons**: Lucide React

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Pinata

1. Create a free account at [pinata.cloud](https://pinata.cloud)
2. Generate a JWT token from the [API Keys page](https://app.pinata.cloud/developers/api-keys)
3. Create a `.env.local` file in the root directory:

```bash
PINATA_JWT=your_pinata_jwt_token_here
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production

```bash
npm run build
npm start
```

## Usage

### For Users

1. **Info Tab**: Learn about the app and how it works
2. **Mint NFT Tab** (Main):
   - Click to upload an image (PNG, JPG, or GIF, max 10MB)
   - Enter NFT name and description
   - Click "Create NFT" to upload to IPFS
   - Copy the metadata URI to use when minting your NFT
3. **Profile Tab**: View your Farcaster profile information

### For Developers

#### API Endpoint: `/api/mint`

Upload an image and metadata to IPFS:

```bash
curl -X POST http://localhost:3000/api/mint \
  -F "image=@path/to/image.png" \
  -F "name=My NFT" \
  -F "description=This is my NFT"
```

**Response:**
```json
{
  "success": true,
  "imageUri": "ipfs://QmXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "metadataUri": "ipfs://QmYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY",
  "imageIpfsHash": "QmXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "metadataIpfsHash": "QmYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY",
  "imageGatewayUrl": "https://gateway.pinata.cloud/ipfs/QmXXX...",
  "metadataGatewayUrl": "https://gateway.pinata.cloud/ipfs/QmYYY..."
}
```

#### NFT Metadata Format (ERC-721)

```json
{
  "name": "NFT Name",
  "description": "NFT Description",
  "image": "ipfs://QmXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "attributes": [
    {
      "trait_type": "Creator FID",
      "value": "12345"
    },
    {
      "trait_type": "Creator Username",
      "value": "username"
    }
  ]
}
```

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── mint/
│   │   │   └── route.ts          # NFT minting API endpoint
│   │   └── webhook/
│   │       └── route.ts          # Farcaster webhook handler
│   ├── .well-known/
│   │   └── farcaster.json/
│   │       └── route.ts          # Farcaster manifest
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Main page with tab navigation
│   └── globals.css               # Global styles
├── components/
│   ├── FarcasterProvider.tsx     # Farcaster SDK context provider
│   ├── TabNavigation.tsx         # Bottom tab navigation
│   ├── InfoTab.tsx               # Info page component
│   ├── MintTab.tsx               # NFT minting component
│   └── ProfileTab.tsx            # User profile component
└── public/                       # Static assets
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PINATA_JWT` | Pinata JWT token for IPFS uploads | Yes |

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Add the `PINATA_JWT` environment variable
4. Deploy

### Other Platforms

Make sure to:
- Set the `PINATA_JWT` environment variable
- Use Node.js 18 or higher
- Build command: `npm run build`
- Start command: `npm start`

## Farcaster Integration

This app is designed to run as a Farcaster Mini App. To test:

1. Deploy the app to a public URL
2. Update the Farcaster manifest at `/.well-known/farcaster.json`
3. Add the Mini App to your Farcaster client

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.
