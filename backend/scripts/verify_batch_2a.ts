
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
        summary: "Passionate software engineer with over 8 years of experience in building scalable web applications and distributed systems. Expert in TypeScript, Node.js, and React. Proven track record of delivering high-quality software on time and within budget.",
        website: "johndoe.dev",
        linkedin: "linkedin.com/in/johndoe",
        github: "github.com/johndoe",
        x: "x.com/johndoe",
        instagram: "instagram.com/johndoe",
        profileImage: "", // Optional but required by type? Error says missing.
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
            endDate: "", // Required by type
            country: "USA",
            description: "Leading the frontend team in migrating legacy monolith to microservices architecture using Next.js and Node.js. Improved application performance by 40% through code splitting and lazy loading techniques. Mentoring junior developers and conducting code reviews to ensure code quality and best practices."
        },
        {
            id: "exp2",
            title: "Software Engineer",
            company: "Web Solutions LLC",
            city: "New York, NY",
            startDate: "2017-06-01",
            endDate: "2020-02-28",
            country: "USA",
            current: false,
            description: "Developed and maintained multiple client websites using React and Redux. Collaborated with designers and product managers to define project requirements and deliverables. Implemented responsive designs ensuring compatibility across various devices and browsers."
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
        { id: "sk2", name: "React/Next.js", level: 5 },
        { id: "sk3", name: "Node.js/Express", level: 4 },
        { id: "sk4", name: "PostgreSQL", level: 4 },
        { id: "sk5", name: "AWS", level: 3 },
        { id: "sk6", name: "Docker/Kubernetes", level: 3 }
    ],
    languages: [
        { id: "lang1", name: "English", proficiency: "native", level: 5 },
        { id: "lang2", name: "Spanish", proficiency: "intermediate", level: 3 }
    ],
    interests: [
        { id: "int1", name: "Open Source Contributing" },
        { id: "int2", name: "Hiking" },
        { id: "int3", name: "Photography" },
        { id: "int4", name: "Technical Writing" }
    ],
    certifications: [
        { id: "cert1", name: "AWS Certified Solutions Architect", issuer: "Amazon Web Services", date: "2022-01-15" }
    ],
    awards: [
        { id: "awd1", title: "Employee of the Month", issuer: "Tech Innovators Inc.", date: "2021-08-01" }
    ],
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
    primary: '#2563eb', // Blue-600
    secondary: '#1e40af',
    accent: '#facc15',
    text: '#1f2937',    // Gray-800
    background: '#ffffff',
    heading: 'Inter'
};

const templatesToVerify = [
    'sidebar-dark-navy',
    'header-blue-clean',
    'header-dark-banner',
    'header-dark-box',
    'header-dark',
    'header-decorative'
];

const sizes = ['small', 'medium', 'large'] as const;

console.log('Verifying Batch 2A templates with font scaling...');

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
        };

        try {
            const html = render(data, mockTheme);
            const filename = `${templateId}_${size}.html`; // Saving as HTML for quick inspection, user can convert to PDF if needed, but HTML is good enough to verify font sizes in code
            const content = html;

            // Actually I should generate PDF but HTML is easier to inspect for font-size styles.
            // Let's just save HTML files to artifacts.
            fs.writeFileSync(path.join(OUTPUT_DIR, filename), content);
            console.log(`  - Standard HTML: ${filename}`);

        } catch (err) {
            console.error(`  - Error generating ${size} for ${templateId}:`, err);
        }
    });
});

console.log('Verification HTML files written to artifacts directory.');
