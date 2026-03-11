import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { LayoutConfig, layoutPresets } from '../lib/themes';

export interface Experience {
    id: string;
    title: string;
    company: string;
    city: string;
    country: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
}

export interface Education {
    id: string;
    school: string;
    degree: string;
    city: string;
    country: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
    gpa?: string;
    honors?: string;
    clubs?: string;
}

export interface Skill {
    id: string;
    name: string;
    level: number; // 1-5 or similar
}

// Languages
export interface Language {
    id: string;
    name: string;
    proficiency: 'native' | 'fluent' | 'advanced' | 'intermediate' | 'basic';
    level: number; // 0-100 for visual bars
}

// Interests/Hobbies
export interface Interest {
    id: string;
    name: string;
    icon?: string; // Optional icon identifier
}

// Strengths (soft skills)
export interface Strength {
    id: string;
    name: string;
    level: number; // 0-100 for percentage circles
}

// Certifications
export interface Certification {
    id: string;
    name: string;
    issuer: string;
    date: string;
    url?: string;
}

// Awards
export interface Award {
    id: string;
    title: string;
    issuer: string;
    date: string;
    description?: string;
}

// Custom Fields (user-defined sections)
export interface CustomField {
    id: string;
    label: string;
    content: string;
}

export type ImageShape = 'circle' | 'rounded' | 'square';
export type IdDocumentType = 'id' | 'passport' | 'driving_license' | '';

export type BackgroundType = 'solid' | 'gradient' | 'pattern';
export type BackgroundPattern = 'none' | 'dots' | 'lines' | 'grid' | 'diagonal' | 'crosshatch' | 'chevron' | 'hexagon' | 'waves' | 'diamond';

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
        nationality: string;
        idType: IdDocumentType;
        idNumber: string;
        // Social links
        x?: string;  // X (formerly Twitter)
        github?: string;
        dribbble?: string;
        behance?: string;
        instagram?: string;
        // Custom field for additional info
        customField?: string;
        customFieldLabel?: string;
    };
    experience: Experience[];
    education: Education[];
    skills: Skill[];
    // New sections
    languages: Language[];
    interests: Interest[];
    strengths: Strength[];
    certifications: Certification[];
    awards: Award[];
    customFields: CustomField[];
    // Styling
    background: BackgroundSettings;
    fonts: FontSettings;
    customThemeColor?: string;
    layoutConfig?: LayoutConfig; // Store layout configuration
}

interface ResumeState {
    resumeData: ResumeData;
    selectedTemplate: string;
    selectedTheme: string;
    selectedTemplateId: string | null; // Exact React component ID (e.g., 'header-dark')
    lastEdited: number | null; // Timestamp for "Continue Editing" banner

    // Actions
    setResumeData: (data: Partial<ResumeData>) => void; // Bulk setter for AI-populated data
    updatePersonalInfo: (info: Partial<ResumeData['personalInfo']>) => void;
    addExperience: (exp: Experience) => void;
    updateExperience: (id: string, exp: Partial<Experience>) => void;
    removeExperience: (id: string) => void;
    moveExperience: (id: string, direction: 'up' | 'down') => void;
    addEducation: (edu: Education) => void;
    updateEducation: (id: string, edu: Partial<Education>) => void;
    removeEducation: (id: string) => void;
    moveEducation: (id: string, direction: 'up' | 'down') => void;
    addSkill: (skill: Skill) => void;
    updateSkill: (id: string, skill: Partial<Skill>) => void;
    removeSkill: (id: string) => void;

    // New section actions
    addLanguage: (lang: Language) => void;
    updateLanguage: (id: string, lang: Partial<Language>) => void;
    removeLanguage: (id: string) => void;
    addInterest: (interest: Interest) => void;
    updateInterest: (id: string, interest: Partial<Interest>) => void;
    removeInterest: (id: string) => void;
    addStrength: (strength: Strength) => void;
    updateStrength: (id: string, strength: Partial<Strength>) => void;
    removeStrength: (id: string) => void;
    addCertification: (cert: Certification) => void;
    updateCertification: (id: string, cert: Partial<Certification>) => void;
    removeCertification: (id: string) => void;
    addAward: (award: Award) => void;
    updateAward: (id: string, award: Partial<Award>) => void;
    removeAward: (id: string) => void;
    addCustomField: (field: CustomField) => void;
    updateCustomField: (id: string, field: Partial<CustomField>) => void;
    removeCustomField: (id: string) => void;

