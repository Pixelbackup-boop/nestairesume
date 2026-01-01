import { create } from 'zustand';

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
    };
    experience: Experience[];
    education: Education[];
    skills: Skill[];
}

interface ResumeState {
    resumeData: ResumeData;
    selectedTemplate: string;
    selectedTheme: string;

    // Actions
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
    setTemplate: (templateId: string) => void;
    setTheme: (themeId: string) => void;
    setCustomThemeColor: (color: string) => void;
}

export const useResumeStore = create<ResumeState>((set) => ({
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
        },
        experience: [],
        education: [],
        skills: [],
        customThemeColor: '', // Initial state
    },
    selectedTemplate: 'classic',
    selectedTheme: 'navy',

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
            resumeData: { ...state.resumeData, customThemeColor: color }
        })),

    setTemplate: (templateId) => set({ selectedTemplate: templateId }),
    setTheme: (themeId) => set((state) => ({
        selectedTheme: themeId,
        // Clear custom color when a preset theme is selected
        resumeData: { ...state.resumeData, customThemeColor: '' }
    })),
}));
