
import fs from 'fs';
import path from 'path';
import { renderSidebarNarrowYellow } from '../src/templates/pdf/sidebar-narrow-yellow';
import { PdfResumeData, PdfTheme } from '../src/types/pdf';

const outputDir = path.join(__dirname, '../../artifacts');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const mockData: PdfResumeData = {
    personalInfo: {
        fullName: 'John Doe',
        jobTitle: 'Software Engineer',
        email: 'john@example.com',
        phone: '123-456-7890',
        location: 'New York, NY',
        summary: 'Experienced software engineer with a focus on web development.',
        website: 'example.com',
        linkedin: 'linkedin.com/in/johndoe',
        profileImage: '',
        imageShape: 'circle',
        nationality: '',
        idType: '',
        idNumber: ''
    },
    experience: [],
    education: [],
    skills: [{ id: '1', name: 'TypeScript', level: 5 }, { id: '2', name: 'React', level: 4 }],
    languages: [],
    interests: [],
    strengths: [],
    certifications: [],
    awards: [],
    references: [],
    customFields: [],
    background: {
        type: 'solid',
        color: '#ffffff',
        pattern: 'none',
        patternOpacity: 0
    },
    fonts: {
        heading: 'Roboto',
        body: 'Roboto',
        size: 'medium'
    }
};

// Test with Red Theme
const redTheme: PdfTheme = {
    name: 'Red',
    primary: '#ef4444', // Red-500
    secondary: '#f87171',
    accent: '#fee2e2',
    text: '#1f2937',
    background: '#ffffff',
    heading: '#000000'
};

// Test with Dark Blue Theme (to test contrast)
const blueTheme: PdfTheme = {
    name: 'Blue',
    primary: '#1e3a8a', // Blue-900
    secondary: '#1e40af',
    accent: '#dbeafe',
    text: '#1f2937',
    background: '#ffffff',
    heading: '#000000'
};

// Generate Red
const htmlRed = renderSidebarNarrowYellow(mockData, redTheme);
fs.writeFileSync(path.join(outputDir, 'sidebar_narrow_yellow_red.html'), htmlRed);
console.log('Generated sidebar_narrow_yellow_red.html');

// Generate Blue
const htmlBlue = renderSidebarNarrowYellow(mockData, blueTheme);
fs.writeFileSync(path.join(outputDir, 'sidebar_narrow_yellow_blue.html'), htmlBlue);
console.log('Generated sidebar_narrow_yellow_blue.html');

// Simple assertion
if (htmlRed.includes('background-color: #ef4444')) {
    console.log('PASS: Red theme color found in HTML.');
} else {
    console.error('FAIL: Red theme color NOT found in HTML.');
}

if (htmlBlue.includes('background-color: #1e3a8a')) {
    console.log('PASS: Blue theme color found in HTML.');
} else {
    console.error('FAIL: Blue theme color NOT found in HTML.');
}

// Check contrast
// Red is "dark-ish" but might result in white text? #ef4444 is mid-brightness.
// Blue #1e3a8a is definitely dark. Text should be white (#ffffff).

if (htmlBlue.includes('color: #ffffff')) { // Checking for white text in sidebar
    console.log('PASS: Blue theme triggered white text contrast.');
} else {
    console.log('WARN: Blue theme did not trigger white text contrast (might supply hex code directly if logic differs).');
}
