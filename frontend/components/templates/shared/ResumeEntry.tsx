'use client';

import React, { CSSProperties, ReactNode } from 'react';

/**
 * ResumeEntry - REQUIRED wrapper for individual resume entries.
 *
 * This component automatically includes the 'resume-entry' class which is
 * essential for PagedPreview's smart pagination system to keep entries
 * together and prevent them from being split across page breaks.
 *
 * IMPORTANT: All templates MUST use this component to wrap:
 * - Individual experience entries
 * - Individual education entries
 * - Any other content that should stay together on a page
 *
 * @example
 * ```tsx
 * {experience.map((exp) => (
 *   <ResumeEntry key={exp.id}>
 *     <h3>{exp.title}</h3>
 *     <p>{exp.company}</p>
 *     <p>{exp.description}</p>
 *   </ResumeEntry>
 * ))}
 * ```
 */

export interface ResumeEntryProps {
    /** Entry content */
    children: ReactNode;
    /** Custom inline styles */
    style?: CSSProperties;
    /** Additional CSS classes */
    className?: string;
}

export default function ResumeEntry({
    children,
    style,
    className = '',
}: ResumeEntryProps) {
    return (
        <div
            className={`resume-entry ${className}`.trim()}
            style={style}
            data-paginate="entry"
        >
            {children}
        </div>
    );
}
