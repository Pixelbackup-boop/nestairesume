'use client';

import { useResumeStore } from '../../store/useResumeStore';
import { themes, generateTheme } from '../../lib/themes';
import ClassicLayout from '../templates/ClassicLayout';
import SidebarLayout from '../templates/SidebarLayout';
import HeaderLayout from '../templates/HeaderLayout';
import MinimalLayout from '../templates/MinimalLayout';
import CreativeLayout from '../templates/CreativeLayout';

export default function ResumePreview() {
    const { resumeData, selectedTemplate, selectedTheme } = useResumeStore();

    // Determine the active theme properties
    // If it's a custom color, we generate a theme object on the fly
    // If it's a preset, we might interpret it, but mostly we rely on resumeData.background/fonts/layoutConfig 
    // being set by the preset action.

    // However, for backward compatibility or direct theme selection (if we keep that), we can derive:
    const theme = resumeData.customThemeColor
        ? generateTheme(resumeData.customThemeColor)
        : {
            ...generateTheme(resumeData.customThemeColor || '#1e3a8a'), // Fallback to a valid theme object
            name: 'Current',
        };

    const TemplateMap = {
        classic: ClassicLayout,
        sidebar: SidebarLayout,
        header: HeaderLayout,
        minimal: MinimalLayout,
        creative: CreativeLayout,
    };

    // Use the baseLayout from the config to determine which component to render
    // Fallback to 'classic' if config is missing
    const baseLayoutId = resumeData.layoutConfig?.baseLayout || 'classic';
    const SelectedLayout = TemplateMap[baseLayoutId] || ClassicLayout;

    return (
        <div className="resume-page bg-white">
            <SelectedLayout data={resumeData} theme={theme} />
        </div>
    );
}
