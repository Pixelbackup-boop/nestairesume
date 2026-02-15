'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { X, Download, LogIn, Save } from 'lucide-react';
import { useDialogA11y } from '@/hooks/useDialogA11y';

interface CanvasDownloadModalProps {
    isOpen: boolean;
    onClose: () => void;
    format: 'pdf' | 'png' | 'jpeg' | null;
}

export default function CanvasDownloadModal({
    isOpen,
    onClose,
    format,
}: CanvasDownloadModalProps) {
    const router = useRouter();
    const locale = useLocale();
    const t = useTranslations('CanvasEditor.downloadModal');
    const { dialogProps } = useDialogA11y({ isOpen, onClose, labelId: 'canvas-download-modal-title' });

    if (!isOpen) return null;

    const currentPath = `/${locale}/canvas-editor`;

    const handleSignUp = () => {
        onClose();
        router.push(`/${locale}/auth/register?redirect=${encodeURIComponent(currentPath)}`);
    };

    const handleSignIn = () => {
        onClose();
        router.push(`/${locale}/auth/login?redirect=${encodeURIComponent(currentPath)}`);
    };

    const formatLabel = format?.toUpperCase() || 'PDF';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div {...dialogProps} className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden animate-fadeIn">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition z-10"
                    aria-label="Close"
                >
                    <X size={20} />
                </button>

                {/* Header */}
                <div className="px-8 pt-8 pb-6 text-center">
                    <div className="w-14 h-14 bg-accent-green/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Download className="text-accent-green" size={28} />
                    </div>
                    <h2 id="canvas-download-modal-title" className="text-2xl font-bold text-gray-900 mb-2">
                        {t('title')}
                    </h2>
                    <p className="text-gray-500 text-sm">
                        {t('description', { format: formatLabel })}
                    </p>
                </div>

                {/* Content */}
                <div className="px-8 pb-8 space-y-4">
                    {/* Saved notice */}
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
                        <Save className="text-green-600 mt-0.5 shrink-0" size={20} />
                        <div>
                            <p className="text-sm font-medium text-green-900">{t('savedTitle')}</p>
                            <p className="text-sm text-green-700 mt-1">
                                {t('savedNotice')}
                            </p>
                        </div>
                    </div>

                    {/* Sign Up button */}
                    <button
                        onClick={handleSignUp}
                        className="w-full py-3 bg-accent-green text-gray-900 rounded-lg font-semibold hover:bg-accent-teal transition flex items-center justify-center gap-2"
                    >
                        <LogIn size={18} />
                        {t('signUp')}
                    </button>

                    {/* Sign In link */}
                    <p className="text-xs text-gray-400 text-center">
                        {t('signInPrefix')}{' '}
                        <button
                            onClick={handleSignIn}
                            className="text-accent-green hover:underline"
                        >
                            {t('signInLink')}
                        </button>
                    </p>
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
