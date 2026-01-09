// Single Source of Truth for Sample Resume Data
// Used by: templates page previews, builder page prefill, onboarding

import type { ResumeData } from '@/store/useResumeStore';

/**
 * Sample profile data for 13 different personas
 * Used to create variety in template previews
 */
export const sampleProfiles = [
    {
        fullName: 'Sarah Johnson',
        jobTitle: 'UX Designer',
        email: 'sarah.j@email.com',
        phone: '+1 (555) 987-6543',
        location: 'New York, NY',
        website: 'sarahjohnson.design',
        linkedin: 'linkedin.com/in/sarahjohnson',
        summary: 'Creative UX Designer with 6+ years of experience crafting user-centered digital experiences. Passionate about solving complex problems through intuitive design.',
        profileImage: '/Img/sarah-johnson.jpg',
        dribbble: 'dribbble.com/sarahjohnson',
    },
    {
        fullName: 'Michael Anderson',
        jobTitle: 'Software Engineer',
        email: 'michael.a@email.com',
        phone: '+1 (555) 234-5678',
        location: 'San Francisco, CA',
        website: 'michaelanderson.dev',
        linkedin: 'linkedin.com/in/michaelanderson',
        summary: 'Full-stack Software Engineer with 8+ years of experience building scalable web applications. Expert in React, Node.js, and cloud architecture.',
        profileImage: '/Img/michael-anderson.png',
        github: 'github.com/michaelanderson',
    },
    {
        fullName: 'Emily Williams',
        jobTitle: 'Marketing Director',
        email: 'emily.w@email.com',
        phone: '+1 (555) 345-6789',
        location: 'Chicago, IL',
        website: 'emilywilliams.com',
        linkedin: 'linkedin.com/in/emilywilliams',
        summary: 'Strategic Marketing Director with 10+ years driving brand growth and digital transformation. Proven track record of increasing market share and ROI.',
        profileImage: '/Img/emily-williams.jpg',
        twitter: 'twitter.com/emilywilliams',
    },
    {
        fullName: 'David Thompson',
        jobTitle: 'Product Manager',
        email: 'david.t@email.com',
        phone: '+1 (555) 456-7890',
        location: 'Austin, TX',
        website: 'davidthompson.io',
        linkedin: 'linkedin.com/in/davidthompson',
        summary: 'Results-driven Product Manager with 7+ years of experience launching successful digital products. Skilled in agile methodologies and cross-functional leadership.',
        profileImage: '/Img/david-thompson.jpg',
        github: 'github.com/davidthompson',
    },
    {
        fullName: 'James Chen',
        jobTitle: 'Data Scientist',
        email: 'james.c@email.com',
        phone: '+1 (555) 567-8901',
        location: 'Seattle, WA',
        website: 'jameschen.ai',
        linkedin: 'linkedin.com/in/jameschen',
        summary: 'Data Scientist with 5+ years of experience in machine learning and AI. Specialized in predictive analytics and natural language processing.',
        profileImage: '/Img/james-chen.jpg',
        github: 'github.com/jameschen',
    },
    {
        fullName: 'Lisa Kim',
        jobTitle: 'Graphic Designer',
        email: 'lisa.k@email.com',
        phone: '+1 (555) 678-9012',
        location: 'Los Angeles, CA',
        website: 'lisakim.design',
        linkedin: 'linkedin.com/in/lisakim',
        summary: 'Award-winning Graphic Designer with 6+ years creating compelling visual identities and brand experiences. Expert in Adobe Creative Suite and motion graphics.',
        profileImage: '/Img/lisa-kim.jpg',
        behance: 'behance.net/lisakim',
    },
    // New profiles with additional headshots
    {
        fullName: 'Victoria Chen',
        jobTitle: 'Business Consultant',
        email: 'victoria.c@email.com',
        phone: '+1 (555) 789-0123',
        location: 'Boston, MA',
        website: 'victoriachen.consulting',
        linkedin: 'linkedin.com/in/victoriachen',
        summary: 'Strategic Business Consultant with 9+ years helping Fortune 500 companies optimize operations and drive growth. MBA from Harvard Business School.',
        profileImage: '/Img/victoria-chen.png',
    },
    {
        fullName: 'Rachel Kim',
        jobTitle: 'Content Strategist',
        email: 'rachel.k@email.com',
        phone: '+1 (555) 890-1234',
        location: 'Portland, OR',
        website: 'rachelkim.content',
        linkedin: 'linkedin.com/in/rachelkim',
        summary: 'Creative Content Strategist with 5+ years developing engaging brand narratives and content marketing campaigns. Expert in SEO and social media strategy.',
        profileImage: '/Img/rachel-kim.png',
    },
    {
        fullName: 'Amanda Wilson',
        jobTitle: 'Financial Analyst',
        email: 'amanda.w@email.com',
        phone: '+1 (555) 901-2345',
        location: 'Denver, CO',
        website: 'amandawilson.finance',
        linkedin: 'linkedin.com/in/amandawilson',
        summary: 'Detail-oriented Financial Analyst with 6+ years in investment banking and corporate finance. CFA charterholder with expertise in financial modeling.',
        profileImage: '/Img/amanda-wilson.png',
    },
    {
        fullName: 'Jessica Taylor',
        jobTitle: 'HR Director',
        email: 'jessica.t@email.com',
        phone: '+1 (555) 012-3456',
        location: 'Atlanta, GA',
        website: 'jessicataylor.hr',
        linkedin: 'linkedin.com/in/jessicataylor',
        summary: 'People-focused HR Director with 8+ years building inclusive workplace cultures and talent acquisition strategies. SHRM-SCP certified professional.',
        profileImage: '/Img/jessica-taylor.png',
    },
    {
        fullName: 'Alex Parker',
        jobTitle: 'Legal Counsel',
        email: 'alex.p@email.com',
        phone: '+1 (555) 123-4567',
        location: 'Washington, DC',
        website: 'alexparker.law',
        linkedin: 'linkedin.com/in/alexparker',
        summary: 'Corporate Legal Counsel with 7+ years specializing in M&A transactions and regulatory compliance. JD from Georgetown Law with top honors.',
        profileImage: '/Img/alex-parker.png',
    },
    {
        fullName: 'Nathan Brooks',
        jobTitle: 'Creative Director',
        email: 'nathan.b@email.com',
        phone: '+1 (555) 234-5679',
        location: 'Miami, FL',
        website: 'nathanbrooks.creative',
        linkedin: 'linkedin.com/in/nathanbrooks',
        summary: 'Visionary Creative Director with 10+ years leading award-winning campaigns for global brands. Expert in brand strategy and visual storytelling.',
        profileImage: '/Img/nathan-brooks.png',
    },
    {
        fullName: 'Ryan Cooper',
        jobTitle: 'Project Manager',
        email: 'ryan.c@email.com',
        phone: '+1 (555) 345-6780',
        location: 'Phoenix, AZ',
        website: 'ryancooper.pm',
        linkedin: 'linkedin.com/in/ryancooper',
        summary: 'PMP-certified Project Manager with 6+ years delivering complex IT projects on time and under budget. Agile and Scrum Master certified.',
        profileImage: '/Img/ryan-cooper.png',
    },
];

