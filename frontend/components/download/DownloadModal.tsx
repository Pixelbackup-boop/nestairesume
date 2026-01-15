'use client';

import React, { useState, useEffect } from 'react';
import {
    X,
    Download,
    Crown,
    Tv,
    Check,
    Loader2,
    Sparkles,
    FileText,
    Palette,
    Zap,
} from 'lucide-react';

interface DownloadModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDownload: () => void;
    isPremiumUser?: boolean;
}

type DownloadOption = 'free' | 'premium';

const premiumFeatures = [
    { icon: FileText, label: 'Unlimited resume downloads' },
    { icon: Palette, label: 'Access to all premium templates' },
    { icon: Sparkles, label: 'AI-powered content suggestions' },
    { icon: Zap, label: 'No ads ever' },
];

export default function DownloadModal({
    isOpen,
    onClose,
    onDownload,
    isPremiumUser = false,
}: DownloadModalProps) {
    const [selectedOption, setSelectedOption] = useState<DownloadOption>('free');
    const [isWatchingAd, setIsWatchingAd] = useState(false);
    const [adProgress, setAdProgress] = useState(0);
    const [adComplete, setAdComplete] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);

    // Reset state when modal opens
    useEffect(() => {
        if (isOpen) {
            setIsWatchingAd(false);
            setAdProgress(0);
            setAdComplete(false);
            setIsDownloading(false);
        }
    }, [isOpen]);

    // Simulate ad watching
    useEffect(() => {
        if (!isWatchingAd) return;

        const interval = setInterval(() => {
            setAdProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setAdComplete(true);
                    setIsWatchingAd(false);
                    return 100;
                }
                return prev + 2; // 5 seconds total (50 intervals * 100ms)
            });
        }, 100);

        return () => clearInterval(interval);
    }, [isWatchingAd]);

    if (!isOpen) return null;

    const handleFreeDownload = () => {
        // TODO: Re-enable ad watching when site is complete
        // For now, download directly without ads
        handleDownload();
    };

    const handlePremiumPurchase = () => {
        // TODO: Integrate with payment provider (Stripe, etc.)
        console.log('Redirect to premium checkout');
        // For now, simulate premium purchase
        alert('Premium checkout would open here. For demo, using free download.');
    };

    const handleDownload = async () => {
        setIsDownloading(true);
        // Small delay for UX
        await new Promise((resolve) => setTimeout(resolve, 500));
        onDownload();
        setIsDownloading(false);
        onClose();
    };

    // Premium users skip directly to download
    if (isPremiumUser) {
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
            <div className="relative bg-slate-800 rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden animate-fadeIn">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition z-10"
                >
                    <X size={20} />
                </button>

                {/* Header */}
                <div className="px-8 pt-8 pb-6 text-center">
                    <div className="w-14 h-14 bg-accent-green/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Download className="text-accent-green" size={28} />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Download Your Resume</h2>
                    <p className="text-slate-400 text-sm">
                        Choose how you'd like to download your resume
                    </p>
                </div>

                {/* Ad Watching State */}
                {isWatchingAd && (
                    <div className="px-8 pb-8">
                        <div className="bg-slate-700/50 rounded-xl p-6 text-center">
                            <Tv className="mx-auto text-accent-green mb-4" size={48} />
                            <h3 className="text-lg font-semibold text-white mb-2">
                                Watching Advertisement
                            </h3>
                            <p className="text-slate-400 text-sm mb-4">
                                Please wait while the ad plays...
                            </p>

                            {/* Progress Bar */}
                            <div className="h-2 bg-slate-600 rounded-full overflow-hidden mb-2">
                                <div
                                    className="h-full bg-accent-green transition-all duration-100"
                                    style={{ width: `${adProgress}%` }}
                                />
                            </div>
                            <span className="text-xs text-slate-500">
                                {Math.ceil((100 - adProgress) / 20)} seconds remaining
                            </span>

                            {/* Simulated Ad Content */}
                            <div className="mt-6 bg-slate-800 rounded-lg p-4 border border-slate-600">
                                <div className="text-xs text-slate-500 mb-2">ADVERTISEMENT</div>
                                <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-4 text-white text-sm">
                                    <p className="font-medium">Upgrade to Premium!</p>
                                    <p className="text-xs opacity-80 mt-1">
                                        Download unlimited resumes without ads
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Ad Complete - Download Ready */}
                {adComplete && !isDownloading && (
                    <div className="px-8 pb-8">
                        <div className="bg-accent-green/10 border border-accent-green/30 rounded-xl p-6 text-center">
                            <div className="w-12 h-12 bg-accent-green rounded-full flex items-center justify-center mx-auto mb-4">
                                <Check className="text-slate-900" size={24} />
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">
                                Ready to Download!
                            </h3>
                            <p className="text-slate-400 text-sm mb-6">
                                Thank you for watching. Your resume is ready.
                            </p>
                            <button
                                onClick={handleDownload}
                                className="w-full py-3 bg-accent-green text-slate-900 rounded-lg font-semibold hover:bg-accent-teal transition flex items-center justify-center gap-2"
                            >
                                <Download size={18} />
                                Download Resume (PDF)
                            </button>
                        </div>
                    </div>
                )}

                {/* Option Selection */}
                {!isWatchingAd && !adComplete && !isDownloading && (
                    <div className="px-8 pb-8">
                        <div className="space-y-4">
                            {/* Free Option */}
                            <button
                                onClick={() => setSelectedOption('free')}
                                className={`w-full p-4 rounded-xl border-2 text-left transition ${
                                    selectedOption === 'free'
                                        ? 'border-accent-green bg-accent-green/10'
                                        : 'border-slate-700 bg-slate-700/50 hover:border-slate-600'
                                }`}
                            >
                                <div className="flex items-start gap-4">
                                    <div
                                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                            selectedOption === 'free'
                                                ? 'bg-accent-green/20'
                                                : 'bg-slate-600'
                                        }`}
                                    >
                                        <Download
                                            size={20}
                                            className={
                                                selectedOption === 'free'
                                                    ? 'text-accent-green'
                                                    : 'text-slate-400'
                                            }
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-semibold text-white">Free Download</h3>
                                            <span className="text-accent-green font-bold">$0</span>
                                        </div>
                                        <p className="text-sm text-slate-400 mt-1">
                                            Download your resume as a high-quality PDF
                                        </p>
                                    </div>
                                </div>
                            </button>

                            {/* Premium Option */}
                            <button
                                onClick={() => setSelectedOption('premium')}
                                className={`w-full p-4 rounded-xl border-2 text-left transition relative overflow-hidden ${
                                    selectedOption === 'premium'
                                        ? 'border-yellow-500 bg-yellow-500/10'
                                        : 'border-slate-700 bg-slate-700/50 hover:border-slate-600'
                                }`}
                            >
                                {/* Popular Badge */}
                                <div className="absolute top-0 right-0 bg-yellow-500 text-slate-900 text-xs font-bold px-3 py-1 rounded-bl-lg">
                                    BEST VALUE
                                </div>

                                <div className="flex items-start gap-4">
                                    <div
                                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                            selectedOption === 'premium'
                                                ? 'bg-yellow-500/20'
                                                : 'bg-slate-600'
                                        }`}
                                    >
                                        <Crown
                                            size={20}
                                            className={
                                                selectedOption === 'premium'
                                                    ? 'text-yellow-500'
                                                    : 'text-slate-400'
                                            }
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-semibold text-white">Premium</h3>
                                            <div className="text-right">
                                                <span className="text-yellow-500 font-bold">$9.99</span>
                                                <span className="text-slate-500 text-xs">/month</span>
                                            </div>
                                        </div>
                                        <p className="text-sm text-slate-400 mt-1">
                                            Unlimited downloads, premium templates, no ads
                                        </p>
                                    </div>
                                </div>

                                {/* Premium Features */}
                                {selectedOption === 'premium' && (
                                    <div className="mt-4 pt-4 border-t border-slate-700 grid grid-cols-2 gap-2">
                                        {premiumFeatures.map((feature, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-2 text-xs text-slate-300"
                                            >
                                                <feature.icon size={14} className="text-yellow-500" />
                                                {feature.label}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </button>
                        </div>

                        {/* Action Button */}
                        <div className="mt-6">
                            {selectedOption === 'free' ? (
                                <button
                                    onClick={handleFreeDownload}
                                    className="w-full py-3 bg-accent-green text-slate-900 rounded-lg font-semibold hover:bg-accent-teal transition flex items-center justify-center gap-2"
                                >
                                    <Download size={18} />
                                    Download Free
                                </button>
                            ) : (
                                <button
                                    onClick={handlePremiumPurchase}
                                    className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-slate-900 rounded-lg font-semibold hover:from-yellow-400 hover:to-orange-400 transition flex items-center justify-center gap-2"
                                >
                                    <Crown size={18} />
                                    Upgrade to Premium
                                </button>
                            )}
                        </div>

                        <p className="mt-4 text-xs text-slate-500 text-center">
                            Your resume will be downloaded as a high-quality PDF file
                        </p>
                    </div>
                )}

                {/* Downloading State */}
                {isDownloading && (
                    <div className="px-8 pb-8">
                        <div className="text-center py-8">
                            <Loader2 className="mx-auto text-accent-green animate-spin mb-4" size={40} />
                            <p className="text-slate-300">Preparing your download...</p>
                        </div>
                    </div>
                )}
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
