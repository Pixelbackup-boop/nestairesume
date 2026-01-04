'use client';

import { useResumeStore, BackgroundType, BackgroundPattern } from '../../store/useResumeStore';
import { templates, colorPresets, backgroundColors, gradientPresets, patterns, fontPresets, fontSizes, LayoutCategory, LayoutConfig } from '../../lib/themes';
import { Check, Palette, Layout, Image, Minus, Type } from 'lucide-react';
import { useState } from 'react';

// Mini template thumbnail component
function TemplateThumbnail({ template, accentColor }: { template: LayoutConfig; accentColor: string }) {
    const color = accentColor || '#1e3a8a';

    // Render different layouts based on baseLayout
    switch (template.baseLayout) {
        case 'sidebar':
            const isLeft = template.sidebarPos === 'left';
            return (
                <div className="w-full h-12 rounded border border-border-subtle overflow-hidden flex bg-white">
                    {isLeft && <div className="w-1/3 h-full" style={{ backgroundColor: color }} />}
                    <div className="flex-1 p-1 flex flex-col gap-0.5">
                        <div className="w-3/4 h-1 bg-gray-300 rounded-sm" />
                        <div className="w-1/2 h-0.5 bg-gray-200 rounded-sm" />
                        <div className="flex-1" />
                        <div className="w-full h-0.5 bg-gray-100 rounded-sm" />
                        <div className="w-2/3 h-0.5 bg-gray-100 rounded-sm" />
                    </div>
                    {!isLeft && <div className="w-1/3 h-full" style={{ backgroundColor: color }} />}
                </div>
            );

        case 'header':
            return (
                <div className="w-full h-12 rounded border border-border-subtle overflow-hidden flex flex-col bg-white">
                    <div className="w-full h-4" style={{ backgroundColor: color }} />
                    <div className="flex-1 p-1 flex flex-col gap-0.5">
                        <div className="w-3/4 h-0.5 bg-gray-200 rounded-sm" />
                        <div className="w-full h-0.5 bg-gray-100 rounded-sm" />
                        <div className="w-2/3 h-0.5 bg-gray-100 rounded-sm" />
                    </div>
                </div>
            );

        case 'minimal':
            return (
                <div className="w-full h-12 rounded border border-border-subtle overflow-hidden flex flex-col p-1.5 bg-white">
                    <div className="w-1/2 h-1.5 rounded-sm mb-1" style={{ backgroundColor: color }} />
                    <div className="w-1/3 h-0.5 bg-gray-200 rounded-sm" />
                    <div className="flex-1" />
                    <div className="w-full h-0.5 bg-gray-100 rounded-sm" />
                    <div className="w-3/4 h-0.5 bg-gray-100 rounded-sm mt-0.5" />
                </div>
            );

        case 'creative':
            return (
                <div className="w-full h-12 rounded border border-border-subtle overflow-hidden flex bg-white">
                    <div className="w-2/5 h-full flex flex-col justify-center items-center" style={{ backgroundColor: color }}>
                        <div className="w-4 h-4 rounded-full bg-white/30" />
                    </div>
                    <div className="flex-1 p-1 flex flex-col gap-0.5 justify-center">
                        <div className="w-3/4 h-1 bg-gray-300 rounded-sm" />
                        <div className="w-1/2 h-0.5 bg-gray-200 rounded-sm" />
                    </div>
                </div>
            );

        case 'classic':
        default:
            return (
                <div className="w-full h-12 rounded border border-border-subtle overflow-hidden flex flex-col p-1.5 bg-white">
                    <div className="w-1/2 h-1.5 rounded-sm mb-0.5" style={{ backgroundColor: color }} />
                    <div className="w-1/3 h-0.5 bg-gray-200 rounded-sm" />
                    <div className="flex-1" />
                    <div className="w-full h-0.5 bg-gray-100 rounded-sm" />
                    <div className="w-2/3 h-0.5 bg-gray-100 rounded-sm mt-0.5" />
                    <div className="w-3/4 h-0.5 bg-gray-100 rounded-sm mt-0.5" />
                </div>
            );
    }
}

