'use client';

import { useTranslations } from 'next-intl';
import { X, CheckCircle, Crown } from 'lucide-react';

interface WelcomeModalProps {
    onClose: () => void;
    onChoosePlan: () => void;
}

export default function WelcomeModal({ onClose, onChoosePlan }: WelcomeModalProps) {
    const tBuilder = useTranslations('Builder');

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-labelledby="welcome-modal-title"
            onKeyDown={(e) => { if (e.key === 'Escape') onClose(); }}
        >
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden motion-safe:animate-[fadeIn_0.2s_ease-out]">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition z-10"
                    aria-label="Close"
                >
                    <X size={20} />
                </button>
                <div className="px-8 pt-8 pb-6 text-center">
                    <div className="w-14 h-14 bg-accent-green/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="text-accent-green" size={28} />
                    </div>
                    <h2 id="welcome-modal-title" className="text-2xl font-bold text-gray-900 mb-2">{tBuilder('welcome.title')}</h2>
                    <p className="text-gray-500 text-sm">
                        {tBuilder('welcome.description')}
                    </p>
                </div>
                <div className="px-8 pb-8 space-y-3">
                    <button
                        onClick={onChoosePlan}
                        className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 rounded-lg font-semibold hover:from-yellow-400 hover:to-orange-400 transition flex items-center justify-center gap-2"
                    >
                        <Crown size={18} />
                        {tBuilder('welcome.choosePlan')}
                    </button>
                    <button
                        onClick={onClose}
                        className="w-full py-3 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
                    >
                        {tBuilder('welcome.backToEditor')}
                    </button>
                </div>
            </div>
        </div>
    );
}
