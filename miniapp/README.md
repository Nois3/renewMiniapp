# Farcaster Mini App Starter

A Next.js starter template for building Farcaster Mini Apps (formerly Frames v2) with full support for context, webhooks, and notifications.

## Features

- ✅ **Farcaster SDK Integration** - Full `@farcaster/frame-sdk` setup
- ✅ **Manifest Configuration** - Properly configured `farcaster.json` at `/.well-known/farcaster.json`
- ✅ **Context Provider** - React context for accessing Farcaster user data
- ✅ **Webhook Handler** - Ready-to-use webhook endpoint for notifications
- ✅ **TypeScript** - Full type safety
- ✅ **Tailwind CSS** - Modern styling with utility classes
- ✅ **Base Ready** - Configured for Base network integration with `viem`

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Farcaster account for testing
- (Optional) ngrok or similar tunneling service for local development

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Testing with Farcaster

Since Mini Apps need to run within a Farcaster client, you'll need to:

1. **Deploy or Tunnel**: Deploy to Vercel/production OR use ngrok to expose your local server
   ```bash
   ngrok http 3000
   ```

2. **Update Environment**: Set `NEXT_PUBLIC_URL` to your public URL
   ```
   NEXT_PUBLIC_URL=https://your-domain.com
   ```

3. **Test in Warpcast**: Open your Mini App URL in Warpcast's developer mode

## Project Structure

```
miniapp/
├── app/
│   ├── .well-known/
│   │   └── farcaster.json/
│   │       └── route.ts          # Manifest endpoint
│   ├── api/
│   │   └── webhook/
│   │       └── route.ts          # Webhook handler
│   ├── layout.tsx                # Root layout with FarcasterProvider
│   └── page.tsx                  # Main demo page
├── components/
│   └── FarcasterProvider.tsx    # SDK context provider
└── package.json
```

## Key Files

### `app/.well-known/farcaster.json/route.ts`

Serves the Mini App manifest with:
- App metadata (name, icon, description)
- Webhook URL for notifications
- Account association (for domain verification)

### `components/FarcasterProvider.tsx`

Initializes the Farcaster SDK and provides context throughout the app:
- User information (FID, username, display name)
- Location context (where the frame was opened)
- Loading and error states

### `app/api/webhook/route.ts`

Handles Farcaster webhook events:
- `frame_added` - User adds your Mini App
- `frame_removed` - User removes your Mini App
- `notifications_enabled` - User enables notifications (includes token)
- `notifications_disabled` - User disables notifications

## Notifications

Notifications are automatically enabled when users add your Mini App. The webhook will receive a `notifications_enabled` event with:
- `notificationToken` - Use this to send notifications
- `notificationUrl` - The endpoint to send notifications to
- `fid` - The user's Farcaster ID

Store these tokens securely in your database to send notifications later.

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_URL=http://localhost:3000
```

For production, set this to your actual domain.

## Deployment

### Vercel (Recommended)

```bash
npm run build
vercel deploy
```

Make sure to set `NEXT_PUBLIC_URL` in your Vercel environment variables.

### Other Platforms

The app is a standard Next.js application and can be deployed to any platform that supports Next.js.

## Resources

- [Farcaster Mini Apps Documentation](https://docs.farcaster.xyz/developers/frames/v2)
- [Farcaster Frame SDK](https://github.com/farcasterxyz/frame-sdk)
- [Next.js Documentation](https://nextjs.org/docs)
- [Base Documentation](https://docs.base.org)

## License

MIT
