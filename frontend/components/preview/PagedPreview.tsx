'use client';

import React, { useRef, useState, useLayoutEffect, useEffect, useCallback, forwardRef, useMemo, useDeferredValue } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useResumeStore } from '../../store/useResumeStore';
import { isRtl, Locale } from '@/i18n.config';
import { colorPresets, generateTheme, getLayoutType as getBuilderLayoutType } from '@/lib/templates/builder';
import UnifiedTemplate, { LayoutType } from '../templates/UnifiedTemplate';
import { parseDualColor } from '@/lib/templates/builder/colorUtils';
import { TemplateTranslations } from '@/lib/templates/TranslationContext';

// A4 dimensions
const A4_HEIGHT_PX = 1123; // Standard A4 height in pixels at 96 DPI
const A4_WIDTH_PX = 794;   // Standard A4 width in pixels at 96 DPI
const PAGE_GAP_PX = 40;    // Gap between pages (Collapsed in Print via CSS)
const PAGE_MARGIN_BOTTOM = 40; // Bottom margin to prevent content from touching page edge
const PAGE_MARGIN_TOP = 40; // Top margin for page 2+ to prevent content cutoff
// Sidebar dimensions per template
interface SidebarConfig {
    width: number;
    bgColor: string;
    accentBorder?: { width: number; color: string; side: 'left' | 'right' };
}

const getSidebarConfig = (templateId: string | null, customThemeColor?: string): SidebarConfig | null => {
    if (!templateId) return null;

    // Parse dual color for templates that support it
    const { primary: sidebarBg, secondary: accentColor } = parseDualColor(
        customThemeColor,
        { primary: '#0f172a', secondary: '#facc15' }
    );

    if (templateId.includes('narrow-yellow')) {
        return { width: 238, bgColor: '#facc15' }; // 30% of 794 = 238px, yellow
    }
    if (templateId.includes('monogram')) {
        // Monogram has 30% gray sidebar with 8px accent border on right
        // Uses the theme's accent color (defaults to yellow)
        return {
            width: 238,
            bgColor: '#374151', // Gray 700
            accentBorder: { width: 8, color: accentColor || '#facc15', side: 'right' }
        };
    }
    if (templateId === 'header-dark') {
        // Header-dark has 33% sidebar - use dynamic primary color from dual color preset
        // Note: header-dark-banner and header-dark-box do NOT have sidebars
        return { width: 262, bgColor: sidebarBg }; // 33% of 794 = 262px
    }
    if (templateId.includes('sidebar-dark-navy') || templateId.includes('dark-navy')) {
        return { width: 278, bgColor: '#1e293b' }; // 35%, dark navy
    }
    // Return null for templates without sidebars
    return null;
};

// Footer decoration config for templates with decorative elements at page bottom
interface FooterDecorationConfig {
    type: 'diagonal';
    width: string;
    height: number;
    bgColor: string;
    clipPath: string;
    position: 'bottom-left' | 'bottom-right';
}

