'use client';

import React, { useRef, useEffect, useState } from 'react';
import { TextElement } from '@/store/useCanvasStore';
import { useTranslations } from 'next-intl';
import {
    Bold,
    Italic,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Type,
    Sparkles,
    Loader2,
    X,
    Copy,
    Check,
    RefreshCw,
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
    const t = useTranslations('Common');
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [text, setText] = useState(element.text);
    const [showFontMenu, setShowFontMenu] = useState(false);
    const [showSizeMenu, setShowSizeMenu] = useState(false);
    const [showAIPanel, setShowAIPanel] = useState(false);
    const [aiPrompt, setAiPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedText, setGeneratedText] = useState('');
    const [showCopied, setShowCopied] = useState(false);

    // AI prompt suggestions based on context
    const aiSuggestions = [
        'Professional summary for a software engineer',
        'About me section for a designer',
        'Career objective for entry-level',
        'Skills description for project manager',
    ];

    // Generate AI text based on prompt
    const generateAIText = async (prompt: string) => {
        setIsGenerating(true);
        setGeneratedText('');

        try {
            // Simulate AI generation (in production, call an API)
            await new Promise(resolve => setTimeout(resolve, 1200));

            // Generate contextual text based on prompt keywords (1st person voice)
            let generated = '';
            const lowerPrompt = prompt.toLowerCase();

            if (lowerPrompt.includes('summary') || lowerPrompt.includes('about')) {
                if (lowerPrompt.includes('software') || lowerPrompt.includes('developer')) {
                    generated = 'I am an innovative software engineer with 5+ years of experience building scalable web applications. I am passionate about clean code, modern frameworks, and delivering exceptional user experiences.';
                } else if (lowerPrompt.includes('design') || lowerPrompt.includes('ux')) {
                    generated = 'I am a creative UX/UI designer with a keen eye for detail and user-centered approach. I specialize in transforming complex problems into intuitive, accessible designs that delight users.';
                } else if (lowerPrompt.includes('manager') || lowerPrompt.includes('lead')) {
                    generated = 'I am a results-driven project manager with proven expertise in leading cross-functional teams. I excel in agile methodologies, stakeholder communication, and delivering projects on time and budget.';
                } else {
                    generated = 'I am a dynamic professional with diverse skills and a proven track record of excellence. I am committed to continuous learning and driving innovation in every role.';
                }
            } else if (lowerPrompt.includes('objective') || lowerPrompt.includes('goal')) {
                generated = 'I am seeking a challenging position where I can leverage my skills and experience to contribute to organizational success while continuing to grow professionally.';
            } else if (lowerPrompt.includes('skill')) {
                generated = 'I am an expert in problem-solving, collaboration, and delivering high-quality solutions. I am proficient in modern tools and technologies with strong attention to detail.';
            } else {
                // Generic generation based on input
                generated = `I am ${prompt.charAt(0).toLowerCase() + prompt.slice(1)}. I am dedicated to excellence and continuous improvement in all professional endeavors.`;
            }

            // Store in preview instead of immediately replacing
            setGeneratedText(generated);
            setAiPrompt('');
        } catch (error) {
            console.error('Error generating AI text:', error);
            // Provide fallback text on error
            setGeneratedText('I am a motivated professional with diverse skills. I am committed to excellence and eager to contribute to innovative projects.');
        } finally {
            setIsGenerating(false);
        }
    };

    // Copy generated text to clipboard
    const copyGeneratedText = async () => {
        if (generatedText) {
            await navigator.clipboard.writeText(generatedText);
            setShowCopied(true);
            setTimeout(() => setShowCopied(false), 2000);
        }
    };

    // Replace textarea text with generated text
    const replaceWithGenerated = () => {
        if (generatedText) {
            setText(generatedText);
            onUpdate({ text: generatedText }); // Save to canvas immediately
            setGeneratedText('');
            setShowAIPanel(false);
        }
    };

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
            <div className="flex items-center gap-1 mb-2 p-2 bg-white rounded-lg shadow-xl border border-gray-300">
                {/* Font family dropdown */}
                <div className="relative">
                    <button
                        onClick={() => {
                            setShowFontMenu(!showFontMenu);
                            setShowSizeMenu(false);
                        }}
                        className="flex items-center gap-1 px-2 py-1.5 text-sm text-gray-600 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors min-w-[100px]"
                    >
                        <Type size={14} />
                        <span className="truncate">{element.fontFamily}</span>
                    </button>
                    {showFontMenu && (
                        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-xl max-h-48 overflow-y-auto z-50 min-w-[150px]">
                            {fontFamilies.map((font) => (
                                <button
                                    key={font}
                                    onClick={() => setFontFamily(font)}
                                    className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-200 transition-colors ${
                                        element.fontFamily === font ? 'text-accent-green' : 'text-gray-600'
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
                        className="flex items-center gap-1 px-2 py-1.5 text-sm text-gray-600 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors w-14"
                    >
                        {element.fontSize}
                    </button>
                    {showSizeMenu && (
                        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-xl max-h-48 overflow-y-auto z-50">
                            {fontSizes.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setFontSize(size)}
                                    className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-200 transition-colors ${
                                        element.fontSize === size ? 'text-accent-green' : 'text-gray-600'
                                    }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="w-px h-6 bg-gray-200 mx-1" />

                {/* Bold */}
                <button
                    onClick={toggleBold}
                    className={`p-1.5 rounded transition-colors ${
                        element.fontWeight === 'bold'
                            ? 'bg-gray-200 text-gray-900'
                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    }`}
                >
                    <Bold size={16} />
                </button>

                {/* Italic */}
                <button
                    onClick={toggleItalic}
                    className={`p-1.5 rounded transition-colors ${
                        element.fontStyle === 'italic'
                            ? 'bg-gray-200 text-gray-900'
                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    }`}
                >
                    <Italic size={16} />
                </button>

                <div className="w-px h-6 bg-gray-200 mx-1" />

                {/* Alignment */}
                <button
                    onClick={() => setAlign('left')}
                    className={`p-1.5 rounded transition-colors ${
                        element.align === 'left'
                            ? 'bg-gray-200 text-gray-900'
                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    }`}
                >
                    <AlignLeft size={16} />
                </button>
                <button
                    onClick={() => setAlign('center')}
                    className={`p-1.5 rounded transition-colors ${
                        element.align === 'center'
                            ? 'bg-gray-200 text-gray-900'
                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    }`}
                >
                    <AlignCenter size={16} />
                </button>
                <button
                    onClick={() => setAlign('right')}
                    className={`p-1.5 rounded transition-colors ${
                        element.align === 'right'
                            ? 'bg-gray-200 text-gray-900'
                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    }`}
                >
                    <AlignRight size={16} />
                </button>

                <div className="w-px h-6 bg-gray-200 mx-1" />

                {/* Color picker */}
                <input
                    type="color"
                    value={element.fill}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-7 h-7 rounded cursor-pointer border-0"
                    title="Text color"
                />

                <div className="w-px h-6 bg-gray-200 mx-1" />

                {/* AI Button */}
                <div className="relative">
                    <button
                        onClick={() => {
                            setShowAIPanel(!showAIPanel);
                            setShowFontMenu(false);
                            setShowSizeMenu(false);
                        }}
                        className={`p-1.5 rounded transition-colors ${
                            showAIPanel
                                ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                        }`}
                        title="AI Generate Text"
                    >
                        <Sparkles size={16} />
                    </button>

                    {/* AI Panel Dropdown */}
                    {showAIPanel && (
                        <div className="absolute top-full right-0 mt-2 w-72 bg-white border border-gray-300 rounded-xl shadow-2xl z-50 overflow-hidden">
                            {/* Header */}
                            <div className="flex items-center justify-between px-3 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-b border-gray-300">
                                <div className="flex items-center gap-2">
                                    <Sparkles size={14} className="text-purple-400" />
                                    <span className="text-sm font-medium text-gray-900">AI Generate</span>
                                </div>
                                <button
                                    onClick={() => setShowAIPanel(false)}
                                    className="p-1 text-gray-500 hover:text-gray-700 rounded"
                                >
                                    <X size={14} />
                                </button>
                            </div>

                            <div className="p-3 space-y-3">
                                {/* Show generated text preview if available */}
                                {generatedText ? (
                                    <>
                                        {/* Generated text preview */}
                                        <div className="p-3 bg-gray-50/50 rounded-lg border border-gray-300 max-h-32 overflow-y-auto">
                                            <p className="text-gray-700 text-sm leading-relaxed">{generatedText}</p>
                                        </div>

                                        {/* Copy and Replace buttons */}
                                        <div className="grid grid-cols-2 gap-2">
                                            <button
                                                onClick={copyGeneratedText}
                                                className="flex items-center justify-center gap-1.5 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
                                            >
                                                {showCopied ? (
                                                    <>
                                                        <Check size={14} className="text-green-400" />
                                                        Copied!
                                                    </>
                                                ) : (
                                                    <>
                                                        <Copy size={14} />
                                                        Copy
                                                    </>
                                                )}
                                            </button>
                                            <button
                                                onClick={replaceWithGenerated}
                                                className="flex items-center justify-center gap-1.5 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm font-medium rounded-lg hover:from-purple-600 hover:to-blue-600 transition-colors"
                                            >
                                                <RefreshCw size={14} />
                                                Replace
                                            </button>
                                        </div>

                                        {/* Regenerate option */}
                                        <button
                                            onClick={() => setGeneratedText('')}
                                            className="w-full py-1.5 text-gray-500 hover:text-gray-700 text-xs font-medium flex items-center justify-center gap-1 transition-colors"
                                        >
                                            <Sparkles size={12} />
                                            Generate Another
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        {/* Input */}
                                        <div>
                                            <input
                                                type="text"
                                                value={aiPrompt}
                                                onChange={(e) => setAiPrompt(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' && aiPrompt.trim()) {
                                                        generateAIText(aiPrompt);
                                                    }
                                                }}
                                                placeholder={t('describeTemplate')}
                                                className="w-full px-3 py-2 bg-gray-200 text-gray-900 text-sm rounded-lg border border-gray-300 focus:border-purple-500 focus:outline-none placeholder-gray-400"
                                                autoFocus
                                            />
                                        </div>

                                        {/* Quick suggestions */}
                                        <div className="space-y-1">
                                            <p className="text-xs text-gray-500">Quick suggestions:</p>
                                            <div className="flex flex-wrap gap-1">
                                                {aiSuggestions.map((suggestion, i) => (
                                                    <button
                                                        key={i}
                                                        onClick={() => generateAIText(suggestion)}
                                                        className="px-2 py-1 text-xs bg-gray-200 text-gray-600 rounded hover:bg-gray-300 hover:text-gray-900 transition-colors truncate max-w-full"
                                                    >
                                                        {suggestion}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Generate button */}
                                        <button
                                            onClick={() => aiPrompt.trim() && generateAIText(aiPrompt)}
                                            disabled={!aiPrompt.trim() || isGenerating}
                                            className="w-full py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm font-medium rounded-lg hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                                        >
                                            {isGenerating ? (
                                                <>
                                                    <Loader2 size={14} className="animate-spin" />
                                                    Generating...
                                                </>
                                            ) : (
                                                <>
                                                    <Sparkles size={14} />
                                                    Generate Text
                                                </>
                                            )}
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Text input */}
            <textarea
                ref={textareaRef}
                value={text}
                onChange={handleTextChange}
                className="min-w-[200px] max-w-[400px] p-3 bg-white text-gray-900 border border-gray-300 rounded-lg shadow-xl resize-both focus:outline-none focus:border-accent-green"
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

            <p className="text-xs text-gray-400 mt-2">
                Press Escape or click outside to close
            </p>
        </div>
    );
}
