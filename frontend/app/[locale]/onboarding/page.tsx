'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import {
    Sparkles,
    Upload,
    Linkedin,
    ArrowRight,
    ArrowLeft,
    Check,
    FileText,
    Wand2,
    Briefcase,
    Minimize2,
    Palette,
    Monitor,
} from 'lucide-react';
import { useResumeStore, ResumeData } from '@/store/useResumeStore';
import { generateAIResumeAsync, OnboardingInput } from '@/lib/aiResumeGenerator';
import { builderTemplates, getTemplateById, getTemplateTheme } from '@/lib/templates/builder';
import BuilderTemplatePreview from '@/components/templates/previews/BuilderTemplatePreview';
import ResumeUpload from '@/components/ResumeUpload';
import { ParseResult } from '@/lib/resumeImportService';

type CreationMethod = 'ai' | 'upload' | 'linkedin' | null;
type ExperienceLevel = 'entry' | 'mid' | 'senior' | 'executive';

interface OnboardingState {
    method: CreationMethod;
    fullName: string;
    jobTitle: string;
    experienceLevel: ExperienceLevel;
    selectedTemplate: string;
}

type CategoryFilter = 'all' | 'professional' | 'modern' | 'creative' | 'minimal';

const categoryIcons: Record<CategoryFilter, React.ElementType> = {
    all: Sparkles,
    professional: Briefcase,
    modern: Monitor,
    creative: Palette,
    minimal: Minimize2,
};

const categoryLabels: Record<CategoryFilter, string> = {
    all: 'All',
    professional: 'Professional',
    modern: 'Modern',
    creative: 'Creative',
    minimal: 'Minimal',
};

