'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { X, Sparkles, Copy, RefreshCw, Loader2, Check, Lightbulb } from 'lucide-react';
import { useCanvasStore, TextElement } from '@/store/useCanvasStore';
import { useDialogA11y } from '@/hooks/useDialogA11y';

interface AIPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AIPopup({ isOpen, onClose }: AIPopupProps) {
    const t = useTranslations('Common');
    const [generatedSummary, setGeneratedSummary] = useState<string>('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [showCopied, setShowCopied] = useState(false);
    const [showReplaced, setShowReplaced] = useState(false);

    const { elements, updateElement } = useCanvasStore();

    // Reset state when popup opens
    React.useEffect(() => {
        if (isOpen) {
            setGeneratedSummary('');
            setIsGenerating(false);
            setShowCopied(false);
            setShowReplaced(false);
        }
    }, [isOpen]);

    // Find the actual summary content element (not the heading)
    const findSummaryElement = (): TextElement | null => {
        const textElements = elements.filter((el): el is TextElement => el.type === 'text');

        // Summary section headings to look for
        const sectionHeadings = ['about me', 'summary', 'profile', 'professional summary', 'objective', 'about'];

        // First, find the heading element
        let headingElement: TextElement | null = null;
        for (const el of textElements) {
            const lowerText = el.text.toLowerCase().trim();
            // Check if text IS a heading (short text that matches keyword)
            if (lowerText.length < 30 && sectionHeadings.some(keyword => lowerText.includes(keyword))) {
                headingElement = el;
                break;
            }
        }

        // If we found a heading, look for the content paragraph near it (below it by Y position)
        if (headingElement) {
            const nearbyContent = textElements.filter(el => {
                if (el.id === headingElement!.id) return false;
                // Must be longer text (actual content, not another heading)
                if (el.text.length < 50) return false;
                // Must be below or near the heading (within reasonable distance)
                const yDiff = el.y - headingElement!.y;
                return yDiff > 0 && yDiff < 150; // Below heading, within 150px
            });

            if (nearbyContent.length > 0) {
                // Return the closest one below the heading
                nearbyContent.sort((a, b) => a.y - b.y);
                return nearbyContent[0];
            }
        }

        // Fallback: Look for longer text elements that might be summaries (50+ chars)
        const longerTexts = textElements.filter(el => {
            const lowerText = el.text.toLowerCase();
            // Must be substantial text, not a heading
            return el.text.length > 50 &&
                   !sectionHeadings.some(kw => lowerText.trim() === kw);
        });

        if (longerTexts.length > 0) {
            return longerTexts[0];
        }

        return null;
    };

    // Extract context from canvas for AI generation
    const extractCanvasContext = () => {
        try {
            const textElements = elements.filter((el): el is TextElement => el.type === 'text' && Boolean(el.text));

            if (textElements.length === 0) {
                return { name: '', jobTitle: '', skills: [], experience: [] };
            }

            // Common job title keywords to identify actual job titles
            const jobTitleKeywords = [
                'engineer', 'developer', 'designer', 'manager', 'director',
                'analyst', 'consultant', 'specialist', 'architect', 'lead',
                'coordinator', 'administrator', 'executive', 'officer', 'associate',
                'intern', 'assistant', 'senior', 'junior', 'full stack', 'frontend',
                'backend', 'software', 'product', 'project', 'data', 'marketing',
                'sales', 'hr', 'human resources', 'accountant', 'teacher', 'nurse'
            ];

            // Sort by font size to identify hierarchy
            const sortedBySize = [...textElements].sort((a, b) => (b.fontSize || 16) - (a.fontSize || 16));

            // The largest text is likely the name
            const name = sortedBySize[0]?.text || '';

            // Find job title by looking for text with job title keywords
            let jobTitle = '';
            for (const el of textElements) {
                const lowerText = el.text.toLowerCase();
                // Skip if it's the name (largest text)
                if (el.id === sortedBySize[0]?.id) continue;
                // Skip very long text (likely paragraphs)
                if (el.text.length > 50) continue;
                // Check if it contains job title keywords
                if (jobTitleKeywords.some(keyword => lowerText.includes(keyword))) {
                    jobTitle = el.text;
                    break;
                }
            }

            // Collect skills (smaller text, often in lists)
            const skills: string[] = [];
            const experience: string[] = [];

            textElements.forEach(el => {
                const text = (el.text || '').toLowerCase();
                if (text.includes('•') || text.includes('-')) {
                    skills.push(el.text);
                }
                if (text.includes('experience') || text.includes('worked') || text.includes('developed')) {
                    experience.push(el.text);
                }
            });

            return { name, jobTitle, skills, experience };
        } catch {
            return { name: '', jobTitle: '', skills: [], experience: [] };
        }
    };

    // Generate AI Summary (1st person voice)
    const generateAISummary = async () => {
        setIsGenerating(true);
        setGeneratedSummary('');

        try {
            const context = extractCanvasContext();

            // Simulate AI generation (in production, this would call an API)
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Generate a professional summary in 1st person voice
            let summary = '';
            if (context.jobTitle) {
                // Use 1st person with job title context
                summary = `I am a dedicated ${context.jobTitle} with a passion for delivering high-quality solutions. `;
            } else {
                summary = 'I am a motivated professional with a strong drive to achieve excellence. ';
            }

            if (context.skills.length > 0) {
                summary += 'I excel at problem-solving and collaboration, leveraging my expertise across diverse projects. ';
            } else {
                summary += 'I bring strong analytical skills and a collaborative mindset to every challenge. ';
            }

            summary += 'I am committed to continuous learning and eager to contribute to innovative projects.';

            setGeneratedSummary(summary);
        } catch (error) {
            console.error('Error generating summary:', error);
            setGeneratedSummary('I am a motivated professional with diverse skills and a passion for excellence. I am committed to continuous learning and eager to contribute to innovative projects.');
        } finally {
            setIsGenerating(false);
        }
    };

    // Copy to clipboard
    const copyToClipboard = async () => {
        if (generatedSummary) {
            await navigator.clipboard.writeText(generatedSummary);
            setShowCopied(true);
            setTimeout(() => setShowCopied(false), 2000);
        }
    };

    // Replace existing summary in canvas
    const replaceExistingSummary = () => {
        const summaryElement = findSummaryElement();
        if (summaryElement && generatedSummary) {
            updateElement(summaryElement.id, { text: generatedSummary });
            setShowReplaced(true);
            setTimeout(() => {
                setShowReplaced(false);
                onClose();
            }, 1500);
        }
    };

    const { dialogProps } = useDialogA11y({ isOpen, onClose, labelId: 'ai-popup-title' });

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 z-40"
                onClick={onClose}
            />

            {/* Popup Modal */}
            <div {...dialogProps} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 bg-gradient-to-r from-purple-500/10 to-blue-500/10">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg">
                            <Sparkles size={20} className="text-white" />
                        </div>
                        <div>
                            <h2 id="ai-popup-title" className="font-semibold text-white">AI Summary Generator</h2>
                            <p className="text-xs text-gray-500">Generate a professional summary using AI</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        aria-label={t('close')}
                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-5 space-y-4">
                    {/* Generate Button */}
                    {!generatedSummary && !isGenerating && (
                        <button
                            onClick={generateAISummary}
                            className="w-full py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-medium hover:from-purple-600 hover:to-blue-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20"
                        >
                            <Sparkles size={20} />
                            Generate Summary
                        </button>
                    )}

                    {/* Loading State */}
                    {isGenerating && (
                        <div className="text-center py-8">
                            <Loader2 size={32} className="animate-spin text-purple-400 mx-auto mb-3" />
                            <p className="text-gray-600">Analyzing your resume...</p>
                            <p className="text-sm text-gray-400 mt-1">Generating professional summary</p>
                        </div>
                    )}

                    {/* Generated Summary */}
                    {generatedSummary && !isGenerating && (
                        <div className="space-y-4">
                            <div className="p-4 bg-gray-50/50 rounded-xl border border-gray-200">
                                <p className="text-gray-700 leading-relaxed">{generatedSummary}</p>
                            </div>

                            {showReplaced ? (
                                <div className="flex items-center justify-center gap-2 py-3 bg-green-500/20 text-green-400 rounded-xl border border-green-500/30">
                                    <Check size={20} />
                                    <span className="font-medium">Summary replaced successfully!</span>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        onClick={copyToClipboard}
                                        className="flex items-center justify-center gap-2 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium"
                                    >
                                        {showCopied ? (
                                            <>
                                                <Check size={18} className="text-green-400" />
                                                Copied!
                                            </>
                                        ) : (
                                            <>
                                                <Copy size={18} />
                                                Copy
                                            </>
                                        )}
                                    </button>
                                    <button
                                        onClick={replaceExistingSummary}
                                        className="flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:from-purple-600 hover:to-blue-600 transition-colors font-medium"
                                    >
                                        <RefreshCw size={18} />
                                        Replace in Canvas
                                    </button>
                                </div>
                            )}

                            {/* Regenerate option */}
                            <button
                                onClick={generateAISummary}
                                className="w-full py-2.5 text-gray-500 hover:text-gray-700 text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                            >
                                <RefreshCw size={16} />
                                Generate Another
                            </button>
                        </div>
                    )}

                    {/* Tips */}
                    {!generatedSummary && !isGenerating && (
                        <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                            <div className="flex items-start gap-3">
                                <Lightbulb size={18} className="text-blue-400 mt-0.5 flex-shrink-0" />
                                <div className="text-sm text-gray-600">
                                    <p className="font-medium text-blue-300 mb-1">Tip</p>
                                    <p>The AI will analyze your resume content to generate a personalized professional summary that highlights your key skills and experience.</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
