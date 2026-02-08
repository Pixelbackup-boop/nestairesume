
import fs from 'fs';
import path from 'path';
import { templates } from '../src/templates/pdf';
import { PdfResumeData, PdfTheme } from '../src/types/pdf';

const OUTPUT_DIR = path.resolve(__dirname, '../../artifacts');

if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const mockData: PdfResumeData = {
    fonts: {
        heading: 'Inter',
        body: 'Inter',
        size: 'medium'
    },
    personalInfo: {
        fullName: "John Doe",
        jobTitle: "Senior Software Engineer",
        email: "john.doe@example.com",
        phone: "+1 234 567 890",
        location: "San Francisco, CA",
        summary: "Passionate software engineer with over 8 years of experience in building scalable web applications and distributed systems.",
        website: "johndoe.dev",
        linkedin: "linkedin.com/in/johndoe",
        github: "github.com/johndoe",
        profileImage: "",
        imageShape: "square",
        nationality: "American",
        idType: "passport",
        idNumber: "A12345678"
    },
    experience: [
        {
            id: "exp1",
            title: "Senior Full Stack Developer",
            company: "Tech Innovators Inc.",
            city: "San Francisco, CA",
            startDate: "2020-03-01",
            current: true,
            endDate: "",
            country: "USA",
            description: "Leading the frontend team in migrating legacy monolith to microservices architecture."
        }
    ],
    education: [
        {
            id: "edu1",
            degree: "Bachelor of Science in Computer Science",
            school: "University of California, Berkeley",
            city: "Berkeley, CA",
            startDate: "2013-08-01",
            endDate: "2017-05-31",
            country: "USA",
            current: false,
            description: "Graduated with Honors. GPA 3.9."
        }
    ],
    skills: [
        { id: "sk1", name: "JavaScript/TypeScript", level: 5 },
        { id: "sk2", name: "React/Next.js", level: 5 }
    ],
    languages: [],
    interests: [],
    certifications: [],
    awards: [],
    strengths: [],
    references: [],
    customFields: [],
    background: {
        type: 'solid',
        color: '#ffffff',
        pattern: 'none',
        patternOpacity: 0
    }
};

const mockTheme: PdfTheme = {
    name: "Modern Blue",
    primary: '#2563eb',
    secondary: '#1e40af',
    accent: '#facc15',
    text: '#1f2937',
    background: '#ffffff',
    heading: 'Inter'
};

const templatesToVerify = [
    'header-diagonal-yellow',
    'header-geometric',
    'header-icon-sections',
    'header-ribbon-yellow',
    'sidebar-monogram',
    'sidebar-narrow-yellow'
];

const sizes = ['small', 'medium', 'large'] as const;

console.log('Verifying Batch 2B templates with font scaling...');

templatesToVerify.forEach(templateId => {
    const render = templates[templateId];
    if (!render) {
        console.error(`Template ${templateId} not found!`);
        return;
    }

    console.log(`Generating PDFs for ${templateId}...`);

    sizes.forEach(size => {
        const data = {
            ...mockData,
            fonts: { ...mockData.fonts, size }
        } as PdfResumeData;

        try {
            const html = render(data, mockTheme);
            const filename = `${templateId}_${size}.html`;
            fs.writeFileSync(path.join(OUTPUT_DIR, filename), html);
            console.log(`  - Standard HTML: ${filename}`);

        } catch (err) {
            console.error(`  - Error generating ${size} for ${templateId}:`, err);
        }
    });
});

console.log('Verification HTML files written to artifacts directory.');
