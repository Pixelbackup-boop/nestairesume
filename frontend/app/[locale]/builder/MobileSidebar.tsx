'use client';

import NextImage from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { X, Check, Sparkles, Home } from 'lucide-react';

type TabId = 'personal' | 'experience' | 'education' | 'skills' | 'design';

interface MobileSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    activeTab: TabId;
    onTabChange: (tab: TabId) => void;
    tabs: { id: TabId; label: string; icon: React.ElementType; description: string }[];
    sectionStatus: Record<TabId, boolean>;
    progress: number;
}

export default function MobileSidebar({
    isOpen,
    onClose,
    activeTab,
    onTabChange,
    tabs,
    sectionStatus,
    progress,
}: MobileSidebarProps) {
    const tBuilder = useTranslations('Builder');

    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={onClose}
                    onKeyDown={(e) => { if (e.key === 'Escape') onClose(); }}
                    aria-label="Close sidebar"
                    role="button"
                    tabIndex={0}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col transform transition-transform duration-300 ease-in-out
                lg:relative lg:translate-x-0
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                {/* Logo */}
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <NextImage
                            src="/logo.png"
                            alt="Best AI Resume Logo"
                            width={32}
                            height={32}
                            className="rounded-md"
                        />
                        <span className="font-bold text-lg text-gray-900">Best AI Resume</span>
                    </Link>
                    {/* Close button for mobile */}
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition lg:hidden"
                        aria-label="Close sidebar"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Progress */}
                <div className="px-4 py-3 border-b border-gray-200">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                        <span>{tBuilder('ui.progress')}</span>
                        <span className="font-semibold text-accent-green">{progress}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-accent-green to-accent-teal rounded-full transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Vertical Tabs */}
                <nav className="flex-1 py-2 overflow-y-auto">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isComplete = sectionStatus[tab.id];
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => {
                                    onTabChange(tab.id);
                                    onClose();
                                }}
                                className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-all ${
                                    isActive
                                        ? 'bg-accent-green/10 border-l-4 border-accent-green text-gray-900'
                                        : 'border-l-4 border-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                                }`}
                            >
                                <div className={`relative ${isActive ? 'text-accent-green' : ''}`}>
                                    <Icon size={20} />
                                    {isComplete && !isActive && (
                                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-accent-green rounded-full border-2 border-gray-200" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <div className={`font-medium text-sm ${isActive ? 'text-gray-900' : ''}`}>
                                        {tab.label}
                                    </div>
                                    <div className="text-xs text-gray-400">{tab.description}</div>
                                </div>
                                {isActive && <Check size={16} className="text-accent-green" />}
                            </button>
                        );
                    })}
                </nav>

                {/* Bottom Actions */}
                <div className="p-4 border-t border-gray-200 space-y-2">
                    <Link
                        href="/templates"
                        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
                    >
                        <Sparkles size={16} />
                        {tBuilder('ui.canvasEditor')}
                    </Link>
                    <Link
                        href="/"
                        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
                    >
                        <Home size={16} />
                        {tBuilder('ui.backToHome')}
                    </Link>
                </div>
            </aside>
        </>
    );
}