export default function DesignTab() {
    const { selectedTemplate, resumeData, setTemplate, setCustomThemeColor, updateBackground, updateFonts } = useResumeStore();
    const { customThemeColor, background, fonts } = resumeData;

    const [activeCategory, setActiveCategory] = useState<'All' | LayoutCategory>('All');

    // Derived state for filtering
    const filteredTemplates = activeCategory === 'All'
        ? templates
        : templates.filter(t => t.category === activeCategory);

    const handlePresetClick = (hex: string) => {
        setCustomThemeColor(hex);
    };

    const backgroundTypes: { id: BackgroundType; label: string }[] = [
        { id: 'solid', label: 'Solid' },
        { id: 'gradient', label: 'Gradient' },
        { id: 'pattern', label: 'Pattern' },
    ];

    const patternIcons: Record<string, React.ReactNode> = {
        none: <Minus size={16} />,
        dots: <span className="text-xs">●●</span>,
        lines: <span className="text-xs">≡</span>,
        grid: <span className="text-xs">⊞</span>,
        diagonal: <span className="text-xs">/</span>,
    };



    return (
        <div className="space-y-8 animate-in slide-in-from-left-4 fade-in duration-300">
            {/* Templates Section */}
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <Layout className="text-accent-green" size={20} />
                    <h2 className="text-xl font-bold text-white">Choose Template</h2>
                </div>

                {/* Category Tabs */}
                <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-none">
                    {['All', 'Professional', 'Modern', 'Simple', 'Creative'].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat as any)}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${activeCategory === cat
                                ? 'bg-accent-green text-bg-primary'
                                : 'bg-bg-card-light border border-border-subtle text-gray-300 hover:border-gray-500'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-2 gap-3 h-80 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
                    {filteredTemplates.map((template) => (
                        <button
                            key={template.id}
                            onClick={() => setTemplate(template.id)}
                            className={`relative text-left p-3 rounded-xl border transition-all ${selectedTemplate === template.id
                                ? 'bg-accent-green/10 border-accent-green ring-1 ring-accent-green'
                                : 'bg-bg-card-light border-border-subtle hover:border-gray-500'
                                }`}
                        >
                            {/* Visual Thumbnail */}
                            <div className="mb-2">
                                <TemplateThumbnail template={template} accentColor={customThemeColor || '#1e3a8a'} />
                            </div>
                            <span className="block font-medium text-white text-sm">{template.name}</span>
                            <span className="block text-xs text-gray-400 mt-1 line-clamp-1">{template.description}</span>
                            {selectedTemplate === template.id && (
                                <div className="absolute top-2 right-2 bg-accent-green text-bg-primary rounded-full p-0.5">
                                    <Check size={12} />
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <hr className="border-border-subtle" />

            {/* Colors Section */}
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <Palette className="text-accent-green" size={20} />
                    <h2 className="text-xl font-bold text-white">Accent Color</h2>
                </div>

                {/* Presets */}
                <div className="grid grid-cols-4 gap-3 mb-6">
                    {colorPresets.map((color) => {
                        const isSelected = customThemeColor === color.primary;
                        return (
                            <button
                                key={color.name}
                                onClick={() => handlePresetClick(color.primary)}
                                className={`group relative w-full aspect-square rounded-full border-2 transition-all flex items-center justify-center ${isSelected ? 'border-white scale-110' : 'border-transparent hover:scale-105'
                                    }`}
                                style={{ backgroundColor: color.primary }}
                                title={color.name}
                            >
                                {isSelected && <Check size={16} className="text-white drop-shadow-md" />}
                            </button>
                        );
                    })}
                </div>

                {/* Custom Color Picker */}
                <div className="bg-bg-card-light border border-border-subtle rounded-xl p-4">
                    <label className="text-sm font-medium text-gray-300 mb-3 block">Custom Color</label>
                    <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-border-subtle cursor-pointer">
                            <input
                                type="color"
                                value={customThemeColor || '#000000'}
                                onChange={(e) => setCustomThemeColor(e.target.value)}
                                className="absolute inset-0 w-[150%] h-[150%] -top-1/4 -left-1/4 p-0 m-0 cursor-pointer"
                            />
                        </div>
                        <input
                            type="text"
                            value={customThemeColor || ''}
                            onChange={(e) => setCustomThemeColor(e.target.value)}
                            placeholder="#000000"
                            className="bg-bg-primary border border-border-subtle rounded-lg px-3 py-2 text-white text-sm font-mono focus:border-accent-green outline-none w-28"
                        />
                        <span className="text-xs text-gray-500">Pick any hex code</span>
                    </div>
                </div>
            </div>

            <hr className="border-border-subtle" />

            {/* Fonts Section */}
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <Type className="text-accent-green" size={20} />
                    <h2 className="text-xl font-bold text-white">Typography</h2>
                </div>

                {/* Heading Font */}
                <div className="space-y-4">
                    <div className="bg-bg-card-light border border-border-subtle rounded-xl p-4">
                        <label className="text-sm font-medium text-gray-300 mb-3 block">Heading Font</label>
                        <div className="grid grid-cols-2 gap-2">
                            {fontPresets.map((font) => {
                                const isSelected = fonts.heading === font.name;
                                return (
                                    <button
                                        key={font.name}
                                        onClick={() => updateFonts({ heading: font.name })}
                                        className={`relative text-left p-3 rounded-lg border transition-all ${isSelected
                                            ? 'border-accent-green bg-accent-green/10'
                                            : 'border-border-subtle hover:border-gray-500'
                                            }`}
                                    >
                                        <span
                                            className="block text-white text-lg font-semibold truncate"
                                            style={{ fontFamily: font.fontFamily }}
                                        >
                                            {font.name}
                                        </span>

                                        {isSelected && (
                                            <div className="absolute top-2 right-2 text-accent-green">
                                                <Check size={14} />
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Body Font */}
                    <div className="bg-bg-card-light border border-border-subtle rounded-xl p-4">
                        <label className="text-sm font-medium text-gray-300 mb-3 block">Body Font</label>
                        <div className="grid grid-cols-2 gap-2">
                            {fontPresets.map((font) => {
                                const isSelected = fonts.body === font.name;
                                return (
                                    <button
                                        key={font.name}
                                        onClick={() => updateFonts({ body: font.name })}
                                        className={`relative text-left p-3 rounded-lg border transition-all ${isSelected
                                            ? 'border-accent-green bg-accent-green/10'
                                            : 'border-border-subtle hover:border-gray-500'
                                            }`}
                                    >
                                        <span
                                            className="block text-white text-sm truncate"
                                            style={{ fontFamily: font.fontFamily }}
                                        >
                                            The quick brown fox jumps
                                        </span>
                                        <span className="text-xs text-gray-500 mt-1 block">{font.name}</span>
                                        {isSelected && (
                                            <div className="absolute top-2 right-2 text-accent-green">
                                                <Check size={14} />
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Font Size */}
                    <div className="bg-bg-card-light border border-border-subtle rounded-xl p-4">
                        <label className="text-sm font-medium text-gray-300 mb-3 block">Text Size</label>
                        <div className="flex gap-2">
                            {(Object.entries(fontSizes) as [string, { name: string }][]).map(([key, value]) => {
                                const isSelected = fonts.size === key;
                                return (
                                    <button
                                        key={key}
                                        onClick={() => updateFonts({ size: key as 'small' | 'medium' | 'large' })}
                                        className={`flex-1 py-3 px-4 rounded-lg border-2 text-center transition-all ${isSelected
                                            ? 'border-accent-green bg-accent-green/10 text-accent-green'
                                            : 'border-border-subtle text-gray-400 hover:border-gray-500'
                                            }`}
                                    >
                                        <span className={`block font-medium ${key === 'small' ? 'text-xs' : key === 'medium' ? 'text-sm' : 'text-base'
                                            }`}>
                                            Aa
                                        </span>
                                        <span className="text-xs mt-1 block">{value.name}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Font Preview */}
                    <div className="bg-bg-card-light border border-border-subtle rounded-xl p-4">
                        <label className="text-sm font-medium text-gray-300 mb-3 block">Preview</label>
                        <div className="bg-white rounded-lg p-4 text-gray-800">
                            <h3
                                className="text-xl font-bold mb-2"
                                style={{ fontFamily: fontPresets.find(f => f.name === fonts.heading)?.fontFamily }}
                            >
                                John Smith
                            </h3>
                            <p
                                className={`text-gray-600 ${fonts.size === 'small' ? 'text-xs' : fonts.size === 'medium' ? 'text-sm' : 'text-base'
                                    }`}
                                style={{ fontFamily: fontPresets.find(f => f.name === fonts.body)?.fontFamily }}
                            >
                                Experienced software engineer with a passion for building scalable applications.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <hr className="border-border-subtle" />

            {/* Background Section */}
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <Image className="text-accent-green" size={20} />
                    <h2 className="text-xl font-bold text-white">Background Style</h2>
                </div>

                {/* Background Type Selector */}
                <div className="flex gap-2 mb-5">
                    {backgroundTypes.map((type) => (
                        <button
                            key={type.id}
                            onClick={() => updateBackground({ type: type.id })}
                            className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${background.type === type.id
                                ? 'bg-accent-green text-bg-primary'
                                : 'bg-bg-card-light border border-border-subtle text-gray-300 hover:border-gray-500'
                                }`}
                        >
                            {type.label}
                        </button>
                    ))}
                </div>

                {/* Solid Color Options */}
                {background.type === 'solid' && (
                    <div className="bg-bg-card-light border border-border-subtle rounded-xl p-4">
                        <label className="text-sm font-medium text-gray-300 mb-3 block">Background Color</label>
                        <div className="grid grid-cols-4 gap-2">
                            {backgroundColors.map((bg) => {
                                const isSelected = background.color === bg.color;
                                return (
                                    <button
                                        key={bg.name}
                                        onClick={() => updateBackground({ color: bg.color })}
                                        className={`relative aspect-square rounded-lg border-2 transition-all ${isSelected ? 'border-accent-green scale-105' : 'border-border-subtle hover:border-gray-400'
                                            }`}
                                        style={{ backgroundColor: bg.color }}
                                        title={bg.name}
                                    >
                                        {isSelected && (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <Check size={16} className="text-gray-600" />
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Gradient Options */}
                {background.type === 'gradient' && (
                    <div className="space-y-4">
                        <div className="bg-bg-card-light border border-border-subtle rounded-xl p-4">
                            <label className="text-sm font-medium text-gray-300 mb-3 block">Gradient Presets</label>
                            <div className="grid grid-cols-3 gap-2">
                                {gradientPresets.map((preset) => {
                                    const isSelected = background.color === preset.start && background.gradientEnd === preset.end;
                                    return (
                                        <button
                                            key={preset.name}
                                            onClick={() => updateBackground({
                                                color: preset.start,
                                                gradientEnd: preset.end,
                                                gradientDirection: preset.direction,
                                            })}
                                            className={`relative h-12 rounded-lg border-2 transition-all ${isSelected ? 'border-accent-green scale-105' : 'border-border-subtle hover:border-gray-400'
                                                }`}
                                            style={{
                                                background: `linear-gradient(${preset.direction}, ${preset.start}, ${preset.end})`,
                                            }}
                                            title={preset.name}
                                        >
                                            {isSelected && (
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <Check size={16} className="text-gray-600" />
                                                </div>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Custom Gradient Colors */}
                        <div className="bg-bg-card-light border border-border-subtle rounded-xl p-4">
                            <label className="text-sm font-medium text-gray-300 mb-3 block">Custom Gradient</label>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-gray-500">Start</span>
                                    <input
                                        type="color"
                                        value={background.color}
                                        onChange={(e) => updateBackground({ color: e.target.value })}
                                        className="w-8 h-8 rounded cursor-pointer border border-border-subtle"
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-gray-500">End</span>
                                    <input
                                        type="color"
                                        value={background.gradientEnd || '#f8fafc'}
                                        onChange={(e) => updateBackground({ gradientEnd: e.target.value })}
                                        className="w-8 h-8 rounded cursor-pointer border border-border-subtle"
                                    />
                                </div>
                                <select
                                    value={background.gradientDirection || 'to bottom'}
                                    onChange={(e) => updateBackground({ gradientDirection: e.target.value })}
                                    className="bg-bg-primary border border-border-subtle rounded-lg px-3 py-1.5 text-white text-xs focus:border-accent-green outline-none"
                                >
                                    <option value="to bottom">↓ Top to Bottom</option>
                                    <option value="to right">→ Left to Right</option>
                                    <option value="to bottom right">↘ Diagonal</option>
                                    <option value="to top right">↗ Diagonal Up</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}

                {/* Pattern Options */}
                {background.type === 'pattern' && (
                    <div className="space-y-4">
                        {/* Base Color for Pattern */}
                        <div className="bg-bg-card-light border border-border-subtle rounded-xl p-4">
                            <label className="text-sm font-medium text-gray-300 mb-3 block">Base Color</label>
                            <div className="grid grid-cols-4 gap-2">
                                {backgroundColors.map((bg) => {
                                    const isSelected = background.color === bg.color;
                                    return (
                                        <button
                                            key={bg.name}
                                            onClick={() => updateBackground({ color: bg.color })}
                                            className={`relative aspect-square rounded-lg border-2 transition-all ${isSelected ? 'border-accent-green scale-105' : 'border-border-subtle hover:border-gray-400'
                                                }`}
                                            style={{ backgroundColor: bg.color }}
                                            title={bg.name}
                                        >
                                            {isSelected && (
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <Check size={16} className="text-gray-600" />
                                                </div>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Pattern Selection */}
                        <div className="bg-bg-card-light border border-border-subtle rounded-xl p-4">
                            <label className="text-sm font-medium text-gray-300 mb-3 block">Pattern Type</label>
                            <div className="grid grid-cols-5 gap-2">
                                {patterns.map((pat) => {
                                    const isSelected = background.pattern === pat.id;
                                    return (
                                        <button
                                            key={pat.id}
                                            onClick={() => updateBackground({ pattern: pat.id as BackgroundPattern })}
                                            className={`flex flex-col items-center justify-center py-3 rounded-lg border-2 transition-all ${isSelected
                                                ? 'border-accent-green bg-accent-green/10 text-accent-green'
                                                : 'border-border-subtle text-gray-400 hover:border-gray-500'
                                                }`}
                                            title={pat.name}
                                        >
                                            <span className="text-lg mb-1">{patternIcons[pat.id]}</span>
                                            <span className="text-xs">{pat.name}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Pattern Opacity */}
                        {background.pattern !== 'none' && (
                            <div className="bg-bg-card-light border border-border-subtle rounded-xl p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <label className="text-sm font-medium text-gray-300">Pattern Opacity</label>
                                    <span className="text-xs text-gray-500">{background.patternOpacity}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="5"
                                    max="50"
                                    value={background.patternOpacity}
                                    onChange={(e) => updateBackground({ patternOpacity: parseInt(e.target.value) })}
                                    className="w-full h-2 bg-bg-primary rounded-lg appearance-none cursor-pointer accent-accent-green"
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
