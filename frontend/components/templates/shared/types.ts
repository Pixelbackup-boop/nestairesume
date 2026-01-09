// Shared Types for All Template Components

import { ResumeData } from '@/store/useResumeStore';
import { ThemeColor } from '@/lib/themes';
import { ComponentType } from 'react';

/**
 * Props interface that ALL template components must implement.
 * This ensures Design Tab customizations work consistently across templates.
 */
export interface TemplateProps {
    /** User's resume content (personalInfo, experience, education, skills, etc.) */
    data: ResumeData;
    /** Theme colors generated from selected accent color */
    theme: ThemeColor;
    /** Scale factor for preview thumbnails (default: 1) */
    scale?: number;
}

/**
 * Metadata for a template in the registry.
 */
export interface TemplateMeta {
    /** Unique template identifier (e.g., 'classic-professional') */
    id: string;
    /** Display name shown to users */
    name: string;
    /** Category for grouping (e.g., 'classic', 'sidebar', 'header', 'minimal', 'creative') */
    category: string;
    /** Path to thumbnail image */
    thumbnail: string;
    /** Optional description */
    description?: string;
}

/**
 * Full registry entry combining metadata with component.
 */
export interface TemplateRegistryEntry extends TemplateMeta {
    /** The React component that renders this template */
    component: ComponentType<TemplateProps>;
}

/**
 * Available template categories.
 */
export type TemplateCategory = 'classic' | 'sidebar' | 'header' | 'minimal' | 'creative';
