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
    Loader2,
    FileText,
    Wand2,
} from 'lucide-react';
import { useResumeStore } from '@/store/useResumeStore';
import { generateAIResumeAsync, OnboardingInput } from '@/lib/aiResumeGenerator';

type CreationMethod = 'ai' | 'upload' | 'linkedin' | null;
type ExperienceLevel = 'entry' | 'mid' | 'senior' | 'executive';

interface OnboardingState {
    method: CreationMethod;
    fullName: string;
    jobTitle: string;
    experienceLevel: ExperienceLevel;
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

export default function OnboardingPage() {
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

    const handleMethodSelect = (method: CreationMethod) => {
        setFormData((prev) => ({ ...prev, method }));
        if (method === 'ai') {
            setStep(2);
        } else {
            // For upload/linkedin, we could implement separate flows
            // For now, show a "coming soon" or redirect to AI
            setStep(2);
        }
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

            // Load generated data into store
            setResumeData(resumeData);

            // Navigate to builder
            setTimeout(() => {
                router.push('/builder');
            }, 500);
        } catch (error) {
            console.error('Error generating resume:', error);
            setIsGenerating(false);
            setStep(2);
        }
    };

    const canProceedStep2 = formData.fullName.trim().length >= 2 && formData.jobTitle.trim().length >= 2;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
            {/* Header */}
            <header className="border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
                <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-accent-green rounded-md flex items-center justify-center font-bold text-slate-900">
                            R
                        </div>
                        <span className="font-bold text-xl">ResumeAI</span>
                    </Link>

