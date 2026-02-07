'use client';

import { useState, useRef, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import PersonalForm from '@/components/editor/PersonalForm';
import ExperienceForm from '@/components/editor/ExperienceForm';
import EducationForm from '@/components/editor/EducationForm';
import SkillsForm from '@/components/editor/SkillsForm';
import DesignTab from '@/components/editor/DesignTab';
import PagedPreview from '@/components/preview/PagedPreview';
import DownloadModal from '@/components/download/DownloadModal';
import { useResumeStore } from '@/store/useResumeStore';
import { useAuthStore } from '@/store/useAuthStore';
import { templates } from '@/lib/themes';
import {
    getLayoutPresetId,
    getTemplateById,
    getTemplateTheme,
    getTemplateThumbnail,
    sampleResumeData,
    colorPresets
} from '@/lib/templates/builder';
import Link from 'next/link';
import { downloadPdf, PdfTranslations } from '@/lib/pdfService';
import {
    Download, ChevronDown, Layout, Palette, Sparkles,
    User, Briefcase, GraduationCap, Wrench, PaintBucket,
    Check, Home, Eye, EyeOff, ZoomIn, ZoomOut, RotateCcw,
    FileText, Image, X, ChevronRight, Menu, CheckCircle, Crown
} from 'lucide-react';

type TabId = 'personal' | 'experience' | 'education' | 'skills' | 'design';

function BuilderContent() {
    const searchParams = useSearchParams();
    const t = useTranslations('Resume');
    const locale = useLocale();
    const [activeTab, setActiveTab] = useState<TabId>('personal');
    const [showTemplateDropdown, setShowTemplateDropdown] = useState(false);
    const [showColorDropdown, setShowColorDropdown] = useState(false);
    const [previewScale, setPreviewScale] = useState(0.75);
    const [showPreview, setShowPreview] = useState(true);
    const [showDownloadModal, setShowDownloadModal] = useState(false);
    const [showWelcomeModal, setShowWelcomeModal] = useState(false);
    const [showReferencePanel, setShowReferencePanel] = useState(false);
    const router = useRouter();
    const { isAuthenticated, refreshUser } = useAuthStore();
    const [templateThumbnail, setTemplateThumbnail] = useState<string | undefined>();
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const { resumeData, selectedTemplate, selectedTemplateId, selectedTheme, setTemplate, setTemplateId, setTheme, setCustomThemeColor, setResumeData } = useResumeStore();
    const componentRef = useRef<HTMLDivElement>(null);

    // Build translations object for PDF generation
    const pdfTranslations: PdfTranslations = useMemo(() => ({
        sections: {
            experience: t('sections.experience'),
            workExperience: t('sections.workExperience'),
            education: t('sections.education'),
            skills: t('sections.skills'),
            languages: t('sections.languages'),
            interests: t('sections.interests'),
            strengths: t('sections.strengths'),
            certifications: t('sections.certifications'),
            awards: t('sections.awards'),
            references: t('sections.references'),
            summary: t('sections.summary'),
            profile: t('sections.profile'),
            contact: t('sections.contact'),
            additionalInfo: t('sections.additionalInfo'),
            socialLinks: t('sections.socialLinks'),
            personalDetails: t('sections.personalDetails'),
            credentials: t('sections.credentials'),
        },
        labels: {
            present: t('labels.present'),
        },
    }), [t]);

    // Refresh user auth status on mount
    useEffect(() => {
        refreshUser();
    }, [refreshUser]);

    // Show welcome modal for newly registered users
    useEffect(() => {
        if (searchParams.get('registered') === 'true') {
            setShowWelcomeModal(true);
            // Clear the query param to prevent re-showing on refresh
            const url = new URL(window.location.href);
            url.searchParams.delete('registered');
            router.replace(url.pathname + url.search, { scroll: false });
        }
    }, [searchParams, router]);

    // Handle URL parameters for template and prefill
    useEffect(() => {
        const shouldPrefill = searchParams.get('prefill') === 'true';
        const templateId = searchParams.get('template');

        // If coming from templates page with prefill, use sample data
        if (shouldPrefill) {
            setResumeData(sampleResumeData);
        }

        // Apply template if specified (works with both onboarding and templates page)
        if (templateId) {
            // Check if this is a user-friendly template ID (like "executive", "modern")
            // If so, map it to the actual layout preset ID
            const builderTemplate = getTemplateById(templateId);
            if (builderTemplate) {
                // It's a user-friendly ID, use the mapped layout preset
                setTemplate(builderTemplate.layoutPresetId);

                // Set unique React component ID if template has one (for unique layouts)
                const uniqueTemplateId = (builderTemplate as { templateId?: string }).templateId;
                setTemplateId(uniqueTemplateId || null);

                // Also apply the template's theme color
                const themeSettings = getTemplateTheme(templateId);
                if (themeSettings.themeId) {
                    setTheme(themeSettings.themeId);
                } else if (themeSettings.customColor) {
                    setCustomThemeColor(themeSettings.customColor);
                }

                // Set template thumbnail for reference panel
                const thumbnail = getTemplateThumbnail(templateId);
                setTemplateThumbnail(thumbnail);
            } else {
                // It's already a layout preset ID, use directly
                setTemplate(templateId);
                setTemplateId(null);
                setTemplateThumbnail(undefined);
            }
        }
    }, [searchParams, setResumeData, setTemplate, setTemplateId, setTheme, setCustomThemeColor]);

    // Handle download - show download modal (modal handles auth check internally)
    const handleDownloadClick = () => {
        setShowDownloadModal(true);
    };

    // Called when download is confirmed - calls backend PDF API
    const handleConfirmDownload = async () => {
        try {
            // Use exact template ID if available, otherwise fall back to layout type
            const templateForPdf = selectedTemplateId || selectedTemplate;
            await downloadPdf(
                resumeData,
                templateForPdf,
                selectedTheme,
                resumeData.customThemeColor,
                pdfTranslations,
                locale
            );
        } catch (error) {
            console.error('PDF download failed:', error);
            alert('Failed to generate PDF. Please try again.');
        }
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
        <div className="min-h-screen bg-gray-50 text-gray-900 flex">
            {/* Mobile Sidebar Overlay */}
            {mobileSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setMobileSidebarOpen(false)}
                />
            )}

            {/* Left Sidebar - Vertical Tabs */}
            <aside className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col transform transition-transform duration-300 ease-in-out
                lg:relative lg:translate-x-0
                ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                {/* Logo */}
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-accent-green rounded-md flex items-center justify-center font-bold text-gray-900">
                            R
                        </div>
                        <span className="font-bold text-lg text-gray-900">Best AI Resume</span>
                    </Link>
                    {/* Close button for mobile */}
                    <button
                        onClick={() => setMobileSidebarOpen(false)}
                        className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition lg:hidden"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Progress */}
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

                {/* Vertical Tabs */}
                <nav className="flex-1 py-2 overflow-y-auto">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isComplete = sectionStatus[tab.id];
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => {
                                    setActiveTab(tab.id);
                                    setMobileSidebarOpen(false); // Close sidebar on mobile after selection
                                }}
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

                {/* Bottom Actions */}
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
                {/* Top Header */}
                <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 px-4 lg:px-6 py-3 flex items-center justify-between shrink-0 z-40">
                    <div className="flex items-center gap-3 lg:gap-4">
                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileSidebarOpen(true)}
                            className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition lg:hidden"
                        >
                            <Menu size={20} />
                        </button>
                        <div className="flex items-center gap-2 text-gray-500">
                            <FileText size={18} className="hidden sm:block" />
                            <span className="text-sm font-medium text-gray-900 truncate max-w-[150px] sm:max-w-none">
                                {resumeData.personalInfo.fullName || 'Untitled Resume'}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Download Button */}
                        <button
                            onClick={handleDownloadClick}
                            className="flex items-center gap-2 bg-accent-green text-gray-900 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-accent-teal transition"
                        >
                            <Download size={16} />
                            <span className="hidden sm:inline">Download PDF</span>
                        </button>
                    </div>
                </header>

                {/* Content Grid: Editor + Preview */}
                <div className="flex-1 flex overflow-hidden">
                    {/* Editor Panel */}
                    <div className={`${showPreview ? 'hidden lg:flex lg:w-1/2' : 'flex w-full'} flex-col bg-white border-r border-gray-200 transition-all`}>
                        {/* Section Header */}
                        <div className="px-4 lg:px-6 py-3 lg:py-4 border-b border-gray-200 bg-gray-50">
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

                        {/* Form Content */}
                        <div className="flex-1 overflow-y-auto p-4 lg:p-6">
                            {activeTab === 'personal' && <PersonalForm />}
                            {activeTab === 'experience' && <ExperienceForm />}
                            {activeTab === 'education' && <EducationForm />}
                            {activeTab === 'skills' && <SkillsForm />}
                            {activeTab === 'design' && <DesignTab />}
                        </div>
                    </div>

                    {/* Preview Panel */}
                    {showPreview && (
                        <div className="w-full lg:w-1/2 flex flex-col bg-gray-50 relative">
                            {/* Preview Header */}
                            <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between bg-gray-50">
                                <span className="text-sm font-medium text-gray-600">Live Preview</span>
                                <div className="flex items-center gap-2">
                                    {/* Reference Image Toggle - Only show if template has thumbnail */}
                                    {templateThumbnail && (
                                        <button
                                            onClick={() => setShowReferencePanel(!showReferencePanel)}
                                            className={`p-1.5 rounded transition flex items-center gap-1.5 ${
                                                showReferencePanel
                                                    ? 'text-accent-green bg-accent-green/10'
                                                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200'
                                            }`}
                                            title="Show Reference Image"
                                        >
                                            <Image size={16} />
                                            <span className="text-xs">Reference</span>
                                        </button>
                                    )}
                                    <div className="w-px h-4 bg-gray-200 mx-1" />
                                    <button
                                        onClick={zoomOut}
                                        className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded transition"
                                        title="Zoom Out"
                                    >
                                        <ZoomOut size={16} />
                                    </button>
                                    <span className="text-xs text-gray-500 w-12 text-center">
                                        {Math.round(previewScale * 100)}%
                                    </span>
                                    <button
                                        onClick={zoomIn}
                                        className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded transition"
                                        title="Zoom In"
                                    >
                                        <ZoomIn size={16} />
                                    </button>
                                    <button
                                        onClick={resetZoom}
                                        className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded transition"
                                        title="Reset Zoom"
                                    >
                                        <RotateCcw size={16} />
                                    </button>
                                </div>
                            </div>

                            {/* Preview Content - Paginated Google Docs style */}
                            <div className="flex-1 overflow-auto">
                                <PagedPreview ref={componentRef} scale={previewScale} />
                            </div>

                            {/* Reference Image Panel - Sliding from right */}
                            {templateThumbnail && showReferencePanel && (
                                <div className="absolute top-12 right-0 bottom-0 w-full sm:w-72 lg:w-80 bg-white border-l border-gray-200 shadow-xl z-20 flex flex-col">
                                    {/* Panel Header */}
                                    <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between bg-white">
                                        <div className="flex items-center gap-2">
                                            <Image size={16} className="text-accent-green" />
                                            <span className="text-sm font-medium text-gray-900">Reference Design</span>
                                        </div>
                                        <button
                                            onClick={() => setShowReferencePanel(false)}
                                            className="p-1 text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded transition"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>

                                    {/* Reference Image */}
                                    <div className="flex-1 overflow-auto p-4">
                                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                                            <img
                                                src={templateThumbnail}
                                                alt="Template reference"
                                                className="w-full h-auto object-contain"
                                            />
                                        </div>
                                        <p className="text-xs text-gray-400 mt-3 text-center">
                                            Original template design for reference
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Toggle Preview Button (Mobile/Tablet) */}
            <button
                onClick={() => setShowPreview(!showPreview)}
                className="fixed bottom-6 right-6 p-4 bg-accent-green text-gray-900 rounded-full shadow-lg hover:bg-accent-teal transition lg:hidden z-30 flex items-center gap-2"
                title={showPreview ? 'Edit Resume' : 'Preview Resume'}
            >
                {showPreview ? (
                    <>
                        <EyeOff size={20} />
                        <span className="text-sm font-medium">Edit</span>
                    </>
                ) : (
                    <>
                        <Eye size={20} />
                        <span className="text-sm font-medium">Preview</span>
                    </>
                )}
            </button>

            {/* Download Modal - handles auth, subscription, and usage checks internally */}
            <DownloadModal
                isOpen={showDownloadModal}
                onClose={() => setShowDownloadModal(false)}
                onDownload={handleConfirmDownload}
            />

            {/* Welcome Modal - shown after new registration */}
            {showWelcomeModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setShowWelcomeModal(false)}
                    />
                    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden animate-[fadeIn_0.2s_ease-out]">
                        <button
                            onClick={() => setShowWelcomeModal(false)}
                            className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition z-10"
                        >
                            <X size={20} />
                        </button>
                        <div className="px-8 pt-8 pb-6 text-center">
                            <div className="w-14 h-14 bg-accent-green/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="text-accent-green" size={28} />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Account Created!</h2>
                            <p className="text-gray-500 text-sm">
                                Your resume is saved. You can continue editing or choose a plan to download.
                            </p>
                        </div>
                        <div className="px-8 pb-8 space-y-3">
                            <button
                                onClick={() => {
                                    setShowWelcomeModal(false);
                                    router.push(`/${locale}/pricing`);
                                }}
                                className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 rounded-lg font-semibold hover:from-yellow-400 hover:to-orange-400 transition flex items-center justify-center gap-2"
                            >
                                <Crown size={18} />
                                Choose a Plan
                            </button>
                            <button
                                onClick={() => setShowWelcomeModal(false)}
                                className="w-full py-3 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
                            >
                                Back to Editor
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// Wrap with Suspense for useSearchParams
export default function BuilderPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <div className="text-gray-500">Loading builder...</div>
                </div>
            }
        >
            <BuilderContent />
        </Suspense>
    );
}