/**
 * Get sample profile by index (0-12)
 */
export const getSampleProfile = (index: number) => sampleProfiles[index % sampleProfiles.length];

/**
 * Full sample resume data for template previews and prefilling.
 * This is the SINGLE SOURCE OF TRUTH - do not duplicate elsewhere.
 */
export const sampleResumeData: ResumeData = {
    personalInfo: {
        fullName: sampleProfiles[0].fullName,
        jobTitle: sampleProfiles[0].jobTitle,
        email: sampleProfiles[0].email,
        phone: sampleProfiles[0].phone,
        location: sampleProfiles[0].location,
        website: sampleProfiles[0].website,
        linkedin: sampleProfiles[0].linkedin,
        summary: sampleProfiles[0].summary,
        profileImage: sampleProfiles[0].profileImage,
        imageShape: 'circle',
        nationality: '',
        idType: '',
        idNumber: '',
        twitter: '',
        github: '',
        dribbble: sampleProfiles[0].dribbble || '',
        behance: '',
        instagram: '',
    },
    experience: [
        {
            id: 'exp-1',
            title: 'Lead UX Designer',
            company: 'DesignHub Agency',
            city: 'New York',
            country: 'USA',
            startDate: '2021-01',
            endDate: '',
            current: true,
            description: '• Lead a team of 5 designers creating user-centered digital products\n• Increased user engagement by 40% through redesign initiatives\n• Established design system used across all projects',
        },
        {
            id: 'exp-2',
            title: 'Senior UX Designer',
            company: 'TechStart Inc',
            city: 'San Francisco',
            country: 'USA',
            startDate: '2019-03',
            endDate: '2021-01',
            current: false,
            description: '• Designed mobile applications for iOS and Android platforms\n• Conducted user research and usability testing\n• Collaborated with engineers to deliver features on time',
        },
        {
            id: 'exp-3',
            title: 'UX Designer',
            company: 'Creative Solutions',
            city: 'Boston',
            country: 'USA',
            startDate: '2017-06',
            endDate: '2019-03',
            current: false,
            description: '• Created wireframes and prototypes for web applications\n• Improved product usability scores by 35%',
        },
    ],
    education: [
        {
            id: 'edu-1',
            school: 'Rhode Island School of Design',
            degree: 'Bachelor of Fine Arts in Graphic Design',
            city: 'Providence',
            country: 'USA',
            startDate: '2013-09',
            endDate: '2017-05',
            current: false,
            description: '',
        },
    ],
    skills: [
        { id: 'skill-1', name: 'Figma', level: 5 },
        { id: 'skill-2', name: 'Sketch', level: 5 },
        { id: 'skill-3', name: 'Adobe XD', level: 4 },
        { id: 'skill-4', name: 'Prototyping', level: 5 },
        { id: 'skill-5', name: 'User Research', level: 4 },
    ],
    languages: [
        { id: 'lang-1', name: 'English', proficiency: 'native', level: 100 },
        { id: 'lang-2', name: 'Spanish', proficiency: 'fluent', level: 85 },
    ],
    interests: [
        { id: 'int-1', name: 'Photography' },
        { id: 'int-2', name: 'Hiking' },
        { id: 'int-3', name: 'Travel' },
    ],
    strengths: [
        { id: 'str-1', name: 'Leadership', level: 90 },
        { id: 'str-2', name: 'Communication', level: 95 },
        { id: 'str-3', name: 'Problem Solving', level: 85 },
    ],
    certifications: [
        { id: 'cert-1', name: 'Google UX Design Certificate', issuer: 'Google', date: '2022-06' },
    ],
    awards: [],
    references: [],
    background: {
        type: 'solid',
        color: '#ffffff',
        pattern: 'none',
        patternOpacity: 10,
    },
    fonts: {
        heading: 'Inter',
        body: 'Inter',
        size: 'medium',
    },
    customThemeColor: '',
};

