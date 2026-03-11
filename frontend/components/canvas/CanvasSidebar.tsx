'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import {
    LayoutTemplate,
    Palette,
    Upload,
    Type,
    Shapes,
    ChevronRight,
    Check,
    Layers,
    Smile,
    ExternalLink,
} from 'lucide-react';
import { useCanvasStore, TextElement, ImageElement, ShapeElement } from '@/store/useCanvasStore';
import { canvasTemplates } from '@/lib/canvasTemplates';
import LayerPanel from './LayerPanel';
import IconsLibrary from './IconsLibrary';

type SidebarTab = 'templates' | 'elements' | 'uploads' | 'background' | 'layers' | 'icons';

export default function CanvasSidebar() {
    const locale = useLocale();
    const [activeTab, setActiveTab] = useState<SidebarTab>('templates');
    const [expandedCategory, setExpandedCategory] = useState<string | null>('creative');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const {
        loadTemplate,
        addElement,
        backgroundColor,
        setBackgroundColor,
        backgroundGradient,
        setBackgroundGradient,
        selectedTemplateId,
        elements,
        updateElement,
        selectedElementIds,
    } = useCanvasStore();

    const tabs = [
        { id: 'templates' as const, icon: LayoutTemplate, label: 'Templates' },
        { id: 'elements' as const, icon: Shapes, label: 'Elements' },
        { id: 'icons' as const, icon: Smile, label: 'Icons' },
        { id: 'uploads' as const, icon: Upload, label: 'Uploads' },
        { id: 'layers' as const, icon: Layers, label: 'Layers' },
        { id: 'background' as const, icon: Palette, label: 'BG' },
    ];

    const templateCategories = [
        { id: 'creative', label: 'Creative' },
        { id: 'professional', label: 'Professional' },
        { id: 'minimal', label: 'Minimal' },
        { id: 'bold', label: 'Bold' },
    ];

    const backgroundColors = [
        { color: '#ffffff', label: 'White' },
        { color: '#fafafa', label: 'Off White' },
        { color: '#1a1a2e', label: 'Dark Navy' },
        { color: '#0a0a0a', label: 'Black' },
        { color: '#0f0c29', label: 'Dark Purple' },
        { color: '#1e3a5f', label: 'Navy Blue' },
        { color: '#f3f4f6', label: 'Light Gray' },
        { color: '#fef3c7', label: 'Cream' },
    ];

    const accentColors = [
        '#00dc82', '#ff6b6b', '#8b5cf6', '#00cec9',
        '#f59e0b', '#ec4899', '#3b82f6', '#10b981',
    ];

    // Handle image upload
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert('Image size should be less than 5MB');
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            const src = event.target?.result as string;

            // Check if a shape is selected - fill the shape with the image
            const selectedShapeId = selectedElementIds.find((id) => {
                const el = elements.find((e) => e.id === id);
                return el?.type === 'shape';
            });

            if (selectedShapeId) {
                // Fill the shape with the image (clip image to shape)
                updateElement(selectedShapeId, { imageSrc: src, imageFit: 'cover', imageOffsetX: 0, imageOffsetY: 0 } as Partial<ShapeElement>);
                return;
            }

            // If an image element is selected, update it
            const selectedImageId = selectedElementIds.find((id) => {
                const el = elements.find((e) => e.id === id);
                return el?.type === 'image';
            });

            if (selectedImageId) {
                updateElement(selectedImageId, { src } as Partial<ImageElement>);
            } else {
                // Create new image element
                const newImage: ImageElement = {
                    id: crypto.randomUUID(),
                    type: 'image',
                    x: 100,
                    y: 100,
                    width: 200,
                    height: 200,
                    rotation: 0,
                    opacity: 1,
                    locked: false,
                    visible: true,
                    src,
                };
                addElement(newImage);
            }
        };
        reader.readAsDataURL(file);

        // Reset input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    // Quick text styles
    const textPresets = [
        { label: 'Heading', fontSize: 42, fontWeight: 'bold' as const, fontFamily: 'Playfair Display' },
        { label: 'Subheading', fontSize: 24, fontWeight: 'bold' as const, fontFamily: 'Inter' },
        { label: 'Body', fontSize: 14, fontWeight: 'normal' as const, fontFamily: 'Inter' },
        { label: 'Caption', fontSize: 11, fontWeight: 'normal' as const, fontFamily: 'Inter' },
    ];

    const addTextElement = (preset: typeof textPresets[0]) => {
        const newText: TextElement = {
            id: crypto.randomUUID(),
            type: 'text',
            x: 100,
            y: 100,
            width: 300,
            height: 50,
            rotation: 0,
            opacity: 1,
            locked: false,
            visible: true,
            text: `Add ${preset.label}`,
            fontSize: preset.fontSize,
            fontFamily: preset.fontFamily,
            fontStyle: 'normal',
            fontWeight: preset.fontWeight,
            fill: backgroundColor === '#ffffff' || backgroundColor === '#fafafa' ? '#333333' : '#ffffff',
            align: 'left',
            lineHeight: 1.4,
            letterSpacing: 0,
        };
        addElement(newText);
    };

    // Quick shape styles
    const shapePresets = [
        { label: 'Rectangle', shapeType: 'rectangle' as const, fill: '#00dc82', width: 100, height: 100, cornerRadius: 8 },
        { label: 'Square Frame', shapeType: 'rectangle' as const, fill: '#e2e8f0', width: 120, height: 120, cornerRadius: 8, isHeadshot: true },
        { label: 'Circle', shapeType: 'circle' as const, fill: '#8b5cf6', width: 100, height: 100 },
        { label: 'Star', shapeType: 'star' as const, fill: '#ff6b6b', width: 100, height: 100 },
        { label: 'Line', shapeType: 'line' as const, fill: '#00cec9', width: 100, height: 4 },
    ];

    const addShapeElement = (preset: typeof shapePresets[0]) => {
        const newShape: ShapeElement = {
            id: crypto.randomUUID(),
            type: 'shape',
            shapeType: preset.shapeType,
            x: 100,
            y: 100,
            width: preset.width,
            height: preset.height,
            rotation: 0,
            opacity: 1,
            locked: false,
            visible: true,
            fill: preset.fill,
            stroke: preset.isHeadshot ? '#cbd5e1' : 'transparent',
            strokeWidth: preset.isHeadshot ? 2 : 0,
            cornerRadius: preset.cornerRadius || (preset.shapeType === 'rectangle' ? 8 : undefined),
            innerRadius: preset.shapeType === 'star' ? 0.4 : undefined,
        };
        addElement(newShape);
    };

    // Render a mini SVG preview of template
    const renderTemplatePreview = (template: typeof canvasTemplates[0]) => {
        return (
            <svg
                viewBox="0 0 595 842"
                className="absolute inset-0 w-full h-full"
                style={{ backgroundColor: template.backgroundColor }}
            >
                {template.elements.slice(0, 15).map((element, index) => {
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
                                    opacity={element.opacity}
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
                                opacity={element.opacity}
                            />
                        );
                    }
                    if (element.type === 'text') {
                        const lineHeight = element.fontSize * 0.7;
                        return (
                            <rect
                                key={index}
                                x={element.x}
                                y={element.y + element.fontSize * 0.2}
                                width={Math.min(element.width * 0.8, element.text.length * element.fontSize * 0.4)}
                                height={lineHeight}
                                fill={element.fill}
                                opacity={0.6}
                                rx={2}
                            />
                        );
                    }
                    return null;
                })}
            </svg>
        );
    };

    const renderTemplatesTab = () => (
        <div className="space-y-4">
            {/* Link to full templates page */}
            <Link
                href={`/${locale}/canvas-templates`}
                className="flex items-center justify-between px-4 py-3 bg-white hover:bg-gray-200 rounded-lg transition-colors group"
            >
                <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900">
                    Browse All Templates
                </span>
                <ExternalLink size={16} className="text-gray-500 group-hover:text-accent-green" />
            </Link>

            {templateCategories.map((category) => {
                const categoryTemplates = canvasTemplates.filter((t) => t.category === category.id);
                if (categoryTemplates.length === 0) return null;

                const isExpanded = expandedCategory === category.id;

                return (
                    <div key={category.id}>
                        <button
                            onClick={() => setExpandedCategory(isExpanded ? null : category.id)}
                            className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <span className="flex items-center gap-2">
                                {category.label}
                                <span className="text-xs text-gray-400">({categoryTemplates.length})</span>
                            </span>
                            <ChevronRight
                                size={16}
                                className={`transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                            />
                        </button>

                        {isExpanded && (
                            <div className="mt-2 grid grid-cols-2 gap-2">
                                {categoryTemplates.map((template) => (
                                    <button
                                        key={template.id}
                                        onClick={() => loadTemplate(template)}
                                        className={`relative aspect-[3/4] rounded-lg overflow-hidden border-2 transition-all ${
                                            selectedTemplateId === template.id
                                                ? 'border-accent-green ring-2 ring-accent-green/30'
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    >
                                        {/* SVG Template preview */}
                                        {renderTemplatePreview(template)}

                                        {/* Template name overlay */}
                                        <div className="absolute inset-0 flex items-end p-2">
                                            <span className="text-xs font-medium text-white/90 bg-black/50 px-2 py-1 rounded truncate w-full text-center">
                                                {template.name}
                                            </span>
                                        </div>
                                        {selectedTemplateId === template.id && (
                                            <div className="absolute top-2 right-2 w-5 h-5 bg-accent-green rounded-full flex items-center justify-center">
                                                <Check size={12} className="text-gray-900" />
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );

    const renderElementsTab = () => (
        <div className="space-y-6">
            {/* Text presets */}
            <div>
                <h3 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
                    <Type size={16} />
                    Text
                </h3>
                <div className="space-y-2">
                    {textPresets.map((preset) => (
                        <button
                            key={preset.label}
                            onClick={() => addTextElement(preset)}
                            className="w-full px-4 py-3 bg-white hover:bg-gray-200 rounded-lg text-left transition-colors group"
                        >
                            <span
                                className="text-gray-700 group-hover:text-gray-900"
                                style={{
                                    fontSize: Math.min(preset.fontSize * 0.6, 20),
                                    fontWeight: preset.fontWeight,
                                    fontFamily: preset.fontFamily,
                                }}
                            >
                                Add {preset.label}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Shape presets */}
            <div>
                <h3 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
                    <Shapes size={16} />
                    Shapes
                </h3>
                <div className="grid grid-cols-2 gap-2">
                    {shapePresets.map((preset) => (
                        <button
                            key={preset.label}
                            onClick={() => addShapeElement(preset)}
                            className="p-4 bg-white hover:bg-gray-200 rounded-lg transition-colors flex flex-col items-center gap-2"
                        >
                            <div
                                className={`w-10 h-10 ${
                                    preset.shapeType === 'circle' ? 'rounded-full' :
                                    preset.shapeType === 'line' ? 'h-1 w-10' :
                                    'rounded-lg'
                                }`}
                                style={{
                                    backgroundColor: preset.fill,
                                    clipPath: preset.shapeType === 'star'
                                        ? 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
                                        : undefined,
                                }}
                            />
                            <span className="text-xs text-gray-500">{preset.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderUploadsTab = () => (
        <div className="space-y-4">
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
            />

            <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full p-6 border-2 border-dashed border-gray-300 hover:border-accent-green rounded-xl text-center transition-colors group"
            >
                <Upload size={32} className="mx-auto mb-2 text-gray-500 group-hover:text-accent-green transition-colors" />
                <span className="text-sm text-gray-600 group-hover:text-accent-green transition-colors">
                    Upload Image
                </span>
                <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
            </button>

            <p className="text-xs text-gray-400 text-center">
                Tip: Select a shape to clip the image to that shape, or select an image placeholder to replace it
            </p>
        </div>
    );

    const renderBackgroundTab = () => (
        <div className="space-y-6">
            {/* Solid colors */}
            <div>
                <h3 className="text-sm font-medium text-gray-500 mb-3">Background Color</h3>
                <div className="grid grid-cols-4 gap-2">
                    {backgroundColors.map((bg) => (
                        <button
                            key={bg.color}
                            onClick={() => {
                                setBackgroundColor(bg.color);
                                setBackgroundGradient({ ...backgroundGradient, enabled: false });
                            }}
                            className={`aspect-square rounded-lg border-2 transition-all ${
                                backgroundColor === bg.color && !backgroundGradient.enabled
                                    ? 'border-accent-green ring-2 ring-accent-green/30'
                                    : 'border-gray-300 hover:border-gray-400'
                            }`}
                            style={{ backgroundColor: bg.color }}
                            title={bg.label}
                        />
                    ))}
                </div>
            </div>

            {/* Custom color */}
            <div>
                <h3 className="text-sm font-medium text-gray-500 mb-3">Custom Color</h3>
                <div className="flex items-center gap-3">
                    <input
                        type="color"
                        value={backgroundColor}
                        onChange={(e) => {
                            setBackgroundColor(e.target.value);
                            setBackgroundGradient({ ...backgroundGradient, enabled: false });
                        }}
                        className="w-10 h-10 rounded-lg cursor-pointer border-0"
                    />
                    <input
                        type="text"
                        value={backgroundColor}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
                                setBackgroundColor(value);
                                setBackgroundGradient({ ...backgroundGradient, enabled: false });
                            }
                        }}
                        className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 text-sm"
                        placeholder="#ffffff"
                    />
                </div>
            </div>

            {/* Gradient toggle */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-gray-500">Gradient</h3>
                    <button
                        onClick={() => setBackgroundGradient({ ...backgroundGradient, enabled: !backgroundGradient.enabled })}
                        className={`w-10 h-6 rounded-full transition-colors ${
                            backgroundGradient.enabled ? 'bg-accent-green' : 'bg-gray-200'
                        }`}
                    >
                        <div
                            className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                                backgroundGradient.enabled ? 'translate-x-4' : 'translate-x-0.5'
                            }`}
                        />
                    </button>
                </div>

                {backgroundGradient.enabled && (
                    <div className="space-y-3">
                        <div className="flex gap-2">
                            <div className="flex-1">
                                <label className="text-xs text-gray-400 mb-1 block">Start</label>
                                <input
                                    type="color"
                                    value={backgroundGradient.start}
                                    onChange={(e) => setBackgroundGradient({ ...backgroundGradient, start: e.target.value })}
                                    className="w-full h-10 rounded-lg cursor-pointer border-0"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="text-xs text-gray-400 mb-1 block">End</label>
                                <input
                                    type="color"
                                    value={backgroundGradient.end}
                                    onChange={(e) => setBackgroundGradient({ ...backgroundGradient, end: e.target.value })}
                                    className="w-full h-10 rounded-lg cursor-pointer border-0"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="text-xs text-gray-400 mb-1 block">Direction: {backgroundGradient.direction}°</label>
                            <input
                                type="range"
                                min="0"
                                max="360"
                                value={backgroundGradient.direction}
                                onChange={(e) => setBackgroundGradient({ ...backgroundGradient, direction: parseInt(e.target.value) })}
                                className="w-full"
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Accent colors for quick reference */}
            <div>
                <h3 className="text-sm font-medium text-gray-500 mb-3">Accent Colors</h3>
                <div className="grid grid-cols-4 gap-2">
                    {accentColors.map((color) => (
                        <button
                            key={color}
                            className="aspect-square rounded-lg border-2 border-gray-300 hover:border-gray-400 transition-all"
                            style={{ backgroundColor: color }}
                            title={color}
                        />
                    ))}
                </div>
                <p className="text-xs text-gray-400 mt-2">
                    Reference colors from templates. Click elements to change their colors.
                </p>
            </div>
        </div>
    );

    return (
        <div className="w-72 bg-gray-50 border-r border-gray-200 flex flex-col h-full">
            {/* Tabs */}
            <div className="flex border-b border-gray-200">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 py-3 flex flex-col items-center gap-1 text-xs transition-colors ${
                            activeTab === tab.id
                                ? 'text-accent-green border-b-2 border-accent-green bg-gray-50'
                                : 'text-gray-500 hover:text-accent-green hover:bg-gray-100'
                        }`}
                    >
                        <tab.icon size={20} />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
                {activeTab === 'layers' ? (
                    <LayerPanel />
                ) : (
                    <div className="p-4">
                        {activeTab === 'templates' && renderTemplatesTab()}
                        {activeTab === 'elements' && renderElementsTab()}
                        {activeTab === 'icons' && <IconsLibrary />}
                        {activeTab === 'uploads' && renderUploadsTab()}
                        {activeTab === 'background' && renderBackgroundTab()}
                    </div>
                )}
            </div>
        </div>
    );
}
