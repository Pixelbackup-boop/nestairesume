/**
 * Sidebar backdrop geometry per template.
 *
 * Shared by PagedPreview (paints the sidebar background on every preview page)
 * and pdfSsrEntry (emits a position:fixed backdrop so the sidebar background
 * repeats on every printed PDF page). Keep both surfaces on this single source.
 */
import { parseDualColor } from './builder/colorUtils';

export interface SidebarConfig {
    width: number;
    bgColor: string;
    accentBorder?: { width: number; color: string; side: 'left' | 'right' };
}

export const getSidebarConfig = (templateId: string | null, customThemeColor?: string): SidebarConfig | null => {
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
