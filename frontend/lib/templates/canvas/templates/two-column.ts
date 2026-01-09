// Canvas Template: Two Column
import type { CanvasTemplate } from '@/store/useCanvasStore';
import { createText, createShape, createIcon } from '../helpers';

export const twoColumnTemplate: CanvasTemplate = {
    id: 'two-column',
    name: 'Two Column',
    thumbnail: '/templates/two-column.png',
    category: 'professional',
    backgroundColor: '#ffffff',
    elements: [
        // Header bar
        createShape({
            x: 0,
            y: 0,
            width: 595,
            height: 120,
            fill: '#2c3e50',
        }),

        // Name and title
        createText({
            text: 'MICHAEL THOMPSON',
            x: 40,
            y: 35,
            width: 515,
            fontSize: 28,
            fontWeight: 'bold',
            fill: '#ffffff',
            letterSpacing: 2,
        }),
        createText({
            text: 'Data Scientist | Machine Learning Engineer',
            x: 40,
            y: 75,
            width: 515,
            fontSize: 13,
            fill: '#bdc3c7',
        }),

        // Contact info in header
        createIcon({ iconName: 'Email', x: 40, y: 98, width: 14, height: 14, fill: '#00dc82' }),
        createText({ text: 'm.thompson@email.com', x: 60, y: 98, width: 150, fontSize: 9, fill: '#ecf0f1' }),
        createIcon({ iconName: 'Phone', x: 210, y: 98, width: 14, height: 14, fill: '#00dc82' }),
        createText({ text: '+1 (555) 789-0123', x: 230, y: 98, width: 120, fontSize: 9, fill: '#ecf0f1' }),
        createIcon({ iconName: 'LinkedIn', x: 350, y: 98, width: 14, height: 14, fill: '#00dc82' }),
        createText({ text: 'linkedin.com/in/mthompson', x: 370, y: 98, width: 170, fontSize: 9, fill: '#ecf0f1' }),

        // Left column - Summary
        createText({ text: 'PROFESSIONAL SUMMARY', x: 40, y: 145, width: 250, fontSize: 11, fontWeight: 'bold', fill: '#2c3e50', letterSpacing: 1 }),
        createShape({ x: 40, y: 162, width: 40, height: 3, fill: '#00dc82' }),
        createText({
            text: 'Data Scientist with 5+ years specializing in ML and predictive analytics. Built models generating $20M+ annual value. Expert in Python, TensorFlow, and cloud ML platforms.',
            x: 40, y: 175, width: 250, height: 65, fontSize: 9, fill: '#555555', lineHeight: 1.6,
        }),

        // Experience (left)
        createText({ text: 'EXPERIENCE', x: 40, y: 260, width: 250, fontSize: 11, fontWeight: 'bold', fill: '#2c3e50', letterSpacing: 1 }),
        createShape({ x: 40, y: 277, width: 40, height: 3, fill: '#00dc82' }),

        // Job 1
        createText({ text: 'Senior Data Scientist', x: 40, y: 292, width: 250, fontSize: 11, fontWeight: 'bold', fill: '#333333' }),
        createText({ text: 'Amazon  |  2021 - Present', x: 40, y: 308, width: 250, fontSize: 9, fill: '#00dc82' }),
        createText({
            text: '• Built recommendation engine improving CTR by 25%\n• Led ML infrastructure modernization\n• Mentored team of 4 junior data scientists',
            x: 40, y: 325, width: 250, height: 50, fontSize: 9, fill: '#555555', lineHeight: 1.6,
        }),

        // Job 2
        createText({ text: 'Data Scientist', x: 40, y: 390, width: 250, fontSize: 11, fontWeight: 'bold', fill: '#333333' }),
        createText({ text: 'Netflix  |  2019 - 2021', x: 40, y: 406, width: 250, fontSize: 9, fill: '#00dc82' }),
        createText({
            text: '• Developed content recommendation models\n• Reduced customer churn by 15%\n• Automated reporting saving 20 hrs/week',
            x: 40, y: 423, width: 250, height: 50, fontSize: 9, fill: '#555555', lineHeight: 1.6,
        }),

        // Job 3
        createText({ text: 'Junior Data Scientist', x: 40, y: 488, width: 250, fontSize: 11, fontWeight: 'bold', fill: '#333333' }),
        createText({ text: 'IBM  |  2018 - 2019', x: 40, y: 504, width: 250, fontSize: 9, fill: '#00dc82' }),
        createText({
            text: '• Created NLP models for sentiment analysis\n• Built dashboards for C-suite executives\n• Contributed to open-source ML tools',
            x: 40, y: 521, width: 250, height: 50, fontSize: 9, fill: '#555555', lineHeight: 1.6,
        }),

        // Right column divider
        createShape({ x: 307, y: 140, width: 1, height: 680, fill: '#e0e0e0' }),

        // Right column - Education
        createText({ text: 'EDUCATION', x: 330, y: 145, width: 230, fontSize: 11, fontWeight: 'bold', fill: '#2c3e50', letterSpacing: 1 }),
        createShape({ x: 330, y: 162, width: 40, height: 3, fill: '#00dc82' }),
        createText({ text: 'Ph.D. Computer Science (ML)', x: 330, y: 177, width: 230, fontSize: 10, fontWeight: 'bold', fill: '#333333' }),
        createText({ text: 'MIT  •  2015 - 2018', x: 330, y: 193, width: 230, fontSize: 9, fill: '#888888' }),
        createText({ text: 'MS Computer Science', x: 330, y: 218, width: 230, fontSize: 10, fontWeight: 'bold', fill: '#333333' }),
        createText({ text: 'Carnegie Mellon  •  2013 - 2015', x: 330, y: 234, width: 230, fontSize: 9, fill: '#888888' }),
        createText({ text: 'BS Mathematics', x: 330, y: 259, width: 230, fontSize: 10, fontWeight: 'bold', fill: '#333333' }),
        createText({ text: 'UCLA  •  2009 - 2013', x: 330, y: 275, width: 230, fontSize: 9, fill: '#888888' }),

        // Technical Skills
        createText({ text: 'TECHNICAL SKILLS', x: 330, y: 315, width: 230, fontSize: 11, fontWeight: 'bold', fill: '#2c3e50', letterSpacing: 1 }),
        createShape({ x: 330, y: 332, width: 40, height: 3, fill: '#00dc82' }),
        createText({ text: 'Languages', x: 330, y: 347, width: 80, fontSize: 9, fontWeight: 'bold', fill: '#333333' }),
        createText({ text: 'Python, R, SQL, Scala', x: 330, y: 362, width: 230, fontSize: 9, fill: '#555555' }),
        createText({ text: 'ML Frameworks', x: 330, y: 385, width: 80, fontSize: 9, fontWeight: 'bold', fill: '#333333' }),
        createText({ text: 'TensorFlow, PyTorch, scikit-learn', x: 330, y: 400, width: 230, fontSize: 9, fill: '#555555' }),
        createText({ text: 'Cloud & Tools', x: 330, y: 423, width: 80, fontSize: 9, fontWeight: 'bold', fill: '#333333' }),
        createText({ text: 'AWS SageMaker, GCP, Spark, Airflow', x: 330, y: 438, width: 230, fontSize: 9, fill: '#555555' }),

        // Certifications
        createText({ text: 'CERTIFICATIONS', x: 330, y: 480, width: 230, fontSize: 11, fontWeight: 'bold', fill: '#2c3e50', letterSpacing: 1 }),
        createShape({ x: 330, y: 497, width: 40, height: 3, fill: '#00dc82' }),
        createText({
            text: '• AWS ML Specialty (2023)\n• Google Cloud Professional ML (2022)\n• TensorFlow Developer Certificate (2021)',
            x: 330, y: 512, width: 230, height: 50, fontSize: 9, fill: '#555555', lineHeight: 1.6,
        }),

        // Publications
        createText({ text: 'PUBLICATIONS', x: 330, y: 580, width: 230, fontSize: 11, fontWeight: 'bold', fill: '#2c3e50', letterSpacing: 1 }),
        createShape({ x: 330, y: 597, width: 40, height: 3, fill: '#00dc82' }),
        createText({
            text: '• "Deep Learning for Recommendations" - NeurIPS 2022\n• "Scalable ML Pipelines" - KDD 2021\n• 500+ citations on Google Scholar',
            x: 330, y: 612, width: 230, height: 50, fontSize: 9, fill: '#555555', lineHeight: 1.6,
        }),

        // Projects
        createText({ text: 'KEY PROJECTS', x: 330, y: 680, width: 230, fontSize: 11, fontWeight: 'bold', fill: '#2c3e50', letterSpacing: 1 }),
        createShape({ x: 330, y: 697, width: 40, height: 3, fill: '#00dc82' }),
        createText({
            text: '• Real-time fraud detection (99.2% accuracy)\n• Customer lifetime value prediction\n• Open-source AutoML library (2K+ stars)',
            x: 330, y: 712, width: 230, height: 50, fontSize: 9, fill: '#555555', lineHeight: 1.6,
        }),

        // Awards at bottom left
        createText({ text: 'AWARDS', x: 40, y: 600, width: 250, fontSize: 11, fontWeight: 'bold', fill: '#2c3e50', letterSpacing: 1 }),
        createShape({ x: 40, y: 617, width: 40, height: 3, fill: '#00dc82' }),
        createText({
            text: '• Data Scientist of the Year, Amazon (2023)\n• Best Paper Award, KDD 2021\n• NSF Graduate Research Fellowship',
            x: 40, y: 632, width: 250, height: 50, fontSize: 9, fill: '#555555', lineHeight: 1.6,
        }),

        // Languages
        createText({ text: 'LANGUAGES', x: 40, y: 710, width: 250, fontSize: 11, fontWeight: 'bold', fill: '#2c3e50', letterSpacing: 1 }),
        createShape({ x: 40, y: 727, width: 40, height: 3, fill: '#00dc82' }),
        createText({
            text: 'English (Native)  •  Mandarin (Fluent)  •  Spanish (Intermediate)',
            x: 40, y: 742, width: 250, fontSize: 9, fill: '#555555',
        }),
    ],
};
