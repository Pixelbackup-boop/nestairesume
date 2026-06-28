'use client';

import { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useSelectedTemplateId } from '@/store/useResumeStore';
import TemplateFeedbackModal from './TemplateFeedbackModal';

export default function TemplateFeedbackButton() {
    const t = useTranslations('Builder');
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const { isAuthenticated } = useAuthStore();
    const selectedTemplateId = useSelectedTemplateId();
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);

    const templateId = selectedTemplateId || 'classic-professional';

    const handleClick = () => {
        if (!isAuthenticated) {
            // Send logged-out users through the REAL login flow. The old
            // AuthModal faked auth via localStorage and never set useAuthStore,
            // so feedback submission silently failed afterward.
            router.push(`/${locale}/auth/login?redirect=${encodeURIComponent(pathname)}`);
            return;
        }
        setShowFeedbackModal(true);
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
