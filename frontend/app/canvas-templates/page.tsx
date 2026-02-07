'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    ArrowLeft,
    Sparkles,
    Search,
    Filter,
    Briefcase,
    Palette,
    Minimize2,
    FileCheck,
} from 'lucide-react';
import { canvasTemplates } from '@/lib/canvasTemplates';
import { useCanvasStore, CanvasTemplate } from '@/store/useCanvasStore';

type CategoryFilter = 'all' | 'professional' | 'creative' | 'minimal' | 'modern' | 'ats-friendly';

const categoryIcons: Record<CategoryFilter, React.ElementType> = {
    all: Sparkles,
    professional: Briefcase,
    creative: Palette,
    minimal: Minimize2,
    modern: Sparkles,
    'ats-friendly': FileCheck,
};

const categoryLabels: Record<CategoryFilter, string> = {
    all: 'All Templates',
    professional: 'Professional',
    creative: 'Creative',
    minimal: 'Minimal',
    modern: 'Modern',
    'ats-friendly': 'ATS-Friendly',
};

export default function CanvasTemplatesPage() {
    const router = useRouter();
    const { loadTemplate } = useCanvasStore();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
    const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null);

    const filteredTemplates = useMemo(() => {
        return canvasTemplates.filter((template) => {
            const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory]);

    const handleSelectTemplate = (template: CanvasTemplate) => {
        loadTemplate(template);
        router.push('/canvas-editor');
    };

    // Render a mini preview of the template
    const renderTemplatePreview = (template: CanvasTemplate) => {
        const scale = 0.35; // Scale down for preview
        const previewWidth = 595 * scale;
        const previewHeight = 842 * scale;

        return (
            <div
                className="relative overflow-hidden rounded-lg"
                style={{
                    width: previewWidth,
                    height: previewHeight,
                    backgroundColor: template.backgroundColor,
                }}
            >
                {/* Render simplified preview of elements */}
                <svg
                    width={previewWidth}
                    height={previewHeight}
                    viewBox={`0 0 595 842`}
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
                                        stroke={element.stroke !== 'transparent' ? element.stroke : undefined}
                                        strokeWidth={element.strokeWidth}
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
                            // Show text as simplified rectangles for preview
                            const lineHeight = element.fontSize * 0.8;
                            return (
                                <rect
                                    key={index}
                                    x={element.x}
                                    y={element.y + element.fontSize * 0.2}
                                    width={Math.min(element.width, element.text.length * element.fontSize * 0.5)}
                                    height={lineHeight}
                                    fill={element.fill}
                                    opacity={0.7}
                                    rx={2}
                                />
                            );
                        }
                        if (element.type === 'icon') {
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
                        return null;
                    })}
                </svg>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-slate-900">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link
                                href="/canvas-editor"
                                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                            >
                                <ArrowLeft size={20} />
                                <span className="text-sm">Back to Editor</span>
                            </Link>
                            <div className="w-px h-6 bg-slate-700" />
                            <div className="flex items-center gap-2">
                                <Sparkles className="text-accent-green" size={22} />
                                <span className="text-white font-semibold text-lg">Canvas Templates</span>
                            </div>
                        </div>

                        <div className="text-sm text-slate-400">
                            {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''} available
                        </div>
                    </div>
                </div>
            </header>

            {/* Main content */}
            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* Hero section */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-white mb-3">
                        Choose Your Perfect Template
                    </h1>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Start with a professionally designed template and customize it to match your style.
                        All templates are fully editable in our Canvas Editor.
                    </p>
                </div>

                {/* Search and filters */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    {/* Search */}
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search templates..."
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-accent-green transition-colors"
                        />
                    </div>

                    {/* Category filters */}
                    <div className="flex items-center gap-2 flex-wrap">
                        <Filter size={18} className="text-slate-400 hidden sm:block" />
                        {(Object.keys(categoryLabels) as CategoryFilter[]).map((category) => {
                            const Icon = categoryIcons[category];
                            const isActive = selectedCategory === category;
                            return (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        isActive
                                            ? 'bg-accent-green text-slate-900'
                                            : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                                    }`}
                                >
                                    <Icon size={16} />
                                    <span className="hidden sm:inline">{categoryLabels[category]}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Templates grid */}
                {filteredTemplates.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="text-slate-500 mb-4">
                            <Search size={48} className="mx-auto opacity-50" />
                        </div>
                        <h3 className="text-xl font-medium text-slate-300 mb-2">No templates found</h3>
                        <p className="text-slate-500">
                            Try adjusting your search or filter criteria
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredTemplates.map((template) => (
                            <div
                                key={template.id}
                                className="group relative"
                                onMouseEnter={() => setHoveredTemplate(template.id)}
                                onMouseLeave={() => setHoveredTemplate(null)}
                            >
                                <div
                                    className={`bg-slate-800 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                                        hoveredTemplate === template.id
                                            ? 'border-accent-green shadow-lg shadow-accent-green/20 scale-[1.02]'
                                            : 'border-slate-700'
                                    }`}
                                >
                                    {/* Preview */}
                                    <div className="p-4 flex items-center justify-center bg-slate-750">
                                        {renderTemplatePreview(template)}
                                    </div>

                                    {/* Info and actions */}
                                    <div className="p-4 border-t border-slate-700">
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <h3 className="font-semibold text-white mb-1">
                                                    {template.name}
                                                </h3>
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-700 rounded text-xs text-slate-300 capitalize">
                                                    {React.createElement(categoryIcons[template.category], { size: 12 })}
                                                    {template.category}
                                                </span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => handleSelectTemplate(template)}
                                            className={`w-full py-2.5 rounded-lg font-medium transition-all duration-200 ${
                                                hoveredTemplate === template.id
                                                    ? 'bg-accent-green text-slate-900'
                                                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                            }`}
                                        >
                                            Use This Template
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Bottom CTA */}
                <div className="mt-16 text-center">
                    <div className="inline-flex flex-col items-center p-8 bg-slate-800/50 rounded-2xl border border-slate-700">
                        <Sparkles className="text-accent-green mb-4" size={32} />
                        <h3 className="text-xl font-semibold text-white mb-2">
                            Want to start from scratch?
                        </h3>
                        <p className="text-slate-400 mb-4 max-w-md">
                            You can also create a completely custom resume using our Canvas Editor's powerful tools.
                        </p>
                        <Link
                            href="/canvas-editor"
                            className="px-6 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors"
                        >
                            Open Blank Canvas
                        </Link>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-slate-700 mt-12">
                <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm text-slate-500">
                    All templates are fully customizable. Click any template to start editing.
                </div>
            </footer>
        </div>
    );
}
