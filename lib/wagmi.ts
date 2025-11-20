'use client';

import { http, createConfig } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';
import { injected, walletConnect } from 'wagmi/connectors';

// WalletConnect Project ID (get from https://cloud.walletconnect.com)
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '';

export const config = createConfig({
    chains: [base, baseSepolia],
    connectors: [
        injected(),
        ...(projectId ? [walletConnect({ projectId })] : []),
    ],
    transports: {
        [base.id]: http(),
        [baseSepolia.id]: http(),
    },
});

declare module 'wagmi' {
    interface Register {
        config: typeof config;
    }
}
