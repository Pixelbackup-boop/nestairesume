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
import { canvasTemplates } from '@/lib/canvasTemplates';
import { useCanvasStore, CanvasTemplate } from '@/store/useCanvasStore';
import { builderTemplates as sharedBuilderTemplates, sampleResumeData as dummyData } from '@/lib/builderTemplates';

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

    // Get categories based on mode
    const categories: CategoryFilter[] = editorMode === 'builder'
        ? ['all', 'professional', 'creative', 'minimal', 'bold']
        : ['all', 'professional', 'creative', 'minimal', 'bold'];

    // Filter templates based on mode, search, and category
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

    // Handle template selection - prefill with sample data
    const handleSelectBuilderTemplate = (templateId: string) => {
        router.push(`/builder?template=${templateId}&prefill=true`);
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

    // Render builder template preview with realistic content
    const renderBuilderPreview = (template: typeof builderTemplates[0]) => {
        // Use accent color directly from template
        const accent = template.accentColor || '#374151';

        // Common text styles
        const textLight = '#f8fafc';
        const textDark = '#1e293b';
        const textMuted = '#64748b';

        if (template.layout === 'sidebar') {
            return (
                <div className="aspect-[3/4] rounded-lg overflow-hidden bg-white relative">
                    <div className="h-full flex">
                        {/* Sidebar */}
                        <div className="w-[38%] h-full p-2 flex flex-col" style={{ backgroundColor: accent }}>
                            {/* Photo */}
                            <img
                                src={dummyData.headshot}
                                alt={dummyData.name}
                                className="w-12 h-12 rounded-full mx-auto mb-2 object-cover border-2 border-white/30"
                            />
                            {/* Contact */}
                            <div className="space-y-0.5 text-[4px] text-white/80 mb-2">
                                <p className="truncate">{dummyData.email}</p>
                                <p>{dummyData.phone}</p>
                                <p>{dummyData.location}</p>
                                <p>{dummyData.website}</p>
                            </div>
                            {/* Skills */}
                            <p className="text-[5px] font-semibold text-white mb-1">SKILLS</p>
                            <div className="flex flex-wrap gap-0.5">
                                {dummyData.skills.slice(0, 4).map((skill, i) => (
                                    <span key={i} className="text-[3px] bg-white/20 px-1 py-0.5 rounded text-white">{skill}</span>
                                ))}
                            </div>
                            {/* Languages */}
                            <p className="text-[5px] font-semibold text-white mb-1 mt-2">LANGUAGES</p>
                            {dummyData.languages.map((lang, i) => (
                                <p key={i} className="text-[3px] text-white/80">{lang}</p>
                            ))}
                        </div>
                        {/* Main Content */}
                        <div className="flex-1 p-2">
                            <h3 className="text-[9px] font-bold" style={{ color: textDark }}>{dummyData.name}</h3>
                            <p className="text-[5px] mb-1" style={{ color: accent }}>{dummyData.title}</p>
                            <p className="text-[3px] mb-2 leading-relaxed" style={{ color: textMuted }}>{dummyData.summary}</p>
                            {/* Experience */}
                            <p className="text-[5px] font-semibold mb-1" style={{ color: textDark }}>EXPERIENCE</p>
                            {dummyData.experience.slice(0, 2).map((exp, i) => (
                                <div key={i} className="mb-1">
                                    <p className="text-[4px] font-medium" style={{ color: textDark }}>{exp.role}</p>
                                    <p className="text-[3px]" style={{ color: textMuted }}>{exp.company} • {exp.years}</p>
                                </div>
                            ))}
                            {/* Education */}
                            <p className="text-[5px] font-semibold mb-0.5 mt-1" style={{ color: textDark }}>EDUCATION</p>
                            <p className="text-[4px] font-medium" style={{ color: textDark }}>{dummyData.education.degree}</p>
                            <p className="text-[3px]" style={{ color: textMuted }}>{dummyData.education.school}</p>
                        </div>
                    </div>
                </div>
            );
        }

        if (template.layout === 'header') {
            return (
                <div className="aspect-[3/4] rounded-lg overflow-hidden bg-white relative">
                    {/* Header */}
                    <div className="p-3 text-center" style={{ backgroundColor: accent }}>
                        <img
                            src={dummyData.headshot}
                            alt={dummyData.name}
                            className="w-10 h-10 rounded-full mx-auto mb-1 object-cover border-2 border-white/30"
                        />
                        <h3 className="text-[10px] font-bold text-white">{dummyData.name}</h3>
                        <p className="text-[6px] text-white/80">{dummyData.title}</p>
                        <div className="flex justify-center gap-2 mt-1 text-[4px] text-white/70">
                            <span>{dummyData.email}</span>
                            <span>•</span>
                            <span>{dummyData.location}</span>
                        </div>
                    </div>
                    {/* Content */}
                    <div className="p-3">
                        <p className="text-[4px] mb-2 leading-relaxed" style={{ color: textMuted }}>{dummyData.summary}</p>
                        {/* Experience */}
                        <p className="text-[6px] font-semibold mb-1" style={{ color: accent }}>EXPERIENCE</p>
                        {dummyData.experience.map((exp, i) => (
                            <div key={i} className="mb-1">
                                <p className="text-[5px] font-medium" style={{ color: textDark }}>{exp.role} at {exp.company}</p>
                                <p className="text-[4px]" style={{ color: textMuted }}>{exp.years}</p>
                            </div>
                        ))}
                        {/* Skills */}
                        <p className="text-[6px] font-semibold mb-1 mt-2" style={{ color: accent }}>SKILLS</p>
                        <div className="flex flex-wrap gap-0.5">
                            {dummyData.skills.map((skill, i) => (
                                <span key={i} className="text-[4px] px-1 py-0.5 rounded" style={{ backgroundColor: `${accent}20`, color: accent }}>{skill}</span>
                            ))}
                        </div>
                    </div>
                </div>
            );
        }

        if (template.layout === 'classic') {
            return (
                <div className="aspect-[3/4] rounded-lg overflow-hidden bg-white relative p-3">
                    {/* Header with photo */}
                    <div className="flex items-start gap-2 mb-2 pb-2 border-b" style={{ borderColor: `${accent}30` }}>
                        <img
                            src={dummyData.headshot}
                            alt={dummyData.name}
                            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                            style={{ border: `2px solid ${accent}` }}
                        />
                        <div className="flex-1 text-center">
                            <h3 className="text-[10px] font-bold" style={{ color: textDark }}>{dummyData.name}</h3>
                            <p className="text-[6px]" style={{ color: accent }}>{dummyData.title}</p>
                            <div className="flex justify-center gap-2 mt-1 text-[4px]" style={{ color: textMuted }}>
                                <span>{dummyData.email}</span>
                                <span>•</span>
                                <span>{dummyData.phone}</span>
                            </div>
                        </div>
                    </div>
                    {/* Summary */}
                    <p className="text-[4px] mb-2 leading-relaxed" style={{ color: textMuted }}>{dummyData.summary}</p>
                    {/* Experience */}
                    <p className="text-[6px] font-semibold mb-1" style={{ color: accent }}>EXPERIENCE</p>
                    {dummyData.experience.map((exp, i) => (
                        <div key={i} className="mb-1.5">
                            <div className="flex justify-between">
                                <p className="text-[5px] font-medium" style={{ color: textDark }}>{exp.role}</p>
                                <p className="text-[4px]" style={{ color: textMuted }}>{exp.years}</p>
                            </div>
                            <p className="text-[4px]" style={{ color: textMuted }}>{exp.company}</p>
                        </div>
                    ))}
                    {/* Education */}
                    <p className="text-[6px] font-semibold mb-1 mt-2" style={{ color: accent }}>EDUCATION</p>
                    <p className="text-[5px] font-medium" style={{ color: textDark }}>{dummyData.education.degree}</p>
                    <p className="text-[4px]" style={{ color: textMuted }}>{dummyData.education.school}</p>
                    {/* Skills */}
                    <p className="text-[6px] font-semibold mb-1 mt-2" style={{ color: accent }}>SKILLS</p>
                    <p className="text-[4px]" style={{ color: textMuted }}>{dummyData.skills.join(' • ')}</p>
                </div>
            );
        }

        // Minimal layout
        return (
            <div className="aspect-[3/4] rounded-lg overflow-hidden bg-white relative p-3">
                {/* Header with small photo */}
                <div className="flex items-center gap-2 mb-1">
                    <img
                        src={dummyData.headshot}
                        alt={dummyData.name}
                        className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                    />
                    <div>
                        <h3 className="text-[10px] font-bold" style={{ color: textDark }}>{dummyData.name}</h3>
                        <p className="text-[6px]" style={{ color: accent }}>{dummyData.title}</p>
                    </div>
                </div>
                <div className="text-[4px] mb-2" style={{ color: textMuted }}>
                    {dummyData.email} • {dummyData.phone} • {dummyData.location}
                </div>
                {/* Thin accent line */}
                <div className="h-px mb-2" style={{ backgroundColor: accent }}></div>
                {/* Summary */}
                <p className="text-[4px] mb-2 leading-relaxed" style={{ color: textMuted }}>{dummyData.summary}</p>
                {/* Experience */}
                <p className="text-[5px] font-semibold mb-1" style={{ color: textDark }}>Experience</p>
                {dummyData.experience.map((exp, i) => (
                    <div key={i} className="mb-1">
                        <p className="text-[4px] font-medium" style={{ color: textDark }}>{exp.role} — {exp.company}</p>
                        <p className="text-[3px]" style={{ color: textMuted }}>{exp.years}</p>
                    </div>
                ))}
                {/* Education */}
                <p className="text-[5px] font-semibold mb-1 mt-1.5" style={{ color: textDark }}>Education</p>
                <p className="text-[4px]" style={{ color: textMuted }}>{dummyData.education.degree}, {dummyData.education.school}</p>
                {/* Skills */}
                <p className="text-[5px] font-semibold mb-1 mt-1.5" style={{ color: textDark }}>Skills</p>
                <p className="text-[4px]" style={{ color: textMuted }}>{dummyData.skills.join(', ')}</p>
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
                            {filteredBuilderTemplates.map((template) => (
                                <div
                                    key={template.id}
                                    className="group cursor-pointer"
                                    onMouseEnter={() => setHoveredTemplate(template.id)}
                                    onMouseLeave={() => setHoveredTemplate(null)}
                                    onClick={() => handleSelectBuilderTemplate(template.id)}
                                >
                                    <div className={`relative rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                                        hoveredTemplate === template.id
                                            ? 'border-accent-green shadow-lg shadow-accent-green/20 scale-[1.02]'
                                            : 'border-border-subtle'
                                    }`}>
                                        {renderBuilderPreview(template)}
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
        </>
    );
}