                    {/* Progress indicator */}
                    <div className="flex items-center gap-2">
                        {[1, 2, 3].map((s) => (
                            <React.Fragment key={s}>
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                                        step >= s
                                            ? 'bg-accent-green text-slate-900'
                                            : 'bg-slate-700 text-slate-400'
                                    }`}
                                >
                                    {step > s ? <Check size={16} /> : s}
                                </div>
                                {s < 3 && (
                                    <div
                                        className={`w-12 h-0.5 transition-all ${
                                            step > s ? 'bg-accent-green' : 'bg-slate-700'
                                        }`}
                                    />
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                    <div className="w-24" /> {/* Spacer for centering */}
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 py-12">
                {/* Step 1: Method Selection */}
                {step === 1 && (
                    <div className="animate-fadeIn">
                        <div className="text-center mb-12">
                            <h1 className="text-4xl font-bold mb-4">
                                How would you like to create your resume?
                            </h1>
                            <p className="text-slate-400 text-lg">
                                Choose your preferred method to get started
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                            {/* AI Option - Primary */}
                            <button
                                onClick={() => handleMethodSelect('ai')}
                                className="group relative bg-gradient-to-br from-accent-green/20 to-accent-teal/20 border-2 border-accent-green/50 rounded-2xl p-8 text-left hover:border-accent-green hover:scale-[1.02] transition-all duration-200"
                            >
                                <div className="absolute top-3 right-3 bg-accent-green text-slate-900 text-xs font-bold px-2 py-1 rounded-full">
                                    RECOMMENDED
                                </div>
                                <div className="w-14 h-14 bg-accent-green/20 rounded-xl flex items-center justify-center mb-4">
                                    <Wand2 className="text-accent-green" size={28} />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Create with AI</h3>
                                <p className="text-slate-400 text-sm">
                                    Tell us your profession and we'll generate a professional resume in seconds
                                </p>
                            </button>

                            {/* Upload Option */}
                            <button
                                onClick={() => handleMethodSelect('upload')}
                                className="group bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-8 text-left hover:border-slate-500 hover:bg-slate-800 transition-all duration-200"
                            >
                                <div className="w-14 h-14 bg-slate-700/50 rounded-xl flex items-center justify-center mb-4">
                                    <Upload className="text-slate-400" size={28} />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Upload Resume</h3>
                                <p className="text-slate-400 text-sm">
                                    Upload your existing resume and we'll enhance it
                                </p>
                                <span className="text-xs text-slate-500 mt-2 block">Coming soon</span>
                            </button>

                            {/* LinkedIn Option */}
                            <button
                                onClick={() => handleMethodSelect('linkedin')}
                                className="group bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-8 text-left hover:border-slate-500 hover:bg-slate-800 transition-all duration-200"
                            >
                                <div className="w-14 h-14 bg-slate-700/50 rounded-xl flex items-center justify-center mb-4">
                                    <Linkedin className="text-slate-400" size={28} />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Import LinkedIn</h3>
                                <p className="text-slate-400 text-sm">
                                    Import your profile from LinkedIn automatically
                                </p>
                                <span className="text-xs text-slate-500 mt-2 block">Coming soon</span>
                            </button>
                        </div>

                        {/* Skip option */}
                        <div className="text-center mt-10">
                            <Link
                                href="/builder"
                                className="text-slate-400 hover:text-white text-sm inline-flex items-center gap-2 transition-colors"
                            >
                                <FileText size={16} />
                                Or start with a blank resume
                            </Link>
                        </div>
                    </div>
                )}

                {/* Step 2: Basic Info */}
                {step === 2 && !isGenerating && (
                    <div className="animate-fadeIn max-w-xl mx-auto">
                        <button
                            onClick={() => setStep(1)}
                            className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors"
                        >
                            <ArrowLeft size={18} />
                            Back
                        </button>

                        <div className="text-center mb-10">
                            <div className="w-16 h-16 bg-accent-green/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Sparkles className="text-accent-green" size={32} />
                            </div>
                            <h1 className="text-3xl font-bold mb-3">Tell us about yourself</h1>
                            <p className="text-slate-400">
                                Just 2 questions and AI will create your perfect resume
                            </p>
                        </div>

                        <div className="space-y-6">
                            {/* Full Name */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                                    <User size={16} />
                                    Your Full Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.fullName}
                                    onChange={(e) =>
                                        setFormData((prev) => ({ ...prev, fullName: e.target.value }))
                                    }
                                    placeholder="e.g., John Smith"
                                    className="w-full px-4 py-3.5 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-accent-green transition-colors text-lg"
                                    autoFocus
                                />
                            </div>

                            {/* Job Title */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                                    <Briefcase size={16} />
                                    Job Title You're Applying For
                                </label>
                                <input
                                    type="text"
                                    value={formData.jobTitle}
                                    onChange={(e) =>
                                        setFormData((prev) => ({ ...prev, jobTitle: e.target.value }))
                                    }
                                    placeholder="e.g., Software Engineer, Marketing Manager"
                                    className="w-full px-4 py-3.5 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-accent-green transition-colors text-lg"
                                />
                            </div>

                            {/* Experience Level */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-3">
                                    <Clock size={16} />
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
                                            className={`p-4 rounded-xl border-2 text-left transition-all ${
                                                formData.experienceLevel === level.value
                                                    ? 'border-accent-green bg-accent-green/10'
                                                    : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                                            }`}
                                        >
                                            <div className="font-medium">{level.label}</div>
                                            <div className="text-xs text-slate-400">{level.description}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Generate Button */}
                            <button
                                onClick={handleGenerateResume}
                                disabled={!canProceedStep2}
                                className="w-full mt-4 py-4 bg-accent-green text-slate-900 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 hover:bg-accent-teal transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Wand2 size={20} />
                                Generate My Resume
                                <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 3: AI Processing Animation */}
                {step === 3 && isGenerating && (
                    <div className="animate-fadeIn text-center py-20">
                        <div className="relative w-32 h-32 mx-auto mb-8">
                            {/* Spinning outer ring */}
                            <div className="absolute inset-0 border-4 border-accent-green/20 rounded-full" />
                            <div className="absolute inset-0 border-4 border-transparent border-t-accent-green rounded-full animate-spin" />

                            {/* Inner icon */}
                            <div className="absolute inset-4 bg-accent-green/10 rounded-full flex items-center justify-center">
                                <Sparkles className="text-accent-green animate-pulse" size={40} />
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold mb-4">Creating Your Resume</h2>

                        <div className="h-8">
                            <p className="text-slate-400 text-lg animate-pulse">
                                {aiProcessingMessages[processingMessageIndex]}
                            </p>
                        </div>

                        {/* Progress dots */}
                        <div className="flex justify-center gap-2 mt-8">
                            {aiProcessingMessages.map((_, index) => (
                                <div
                                    key={index}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                        index <= processingMessageIndex
                                            ? 'bg-accent-green'
                                            : 'bg-slate-700'
                                    }`}
                                />
                            ))}
                        </div>

                        <p className="text-slate-500 text-sm mt-8">
                            This usually takes just a few seconds...
                        </p>
                    </div>
                )}
            </main>

            {/* Decorative background elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-green/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-teal/5 rounded-full blur-3xl" />
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
                    animation: fadeIn 0.4s ease-out;
                }
            `}</style>
        </div>
    );
}