    // UI State Setters
    setTemplate: (templateId: string) => void;
    setTemplateId: (templateId: string | null) => void; // Set exact React component ID
    setTheme: (themeId: string) => void;
    setCustomThemeColor: (color: string) => void;

    // Granular Updates
    updateBackground: (settings: Partial<BackgroundSettings>) => void;
    updateFonts: (settings: Partial<FontSettings>) => void;
    updateLayout: (config: Partial<LayoutConfig>) => void;

    // Draft management
    clearDraft: () => void;
}

export const useResumeStore = create<ResumeState>()(
    persist(
        (set) => ({
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
            nationality: '',
            idType: '',
            idNumber: '',
            x: '',
            github: '',
            dribbble: '',
            behance: '',
            instagram: '',
        },
        experience: [],
        education: [],
        skills: [],
        languages: [],
        interests: [],
        strengths: [],
        certifications: [],
        awards: [],
        customFields: [],
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
    selectedTemplateId: null,
    lastEdited: null,

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

    moveExperience: (id, direction) =>
        set((state) => {
            const arr = [...state.resumeData.experience];
            const index = arr.findIndex((e) => e.id === id);
            if (index === -1) return state;
            const newIndex = direction === 'up' ? index - 1 : index + 1;
            if (newIndex < 0 || newIndex >= arr.length) return state;
            [arr[index], arr[newIndex]] = [arr[newIndex], arr[index]];
            return { resumeData: { ...state.resumeData, experience: arr } };
        }),

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

    moveEducation: (id, direction) =>
        set((state) => {
            const arr = [...state.resumeData.education];
            const index = arr.findIndex((e) => e.id === id);
            if (index === -1) return state;
            const newIndex = direction === 'up' ? index - 1 : index + 1;
            if (newIndex < 0 || newIndex >= arr.length) return state;
            [arr[index], arr[newIndex]] = [arr[newIndex], arr[index]];
            return { resumeData: { ...state.resumeData, education: arr } };
        }),

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

    // Language actions
    addLanguage: (lang) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                languages: [...state.resumeData.languages, lang],
            },
        })),

    updateLanguage: (id, lang) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                languages: state.resumeData.languages.map((l) =>
                    l.id === id ? { ...l, ...lang } : l
                ),
            },
        })),

    removeLanguage: (id) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                languages: state.resumeData.languages.filter((l) => l.id !== id),
            },
        })),

    // Interest actions
    addInterest: (interest) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                interests: [...state.resumeData.interests, interest],
            },
        })),

    updateInterest: (id, interest) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                interests: state.resumeData.interests.map((i) =>
                    i.id === id ? { ...i, ...interest } : i
                ),
            },
        })),

    removeInterest: (id) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                interests: state.resumeData.interests.filter((i) => i.id !== id),
            },
        })),

    // Strength actions
    addStrength: (strength) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                strengths: [...state.resumeData.strengths, strength],
            },
        })),

    updateStrength: (id, strength) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                strengths: state.resumeData.strengths.map((s) =>
                    s.id === id ? { ...s, ...strength } : s
                ),
            },
        })),

    removeStrength: (id) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                strengths: state.resumeData.strengths.filter((s) => s.id !== id),
            },
        })),

    // Certification actions
    addCertification: (cert) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                certifications: [...state.resumeData.certifications, cert],
            },
        })),

    updateCertification: (id, cert) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                certifications: state.resumeData.certifications.map((c) =>
                    c.id === id ? { ...c, ...cert } : c
                ),
            },
        })),

    removeCertification: (id) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                certifications: state.resumeData.certifications.filter((c) => c.id !== id),
            },
        })),

    // Award actions
    addAward: (award) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                awards: [...state.resumeData.awards, award],
            },
        })),

    updateAward: (id, award) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                awards: state.resumeData.awards.map((a) =>
                    a.id === id ? { ...a, ...award } : a
                ),
            },
        })),

    removeAward: (id) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                awards: state.resumeData.awards.filter((a) => a.id !== id),
            },
        })),

    // Custom Field actions
    addCustomField: (field) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                customFields: [...(state.resumeData.customFields ?? []), field],
            },
        })),

    updateCustomField: (id, field) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                customFields: (state.resumeData.customFields ?? []).map((f) =>
                    f.id === id ? { ...f, ...field } : f
                ),
            },
        })),

    removeCustomField: (id) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                customFields: (state.resumeData.customFields ?? []).filter((f) => f.id !== id),
            },
        })),

    setCustomThemeColor: (color) =>
        set((state) => ({
            selectedTheme: 'custom',
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

    setTemplateId: (templateId) => set({ selectedTemplateId: templateId }),

    setTheme: (themeId) => set((state) => ({
        selectedTheme: themeId,
        resumeData: { ...state.resumeData, customThemeColor: '' }
    })),

    updateBackground: (settings) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                background: { ...state.resumeData.background, ...settings },
            },
        })),

    updateFonts: (settings) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                fonts: { ...state.resumeData.fonts, ...settings },
            },
        })),

    updateLayout: (config) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                layoutConfig: { ...state.resumeData.layoutConfig!, ...config },
            },
        })),

    // Clear draft action
    clearDraft: () => set({
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
                nationality: '',
                idType: '',
                idNumber: '',
                x: '',
                github: '',
                dribbble: '',
                behance: '',
                instagram: '',
            },
            experience: [],
            education: [],
            skills: [],
            languages: [],
            interests: [],
            strengths: [],
            certifications: [],
            awards: [],
            customFields: [],
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
            layoutConfig: layoutPresets[0],
        },
        selectedTemplate: 'classic',
        selectedTheme: 'navy',
        selectedTemplateId: null,
        lastEdited: null,
    }),
}),
        {
            name: 'resume-draft', // localStorage key
            storage: createJSONStorage(() => localStorage),
            // Only persist these fields (exclude functions)
            partialize: (state) => ({
                resumeData: state.resumeData,
                selectedTemplate: state.selectedTemplate,
                selectedTemplateId: state.selectedTemplateId,
                selectedTheme: state.selectedTheme,
                lastEdited: state.lastEdited,
            }),
            // Deep merge so new fields (website, nationality, idType, idNumber)
            // get their defaults even when loading old localStorage data
            merge: (persistedState, currentState) => {
                const persisted = persistedState as Partial<typeof currentState>;
                const mergedPersonalInfo = {
                    ...currentState.resumeData.personalInfo,
                    ...persisted.resumeData?.personalInfo,
                };
                // Migrate old 'twitter' key → 'x' (renamed when Twitter rebranded)
                const pi = mergedPersonalInfo as Record<string, unknown>;
                if (pi.twitter && !mergedPersonalInfo.x) {
                    mergedPersonalInfo.x = pi.twitter as string;
                }
                delete pi.twitter;
                return {
                    ...currentState,
                    ...persisted,
                    lastEdited: persisted.lastEdited ?? currentState.lastEdited,
                    resumeData: {
                        ...currentState.resumeData,
                        ...persisted.resumeData,
                        personalInfo: mergedPersonalInfo,
                    },
                };
            },
        }
    )
);

