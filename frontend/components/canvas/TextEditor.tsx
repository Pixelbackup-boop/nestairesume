'use client';

import React, { useRef, useEffect, useState } from 'react';
import { TextElement } from '@/store/useCanvasStore';
import {
    Bold,
    Italic,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Type,
} from 'lucide-react';

interface TextEditorProps {
    element: TextElement;
    position: { x: number; y: number };
    zoom: number;
    onUpdate: (updates: Partial<TextElement>) => void;
    onClose: () => void;
}

const fontFamilies = [
    'Inter',
    'Playfair Display',
    'Roboto',
    'Open Sans',
    'Lato',
    'Poppins',
    'Montserrat',
    'Merriweather',
    'Georgia',
    'Times New Roman',
];

const fontSizes = [10, 11, 12, 14, 16, 18, 20, 24, 28, 32, 36, 42, 48, 56, 64, 72, 80];

export default function TextEditor({ element, position, zoom, onUpdate, onClose }: TextEditorProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [text, setText] = useState(element.text);
    const [showFontMenu, setShowFontMenu] = useState(false);
    const [showSizeMenu, setShowSizeMenu] = useState(false);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.focus();
            textareaRef.current.select();
        }
    }, []);

    // Handle click outside to close
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest('.text-editor-container')) {
                onUpdate({ text });
                onClose();
            }
        };

        // Delay adding listener to prevent immediate close
        const timer = setTimeout(() => {
            document.addEventListener('mousedown', handleClickOutside);
        }, 100);

        return () => {
            clearTimeout(timer);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [text, onUpdate, onClose]);

    // Handle escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onUpdate({ text });
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [text, onUpdate, onClose]);

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };

    const toggleBold = () => {
        onUpdate({ fontWeight: element.fontWeight === 'bold' ? 'normal' : 'bold' });
    };

    const toggleItalic = () => {
        onUpdate({ fontStyle: element.fontStyle === 'italic' ? 'normal' : 'italic' });
    };

    const setAlign = (align: TextElement['align']) => {
        onUpdate({ align });
    };

    const setFontFamily = (fontFamily: string) => {
        onUpdate({ fontFamily });
        setShowFontMenu(false);
    };

    const setFontSize = (fontSize: number) => {
        onUpdate({ fontSize });
        setShowSizeMenu(false);
    };

    const setColor = (color: string) => {
        onUpdate({ fill: color });
    };

    return (
        <div
            className="text-editor-container fixed z-50"
            style={{
                left: position.x,
                top: position.y,
            }}
        >
            {/* Formatting toolbar */}
            <div className="flex items-center gap-1 mb-2 p-2 bg-slate-800 rounded-lg shadow-xl border border-slate-600">
                {/* Font family dropdown */}
                <div className="relative">
                    <button
                        onClick={() => {
                            setShowFontMenu(!showFontMenu);
                            setShowSizeMenu(false);
                        }}
                        className="flex items-center gap-1 px-2 py-1.5 text-sm text-slate-300 hover:text-white hover:bg-slate-700 rounded transition-colors min-w-[100px]"
                    >
                        <Type size={14} />
                        <span className="truncate">{element.fontFamily}</span>
                    </button>
                    {showFontMenu && (
                        <div className="absolute top-full left-0 mt-1 bg-slate-800 border border-slate-600 rounded-lg shadow-xl max-h-48 overflow-y-auto z-50 min-w-[150px]">
                            {fontFamilies.map((font) => (
                                <button
                                    key={font}
                                    onClick={() => setFontFamily(font)}
                                    className={`w-full px-3 py-2 text-left text-sm hover:bg-slate-700 transition-colors ${
                                        element.fontFamily === font ? 'text-accent-green' : 'text-slate-300'
                                    }`}
                                    style={{ fontFamily: font }}
                                >
                                    {font}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Font size dropdown */}
                <div className="relative">
                    <button
                        onClick={() => {
                            setShowSizeMenu(!showSizeMenu);
                            setShowFontMenu(false);
                        }}
                        className="flex items-center gap-1 px-2 py-1.5 text-sm text-slate-300 hover:text-white hover:bg-slate-700 rounded transition-colors w-14"
                    >
                        {element.fontSize}
                    </button>
                    {showSizeMenu && (
                        <div className="absolute top-full left-0 mt-1 bg-slate-800 border border-slate-600 rounded-lg shadow-xl max-h-48 overflow-y-auto z-50">
                            {fontSizes.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setFontSize(size)}
                                    className={`w-full px-4 py-2 text-left text-sm hover:bg-slate-700 transition-colors ${
                                        element.fontSize === size ? 'text-accent-green' : 'text-slate-300'
                                    }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="w-px h-6 bg-slate-600 mx-1" />

                {/* Bold */}
                <button
                    onClick={toggleBold}
                    className={`p-1.5 rounded transition-colors ${
                        element.fontWeight === 'bold'
                            ? 'bg-slate-600 text-white'
                            : 'text-slate-400 hover:text-white hover:bg-slate-700'
                    }`}
                >
                    <Bold size={16} />
                </button>

                {/* Italic */}
                <button
                    onClick={toggleItalic}
                    className={`p-1.5 rounded transition-colors ${
                        element.fontStyle === 'italic'
                            ? 'bg-slate-600 text-white'
                            : 'text-slate-400 hover:text-white hover:bg-slate-700'
                    }`}
                >
                    <Italic size={16} />
                </button>

                <div className="w-px h-6 bg-slate-600 mx-1" />

                {/* Alignment */}
                <button
                    onClick={() => setAlign('left')}
                    className={`p-1.5 rounded transition-colors ${
                        element.align === 'left'
                            ? 'bg-slate-600 text-white'
                            : 'text-slate-400 hover:text-white hover:bg-slate-700'
                    }`}
                >
                    <AlignLeft size={16} />
                </button>
                <button
                    onClick={() => setAlign('center')}
                    className={`p-1.5 rounded transition-colors ${
                        element.align === 'center'
                            ? 'bg-slate-600 text-white'
                            : 'text-slate-400 hover:text-white hover:bg-slate-700'
                    }`}
                >
                    <AlignCenter size={16} />
                </button>
                <button
                    onClick={() => setAlign('right')}
                    className={`p-1.5 rounded transition-colors ${
                        element.align === 'right'
                            ? 'bg-slate-600 text-white'
                            : 'text-slate-400 hover:text-white hover:bg-slate-700'
                    }`}
                >
                    <AlignRight size={16} />
                </button>

                <div className="w-px h-6 bg-slate-600 mx-1" />

                {/* Color picker */}
                <input
                    type="color"
                    value={element.fill}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-7 h-7 rounded cursor-pointer border-0"
                    title="Text color"
                />
            </div>

            {/* Text input */}
            <textarea
                ref={textareaRef}
                value={text}
                onChange={handleTextChange}
                className="min-w-[200px] max-w-[400px] p-3 bg-slate-800 text-white border border-slate-600 rounded-lg shadow-xl resize-both focus:outline-none focus:border-accent-green"
                style={{
                    fontSize: Math.min(element.fontSize * zoom, 24),
                    fontFamily: element.fontFamily,
                    fontWeight: element.fontWeight,
                    fontStyle: element.fontStyle,
                    lineHeight: element.lineHeight,
                    minHeight: '60px',
                }}
                placeholder="Enter text..."
            />

            <p className="text-xs text-slate-500 mt-2">
                Press Escape or click outside to close
            </p>
        </div>
    );
}
