import { create } from 'zustand';
import { LayoutConfig, ThemeColor, layoutPresets, colorPresets, fontPresets, ALL_THEMES, DesignPreset } from '../lib/themes';

export interface Experience {
    id: string;
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
}

export interface Education {
    id: string;
    school: string;
    degree: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
}

export interface Skill {
    id: string;
    name: string;
    level: number; // 1-5 or similar
}

export type ImageShape = 'circle' | 'rounded' | 'square';

export type BackgroundType = 'solid' | 'gradient' | 'pattern';
export type BackgroundPattern = 'none' | 'dots' | 'lines' | 'grid' | 'diagonal';

export interface BackgroundSettings {
    type: BackgroundType;
    color: string;           // Solid color or gradient start
    gradientEnd?: string;    // Gradient end color
    gradientDirection?: string; // e.g., 'to right', 'to bottom right'
    pattern: BackgroundPattern;
    patternOpacity: number;  // 0-100
}

export interface FontSettings {
    heading: string;    // Font for headings/name
    body: string;       // Font for body text
    size: 'small' | 'medium' | 'large';  // Base font size
}

export interface ResumeData {
    personalInfo: {
        fullName: string;
        email: string;
        phone: string;
        location: string;
        website: string;
        linkedin: string;
        summary: string;
        jobTitle: string;
        profileImage: string; // Base64 or URL
        imageShape: ImageShape;
    };
    experience: Experience[];
    education: Education[];
    skills: Skill[];
    background: BackgroundSettings;
    fonts: FontSettings;
    customThemeColor?: string;
    layoutConfig?: LayoutConfig; // NEW: Store layout configuration
}

interface ResumeState {
    resumeData: ResumeData;
    selectedTemplate: string;
    selectedTheme: string;
    selectedDesignPresetId?: string; // Track which preset is active

    // Actions
    setResumeData: (data: Partial<ResumeData>) => void; // Bulk setter for AI-populated data
    updatePersonalInfo: (info: Partial<ResumeData['personalInfo']>) => void;
    addExperience: (exp: Experience) => void;
    updateExperience: (id: string, exp: Partial<Experience>) => void;
    removeExperience: (id: string) => void;
    addEducation: (edu: Education) => void;
    updateEducation: (id: string, edu: Partial<Education>) => void;
    removeEducation: (id: string) => void;
    addSkill: (skill: Skill) => void;
    updateSkill: (id: string, skill: Partial<Skill>) => void;
    removeSkill: (id: string) => void;

    // UI State Setters
    setTemplate: (templateId: string) => void;
    setTheme: (themeId: string) => void;
    setCustomThemeColor: (color: string) => void;

    // New Action for Design Presets
    applyDesignPreset: (presetId: string) => void;

    // Granular Updates
    updateBackground: (settings: Partial<BackgroundSettings>) => void;
    updateFonts: (settings: Partial<FontSettings>) => void;
    updateLayout: (config: Partial<LayoutConfig>) => void;
}

export const useResumeStore = create<ResumeState>((set, get) => ({
    resumeData: {
        personalInfo: {
            fullName: '',
            email: '',
            phone: '',
            location: '',
            website: '',
            linkedin: '',
            summary: '',
            jobTitle: '',
            profileImage: '',
            imageShape: 'circle',
        },
        experience: [],
        education: [],
        skills: [],
        background: {
            type: 'solid',
            color: '#ffffff',
            gradientEnd: '#f8fafc',
            gradientDirection: 'to bottom right',
            pattern: 'none',
            patternOpacity: 10,
        },
        fonts: {
            heading: 'Inter',
            body: 'Inter',
            size: 'medium',
        },
        customThemeColor: '',
        layoutConfig: layoutPresets[0], // Default to first layout
    },
    selectedTemplate: 'classic',
    selectedTheme: 'navy',
    selectedDesignPresetId: '',

    setResumeData: (data) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                ...data,
                personalInfo: data.personalInfo
                    ? { ...state.resumeData.personalInfo, ...data.personalInfo }
                    : state.resumeData.personalInfo,
            },
        })),

    updatePersonalInfo: (info) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                personalInfo: { ...state.resumeData.personalInfo, ...info },
            },
        })),

    addExperience: (exp) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                experience: [...state.resumeData.experience, exp],
            },
        })),

    updateExperience: (id, exp) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                experience: state.resumeData.experience.map((e) =>
                    e.id === id ? { ...e, ...exp } : e
                ),
            },
        })),

    removeExperience: (id) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                experience: state.resumeData.experience.filter((e) => e.id !== id),
            },
        })),

    addEducation: (edu) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                education: [...state.resumeData.education, edu],
            },
        })),

    updateEducation: (id, edu) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                education: state.resumeData.education.map((e) =>
                    e.id === id ? { ...e, ...edu } : e
                ),
            },
        })),

    removeEducation: (id) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                education: state.resumeData.education.filter((e) => e.id !== id),
            },
        })),

    addSkill: (skill) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                skills: [...state.resumeData.skills, skill],
            },
        })),

    updateSkill: (id, skill) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                skills: state.resumeData.skills.map((s) =>
                    s.id === id ? { ...s, ...skill } : s
                ),
            },
        })),

    removeSkill: (id) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                skills: state.resumeData.skills.filter((s) => s.id !== id),
            },
        })),

    setCustomThemeColor: (color) =>
        set((state) => ({
            selectedTheme: 'custom',
            selectedDesignPresetId: '', // Clear preset if customizing
            resumeData: { ...state.resumeData, customThemeColor: color }
        })),

    setTemplate: (templateId) => {
        const layoutConfig = layoutPresets.find(l => l.id === templateId) || layoutPresets[0];
        set((state) => ({
            selectedTemplate: templateId,
            resumeData: {
                ...state.resumeData,
                layoutConfig: layoutConfig
            }
        }));
    },

    setTheme: (themeId) => set((state) => ({
        selectedTheme: themeId,
        selectedDesignPresetId: '',
        resumeData: { ...state.resumeData, customThemeColor: '' }
    })),

    applyDesignPreset: (presetId) => {
        const preset = ALL_THEMES.find(p => p.id === presetId);
        if (!preset) return;

        // Find the full layout config for this template ID
        // Note: preset.templateId matches layoutPresets[].id
        const layoutConfig = layoutPresets.find(l => l.id === preset.templateId) || layoutPresets[0];

        set((state) => ({
            selectedDesignPresetId: presetId,
            selectedTemplate: layoutConfig.baseLayout, // Update base renderer
            selectedTheme: preset.theme.id || 'custom',
            resumeData: {
                ...state.resumeData,
                background: preset.background,
                fonts: preset.fonts,
                layoutConfig: layoutConfig,
                customThemeColor: '', // We use the preset's theme colors
            }
        }));
    },

    updateBackground: (settings) =>
        set((state) => ({
            selectedDesignPresetId: '', // Clear preset as we are diverging
            resumeData: {
                ...state.resumeData,
                background: { ...state.resumeData.background, ...settings },
            },
        })),

    updateFonts: (settings) =>
        set((state) => ({
            selectedDesignPresetId: '',
            resumeData: {
                ...state.resumeData,
                fonts: { ...state.resumeData.fonts, ...settings },
            },
        })),

    updateLayout: (config) =>
        set((state) => ({
            selectedDesignPresetId: '',
            resumeData: {
                ...state.resumeData,
                layoutConfig: { ...state.resumeData.layoutConfig!, ...config },
            },
        })),
}));
