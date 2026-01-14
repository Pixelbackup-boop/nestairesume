'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
    FileText,
    Palette,
    Search,
    Briefcase,
    Minimize2,
    Zap,
    Sparkles,
    ArrowRight,
    Check,
} from 'lucide-react';
import { canvasTemplates } from '@/lib/templates/canvas';
import { useCanvasStore, CanvasTemplate } from '@/store/useCanvasStore';
import {
    builderTemplates as sharedBuilderTemplates,
    getSampleResumeDataWithProfile,
    generateTheme,
} from '@/lib/templates/builder';
import OnboardingModal from '@/components/OnboardingModal';
import UnifiedTemplate from '@/components/templates/UnifiedTemplate';

type EditorMode = 'builder' | 'canvas';
type CategoryFilter = 'all' | 'professional' | 'creative' | 'minimal' | 'bold' | 'classic' | 'modern' | 'header' | 'sidebar';

// Use shared builder templates with additional style property for display
const builderTemplates = sharedBuilderTemplates.map(t => ({
    ...t,
    colors: t.gradientColors,
}));

const categoryIcons: Record<string, React.ElementType> = {
    all: Sparkles,
    professional: Briefcase,
    creative: Palette,
    minimal: Minimize2,
    bold: Zap,
    modern: Sparkles,
    classic: FileText,
};

