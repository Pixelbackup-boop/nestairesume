'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, LucideIcon } from 'lucide-react';

interface CollapsibleSectionProps {
    title: string;
    icon: LucideIcon;
    defaultOpen?: boolean;
    badge?: number; // Show count of items
    children: React.ReactNode;
}

export default function CollapsibleSection({
    title,
    icon: Icon,
    defaultOpen = false,
    badge,
    children,
}: CollapsibleSectionProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="border border-border-subtle rounded-xl overflow-hidden bg-bg-card-light/50">
            {/* Header */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 transition"
            >
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-accent-green/10 rounded-lg flex items-center justify-center">
                        <Icon size={16} className="text-accent-green" />
                    </div>
                    <span className="font-medium text-white">{title}</span>
                    {badge !== undefined && badge > 0 && (
                        <span className="px-2 py-0.5 bg-accent-green/20 text-accent-green text-xs font-medium rounded-full">
                            {badge}
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    {isOpen ? (
                        <ChevronUp size={18} className="text-gray-400" />
                    ) : (
                        <ChevronDown size={18} className="text-gray-400" />
                    )}
                </div>
            </button>

            {/* Content */}
            {isOpen && (
                <div className="px-4 pb-4 pt-2 border-t border-border-subtle animate-in slide-in-from-top-2 fade-in duration-200">
                    {children}
                </div>
            )}
        </div>
    );
}