export default function OnboardingPage() {
    const router = useRouter();
    const locale = useLocale();
    const t = useTranslations('Onboarding');
    const { setResumeData, setTemplate, setTemplateId, setTheme, setCustomThemeColor } = useResumeStore();
    const [step, setStep] = useState(1);
    const [isGenerating, setIsGenerating] = useState(false);
    const [processingMessageIndex, setProcessingMessageIndex] = useState(0);
    const [formData, setFormData] = useState<OnboardingState>({
        method: null,
        fullName: '',
        jobTitle: '',
        experienceLevel: 'mid',
        selectedTemplate: 'classic-pro', // Default template
    });

    const localizedHref = (path: string) => `/${locale}${path}`;

    const aiProcessingMessages = [
        t('main.processingAnalyzing'),
        t('main.processingCrafting'),
        t('main.processingExperience'),
        t('main.processingSkills'),
        t('main.processingPolishing'),
        t('main.processingAlmost'),
    ];

    const experienceLevels: { value: ExperienceLevel; label: string; description: string }[] = [
        { value: 'entry', label: t('levels.entry'), description: t('levels.entryDesc') },
        { value: 'mid', label: t('levels.mid'), description: t('levels.midDesc') },
        { value: 'senior', label: t('levels.senior'), description: t('levels.seniorDesc') },
        { value: 'executive', label: t('levels.executive'), description: t('levels.executiveDesc') },
    ];

    // Cycle through processing messages
    useEffect(() => {
        if (!isGenerating) return;

        const interval = setInterval(() => {
            setProcessingMessageIndex((prev) =>
                prev < aiProcessingMessages.length - 1 ? prev + 1 : prev
            );
        }, 800);

        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isGenerating]);

    const handleMethodSelect = (method: CreationMethod) => {
        setFormData((prev) => ({ ...prev, method }));
        setStep(2);
    };

    // Handle successful resume upload/parse
    const handleUploadSuccess = (result: ParseResult) => {
        if (!result.success || !result.data) return;

        // Map parsed data to resume store format
        const resumeData: Partial<ResumeData> = {
            personalInfo: {
                fullName: result.data.personalInfo?.fullName || '',
                email: result.data.personalInfo?.email || '',
                phone: result.data.personalInfo?.phone || '',
                location: result.data.personalInfo?.location || '',
                website: result.data.personalInfo?.website || '',
                linkedin: result.data.personalInfo?.linkedin || '',
                summary: result.data.personalInfo?.summary || '',
                jobTitle: result.data.personalInfo?.jobTitle || '',
                profileImage: '',
                imageShape: 'circle',
                nationality: '',
                idType: '',
                idNumber: '',
            },
            experience: result.data.experience || [],
            education: result.data.education || [],
            skills: result.data.skills || [],
            languages: result.data.languages || [],
            certifications: result.data.certifications || [],
            interests: [],
            strengths: [],
            awards: [],
        };

        // Load into store
        setResumeData(resumeData);

        // Go to template selection
        setStep(4);
    };

    const handleGenerateResume = async () => {
        if (!formData.fullName.trim() || !formData.jobTitle.trim()) return;

        setIsGenerating(true);
        setStep(3);

        try {
            const input: OnboardingInput = {
                fullName: formData.fullName.trim(),
                jobTitle: formData.jobTitle.trim(),
                experienceLevel: formData.experienceLevel,
                locale,
            };

            const resumeData = await generateAIResumeAsync(input);

            // Load generated data into store
            setResumeData(resumeData);

            // Move to template selection step
            setIsGenerating(false);
            setStep(4);
        } catch (error) {
            console.error('Error generating resume:', error);
            setIsGenerating(false);
            setStep(2);
        }
    };

    const handleTemplateSelect = (templateId: string) => {
        setFormData((prev) => ({ ...prev, selectedTemplate: templateId }));
    };

    const handleFinish = () => {
        const builderTemplate = getTemplateById(formData.selectedTemplate);
        if (!builderTemplate) return;

        // Set the template layout and component ID
        setTemplate(builderTemplate.layoutPresetId);
        setTemplateId(builderTemplate.templateId || null);

        // Explicitly set the template's default theme/color
        const themeSettings = getTemplateTheme(formData.selectedTemplate);
        if (themeSettings.themeId) {
            setTheme(themeSettings.themeId);
        } else if (themeSettings.customColor) {
            setCustomThemeColor(themeSettings.customColor);
        }

        // Navigate to builder with template info
        router.push(localizedHref(`/builder?template=${formData.selectedTemplate}`));
    };

    const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');

    const filteredTemplates = selectedCategory === 'all'
        ? builderTemplates
        : builderTemplates.filter(t => t.category === selectedCategory);

    const canProceedStep2 = formData.fullName.trim().length >= 2 && formData.jobTitle.trim().length >= 2;

    return (
        <div className="min-h-screen bg-teal-gradient text-dark-teal relative overflow-hidden">
            {/* Animated background blobs */}
            <div className="blob w-[500px] h-[500px] bg-white/10 top-[-100px] left-[-100px]" />
            <div className="blob w-[400px] h-[400px] bg-white/15 bottom-[-50px] right-[-50px]" style={{ animationDelay: '-5s' }} />
            <div className="blob w-[300px] h-[300px] bg-white/10 top-1/2 left-1/2" style={{ animationDelay: '-10s' }} />

            {/* Back Link */}
            <Link
                href={localizedHref('/')}
                className="fixed top-6 left-6 z-50 flex items-center gap-2 text-white font-semibold text-sm px-5 py-2.5 bg-white/15 backdrop-blur-md rounded-full hover:bg-white/25 transition-all hover:-translate-x-1"
            >
                <ArrowLeft size={18} />
                {t('main.goBack')}
            </Link>

            {/* Decorative clouds */}
            <div className="cloud fixed w-[140px] h-[45px] top-20 left-[10%]" style={{ animationDelay: '0s' }} />
            <div className="cloud fixed w-[120px] h-[40px] bottom-24 right-[15%]" style={{ animationDelay: '-7s' }} />

            {/* Decorative leaves */}
            <div className="leaf fixed w-[35px] h-[55px] top-[15%] left-[8%] rotate-[-30deg]" />
            <div className="leaf fixed w-[35px] h-[55px] bottom-[20%] right-[10%] rotate-45" style={{ animationDelay: '-4s' }} />

            <main className="relative z-10 flex items-center justify-center min-h-screen px-6 py-16">
                {/* Step 1: Method Selection */}
                {step === 1 && (
                    <div className="animate-fadeIn w-full max-w-2xl">
                        {/* White Card Container */}
                        <div className="bg-white rounded-[32px] shadow-2xl p-8 md:p-12">
                            {/* Logo */}
                            <div className="flex items-center justify-center gap-3 mb-8">
                                <div className="w-12 h-12 bg-gradient-to-br from-accent-green to-accent-teal rounded-xl flex items-center justify-center font-extrabold text-white text-xl">
                                    B
                                </div>
                                <span className="text-2xl font-extrabold gradient-text">Best AI Resume</span>
                            </div>

                            {/* Progress Dots */}
                            <div className="flex justify-center gap-3 mb-8">
                                {[1, 2, 3, 4].map((s) => (
                                    <div
                                        key={s}
                                        className={`w-3 h-3 rounded-full transition-all duration-300 ${step === s
                                            ? 'bg-gradient-to-br from-accent-green to-accent-teal scale-125'
                                            : step > s
                                                ? 'bg-accent-green'
                                                : 'bg-[#e0f2ef]'
                                            }`}
                                    />
                                ))}
                            </div>

                            <div className="text-center mb-8">
                                <h1 className="text-2xl md:text-3xl font-extrabold text-dark-teal mb-3">
                                    {t('main.step1Title')}
                                </h1>
                                <p className="text-gray-500 text-base">
                                    {t('main.step1Subtitle')}
                                </p>
                            </div>

                            <div className="grid md:grid-cols-3 gap-4">
                                {/* AI Option - Primary */}
                                <button
                                    onClick={() => handleMethodSelect('ai')}
                                    className="group relative bg-gradient-to-br from-accent-green/10 to-accent-teal/10 border-2 border-accent-green rounded-2xl p-6 text-left motion-safe:hover:scale-[1.02] transition-all duration-200"
                                >
                                    <div className="absolute top-3 right-3 bg-accent-orange text-white text-[10px] font-bold px-2 py-1 rounded-full">
                                        {t('main.recommended')}
                                    </div>
                                    <div className="w-12 h-12 bg-gradient-to-br from-accent-green to-accent-teal rounded-xl flex items-center justify-center mb-3">
                                        <Wand2 className="text-white" size={24} />
                                    </div>
                                    <h3 className="text-lg font-bold text-dark-teal mb-1">{t('main.aiTitle')}</h3>
                                    <p className="text-gray-500 text-sm">
                                        {t('main.aiDescription')}
                                    </p>
                                </button>

                                {/* Upload Option */}
                                <button
                                    onClick={() => handleMethodSelect('upload')}
                                    className="group bg-[#f8fffe] border-2 border-[#e0f2ef] rounded-2xl p-6 text-left hover:border-accent-green motion-safe:hover:scale-[1.02] transition-all duration-200"
                                >
                                    <div className="w-12 h-12 bg-gradient-to-br from-accent-green to-accent-teal rounded-xl flex items-center justify-center mb-3">
                                        <Upload className="text-white" size={24} />
                                    </div>
                                    <h3 className="text-lg font-bold text-dark-teal mb-1">{t('main.uploadTitle')}</h3>
                                    <p className="text-gray-500 text-sm">
                                        {t('main.uploadDescription')}
                                    </p>
                                </button>

                                {/* LinkedIn Option */}
                                <button
                                    onClick={() => handleMethodSelect('linkedin')}
                                    className="group bg-[#f8fffe] border-2 border-[#e0f2ef] rounded-2xl p-6 text-left hover:border-accent-green motion-safe:hover:scale-[1.02] transition-all duration-200"
                                >
                                    <div className="w-12 h-12 bg-gradient-to-br from-accent-green to-accent-teal rounded-xl flex items-center justify-center mb-3">
                                        <Linkedin className="text-white" size={24} />
                                    </div>
                                    <h3 className="text-lg font-bold text-dark-teal mb-1">{t('step1.linkedin.title')}</h3>
                                    <p className="text-gray-500 text-sm">
                                        {t('main.linkedinDescription')}
                                    </p>
                                </button>
                            </div>

                            {/* Skip option */}
                            <div className="text-center mt-8">
                                <Link
                                    href={localizedHref('/builder')}
                                    className="text-gray-400 hover:text-accent-green text-sm inline-flex items-center gap-2 transition-colors"
                                >
                                    <FileText size={16} />
                                    {t('main.startBlank')}
                                </Link>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 2: Method-specific content */}
                {step === 2 && !isGenerating && (
                    <div className="animate-fadeIn w-full max-w-xl">
                        {/* White Card Container */}
                        <div className="bg-white rounded-[32px] shadow-2xl p-8 md:p-12">
                            {/* Logo */}
                            <div className="flex items-center justify-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-gradient-to-br from-accent-green to-accent-teal rounded-xl flex items-center justify-center font-extrabold text-white text-lg">
                                    B
                                </div>
                                <span className="text-xl font-extrabold gradient-text">Best AI Resume</span>
                            </div>

                            {/* Progress Dots */}
                            <div className="flex justify-center gap-3 mb-8">
                                {[1, 2, 3, 4].map((s) => (
                                    <div
                                        key={s}
                                        className={`w-3 h-3 rounded-full transition-all duration-300 ${step === s
                                            ? 'bg-gradient-to-br from-accent-green to-accent-teal scale-125'
                                            : step > s
                                                ? 'bg-accent-green'
                                                : 'bg-[#e0f2ef]'
                                            }`}
                                    />
                                ))}
                            </div>

                            {/* AI Generation Form */}
                            {formData.method === 'ai' && (
                                <>
                                    <div className="text-center mb-8">
                                        <h2 className="text-2xl font-extrabold text-dark-teal mb-2">{t('title')}</h2>
                                        <p className="text-gray-500">
                                            {t('main.step2Subtitle')}
                                        </p>
                                    </div>

                                    <div className="space-y-5">
                                        {/* Full Name */}
                                        <div>
                                            <label className="block text-sm font-bold text-dark-teal mb-2">
                                                {t('main.fullName')}
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.fullName}
                                                onChange={(e) =>
                                                    setFormData((prev) => ({ ...prev, fullName: e.target.value }))
                                                }
                                                placeholder={t('main.fullNamePlaceholder')}
                                                className="input-teal"
                                                autoFocus
                                            />
                                        </div>

                                        {/* Job Title */}
                                        <div>
                                            <label className="block text-sm font-bold text-dark-teal mb-2">
                                                {t('main.targetJobTitle')}
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.jobTitle}
                                                onChange={(e) =>
                                                    setFormData((prev) => ({ ...prev, jobTitle: e.target.value }))
                                                }
                                                placeholder={t('main.jobTitlePlaceholder')}
                                                className="input-teal"
                                            />
                                        </div>

                                        {/* Experience Level */}
                                        <div>
                                            <label className="block text-sm font-bold text-dark-teal mb-3">
                                                {t('experienceLevel')}
                                            </label>
                                            <div className="grid grid-cols-2 gap-3">
                                                {experienceLevels.map((level) => (
                                                    <button
                                                        key={level.value}
                                                        onClick={() =>
                                                            setFormData((prev) => ({
                                                                ...prev,
                                                                experienceLevel: level.value,
                                                            }))
                                                        }
                                                        className={`p-4 rounded-xl border-2 text-left transition-all ${formData.experienceLevel === level.value
                                                            ? 'border-accent-green bg-gradient-to-br from-accent-green/10 to-accent-teal/10'
                                                            : 'border-[#e0f2ef] bg-[#f8fffe] hover:border-accent-green'
                                                            }`}
                                                    >
                                                        <div className="font-bold text-dark-teal">{level.label}</div>
                                                        <div className="text-xs text-gray-500">{level.description}</div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Generate Button */}
                                        <button
                                            onClick={handleGenerateResume}
                                            disabled={!canProceedStep2}
                                            className="w-full mt-4 py-4 bg-accent-orange text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-[#e85a2a] transition-colors shadow-lg shadow-accent-orange/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                                        >
                                            <Wand2 size={20} />
                                            {t('generate')}
                                            <ArrowRight size={20} />
                                        </button>

                                        {/* Back button */}
                                        <button
                                            onClick={() => setStep(1)}
                                            className="w-full py-3 text-gray-500 hover:text-dark-teal font-semibold transition-colors"
                                        >
                                            {t('main.goBack')}
                                        </button>
                                    </div>
                                </>
                            )}

                            {/* Upload Resume */}
                            {formData.method === 'upload' && (
                                <>
                                    <div className="text-center mb-8">
                                        <h2 className="text-2xl font-extrabold text-dark-teal mb-2">{t('upload.title')}</h2>
                                        <p className="text-gray-500">
                                            {t('main.uploadSubtitle')}
                                        </p>
                                    </div>

                                    <ResumeUpload
                                        onSuccess={handleUploadSuccess}
                                        locale={locale}
                                    />

                                    <p className="text-center text-gray-400 text-sm mt-6">
                                        {t('main.secureNotice')}
                                    </p>

                                    {/* Back button */}
                                    <button
                                        onClick={() => setStep(1)}
                                        className="w-full mt-4 py-3 text-gray-500 hover:text-dark-teal font-semibold transition-colors"
                                    >
                                        {t('main.goBack')}
                                    </button>
                                </>
                            )}

                            {/* LinkedIn Import */}
                            {formData.method === 'linkedin' && (
                                <>
                                    <div className="text-center mb-6">
                                        <h2 className="text-2xl font-extrabold text-dark-teal mb-2">{t('linkedin.title')}</h2>
                                        <p className="text-gray-500">
                                            {t('main.linkedinSubtitle')}
                                        </p>
                                    </div>

                                    {/* Instructions */}
                                    <div className="bg-[#f8fffe] rounded-xl p-5 mb-6 border-2 border-[#e0f2ef]">
                                        <h3 className="font-bold text-dark-teal mb-3 text-sm">{t('main.linkedinHowTo')}</h3>
                                        <ol className="space-y-2 text-gray-600 text-sm">
                                            <li className="flex gap-3">
                                                <span className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-accent-green to-accent-teal text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                                                <span>{t('main.linkedinStep1')}</span>
                                            </li>
                                            <li className="flex gap-3">
                                                <span className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-accent-green to-accent-teal text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                                                <span>{t('main.linkedinStep2')}</span>
                                            </li>
                                            <li className="flex gap-3">
                                                <span className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-accent-green to-accent-teal text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                                                <span>{t('main.linkedinStep3')}</span>
                                            </li>
                                            <li className="flex gap-3">
                                                <span className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-accent-green to-accent-teal text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
                                                <span>{t('main.linkedinStep4')}</span>
                                            </li>
                                        </ol>
                                    </div>

                                    <ResumeUpload
                                        onSuccess={handleUploadSuccess}
                                        locale={locale}
                                    />

                                    <p className="text-center text-gray-400 text-sm mt-6">
                                        {t('main.secureNotice')}
                                    </p>

                                    {/* Back button */}
                                    <button
                                        onClick={() => setStep(1)}
                                        className="w-full mt-4 py-3 text-gray-500 hover:text-dark-teal font-semibold transition-colors"
                                    >
                                        {t('main.goBack')}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                )}

                {/* Step 3: AI Processing Animation */}
                {step === 3 && isGenerating && (
                    <div className="animate-fadeIn w-full max-w-xl">
                        {/* White Card Container */}
                        <div className="bg-white rounded-[32px] shadow-2xl p-8 md:p-12">
                            {/* Logo */}
                            <div className="flex items-center justify-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-gradient-to-br from-accent-green to-accent-teal rounded-xl flex items-center justify-center font-extrabold text-white text-lg">
                                    B
                                </div>
                                <span className="text-xl font-extrabold gradient-text">Best AI Resume</span>
                            </div>

                            {/* Progress Dots */}
                            <div className="flex justify-center gap-3 mb-8">
                                {[1, 2, 3, 4].map((s) => (
                                    <div
                                        key={s}
                                        className={`w-3 h-3 rounded-full transition-all duration-300 ${s <= 3
                                            ? 'bg-gradient-to-br from-accent-green to-accent-teal scale-125'
                                            : 'bg-[#e0f2ef]'
                                            }`}
                                    />
                                ))}
                            </div>

                            {/* AI Animation */}
                            <div className="relative w-28 h-28 mx-auto mb-8">
                                {/* Spinning rings */}
                                <div className="absolute inset-0 border-4 border-transparent border-t-accent-green rounded-full animate-spin" />
                                <div className="absolute inset-3 border-4 border-transparent border-t-accent-orange rounded-full animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }} />
                                <div className="absolute inset-6 border-4 border-transparent border-t-accent-teal rounded-full animate-spin" style={{ animationDuration: '1s' }} />

                                {/* Inner icon */}
                                <div className="absolute inset-8 flex items-center justify-center">
                                    <Sparkles className="text-accent-green" size={28} />
                                </div>
                            </div>

                            <h2 className="text-xl font-extrabold text-dark-teal mb-6 text-center">{t('main.generatingTitle')}</h2>

                            {/* Progress items */}
                            <div className="space-y-3 max-w-xs mx-auto">
                                {aiProcessingMessages.slice(0, 4).map((message, index) => (
                                    <div
                                        key={index}
                                        className={`flex items-center gap-3 p-3 rounded-xl text-sm transition-all duration-300 ${index < processingMessageIndex
                                            ? 'bg-accent-green/10 text-accent-green'
                                            : index === processingMessageIndex
                                                ? 'bg-accent-green/10 text-accent-green'
                                                : 'bg-[#f8fffe] text-gray-400'
                                            }`}
                                    >
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${index < processingMessageIndex
                                            ? 'border-accent-green bg-accent-green'
                                            : index === processingMessageIndex
                                                ? 'border-accent-green animate-pulse'
                                                : 'border-[#e0f2ef]'
                                            }`}>
                                            {index < processingMessageIndex && (
                                                <Check size={12} className="text-white" />
                                            )}
                                        </div>
                                        <span>{message}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 4: Template Selection */}
                {step === 4 && !isGenerating && (
                    <div className="animate-fadeIn w-full max-w-5xl pb-20">
                        {/* White Card Container */}
                        <div className="bg-white rounded-[32px] shadow-2xl p-8 md:p-12">
                            {/* Logo */}
                            <div className="flex items-center justify-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-gradient-to-br from-accent-green to-accent-teal rounded-xl flex items-center justify-center font-extrabold text-white text-lg">
                                    B
                                </div>
                                <span className="text-xl font-extrabold gradient-text">Best AI Resume</span>
                            </div>

                            {/* Progress Dots */}
                            <div className="flex justify-center gap-3 mb-8">
                                {[1, 2, 3, 4].map((s) => (
                                    <div
                                        key={s}
                                        className={`w-3 h-3 rounded-full transition-all duration-300 ${step === s
                                            ? 'bg-gradient-to-br from-accent-green to-accent-teal scale-125'
                                            : step > s
                                                ? 'bg-accent-green'
                                                : 'bg-[#e0f2ef]'
                                            }`}
                                    />
                                ))}
                            </div>

                            <div className="text-center mb-6">
                                <h2 className="text-2xl font-extrabold text-dark-teal mb-2">{t('step4.title')}</h2>
                                <p className="text-gray-500">
                                    {t('main.step4Subtitle')}
                                </p>
                            </div>

                            {/* Category Filters */}
                            <div className="flex flex-wrap justify-center gap-2 mb-6">
                                {(['all', 'professional', 'modern', 'creative', 'minimal'] as const).map((cat) => {
                                    const Icon = categoryIcons[cat];
                                    return (
                                        <button
                                            key={cat}
                                            onClick={() => setSelectedCategory(cat)}
                                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${selectedCategory === cat
                                                    ? 'bg-accent-green text-white'
                                                    : 'bg-[#e0f2ef] text-dark-teal hover:bg-accent-green/20'
                                                }`}
                                        >
                                            <Icon size={14} />
                                            {categoryLabels[cat]}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Template Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                                {filteredTemplates.map((template) => {
                                    return (
                                        <button
                                            key={template.id}
                                            onClick={() => handleTemplateSelect(template.id)}
                                            className={`group relative rounded-xl transition-all duration-200 ${formData.selectedTemplate === template.id
                                                ? 'ring-2 ring-accent-green ring-offset-2 scale-[1.02]'
                                                : 'motion-safe:hover:scale-[1.02] ring-1 ring-[#e0f2ef] hover:ring-accent-green'
                                                }`}
                                        >
                                            {/* Template Preview */}
                                            <Suspense fallback={<div className="w-full bg-gray-100" style={{ aspectRatio: '794 / 1123' }} />}>
                                                <BuilderTemplatePreview template={template} />
                                            </Suspense>

                                            {/* Template Info */}
                                            <div className="p-3 bg-white border-t border-[#e0f2ef]">
                                                <h4 className="font-bold text-dark-teal text-sm">{template.name}</h4>
                                                <p className="text-xs text-gray-400">{template.style}</p>
                                            </div>

                                            {/* Selected checkmark */}
                                            {formData.selectedTemplate === template.id && (
                                                <div className="absolute top-2 right-2 w-6 h-6 bg-accent-green rounded-full flex items-center justify-center">
                                                    <Check size={14} className="text-white" />
                                                </div>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>

                        </div>
                    </div>
                )}
            </main>

            {/* Sticky bottom bar — step 4 template selection */}
            {step === 4 && !isGenerating && (
                <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-t border-gray-200 px-6 py-4">
                    <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
                        <button
                            onClick={() => setStep(2)}
                            className="px-6 py-3 text-gray-500 hover:text-dark-teal font-semibold transition-colors"
                        >
                            {t('main.goBack')}
                        </button>
                        <button
                            onClick={handleFinish}
                            disabled={!builderTemplates.some(t => t.id === formData.selectedTemplate)}
                            className={`px-8 py-3.5 rounded-xl font-bold text-lg flex items-center gap-2 transition-colors ${builderTemplates.some(t => t.id === formData.selectedTemplate)
                                    ? 'bg-accent-orange text-white hover:bg-[#e85a2a] shadow-lg shadow-accent-orange/30'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                        >
                            {t('step4.continue')}
                            <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.5s ease-out;
                }
            `}</style>
        </div>
    );
}
