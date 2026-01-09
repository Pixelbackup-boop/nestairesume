'use client';

import React, { CSSProperties, ReactNode } from 'react';

/**
 * SectionHeader - REQUIRED component for all template section headings.
 *
 * This component automatically includes the 'section-header' class which is
 * essential for PagedPreview's smart pagination system to detect section
 * boundaries and prevent awkward page breaks.
 *
 * IMPORTANT: All templates MUST use this component for section headings
 * (Experience, Education, Skills, etc.) to ensure:
 * - Consistent page break behavior across all templates
 * - Web preview matches print output
 * - Section headers never get orphaned at page bottom
 *
 * @example
 * ```tsx
 * <SectionHeader
 *   theme={theme}
 *   headingFont={headingFont}
 *   scale={scale}
 *   variant="uppercase"
 * >
 *   Experience
 * </SectionHeader>
 * ```
 */

export interface SectionHeaderProps {
    /** Section title text */
    children: ReactNode;
    /** Theme colors */
    theme: {
        primary: string;
        text: string;
        heading?: string;
    };
    /** Font family for headings */
    headingFont?: string;
    /** Scale factor for responsive sizing */
    scale?: number;
    /** Style variant */
    variant?: 'default' | 'uppercase' | 'underline' | 'minimal';
    /** Custom inline styles (merged with defaults) */
    style?: CSSProperties;
    /** Additional CSS classes */
    className?: string;
}

export default function SectionHeader({
    children,
    theme,
    headingFont = 'Inter, sans-serif',
    scale = 1,
    variant = 'default',
    style,
    className = '',
}: SectionHeaderProps) {
    // Base styles
    const baseStyles: CSSProperties = {
        fontFamily: headingFont,
        fontSize: scale < 1 ? '10px' : '14px',
        fontWeight: 700,
        marginBottom: scale < 1 ? '8px' : '12px',
    };

    // Variant-specific styles
    const variantStyles: Record<string, CSSProperties> = {
        default: {
            color: theme.heading || theme.primary,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
        },
        uppercase: {
            color: theme.primary,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
        },
        underline: {
            color: theme.primary,
            textTransform: 'uppercase',
            borderBottom: `2px solid ${theme.primary}`,
            paddingBottom: '4px',
        },
        minimal: {
            color: theme.text,
            fontWeight: 600,
            fontSize: scale < 1 ? '10px' : '13px',
        },
    };

    const combinedStyles: CSSProperties = {
        ...baseStyles,
        ...variantStyles[variant],
        ...style,
    };

    return (
        <h2
            className={`section-header ${className}`.trim()}
            style={combinedStyles}
            data-paginate="section-start"
        >
            {children}
        </h2>
    );
}
