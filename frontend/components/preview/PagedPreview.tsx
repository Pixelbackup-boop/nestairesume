'use client';

import React, { useRef, useState, useLayoutEffect, useEffect, useCallback, forwardRef } from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { colorPresets, generateTheme, getLayoutType as getBuilderLayoutType } from '@/lib/templates/builder';
import UnifiedTemplate, { LayoutType } from '../templates/UnifiedTemplate';

// A4 dimensions
const A4_HEIGHT_PX = 1123; // Standard A4 height in pixels at 96 DPI
const A4_WIDTH_PX = 794;   // Standard A4 width in pixels at 96 DPI
const PAGE_GAP_PX = 40;    // Gap between pages (Collapsed in Print via CSS)
const PAGE_MARGIN_BOTTOM = 30; // Bottom margin to prevent content from touching page edge
// Sidebar dimensions per template
const getSidebarConfig = (templateId: string | null): { width: number; bgColor: string } => {
    if (!templateId) return { width: 278, bgColor: '#1e293b' }; // Default: 35% width, dark navy

    if (templateId.includes('narrow-yellow')) {
        return { width: 238, bgColor: '#facc15' }; // 30% of 794 = 238px, yellow
    }
    if (templateId.includes('monogram')) {
        return { width: 278, bgColor: '#1e293b' }; // 35%, dark navy
    }
    // Default for other sidebar templates
    return { width: 278, bgColor: '#1e293b' }; // 35%, dark navy
};

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
            const BREATHING_ROOM = 16; // Small padding at top of new page

            // Phase 1: READ (Measure everything)
            const updates: { element: HTMLElement; margin: string }[] = [];

            // Track cumulative offset from previous pushes
            // When we push element A, all subsequent elements shift down
            // We need to account for this when checking if element B needs pushing
            let cumulativeOffset = 0;

            for (const el of elements) {
                const element = el as HTMLElement;
                const rect = element.getBoundingClientRect();
                const containerRect = container.getBoundingClientRect();

                // Get absolute position relative to container
                // IMPORTANT: Divide by scale to convert from visual (scaled) coordinates
                // back to layout (unscaled) coordinates, since the parent has transform: scale()
                const rawRelativeTop = (rect.top - containerRect.top) / scale;
                const height = rect.height / scale;

                // Adjust position by cumulative offset from previous pushes
                // This simulates where the element WILL BE after prior pushes are applied
                const relativeTop = rawRelativeTop + cumulativeOffset;
                const bottom = relativeTop + height;

                // OVERSIZED ELEMENT PROTECTION: If element > 90% of page height, let it span naturally
                if (height > A4_HEIGHT_PX * 0.9) {
                    continue; // Don't push - let it span pages naturally
                }

                // Calculate which page this falls on (after accounting for previous pushes)
                const currentPageIndex = Math.floor(relativeTop / fullPageHeight);
                const pageTopBoundary = currentPageIndex * fullPageHeight;
                const pageContentBottom = pageTopBoundary + A4_HEIGHT_PX - PAGE_MARGIN_BOTTOM;

                // Check if element extends past the printable bottom (into the gap area)
                let shouldPush = bottom > pageContentBottom;

                // ORPHAN PROTECTION: Push headers/sections if < 60px from bottom
                // But skip this for very small elements to prevent excessive whitespace
                if (!shouldPush && height >= 80) {
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
                    // Calculate push distance from RAW position (before cumulative offset)
                    // because the margin is applied to the element in its current DOM position
                    const pushDistance = nextPageStart - rawRelativeTop - cumulativeOffset;

                    // Only push if we actually need to move forward
                    if (pushDistance > 0) {
                        updates.push({
                            element,
                            margin: `${pushDistance}px`
                        });

                        // Track this push for subsequent elements
                        cumulativeOffset += pushDistance + BREATHING_ROOM;
                    }
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

        }, [scale]);

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
                        /* Logic: Move to next page start with small breathing room */
                        margin-top: calc(var(--print-margin) + 16px) !important;
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

                        /* Print Mode: Keep same margin as preview */
                        .pushed-section {
                            margin-top: calc(var(--print-margin) + 16px) !important;
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
                            {isSidebarLayout && (() => {
                                const sidebarConfig = getSidebarConfig(selectedTemplateId);
                                return (
                                    <div
                                        className="absolute left-0 top-0 bottom-0"
                                        style={{
                                            width: `${sidebarConfig.width}px`,
                                            backgroundColor: sidebarConfig.bgColor,
                                        }}
                                    />
                                );
                            })()}
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

                {/* Gap overlay - fully opaque to hide any content in page gap */}
                <div
                    className="absolute inset-0 pointer-events-none print-hidden page-gap-overlay"
                    style={{ zIndex: 50 }}
                >
                    {backgroundPages.slice(0, -1).map((pageIndex) => (
                        <div
                            key={`gap-${pageIndex}`}
                            className="absolute w-full"
                            style={{
                                top: `${(pageIndex + 1) * A4_HEIGHT_PX + pageIndex * PAGE_GAP_PX}px`,
                                height: `${PAGE_GAP_PX}px`,
                                left: 0,
                                background: '#334155',
                                borderTop: '2px dashed #64748b',
                                borderBottom: '2px dashed #64748b',
                            }}
                        />
                    ))}
                </div>

            </div>
        );
    }
);

export default PagedPreview;
