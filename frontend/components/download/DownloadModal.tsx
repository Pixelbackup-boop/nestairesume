'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import {
    X,
    Download,
    Crown,
    Loader2,
    AlertCircle,
    LogIn,
    TrendingUp,
} from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { useUsageStore, formatUsage, formatRemaining } from '@/store/useUsageStore';

interface DownloadModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDownload: () => void;
    /** Optional format label for display (e.g., "Google Docs", "PDF") */
    format?: string;
}

export type { DownloadModalProps };

export default function DownloadModal({
    isOpen,
    onClose,
    onDownload,
    format = 'PDF',
}: DownloadModalProps) {
    const router = useRouter();
    const locale = useLocale();
    const { isAuthenticated, user } = useAuthStore();
    const { usage, isLoading: usageLoading, fetchUsage, checkLimit } = useUsageStore();
    const [isDownloading, setIsDownloading] = useState(false);

    // Fetch usage data when modal opens
    useEffect(() => {
        if (isOpen && isAuthenticated) {
            fetchUsage();
        }
    }, [isOpen, isAuthenticated, fetchUsage]);

    // Reset state when modal closes
    useEffect(() => {
        if (!isOpen) {
            setIsDownloading(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const downloadCheck = checkLimit('download');
    const subscriptionStatus = user?.subscriptionStatus;
    const subscriptionTier = user?.subscriptionTier;
    const isTrialing = subscriptionStatus === 'trialing';
    const isActive = subscriptionStatus === 'active' || isTrialing;
    const hasValidSubscription = isActive && subscriptionTier && subscriptionTier !== 'free';

    // Determine user state
    const getUserState = () => {
        if (!isAuthenticated) return 'not_logged_in';
        if (usageLoading) return 'loading';
        if (!hasValidSubscription) return 'no_subscription';
        if (!downloadCheck.canUse) return 'limit_reached';
        return 'can_download';
    };

    const userState = getUserState();

    const handleDownload = async () => {
        setIsDownloading(true);
        try {
            await onDownload();
            // Refresh usage after download
            fetchUsage();
        } catch (error) {
            console.error('Download failed:', error);
        } finally {
            setIsDownloading(false);
            onClose();
        }
    };

    const handleSignUp = () => {
        onClose();
        router.push(`/${locale}/auth/register`);
    };

    const handleUpgrade = () => {
        onClose();
        router.push(`/${locale}/pricing`);
    };

    // Active subscribers with unlimited downloads - skip modal and download directly
    if (isAuthenticated && hasValidSubscription && downloadCheck.limit === -1 && !usageLoading) {
        handleDownload();
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden animate-fadeIn">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition z-10"
                >
                    <X size={20} />
                </button>

                {/* Header */}
                <div className="px-8 pt-8 pb-6 text-center">
                    <div className="w-14 h-14 bg-accent-green/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Download className="text-accent-green" size={28} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Download Your Resume</h2>
                    <p className="text-gray-500 text-sm">
                        {format === 'PDF' ? 'Download as a high-quality PDF file' : `Download as ${format}`}
                    </p>
                </div>

                {/* Content based on user state */}
                <div className="px-8 pb-8">
                    {/* Loading State */}
                    {userState === 'loading' && (
                        <div className="text-center py-8">
                            <Loader2 className="mx-auto text-accent-green animate-spin mb-4" size={40} />
                            <p className="text-gray-600">Checking your account...</p>
                        </div>
                    )}

                    {/* Not Logged In */}
                    {userState === 'not_logged_in' && (
                        <div className="space-y-4">
                            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                                <LogIn className="text-amber-600 mt-0.5 shrink-0" size={20} />
                                <div>
                                    <p className="text-sm font-medium text-amber-900">Sign in to Download</p>
                                    <p className="text-sm text-amber-700 mt-1">
                                        Create an account to access downloads, all templates, and AI tools.
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={handleSignUp}
                                className="w-full py-3 bg-accent-green text-gray-900 rounded-lg font-semibold hover:bg-accent-teal transition flex items-center justify-center gap-2"
                            >
                                <LogIn size={18} />
                                Sign Up
                            </button>
                            <p className="text-xs text-gray-400 text-center">
                                Already have an account?{' '}
                                <button
                                    onClick={() => {
                                        onClose();
                                        router.push(`/${locale}/auth/login`);
                                    }}
                                    className="text-accent-green hover:underline"
                                >
                                    Log in
                                </button>
                            </p>
                        </div>
                    )}

                    {/* No Subscription */}
                    {userState === 'no_subscription' && (
                        <div className="space-y-4">
                            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                                <Crown className="text-amber-600 mt-0.5 shrink-0" size={20} />
                                <div>
                                    <p className="text-sm font-medium text-amber-900">Choose a Plan to Download</p>
                                    <p className="text-sm text-amber-700 mt-1">
                                        Your resume is ready! Pick a plan to download it as a high-quality PDF. Free trial and paid plans available.
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={handleUpgrade}
                                className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 rounded-lg font-semibold hover:from-yellow-400 hover:to-orange-400 transition flex items-center justify-center gap-2"
                            >
                                <Crown size={18} />
                                View Plans
                            </button>
                            <button
                                onClick={onClose}
                                className="w-full text-sm text-gray-500 hover:text-gray-700 transition text-center"
                            >
                                Maybe later
                            </button>
                        </div>
                    )}

                    {/* Limit Reached */}
                    {userState === 'limit_reached' && (
                        <div className="space-y-4">
                            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                                <AlertCircle className="text-red-600 mt-0.5 shrink-0" size={20} />
                                <div>
                                    <p className="text-sm font-medium text-red-900">Download limit reached</p>
                                    <p className="text-sm text-red-700 mt-1">
                                        You've used all {downloadCheck.limit} downloads this month. Upgrade your plan for more downloads.
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={handleUpgrade}
                                className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 rounded-lg font-semibold hover:from-yellow-400 hover:to-orange-400 transition flex items-center justify-center gap-2"
                            >
                                <TrendingUp size={18} />
                                Upgrade for More Downloads
                            </button>
                        </div>
                    )}

                    {/* Can Download */}
                    {userState === 'can_download' && !isDownloading && (
                        <div className="space-y-4">
                            {/* Usage Info */}
                            {usage && downloadCheck.limit !== -1 && (
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-700">Downloads this month</span>
                                        <span className="text-sm font-bold text-gray-900">
                                            {formatUsage(usage.usage.download.used, usage.usage.download.limit)}
                                        </span>
                                    </div>
                                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full transition-all ${
                                                downloadCheck.remaining <= 2 ? 'bg-amber-500' : 'bg-accent-green'
                                            }`}
                                            style={{
                                                width: `${Math.min(100, (usage.usage.download.used / usage.usage.download.limit) * 100)}%`
                                            }}
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">
                                        {formatRemaining(downloadCheck.remaining, downloadCheck.limit)}
                                        {isTrialing && user?.trialEndsAt && (
                                            <span className="ml-2">
                                                • Trial ends {new Date(user.trialEndsAt).toLocaleDateString()}
                                            </span>
                                        )}
                                    </p>
                                </div>
                            )}

                            {/* Unlimited badge */}
                            {downloadCheck.limit === -1 && (
                                <div className="bg-accent-green/10 rounded-xl p-4 text-center">
                                    <span className="text-sm font-medium text-accent-green">
                                        ✨ Unlimited downloads with your plan
                                    </span>
                                </div>
                            )}

                            <button
                                onClick={handleDownload}
                                className="w-full py-3 bg-accent-green text-gray-900 rounded-lg font-semibold hover:bg-accent-teal transition flex items-center justify-center gap-2"
                            >
                                <Download size={18} />
                                Download {format}
                            </button>
                        </div>
                    )}

                    {/* Downloading State */}
                    {isDownloading && (
                        <div className="text-center py-8">
                            <Loader2 className="mx-auto text-accent-green animate-spin mb-4" size={40} />
                            <p className="text-gray-600">Preparing your download...</p>
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.2s ease-out;
                }
            `}</style>
        </div>
    );
}
