'use client';

import { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useAuthStore } from '@/store/useAuthStore';
import { useSelectedTemplateId } from '@/store/useResumeStore';
import AuthModal from '@/components/auth/AuthModal';
import TemplateFeedbackModal from './TemplateFeedbackModal';

export default function TemplateFeedbackButton() {
    const t = useTranslations('Builder');
    const { isAuthenticated } = useAuthStore();
    const selectedTemplateId = useSelectedTemplateId();
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);

    const templateId = selectedTemplateId || 'classic-professional';

    const handleClick = () => {
        if (!isAuthenticated) {
            setShowAuthModal(true);
        } else {
            setShowFeedbackModal(true);
        }
    };

    return (
        <>
            <button
                onClick={handleClick}
                className="p-1.5 rounded transition flex items-center gap-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-200"
                title={t('feedback.reportIssue')}
            >
                <MessageSquare size={16} />
                <span className="text-xs">{t('feedback.reportIssue')}</span>
            </button>

            <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                onSuccess={() => {
                    setShowAuthModal(false);
                    setShowFeedbackModal(true);
                }}
                initialMode="login"
            />

            {showFeedbackModal && (
                <TemplateFeedbackModal
                    isOpen={showFeedbackModal}
                    onClose={() => setShowFeedbackModal(false)}
                    templateId={templateId}
                />
            )}
        </>
    );
}
