'use client';

import { Sparkles, Upload, Shield, Zap } from 'lucide-react';

export function InfoTab() {
    return (
        <div className="space-y-6 pb-24">
            {/* Hero Section */}
            <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 mb-4">
                    <Sparkles className="h-10 w-10 text-white" />
                </div>
                <h1 className="text-4xl font-bold text-white">
                    NFT Minter
                </h1>
                <p className="text-lg text-blue-100 max-w-md mx-auto">
                    Transform your images into NFTs with just a few taps
                </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-white mb-4">Features</h2>

                <div className="rounded-2xl bg-white/5 p-6 border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-blue-500/20">
                            <Upload className="h-6 w-6 text-blue-300" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-2">Easy Upload</h3>
                            <p className="text-blue-100 text-sm">
                                Simply upload your image and add metadata. We'll handle the rest.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl bg-white/5 p-6 border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-cyan-500/20">
                            <Shield className="h-6 w-6 text-cyan-300" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-2">IPFS Storage</h3>
                            <p className="text-blue-100 text-sm">
                                Your images and metadata are stored on IPFS for permanent, decentralized access.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl bg-white/5 p-6 border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-blue-400/20">
                            <Zap className="h-6 w-6 text-blue-200" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-2">Instant Metadata</h3>
                            <p className="text-blue-100 text-sm">
                                Get your NFT metadata URI instantly, ready for minting on any blockchain.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* How to Use */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-white mb-4">How to Use</h2>
                <div className="rounded-2xl bg-white/5 p-6 border border-white/10">
                    <ol className="space-y-3 text-blue-50">
                        <li className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-sm flex items-center justify-center font-semibold">1</span>
                            <span>Go to the <strong className="text-white">Mint NFT</strong> tab</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-sm flex items-center justify-center font-semibold">2</span>
                            <span>Upload your image (PNG, JPG, or GIF)</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-sm flex items-center justify-center font-semibold">3</span>
                            <span>Add a name and description for your NFT</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-sm flex items-center justify-center font-semibold">4</span>
                            <span>Click <strong className="text-white">Create NFT</strong> and wait for the IPFS upload</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-sm flex items-center justify-center font-semibold">5</span>
                            <span>Copy the metadata URI and use it to mint your NFT!</span>
                        </li>
                    </ol>
                </div>
            </div>

            {/* Footer Note */}
            <div className="rounded-2xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 p-6 border border-blue-500/20">
                <p className="text-sm text-blue-100 text-center">
                    Built with ❤️ on Farcaster • Powered by IPFS
                </p>
            </div>
        </div>
    );
}
