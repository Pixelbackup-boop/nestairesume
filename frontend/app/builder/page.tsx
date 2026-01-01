'use client';

import { useState, useRef } from 'react';
import PersonalForm from '../../components/editor/PersonalForm';
import ExperienceForm from '../../components/editor/ExperienceForm';
import EducationForm from '../../components/editor/EducationForm';
import SkillsForm from '../../components/editor/SkillsForm';
import DesignTab from '../../components/editor/DesignTab';
import ResumePreview from '../../components/preview/ResumePreview';
import { useResumeStore } from '../../store/useResumeStore';
import { templates, themes } from '../../lib/themes';
import Link from 'next/link';
import { useReactToPrint } from 'react-to-print';
import { Printer } from 'lucide-react';

export default function BuilderPage() {
    const [activeTab, setActiveTab] = useState('personal');
    const { selectedTemplate, selectedTheme, setTemplate, setTheme } = useResumeStore();
    const componentRef = useRef(null);

    const handlePrint = useReactToPrint({
        contentRef: componentRef,
        documentTitle: 'Resume',
    });

    const tabs = [
        { id: 'personal', label: 'Personal' },
        { id: 'experience', label: 'Experience' },
        { id: 'education', label: 'Education' },
        { id: 'skills', label: 'Skills' },
        { id: 'design', label: 'Design' },
    ];

    return (
        <div className="min-h-screen bg-bg-primary text-gray-100 flex flex-col">
            {/* Header */}
            <header className="border-b border-border-subtle bg-bg-card px-6 py-4 flex items-center justify-between sticky top-0 z-50">
                <div className="flex items-center gap-4">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-accent-green rounded-md flex items-center justify-center font-bold text-bg-primary">R</div>
                        <span className="font-bold text-xl text-white">ResumeAI</span>
                    </Link>
                    <div className="h-6 w-px bg-border-subtle mx-2"></div>
                    <span className="text-gray-400 text-sm">Untitled Resume</span>
                </div>

                <div className="flex items-center gap-4">
                    {/* Selectors moved to Design Tab */}

                    <button
                        onClick={() => handlePrint()}
                        className="flex items-center gap-2 bg-accent-green text-bg-primary px-4 py-2 rounded-lg font-semibold text-sm hover:bg-accent-teal transition"
                    >
                        <Printer size={16} /> Download PDF
                    </button>
                </div>
            </header>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 h-[calc(100vh-73px)] overflow-hidden">
                {/* Left Panel - Editor */}
                <div className="flex flex-col border-r border-border-subtle bg-bg-card/50">
                    {/* Tabs */}
                    <div className="flex border-b border-border-subtle shrink-0 overflow-x-auto scrollbar-hide">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.id
                                    ? 'border-accent-green text-accent-green'
                                    : 'border-transparent text-gray-500 hover:text-gray-300'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Form Content */}
                    <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
                        {activeTab === 'personal' && <PersonalForm />}
                        {activeTab === 'experience' && <ExperienceForm />}
                        {activeTab === 'education' && <EducationForm />}
                        {activeTab === 'skills' && <SkillsForm />}
                        {activeTab === 'design' && <DesignTab />}
                    </div>
                </div>


                {/* Right Panel - Preview */}
                <div className="bg-gray-900 overflow-y-auto p-8 flex justify-center items-start">
                    <div className="w-full max-w-[210mm] min-h-[297mm] bg-white text-black shadow-2xl origin-top transform scale-90 sm:scale-100 transition-transform">
                        <div ref={componentRef} className="h-full w-full">
                            <ResumePreview />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
