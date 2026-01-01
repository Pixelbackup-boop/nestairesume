'use client';

import { useResumeStore } from '../../store/useResumeStore';
import { templates, themes, presetColors } from '../../lib/themes';
import { Check, Palette, Layout } from 'lucide-react';

export default function DesignTab() {
    const { selectedTemplate, selectedTheme, resumeData, setTemplate, setTheme, setCustomThemeColor } = useResumeStore();
    const { customThemeColor } = resumeData;

    const handlePresetClick = (hex: string) => {
        setCustomThemeColor(hex);
    };

    const handleThemeSelect = (themeKey: string) => {
        setTheme(themeKey);
    };

    return (
        <div className="space-y-8 animate-in slide-in-from-left-4 fade-in duration-300">
            {/* Templates Section */}
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <Layout className="text-accent-green" size={20} />
                    <h2 className="text-xl font-bold text-white">Choose Template</h2>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    {templates.map((template) => (
                        <button
                            key={template.id}
                            onClick={() => setTemplate(template.id)}
                            className={`relative text-left p-3 rounded-xl border transition-all ${selectedTemplate === template.id
                                    ? 'bg-accent-green/10 border-accent-green ring-1 ring-accent-green'
                                    : 'bg-bg-card-light border-border-subtle hover:border-gray-500'
                                }`}
                        >
                            <span className="block font-medium text-white text-sm">{template.name}</span>
                            <span className="block text-xs text-gray-400 mt-1">{template.description}</span>
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
                    {presetColors.map((color) => {
                        const isSelected = customThemeColor === color.hex;
                        return (
                            <button
                                key={color.name}
                                onClick={() => handlePresetClick(color.hex)}
                                className={`group relative w-full aspect-square rounded-full border-2 transition-all flex items-center justify-center ${isSelected ? 'border-white scale-110' : 'border-transparent hover:scale-105'
                                    }`}
                                style={{ backgroundColor: color.hex }}
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
        </div>
    );
}
