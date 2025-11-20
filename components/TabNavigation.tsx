'use client';

import { Info, ImagePlus, User } from 'lucide-react';

interface TabNavigationProps {
    activeTab: 'info' | 'mint' | 'profile';
    onTabChange: (tab: 'info' | 'mint' | 'profile') => void;
}

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
    const tabs = [
        { id: 'info' as const, icon: Info, label: 'Info' },
        { id: 'mint' as const, icon: ImagePlus, label: 'Mint NFT' },
        { id: 'profile' as const, icon: User, label: 'Profile' },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-lg border-t border-white/20 z-50">
            <div className="max-w-2xl mx-auto px-4">
                <div className="flex items-center justify-around py-3">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;

                        return (
                            <button
                                key={tab.id}
                                onClick={() => onTabChange(tab.id)}
                                className={`flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition-all duration-200 ${isActive
                                        ? 'bg-blue-600 text-white scale-105'
                                        : 'text-blue-100 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <Icon className={`h-6 w-6 ${isActive ? 'animate-pulse' : ''}`} />
                                <span className="text-xs font-medium">{tab.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}
