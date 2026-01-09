// Canvas Template: Minimal Clean
import type { CanvasTemplate } from '@/store/useCanvasStore';
import { createText, createShape } from '../helpers';

export const minimalCleanTemplate: CanvasTemplate = {
    id: 'minimal-clean',
    name: 'Minimal Clean',
    thumbnail: '/templates/minimal-clean.png',
    category: 'minimal',
    backgroundColor: '#fafafa',
    elements: [
        // Name
        createText({
            text: 'DAVID CHEN',
            x: 40,
            y: 50,
            width: 515,
            fontSize: 36,
            fontWeight: 'bold',
            fill: '#222222',
            letterSpacing: 3,
        }),
        createText({
            text: 'Product Manager',
            x: 40,
            y: 95,
            width: 515,
            fontSize: 14,
            fill: '#666666',
            letterSpacing: 1,
        }),

        // Contact row
        createText({
            text: 'david.chen@email.com  |  +1 (555) 456-7890  |  San Jose, CA  |  linkedin.com/in/davidchen',
            x: 40,
            y: 130,
            width: 515,
            fontSize: 10,
            fill: '#888888',
        }),

        // Main divider
        createShape({
            x: 40,
            y: 160,
            width: 515,
            height: 1,
            fill: '#dddddd',
        }),

        // Summary
        createText({
            text: 'SUMMARY',
            x: 40,
            y: 185,
            width: 100,
            fontSize: 11,
            fontWeight: 'bold',
            fill: '#222222',
            letterSpacing: 1,
        }),
        createText({
            text: 'Strategic Product Manager with 7 years of experience driving product development from concept to launch. Proven track record of increasing revenue by 30%+ through data-driven product decisions. Strong technical background with expertise in agile methodologies.',
            x: 40,
            y: 210,
            width: 515,
            height: 55,
            fontSize: 10,
            fill: '#555555',
            lineHeight: 1.6,
        }),

        // Experience
        createText({
            text: 'EXPERIENCE',
            x: 40,
            y: 285,
            width: 100,
            fontSize: 11,
            fontWeight: 'bold',
            fill: '#222222',
            letterSpacing: 1,
        }),

        // Job 1
        createText({
            text: 'Senior Product Manager',
            x: 40,
            y: 310,
            width: 300,
            fontSize: 12,
            fontWeight: 'bold',
            fill: '#333333',
        }),
        createText({
            text: 'Google  •  2021 - Present',
            x: 40,
            y: 328,
            width: 300,
            fontSize: 10,
            fill: '#888888',
        }),
        createText({
            text: 'Led product strategy for Google Workspace collaboration features serving 3B+ users. Managed cross-functional team of 25 engineers, designers, and researchers. Launched 5 major features resulting in 15% increase in daily active users.',
            x: 40,
            y: 350,
            width: 515,
            height: 50,
            fontSize: 10,
            fill: '#555555',
            lineHeight: 1.6,
        }),

        // Job 2
        createText({
            text: 'Product Manager',
            x: 40,
            y: 415,
            width: 300,
            fontSize: 12,
            fontWeight: 'bold',
            fill: '#333333',
        }),
        createText({
            text: 'Stripe  •  2018 - 2021',
            x: 40,
            y: 433,
            width: 300,
            fontSize: 10,
            fill: '#888888',
        }),
        createText({
            text: 'Owned the payments dashboard product, growing merchant adoption by 40%. Defined product roadmap balancing customer needs with business objectives. Partnered with engineering to reduce payment processing latency by 25%.',
            x: 40,
            y: 455,
            width: 515,
            height: 50,
            fontSize: 10,
            fill: '#555555',
            lineHeight: 1.6,
        }),

        // Job 3
        createText({
            text: 'Associate Product Manager',
            x: 40,
            y: 520,
            width: 300,
            fontSize: 12,
            fontWeight: 'bold',
            fill: '#333333',
        }),
        createText({
            text: 'Microsoft  •  2016 - 2018',
            x: 40,
            y: 538,
            width: 300,
            fontSize: 10,
            fill: '#888888',
        }),
        createText({
            text: 'Launched new features for Microsoft Teams during rapid growth phase. Conducted user research and competitive analysis to inform product decisions. Collaborated with UX team to improve onboarding flow, increasing activation by 20%.',
            x: 40,
            y: 560,
            width: 515,
            height: 50,
            fontSize: 10,
            fill: '#555555',
            lineHeight: 1.6,
        }),

        // Education
        createText({
            text: 'EDUCATION',
            x: 40,
            y: 635,
            width: 100,
            fontSize: 11,
            fontWeight: 'bold',
            fill: '#222222',
            letterSpacing: 1,
        }),
        createText({
            text: 'MBA, Business Administration',
            x: 40,
            y: 660,
            width: 300,
            fontSize: 11,
            fontWeight: 'bold',
            fill: '#333333',
        }),
        createText({
            text: 'Harvard Business School  •  2014 - 2016',
            x: 40,
            y: 678,
            width: 300,
            fontSize: 10,
            fill: '#888888',
        }),
        createText({
            text: 'BS, Computer Science',
            x: 40,
            y: 705,
            width: 300,
            fontSize: 11,
            fontWeight: 'bold',
            fill: '#333333',
        }),
        createText({
            text: 'UC Berkeley  •  2010 - 2014',
            x: 40,
            y: 723,
            width: 300,
            fontSize: 10,
            fill: '#888888',
        }),

        // Skills row at bottom
        createText({
            text: 'SKILLS',
            x: 40,
            y: 765,
            width: 100,
            fontSize: 11,
            fontWeight: 'bold',
            fill: '#222222',
            letterSpacing: 1,
        }),
        createText({
            text: 'Product Strategy  •  A/B Testing  •  SQL  •  Jira  •  Figma  •  Roadmapping  •  User Research  •  Agile/Scrum  •  Data Analysis',
            x: 40,
            y: 790,
            width: 515,
            fontSize: 10,
            fill: '#666666',
        }),
    ],
};
