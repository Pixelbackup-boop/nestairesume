
import puppeteer from 'puppeteer';
import * as path from 'path';
import * as fs from 'fs';
import { PdfResumeData, PdfTheme } from '../types/pdf';
import { renderClassicProfessional } from '../templates/pdf/classic-professional';
import { renderMinimalBlueSections } from '../templates/pdf/minimal-blue-sections';
import { renderMinimalLabelsTan } from '../templates/pdf/minimal-labels-tan';
import { renderMinimalTimeline } from '../templates/pdf/minimal-timeline';

const OUTPUT_DIR = path.resolve(__dirname, '../../../../artifacts');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const mockData: PdfResumeData = {
    personalInfo: {
        fullName: "John Doe",
        email: "john.doe@example.com",
        phone: "+1 234 567 890",
        location: "New York, NY",
        website: "johndoe.com",
        linkedin: "linkedin.com/in/johndoe",
        jobTitle: "Senior Software Engineer",
        summary: "Experienced software engineer with a focus on web development.",
        profileImage: "",
        imageShape: "circle",
        nationality: "American",
        idType: "passport",
        idNumber: "A12345678",
    },
    experience: [
        {
            id: "1",
            title: "Senior Developer",
            company: "Tech Corp",
            city: "San Francisco",
            country: "USA",
            startDate: "2020-01-01",
            endDate: "Present",
            current: true,
            description: "Leading frontend development."
        }
    ],
    education: [
        {
            id: "1",
            school: "University of Tech",
            degree: "B.S. Computer Science",
            city: "Boston",
            country: "USA",
            startDate: "2016-09-01",
            endDate: "2020-05-01",
            current: false,
            description: "Graduated with honors."
        }
    ],
    skills: [
        { id: "1", name: "React", level: 5 },
        { id: "2", name: "TypeScript", level: 4 }
    ],
    languages: [
        { id: "1", name: "English", proficiency: "native", level: 5 }
    ],
    interests: [],
    strengths: [],
    certifications: [],
    awards: [],
    references: [],
    customFields: [],
    background: {
        type: "solid",
        color: "#ffffff",
        pattern: "none",
        patternOpacity: 0
    },
    fonts: {
        heading: "Roboto",
        body: "Open Sans",
        size: "medium" // Will be overridden
    }
};

const mockTheme: PdfTheme = {
    name: 'default',
    primary: '#000000',
    secondary: '#333333',
    accent: '#3b82f6',
    text: '#1f2937',
    background: '#ffffff',
    heading: 'Roboto'
};

const templates = {
    'classic-professional': renderClassicProfessional,
    'minimal-blue-sections': renderMinimalBlueSections,
    'minimal-labels-tan': renderMinimalLabelsTan,
    'minimal-timeline': renderMinimalTimeline,
};

async function verifyTemplates() {
    const browser = await puppeteer.launch({ headless: true });

    for (const [name, render] of Object.entries(templates)) {
        console.log(`Verifying ${name}...`);

        for (const size of ['small', 'medium', 'large'] as const) {
            const data = { ...mockData, fonts: { ...mockData.fonts, size } };
            const html = render(data, mockTheme, undefined, 'en');

            const page = await browser.newPage();
            await page.setContent(html, { waitUntil: 'networkidle0' });

            const pdfPath = path.join(OUTPUT_DIR, `${name}_${size}.pdf`);
            await page.pdf({
                path: pdfPath,
                format: 'A4',
                printBackground: true,
                margin: { top: 0, right: 0, bottom: 0, left: 0 }
            });

            console.log(`Generated ${pdfPath}`);
            await page.close();
        }
    }

    await browser.close();
}

verifyTemplates().catch(console.error);