export default function TemplatesPage() {
    const router = useRouter();
    const { loadTemplate } = useCanvasStore();
    const [editorMode, setEditorMode] = useState<EditorMode>('builder');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
    const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null);

    // Modal state for builder templates
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTemplateForModal, setSelectedTemplateForModal] = useState<{ id: string; name: string } | null>(null);

    // Get categories based on mode
    const categories: CategoryFilter[] = editorMode === 'builder'
        ? ['all', 'professional', 'creative', 'minimal', 'bold']
        : ['all', 'professional', 'creative', 'minimal', 'bold'];

    // Filter templates based on search and category
    const filteredBuilderTemplates = useMemo(() => {
        return builderTemplates.filter((template) => {
            const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory]);

    const filteredCanvasTemplates = useMemo(() => {
        return canvasTemplates.filter((template) => {
            const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory]);

    // Handle template selection - show onboarding modal
    const handleSelectBuilderTemplate = (templateId: string, templateName: string) => {
        setSelectedTemplateForModal({ id: templateId, name: templateName });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedTemplateForModal(null);
    };

    const handleSelectCanvasTemplate = (template: CanvasTemplate) => {
        loadTemplate(template);
        router.push('/canvas-editor');
    };

    // Reset category when switching modes
    const handleModeChange = (mode: EditorMode) => {
        setEditorMode(mode);
        setSelectedCategory('all');
        setSearchQuery('');
    };

    // Render canvas template preview
    const renderCanvasPreview = (template: CanvasTemplate) => {
        const scale = 0.28;
        const previewWidth = 595 * scale;
        const previewHeight = 842 * scale;

        return (
            <div
                className="relative overflow-hidden rounded-lg mx-auto"
                style={{
                    width: previewWidth,
                    height: previewHeight,
                    backgroundColor: template.backgroundColor,
                }}
            >
                <svg
                    width={previewWidth}
                    height={previewHeight}
                    viewBox="0 0 595 842"
                    className="absolute inset-0"
                >
                    {template.elements.map((element, index) => {
                        if (element.type === 'shape') {
                            if (element.shapeType === 'circle') {
                                return (
                                    <ellipse
                                        key={index}
                                        cx={element.x + element.width / 2}
                                        cy={element.y + element.height / 2}
                                        rx={element.width / 2}
                                        ry={element.height / 2}
                                        fill={element.fill}
                                    />
                                );
                            }
                            return (
                                <rect
                                    key={index}
                                    x={element.x}
                                    y={element.y}
                                    width={element.width}
                                    height={element.height}
                                    fill={element.fill}
                                    rx={element.cornerRadius || 0}
                                />
                            );
                        }
                        if (element.type === 'text') {
                            // Render actual text instead of placeholder rectangles
                            const lines = element.text.split('\n');
                            const lineHeight = element.fontSize * (element.lineHeight || 1.4);
                            return (
                                <text
                                    key={index}
                                    x={element.x}
                                    y={element.y + element.fontSize}
                                    fill={element.fill}
                                    fontSize={element.fontSize}
                                    fontFamily={element.fontFamily || 'Inter, sans-serif'}
                                    fontWeight={element.fontWeight || 'normal'}
                                    textAnchor={element.align === 'center' ? 'middle' : element.align === 'right' ? 'end' : 'start'}
                                    dominantBaseline="auto"
                                >
                                    {lines.map((line, lineIndex) => (
                                        <tspan
                                            key={lineIndex}
                                            x={element.align === 'center' ? element.x + element.width / 2 : element.align === 'right' ? element.x + element.width : element.x}
                                            dy={lineIndex === 0 ? 0 : lineHeight}
                                        >
                                            {line}
                                        </tspan>
                                    ))}
                                </text>
                            );
                        }
                        if (element.type === 'icon') {
                            // Render icons as small circles/indicators
                            return (
                                <circle
                                    key={index}
                                    cx={element.x + element.width / 2}
                                    cy={element.y + element.height / 2}
                                    r={element.width / 2}
                                    fill={element.fill}
                                    opacity={0.8}
                                />
                            );
                        }
                        if (element.type === 'image') {
                            // Render profile image with circular clip
                            const clipId = `clip-${index}`;
                            return (
                                <g key={index}>
                                    <defs>
                                        <clipPath id={clipId}>
                                            <circle
                                                cx={element.x + element.width / 2}
                                                cy={element.y + element.height / 2}
                                                r={Math.min(element.width, element.height) / 2}
                                            />
                                        </clipPath>
                                    </defs>
                                    <image
                                        href={element.src}
                                        x={element.x}
                                        y={element.y}
                                        width={element.width}
                                        height={element.height}
                                        clipPath={`url(#${clipId})`}
                                        preserveAspectRatio="xMidYMid slice"
                                    />
                                </g>
                            );
                        }
                        return null;
                    })}
                </svg>
            </div>
        );
    };

    // Render builder template preview using actual template components
    const renderBuilderPreview = (template: typeof builderTemplates[0], templateIndex: number) => {
        // Get full sample resume data with different profile for each template
        const sampleData = getSampleResumeDataWithProfile(templateIndex);

        // Generate theme from template's accent color
        const theme = generateTheme(template.accentColor || '#374151');

        // Get templateId: use explicit templateId if defined, otherwise map from layout
        const getTemplateIdForLayout = (layout: string): string => {
            switch (layout) {
                case 'sidebar': return 'sidebar-modern';
                case 'header': return 'header-bold';
                case 'classic': return 'classic-professional';
                case 'minimal': return 'minimal-clean';
                case 'europass': return 'europass-classic';
                default: return 'classic-professional';
            }
        };

        // Use explicit templateId if available (for unique layouts), else fall back to layout mapping
        const resolvedTemplateId = (template as { templateId?: string }).templateId || getTemplateIdForLayout(template.layout);

        // A4 dimensions in pixels (at 96 DPI: 210mm ≈ 794px, 297mm ≈ 1123px)
        const a4Width = 794;
        const a4Height = 1123;

        // Thumbnail target width and calculated scale
        const thumbnailWidth = 254;
        const cssScale = thumbnailWidth / a4Width; // ≈ 0.32
        const thumbnailHeight = Math.round(a4Height * cssScale);

        return (
            <div
                className="rounded-lg overflow-hidden bg-white relative"
                style={{
                    width: `${thumbnailWidth}px`,
                    height: `${thumbnailHeight}px`,
                }}
            >
                {/* Full-size template scaled down with CSS transform */}
                <div
                    style={{
                        width: `${a4Width}px`,
                        height: `${a4Height}px`,
                        transform: `scale(${cssScale})`,
                        transformOrigin: 'top left',
                    }}
                >
                    <UnifiedTemplate
                        data={sampleData}
                        theme={theme}
                        templateId={resolvedTemplateId}
                        scale={1}
                    />
                </div>
            </div>
        );
    };

    const templateCount = editorMode === 'builder' ? filteredBuilderTemplates.length : filteredCanvasTemplates.length;

    return (
        <>
            <Header />

            {/* Hero */}
            <section className="pt-32 pb-8">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <span className="text-accent-green font-medium text-sm uppercase tracking-wider">Templates</span>
                    <h1 className="text-5xl font-bold mt-3 mb-6 text-white">
                        Choose your perfect<br />
                        <span className="gradient-text">resume template</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Select an editing mode and pick from our professionally designed templates.
                    </p>
                </div>
            </section>

            {/* Mode Toggle */}
            <section className="pb-8">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="bg-bg-card border border-border-subtle rounded-2xl p-2 flex gap-2">
                        {/* Form Builder Option */}
                        <button
                            type="button"
                            onClick={() => handleModeChange('builder')}
                            className={`flex-1 p-4 rounded-xl transition-all ${
                                editorMode === 'builder'
                                    ? 'bg-accent-green text-bg-primary'
                                    : 'bg-transparent text-gray-400 hover:text-white hover:bg-bg-card-light'
                            }`}
                        >
                            <div className="flex items-center justify-center gap-3">
                                <FileText size={24} />
                                <div className="text-left">
                                    <div className="font-semibold text-lg">Form Builder</div>
                                    <div className={`text-sm ${editorMode === 'builder' ? 'text-bg-primary/70' : 'text-gray-500'}`}>
                                        Guided step-by-step editing
                                    </div>
                                </div>
                                {editorMode === 'builder' && <Check size={20} className="ml-auto" />}
                            </div>
                        </button>

                        {/* Canvas Editor Option */}
                        <button
                            type="button"
                            onClick={() => handleModeChange('canvas')}
                            className={`flex-1 p-4 rounded-xl transition-all ${
                                editorMode === 'canvas'
                                    ? 'bg-accent-green text-bg-primary'
                                    : 'bg-transparent text-gray-400 hover:text-white hover:bg-bg-card-light'
                            }`}
                        >
                            <div className="flex items-center justify-center gap-3">
                                <Palette size={24} />
                                <div className="text-left">
                                    <div className="font-semibold text-lg">Canvas Editor</div>
                                    <div className={`text-sm ${editorMode === 'canvas' ? 'text-bg-primary/70' : 'text-gray-500'}`}>
                                        Full creative freedom
                                    </div>
                                </div>
                                {editorMode === 'canvas' && <Check size={20} className="ml-auto" />}
                            </div>
                        </button>
                    </div>

                    {/* Mode Description */}
                    <div className="mt-4 text-center">
                        {editorMode === 'builder' ? (
                            <p className="text-gray-400 text-sm">
                                <span className="text-accent-green font-medium">Form Builder</span> - Fill in forms and let the template handle the design. Perfect for quick, professional resumes.
                            </p>
                        ) : (
                            <p className="text-gray-400 text-sm">
                                <span className="text-accent-green font-medium">Canvas Editor</span> - Drag, drop, and design freely. Full control over every element, like Canva for resumes.
                            </p>
                        )}
                    </div>
                </div>
            </section>

            {/* Search and Filters */}
            <section className="pb-6">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                        {/* Search */}
                        <div className="relative w-full sm:w-80">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search templates..."
                                className="w-full pl-10 pr-4 py-2.5 bg-bg-card border border-border-subtle rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent-green transition-colors"
                            />
                        </div>

                        {/* Category Filters */}
                        <div className="flex flex-wrap justify-center gap-2">
                            {categories.map((category) => {
                                const Icon = categoryIcons[category] || Sparkles;
                                const isActive = selectedCategory === category;
                                const label = category.charAt(0).toUpperCase() + category.slice(1);
                                return (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                            isActive
                                                ? 'bg-accent-green text-bg-primary'
                                                : 'bg-bg-card border border-border-subtle text-gray-400 hover:text-white hover:border-gray-500'
                                        }`}
                                    >
                                        <Icon size={16} />
                                        {label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Results count */}
                    <div className="mt-4 text-sm text-gray-500 text-center sm:text-left">
                        {templateCount} template{templateCount !== 1 ? 's' : ''} available
                    </div>
                </div>
            </section>

            {/* Templates Grid */}
            <section className="py-8">
                <div className="max-w-6xl mx-auto px-6">
                    {templateCount === 0 ? (
                        <div className="text-center py-20">
                            <Search size={48} className="mx-auto text-gray-600 mb-4" />
                            <h3 className="text-xl font-medium text-gray-300 mb-2">No templates found</h3>
                            <p className="text-gray-500">Try adjusting your search or filter</p>
                        </div>
                    ) : editorMode === 'builder' ? (
                        /* Builder Templates Grid */
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                            {filteredBuilderTemplates.map((template, index) => (
                                <div
                                    key={template.id}
                                    className="group cursor-pointer"
                                    onMouseEnter={() => setHoveredTemplate(template.id)}
                                    onMouseLeave={() => setHoveredTemplate(null)}
                                    onClick={() => handleSelectBuilderTemplate(template.id, template.name)}
                                >
                                    <div className={`relative rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                                        hoveredTemplate === template.id
                                            ? 'border-accent-green shadow-lg shadow-accent-green/20 scale-[1.02]'
                                            : 'border-border-subtle'
                                    }`}>
                                        {renderBuilderPreview(template, index)}
                                        {/* Hover overlay */}
                                        <div className={`absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity ${
                                            hoveredTemplate === template.id ? 'opacity-100' : 'opacity-0 pointer-events-none'
                                        }`}>
                                            <span className="bg-accent-green text-bg-primary px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2">
                                                Use Template <ArrowRight size={16} />
                                            </span>
                                        </div>
                                    </div>
                                    <h4 className="font-medium text-sm text-white mt-3">{template.name}</h4>
                                    <p className="text-xs text-gray-500">{template.style}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        /* Canvas Templates Grid */
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                            {filteredCanvasTemplates.map((template) => (
                                <div
                                    key={template.id}
                                    className="group cursor-pointer"
                                    onMouseEnter={() => setHoveredTemplate(template.id)}
                                    onMouseLeave={() => setHoveredTemplate(null)}
                                    onClick={() => handleSelectCanvasTemplate(template)}
                                >
                                    <div className={`bg-slate-800 rounded-xl overflow-hidden border-2 transition-all duration-200 p-4 ${
                                        hoveredTemplate === template.id
                                            ? 'border-accent-green shadow-lg shadow-accent-green/20 scale-[1.02]'
                                            : 'border-border-subtle'
                                    }`}>
                                        {renderCanvasPreview(template)}
                                    </div>
                                    <div className="mt-3 flex items-start justify-between">
                                        <div>
                                            <h4 className="font-medium text-sm text-white">{template.name}</h4>
                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-800 rounded text-xs text-gray-400 capitalize mt-1">
                                                {template.category}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-16">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <div className="inline-flex flex-col items-center p-8 bg-bg-card rounded-2xl border border-border-subtle">
                        {editorMode === 'canvas' ? (
                            <>
                                <Palette className="text-accent-green mb-4" size={32} />
                                <h3 className="text-xl font-semibold text-white mb-2">
                                    Want to start from scratch?
                                </h3>
                                <p className="text-gray-400 mb-4 max-w-md">
                                    Create a completely custom resume using our Canvas Editor's powerful tools.
                                </p>
                                <Link
                                    href="/canvas-editor"
                                    className="px-6 py-2.5 bg-accent-green text-bg-primary rounded-lg font-medium hover:bg-accent-teal transition-colors flex items-center gap-2"
                                >
                                    Open Blank Canvas <ArrowRight size={18} />
                                </Link>
                            </>
                        ) : (
                            <>
                                <FileText className="text-accent-green mb-4" size={32} />
                                <h3 className="text-xl font-semibold text-white mb-2">
                                    Want AI to build your resume?
                                </h3>
                                <p className="text-gray-400 mb-4 max-w-md">
                                    Let our AI create a professional resume in seconds based on your job title.
                                </p>
                                <Link
                                    href="/onboarding"
                                    className="px-6 py-2.5 bg-accent-green text-bg-primary rounded-lg font-medium hover:bg-accent-teal transition-colors flex items-center gap-2"
                                >
                                    Build with AI <ArrowRight size={18} />
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </section>

            <Footer />

            {/* Onboarding Modal for Builder Templates */}
            {selectedTemplateForModal && (
                <OnboardingModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    templateId={selectedTemplateForModal.id}
                    templateName={selectedTemplateForModal.name}
                />
            )}
        </>
    );
}
