'use client';

import { useState } from 'react';
import { useFarcaster } from '@/components/FarcasterProvider';
import { TabNavigation } from '@/components/TabNavigation';
import { InfoTab } from '@/components/InfoTab';
import { MintTab } from '@/components/MintTab';
import { ProfileTab } from '@/components/ProfileTab';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const { isSDKLoaded, error } = useFarcaster();
  const [activeTab, setActiveTab] = useState<'info' | 'mint' | 'profile'>('mint');

  if (!isSDKLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-white" />
          <p className="text-lg text-white">Loading Farcaster SDK...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-600 via-red-500 to-orange-500 p-4">
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
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 p-4">
      <main className="max-w-2xl mx-auto pt-4">
        <div className="rounded-3xl bg-white/10 backdrop-blur-lg p-6 shadow-2xl border border-white/20 min-h-[calc(100vh-2rem)]">
          {/* Tab Content */}
          <div className="transition-opacity duration-200">
            {activeTab === 'info' && <InfoTab />}
            {activeTab === 'mint' && <MintTab />}
            {activeTab === 'profile' && <ProfileTab />}
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

