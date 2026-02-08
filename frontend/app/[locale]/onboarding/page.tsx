'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import {
    Sparkles,
    Upload,
    Linkedin,
    ArrowRight,
    ArrowLeft,
    Check,
    FileText,
    Wand2,
} from 'lucide-react';
import { useResumeStore, ResumeData } from '@/store/useResumeStore';
import { generateAIResumeAsync, OnboardingInput } from '@/lib/aiResumeGenerator';
import { builderTemplates, BuilderTemplate, samplePreviewData, getLayoutPresetId, getTemplateTheme } from '@/lib/templates/builder';
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

// Featured templates for onboarding (subset of all templates)
const featuredTemplates = builderTemplates.slice(0, 6);

// Realistic template preview component matching the templates page
function TemplatePreview({ template }: { template: BuilderTemplate }) {
    const accent = template.accentColor;
    const textDark = '#1e293b';
    const textMuted = '#64748b';
    const data = samplePreviewData;

    if (template.layout === 'sidebar') {
        return (
            <div className="w-full h-full bg-white rounded-lg overflow-hidden">
                <div className="h-full flex">
                    {/* Sidebar */}
                    <div className="w-[38%] h-full p-2 flex flex-col" style={{ backgroundColor: accent }}>
                        {/* Photo */}
                        <img
                            src={data.headshot}
                            alt={data.name}
                            className="w-10 h-10 rounded-full mx-auto mb-1.5 object-cover border-2 border-white/30"
                        />
                        {/* Contact */}
                        <div className="space-y-0.5 text-[4px] text-white/80 mb-1.5">
                            <p className="truncate">{data.email}</p>
                            <p>{data.phone}</p>
                            <p>{data.location}</p>
                        </div>
                        {/* Skills */}
                        <p className="text-[5px] font-semibold text-white mb-0.5">SKILLS</p>
                        <div className="flex flex-wrap gap-0.5">
                            {data.skills.slice(0, 3).map((skill, i) => (
                                <span key={i} className="text-[3px] bg-white/20 px-0.5 py-0.5 rounded text-white">{skill}</span>
                            ))}
                        </div>
                    </div>
                    {/* Main Content */}
                    <div className="flex-1 p-2">
                        <h3 className="text-[8px] font-bold" style={{ color: textDark }}>{data.name}</h3>
                        <p className="text-[5px] mb-1" style={{ color: accent }}>{data.title}</p>
                        <p className="text-[3px] mb-1.5 leading-relaxed line-clamp-2" style={{ color: textMuted }}>{data.summary}</p>
                        {/* Experience */}
                        <p className="text-[5px] font-semibold mb-0.5" style={{ color: textDark }}>EXPERIENCE</p>
                        {data.experience.slice(0, 2).map((exp, i) => (
                            <div key={i} className="mb-0.5">
                                <p className="text-[4px] font-medium" style={{ color: textDark }}>{exp.role}</p>
                                <p className="text-[3px]" style={{ color: textMuted }}>{exp.company}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (template.layout === 'header') {
        return (
            <div className="w-full h-full bg-white rounded-lg overflow-hidden">
                {/* Header */}
                <div className="p-2 text-center" style={{ backgroundColor: accent }}>
                    <img
                        src={data.headshot}
                        alt={data.name}
                        className="w-8 h-8 rounded-full mx-auto mb-1 object-cover border-2 border-white/30"
                    />
                    <h3 className="text-[8px] font-bold text-white">{data.name}</h3>
                    <p className="text-[5px] text-white/80">{data.title}</p>
                    <div className="flex justify-center gap-1 mt-0.5 text-[3px] text-white/70">
                        <span>{data.email}</span>
                        <span>•</span>
                        <span>{data.location}</span>
                    </div>
                </div>
                {/* Content */}
                <div className="p-2">
                    <p className="text-[3px] mb-1.5 leading-relaxed line-clamp-2" style={{ color: textMuted }}>{data.summary}</p>
                    {/* Experience */}
                    <p className="text-[5px] font-semibold mb-0.5" style={{ color: accent }}>EXPERIENCE</p>
                    {data.experience.slice(0, 2).map((exp, i) => (
                        <div key={i} className="mb-0.5">
                            <p className="text-[4px] font-medium" style={{ color: textDark }}>{exp.role}</p>
                            <p className="text-[3px]" style={{ color: textMuted }}>{exp.company} • {exp.years}</p>
                        </div>
                    ))}
                    {/* Skills */}
                    <p className="text-[5px] font-semibold mb-0.5 mt-1" style={{ color: accent }}>SKILLS</p>
                    <div className="flex flex-wrap gap-0.5">
                        {data.skills.slice(0, 4).map((skill, i) => (
                            <span key={i} className="text-[3px] px-0.5 py-0.5 rounded" style={{ backgroundColor: `${accent}20`, color: accent }}>{skill}</span>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (template.layout === 'minimal') {
        return (
            <div className="w-full h-full bg-white rounded-lg overflow-hidden p-2">
                {/* Simple Header */}
                <div className="mb-1.5">
                    <h3 className="text-[9px] font-bold" style={{ color: textDark }}>{data.name}</h3>
                    <p className="text-[5px]" style={{ color: accent }}>{data.title}</p>
                    <p className="text-[3px] mt-0.5" style={{ color: textMuted }}>{data.email} • {data.phone} • {data.location}</p>
                </div>
                {/* Summary */}
                <p className="text-[3px] mb-1.5 leading-relaxed line-clamp-2" style={{ color: textMuted }}>{data.summary}</p>
                {/* Experience */}
                <div className="border-t pt-1" style={{ borderColor: `${accent}30` }}>
                    <p className="text-[5px] font-semibold mb-0.5" style={{ color: textDark }}>Experience</p>
                    {data.experience.slice(0, 2).map((exp, i) => (
                        <div key={i} className="mb-0.5">
                            <p className="text-[4px] font-medium" style={{ color: textDark }}>{exp.role} - {exp.company}</p>
                            <p className="text-[3px]" style={{ color: textMuted }}>{exp.years}</p>
                        </div>
                    ))}
                </div>
                {/* Skills inline */}
                <div className="mt-1">
                    <p className="text-[3px]" style={{ color: textMuted }}>
                        <span className="font-medium" style={{ color: textDark }}>Skills:</span> {data.skills.slice(0, 5).join(', ')}
                    </p>
                </div>
            </div>
        );
    }

    // Classic layout (default)
    return (
        <div className="w-full h-full bg-white rounded-lg overflow-hidden p-2">
            {/* Header with photo */}
            <div className="flex items-start gap-1.5 mb-1.5 pb-1.5 border-b" style={{ borderColor: `${accent}30` }}>
                <img
                    src={data.headshot}
                    alt={data.name}
                    className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                    style={{ border: `2px solid ${accent}` }}
                />
                <div className="flex-1 text-center">
                    <h3 className="text-[8px] font-bold" style={{ color: textDark }}>{data.name}</h3>
                    <p className="text-[5px]" style={{ color: accent }}>{data.title}</p>
                    <div className="flex justify-center gap-1 mt-0.5 text-[3px]" style={{ color: textMuted }}>
                        <span>{data.email}</span>
                        <span>•</span>
                        <span>{data.phone}</span>
                    </div>
                </div>
            </div>
            {/* Summary */}
            <p className="text-[3px] mb-1.5 leading-relaxed line-clamp-2" style={{ color: textMuted }}>{data.summary}</p>
            {/* Experience */}
            <p className="text-[5px] font-semibold mb-0.5" style={{ color: accent }}>EXPERIENCE</p>
            {data.experience.slice(0, 2).map((exp, i) => (
                <div key={i} className="mb-0.5">
                    <div className="flex justify-between">
                        <p className="text-[4px] font-medium" style={{ color: textDark }}>{exp.role}</p>
                        <p className="text-[3px]" style={{ color: textMuted }}>{exp.years}</p>
                    </div>
                    <p className="text-[3px]" style={{ color: textMuted }}>{exp.company}</p>
                </div>
            ))}
            {/* Skills */}
            <p className="text-[5px] font-semibold mb-0.5 mt-1" style={{ color: accent }}>SKILLS</p>
            <div className="flex flex-wrap gap-0.5">
                {data.skills.slice(0, 4).map((skill, i) => (
                    <span key={i} className="text-[3px] px-0.5 py-0.5 rounded" style={{ backgroundColor: `${accent}15`, color: accent }}>{skill}</span>
                ))}
            </div>
        </div>
    );
}

export default function OnboardingPage() {
    const router = useRouter();
    const locale = useLocale();
    const { setResumeData, setTemplate, setTheme, setCustomThemeColor } = useResumeStore();
    const [step, setStep] = useState(1);
    const [isGenerating, setIsGenerating] = useState(false);
    const [processingMessageIndex, setProcessingMessageIndex] = useState(0);
    const [formData, setFormData] = useState<OnboardingState>({
        method: null,
        fullName: '',
        jobTitle: '',
        experienceLevel: 'mid',
        selectedTemplate: 'executive', // Default template
    });

    const localizedHref = (path: string) => `/${locale}${path}`;

    // Processing messages (always English)
    const aiProcessingMessages = [
        'Analyzing your profile...',
        'Crafting professional summary...',
        'Generating work experience...',
        'Adding relevant skills...',
        'Polishing final details...',
        'Almost there...',
    ];

    // Experience levels (always English)
    const experienceLevels: { value: ExperienceLevel; label: string; description: string }[] = [
        { value: 'entry', label: 'Entry Level', description: '0-2 years experience' },
        { value: 'mid', label: 'Mid Level', description: '3-5 years experience' },
        { value: 'senior', label: 'Senior', description: '6-10 years experience' },
        { value: 'executive', label: 'Executive', description: '10+ years experience' },
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
            references: [],
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
                // Always generate English content (no locale passed)
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
        // Get the actual layout preset ID for the selected template
        const layoutPresetId = getLayoutPresetId(formData.selectedTemplate);

        // Set the template using the layout preset ID
        setTemplate(layoutPresetId);

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

    const canProceedStep2 = formData.fullName.trim().length >= 2 && formData.jobTitle.trim().length >= 2;

    // Get selected template details
    const selectedTemplateData = featuredTemplates.find(t => t.id === formData.selectedTemplate);

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
                Back
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
                                    How would you like to start?
                                </h1>
                                <p className="text-gray-500 text-base">
                                    Choose the method that works best for you
                                </p>
                            </div>

                            <div className="grid md:grid-cols-3 gap-4">
                                {/* AI Option - Primary */}
                                <button
                                    onClick={() => handleMethodSelect('ai')}
                                    className="group relative bg-gradient-to-br from-accent-green/10 to-accent-teal/10 border-2 border-accent-green rounded-2xl p-6 text-left hover:scale-[1.02] transition-all duration-200"
                                >
                                    <div className="absolute top-3 right-3 bg-accent-orange text-white text-[10px] font-bold px-2 py-1 rounded-full">
                                        Recommended
                                    </div>
                                    <div className="w-12 h-12 bg-gradient-to-br from-accent-green to-accent-teal rounded-xl flex items-center justify-center mb-3">
                                        <Wand2 className="text-white" size={24} />
                                    </div>
                                    <h3 className="text-lg font-bold text-dark-teal mb-1">AI Generation</h3>
                                    <p className="text-gray-500 text-sm">
                                        Let AI create your professional resume
                                    </p>
                                </button>

                                {/* Upload Option */}
                                <button
                                    onClick={() => handleMethodSelect('upload')}
                                    className="group bg-[#f8fffe] border-2 border-[#e0f2ef] rounded-2xl p-6 text-left hover:border-accent-green hover:scale-[1.02] transition-all duration-200"
                                >
                                    <div className="w-12 h-12 bg-gradient-to-br from-accent-green to-accent-teal rounded-xl flex items-center justify-center mb-3">
                                        <Upload className="text-white" size={24} />
                                    </div>
                                    <h3 className="text-lg font-bold text-dark-teal mb-1">Upload Existing</h3>
                                    <p className="text-gray-500 text-sm">
                                        Import and enhance your resume
                                    </p>
                                </button>

                                {/* LinkedIn Option */}
                                <button
                                    onClick={() => handleMethodSelect('linkedin')}
                                    className="group bg-[#f8fffe] border-2 border-[#e0f2ef] rounded-2xl p-6 text-left hover:border-accent-green hover:scale-[1.02] transition-all duration-200"
                                >
                                    <div className="w-12 h-12 bg-gradient-to-br from-accent-green to-accent-teal rounded-xl flex items-center justify-center mb-3">
                                        <Linkedin className="text-white" size={24} />
                                    </div>
                                    <h3 className="text-lg font-bold text-dark-teal mb-1">Import LinkedIn</h3>
                                    <p className="text-gray-500 text-sm">
                                        Convert your LinkedIn profile
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
                                    Start with a blank resume
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
                                        <h2 className="text-2xl font-extrabold text-dark-teal mb-2">Tell us about yourself</h2>
                                        <p className="text-gray-500">
                                            We&apos;ll use this to create your personalized resume
                                        </p>
                                    </div>

                                    <div className="space-y-5">
                                        {/* Full Name */}
                                        <div>
                                            <label className="block text-sm font-bold text-dark-teal mb-2">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.fullName}
                                                onChange={(e) =>
                                                    setFormData((prev) => ({ ...prev, fullName: e.target.value }))
                                                }
                                                placeholder="e.g. John Smith"
                                                className="input-teal"
                                                autoFocus
                                            />
                                        </div>

                                        {/* Job Title */}
                                        <div>
                                            <label className="block text-sm font-bold text-dark-teal mb-2">
                                                Target Job Title
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.jobTitle}
                                                onChange={(e) =>
                                                    setFormData((prev) => ({ ...prev, jobTitle: e.target.value }))
                                                }
                                                placeholder="e.g. Software Engineer"
                                                className="input-teal"
                                            />
                                        </div>

                                        {/* Experience Level */}
                                        <div>
                                            <label className="block text-sm font-bold text-dark-teal mb-3">
                                                Experience Level
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
                                            Generate My Resume
                                            <ArrowRight size={20} />
                                        </button>

                                        {/* Back button */}
                                        <button
                                            onClick={() => setStep(1)}
                                            className="w-full py-3 text-gray-500 hover:text-dark-teal font-semibold transition-colors"
                                        >
                                            Go back
                                        </button>
                                    </div>
                                </>
                            )}

                            {/* Upload Resume */}
                            {formData.method === 'upload' && (
                                <>
                                    <div className="text-center mb-8">
                                        <h2 className="text-2xl font-extrabold text-dark-teal mb-2">Upload Your Resume</h2>
                                        <p className="text-gray-500">
                                            AI will analyze your resume and create an enhanced version
                                        </p>
                                    </div>

                                    <ResumeUpload
                                        onSuccess={handleUploadSuccess}
                                        locale={locale}
                                    />

                                    <p className="text-center text-gray-400 text-sm mt-6">
                                        Your file is processed securely and not stored on our servers
                                    </p>

                                    {/* Back button */}
                                    <button
                                        onClick={() => setStep(1)}
                                        className="w-full mt-4 py-3 text-gray-500 hover:text-dark-teal font-semibold transition-colors"
                                    >
                                        Go back
                                    </button>
                                </>
                            )}

                            {/* LinkedIn Import */}
                            {formData.method === 'linkedin' && (
                                <>
                                    <div className="text-center mb-6">
                                        <h2 className="text-2xl font-extrabold text-dark-teal mb-2">Import from LinkedIn</h2>
                                        <p className="text-gray-500">
                                            Download your profile as PDF from LinkedIn, then upload it here
                                        </p>
                                    </div>

                                    {/* Instructions */}
                                    <div className="bg-[#f8fffe] rounded-xl p-5 mb-6 border-2 border-[#e0f2ef]">
                                        <h3 className="font-bold text-dark-teal mb-3 text-sm">How to export your LinkedIn profile:</h3>
                                        <ol className="space-y-2 text-gray-600 text-sm">
                                            <li className="flex gap-3">
                                                <span className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-accent-green to-accent-teal text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                                                <span>Go to your <a href="https://www.linkedin.com/in/" target="_blank" rel="noopener noreferrer" className="text-accent-green hover:underline font-semibold">LinkedIn profile</a></span>
                                            </li>
                                            <li className="flex gap-3">
                                                <span className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-accent-green to-accent-teal text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                                                <span>Click the <strong>&quot;More&quot;</strong> button below your profile photo</span>
                                            </li>
                                            <li className="flex gap-3">
                                                <span className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-accent-green to-accent-teal text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                                                <span>Select <strong>&quot;Save to PDF&quot;</strong></span>
                                            </li>
                                            <li className="flex gap-3">
                                                <span className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-accent-green to-accent-teal text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
                                                <span>Upload the downloaded PDF below</span>
                                            </li>
                                        </ol>
                                    </div>

                                    <ResumeUpload
                                        onSuccess={handleUploadSuccess}
                                        locale={locale}
                                    />

                                    <p className="text-center text-gray-400 text-sm mt-6">
                                        Your file is processed securely and not stored on our servers
                                    </p>

                                    {/* Back button */}
                                    <button
                                        onClick={() => setStep(1)}
                                        className="w-full mt-4 py-3 text-gray-500 hover:text-dark-teal font-semibold transition-colors"
                                    >
                                        Go back
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

                            <h2 className="text-xl font-extrabold text-dark-teal mb-6 text-center">Creating your resume...</h2>

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
                    <div className="animate-fadeIn w-full max-w-3xl">
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

                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-extrabold text-dark-teal mb-2">Choose Your Template</h2>
                                <p className="text-gray-500">
                                    Select a design that matches your style
                                </p>
                            </div>

                            {/* Template Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                                {featuredTemplates.map((template) => (
                                    <button
                                        key={template.id}
                                        onClick={() => handleTemplateSelect(template.id)}
                                        className={`group relative rounded-xl overflow-hidden transition-all duration-200 ${formData.selectedTemplate === template.id
                                            ? 'ring-2 ring-accent-green ring-offset-2 scale-[1.02]'
                                            : 'hover:scale-[1.02] ring-1 ring-[#e0f2ef] hover:ring-accent-green'
                                            }`}
                                    >
                                        {/* Template Preview */}
                                        <div className="aspect-[3/4] bg-[#f8fffe] p-2">
                                            <TemplatePreview template={template} />
                                        </div>

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
                                ))}
                            </div>

                            {/* Browse more link */}
                            <div className="text-center mb-6">
                                <Link
                                    href={localizedHref('/templates')}
                                    className="text-gray-400 hover:text-accent-green text-sm inline-flex items-center gap-2 transition-colors"
                                >
                                    Browse all templates
                                    <ArrowRight size={14} />
                                </Link>
                            </div>

                            {/* Continue Button */}
                            <button
                                onClick={handleFinish}
                                className="w-full py-4 bg-accent-orange text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-[#e85a2a] transition-colors shadow-lg shadow-accent-orange/30"
                            >
                                Continue to Editor
                                <ArrowRight size={20} />
                            </button>

                            {/* Back button */}
                            <button
                                onClick={() => setStep(2)}
                                className="w-full mt-3 py-3 text-gray-500 hover:text-dark-teal font-semibold transition-colors"
                            >
                                Go back
                            </button>
                        </div>
                    </div>
                )}
            </main>

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