/**
 * Generate full sample resume data with a specific profile (0-5)
 * Each template can use a different profile for variety
 */
export const getSampleResumeDataWithProfile = (profileIndex: number): ResumeData => {
    const profile = sampleProfiles[profileIndex % sampleProfiles.length];
    return {
        ...sampleResumeData,
        personalInfo: {
            ...sampleResumeData.personalInfo,
            fullName: profile.fullName,
            jobTitle: profile.jobTitle,
            email: profile.email,
            phone: profile.phone,
            location: profile.location,
            website: profile.website,
            linkedin: profile.linkedin,
            summary: profile.summary,
            profileImage: profile.profileImage,
            twitter: (profile as typeof sampleProfiles[2]).twitter || '',
            github: (profile as typeof sampleProfiles[1]).github || '',
            dribbble: (profile as typeof sampleProfiles[0]).dribbble || '',
            behance: (profile as typeof sampleProfiles[5]).behance || '',
        },
    };
};

/**
 * Simplified sample data for template preview thumbnails.
 * Derived from sampleResumeData to maintain consistency.
 */
export const samplePreviewData = {
    name: sampleResumeData.personalInfo.fullName,
    title: sampleResumeData.personalInfo.jobTitle,
    email: sampleResumeData.personalInfo.email,
    phone: sampleResumeData.personalInfo.phone,
    location: sampleResumeData.personalInfo.location,
    website: sampleResumeData.personalInfo.website,
    headshot: sampleResumeData.personalInfo.profileImage,
    summary: sampleResumeData.personalInfo.summary,
    experience: sampleResumeData.experience.map(exp => ({
        company: exp.company,
        role: exp.title,
        years: exp.current
            ? `${exp.startDate.split('-')[0]}-Present`
            : `${exp.startDate.split('-')[0]}-${exp.endDate.split('-')[0]}`,
    })),
    education: {
        school: sampleResumeData.education[0]?.school || '',
        degree: sampleResumeData.education[0]?.degree || '',
    },
    skills: sampleResumeData.skills.map(s => s.name),
    languages: ['English - Native', 'Spanish - Fluent'],
    certifications: ['Google UX Design Certificate', 'Nielsen Norman UX Certification'],
};
