'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import sdk from '@farcaster/frame-sdk';

interface FarcasterContextType {
    isSDKLoaded: boolean;
    context?: Awaited<typeof sdk.context>;
    error?: Error;
}

const FarcasterContext = createContext<FarcasterContextType>({
    isSDKLoaded: false,
});

export function FarcasterProvider({ children }: { children: ReactNode }) {
    const [isSDKLoaded, setIsSDKLoaded] = useState(false);
    const [context, setContext] = useState<Awaited<typeof sdk.context>>();
    const [error, setError] = useState<Error>();

    useEffect(() => {
        const load = async () => {
            try {
                // Initialize the Farcaster SDK
                await sdk.actions.ready();

                // Get the context (user info, location, etc.)
                const ctx = await sdk.context;
                setContext(ctx);
                setIsSDKLoaded(true);
            } catch (err) {
                console.error('Failed to load Farcaster SDK:', err);
                setError(err instanceof Error ? err : new Error('Unknown error'));
                setIsSDKLoaded(true); // Still mark as loaded even on error
            }
        };

        load();
    }, []);

    return (
        <FarcasterContext.Provider value={{ isSDKLoaded, context, error }}>
            {children}
        </FarcasterContext.Provider>
    );
}

export function useFarcaster() {
    const context = useContext(FarcasterContext);
    if (context === undefined) {
        throw new Error('useFarcaster must be used within a FarcasterProvider');
    }
    return context;
}