const getFooterDecorationConfig = (templateId: string | null, customThemeColor?: string): FooterDecorationConfig | null => {
    if (!templateId) return null;

    if (templateId === 'header-diagonal-yellow') {
        // Uses theme color or default yellow
        const accentColor = customThemeColor || '#facc15';
        return {
            type: 'diagonal',
            width: '40%',
            height: 80,
            bgColor: accentColor,
            clipPath: 'polygon(0 0, 70% 100%, 0% 100%)',
            position: 'bottom-left',
        };
    }

    return null;
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
        const { resumeData: rawResumeData, selectedTemplate, selectedTheme, selectedTemplateId } = useResumeStore();
        const resumeData = useDeferredValue(rawResumeData);
        const containerRef = useRef<HTMLDivElement>(null);
        const [totalPages, setTotalPages] = useState(1);
        const t = useTranslations('Resume');
        const locale = useLocale() as Locale;

        // Build translations object for template components (including RTL support)
        const templateTranslations: TemplateTranslations = useMemo(() => ({
            sections: {
                experience: t('sections.experience'),
                workExperience: t('sections.workExperience'),
                education: t('sections.education'),
                skills: t('sections.skills'),
                languages: t('sections.languages'),
                interests: t('sections.interests'),
                strengths: t('sections.strengths'),
                certifications: t('sections.certifications'),
                awards: t('sections.awards'),
                references: t('sections.references'),
                summary: t('sections.summary'),
                profile: t('sections.profile'),
                contact: t('sections.contact'),
                additionalInfo: t('sections.additionalInfo'),
                socialLinks: t('sections.socialLinks'),
                personalDetails: t('sections.personalDetails'),
                credentials: t('sections.credentials'),
            },
            labels: {
                present: t('labels.present'),
            },
            isRtl: isRtl(locale),
        }), [t, locale]);

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

        // Get custom theme color string (may be "primary|secondary" for dual-color templates)
        const customThemeColor = resumeData.customThemeColor;

        // Check if this template has a sidebar that needs a persistent background
        // This includes sidebar layouts AND header layouts with sidebars (like header-dark)
        const sidebarConfig = getSidebarConfig(selectedTemplateId, customThemeColor);
        const hasSidebarBackdrop = sidebarConfig !== null;

        // Check if this template has footer decorations (diagonal shapes, etc.)
        const footerDecorationConfig = getFooterDecorationConfig(selectedTemplateId, customThemeColor);

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

                // For sidebar layouts: make the <aside> sidebar transparent
                // so the backdrop sidebar color shows through on ALL pages
                const sidebarElement = templateRoot.querySelector('aside');
                if (sidebarElement) {
                    (sidebarElement as HTMLElement).style.backgroundColor = 'transparent';
                    (sidebarElement as HTMLElement).style.background = 'transparent';
                }
            }

            // UNIVERSAL SELECTOR: Find ALL elements that shouldn't be split
            // This works for any template - current and future
            // Includes common wrapper elements to ensure page 2+ top margin is applied
            const elements = Array.from(container.querySelectorAll(
                '[data-paginate], .section-header, .resume-entry, .resume-section, section, h2, h3, ' +
                '.credential-item, .reference-item, .language-item, .skill-item, ' +
                '[class*="entry"], [class*="item"], [class*="section"]'
            ));

            // Reset styles first - COMPREHENSIVE RESET
            // Reset ALL elements that have marginTop set (not just selector-matched elements)
            // This fixes page 4+ having stale margins from previous Phase 3 pushes
            container.querySelectorAll('*').forEach((el) => {
                const element = el as HTMLElement;
                if (element.style.marginTop) {
                    element.style.marginTop = '';
                }
            });

            // Also reset the tracked elements' other pagination styles
            elements.forEach((el) => {
                const element = el as HTMLElement;
                element.style.paddingTop = '';
                element.style.removeProperty('--print-margin');
                element.classList.remove('pushed-section');
            });

            // "Forced Reflow" Optimization: Separate Read and Write phases
            const fullPageHeight = A4_HEIGHT_PX + PAGE_GAP_PX;

            // Phase 1: READ (Measure everything)
            // Track whether element needs raw margin vs margin + page top offset
            const updates: { element: HTMLElement; margin: string; rawMargin?: boolean }[] = [];

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

                // PAGE 2+ TOP MARGIN: Push content that's too close to the top of page 2+
                // This prevents content from appearing cut off at the top of continuation pages
                if (!shouldPush && currentPageIndex > 0) {
                    const distanceFromPageTop = relativeTop - pageTopBoundary;
                    if (distanceFromPageTop < PAGE_MARGIN_TOP) {
                        // Element starts within top margin zone - push it down
                        const pushNeeded = PAGE_MARGIN_TOP - distanceFromPageTop;
                        updates.push({
                            element,
                            margin: `${pushNeeded}px`,
                            rawMargin: true // Just apply margin directly, no CSS extra
                        });
                        cumulativeOffset += pushNeeded;
                        continue; // Skip the rest of the checks for this element
                    }
                }

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
                    // Calculate push distance to land at nextPageStart + PAGE_MARGIN_TOP
                    // This ensures PAGE_MARGIN_TOP (40px) top margin on page 2+
                    const targetPosition = nextPageStart + PAGE_MARGIN_TOP;
                    const pushDistance = targetPosition - rawRelativeTop - cumulativeOffset;

                    // Only push if we actually need to move forward
                    if (pushDistance > 0) {
                        updates.push({
                            element,
                            margin: `${pushDistance}px`,
                            rawMargin: true // Apply exact calculated margin, no CSS extra
                        });

                        // Track this push for subsequent elements
                        cumulativeOffset += pushDistance;
                    }
                }
            }

            // Phase 2: WRITE (Apply styles) - Avoids layout thrashing
            updates.forEach(({ element, margin, rawMargin }) => {
                if (rawMargin) {
                    // Apply margin directly - calculation already includes PAGE_MARGIN_TOP
                    element.style.marginTop = margin;
                } else {
                    // Legacy: use CSS variable + class for extra offset
                    element.style.setProperty('--print-margin', margin);
                    element.classList.add('pushed-section');
                }
            });

            // Phase 3: PAGE 2+ TOP MARGIN ENFORCEMENT
            // Find the FIRST element at the top of each page 2+ and ensure PAGE_MARGIN_TOP (40px) margin
            // This is more robust than checking all elements - we target the topmost one
            const containerRect = container.getBoundingClientRect();
            const currentTotalPages = Math.ceil(container.scrollHeight / fullPageHeight);

            for (let pageIdx = 1; pageIdx < currentTotalPages; pageIdx++) {
                const pageTopBoundary = pageIdx * fullPageHeight;
                const pageTopPx = pageTopBoundary; // Position in unscaled coordinates

                // Find all elements that start within the first 30px of this page (gives some buffer)
                const elementsNearTop: { element: HTMLElement; top: number }[] = [];

                const allElements = container.querySelectorAll('*');
                allElements.forEach((el) => {
                    const element = el as HTMLElement;
                    // Skip non-visible elements
                    if (element.offsetParent === null && element !== container) return;
                    // Skip elements that already have margin applied
                    if (element.style.marginTop && parseFloat(element.style.marginTop) > 0) return;

                    const rect = element.getBoundingClientRect();
                    const relativeTop = (rect.top - containerRect.top) / scale;
                    const distanceFromPageTop = relativeTop - pageTopPx;

                    // Element starts within 30px of page top (and not before)
                    if (distanceFromPageTop >= -5 && distanceFromPageTop < 30) {
                        elementsNearTop.push({ element, top: relativeTop });
                    }
                });

                // Sort by position - find the topmost element
                elementsNearTop.sort((a, b) => a.top - b.top);

                // Apply margin to the first element that needs it
                for (const { element, top } of elementsNearTop) {
                    const distanceFromPageTop = top - pageTopPx;
                    if (distanceFromPageTop < PAGE_MARGIN_TOP) {
                        const pushNeeded = PAGE_MARGIN_TOP - distanceFromPageTop;
                        // Only push if meaningful (avoid sub-pixel pushes)
                        if (pushNeeded > 1) {
                            element.style.marginTop = `${Math.ceil(pushNeeded)}px`;
                            break; // Only push the first element, others will flow down
                        }
                    }
                }
            }

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
                className="relative bg-gray-300 rounded-sm"
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
                        /* Logic: Move to next page start with PAGE_MARGIN_TOP (40px) for proper spacing */
                        margin-top: calc(var(--print-margin) + 40px) !important;
                        position: relative;
                    }

                    /* Force content background to be transparent so backdrop shows through */
                    .resume-print-content > div,
                    .resume-print-content > div > aside,
                    .resume-print-content > div > main {
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
                        /* Restore background for print - only for main content area, not sidebar */
                        .resume-print-content > div {
                            background: white !important;
                            background-color: white !important;
                        }
                        /* But let aside keep its original background for print */
                        .resume-print-content > div > aside {
                            background: revert !important;
                            background-color: revert !important;
                        }
                        /* Ensure background colors and patterns print */
                        .resume-print-content * {
                            -webkit-print-color-adjust: exact;
                            print-color-adjust: exact;
                        }

                        /* Print Mode: Keep same margin as preview */
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
                            {/* Persistent Sidebar Background - appears on ALL pages for templates with sidebars */}
                            {hasSidebarBackdrop && sidebarConfig && (() => {
                                const border = sidebarConfig.accentBorder;
                                return (
                                    <div
                                        className="absolute left-0 top-0 bottom-0"
                                        style={{
                                            width: `${sidebarConfig.width}px`,
                                            backgroundColor: sidebarConfig.bgColor,
                                            // Add accent border if configured
                                            ...(border && {
                                                borderRight: border.side === 'right' ? `${border.width}px solid ${border.color}` : undefined,
                                                borderLeft: border.side === 'left' ? `${border.width}px solid ${border.color}` : undefined,
                                            }),
                                        }}
                                    />
                                );
                            })()}
                            {/* Footer Decoration - diagonal shapes at page bottom */}
                            {footerDecorationConfig && (
                                <div
                                    className="absolute"
                                    style={{
                                        bottom: 0,
                                        left: footerDecorationConfig.position === 'bottom-left' ? 0 : undefined,
                                        right: footerDecorationConfig.position === 'bottom-right' ? 0 : undefined,
                                        width: footerDecorationConfig.width,
                                        height: `${footerDecorationConfig.height}px`,
                                        backgroundColor: footerDecorationConfig.bgColor,
                                        clipPath: footerDecorationConfig.clipPath,
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
                            translations={templateTranslations}
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
