"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const classic_professional_1 = require("../templates/pdf/classic-professional");
const minimal_blue_sections_1 = require("../templates/pdf/minimal-blue-sections");
const minimal_labels_tan_1 = require("../templates/pdf/minimal-labels-tan");
const minimal_timeline_1 = require("../templates/pdf/minimal-timeline");
const OUTPUT_DIR = path.resolve(__dirname, '../../../../artifacts');
// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}
const mockData = {
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
const mockTheme = {
    name: 'default',
    primary: '#000000',
    secondary: '#333333',
    accent: '#3b82f6',
    text: '#1f2937',
    background: '#ffffff',
    heading: 'Roboto'
};
const templates = {
    'classic-professional': classic_professional_1.renderClassicProfessional,
    'minimal-blue-sections': minimal_blue_sections_1.renderMinimalBlueSections,
    'minimal-labels-tan': minimal_labels_tan_1.renderMinimalLabelsTan,
    'minimal-timeline': minimal_timeline_1.renderMinimalTimeline,
};
async function verifyTemplates() {
    const browser = await puppeteer_1.default.launch({ headless: true });
    for (const [name, render] of Object.entries(templates)) {
        console.log(`Verifying ${name}...`);
        for (const size of ['small', 'medium', 'large']) {
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
//# sourceMappingURL=verify_batch_1.js.map