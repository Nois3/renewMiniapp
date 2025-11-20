'use client';

import { useAccount, useConnect, useDisconnect, useChainId, useSwitchChain } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';
import { Wallet, LogOut, AlertCircle } from 'lucide-react';

export function WalletConnect() {
    const { address, isConnected } = useAccount();
    const { connect, connectors, error } = useConnect();
    const { disconnect } = useDisconnect();
    const chainId = useChainId();
    const { switchChain } = useSwitchChain();

    const isCorrectNetwork = chainId === base.id || chainId === baseSepolia.id;
    const currentChain = chainId === base.id ? base : baseSepolia;

    if (isConnected && address) {
        return (
            <div className="space-y-3">
                <div className="rounded-xl bg-white/5 p-4 border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-blue-200">Connected Wallet</span>
                        <button
                            onClick={() => disconnect()}
                            className="text-sm text-red-400 hover:text-red-300 flex items-center gap-1"
                        >
                            <LogOut className="h-4 w-4" />
                            Disconnect
                        </button>
                    </div>
                    <p className="text-white font-mono text-sm break-all">
                        {address.slice(0, 6)}...{address.slice(-4)}
                    </p>
                    <p className="text-xs text-blue-200 mt-1">
                        Network: {currentChain.name}
                    </p>
                </div>

                {!isCorrectNetwork && (
                    <div className="rounded-xl bg-yellow-500/10 border border-yellow-500/20 p-4 flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                            <p className="text-sm text-yellow-200 mb-2">
                                Please switch to Base network to mint NFTs
                            </p>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => switchChain({ chainId: base.id })}
                                    className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm transition-colors"
                                >
                                    Switch to Base
                                </button>
                                <button
                                    onClick={() => switchChain({ chainId: baseSepolia.id })}
                                    className="px-3 py-1.5 rounded-lg bg-blue-600/50 hover:bg-blue-600 text-white text-sm transition-colors"
                                >
                                    Base Sepolia (Testnet)
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="space-y-3">
            <div className="rounded-xl bg-white/5 p-4 border border-white/10">
                <p className="text-sm text-blue-200 mb-3">Connect your wallet to mint NFTs</p>
                <div className="space-y-2">
                    {connectors.map((connector) => (
                        <button
                            key={connector.id}
                            onClick={() => connect({ connector })}
                            className="w-full px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors flex items-center justify-center gap-2"
                        >
                            <Wallet className="h-5 w-5" />
                            Connect {connector.name}
                        </button>
                    ))}
                </div>
            </div>

            {error && (
                <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4 flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                    <p className="text-sm text-red-200">{error.message}</p>
                </div>
            )}
        </div>
    );
}
