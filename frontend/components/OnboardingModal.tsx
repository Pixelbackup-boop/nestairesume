'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={!isGenerating ? onClose : undefined}
            />

            {/* Modal */}
            <div className="relative w-full max-w-xl mx-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden">
                {/* Close button */}
                {!isGenerating && (
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white transition-colors z-10"
                    >
                        <X size={20} />
                    </button>
                )}

                {/* Content */}
                <div className="p-8">
                    {!isGenerating ? (
                        /* Form State */
                        <div className="animate-fadeIn">
                            <div className="text-center mb-8">
                                <div className="w-14 h-14 bg-accent-green/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <Sparkles className="text-accent-green" size={28} />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-2">Tell us about yourself</h2>
                                <p className="text-slate-400 text-sm">
                                    Just 2 questions and AI will create your perfect resume
                                </p>
                            </div>

                            <div className="space-y-5">
                                {/* Full Name */}
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
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
                                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-accent-green transition-colors"
                                        autoFocus
                                    />
                                </div>

                                {/* Job Title */}
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
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
                                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-accent-green transition-colors"
                                    />
                                </div>

                                {/* Experience Level */}
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                                        <Clock size={14} />
                                        Experience Level
                                    </label>
                                    <div className="grid grid-cols-2 gap-2">
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
                                                        : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                                                }`}
                                            >
                                                <div className="font-medium text-white text-sm">{level.label}</div>
                                                <div className="text-xs text-slate-400">{level.description}</div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Generate Button */}
                                <button
                                    type="button"
                                    onClick={handleGenerateResume}
                                    disabled={!canProceed}
                                    className="w-full mt-2 py-3.5 bg-accent-green text-slate-900 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-accent-teal transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Wand2 size={18} />
                                    Generate My Resume
                                    <ArrowRight size={18} />
                                </button>
                            </div>
                        </div>
                    ) : (
                        /* Loading State */
                        <div className="animate-fadeIn text-center py-8">
                            <div className="relative w-24 h-24 mx-auto mb-6">
                                {/* Spinning outer ring */}
                                <div className="absolute inset-0 border-4 border-accent-green/20 rounded-full" />
                                <div className="absolute inset-0 border-4 border-transparent border-t-accent-green rounded-full animate-spin" />

                                {/* Inner icon */}
                                <div className="absolute inset-3 bg-accent-green/10 rounded-full flex items-center justify-center">
                                    <Sparkles className="text-accent-green animate-pulse" size={32} />
                                </div>
                            </div>

                            <h2 className="text-xl font-bold text-white mb-3">Creating Your Resume</h2>

                            <div className="h-6">
                                <p className="text-slate-400 animate-pulse">
                                    {aiProcessingMessages[processingMessageIndex]}
                                </p>
                            </div>

                            {/* Progress dots */}
                            <div className="flex justify-center gap-1.5 mt-6">
                                {aiProcessingMessages.map((_, index) => (
                                    <div
                                        key={index}
                                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                                            index <= processingMessageIndex
                                                ? 'bg-accent-green'
                                                : 'bg-slate-700'
                                        }`}
                                    />
                                ))}
                            </div>

                            <p className="text-slate-500 text-xs mt-6">
                                This usually takes just a few seconds...
                            </p>
                        </div>
                    )}
                </div>

                {/* Decorative gradient */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-accent-green/10 blur-3xl pointer-events-none" />
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }
            `}</style>
        </div>
    );
}
