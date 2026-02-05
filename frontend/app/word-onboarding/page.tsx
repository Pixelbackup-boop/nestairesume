'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    Sparkles,
    Upload,
    Linkedin,
    ArrowRight,
    ArrowLeft,
    User,
    Briefcase,
    Clock,
    Check,
    FileText,
    Wand2,
    Layout,
} from 'lucide-react';
import { useResumeStore } from '@/store/useResumeStore';
import { generateAIResumeAsync, OnboardingInput } from '@/lib/aiResumeGenerator';
import { docxTemplates, DocxTemplate } from '@/lib/templates/docxTemplates';
import { samplePreviewData } from '@/lib/templates/builder';

type CreationMethod = 'ai' | 'upload' | 'linkedin' | null;
type ExperienceLevel = 'entry' | 'mid' | 'senior' | 'executive';

interface OnboardingState {
    method: CreationMethod;
    fullName: string;
    jobTitle: string;
    experienceLevel: ExperienceLevel;
    selectedTemplate: string;
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

// DOCX template preview component
function DocxTemplatePreview({ template }: { template: DocxTemplate }) {
    const accent = template.accentColor;
    const textDark = '#1e293b';
    const textMuted = '#64748b';
    const data = samplePreviewData;

    if (template.layout === 'sidebar') {
        return (
            <div className="w-full h-full bg-white rounded-lg overflow-hidden">
                <div className="h-full flex">
                    <div className="w-[38%] h-full p-2 flex flex-col" style={{ backgroundColor: accent }}>
                        <div className="w-10 h-10 rounded-full mx-auto mb-1.5 bg-white/30" />
                        <div className="space-y-0.5 text-[4px] text-white/80 mb-1.5">
                            <p className="truncate">{data.email}</p>
                            <p>{data.phone}</p>
                            <p>{data.location}</p>
                        </div>
                        <p className="text-[5px] font-semibold text-white mb-0.5">SKILLS</p>
                        <div className="flex flex-wrap gap-0.5">
                            {data.skills.slice(0, 3).map((skill, i) => (
                                <span key={i} className="text-[3px] bg-white/20 px-0.5 py-0.5 rounded text-white">{skill}</span>
                            ))}
                        </div>
                    </div>
                    <div className="flex-1 p-2">
                        <h3 className="text-[8px] font-bold" style={{ color: textDark }}>{data.name}</h3>
                        <p className="text-[5px] mb-1" style={{ color: accent }}>{data.title}</p>
                        <p className="text-[3px] mb-1.5 leading-relaxed line-clamp-2" style={{ color: textMuted }}>{data.summary}</p>
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
                <div className="p-2 text-center" style={{ backgroundColor: accent }}>
                    <div className="w-8 h-8 rounded-full mx-auto mb-1 bg-white/30" />
                    <h3 className="text-[8px] font-bold text-white">{data.name}</h3>
                    <p className="text-[5px] text-white/80">{data.title}</p>
                    <div className="flex justify-center gap-1 mt-0.5 text-[3px] text-white/70">
                        <span>{data.email}</span>
                        <span>&#8226;</span>
                        <span>{data.location}</span>
                    </div>
                </div>
                <div className="p-2">
                    <p className="text-[3px] mb-1.5 leading-relaxed line-clamp-2" style={{ color: textMuted }}>{data.summary}</p>
                    <p className="text-[5px] font-semibold mb-0.5" style={{ color: accent }}>EXPERIENCE</p>
                    {data.experience.slice(0, 2).map((exp, i) => (
                        <div key={i} className="mb-0.5">
                            <p className="text-[4px] font-medium" style={{ color: textDark }}>{exp.role}</p>
                            <p className="text-[3px]" style={{ color: textMuted }}>{exp.company} &#8226; {exp.years}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (template.layout === 'minimal') {
        return (
            <div className="w-full h-full bg-white rounded-lg overflow-hidden p-2">
                <div className="flex items-start gap-1.5 mb-1.5">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0" />
                    <div>
                        <h3 className="text-[9px] font-bold" style={{ color: textDark }}>{data.name}</h3>
                        <p className="text-[5px]" style={{ color: textMuted }}>{data.title}</p>
                    </div>
                    <div className="ml-auto text-right text-[3px]" style={{ color: textMuted }}>
                        <p>{data.email}</p>
                        <p>{data.phone}</p>
                    </div>
                </div>
                <hr className="border-gray-200 mb-1" />
                <p className="text-[3px] mb-1 leading-relaxed line-clamp-2" style={{ color: textMuted }}>{data.summary}</p>
                <div className="border-t pt-1" style={{ borderColor: '#ddd' }}>
                    <p className="text-[5px] font-semibold mb-0.5" style={{ color: textDark }}>Experience</p>
                    {data.experience.slice(0, 2).map((exp, i) => (
                        <div key={i} className="mb-0.5">
                            <p className="text-[4px] font-medium" style={{ color: textDark }}>{exp.role} - {exp.company}</p>
                            <p className="text-[3px]" style={{ color: textMuted }}>{exp.years}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // Classic layout (default)
    return (
        <div className="w-full h-full bg-white rounded-lg overflow-hidden p-2">
            <div className="flex items-start gap-1.5 mb-1.5 pb-1.5 border-b" style={{ borderColor: `${accent}30` }}>
                <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0" style={{ border: `2px solid ${accent}` }} />
                <div className="flex-1 text-center">
                    <h3 className="text-[8px] font-bold" style={{ color: accent }}>{data.name}</h3>
                    <p className="text-[5px]" style={{ color: textMuted }}>{data.title}</p>
                    <div className="flex justify-center gap-1 mt-0.5 text-[3px]" style={{ color: textMuted }}>
                        <span>{data.email}</span>
                        <span>&#8226;</span>
                        <span>{data.phone}</span>
                    </div>
                </div>
            </div>
            <p className="text-[3px] mb-1.5 leading-relaxed line-clamp-2" style={{ color: textMuted }}>{data.summary}</p>
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
            <p className="text-[5px] font-semibold mb-0.5 mt-1" style={{ color: accent }}>SKILLS</p>
            <div className="flex flex-wrap gap-0.5">
                {data.skills.slice(0, 4).map((skill, i) => (
                    <span key={i} className="text-[3px] px-0.5 py-0.5 rounded" style={{ backgroundColor: `${accent}15`, color: accent }}>{skill}</span>
                ))}
            </div>
        </div>
    );
}

export default function WordOnboardingPage() {
    const router = useRouter();
    const { setResumeData } = useResumeStore();
    const [step, setStep] = useState(1);
    const [isGenerating, setIsGenerating] = useState(false);
    const [processingMessageIndex, setProcessingMessageIndex] = useState(0);
    const [formData, setFormData] = useState<OnboardingState>({
        method: null,
        fullName: '',
        jobTitle: '',
        experienceLevel: 'mid',
        selectedTemplate: 'docx-classic',
    });

    const totalSteps = 4;

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

    const handleGenerateResume = async () => {
        if (!formData.fullName.trim() || !formData.jobTitle.trim()) return;

        setIsGenerating(true);
        setStep(3);

        try {
            const input: OnboardingInput = {
                fullName: formData.fullName.trim(),
                jobTitle: formData.jobTitle.trim(),
                experienceLevel: formData.experienceLevel,
            };
            const resumeData = await generateAIResumeAsync(input);
            setResumeData(resumeData);
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
        router.push(`/word-builder?template=${formData.selectedTemplate}`);
    };

    const canProceedStep2 = formData.fullName.trim().length >= 2 && formData.jobTitle.trim().length >= 2;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 text-gray-900">
            {/* Header */}
            <header className="border-b border-gray-200 bg-gray-50/80 backdrop-blur-sm sticky top-0 z-50">
                <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-accent-green rounded-md flex items-center justify-center font-bold text-gray-900">
                            R
                        </div>
                        <span className="font-bold text-xl">Best AI Resume</span>
                    </Link>

                    <div className="flex items-center gap-2">
                        {[1, 2, 3, 4].map((s) => (
                            <React.Fragment key={s}>
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                                        step >= s
                                            ? 'bg-accent-green text-gray-900'
                                            : 'bg-gray-200 text-gray-500'
                                    }`}
                                >
                                    {step > s ? <Check size={16} /> : s}
                                </div>
                                {s < totalSteps && (
                                    <div
                                        className={`w-8 h-0.5 transition-all ${
                                            step > s ? 'bg-accent-green' : 'bg-gray-200'
                                        }`}
                                    />
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                    <div className="w-24" />
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 py-12">
                {/* Step 1: Method Selection */}
                {step === 1 && (
                    <div className="animate-fadeIn">
                        <div className="text-center mb-12">
                            <div className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-4">
                                Microsoft Word Resume
                            </div>
                            <h1 className="text-4xl font-bold mb-4">
                                How would you like to create your Word resume?
                            </h1>
                            <p className="text-gray-500 text-lg">
                                Choose your preferred method to get started
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                            <button
                                onClick={() => handleMethodSelect('ai')}
                                className="group relative bg-gradient-to-br from-accent-green/20 to-accent-teal/20 border-2 border-accent-green/50 rounded-2xl p-8 text-left hover:border-accent-green hover:scale-[1.02] transition-all duration-200"
                            >
                                <div className="absolute top-3 right-3 bg-accent-green text-gray-900 text-xs font-bold px-2 py-1 rounded-full">
                                    RECOMMENDED
                                </div>
                                <div className="w-14 h-14 bg-accent-green/20 rounded-xl flex items-center justify-center mb-4">
                                    <Wand2 className="text-accent-green" size={28} />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Create with AI</h3>
                                <p className="text-gray-500 text-sm">
                                    Tell us your profession and we'll generate a Word resume in seconds
                                </p>
                            </button>

                            <button
                                onClick={() => handleMethodSelect('upload')}
                                className="group bg-gray-50 border-2 border-gray-200 rounded-2xl p-8 text-left hover:border-gray-300 hover:bg-white transition-all duration-200"
                            >
                                <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
                                    <Upload className="text-gray-500" size={28} />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Upload Resume</h3>
                                <p className="text-gray-500 text-sm">
                                    Upload your existing resume and we'll enhance it
                                </p>
                                <span className="text-xs text-gray-400 mt-2 block">Coming soon</span>
                            </button>

                            <button
                                onClick={() => handleMethodSelect('linkedin')}
                                className="group bg-gray-50 border-2 border-gray-200 rounded-2xl p-8 text-left hover:border-gray-300 hover:bg-white transition-all duration-200"
                            >
                                <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
                                    <Linkedin className="text-gray-500" size={28} />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Import LinkedIn</h3>
                                <p className="text-gray-500 text-sm">
                                    Import your profile from LinkedIn automatically
                                </p>
                                <span className="text-xs text-gray-400 mt-2 block">Coming soon</span>
                            </button>
                        </div>

                        <div className="text-center mt-10">
                            <Link
                                href="/word-builder"
                                className="text-gray-500 hover:text-gray-900 text-sm inline-flex items-center gap-2 transition-colors"
                            >
                                <FileText size={16} />
                                Or start with a blank Word resume
                            </Link>
                        </div>
                    </div>
                )}

                {/* Step 2: Basic Info */}
                {step === 2 && !isGenerating && (
                    <div className="animate-fadeIn max-w-xl mx-auto">
                        <button
                            onClick={() => setStep(1)}
                            className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-8 transition-colors"
                        >
                            <ArrowLeft size={18} />
                            Back
                        </button>

                        <div className="text-center mb-10">
                            <div className="w-16 h-16 bg-accent-green/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Sparkles className="text-accent-green" size={32} />
                            </div>
                            <h1 className="text-3xl font-bold mb-3">Tell us about yourself</h1>
                            <p className="text-gray-500">
                                Just 2 questions and AI will create your perfect Word resume
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
                                    <User size={16} />
                                    Your Full Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.fullName}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                                    placeholder="e.g., John Smith"
                                    className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-accent-green transition-colors text-lg"
                                    autoFocus
                                />
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
                                    <Briefcase size={16} />
                                    Job Title You're Applying For
                                </label>
                                <input
                                    type="text"
                                    value={formData.jobTitle}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, jobTitle: e.target.value }))}
                                    placeholder="e.g., Software Engineer, Marketing Manager"
                                    className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-accent-green transition-colors text-lg"
                                />
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-3">
                                    <Clock size={16} />
                                    Experience Level
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    {experienceLevels.map((level) => (
                                        <button
                                            key={level.value}
                                            onClick={() => setFormData((prev) => ({ ...prev, experienceLevel: level.value }))}
                                            className={`p-4 rounded-xl border-2 text-left transition-all ${
                                                formData.experienceLevel === level.value
                                                    ? 'border-accent-green bg-accent-green/10'
                                                    : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                                            }`}
                                        >
                                            <div className="font-medium">{level.label}</div>
                                            <div className="text-xs text-gray-500">{level.description}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={handleGenerateResume}
                                disabled={!canProceedStep2}
                                className="w-full mt-4 py-4 bg-accent-green text-gray-900 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 hover:bg-accent-teal transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Wand2 size={20} />
                                Generate My Resume
                                <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 3: AI Processing */}
                {step === 3 && isGenerating && (
                    <div className="animate-fadeIn text-center py-20">
                        <div className="relative w-32 h-32 mx-auto mb-8">
                            <div className="absolute inset-0 border-4 border-accent-green/20 rounded-full" />
                            <div className="absolute inset-0 border-4 border-transparent border-t-accent-green rounded-full animate-spin" />
                            <div className="absolute inset-4 bg-accent-green/10 rounded-full flex items-center justify-center">
                                <Sparkles className="text-accent-green animate-pulse" size={40} />
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold mb-4">Creating Your Resume</h2>
                        <div className="h-8">
                            <p className="text-gray-500 text-lg animate-pulse">
                                {aiProcessingMessages[processingMessageIndex]}
                            </p>
                        </div>
                        <div className="flex justify-center gap-2 mt-8">
                            {aiProcessingMessages.map((_, index) => (
                                <div
                                    key={index}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                        index <= processingMessageIndex ? 'bg-accent-green' : 'bg-gray-200'
                                    }`}
                                />
                            ))}
                        </div>
                        <p className="text-gray-400 text-sm mt-8">
                            This usually takes just a few seconds...
                        </p>
                    </div>
                )}

                {/* Step 4: Template Selection */}
                {step === 4 && !isGenerating && (
                    <div className="animate-fadeIn">
                        <button
                            onClick={() => setStep(2)}
                            className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-8 transition-colors"
                        >
                            <ArrowLeft size={18} />
                            Back to edit info
                        </button>

                        <div className="text-center mb-10">
                            <div className="w-16 h-16 bg-accent-green/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Layout className="text-accent-green" size={32} />
                            </div>
                            <h1 className="text-3xl font-bold mb-3">Choose Your Word Template</h1>
                            <p className="text-gray-500">
                                Your resume is ready! Pick a Microsoft Word template.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                            {docxTemplates.map((template) => (
                                <button
                                    key={template.id}
                                    onClick={() => handleTemplateSelect(template.id)}
                                    className={`group relative rounded-xl overflow-hidden transition-all duration-200 ${
                                        formData.selectedTemplate === template.id
                                            ? 'ring-2 ring-accent-green ring-offset-2 ring-offset-white scale-[1.02]'
                                            : 'hover:scale-[1.02] hover:ring-1 hover:ring-gray-300'
                                    }`}
                                >
                                    <div className="aspect-[3/4] bg-white p-2">
                                        <DocxTemplatePreview template={template} />
                                    </div>
                                    <div className="p-3 bg-white/90">
                                        <h4 className="font-medium text-gray-900 text-sm">{template.name}</h4>
                                        <p className="text-xs text-gray-500">{template.style}</p>
                                    </div>
                                    {formData.selectedTemplate === template.id && (
                                        <div className="absolute top-2 right-2 w-6 h-6 bg-accent-green rounded-full flex items-center justify-center">
                                            <Check size={14} className="text-gray-900" />
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={handleFinish}
                            className="w-full max-w-md mx-auto block py-4 bg-accent-green text-gray-900 rounded-xl font-semibold text-lg hover:bg-accent-teal transition-colors"
                        >
                            <span className="flex items-center justify-center gap-2">
                                Continue to Word Editor
                                <ArrowRight size={20} />
                            </span>
                        </button>
                    </div>
                )}
            </main>

            <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-green/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-teal/5 rounded-full blur-3xl" />
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.4s ease-out;
                }
            `}</style>
        </div>
    );
}
