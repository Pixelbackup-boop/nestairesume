'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { AnimatePresence } from 'framer-motion';
import {
    Sparkles,
    ArrowRight,
    User,
    Briefcase,
    Clock,
    Wand2,
    X,
} from 'lucide-react';
import { useResumeStore } from '@/store/useResumeStore';
import { generateAIResumeAsync, OnboardingInput } from '@/lib/aiResumeGenerator';
import { getLayoutPresetId, getTemplateTheme } from '@/lib/templates/builder';
import { OnboardingAnimations } from './OnboardingAnimations';
import { useDialogA11y } from '@/hooks/useDialogA11y';

type ExperienceLevel = 'entry' | 'mid' | 'senior' | 'executive';

interface OnboardingModalProps {
    isOpen: boolean;
    onClose: () => void;
    templateId: string;
    templateName?: string;
}

const experienceLevels: { value: ExperienceLevel; label: string; description: string }[] = [
    { value: 'entry', label: 'Entry Level', description: '0-2 years of experience' },
    { value: 'mid', label: 'Mid Level', description: '3-5 years of experience' },
    { value: 'senior', label: 'Senior Level', description: '6-10 years of experience' },
    { value: 'executive', label: 'Executive', description: '10+ years of experience' },
];

const aiProcessingMessages = [
    'Analyzing your profession...',
    'Generating professional summary...',
    'Creating work experience...',
    'Adding relevant skills...',
    'Polishing your resume...',
    'Almost there...',
];

