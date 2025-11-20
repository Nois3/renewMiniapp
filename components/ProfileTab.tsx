'use client';

import { useFarcaster } from './FarcasterProvider';
import { User, Hash, AtSign, Type, MapPin } from 'lucide-react';

export function ProfileTab() {
    const { context } = useFarcaster();

    if (!context) {
        return (
            <div className="pb-24">
                <div className="rounded-2xl bg-white/5 p-8 border border-white/10 text-center">
                    <User className="h-16 w-16 text-blue-200 mx-auto mb-4" />
                    <p className="text-blue-100">No user context available</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 pb-24">
            {/* Profile Header */}
            <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-white text-3xl font-bold">
                    {context.user?.displayName?.[0]?.toUpperCase() || context.user?.username?.[0]?.toUpperCase() || '?'}
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-white">
                        {context.user?.displayName || 'Anonymous'}
                    </h1>
                    {context.user?.username && (
                        <p className="text-lg text-blue-200">@{context.user.username}</p>
                    )}
                </div>
            </div>

            {/* User Details */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold text-white">Account Details</h2>

                {/* FID */}
                <div className="rounded-2xl bg-white/5 p-5 border border-white/10">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-blue-500/20">
                            <Hash className="h-5 w-5 text-blue-200" />
                        </div>
                        <span className="text-sm font-medium text-blue-200">Farcaster ID (FID)</span>
                    </div>
                    <p className="text-lg font-mono text-white ml-11">{context.user?.fid || 'N/A'}</p>
                </div>

                {/* Username */}
                {context.user?.username && (
                    <div className="rounded-2xl bg-white/5 p-5 border border-white/10">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-lg bg-cyan-500/20">
                                <AtSign className="h-5 w-5 text-cyan-300" />
                            </div>
                            <span className="text-sm font-medium text-blue-200">Username</span>
                        </div>
                        <p className="text-lg text-white ml-11">@{context.user.username}</p>
                    </div>
                )}

                {/* Display Name */}
                {context.user?.displayName && (
                    <div className="rounded-2xl bg-white/5 p-5 border border-white/10">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-lg bg-blue-400/20">
                                <Type className="h-5 w-5 text-blue-200" />
                            </div>
                            <span className="text-sm font-medium text-blue-200">Display Name</span>
                        </div>
                        <p className="text-lg text-white ml-11">{context.user.displayName}</p>
                    </div>
                )}

                {/* Location */}
                {context.location && (
                    <div className="rounded-2xl bg-white/5 p-5 border border-white/10">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-lg bg-cyan-500/20">
                                <MapPin className="h-5 w-5 text-cyan-300" />
                            </div>
                            <span className="text-sm font-medium text-blue-200">Location Type</span>
                        </div>
                        <p className="text-lg text-white ml-11">{context.location.type || 'N/A'}</p>
                    </div>
                )}
            </div>

            {/* Additional Info */}
            <div className="rounded-2xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 p-6 border border-blue-500/20">
                <p className="text-sm text-blue-100 text-center">
                    Your Farcaster profile information is securely accessed through the Frame SDK
                </p>
            </div>
        </div>
    );
}

