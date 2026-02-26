const fs = require('fs');
const http = require('http');

const TARGET_TEMPLATES = [
    'classic-professional',
    'header-blue-clean',
    'header-dark-box',
    'header-decorative',
    'header-diagonal-yellow',
    'header-geometric',
    'header-icon-sections',
    'header-ribbon-yellow'
];

async function generatePDF(templateId) {
    const payload = JSON.stringify({
        templateId,
        locale: "en",
        data: {
            personalInfo: {
                fullName: "John Doe",
                jobTitle: "Senior Software Engineer",
                email: "john.doe@example.com",
                phone: "+1 234 567 8900",
                location: "San Francisco, CA",
                linkedin: "linkedin.com/in/johndoe",
                website: "johndoe.dev",
                summary: "Experienced software engineer with a proven track record of designing, developing, and deploying high-performance web applications. Passionate about clean code, scalability, and mentoring junior developers.",
                profileImage: "https://i.pravatar.cc/300"
            },
            experience: [
                {
                    title: "Senior Full Stack Dev",
                    company: "Tech Innovators Inc.",
                    startDate: "2020-01-01",
                    current: true,
                    city: "San Francisco",
                    country: "USA",
                    description: "- Led the development of a microservices-based architecture using Node.js and Docker.\n- Improved application performance by 40% through database query optimization and caching strategies.\n- Mentored a team of 5 junior developers, conducting code reviews and pair programming sessions.\n- Designed and implemented RESTful APIs consumed by millions of users daily."
                },
                {
                    title: "Software Engineer",
                    company: "Web Solutions LLC",
                    startDate: "2016-05-01",
                    endDate: "2019-12-31",
                    city: "New York",
                    country: "USA",
                    description: "- Developed interactive user interfaces using React and Redux.\n- Integrated third-party APIs for payment processing and geolocation services.\n- Participated in agile ceremonies, including sprint planning, daily stand-ups, and retrospectives.\n- Wrote comprehensive unit and integration tests, increasing code coverage to 85%."
                }
            ],
            education: [
                {
                    degree: "Master of Science in Computer Science",
                    school: "University of Technology",
                    startDate: "2014-09-01",
                    endDate: "2016-05-01",
                    city: "Boston",
                    country: "USA",
                    gpa: "3.8/4.0",
                    description: "Specialized in Artificial Intelligence and Machine Learning. Thesis on 'Predictive Modeling for User Engagement'."
                },
                {
                    degree: "Bachelor of Science in Software Eng",
                    school: "State University",
                    startDate: "2010-09-01",
                    endDate: "2014-05-01",
                    city: "Austin",
                    country: "USA",
                    gpa: "3.9/4.0",
                    honors: "Summa Cum Laude"
                }
            ],
            skills: [
                { name: "JavaScript / TypeScript", level: 5 },
                { name: "React & Next.js", level: 5 },
                { name: "Node.js & Express", level: 4 },
                { name: "GraphQL & REST APIs", level: 4 },
                { name: "PostgreSQL & MongoDB", level: 4 },
                { name: "Docker & Kubernetes", level: 3 }
            ],
            languages: [
                { name: "English", proficiency: "Native" },
                { name: "Spanish", proficiency: "Professional Working" }
            ],
            strengths: [
                { name: "Problem Solving", level: 5 },
                { name: "System Architecture", level: 4 },
                { name: "Team Leadership", level: 4 }
            ],
            interests: [
                { name: "Open Source Contributing" },
                { name: "Rock Climbing" },
                { name: "Photography" }
            ],
            customThemeColor: "#2563eb",
            fonts: {
                heading: "Merriweather",
                body: "Inter",
                size: "medium"
            }
        },
        theme: {
            primary: "#2563eb",
            secondary: "#1e40af",
            text: "#1f2937",
            background: "#ffffff",
            heading: "#111827",
            border: "#e5e7eb"
        }
    });

    const outputPath = `/tmp/test_${templateId.replace(/-/g, '_')}.pdf`;
    const options = {
        hostname: 'localhost',
        port: 4444,
        path: '/api/v1/pdf/preview',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(payload)
        }
    };

    return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            if (res.statusCode !== 200) {
                console.error(`❌ Failed ${templateId}: ${res.statusCode} ${res.statusMessage}`);
                res.resume();
                resolve();
                return;
            }

            let responseData = '';
            res.on('data', (chunk) => {
                responseData += chunk;
            });

            res.on('end', async () => {
                try {
                    const jsonResponse = JSON.parse(responseData);
                    if (!jsonResponse.pdf) {
                        throw new Error("No PDF data found in response");
                    }

                    // Convert base64 to binary buffer
                    const pdfBuffer = Buffer.from(jsonResponse.pdf, 'base64');
                    fs.writeFileSync(outputPath, pdfBuffer);

                    // Count pages dynamically using pdf-lib
                    const { PDFDocument } = require('pdf-lib');
                    const pdfDoc = await PDFDocument.load(pdfBuffer);
                    const pageCount = pdfDoc.getPageCount();

                    if (pageCount === 1) {
                        console.log(`✅ ${templateId.padEnd(25)} -> 🟢 1 page`);
                    } else {
                        console.log(`❌ ${templateId.padEnd(25)} -> 🔴 ${pageCount} pages (failed)`);
                    }
                } catch (e) {
                    console.error(`❌ Error parsing ${templateId}:`, e.message);
                }
                resolve();
            });
        });

        req.on('error', (e) => {
            console.error(`❌ Request error on ${templateId}:`, e.message);
            resolve();
        });

        req.write(payload);
        req.end();
    });
}

async function runAll() {
    console.log(`Testing ${TARGET_TEMPLATES.length} templates...\n----------------------------------------`);
    for (const tid of TARGET_TEMPLATES) {
        await generatePDF(tid);
        // Add artificial delay to bypass the rate limiter (e.g., 5 per minute -> 15s between requests)
        await new Promise(r => setTimeout(r, 15000));
    }
    console.log('----------------------------------------\nDone!');
}

runAll();
