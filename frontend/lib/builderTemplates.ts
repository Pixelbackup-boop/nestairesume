// Shared template configuration for builder templates
// Used by both templates page and onboarding page

export interface BuilderTemplate {
    id: string;
    name: string;
    style: string;
    layout: 'classic' | 'sidebar' | 'header' | 'minimal';
    layoutPresetId: string; // Maps to actual layout preset ID in themes.ts
    category: 'professional' | 'modern' | 'creative' | 'minimal' | 'bold';
    accentColor: string;
    gradientColors: string; // For visual styling
}

// Template definitions with mappings to real layout presets
export const builderTemplates: BuilderTemplate[] = [
    {
        id: 'executive',
        name: 'Executive',
        style: 'Classic & Traditional',
        layout: 'classic',
        layoutPresetId: 'classic-normal-left',
        category: 'professional',
        accentColor: '#374151',
        gradientColors: 'from-slate-700 to-slate-900',
    },
    {
        id: 'modern',
        name: 'Modern',
        style: 'Clean Sidebar',
        layout: 'sidebar',
        layoutPresetId: 'sidebar-left-normal-normal',
        category: 'modern',
        accentColor: '#0d9488',
        gradientColors: 'from-teal-600 to-teal-900',
    },
    {
        id: 'creative',
        name: 'Creative',
        style: 'Bold Header',
        layout: 'header',
        layoutPresetId: 'header-center-normal',
        category: 'creative',
        accentColor: '#7c3aed',
        gradientColors: 'from-purple-600 to-purple-900',
    },
    {
        id: 'minimal',
        name: 'Minimal',
        style: 'Simple & Clean',
        layout: 'minimal',
        layoutPresetId: 'minimal-normal-normal',
        category: 'minimal',
        accentColor: '#6b7280',
        gradientColors: 'from-gray-700 to-gray-900',
    },
    {
        id: 'professional',
        name: 'Professional',
        style: 'Traditional',
        layout: 'classic',
        layoutPresetId: 'classic-normal-center',
        category: 'professional',
        accentColor: '#b45309',
        gradientColors: 'from-amber-700 to-amber-900',
    },
    {
        id: 'tech',
        name: 'Tech',
        style: 'Modern Tech',
        layout: 'sidebar',
        layoutPresetId: 'sidebar-left-compact-normal',
        category: 'modern',
        accentColor: '#2563eb',
        gradientColors: 'from-blue-600 to-blue-900',
    },
    {
        id: 'designer',
        name: 'Designer',
        style: 'Creative',
        layout: 'header',
        layoutPresetId: 'header-left-spacious',
        category: 'creative',
        accentColor: '#db2777',
        gradientColors: 'from-pink-600 to-pink-900',
    },
    {
        id: 'corporate',
        name: 'Corporate',
        style: 'Classic',
        layout: 'classic',
        layoutPresetId: 'classic-compact-left',
        category: 'professional',
        accentColor: '#52525b',
        gradientColors: 'from-zinc-600 to-zinc-900',
    },
    {
        id: 'startup',
        name: 'Startup',
        style: 'Modern',
        layout: 'sidebar',
        layoutPresetId: 'sidebar-right-normal-normal',
        category: 'bold',
        accentColor: '#059669',
        gradientColors: 'from-emerald-600 to-emerald-900',
    },
    {
        id: 'academic',
        name: 'Academic',
        style: 'Traditional',
        layout: 'classic',
        layoutPresetId: 'classic-education-first',
        category: 'professional',
        accentColor: '#4338ca',
        gradientColors: 'from-indigo-700 to-indigo-900',
    },
    {
        id: 'marketing',
        name: 'Marketing',
        style: 'Bold',
        layout: 'header',
        layoutPresetId: 'header-center-spacious',
        category: 'bold',
        accentColor: '#ea580c',
        gradientColors: 'from-orange-600 to-orange-900',
    },
    {
        id: 'finance',
        name: 'Finance',
        style: 'Clean',
        layout: 'minimal',
        layoutPresetId: 'minimal-compact-normal',
        category: 'minimal',
        accentColor: '#0369a1',
        gradientColors: 'from-sky-700 to-sky-900',
    },
];

// Helper to get a template by ID
export const getTemplateById = (id: string): BuilderTemplate | undefined => {
    return builderTemplates.find(t => t.id === id);
};

// Helper to get the layout preset ID for a template
export const getLayoutPresetId = (templateId: string): string => {
    const template = getTemplateById(templateId);
    return template?.layoutPresetId || 'classic-normal-left';
};

// Sample resume data for previews
export const sampleResumeData = {
    name: 'Sarah Johnson',
    title: 'UX Designer',
    email: 'sarah.j@email.com',
    phone: '+1 (555) 987-6543',
    location: 'New York, NY',
    website: 'sarahjohnson.design',
    headshot: '/Img/headshot.png',
    summary: 'Creative UX Designer with 6+ years of experience crafting user-centered digital experiences. Passionate about solving complex problems through intuitive design.',
    experience: [
        { company: 'DesignHub Agency', role: 'Lead UX Designer', years: '2021-Present' },
        { company: 'TechStart Inc', role: 'Senior UX Designer', years: '2019-2021' },
        { company: 'Creative Solutions', role: 'UX Designer', years: '2017-2019' },
    ],
    education: { school: 'Rhode Island School of Design', degree: 'BFA Graphic Design' },
    skills: ['Figma', 'Sketch', 'Adobe XD', 'Prototyping', 'User Research', 'Wireframing'],
    languages: ['English - Native', 'Spanish - Fluent'],
    certifications: ['Google UX Design Certificate', 'Nielsen Norman UX Certification'],
};
