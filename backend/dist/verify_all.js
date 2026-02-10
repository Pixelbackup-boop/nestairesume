"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./templates/pdf/index");
// Comprehensive Dummy Data
const dummyData = {
    personalInfo: {
        fullName: 'John Doe',
        jobTitle: 'Software Engineer',
        email: 'john@example.com',
        phone: '+1 234 567 890',
        location: 'New York, NY',
        website: 'johndoe.com',
        linkedin: 'linkedin.com/in/johndoe',
        github: 'github.com/johndoe',
        summary: 'Experienced software engineer with a passion for building scalable web applications.',
        profileImage: 'https://via.placeholder.com/150',
        imageShape: 'circle',
        nationality: 'USA',
        idType: 'passport',
        idNumber: 'A12345678'
    },
    experience: [
        {
            id: '1',
            title: 'Senior Developer',
            company: 'Tech Corp',
            startDate: '2020',
            endDate: 'Present',
            current: true,
            city: 'San Francisco, CA',
            country: 'USA',
            description: 'Leading frontend development teams and architecting modern web solutions.',
        },
        {
            id: '2',
            title: 'Web Developer',
            company: 'Web Solutions Inc',
            startDate: '2018',
            endDate: '2020',
            current: false,
            city: 'New York, NY',
            country: 'USA',
            description: 'Full stack development using React and Node.js.',
        }
    ],
    education: [
        {
            id: '1',
            school: 'University of Tech',
            degree: 'BS Computer Science',
            city: 'Boston, MA',
            country: 'USA',
            startDate: '2014',
            endDate: '2018',
            current: false,
            description: 'Graduated with Honors'
        }
    ],
    skills: [
        { id: '1', name: 'JavaScript', level: 5 },
        { id: '2', name: 'TypeScript', level: 4 },
        { id: '3', name: 'React', level: 5 },
        { id: '4', name: 'Node.js', level: 4 },
    ],
    languages: [
        { id: '1', name: 'English', proficiency: 'native', level: 5 },
        { id: '2', name: 'Spanish', proficiency: 'intermediate', level: 3 },
    ],
    interests: [
        { id: '1', name: 'Coding' },
        { id: '2', name: 'Hiking' },
    ],
    strengths: [
        { id: '1', name: 'Leadership', level: 5 },
        { id: '2', name: 'Problem Solving', level: 5 },
    ],
    certifications: [
        { id: '1', name: 'AWS Certified Solutions Architect', issuer: 'Amazon', date: '2021' },
    ],
    awards: [],
    references: [],
    customFields: [],
    customThemeColor: '#3b82f6',
    fonts: {
        heading: 'Roboto',
        body: 'Open Sans',
        size: 'medium'
    },
    background: {
        type: 'solid',
        color: '#ffffff',
        pattern: 'none',
        patternOpacity: 10
    }
};
const theme = {
    name: 'Default',
    primary: '#3b82f6',
    secondary: '#60a5fa',
    accent: '#dbeafe',
    text: '#1f2937',
    background: '#ffffff',
    heading: '#111827',
};
async function verifyAllTemplates() {
    console.log('Starting verification of all templates...');
    const templateIds = Object.keys(index_1.templates);
    let successCount = 0;
    let failCount = 0;
    for (const id of templateIds) {
        try {
            const renderer = index_1.templates[id];
            const html = renderer(dummyData, theme);
            if (!html || html.length < 100) {
                throw new Error('Generated HTML is empty or too short');
            }
            console.log(`✅ [PASS] ${id}`);
            successCount++;
        }
        catch (error) {
            console.error(`❌ [FAIL] ${id}:`, error);
            failCount++;
        }
    }
    console.log('\nVerification Complete.');
    console.log(`Total: ${templateIds.length}`);
    console.log(`Passed: ${successCount}`);
    console.log(`Failed: ${failCount}`);
    if (failCount > 0) {
        process.exit(1);
    }
}
verifyAllTemplates();
//# sourceMappingURL=verify_all.js.map