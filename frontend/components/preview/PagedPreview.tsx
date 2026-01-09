'use client';

import React, { useRef, useState, useLayoutEffect, useEffect, useCallback, forwardRef } from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { colorPresets, generateTheme, getLayoutType as getBuilderLayoutType } from '@/lib/templates/builder';
import UnifiedTemplate, { LayoutType } from '../templates/UnifiedTemplate';

// A4 dimensions
const A4_HEIGHT_PX = 1123; // Standard A4 height in pixels at 96 DPI
const A4_WIDTH_PX = 794;   // Standard A4 width in pixels at 96 DPI
const PAGE_GAP_PX = 40;    // Gap between pages (Collapsed in Print via CSS)
const SIDEBAR_WIDTH_PX = 238; // Sidebar width for sidebar templates (~30% of A4)

interface PagedPreviewProps {
    scale?: number;
}

/**
 * PagedPreview - Smart WYSIWYG Pagination
 *
 * Renders the resume as a continuous document but actively measures content
 * to inject "spacers" (margins) ensuring no element is cut in half by a page break.
 */
const PagedPreview = forwardRef<HTMLDivElement, PagedPreviewProps>(
    function PagedPreview({ scale = 1 }, ref) {
        const { resumeData, selectedTemplate, selectedTheme, selectedTemplateId } = useResumeStore();
        const containerRef = useRef<HTMLDivElement>(null);
        const [totalPages, setTotalPages] = useState(1);

        // Get theme color
        const getThemeColor = (): string => {
            if (selectedTheme && selectedTheme !== 'custom') {
                const preset = colorPresets.find(c => c.id === selectedTheme);
                if (preset) return preset.primary;
            }
            return resumeData.customThemeColor || '#1e3a8a';
        };

        const theme = generateTheme(getThemeColor());

        // Determine layout type
        const getLayoutType = (): LayoutType => {
            if (resumeData.layoutConfig?.baseLayout) {
                const base = resumeData.layoutConfig.baseLayout;
                if (base === 'creative') return 'header';
                if (['classic', 'sidebar', 'header', 'minimal'].includes(base)) {
                    return base as LayoutType;
                }
            }
            return getBuilderLayoutType(selectedTemplate);
        };

        const layoutType = getLayoutType();

        // Check if this is a sidebar layout (for persistent sidebar background)
        const isSidebarLayout = layoutType === 'sidebar';

        // Pagination calculation function (reusable for ResizeObserver)
        const runPagination = useCallback(async () => {
            if (!containerRef.current) return;

            // Wait for fonts to load before measuring
            if (typeof document !== 'undefined' && document.fonts) {
                await document.fonts.ready;
            }

            const container = containerRef.current;

            // --- VISUAL FIX ---
            // Remove box-shadow and min-height to allow content to flow naturally
            // Make background transparent so the white backdrop pages show through
            const templateRoot = container.firstElementChild as HTMLElement;
            if (templateRoot) {
                templateRoot.style.boxShadow = 'none';
                templateRoot.style.minHeight = '0';
                templateRoot.style.backgroundColor = 'transparent';
                templateRoot.style.background = 'transparent';
            }

            // UNIVERSAL SELECTOR: Find ALL elements that shouldn't be split
            // This works for any template - current and future
            const elements = Array.from(container.querySelectorAll(
                '[data-paginate], .section-header, .resume-entry, h2, h3'
            ));

            // Reset styles first
            elements.forEach((el) => {
                const element = el as HTMLElement;
                element.style.marginTop = '';
                element.style.paddingTop = '';
                element.style.removeProperty('--print-margin');
                element.classList.remove('pushed-section');
            });

            // "Forced Reflow" Optimization: Separate Read and Write phases
            const fullPageHeight = A4_HEIGHT_PX + PAGE_GAP_PX;

            // Phase 1: READ (Measure everything)
            const updates: { element: HTMLElement; margin: string }[] = [];

            for (const el of elements) {
                const element = el as HTMLElement;
                const rect = element.getBoundingClientRect();
                const containerRect = container.getBoundingClientRect();

                // Get absolute position relative to container
                const relativeTop = rect.top - containerRect.top;
                const height = rect.height;
                const bottom = relativeTop + height;

                // OVERSIZED ELEMENT PROTECTION: If element > 90% of page height, let it span naturally
                if (height > A4_HEIGHT_PX * 0.9) {
                    continue; // Don't push - let it span pages naturally
                }

                // Calculate which page this falls on
                const currentPageIndex = Math.floor(relativeTop / fullPageHeight);
                const pageTopBoundary = currentPageIndex * fullPageHeight;
                const pageContentBottom = pageTopBoundary + A4_HEIGHT_PX;

                // Check if element extends past the printable bottom
                let shouldPush = bottom > pageContentBottom;

                // ORPHAN PROTECTION: Push headers/sections if < 60px from bottom
                if (!shouldPush) {
                    const isBreakableElement =
                        element.classList.contains('section-header') ||
                        element.hasAttribute('data-paginate') ||
                        element.tagName === 'H2' ||
                        element.tagName === 'H3';

                    if (isBreakableElement) {
                        const spaceRemaining = pageContentBottom - bottom;
                        if (spaceRemaining < 60) {
                            shouldPush = true;
                        }
                    }
                }

                if (shouldPush) {
                    const nextPageStart = (currentPageIndex + 1) * fullPageHeight;
                    const pushDistance = nextPageStart - relativeTop;

                    updates.push({
                        element,
                        margin: `${pushDistance}px`
                    });
                }
            }

            // Phase 2: WRITE (Apply styles) - Avoids layout thrashing
            updates.forEach(({ element, margin }) => {
                element.style.setProperty('--print-margin', margin);
                element.classList.add('pushed-section');
            });

            // Update Total Pages
            const totalHeight = container.scrollHeight;
            const pages = Math.ceil(totalHeight / (A4_HEIGHT_PX + PAGE_GAP_PX));
            setTotalPages(Math.max(pages, 1));

        }, []);

        // Smart Pagination Logic - runs on data changes
        useLayoutEffect(() => {
            runPagination();
        }, [resumeData, selectedTemplate, selectedTheme, layoutType, runPagination]);

        // ResizeObserver for dynamic content updates
        useEffect(() => {
            if (!containerRef.current) return;

            const resizeObserver = new ResizeObserver(() => {
                // Debounce using requestAnimationFrame
                requestAnimationFrame(() => {
                    runPagination();
                });
            });

            resizeObserver.observe(containerRef.current);
            return () => resizeObserver.disconnect();
        }, [runPagination]);

        // Background Pages
        const backgroundPages = Array.from({ length: totalPages }, (_, i) => i);

        return (
            <div
                className="relative bg-slate-400 rounded-sm"
                style={{
                    width: `${A4_WIDTH_PX}px`,
                    height: `${totalPages * (A4_HEIGHT_PX + PAGE_GAP_PX) - PAGE_GAP_PX}px`, // No gap after last page
                    transform: `scale(${scale})`,
                    transformOrigin: 'top center',
                    margin: '0 auto',
                }}
            >
                {/* Print Styles */}
                <style jsx global>{`
                    /* Preview Mode: Add Gap to Pushed Sections */
                    .pushed-section {
                        /* Logic: Move to next page (margin) + 40px (Visual Gap aka Padding) */
                        margin-top: calc(var(--print-margin) + 40px) !important;
                        position: relative;
                    }

                    /* Force content background to be transparent so backdrop shows through */
                    .resume-print-content > div {
                        background: transparent !important;
                        background-color: transparent !important;
                    }

                    @media print {
                        @page {
                            margin: 0;
                            size: auto;
                        }
                        body {
                            margin: 0;
                            -webkit-print-color-adjust: exact;
                        }
                        .print-hidden {
                            display: none !important;
                        }
                        .resume-print-content {
                            transform: none !important;
                            width: 100% !important;
                            height: auto !important;
                            margin: 0 !important;
                            box-shadow: none !important;
                        }
                        /* Restore background for print */
                        .resume-print-content > div {
                            background: white !important;
                            background-color: white !important;
                        }
                        /* Ensure background colors and patterns print */
                        .resume-print-content * {
                            -webkit-print-color-adjust: exact;
                            print-color-adjust: exact;
                        }

                        /* Print Mode: Remove Visual Gap, Keep Logical Margin + Breathing Room */
                        .pushed-section {
                            margin-top: calc(var(--print-margin) + 40px) !important;
                        }

                        /* Hide gap overlays in print */
                        .page-gap-overlay {
                            display: none !important;
                        }
                    }
                `}</style>

                {/* Visual Backdrop (White Pages with shadows + persistent sidebar background) */}
                <div className="absolute inset-0 pointer-events-none print-hidden">
                    {backgroundPages.map((pageIndex) => (
                        <div
                            key={pageIndex}
                            className="bg-white shadow-xl mx-auto overflow-hidden"
                            style={{
                                width: `${A4_WIDTH_PX}px`,
                                height: `${A4_HEIGHT_PX}px`,
                                position: 'absolute',
                                top: `${pageIndex * (A4_HEIGHT_PX + PAGE_GAP_PX)}px`,
                                left: 0,
                                zIndex: 0,
                            }}
                        >
                            {/* Persistent Sidebar Background - appears on ALL pages for sidebar layouts */}
                            {isSidebarLayout && (
                                <div
                                    className="absolute left-0 top-0 bottom-0"
                                    style={{
                                        width: `${SIDEBAR_WIDTH_PX}px`,
                                        backgroundColor: theme.primary,
                                    }}
                                />
                            )}
                            {/* Subtle Page Number */}
                            <div className="absolute bottom-2 right-3 text-[9px] text-gray-300 font-mono select-none">
                                {pageIndex + 1} / {totalPages}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Content Container */}
                <div ref={ref}>
                    <div
                        ref={containerRef}
                        className="resume-print-content relative"
                        style={{
                            width: `${A4_WIDTH_PX}px`,
                            zIndex: 10,
                        }}
                    >
                        <UnifiedTemplate
                            data={resumeData}
                            theme={theme}
                            templateId={selectedTemplateId || undefined}
                            layout={layoutType}
                        />
                    </div>
                </div>

                {/* Gap overlay - rendered AFTER content with maximum z-index to ensure it ALWAYS covers */}
                <div
                    className="absolute inset-0 pointer-events-none print-hidden page-gap-overlay"
                    style={{
                        zIndex: 2147483647, // Maximum z-index - gap will NEVER be hidden
                        isolation: 'isolate' // Create new stacking context
                    }}
                >
                    {backgroundPages.slice(0, -1).map((pageIndex) => (
                        <div
                            key={`gap-${pageIndex}`}
                            className="absolute w-full"
                            style={{
                                top: `${(pageIndex + 1) * A4_HEIGHT_PX + pageIndex * PAGE_GAP_PX}px`,
                                height: `${PAGE_GAP_PX}px`,
                                left: 0,
                                background: '#1e293b',
                                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.3), 0 -4px 6px -1px rgba(0,0,0,0.3)',
                            }}
                        />
                    ))}
                </div>

            </div>
        );
    }
);

export default PagedPreview;
