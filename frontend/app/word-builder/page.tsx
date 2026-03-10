'use client';

import { useState, useRef, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import PersonalForm from '../../components/editor/PersonalForm';
import ExperienceForm from '../../components/editor/ExperienceForm';
import EducationForm from '../../components/editor/EducationForm';
import SkillsForm from '../../components/editor/SkillsForm';
import DesignTab from '../../components/editor/DesignTab';
import PagedPreview from '../../components/preview/PagedPreview';
import AuthModal from '../../components/auth/AuthModal';
import DownloadModal from '../../components/download/DownloadModal';
import { useResumeStore } from '../../store/useResumeStore';
import { downloadDocx } from '@/lib/docxService';
import { getDocxTemplateById } from '@/lib/templates/docxTemplates';
import Link from 'next/link';
import {
    Download, Sparkles,
    User, Briefcase, GraduationCap, Wrench, PaintBucket,
    Check, Home, Eye, EyeOff, ZoomIn, ZoomOut, RotateCcw,
    FileText,
} from 'lucide-react';

type TabId = 'personal' | 'experience' | 'education' | 'skills' | 'design';

function WordBuilderContent() {
    const searchParams = useSearchParams();
    const [activeTab, setActiveTab] = useState<TabId>('personal');
    const [previewScale, setPreviewScale] = useState(0.75);
    const [showPreview, setShowPreview] = useState(true);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [showDownloadModal, setShowDownloadModal] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [docxTemplateId, setDocxTemplateId] = useState('docx-classic');
    const { resumeData, selectedTheme, setTemplate } = useResumeStore();
    const componentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const authStatus = localStorage.getItem('isAuthenticated') === 'true';
        setIsAuthenticated(authStatus);
    }, []);

    // Handle URL parameters
    useEffect(() => {
        const templateId = searchParams.get('template');
        if (templateId) {
            setDocxTemplateId(templateId);
            // Map DOCX template layout to a preview layout
            const docxTpl = getDocxTemplateById(templateId);
            if (docxTpl) {
                // Use a matching PDF layout for preview purposes
                const layoutMap: Record<string, string> = {
                    classic: 'classic-normal-left',
                    sidebar: 'sidebar-left-normal',
                    header: 'header-normal-normal',
                    minimal: 'classic-normal-left',
                };
                setTemplate(layoutMap[docxTpl.layout] || 'classic-normal-left');
            }
        }
    }, [searchParams, setTemplate]);

    const handleDownloadClick = () => {
        if (!isAuthenticated) {
            setShowAuthModal(true);
        } else {
            setShowDownloadModal(true);
        }
    };

    const handleAuthSuccess = () => {
        setIsAuthenticated(true);
        setShowAuthModal(false);
        setShowDownloadModal(true);
    };

    // Errors propagate to DownloadModal which shows user-friendly error UI
    const handleConfirmDownload = async () => {
        await downloadDocx(
            resumeData,
            docxTemplateId,
            selectedTheme,
            resumeData.customThemeColor
        );
    };

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
        <div className="min-h-screen bg-gray-50 text-gray-900 flex">
            {/* Left Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shrink-0">
                <div className="p-4 border-b border-gray-200">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-accent-green rounded-md flex items-center justify-center font-bold text-gray-900">
                            R
                        </div>
                        <span className="font-bold text-lg text-gray-900">Best AI Resume</span>
                    </Link>
                </div>

                <div className="px-4 py-3 border-b border-gray-200">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                        <span>Progress</span>
                        <span className="font-semibold text-accent-green">{progress}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-accent-green to-accent-teal rounded-full transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

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
                                        ? 'bg-accent-green/10 border-l-4 border-accent-green text-gray-900'
                                        : 'border-l-4 border-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                                }`}
                            >
                                <div className={`relative ${isActive ? 'text-accent-green' : ''}`}>
                                    <Icon size={20} />
                                    {isComplete && !isActive && (
                                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-accent-green rounded-full border-2 border-gray-200" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <div className={`font-medium text-sm ${isActive ? 'text-gray-900' : ''}`}>
                                        {tab.label}
                                    </div>
                                    <div className="text-xs text-gray-400">{tab.description}</div>
                                </div>
                                {isActive && <Check size={16} className="text-accent-green" />}
                            </button>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-gray-200 space-y-2">
                    <Link
                        href="/templates"
                        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
                    >
                        <Sparkles size={16} />
                        Canvas Editor
                    </Link>
                    <Link
                        href="/"
                        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
                    >
                        <Home size={16} />
                        Back to Home
                    </Link>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 px-6 py-3 flex items-center justify-between shrink-0 z-40">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-gray-500">
                            <FileText size={18} />
                            <span className="text-sm font-medium text-gray-900">
                                {resumeData.personalInfo.fullName || 'Untitled Resume'}
                            </span>
                            <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full font-medium">
                                DOCX
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleDownloadClick}
                            className="flex items-center gap-2 bg-accent-green text-gray-900 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-accent-teal transition"
                        >
                            <Download size={16} />
                            <span className="hidden sm:inline">Download MS Word</span>
                        </button>
                    </div>
                </header>

                <div className="flex-1 flex overflow-hidden">
                    <div className={`${showPreview ? 'w-1/2' : 'flex-1'} flex flex-col bg-white border-r border-gray-200 transition-all`}>
                        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
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
                                                <h2 className="font-semibold text-gray-900">{currentTab?.label}</h2>
                                                <p className="text-xs text-gray-500">{currentTab?.description}</p>
                                            </div>
                                        </>
                                    );
                                })()}
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6">
                            {activeTab === 'personal' && <PersonalForm />}
                            {activeTab === 'experience' && <ExperienceForm />}
                            {activeTab === 'education' && <EducationForm />}
                            {activeTab === 'skills' && <SkillsForm />}
                            {activeTab === 'design' && <DesignTab />}
                        </div>
                    </div>

                    {showPreview && (
                        <div className="w-1/2 flex flex-col bg-gray-50 relative">
                            <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between bg-gray-50">
                                <span className="text-sm font-medium text-gray-600">Live Preview</span>
                                <div className="flex items-center gap-2">
                                    <button onClick={zoomOut} className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded transition" title="Zoom Out">
                                        <ZoomOut size={16} />
                                    </button>
                                    <span className="text-xs text-gray-500 w-12 text-center">
                                        {Math.round(previewScale * 100)}%
                                    </span>
                                    <button onClick={zoomIn} className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded transition" title="Zoom In">
                                        <ZoomIn size={16} />
                                    </button>
                                    <button onClick={resetZoom} className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded transition" title="Reset Zoom">
                                        <RotateCcw size={16} />
                                    </button>
                                </div>
                            </div>

                            <div className="flex-1 overflow-auto">
                                <PagedPreview ref={componentRef} scale={previewScale} />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <button
                onClick={() => setShowPreview(!showPreview)}
                className="fixed bottom-6 right-6 p-4 bg-accent-green text-gray-900 rounded-full shadow-lg hover:bg-accent-teal transition lg:hidden"
                title={showPreview ? 'Hide Preview' : 'Show Preview'}
            >
                {showPreview ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>

            <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                onSuccess={handleAuthSuccess}
            />

            <DownloadModal
                isOpen={showDownloadModal}
                onClose={() => setShowDownloadModal(false)}
                onDownload={handleConfirmDownload}
                format="MS Word"
            />
        </div>
    );
}

export default function WordBuilderPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <div className="text-gray-500">Loading Word builder...</div>
                </div>
            }
        >
            <WordBuilderContent />
        </Suspense>
    );
}
