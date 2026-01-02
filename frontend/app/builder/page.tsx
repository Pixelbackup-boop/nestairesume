'use client';

import { useState, useRef } from 'react';
import PersonalForm from '../../components/editor/PersonalForm';
import ExperienceForm from '../../components/editor/ExperienceForm';
import EducationForm from '../../components/editor/EducationForm';
import SkillsForm from '../../components/editor/SkillsForm';
import DesignTab from '../../components/editor/DesignTab';
import ResumePreview from '../../components/preview/ResumePreview';
import { useResumeStore } from '../../store/useResumeStore';
import { templates, colorPresets } from '../../lib/themes';
import Link from 'next/link';
import { useReactToPrint } from 'react-to-print';
import { Printer, ChevronDown, Layout, Palette, Sparkles } from 'lucide-react';

export default function BuilderPage() {
    const [activeTab, setActiveTab] = useState('personal');
    const [showTemplateDropdown, setShowTemplateDropdown] = useState(false);
    const [showColorDropdown, setShowColorDropdown] = useState(false);
    const { selectedTemplate, selectedTheme, setTemplate, setTheme, setCustomThemeColor } = useResumeStore();
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

                <div className="flex items-center gap-3">
                    {/* Template Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => {
                                setShowTemplateDropdown(!showTemplateDropdown);
                                setShowColorDropdown(false);
                            }}
                            className="flex items-center gap-2 bg-bg-card-light border border-border-subtle px-4 py-2 rounded-lg text-sm text-gray-300 hover:border-accent-green/50 transition"
                        >
                            <Layout size={16} />
                            <span className="hidden sm:inline">{templates.find(t => t.id === selectedTemplate)?.name || 'Template'}</span>
                            <ChevronDown size={14} className={`transition-transform ${showTemplateDropdown ? 'rotate-180' : ''}`} />
                        </button>
                        {showTemplateDropdown && (
                            <div className="absolute top-full right-0 mt-2 w-56 bg-bg-card border border-border-subtle rounded-lg shadow-xl z-50 py-2">
                                {templates.map((template) => (
                                    <button
                                        key={template.id}
                                        onClick={() => {
                                            setTemplate(template.id);
                                            setShowTemplateDropdown(false);
                                        }}
                                        className={`w-full text-left px-4 py-2.5 text-sm hover:bg-white/5 transition ${selectedTemplate === template.id ? 'text-accent-green bg-accent-green/10' : 'text-gray-300'}`}
                                    >
                                        <div className="font-medium">{template.name}</div>
                                        <div className="text-xs text-gray-500">{template.description}</div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

/* Color Dropdown */
                    <div className="relative">
                        <button
                            onClick={() => {
                                setShowColorDropdown(!showColorDropdown);
                                setShowTemplateDropdown(false);
                            }}
                            className="flex items-center gap-2 bg-bg-card-light border border-border-subtle px-4 py-2 rounded-lg text-sm text-gray-300 hover:border-accent-green/50 transition"
                        >
                            <Palette size={16} />
                            <span className="hidden sm:inline">{colorPresets.find(c => c.primary === selectedTheme)?.name || 'Color'}</span>
                            <div
                                className="w-4 h-4 rounded-full border border-white/20"
                                style={{ backgroundColor: colorPresets.find(c => c.primary === selectedTheme)?.primary || selectedTheme || '#1e3a8a' }}
                            />
                            <ChevronDown size={14} className={`transition-transform ${showColorDropdown ? 'rotate-180' : ''}`} />
                        </button>
                        {showColorDropdown && (
                            <div className="absolute top-full right-0 mt-2 w-48 bg-bg-card border border-border-subtle rounded-lg shadow-xl z-50 py-2">
                                {colorPresets.map((color) => (
                                    <button
                                        key={color.name}
                                        onClick={() => {
                                            setCustomThemeColor(color.primary);
                                            setShowColorDropdown(false);
                                        }}
                                        className={`w-full text-left px-4 py-2.5 text-sm hover:bg-white/5 transition flex items-center gap-3 ${selectedTheme === color.primary ? 'text-accent-green bg-accent-green/10' : 'text-gray-300'}`}
                                    >
                                        <div
                                            className="w-5 h-5 rounded-full border border-white/20"
                                            style={{ backgroundColor: color.primary }}
                                        />
                                        {color.name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Canvas Editor Link */}
                    <Link
                        href="/canvas-editor"
                        className="flex items-center gap-2 bg-accent-purple/20 text-accent-purple border border-accent-purple/30 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-accent-purple/30 transition"
                    >
                        <Sparkles size={16} /> <span className="hidden sm:inline">Canvas Editor</span>
                    </Link>

                    <button
                        onClick={() => handlePrint()}
                        className="flex items-center gap-2 bg-accent-green text-bg-primary px-4 py-2 rounded-lg font-semibold text-sm hover:bg-accent-teal transition"
                    >
                        <Printer size={16} /> <span className="hidden sm:inline">Download PDF</span>
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
