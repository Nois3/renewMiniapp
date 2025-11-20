'use client';

import { useFarcaster } from '@/components/FarcasterProvider';
import sdk from '@farcaster/frame-sdk';
import { User, MapPin, Loader2, ExternalLink } from 'lucide-react';

export default function Home() {
  const { isSDKLoaded, context, error } = useFarcaster();

  const handleOpenUrl = async (url: string) => {
    try {
      await sdk.actions.openUrl(url);
    } catch (err) {
      console.error('Failed to open URL:', err);
    }
  };


  if (!isSDKLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-purple-300" />
          <p className="text-lg text-purple-200">Loading Farcaster SDK...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-900 via-red-800 to-orange-900 p-4">
        <div className="max-w-md rounded-2xl bg-white/10 backdrop-blur-lg p-8 text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Error Loading SDK</h1>
          <p className="text-red-200">{error.message}</p>
          <p className="text-sm text-red-300 mt-4">
            This app must be opened within a Farcaster client.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 p-4">
      <main className="w-full max-w-2xl">
        <div className="rounded-3xl bg-white/10 backdrop-blur-lg p-8 shadow-2xl border border-white/20">
          <h1 className="text-4xl font-bold text-white mb-2">
            Farcaster Mini App
          </h1>
          <p className="text-purple-200 mb-8">
            A starter template for building on Farcaster
          </p>

          {context ? (
            <div className="space-y-6">
              {/* User Info */}
              <div className="rounded-2xl bg-white/5 p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <User className="h-6 w-6 text-purple-300" />
                  <h2 className="text-xl font-semibold text-white">User Context</h2>
                </div>
                <div className="space-y-2 text-purple-100">
                  <p><span className="font-medium text-purple-300">FID:</span> {context.user?.fid || 'N/A'}</p>
                  <p><span className="font-medium text-purple-300">Username:</span> {context.user?.username || 'N/A'}</p>
                  <p><span className="font-medium text-purple-300">Display Name:</span> {context.user?.displayName || 'N/A'}</p>
                </div>
              </div>

              {/* Location Info */}
              {context.location && (
                <div className="rounded-2xl bg-white/5 p-6 border border-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin className="h-6 w-6 text-purple-300" />
                    <h2 className="text-xl font-semibold text-white">Location</h2>
                  </div>
                  <div className="space-y-2 text-purple-100">
                    <p><span className="font-medium text-purple-300">Type:</span> {context.location.type || 'N/A'}</p>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="rounded-2xl bg-white/5 p-6 border border-white/10">
                <h2 className="text-xl font-semibold text-white mb-4">SDK Actions</h2>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => handleOpenUrl('https://farcaster.xyz')}
                    className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="h-5 w-5" />
                    Open External URL
                  </button>
                  <p className="text-sm text-purple-300">
                    Notifications are enabled when users add your Mini App to their Farcaster client.
                    Your webhook will receive notification tokens automatically.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl bg-white/5 p-6 border border-white/10 text-center">
              <p className="text-purple-200">No context available</p>
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-sm text-purple-300 text-center">
              Built with Next.js + Farcaster Frame SDK
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

