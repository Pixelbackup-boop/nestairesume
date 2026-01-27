'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-bg-primary flex flex-col">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-primary/80 backdrop-blur-md border-b border-border-subtle">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex items-center justify-between h-16">
                        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
                            <div className="w-7 h-7 bg-accent-green rounded-md flex items-center justify-center font-bold text-bg-primary text-sm">B</div>
                            <span className="font-semibold text-white">Best AI Resume</span>
                        </Link>

                        <Link
                            href="/"
                            className="group flex items-center gap-2 text-gray-400 hover:text-white transition text-sm font-medium"
                        >
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                            <span className="hidden sm:inline">Back to Home</span>
                            <span className="sm:hidden">Home</span>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Content */}
            <div className="flex-1 flex flex-col pt-16">
                {children}
            </div>
        </div>
    );
}
