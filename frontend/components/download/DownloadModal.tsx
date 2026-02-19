'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import {
    X,
    Download,
    Crown,
    Loader2,
    AlertCircle,
    LogIn,
    TrendingUp,
    Clock,
} from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { useUsageStore, formatUsage, formatRemaining } from '@/store/useUsageStore';
import { useDialogA11y } from '@/hooks/useDialogA11y';

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
    const t = useTranslations('Common');
    const { isAuthenticated, user } = useAuthStore();
    const { usage, isLoading: usageLoading, fetchUsage, checkLimit } = useUsageStore();
    const [isDownloading, setIsDownloading] = useState(false);
    const [downloadError, setDownloadError] = useState<{
        type: 'rate_limit' | 'server_busy' | 'generic';
        message: string;
    } | null>(null);

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
            setDownloadError(null);
        }
    }, [isOpen]);

    const { dialogProps } = useDialogA11y({ isOpen, onClose, labelId: 'download-modal-title' });

    if (!isOpen) return null;

    const downloadCheck = checkLimit('download');
    const subscriptionStatus = user?.subscriptionStatus;
    const subscriptionTier = user?.subscriptionTier;
    const isActive = subscriptionStatus === 'active';
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
        setDownloadError(null);
        try {
            await onDownload();
            // Refresh usage after download
            fetchUsage();
            onClose();
        } catch (error: unknown) {
            console.error('Download failed:', error);
            const err = error as { response?: { data?: { message?: string; retryAfterFormatted?: string }; status?: number } };
            const status = err?.response?.status;
            const data = err?.response?.data;

            if (status === 429) {
                setDownloadError({
                    type: 'rate_limit',
                    message: data?.message || `You're generating resumes too quickly. Please wait ${data?.retryAfterFormatted || 'a moment'} and try again.`,
                });
            } else if (status === 503) {
                setDownloadError({
                    type: 'server_busy',
                    message: data?.message || 'Our servers are busy right now. Please try again in a few seconds.',
                });
            } else {
                setDownloadError({
                    type: 'generic',
                    message: 'Something went wrong. Please try again.',
                });
            }
        } finally {
            setIsDownloading(false);
        }
    };

    // Capture current URL so auth pages can redirect back here
    const currentPath = typeof window !== 'undefined'
        ? window.location.pathname + window.location.search
        : `/${locale}/builder`;

    const handleSignUp = () => {
        onClose();
        router.push(`/${locale}/auth/register?redirect=${encodeURIComponent(currentPath)}`);
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
            <div {...dialogProps} className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden animate-fadeIn">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition z-10"
                    aria-label={t('close')}
                >
                    <X size={20} />
                </button>

                {/* Header */}
                <div className="px-8 pt-8 pb-6 text-center">
                    <div className="w-14 h-14 bg-accent-green/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Download className="text-accent-green" size={28} />
                    </div>
                    <h2 id="download-modal-title" className="text-2xl font-bold text-gray-900 mb-2">Download Your Resume</h2>
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
                                        router.push(`/${locale}/auth/login?redirect=${encodeURIComponent(currentPath)}`);
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
                                        Your resume is ready! Pick a plan to download it as a high-quality PDF.
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
                    {userState === 'can_download' && !isDownloading && !downloadError && (
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

                    {/* Error State (rate limit / server busy) */}
                    {downloadError && !isDownloading && (
                        <div className="space-y-4">
                            <div className={`rounded-xl p-4 flex items-start gap-3 ${
                                downloadError.type === 'rate_limit'
                                    ? 'bg-amber-50 border border-amber-200'
                                    : downloadError.type === 'server_busy'
                                    ? 'bg-blue-50 border border-blue-200'
                                    : 'bg-red-50 border border-red-200'
                            }`}>
                                <Clock className={`mt-0.5 shrink-0 ${
                                    downloadError.type === 'rate_limit' ? 'text-amber-600'
                                    : downloadError.type === 'server_busy' ? 'text-blue-600'
                                    : 'text-red-600'
                                }`} size={20} />
                                <div>
                                    <p className={`text-sm font-medium ${
                                        downloadError.type === 'rate_limit' ? 'text-amber-900'
                                        : downloadError.type === 'server_busy' ? 'text-blue-900'
                                        : 'text-red-900'
                                    }`}>
                                        {downloadError.type === 'rate_limit' ? 'Slow down a bit'
                                         : downloadError.type === 'server_busy' ? 'Server is busy'
                                         : 'Download failed'}
                                    </p>
                                    <p className={`text-sm mt-1 ${
                                        downloadError.type === 'rate_limit' ? 'text-amber-700'
                                        : downloadError.type === 'server_busy' ? 'text-blue-700'
                                        : 'text-red-700'
                                    }`}>
                                        {downloadError.message}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => { setDownloadError(null); handleDownload(); }}
                                className="w-full py-3 bg-accent-green text-gray-900 rounded-lg font-semibold hover:bg-accent-teal transition flex items-center justify-center gap-2"
                            >
                                <Download size={18} />
                                Try Again
                            </button>
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
