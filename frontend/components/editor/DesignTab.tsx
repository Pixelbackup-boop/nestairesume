'use client';

import { useState } from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { fontPresets, fontSizes } from '../../lib/themes';
import {
    singleColorPresets,
    dualColorPresets,
    getTemplateColorSchema,
} from '@/lib/templates/builder';
import { Check } from 'lucide-react';

type DesignSection = 'color' | 'fonts';

export default function DesignTab() {
    const [activeSection, setActiveSection] = useState<DesignSection>('color');
    const { resumeData, selectedTemplateId, setCustomThemeColor, updateFonts } = useResumeStore();
    const { customThemeColor, fonts } = resumeData;

    // Get color schema for current template
    const templateId = selectedTemplateId || 'header-bold';
    const colorSchema = getTemplateColorSchema(templateId);
    const isDualColor = colorSchema.schemaType === 'dual';

    // For dual-color templates, we store both colors as "primary|secondary"
    const handleSingleColorClick = (color: string) => {
        setCustomThemeColor(color);
    };

    const handleDualColorClick = (primary: string, secondary: string) => {
        // Store both colors separated by pipe
        setCustomThemeColor(`${primary}|${secondary}`);
    };

    // Parse stored color value
    const [selectedPrimary, selectedSecondary] = (customThemeColor || '').split('|');

    const tabs: { id: DesignSection; label: string }[] = [
        { id: 'color', label: 'Color Theme' },
        { id: 'fonts', label: 'Fonts' },
    ];

    return (
        <div className="animate-in slide-in-from-left-4 fade-in duration-300">
            {/* Top Tab Bar */}
            <div className="flex gap-2 mb-6">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveSection(tab.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            activeSection === tab.id
                                ? 'bg-accent-green text-bg-primary'
                                : 'bg-bg-card-light border border-border-subtle text-gray-700 hover:border-gray-500'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Color Theme Section */}
            {activeSection === 'color' && (
                <div className="space-y-4">
                    <p className="text-sm text-gray-400 mb-2">
                        {isDualColor
                            ? 'Choose a color pair for your resume (header + sidebar)'
                            : 'Choose an accent color for your resume'
                        }
                    </p>

                    {/* Single-Color Presets */}
                    {!isDualColor && (
                        <div className="grid grid-cols-5 gap-2">
                            {singleColorPresets.map((preset) => {
                                const isSelected = customThemeColor === preset.color;
                                return (
                                    <button
                                        key={preset.id}
                                        onClick={() => handleSingleColorClick(preset.color)}
                                        className={`group relative w-full aspect-square rounded-lg border-2 transition-all flex items-center justify-center ${
                                            isSelected ? 'border-white scale-105 ring-2 ring-white/30' : 'border-transparent hover:scale-105'
                                        }`}
                                        style={{ backgroundColor: preset.color }}
                                        title={preset.name}
                                    >
                                        {isSelected && <Check size={14} className="text-gray-900 drop-shadow-md" />}
                                    </button>
                                );
                            })}
                        </div>
                    )}

                    {/* Dual-Color Presets */}
                    {isDualColor && (
                        <div className="grid grid-cols-5 gap-2">
                            {dualColorPresets.map((preset) => {
                                const isSelected = selectedPrimary === preset.primary && selectedSecondary === preset.secondary;
                                return (
                                    <button
                                        key={preset.id}
                                        onClick={() => handleDualColorClick(preset.primary, preset.secondary)}
                                        className={`group relative w-full rounded-lg border-2 transition-all overflow-hidden ${
                                            isSelected ? 'border-white scale-105 ring-2 ring-white/30' : 'border-transparent hover:scale-105'
                                        }`}
                                        title={preset.name}
                                    >
                                        {/* Primary color (top) */}
                                        <div
                                            className="w-full h-6"
                                            style={{ backgroundColor: preset.primary }}
                                        />
                                        {/* Secondary color (bottom) */}
                                        <div
                                            className="w-full h-4"
                                            style={{ backgroundColor: preset.secondary }}
                                        />
                                        {isSelected && (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <Check size={14} className="text-gray-900 drop-shadow-md" />
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    )}

                    {/* Selected color indicator */}
                    {customThemeColor && (
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            {isDualColor ? (
                                <>
                                    <div className="flex rounded overflow-hidden">
                                        <div className="w-4 h-4" style={{ backgroundColor: selectedPrimary }} />
                                        <div className="w-4 h-4" style={{ backgroundColor: selectedSecondary }} />
                                    </div>
                                    <span>
                                        Selected: {dualColorPresets.find(p => p.primary === selectedPrimary)?.name || 'Custom'}
                                    </span>
                                </>
                            ) : (
                                <>
                                    <div className="w-4 h-4 rounded" style={{ backgroundColor: customThemeColor }} />
                                    <span>
                                        Selected: {singleColorPresets.find(p => p.color === customThemeColor)?.name || 'Custom'}
                                    </span>
                                </>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* Fonts Section */}
            {activeSection === 'fonts' && (
                <div className="space-y-3">
                    {/* Heading Font */}
                    <div className="bg-bg-card-light border border-border-subtle rounded-lg p-3">
                        <label className="text-xs font-medium text-gray-400 mb-2 block">Heading Font</label>
                        <div className="grid grid-cols-3 gap-1.5">
                            {fontPresets.map((font) => {
                                const isSelected = fonts.heading === font.name;
                                return (
                                    <button
                                        key={font.name}
                                        onClick={() => updateFonts({ heading: font.name })}
                                        className={`relative text-left px-2 py-1.5 rounded border transition-all ${
                                            isSelected
                                                ? 'border-accent-green bg-accent-green/10'
                                                : 'border-border-subtle hover:border-gray-500'
                                        }`}
                                    >
                                        <span
                                            className="block text-gray-900 text-xs font-medium truncate"
                                            style={{ fontFamily: font.fontFamily }}
                                        >
                                            {font.name}
                                        </span>
                                        {isSelected && (
                                            <div className="absolute top-1 right-1 text-accent-green">
                                                <Check size={10} />
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Body Font */}
                    <div className="bg-bg-card-light border border-border-subtle rounded-lg p-3">
                        <label className="text-xs font-medium text-gray-400 mb-2 block">Body Font</label>
                        <div className="grid grid-cols-3 gap-1.5">
                            {fontPresets.map((font) => {
                                const isSelected = fonts.body === font.name;
                                return (
                                    <button
                                        key={font.name}
                                        onClick={() => updateFonts({ body: font.name })}
                                        className={`relative text-left px-2 py-1.5 rounded border transition-all ${
                                            isSelected
                                                ? 'border-accent-green bg-accent-green/10'
                                                : 'border-border-subtle hover:border-gray-500'
                                        }`}
                                    >
                                        <span
                                            className="block text-gray-900 text-xs truncate"
                                            style={{ fontFamily: font.fontFamily }}
                                        >
                                            {font.name}
                                        </span>
                                        {isSelected && (
                                            <div className="absolute top-1 right-1 text-accent-green">
                                                <Check size={10} />
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Font Size */}
                    <div className="bg-bg-card-light border border-border-subtle rounded-lg p-3">
                        <label className="text-xs font-medium text-gray-400 mb-2 block">Text Size</label>
                        <div className="flex gap-1.5">
                            {(Object.entries(fontSizes) as [string, { name: string }][]).map(([key, value]) => {
                                const isSelected = fonts.size === key;
                                return (
                                    <button
                                        key={key}
                                        onClick={() => updateFonts({ size: key as 'small' | 'medium' | 'large' })}
                                        className={`flex-1 py-2 px-2 rounded border text-center transition-all ${
                                            isSelected
                                                ? 'border-accent-green bg-accent-green/10 text-accent-green'
                                                : 'border-border-subtle text-gray-400 hover:border-gray-500'
                                        }`}
                                    >
                                        <span className={`block font-medium ${
                                            key === 'small' ? 'text-[10px]' : key === 'medium' ? 'text-xs' : 'text-sm'
                                        }`}>
                                            Aa
                                        </span>
                                        <span className="text-[10px] mt-0.5 block">{value.name}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Font Preview */}
                    <div className="bg-bg-card-light border border-border-subtle rounded-lg p-3">
                        <label className="text-xs font-medium text-gray-400 mb-2 block">Preview</label>
                        <div className="bg-white rounded p-3 text-gray-800">
                            <h3
                                className="text-base font-bold mb-1"
                                style={{ fontFamily: fontPresets.find(f => f.name === fonts.heading)?.fontFamily }}
                            >
                                John Smith
                            </h3>
                            <p
                                className={`text-gray-600 ${
                                    fonts.size === 'small' ? 'text-[10px]' : fonts.size === 'medium' ? 'text-xs' : 'text-sm'
                                }`}
                                style={{ fontFamily: fontPresets.find(f => f.name === fonts.body)?.fontFamily }}
                            >
                                Experienced software engineer with a passion for building scalable applications.
                            </p>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
