
import fs from 'fs';
import path from 'path';
import { renderHeaderDarkBanner } from '../src/templates/pdf/header-dark-banner';
import { renderHeaderDark } from '../src/templates/pdf/header-dark';
import { PdfResumeData, PdfTheme } from '../src/types/pdf';

const OUTPUT_DIR = path.resolve(__dirname, '../../artifacts/verification');

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
        email: "john@example.com",
        phone: "+1 234 567 890",
        location: "New York, NY",
        summary: "Experienced developer...",
        website: "example.com",
        linkedin: "linkedin.com/in/johndoe",
        profileImage: "",
        imageShape: "circle",
        nationality: "USA",
        idType: "passport",
        idNumber: "12345678"
    },
    experience: [
        {
            id: "1",
            title: "Software Engineer",
            company: "Tech Corp",
            city: "San Francisco",
            country: "USA",
            startDate: "2020-01-01",
            endDate: "2023-01-01",
            current: false,
            description: "Developed things.\n- Point 1\n- Point 2"
        },
        {
            id: "2",
            title: "Junior Developer",
            company: "Startup Inc",
            city: "New York",
            country: "USA",
            startDate: "2018-01-01",
            endDate: "2019-12-31",
            current: false,
            description: "Learned things."
        }
    ],
    education: [
        {
            id: "edu1",
            degree: "BS Computer Science",
            school: "University of Tech",
            city: "Boston",
            country: "USA",
            startDate: "2014-09-01",
            endDate: "2018-05-01",
            current: false,
            description: "GPA 3.8"
        }
    ],
    skills: [
        { id: "s1", name: "TypeScript", level: 5 },
        { id: "s2", name: "React", level: 4 }
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
    name: "Custom",
    primary: "#000000",
    secondary: "#abcdef",
    accent: "#ff0000",
    text: "#333333",
    background: "#ffffff",
    heading: "Inter"
};

const verifyTemplate = (name: string, renderFn: any) => {
    console.log(`Verifying ${name}...`);
    try {
        const html = renderFn(mockData, mockTheme);
        const hasResumeSection = html.includes('class="resume-section"');
        const hasResumeEntry = html.includes('class="resume-entry"');
        let hasErrors = false;

        console.log(`  - Has resume-section: ${hasResumeSection ? 'PASS' : 'FAIL'}`);
        console.log(`  - Has resume-entry: ${hasResumeEntry ? 'PASS' : 'FAIL'}`);

        if (name === 'header-dark-banner') {
            // Check for Table Layout
            const hasTableLayout = html.includes('<table') && html.includes('<td');
            console.log(`  - Has table layout: ${hasTableLayout ? 'PASS' : 'FAIL'}`);
            if (!hasTableLayout) {
                hasErrors = true;
            }
        }

        fs.writeFileSync(path.join(OUTPUT_DIR, `${name}.html`), html);

        if (!hasResumeSection || !hasResumeEntry || hasErrors) {
            console.error(`  FAILURE: Missing required print-safe classes or layout in ${name}`);
            process.exit(1);
        }

    } catch (e) {
        console.error(`  Error rendering ${name}:`, e);
        process.exit(1);
    }
};

verifyTemplate('header-dark-banner', renderHeaderDarkBanner);
verifyTemplate('header-dark', renderHeaderDark);

console.log('Verification Success!');
