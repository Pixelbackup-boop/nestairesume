'use client';

import { useState, useRef, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import PersonalForm from '../../components/editor/PersonalForm';
import ExperienceForm from '../../components/editor/ExperienceForm';
import EducationForm from '../../components/editor/EducationForm';
import SkillsForm from '../../components/editor/SkillsForm';
import DesignTab from '../../components/editor/DesignTab';
import ResumePreview from '../../components/preview/ResumePreview';
import AuthModal from '../../components/auth/AuthModal';
import DownloadModal from '../../components/download/DownloadModal';
import { useResumeStore } from '../../store/useResumeStore';
import { templates, colorPresets } from '../../lib/themes';
import Link from 'next/link';
import { useReactToPrint } from 'react-to-print';
import {
    Download, ChevronDown, Layout, Palette, Sparkles,
    User, Briefcase, GraduationCap, Wrench, PaintBucket,
    Check, Home, Eye, EyeOff, ZoomIn, ZoomOut, RotateCcw,
    FileText
} from 'lucide-react';

// Sample data for prefilling
const sampleResumeData = {
    personalInfo: {
        fullName: 'Sarah Johnson',
        jobTitle: 'UX Designer',
        email: 'sarah.j@email.com',
        phone: '+1 (555) 987-6543',
        location: 'New York, NY',
        website: 'sarahjohnson.design',
        linkedin: 'linkedin.com/in/sarahjohnson',
        summary: 'Creative UX Designer with 6+ years of experience crafting user-centered digital experiences. Passionate about solving complex problems through intuitive design. Skilled in leading cross-functional teams and delivering innovative solutions that drive user engagement and business growth.',
        profileImage: '/Img/headshot.png',
        imageShape: 'circle' as const,
    },
    experience: [
        {
            id: 'exp-1',
            title: 'Lead UX Designer',
            company: 'DesignHub Agency',
            location: 'New York, NY',
            startDate: '2021-01',
            endDate: '',
            current: true,
            description: 'Lead a team of 5 designers in creating user-centered digital products. Spearheaded the redesign of client websites resulting in 40% increase in user engagement. Established design system and component library used across all projects.',
        },
        {
            id: 'exp-2',
            title: 'Senior UX Designer',
            company: 'TechStart Inc',
            location: 'San Francisco, CA',
            startDate: '2019-03',
            endDate: '2021-01',
            current: false,
            description: 'Designed and prototyped mobile applications for iOS and Android platforms. Conducted user research and usability testing to inform design decisions. Collaborated with product managers and engineers to deliver features on time.',
        },
        {
            id: 'exp-3',
            title: 'UX Designer',
            company: 'Creative Solutions',
            location: 'Boston, MA',
            startDate: '2017-06',
            endDate: '2019-03',
            current: false,
            description: 'Created wireframes, prototypes, and high-fidelity designs for web applications. Worked closely with stakeholders to translate business requirements into design solutions. Improved product usability scores by 35%.',
        },
    ],
    education: [
        {
            id: 'edu-1',
            school: 'Rhode Island School of Design',
            degree: 'Bachelor of Fine Arts in Graphic Design',
            location: 'Providence, RI',
            startDate: '2013-09',
            endDate: '2017-05',
            current: false,
            description: 'Graduated with honors. Focus on digital design and user experience. Led student design club.',
        },
    ],
    skills: [
        { id: 'skill-1', name: 'Figma', level: 5 },
        { id: 'skill-2', name: 'Sketch', level: 5 },
        { id: 'skill-3', name: 'Adobe XD', level: 4 },
        { id: 'skill-4', name: 'Prototyping', level: 5 },
        { id: 'skill-5', name: 'User Research', level: 4 },
        { id: 'skill-6', name: 'Wireframing', level: 5 },
        { id: 'skill-7', name: 'Design Systems', level: 4 },
        { id: 'skill-8', name: 'HTML/CSS', level: 3 },
    ],
};

type TabId = 'personal' | 'experience' | 'education' | 'skills' | 'design';

function BuilderContent() {
    const searchParams = useSearchParams();
    const [activeTab, setActiveTab] = useState<TabId>('personal');
    const [showTemplateDropdown, setShowTemplateDropdown] = useState(false);
    const [showColorDropdown, setShowColorDropdown] = useState(false);
    const [previewScale, setPreviewScale] = useState(0.75);
    const [showPreview, setShowPreview] = useState(true);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [showDownloadModal, setShowDownloadModal] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { resumeData, selectedTemplate, selectedTheme, setTemplate, setCustomThemeColor, setResumeData } = useResumeStore();
    const componentRef = useRef(null);

    // Check authentication status on mount
    useEffect(() => {
        const authStatus = localStorage.getItem('isAuthenticated') === 'true';
        setIsAuthenticated(authStatus);
    }, []);

    // Pre-fill form with sample data when coming from templates page
    useEffect(() => {
        const shouldPrefill = searchParams.get('prefill') === 'true';
        const templateId = searchParams.get('template');

        if (shouldPrefill) {
            setResumeData(sampleResumeData);
            if (templateId) {
                setTemplate(templateId);
            }
        }
    }, [searchParams, setResumeData, setTemplate]);

    const handlePrint = useReactToPrint({
        contentRef: componentRef,
        documentTitle: 'Resume',
    });

    // Handle download - triggers auth modal if not logged in
    const handleDownloadClick = () => {
        if (!isAuthenticated) {
            setShowAuthModal(true);
        } else {
            setShowDownloadModal(true);
        }
    };

    // Called when auth is successful
    const handleAuthSuccess = () => {
        setIsAuthenticated(true);
        setShowAuthModal(false);
        // After successful auth, show download modal
        setShowDownloadModal(true);
    };

    // Called when download is confirmed
    const handleConfirmDownload = () => {
        handlePrint();
    };

    // Calculate section completion status
    const sectionStatus = useMemo(() => {
        const { personalInfo, experience, education, skills } = resumeData;
        return {
            personal: !!(personalInfo.fullName || personalInfo.email || personalInfo.jobTitle),
            experience: experience.length > 0,
            education: education.length > 0,
            skills: skills.length > 0,
            design: true,
        };
    }, [resumeData]);

    // Calculate overall progress
    const progress = useMemo(() => {
        const sections = Object.values(sectionStatus);
        const completed = sections.filter(Boolean).length;
        return Math.round((completed / sections.length) * 100);
    }, [sectionStatus]);

    const tabs: { id: TabId; label: string; icon: typeof User; description: string }[] = [
        { id: 'personal', label: 'Personal', icon: User, description: 'Basic info & summary' },
        { id: 'experience', label: 'Experience', icon: Briefcase, description: 'Work history' },
        { id: 'education', label: 'Education', icon: GraduationCap, description: 'Academic background' },
        { id: 'skills', label: 'Skills', icon: Wrench, description: 'Your expertise' },
        { id: 'design', label: 'Design', icon: PaintBucket, description: 'Style & layout' },
    ];

    const zoomIn = () => setPreviewScale(Math.min(previewScale + 0.1, 1.2));
    const zoomOut = () => setPreviewScale(Math.max(previewScale - 0.1, 0.4));
    const resetZoom = () => setPreviewScale(0.75);

    return (
        <div className="min-h-screen bg-slate-900 text-gray-100 flex">
            {/* Left Sidebar - Vertical Tabs */}
            <aside className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col shrink-0">
                {/* Logo */}
                <div className="p-4 border-b border-slate-700">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-accent-green rounded-md flex items-center justify-center font-bold text-slate-900">
                            R
                        </div>
                        <span className="font-bold text-lg text-white">ResumeAI</span>
                    </Link>
                </div>

                {/* Progress */}
                <div className="px-4 py-3 border-b border-slate-700">
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                        <span>Progress</span>
                        <span className="font-semibold text-accent-green">{progress}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-accent-green to-accent-teal rounded-full transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Vertical Tabs */}
                <nav className="flex-1 py-2 overflow-y-auto">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isComplete = sectionStatus[tab.id];
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-all ${
                                    isActive
                                        ? 'bg-accent-green/10 border-l-4 border-accent-green text-white'
                                        : 'border-l-4 border-transparent text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'
                                }`}
                            >
                                <div className={`relative ${isActive ? 'text-accent-green' : ''}`}>
                                    <Icon size={20} />
                                    {isComplete && !isActive && (
                                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-accent-green rounded-full border-2 border-slate-800" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <div className={`font-medium text-sm ${isActive ? 'text-white' : ''}`}>
                                        {tab.label}
                                    </div>
                                    <div className="text-xs text-slate-500">{tab.description}</div>
                                </div>
                                {isActive && <Check size={16} className="text-accent-green" />}
                            </button>
                        );
                    })}
                </nav>

                {/* Bottom Actions */}
                <div className="p-4 border-t border-slate-700 space-y-2">
                    <Link
                        href="/templates"
                        className="flex items-center gap-2 px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition"
                    >
                        <Sparkles size={16} />
                        Canvas Editor
                    </Link>
                    <Link
                        href="/"
                        className="flex items-center gap-2 px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition"
                    >
                        <Home size={16} />
                        Back to Home
                    </Link>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Header */}
                <header className="bg-slate-800/80 backdrop-blur-sm border-b border-slate-700 px-6 py-3 flex items-center justify-between shrink-0 z-40">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-slate-400">
                            <FileText size={18} />
                            <span className="text-sm font-medium text-white">
                                {resumeData.personalInfo.fullName || 'Untitled Resume'}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Template Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => {
                                    setShowTemplateDropdown(!showTemplateDropdown);
                                    setShowColorDropdown(false);
                                }}
                                className="flex items-center gap-2 bg-slate-700 border border-slate-600 px-3 py-2 rounded-lg text-sm text-slate-300 hover:border-slate-500 transition"
                            >
                                <Layout size={16} />
                                <span className="hidden md:inline">
                                    {templates.find((t) => t.id === selectedTemplate)?.name || 'Template'}
                                </span>
                                <ChevronDown size={14} className={`transition-transform ${showTemplateDropdown ? 'rotate-180' : ''}`} />
                            </button>
                            {showTemplateDropdown && (
                                <div className="absolute top-full right-0 mt-2 w-56 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50 py-2">
                                    {templates.map((template) => (
                                        <button
                                            key={template.id}
                                            onClick={() => {
                                                setTemplate(template.id);
                                                setShowTemplateDropdown(false);
                                            }}
                                            className={`w-full text-left px-4 py-2.5 text-sm hover:bg-slate-700 transition ${
                                                selectedTemplate === template.id
                                                    ? 'text-accent-green bg-accent-green/10'
                                                    : 'text-slate-300'
                                            }`}
                                        >
                                            <div className="font-medium">{template.name}</div>
                                            <div className="text-xs text-slate-500">{template.description}</div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Color Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => {
                                    setShowColorDropdown(!showColorDropdown);
                                    setShowTemplateDropdown(false);
                                }}
                                className="flex items-center gap-2 bg-slate-700 border border-slate-600 px-3 py-2 rounded-lg text-sm text-slate-300 hover:border-slate-500 transition"
                            >
                                <Palette size={16} />
                                <div
                                    className="w-4 h-4 rounded-full border border-slate-500"
                                    style={{
                                        backgroundColor:
                                            colorPresets.find((c) => c.primary === selectedTheme)?.primary ||
                                            selectedTheme ||
                                            '#1e3a8a',
                                    }}
                                />
                                <ChevronDown size={14} className={`transition-transform ${showColorDropdown ? 'rotate-180' : ''}`} />
                            </button>
                            {showColorDropdown && (
                                <div className="absolute top-full right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50 py-2">
                                    {colorPresets.map((color) => (
                                        <button
                                            key={color.name}
                                            onClick={() => {
                                                setCustomThemeColor(color.primary);
                                                setShowColorDropdown(false);
                                            }}
                                            className={`w-full text-left px-4 py-2.5 text-sm hover:bg-slate-700 transition flex items-center gap-3 ${
                                                selectedTheme === color.primary
                                                    ? 'text-accent-green bg-accent-green/10'
                                                    : 'text-slate-300'
                                            }`}
                                        >
                                            <div
                                                className="w-5 h-5 rounded-full border border-slate-500"
                                                style={{ backgroundColor: color.primary }}
                                            />
                                            {color.name}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Download Button */}
                        <button
                            onClick={handleDownloadClick}
                            className="flex items-center gap-2 bg-accent-green text-slate-900 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-accent-teal transition"
                        >
                            <Download size={16} />
                            <span className="hidden sm:inline">Download PDF</span>
                        </button>
                    </div>
                </header>

                {/* Content Grid: Editor + Preview */}
                <div className="flex-1 flex overflow-hidden">
                    {/* Editor Panel */}
                    <div className={`${showPreview ? 'w-1/2' : 'flex-1'} flex flex-col bg-slate-850 border-r border-slate-700 transition-all`}>
                        {/* Section Header */}
                        <div className="px-6 py-4 border-b border-slate-700 bg-slate-800/50">
                            <div className="flex items-center gap-3">
                                {(() => {
                                    const currentTab = tabs.find((t) => t.id === activeTab);
                                    const Icon = currentTab?.icon || User;
                                    return (
                                        <>
                                            <div className="w-10 h-10 bg-accent-green/10 rounded-lg flex items-center justify-center">
                                                <Icon size={20} className="text-accent-green" />
                                            </div>
                                            <div>
                                                <h2 className="font-semibold text-white">{currentTab?.label}</h2>
                                                <p className="text-xs text-slate-400">{currentTab?.description}</p>
                                            </div>
                                        </>
                                    );
                                })()}
                            </div>
                        </div>

                        {/* Form Content */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {activeTab === 'personal' && <PersonalForm />}
                            {activeTab === 'experience' && <ExperienceForm />}
                            {activeTab === 'education' && <EducationForm />}
                            {activeTab === 'skills' && <SkillsForm />}
                            {activeTab === 'design' && <DesignTab />}
                        </div>
                    </div>

                    {/* Preview Panel */}
                    {showPreview && (
                        <div className="w-1/2 flex flex-col bg-slate-900">
                            {/* Preview Header */}
                            <div className="px-4 py-3 border-b border-slate-700 flex items-center justify-between bg-slate-800/50">
                                <span className="text-sm font-medium text-slate-300">Live Preview</span>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={zoomOut}
                                        className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition"
                                        title="Zoom Out"
                                    >
                                        <ZoomOut size={16} />
                                    </button>
                                    <span className="text-xs text-slate-400 w-12 text-center">
                                        {Math.round(previewScale * 100)}%
                                    </span>
                                    <button
                                        onClick={zoomIn}
                                        className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition"
                                        title="Zoom In"
                                    >
                                        <ZoomIn size={16} />
                                    </button>
                                    <button
                                        onClick={resetZoom}
                                        className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition"
                                        title="Reset Zoom"
                                    >
                                        <RotateCcw size={16} />
                                    </button>
                                </div>
                            </div>

                            {/* Preview Content */}
                            <div className="flex-1 overflow-auto p-6 flex justify-center">
                                <div
                                    className="bg-white shadow-2xl transition-transform origin-top"
                                    style={{
                                        width: '210mm',
                                        minHeight: '297mm',
                                        transform: `scale(${previewScale})`,
                                    }}
                                >
                                    <div ref={componentRef} className="w-full h-full">
                                        <ResumePreview />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Toggle Preview Button (Mobile/Hidden Preview) */}
            <button
                onClick={() => setShowPreview(!showPreview)}
                className="fixed bottom-6 right-6 p-4 bg-accent-green text-slate-900 rounded-full shadow-lg hover:bg-accent-teal transition lg:hidden"
                title={showPreview ? 'Hide Preview' : 'Show Preview'}
            >
                {showPreview ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>

            {/* Auth Modal */}
            <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                onSuccess={handleAuthSuccess}
            />

            {/* Download Modal */}
            <DownloadModal
                isOpen={showDownloadModal}
                onClose={() => setShowDownloadModal(false)}
                onDownload={handleConfirmDownload}
            />
        </div>
    );
}

// Wrap with Suspense for useSearchParams
export default function BuilderPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                    <div className="text-slate-400">Loading builder...</div>
                </div>
            }
        >
            <BuilderContent />
        </Suspense>
    );
}
