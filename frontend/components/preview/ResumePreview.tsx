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

    // Use custom theme if set, otherwise fallback to selected preset
    const theme = resumeData.customThemeColor
        ? generateTheme(resumeData.customThemeColor)
        : themes[selectedTheme];

    const renderTemplate = () => {
        switch (selectedTemplate) {
            case 'sidebar':
                return <SidebarLayout data={resumeData} theme={theme} />;
            case 'header':
                return <HeaderLayout data={resumeData} theme={theme} />;
            case 'minimal':
                return <MinimalLayout data={resumeData} theme={theme} />;
            case 'creative':
                return <CreativeLayout data={resumeData} theme={theme} />;
            case 'classic':
            default:
                return <ClassicLayout data={resumeData} theme={theme} />;
        }
    };

    return (
        <div className="w-full h-full">
            {renderTemplate()}
        </div>
    );
}