// Auto-update lastEdited whenever resumeData changes
let prevResumeData = useResumeStore.getState().resumeData;
useResumeStore.subscribe((state) => {
    if (state.resumeData !== prevResumeData) {
        prevResumeData = state.resumeData;
        useResumeStore.setState({ lastEdited: Date.now() });
    }
});

// =============================================================================
// SELECTOR HOOKS - Use these to prevent unnecessary re-renders
// Components will only re-render when the specific slice of state they use changes
// =============================================================================

// Data selectors
export const usePersonalInfo = () => useResumeStore((state) => state.resumeData.personalInfo);
export const useExperience = () => useResumeStore((state) => state.resumeData.experience);
export const useEducation = () => useResumeStore((state) => state.resumeData.education);
export const useSkills = () => useResumeStore((state) => state.resumeData.skills);
export const useLanguages = () => useResumeStore((state) => state.resumeData.languages);
export const useInterests = () => useResumeStore((state) => state.resumeData.interests);
export const useStrengths = () => useResumeStore((state) => state.resumeData.strengths);
export const useCertifications = () => useResumeStore((state) => state.resumeData.certifications);
export const useAwards = () => useResumeStore((state) => state.resumeData.awards);
export const useCustomFields = () => useResumeStore((state) => state.resumeData.customFields);
export const useBackground = () => useResumeStore((state) => state.resumeData.background);
export const useFonts = () => useResumeStore((state) => state.resumeData.fonts);
export const useLayoutConfig = () => useResumeStore((state) => state.resumeData.layoutConfig);

// UI state selectors
export const useSelectedTemplate = () => useResumeStore((state) => state.selectedTemplate);
export const useSelectedTemplateId = () => useResumeStore((state) => state.selectedTemplateId);
export const useSelectedTheme = () => useResumeStore((state) => state.selectedTheme);
export const useCustomThemeColor = () => useResumeStore((state) => state.resumeData.customThemeColor);

// Full resume data (use sparingly - causes re-render on any data change)
export const useResumeData = () => useResumeStore((state) => state.resumeData);
