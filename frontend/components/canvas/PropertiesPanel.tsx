'use client';

import React, { useState } from 'react';
import {
    X,
    Lock,
    Unlock,
    Eye,
    EyeOff,
    Trash2,
    Copy,
    ChevronUp,
    ChevronDown,
    ChevronsUp,
    ChevronsDown,
    RotateCcw,
    Type,
    Square,
    Circle,
    Image as ImageIcon,
    Palette,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Bold,
    Italic,
} from 'lucide-react';
import { useCanvasStore, AnyCanvasElement, TextElement, ShapeElement, ImageElement } from '@/store/useCanvasStore';

export default function PropertiesPanel() {
    const {
        elements,
        selectedElementIds,
        updateElement,
        removeElement,
        duplicateElement,
        bringToFront,
        sendToBack,
        moveUp,
        moveDown,
        deselectAll,
        saveToHistory,
    } = useCanvasStore();

    const [activeSection, setActiveSection] = useState<string | null>('transform');

    // Get selected element(s)
    const selectedElements = elements.filter((el) => selectedElementIds.includes(el.id));
    const selectedElement = selectedElements.length === 1 ? selectedElements[0] : null;

    if (!selectedElement) {
        return (
            <div className="w-64 bg-slate-900 border-l border-slate-700 p-4 flex flex-col items-center justify-center text-center h-full">
                <div className="text-slate-500 text-sm">
                    <Square className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p>Select an element to edit its properties</p>
                </div>
            </div>
        );
    }

    const handleUpdate = (updates: Partial<AnyCanvasElement>) => {
        updateElement(selectedElement.id, updates);
    };

    const handleUpdateAndSave = (updates: Partial<AnyCanvasElement>) => {
        updateElement(selectedElement.id, updates);
        saveToHistory();
    };

    const getElementIcon = () => {
        switch (selectedElement.type) {
            case 'text': return <Type size={16} />;
            case 'shape': return <Square size={16} />;
            case 'image': return <ImageIcon size={16} />;
            default: return <Square size={16} />;
        }
    };

    const getElementTypeName = () => {
        switch (selectedElement.type) {
            case 'text': return 'Text';
            case 'shape': return (selectedElement as ShapeElement).shapeType.charAt(0).toUpperCase() + (selectedElement as ShapeElement).shapeType.slice(1);
            case 'image': return 'Image';
            default: return 'Element';
        }
    };

    // Section toggle
    const Section = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
        <div className="border-b border-slate-700">
            <button
                onClick={() => setActiveSection(activeSection === id ? null : id)}
                className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-slate-300 hover:bg-slate-800 transition-colors"
            >
                {title}
                <ChevronDown
                    size={16}
                    className={`transition-transform ${activeSection === id ? 'rotate-180' : ''}`}
                />
            </button>
            {activeSection === id && (
                <div className="px-4 pb-4 space-y-3">
                    {children}
                </div>
            )}
        </div>
    );

    // Input components
    const NumberInput = ({ label, value, onChange, min, max, step = 1 }: {
        label: string;
        value: number;
        onChange: (value: number) => void;
        min?: number;
        max?: number;
        step?: number;
    }) => (
        <div className="flex items-center justify-between">
            <label className="text-xs text-slate-400">{label}</label>
            <input
                type="number"
                value={Math.round(value * 100) / 100}
                onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
                onBlur={() => saveToHistory()}
                min={min}
                max={max}
                step={step}
                className="w-20 px-2 py-1 bg-slate-800 border border-slate-600 rounded text-sm text-white text-right focus:outline-none focus:border-accent-green"
            />
        </div>
    );

    const ColorInput = ({ label, value, onChange }: {
        label: string;
        value: string;
        onChange: (value: string) => void;
    }) => (
        <div className="flex items-center justify-between">
            <label className="text-xs text-slate-400">{label}</label>
            <div className="flex items-center gap-2">
                <input
                    type="color"
                    value={value || '#000000'}
                    onChange={(e) => onChange(e.target.value)}
                    onBlur={() => saveToHistory()}
                    className="w-8 h-8 rounded cursor-pointer border-0"
                />
                <input
                    type="text"
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                    onBlur={() => saveToHistory()}
                    className="w-20 px-2 py-1 bg-slate-800 border border-slate-600 rounded text-xs text-white focus:outline-none focus:border-accent-green"
                    placeholder="#000000"
                />
            </div>
        </div>
    );

    const SliderInput = ({ label, value, onChange, min = 0, max = 100, step = 1 }: {
        label: string;
        value: number;
        onChange: (value: number) => void;
        min?: number;
        max?: number;
        step?: number;
    }) => (
        <div className="space-y-1">
            <div className="flex items-center justify-between">
                <label className="text-xs text-slate-400">{label}</label>
                <span className="text-xs text-slate-500">{Math.round(value)}</span>
            </div>
            <input
                type="range"
                value={value}
                onChange={(e) => onChange(parseFloat(e.target.value))}
                onMouseUp={() => saveToHistory()}
                onTouchEnd={() => saveToHistory()}
                min={min}
                max={max}
                step={step}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider-thumb"
                style={{
                    WebkitAppearance: 'none',
                    background: `linear-gradient(to right, #00dc82 0%, #00dc82 ${((value - min) / (max - min)) * 100}%, #334155 ${((value - min) / (max - min)) * 100}%, #334155 100%)`,
                }}
            />
        </div>
    );

    return (
        <div className="w-64 bg-slate-900 border-l border-slate-700 flex flex-col h-full overflow-hidden">
            {/* Header */}
            <div className="px-4 py-3 border-b border-slate-700 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2 text-white">
                    {getElementIcon()}
                    <span className="font-medium text-sm">{getElementTypeName()}</span>
                </div>
                <button
                    onClick={deselectAll}
                    className="p-1 text-slate-400 hover:text-white transition-colors"
                >
                    <X size={16} />
                </button>
            </div>

            {/* Quick Actions */}
            <div className="px-4 py-3 border-b border-slate-700 flex items-center gap-1 shrink-0">
                <button
                    onClick={() => duplicateElement(selectedElement.id)}
                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
                    title="Duplicate"
                >
                    <Copy size={16} />
                </button>
                <button
                    onClick={() => handleUpdateAndSave({ locked: !selectedElement.locked })}
                    className={`p-2 rounded transition-colors ${selectedElement.locked ? 'text-accent-green bg-slate-800' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                    title={selectedElement.locked ? 'Unlock' : 'Lock'}
                >
                    {selectedElement.locked ? <Lock size={16} /> : <Unlock size={16} />}
                </button>
                <button
                    onClick={() => handleUpdateAndSave({ visible: !selectedElement.visible })}
                    className={`p-2 rounded transition-colors ${!selectedElement.visible ? 'text-yellow-500 bg-slate-800' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                    title={selectedElement.visible ? 'Hide' : 'Show'}
                >
                    {selectedElement.visible ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <div className="w-px h-6 bg-slate-700 mx-1" />
                <button
                    onClick={() => bringToFront(selectedElement.id)}
                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
                    title="Bring to Front"
                >
                    <ChevronsUp size={16} />
                </button>
                <button
                    onClick={() => sendToBack(selectedElement.id)}
                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
                    title="Send to Back"
                >
                    <ChevronsDown size={16} />
                </button>
                <div className="w-px h-6 bg-slate-700 mx-1" />
                <button
                    onClick={() => removeElement(selectedElement.id)}
                    className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded transition-colors"
                    title="Delete"
                >
                    <Trash2 size={16} />
                </button>
            </div>

            {/* Scrollable Sections */}
            <div className="flex-1 overflow-y-auto">
                {/* Transform Section */}
                <Section id="transform" title="Position & Size">
                    <div className="grid grid-cols-2 gap-2">
                        <NumberInput
                            label="X"
                            value={selectedElement.x}
                            onChange={(v) => handleUpdate({ x: v })}
                        />
                        <NumberInput
                            label="Y"
                            value={selectedElement.y}
                            onChange={(v) => handleUpdate({ y: v })}
                        />
                        <NumberInput
                            label="W"
                            value={selectedElement.width}
                            onChange={(v) => handleUpdate({ width: Math.max(10, v) })}
                            min={10}
                        />
                        <NumberInput
                            label="H"
                            value={selectedElement.height}
                            onChange={(v) => handleUpdate({ height: Math.max(10, v) })}
                            min={10}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <NumberInput
                            label="Rotation"
                            value={selectedElement.rotation}
                            onChange={(v) => handleUpdate({ rotation: v })}
                            min={-360}
                            max={360}
                        />
                        <button
                            onClick={() => handleUpdateAndSave({ rotation: 0 })}
                            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors ml-2"
                            title="Reset Rotation"
                        >
                            <RotateCcw size={14} />
                        </button>
                    </div>
                    <SliderInput
                        label="Opacity"
                        value={selectedElement.opacity * 100}
                        onChange={(v) => handleUpdate({ opacity: v / 100 })}
                        min={0}
                        max={100}
                    />
                </Section>

                {/* Text-specific properties */}
                {selectedElement.type === 'text' && (
                    <>
                        <Section id="text" title="Text Style">
                            <div className="space-y-3">
                                {/* Font Family */}
                                <div>
                                    <label className="text-xs text-slate-400 mb-1 block">Font</label>
                                    <select
                                        value={(selectedElement as TextElement).fontFamily}
                                        onChange={(e) => handleUpdateAndSave({ fontFamily: e.target.value })}
                                        className="w-full px-2 py-1.5 bg-slate-800 border border-slate-600 rounded text-sm text-white focus:outline-none focus:border-accent-green"
                                    >
                                        {['Inter', 'Playfair Display', 'Roboto', 'Open Sans', 'Lato', 'Poppins', 'Montserrat', 'Merriweather', 'Georgia', 'Times New Roman'].map((font) => (
                                            <option key={font} value={font} style={{ fontFamily: font }}>
                                                {font}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Font Size */}
                                <NumberInput
                                    label="Font Size"
                                    value={(selectedElement as TextElement).fontSize}
                                    onChange={(v) => handleUpdate({ fontSize: Math.max(8, v) })}
                                    min={8}
                                    max={200}
                                />

                                {/* Bold & Italic */}
                                <div className="flex items-center gap-2">
                                    <label className="text-xs text-slate-400 flex-1">Style</label>
                                    <button
                                        onClick={() => handleUpdateAndSave({
                                            fontWeight: (selectedElement as TextElement).fontWeight === 'bold' ? 'normal' : 'bold'
                                        })}
                                        className={`p-2 rounded transition-colors ${(selectedElement as TextElement).fontWeight === 'bold' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
                                    >
                                        <Bold size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleUpdateAndSave({
                                            fontStyle: (selectedElement as TextElement).fontStyle === 'italic' ? 'normal' : 'italic'
                                        })}
                                        className={`p-2 rounded transition-colors ${(selectedElement as TextElement).fontStyle === 'italic' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
                                    >
                                        <Italic size={16} />
                                    </button>
                                </div>

                                {/* Alignment */}
                                <div className="flex items-center gap-2">
                                    <label className="text-xs text-slate-400 flex-1">Align</label>
                                    {(['left', 'center', 'right'] as const).map((align) => (
                                        <button
                                            key={align}
                                            onClick={() => handleUpdateAndSave({ align })}
                                            className={`p-2 rounded transition-colors ${(selectedElement as TextElement).align === align ? 'bg-slate-700 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
                                        >
                                            {align === 'left' && <AlignLeft size={16} />}
                                            {align === 'center' && <AlignCenter size={16} />}
                                            {align === 'right' && <AlignRight size={16} />}
                                        </button>
                                    ))}
                                </div>

                                {/* Text Color */}
                                <ColorInput
                                    label="Text Color"
                                    value={(selectedElement as TextElement).fill}
                                    onChange={(v) => handleUpdate({ fill: v })}
                                />

                                {/* Background Color */}
                                <div className="space-y-1">
                                    <div className="flex items-center justify-between">
                                        <label className="text-xs text-slate-400">Background</label>
                                        {(selectedElement as TextElement).backgroundColor && (
                                            <button
                                                onClick={() => handleUpdateAndSave({ backgroundColor: undefined })}
                                                className="text-xs text-red-400 hover:text-red-300"
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="color"
                                            value={(selectedElement as TextElement).backgroundColor || '#ffffff'}
                                            onChange={(e) => handleUpdate({ backgroundColor: e.target.value })}
                                            onBlur={() => saveToHistory()}
                                            className="w-8 h-8 rounded cursor-pointer border-0"
                                        />
                                        <input
                                            type="text"
                                            value={(selectedElement as TextElement).backgroundColor || ''}
                                            onChange={(e) => handleUpdate({ backgroundColor: e.target.value })}
                                            onBlur={() => saveToHistory()}
                                            className="w-20 px-2 py-1 bg-slate-800 border border-slate-600 rounded text-xs text-white focus:outline-none focus:border-accent-green"
                                            placeholder="None"
                                        />
                                    </div>
                                </div>

                                {/* Line Height */}
                                <SliderInput
                                    label="Line Height"
                                    value={(selectedElement as TextElement).lineHeight * 100}
                                    onChange={(v) => handleUpdate({ lineHeight: v / 100 })}
                                    min={80}
                                    max={300}
                                />

                                {/* Letter Spacing */}
                                <NumberInput
                                    label="Letter Spacing"
                                    value={(selectedElement as TextElement).letterSpacing}
                                    onChange={(v) => handleUpdate({ letterSpacing: v })}
                                    min={-10}
                                    max={50}
                                    step={0.5}
                                />
                            </div>
                        </Section>
                    </>
                )}

                {/* Shape-specific properties */}
                {selectedElement.type === 'shape' && (
                    <Section id="shape" title="Shape Style">
                        <div className="space-y-3">
                            {/* Fill Color */}
                            {!(selectedElement as ShapeElement).imageSrc && (
                                <ColorInput
                                    label="Fill"
                                    value={(selectedElement as ShapeElement).fill}
                                    onChange={(v) => handleUpdate({ fill: v })}
                                />
                            )}

                            {/* Image fill indicator */}
                            {(selectedElement as ShapeElement).imageSrc && (
                                <div className="flex items-center justify-between">
                                    <label className="text-xs text-slate-400">Image Fill</label>
                                    <button
                                        onClick={() => handleUpdateAndSave({ imageSrc: undefined })}
                                        className="text-xs text-red-400 hover:text-red-300"
                                    >
                                        Remove
                                    </button>
                                </div>
                            )}

                            {/* Stroke Color */}
                            <ColorInput
                                label="Stroke"
                                value={(selectedElement as ShapeElement).stroke === 'transparent' ? '' : (selectedElement as ShapeElement).stroke}
                                onChange={(v) => {
                                    const shape = selectedElement as ShapeElement;
                                    // If setting a real color and stroke width is 0, auto-set to 2
                                    if (v && v !== 'transparent' && shape.strokeWidth === 0) {
                                        handleUpdate({ stroke: v, strokeWidth: 2 });
                                    } else {
                                        handleUpdate({ stroke: v || 'transparent' });
                                    }
                                }}
                            />

                            {/* Stroke Width */}
                            <SliderInput
                                label="Stroke Width"
                                value={(selectedElement as ShapeElement).strokeWidth}
                                onChange={(v) => handleUpdate({ strokeWidth: v })}
                                min={0}
                                max={20}
                            />

                            {/* Corner Radius (for rectangles) */}
                            {(selectedElement as ShapeElement).shapeType === 'rectangle' && (
                                <SliderInput
                                    label="Corner Radius"
                                    value={(selectedElement as ShapeElement).cornerRadius || 0}
                                    onChange={(v) => handleUpdate({ cornerRadius: v })}
                                    min={0}
                                    max={100}
                                />
                            )}

                            {/* Inner Radius (for stars) */}
                            {(selectedElement as ShapeElement).shapeType === 'star' && (
                                <SliderInput
                                    label="Inner Radius"
                                    value={((selectedElement as ShapeElement).innerRadius || 0.4) * 100}
                                    onChange={(v) => handleUpdate({ innerRadius: v / 100 })}
                                    min={10}
                                    max={90}
                                />
                            )}
                        </div>
                    </Section>
                )}

                {/* Image-specific properties */}
                {selectedElement.type === 'image' && (
                    <Section id="image" title="Image">
                        <div className="space-y-3">
                            {(selectedElement as ImageElement).src ? (
                                <div className="text-xs text-slate-400">
                                    Image loaded. Use Uploads tab to replace.
                                </div>
                            ) : (
                                <div className="text-xs text-slate-400">
                                    No image. Use Uploads tab to add one.
                                </div>
                            )}
                        </div>
                    </Section>
                )}
            </div>
        </div>
    );
}
