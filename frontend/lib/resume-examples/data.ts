
export interface ResumeExampleData {
    jobTitle: string;
    slug: string;
    seoDescription: string;
    summary: string;
    skills: string[];
    experience: {
        title: string;
        company: string;
        period: string;
        points: string[];
    }[];
    education: {
        degree: string;
        school: string;
        year: string;
    }[];
}

export const RESUME_EXAMPLES: ResumeExampleData[] = [
    {
        jobTitle: "Software Engineer",
        slug: "software-engineer",
        seoDescription: "Professional Software Engineer resume example updated for 2026. Copy this template to pass ATS scans and land interviews at top tech companies.",
        summary: "Results-oriented Software Engineer with 5+ years of experience building scalable web applications. Proficient in React, Node.js, and Cloud Infrastructure. Proven track record of improving site performance by 40% and reducing AWS costs by 20%.",
        skills: ["React / Next.js", "TypeScript", "Node.js", "AWS (EC2, Lambda)", "PostgreSQL", "Docker/Kubernetes", "CI/CD Pipelines", "System Architecture"],
        experience: [
            {
                title: "Senior Software Engineer",
                company: "TechNova Solutions",
                period: "2023 - Present",
                points: [
                    "Architected and launched a microservices-based e-commerce platform handling 50k+ daily users.",
                    "Optimized database queries and implemented Redis caching, reducing API latency by 45%.",
                    "Mentored 3 junior developers and established code review standards, increasing team velocity by 25%."
                ]
            },
            {
                title: "Software Developer",
                company: "Innovate Digital",
                period: "2020 - 2023",
                points: [
                    "Developed responsive front-end interfaces using React and Tailwind CSS.",
                    "Integrated Stripe API for secure payment processing, processing $1M+ in annual transactions.",
                    "Collaborated with UX designers to implement a new dashboard, improving user retention by 15%."
                ]
            }
        ],
        education: [
            {
                degree: "Bachelor of Science in Computer Science",
                school: "University of Technology",
                year: "2020"
            }
        ]
    },
    {
        jobTitle: "Registered Nurse",
        slug: "registered-nurse",
        seoDescription: "Registered Nurse (RN) resume example for 2026. Highlight your clinical skills and patient care experience with this ATS-friendly template.",
        summary: "Compassionate Registered Nurse with 6 years of experience in acute care and ER settings. Certified in ACLS and PALS. Dedicated to providing high-quality patient-centered care and improving clinical outcomes through evidence-based practice.",
        skills: ["Patient Care & Safety", "Emergency Response (ER)", "Medication Administration", "EHR (Epic, Cerner)", "Vital Signs Monitoring", "IV Therapy", "Patient Advocacy", "Team Collaboration"],
        experience: [
            {
                title: "Registered Nurse (ER)",
                company: "Metro City General Hospital",
                period: "2022 - Present",
                points: [
                    "Manage trauma care for 20+ patients per shift in a high-volume Level I Trauma Center.",
                    "Collaborate with physicians to stabilize critical patients and administer emergency medications.",
                    "Maintained a 98% patient satisfaction score for communication and care delivery."
                ]
            },
            {
                title: "Staff Nurse (Med-Surg)",
                company: "Community Health Clinic",
                period: "2019 - 2022",
                points: [
                    "Provided comprehensive care for post-operative patients, monitoring recovery progress.",
                    "Educated patients and families on discharge instructions and medication management.",
                    "Served as Preceptor for new nursing graduates, ensuring proper onboarding and training."
                ]
            }
        ],
        education: [
            {
                degree: "Bachelor of Science in Nursing (BSN)",
                school: "State Medical University",
                year: "2019"
            }
        ]
    },
    {
        jobTitle: "Project Manager",
        slug: "project-manager",
        seoDescription: "Senior Project Manager resume example. Showcase your PMP certification and Agile methodologies to land leadership roles using this template.",
        summary: "PMP-certified Project Manager with 8 years of experience leading cross-functional teams to deliver complex software projects on time and under budget. Expert in Agile/Scrum methodologies and risk management.",
        skills: ["Project Management (PMP)", "Agile & Scrum", "Risk Management", "Budgeting & Cost Control", "Stakeholder Communication", "Jira / Asana", "Team Leadership", "Strategic Planning"],
        experience: [
            {
                title: "Senior Project Manager",
                company: "Apex Systems",
                period: "2021 - Present",
                points: [
                    "Led the end-to-end delivery of a $5M enterprise software migration, completing it 2 months ahead of schedule.",
                    "Implemented Agile processes that improved sprint velocity by 30% across 4 development teams.",
                    "Managed relationships with key external vendors, negotiating contracts that saved the company 15% annually."
                ]
            },
            {
                title: "Project Coordinator",
                company: "BuildRight Construction",
                period: "2017 - 2021",
                points: [
                    "Coordinated schedules and resources for multiple concurrent commercial construction projects.",
                    "Tracked project milestones and budget utilization using MS Project.",
                    "Facilitated weekly status meetings to ensure alignment between architects, engineers, and contractors."
                ]
            }
        ],
        education: [
            {
                degree: "Master of Business Administration (MBA)",
                school: "Business Tech Institute",
                year: "2017"
            }
        ]
    },
    {
        jobTitle: "Marketing Manager",
        slug: "marketing-manager",
        seoDescription: "Marketing Manager resume example for 2026. Highlight your campaign results and ROI with this data-driven resume template.",
        summary: "Creative and data-driven Marketing Manager with a track record of driving brand growth. Experienced in digital marketing, SEO, and content strategy. Successfully managed budgets of up to $500k/year delivering 3x ROI.",
        skills: ["Digital Marketing Strategy", "SEO & SEM", "Content Marketing", "Google Analytics", "Social Media Management", "Email Automation", "Brand Positioning", "Campaign A/B Testing"],
        experience: [
            {
                title: "Marketing Manager",
                company: "GrowthHacker Agency",
                period: "2022 - Present",
                points: [
                    "Oversee digital marketing strategy for 5 key accounts, generating a 200% increase in inbound leads.",
                    "Launched a viral social media campaign that gained 100k+ organic followers in 3 months.",
                    "Optimized paid search campaigns (PPC), reducing Cost Per Acquisition (CPA) by 35%."
                ]
            },
            {
                title: "Digital Marketing Specialist",
                company: "Creative Solutions",
                period: "2019 - 2022",
                points: [
                    "Managed email marketing newsletters with a 25% open rate and 5% click-through rate.",
                    "Conducted keyword research and optimized website blog content, doubling organic traffic in one year.",
                    "Coordinated with design teams to produce high-converting landing pages."
                ]
            }
        ],
        education: [
            {
                degree: "Bachelor of Arts in Marketing",
                school: "State University",
                year: "2019"
            }
        ]
    },
    {
        jobTitle: "Customer Service Representative",
        slug: "customer-service-representative",
        seoDescription: "Customer Service Representative resume example. Emphasize your communication skills and problem-solving abilities.",
        summary: "Dedicated Customer Service Representative with 4 years of experience in high-volume call centers. Passionate about resolving customer issues efficiently and maintaining a positive brand image. Consistently rated 5/5 stars for service quality.",
        skills: ["Customer Support", "Conflict Resolution", "CRM Software (Salesforce)", "Communication Skills", "Data Entry", "Time Management", "Multi-line Phone Systems", "Problem Solving"],
        experience: [
            {
                title: "Customer Support Specialist",
                company: "Connect Wireless",
                period: "2021 - Present",
                points: [
                    "Handle 50+ inbound calls daily, assisting customers with billing, technical support, and account upgrades.",
                    "Achieved 'Top Performer' status for 3 consecutive quarters based on customer satisfaction surveys.",
                    "De-escalated complex customer complaints, resulting in a 90% retention rate for at-risk accounts."
                ]
            },
            {
                title: "Sales Associate",
                company: "Retail Giant",
                period: "2019 - 2021",
                points: [
                    "Assisted customers on the sales floor, providing product recommendations and answering inquiries.",
                    "Processed returns and exchanges efficiently in accordance with company policy.",
                    "Maintained store organization and inventory levels during peak holiday seasons."
                ]
            }
        ],
        education: [
            {
                degree: "High School Diploma",
                school: "City High School",
                year: "2019"
            }
        ]
    }
];

export function getResumeExample(slug: string): ResumeExampleData | undefined {
    return RESUME_EXAMPLES.find((example) => example.slug === slug);
}

export function getAllResumeExampleSlugs(): string[] {
    return RESUME_EXAMPLES.map((example) => example.slug);
}
