
export interface TemplateCategory {
    slug: string;
    title: string;
    keyword: string;
    seoTitle: string;
    seoDescription: string;
    heroText: string;
}

export const TEMPLATE_CATEGORIES: TemplateCategory[] = [
    // Google Docs category hidden — will re-enable when Google Drive API integration is ready
    // {
    //     slug: 'google-docs',
    //     title: 'Google Docs Resume Templates',
    //     keyword: 'resume template google docs',
    //     seoTitle: 'Free Google Docs Resume Templates (2026) | Download & Edit',
    //     seoDescription: 'Download 10+ free Google Docs resume templates. Fully editable, professional designs that work with any ATS. No login required.',
    //     heroText: 'Stop fighting with Microsoft Word. Our collection of Google Docs resume templates is designed for speed, simplicity, and compatibility. Click any template to copy it directly to your Google Drive.'
    // },
    {
        slug: 'simple',
        title: 'Simple & Clean Resume Templates',
        keyword: 'simple resume template',
        seoTitle: 'Simple Resume Templates for 2026 (Clean & Minimalist)',
        seoDescription: 'Browse our collection of simple, clean resume templates. Perfect for conservative industries or anyone who wants a no-nonsense, readable resume.',
        heroText: 'Sometimes less is more. These simple resume templates focus on whitespace, clear typography, and readability. Perfect for bypassing ATS filters and impressing traditional recruiters.'
    },
    {
        slug: 'microsoftword',
        title: 'Microsoft Word Resume Templates',
        keyword: 'cv template word',
        seoTitle: 'Microsoft Word Resume Templates (Free .docx Download)',
        seoDescription: 'Download professional Microsoft Word (.docx) resume templates. Compatible with Word 2016, 2019, 2021, and Office 365.',
        heroText: 'Prefer the classic? Our Microsoft Word templates are built with standard fonts and safe formatting practices to ensure they look great on any version of Office.'
    },
    {
        slug: 'modern',
        title: 'Modern Resume Templates',
        keyword: 'modern resume template',
        seoTitle: 'Modern Resume Templates for 2026 (Professional & Sleek)',
        seoDescription: 'Stand out with modern resume templates featuring clean layouts, contemporary typography, and strategic use of color. ATS-compatible and recruiter-approved.',
        heroText: 'First impressions matter. Our modern resume templates combine contemporary design with ATS compatibility. Featuring clean lines, strategic color accents, and layouts that make recruiters take notice — without sacrificing readability.'
    },
    {
        slug: 'creative',
        title: 'Creative Resume Templates',
        keyword: 'creative resume template',
        seoTitle: 'Creative Resume Templates for 2026 (Stand Out from the Crowd)',
        seoDescription: 'Make a lasting impression with creative resume templates designed for designers, marketers, and professionals who want to showcase personality alongside qualifications.',
        heroText: 'Your resume should reflect your creativity. These templates feature bold layouts, unique section arrangements, and visual flair — ideal for design, marketing, media, and other creative industries where standing out is essential.'
    }
];

export function getCategoryBySlug(slug: string): TemplateCategory | undefined {
    return TEMPLATE_CATEGORIES.find((cat) => cat.slug === slug);
}

export function getAllCategorySlugs(): string[] {
    return TEMPLATE_CATEGORIES.map((cat) => cat.slug);
}
