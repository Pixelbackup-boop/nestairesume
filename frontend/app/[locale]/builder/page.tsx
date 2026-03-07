'use client';

import { useState, useRef, useMemo, useEffect, Suspense } from 'react';
import NextImage from 'next/image';
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
    builderTemplates,
    sampleResumeData,
    colorPresets
} from '@/lib/templates/builder';
import Link from 'next/link';
import FontLoader from '@/components/FontLoader';
import { downloadPdf, PdfTranslations } from '@/lib/pdfService';
import {
    Download, ChevronDown, Layout, Palette, Sparkles,
    User, Briefcase, GraduationCap, Wrench, PaintBucket,
    Check, Home, Eye, EyeOff, ZoomIn, ZoomOut, RotateCcw,
    FileText, X, ChevronRight, Menu, CheckCircle, Crown
} from 'lucide-react';
import WelcomeModal from './WelcomeModal';
import MobileSidebar from './MobileSidebar';
import TemplateFeedbackButton from '@/components/feedback/TemplateFeedbackButton';

type TabId = 'personal' | 'experience' | 'education' | 'skills' | 'design';

function BuilderContent() {
    const searchParams = useSearchParams();
    const t = useTranslations('Resume');
    const tBuilder = useTranslations('Builder');
    const locale = useLocale();
    const [activeTab, setActiveTab] = useState<TabId>('personal');
    const [showTemplateDropdown, setShowTemplateDropdown] = useState(false);
    const [showColorDropdown, setShowColorDropdown] = useState(false);
    const [previewScale, setPreviewScale] = useState(0.75);
    const [showPreview, setShowPreview] = useState(true);
    const [showDownloadModal, setShowDownloadModal] = useState(false);
    const [showWelcomeModal, setShowWelcomeModal] = useState(false);
    const router = useRouter();
    const { isAuthenticated, refreshUser } = useAuthStore();
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
            nationality: t('labels.nationality'),
            id: t('labels.id'),
            passport: t('labels.passport'),
            drivingLicense: t('labels.drivingLicense'),
            native: t('labels.native'),
            fluent: t('labels.fluent'),
            advanced: t('labels.advanced'),
            intermediate: t('labels.intermediate'),
            basic: t('labels.basic'),
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

    // Wait for Zustand hydration
    const [hydrated, setHydrated] = useState(false);
    useEffect(() => {
        const unsub = useResumeStore.persist.onFinishHydration(() => setHydrated(true));
        if (useResumeStore.persist.hasHydrated()) setHydrated(true);
        return () => unsub?.();
    }, []);

    // Handle URL parameters for template and prefill
    useEffect(() => {
        if (!hydrated) return;
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

            } else {
                // It's already a layout preset ID, use directly
                setTemplate(templateId);
                setTemplateId(null);
            }
        }
    }, [hydrated, searchParams, setResumeData, setTemplate, setTemplateId, setTheme, setCustomThemeColor]);

    // Derive current builder template ID for the switcher dropdown
    const currentBuilderTemplateId = useMemo(() => {
        const match = builderTemplates.find(t => t.templateId === selectedTemplateId);
        return match?.id || '';
    }, [selectedTemplateId]);

    // Switch template while keeping all resume data intact
    const handleTemplateSwitch = (id: string) => {
        const tmpl = getTemplateById(id);
        if (!tmpl) return;
        setTemplate(tmpl.layoutPresetId);
        setTemplateId((tmpl as { templateId?: string }).templateId || null);
        const theme = getTemplateTheme(id);
        if (theme.themeId) setTheme(theme.themeId);
        else if (theme.customColor) setCustomThemeColor(theme.customColor);
        // Update URL to reflect selected template (bookmarkable, no reload)
        const url = new URL(window.location.href);
        url.searchParams.set('template', id);
        url.searchParams.delete('prefill');
        router.replace(url.pathname + url.search, { scroll: false });
    };

    // Handle download - show download modal (modal handles auth check internally)
    const handleDownloadClick = () => {
        setShowDownloadModal(true);
    };

    // Called when download is confirmed - calls backend PDF API
    // Errors propagate to DownloadModal which shows user-friendly error UI
    const handleConfirmDownload = async () => {
        const templateForPdf = selectedTemplateId || selectedTemplate;
        await downloadPdf(
            resumeData,
            templateForPdf,
            selectedTheme,
            resumeData.customThemeColor,
            pdfTranslations,
            locale
        );
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
        { id: 'personal', label: tBuilder('tabs.personal'), icon: User, description: tBuilder('tabs.personalDesc') },
        { id: 'experience', label: tBuilder('tabs.experience'), icon: Briefcase, description: tBuilder('tabs.experienceDesc') },
        { id: 'education', label: tBuilder('tabs.education'), icon: GraduationCap, description: tBuilder('tabs.educationDesc') },
        { id: 'skills', label: tBuilder('tabs.skills'), icon: Wrench, description: tBuilder('tabs.skillsDesc') },
        { id: 'design', label: tBuilder('tabs.design'), icon: PaintBucket, description: tBuilder('tabs.designDesc') },
    ];

    const zoomIn = () => setPreviewScale(Math.min(previewScale + 0.1, 1.2));
    const zoomOut = () => setPreviewScale(Math.max(previewScale - 0.1, 0.4));
    const resetZoom = () => setPreviewScale(0.75);

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 flex">
            <FontLoader />
            <MobileSidebar
                isOpen={mobileSidebarOpen}
                onClose={() => setMobileSidebarOpen(false)}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                tabs={tabs}
                sectionStatus={sectionStatus}
                progress={progress}
            />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Header */}
                <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 px-4 lg:px-6 py-3 flex items-center justify-between shrink-0 z-40">
                    <div className="flex items-center gap-3 lg:gap-4">
                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileSidebarOpen(true)}
                            className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition lg:hidden"
                            aria-label="Open sidebar menu"
                        >
                            <Menu size={20} />
                        </button>
                        <div className="flex items-center gap-2 text-gray-500">
                            <FileText size={18} className="hidden sm:block" />
                            <span className="text-sm font-medium text-gray-900 truncate max-w-[150px] sm:max-w-none">
                                {resumeData.personalInfo.fullName || tBuilder('ui.untitledResume')}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Download Button */}
                        <button
                            onClick={handleDownloadClick}
                            className="flex items-center gap-2 bg-accent-green text-gray-900 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-accent-teal transition"
                            aria-label={tBuilder('ui.downloadPdf')}
                        >
                            <Download size={16} />
                            <span className="hidden sm:inline">{tBuilder('ui.downloadPdf')}</span>
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
                                <span className="text-sm font-medium text-gray-600">{tBuilder('ui.livePreview')}</span>
                                {/* Template Switcher Dropdown */}
                                <select
                                    value={currentBuilderTemplateId}
                                    onChange={(e) => handleTemplateSwitch(e.target.value)}
                                    className="text-xs bg-white border border-gray-300 rounded-md px-2 py-1.5 text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-green/50 focus:border-accent-green cursor-pointer max-w-[160px] truncate"
                                    aria-label="Select resume template"
                                >
                                    {!currentBuilderTemplateId && <option value="">Select template</option>}
                                    <optgroup label="Professional">
                                        {builderTemplates.filter(t => t.category === 'professional').map(t => (
                                            <option key={t.id} value={t.id}>{t.name}</option>
                                        ))}
                                    </optgroup>
                                    <optgroup label="Modern">
                                        {builderTemplates.filter(t => t.category === 'modern').map(t => (
                                            <option key={t.id} value={t.id}>{t.name}</option>
                                        ))}
                                    </optgroup>
                                    <optgroup label="Creative">
                                        {builderTemplates.filter(t => t.category === 'creative').map(t => (
                                            <option key={t.id} value={t.id}>{t.name}</option>
                                        ))}
                                    </optgroup>
                                    <optgroup label="Minimal">
                                        {builderTemplates.filter(t => t.category === 'minimal').map(t => (
                                            <option key={t.id} value={t.id}>{t.name}</option>
                                        ))}
                                    </optgroup>
                                </select>
                                <div className="flex items-center gap-2">
                                    <TemplateFeedbackButton />
                                    <div className="w-px h-4 bg-gray-200 mx-1" />
                                    <button
                                        onClick={zoomOut}
                                        className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded transition"
                                        title={tBuilder('ui.zoomOut')}
                                    >
                                        <ZoomOut size={16} />
                                    </button>
                                    <span className="text-xs text-gray-500 w-12 text-center">
                                        {Math.round(previewScale * 100)}%
                                    </span>
                                    <button
                                        onClick={zoomIn}
                                        className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded transition"
                                        title={tBuilder('ui.zoomIn')}
                                    >
                                        <ZoomIn size={16} />
                                    </button>
                                    <button
                                        onClick={resetZoom}
                                        className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded transition"
                                        title={tBuilder('ui.resetZoom')}
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
                        </div>
                    )}
                </div>
            </div>

            {/* Toggle Preview Button (Mobile/Tablet) */}
            <button
                onClick={() => setShowPreview(!showPreview)}
                className="fixed bottom-6 right-6 p-4 bg-accent-green text-gray-900 rounded-full shadow-lg hover:bg-accent-teal transition lg:hidden z-30 flex items-center gap-2"
                title={showPreview ? tBuilder('ui.editResume') : tBuilder('ui.previewResume')}
            >
                {showPreview ? (
                    <>
                        <EyeOff size={20} />
                        <span className="text-sm font-medium">{tBuilder('ui.edit')}</span>
                    </>
                ) : (
                    <>
                        <Eye size={20} />
                        <span className="text-sm font-medium">{tBuilder('ui.preview')}</span>
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
                <WelcomeModal
                    onClose={() => setShowWelcomeModal(false)}
                    onChoosePlan={() => {
                        setShowWelcomeModal(false);
                        router.push(`/${locale}/pricing`);
                    }}
                />
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
                    <div className="text-gray-500">Loading...</div>
                </div>
            }
        >
            <BuilderContent />
        </Suspense>
    );
}