export default function OnboardingModal({ isOpen, onClose, templateId, templateName }: OnboardingModalProps) {
    const router = useRouter();
    const locale = useLocale();
    const t = useTranslations('Common');
    const { setResumeData, setTemplate, setTheme, setCustomThemeColor } = useResumeStore();
    const [isGenerating, setIsGenerating] = useState(false);
    const [processingMessageIndex, setProcessingMessageIndex] = useState(0);
    const [formData, setFormData] = useState({
        fullName: '',
        jobTitle: '',
        experienceLevel: 'mid' as ExperienceLevel,
    });

    // Cycle through processing messages
    useEffect(() => {
        if (!isGenerating) return;

        const interval = setInterval(() => {
            setProcessingMessageIndex((prev) =>
                prev < aiProcessingMessages.length - 1 ? prev + 1 : prev
            );
        }, 800);

        return () => clearInterval(interval);
    }, [isGenerating]);

    // Reset form when modal opens
    useEffect(() => {
        if (isOpen) {
            setFormData({
                fullName: '',
                jobTitle: '',
                experienceLevel: 'mid',
            });
            setIsGenerating(false);
            setProcessingMessageIndex(0);
        }
    }, [isOpen]);

    // Handle escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && !isGenerating) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, isGenerating, onClose]);

    const handleGenerateResume = async () => {
        if (!formData.fullName.trim() || !formData.jobTitle.trim()) return;

        setIsGenerating(true);

        try {
            const input: OnboardingInput = {
                fullName: formData.fullName.trim(),
                jobTitle: formData.jobTitle.trim(),
                experienceLevel: formData.experienceLevel,
                locale: locale, // Pass current locale for language-aware AI generation
            };

            const resumeData = await generateAIResumeAsync(input);

            // Load generated data into store
            setResumeData(resumeData);

            // Get the actual layout preset ID for the selected template
            const layoutPresetId = getLayoutPresetId(templateId);

            // Set the template using the layout preset ID
            setTemplate(layoutPresetId);

            // Apply the template's theme color
            const themeSettings = getTemplateTheme(templateId);
            if (themeSettings.themeId) {
                setTheme(themeSettings.themeId);
            } else if (themeSettings.customColor) {
                setCustomThemeColor(themeSettings.customColor);
            }

            // Navigate to builder with template info
            router.push(`/builder?template=${templateId}`);
        } catch (error) {
            console.error('Error generating resume:', error);
            setIsGenerating(false);
        }
    };

    const canProceed = formData.fullName.trim().length >= 2 && formData.jobTitle.trim().length >= 2;

    const { dialogProps } = useDialogA11y({ isOpen, onClose, labelId: 'onboarding-modal-title' });

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                {/* Backdrop - Animated */}
                <OnboardingAnimations.Backdrop
                    className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                    onClick={!isGenerating ? onClose : undefined}
                />

                {/* Modal - Animated */}
                <OnboardingAnimations.Modal {...dialogProps} className="relative w-full max-w-xl mx-4 bg-gradient-to-br from-gray-50 via-white to-gray-50 rounded-2xl border border-gray-200 shadow-2xl overflow-hidden">
                {/* Close button */}
                {!isGenerating && (
                    <button
                        onClick={onClose}
                        aria-label={t('close')}
                        className="absolute top-4 right-4 p-2 text-gray-500 hover:text-white transition-colors z-10"
                    >
                        <X size={20} />
                    </button>
                )}

                {/* Content */}
                <div className="p-8">
                    {!isGenerating ? (
                        /* Form State - Animated */
                        <OnboardingAnimations.FormContainer className="space-y-0">
                            <OnboardingAnimations.FormField className="text-center mb-8">
                                <div className="w-14 h-14 bg-accent-green/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <Sparkles className="text-accent-green" size={28} />
                                </div>
                                <h2 id="onboarding-modal-title" className="text-2xl font-bold text-gray-900 mb-2">Tell us about yourself</h2>
                                <p className="text-gray-500 text-sm">
                                    Just 2 questions and AI will create your perfect resume
                                </p>
                            </OnboardingAnimations.FormField>

                            <div className="space-y-5">
                                {/* Full Name */}
                                <OnboardingAnimations.FormField>
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
                                        <User size={14} />
                                        Your Full Name
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.fullName}
                                        onChange={(e) =>
                                            setFormData((prev) => ({ ...prev, fullName: e.target.value }))
                                        }
                                        placeholder="e.g., John Smith"
                                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-accent-green transition-colors"
                                        autoFocus
                                    />
                                </OnboardingAnimations.FormField>

                                {/* Job Title */}
                                <OnboardingAnimations.FormField>
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
                                        <Briefcase size={14} />
                                        Job Title You're Applying For
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.jobTitle}
                                        onChange={(e) =>
                                            setFormData((prev) => ({ ...prev, jobTitle: e.target.value }))
                                        }
                                        placeholder="e.g., Software Engineer, Marketing Manager"
                                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-accent-green transition-colors"
                                    />
                                </OnboardingAnimations.FormField>

                                {/* Experience Level */}
                                <OnboardingAnimations.FormField>
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
                                        <Clock size={14} />
                                        Experience Level
                                    </label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {experienceLevels.map((level) => (
                                            <button
                                                key={level.value}
                                                type="button"
                                                onClick={() =>
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        experienceLevel: level.value,
                                                    }))
                                                }
                                                className={`p-3 rounded-xl border-2 text-left transition-all ${
                                                    formData.experienceLevel === level.value
                                                        ? 'border-accent-green bg-accent-green/10'
                                                        : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                                                }`}
                                            >
                                                <div className="font-medium text-gray-900 text-sm">{level.label}</div>
                                                <div className="text-xs text-gray-500">{level.description}</div>
                                            </button>
                                        ))}
                                    </div>
                                </OnboardingAnimations.FormField>

                                {/* Generate Button */}
                                <OnboardingAnimations.FormField>
                                    <button
                                        type="button"
                                        onClick={handleGenerateResume}
                                        disabled={!canProceed}
                                        className="w-full mt-2 py-3.5 bg-accent-green text-gray-900 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-accent-teal transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Wand2 size={18} />
                                        Generate My Resume
                                        <ArrowRight size={18} />
                                    </button>
                                </OnboardingAnimations.FormField>
                            </div>
                        </OnboardingAnimations.FormContainer>
                    ) : (
                        /* Loading State - Animated */
                        <div className="text-center py-8">
                            <div className="relative w-24 h-24 mx-auto mb-6">
                                {/* Spinning outer ring */}
                                <div className="absolute inset-0 border-4 border-accent-green/20 rounded-full" />
                                <div className="absolute inset-0 border-4 border-transparent border-t-accent-green rounded-full animate-spin" />

                                {/* Inner icon */}
                                <div className="absolute inset-3 bg-accent-green/10 rounded-full flex items-center justify-center">
                                    <Sparkles className="text-accent-green animate-pulse" size={32} />
                                </div>
                            </div>

                            <h2 className="text-xl font-bold text-gray-900 mb-3">Creating Your Resume</h2>

                            <div className="h-6">
                                <OnboardingAnimations.ProcessingMessage
                                    message={aiProcessingMessages[processingMessageIndex]}
                                    className="text-gray-500"
                                />
                            </div>

                            {/* Progress dots */}
                            <div className="flex justify-center gap-1.5 mt-6">
                                {aiProcessingMessages.map((_, index) => (
                                    <div
                                        key={index}
                                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                                            index <= processingMessageIndex
                                                ? 'bg-accent-green'
                                                : 'bg-gray-200'
                                        }`}
                                    />
                                ))}
                            </div>

                            <p className="text-gray-400 text-xs mt-6">
                                This usually takes just a few seconds...
                            </p>
                        </div>
                    )}
                </div>

                    {/* Decorative gradient */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-accent-green/10 blur-3xl pointer-events-none" />
                </OnboardingAnimations.Modal>
            </div>
        </AnimatePresence>
    );
}
