'use client';

import { useState } from 'react';
import { X, Loader2, CheckCircle, MessageSquare, Bug, Lightbulb } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useDialogA11y } from '@/hooks/useDialogA11y';
import api from '@/lib/api';

interface TemplateFeedbackModalProps {
    isOpen: boolean;
    onClose: () => void;
    templateId: string;
}

type FeedbackType = 'feedback' | 'bug' | 'suggestion';

export default function TemplateFeedbackModal({ isOpen, onClose, templateId }: TemplateFeedbackModalProps) {
    const t = useTranslations('Builder');
    const [type, setType] = useState<FeedbackType>('feedback');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const { dialogProps } = useDialogA11y({ isOpen, onClose, labelId: 'feedback-modal-title' });

    if (!isOpen) return null;

    const handleSubmit = async () => {
        if (message.trim().length < 5) {
            setError(t('feedback.messageTooShort'));
            return;
        }
        setIsSubmitting(true);
        setError('');
        try {
            await api.post('/template-feedback', { templateId, type, message: message.trim() });
            setSubmitted(true);
        } catch (err: unknown) {
            const apiErr = err as { message?: string };
            setError(apiErr?.message || t('feedback.submitError'));
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" {...dialogProps}>
                <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 text-center">
                    <CheckCircle size={48} className="mx-auto text-green-500 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('feedback.thankYou')}</h3>
                    <p className="text-gray-500 text-sm mb-6">{t('feedback.thankYouDesc')}</p>
                    <button onClick={onClose} className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition">
                        {t('feedback.close')}
                    </button>
                </div>
            </div>
        );
    }

    const typeOptions = [
        { value: 'feedback' as const, label: t('feedback.typeFeedback'), icon: MessageSquare },
        { value: 'bug' as const, label: t('feedback.typeBug'), icon: Bug },
        { value: 'suggestion' as const, label: t('feedback.typeSuggestion'), icon: Lightbulb },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" {...dialogProps}>
            <div className="bg-white rounded-xl max-w-lg w-full mx-4 overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                    <h3 id="feedback-modal-title" className="text-lg font-semibold text-gray-900">
                        {t('feedback.title')}
                    </h3>
                    <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 rounded transition">
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-4">
                    <p className="text-sm text-gray-500">
                        {t('feedback.forTemplate')}: <span className="font-medium text-gray-700">{templateId}</span>
                    </p>

                    {/* Type selector */}
                    <div className="flex gap-2">
                        {typeOptions.map(({ value, label, icon: Icon }) => (
                            <button
                                key={value}
                                onClick={() => setType(value)}
                                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition border ${
                                    type === value
                                        ? 'bg-gray-900 text-white border-gray-900'
                                        : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                                }`}
                            >
                                <Icon size={16} />
                                {label}
                            </button>
                        ))}
                    </div>

                    {/* Message textarea */}
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={t('feedback.placeholder')}
                        rows={4}
                        maxLength={2000}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-gray-400 focus:outline-none resize-none"
                    />
                    <div className="text-xs text-gray-400 text-right">{message.length}/2000</div>

                    {error && <p className="text-sm text-red-500">{error}</p>}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
                    <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition">
                        {t('feedback.cancel')}
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting || message.trim().length < 5}
                        className="px-6 py-2 bg-green-500 text-white rounded-lg font-semibold text-sm hover:bg-green-600 transition disabled:opacity-50"
                    >
                        {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : t('feedback.submit')}
                    </button>
                </div>
            </div>
        </div>
    );
}
