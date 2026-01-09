'use client';

import { useResumeStore } from '../../store/useResumeStore';
import { colorPresets, generateTheme, getLayoutType as getBuilderLayoutType } from '@/lib/templates/builder';
import UnifiedTemplate, { LayoutType } from '../templates/UnifiedTemplate';

export default function ResumePreview() {
    const { resumeData, selectedTemplate, selectedTheme } = useResumeStore();

    // Get theme color: check preset first, then custom color, then fallback
    const getThemeColor = (): string => {
        // If a preset theme is selected (not 'custom'), use its primary color
        if (selectedTheme && selectedTheme !== 'custom') {
            const preset = colorPresets.find(c => c.id === selectedTheme);
            if (preset) {
                return preset.primary;
            }
        }
        // Fall back to custom color or default navy
        return resumeData.customThemeColor || '#1e3a8a';
    };

    const theme = generateTheme(getThemeColor());

    // Determine layout type from layoutConfig or builder template
    const getLayoutType = (): LayoutType => {
        // Check layoutConfig first (set by store when template is applied)
        if (resumeData.layoutConfig?.baseLayout) {
            const base = resumeData.layoutConfig.baseLayout;
            // Map creative to header (similar bold style)
            if (base === 'creative') return 'header';
            if (['classic', 'sidebar', 'header', 'minimal'].includes(base)) {
                return base as LayoutType;
            }
        }

        // Use explicit lookup from builder templates (no more brittle string parsing)
        return getBuilderLayoutType(selectedTemplate);
    };

    return (
        <div className="resume-page bg-white" style={{ height: '100%' }}>
            <UnifiedTemplate
                data={resumeData}
                theme={theme}
                layout={getLayoutType()}
            />
        </div>
    );
}
