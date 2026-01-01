import puppeteer from "puppeteer";
import { ResumeData, THEME_COLORS } from "../types";

const generateResumeHTML = (resume: ResumeData): string => {
  const theme = THEME_COLORS[resume.templateTheme || "NAVY"];
  const layout = resume.templateLayout || "CLASSIC";

  const experiences = resume.experiences || [];
  const education = resume.education || [];
  const skills = resume.skills || [];
  const projects = resume.projects || [];

  const experienceHTML = experiences
    .map(
      (exp) => `
      <div class="experience-item">
        <div class="exp-header">
          <div>
            <h3>${exp.position}</h3>
            <p class="company">${exp.company}${exp.location ? ` • ${exp.location}` : ""}</p>
          </div>
          <span class="date">${exp.startDate} - ${exp.isCurrent ? "Present" : exp.endDate || ""}</span>
        </div>
        <ul>
          ${exp.bullets.map((b) => `<li>${b}</li>`).join("")}
        </ul>
      </div>
    `
    )
    .join("");

  const educationHTML = education
    .map(
      (edu) => `
      <div class="education-item">
        <h3>${edu.degree}${edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ""}</h3>
        <p>${edu.institution}</p>
        <span class="date">${edu.startDate} - ${edu.endDate || "Present"}</span>
        ${edu.gpa ? `<p>GPA: ${edu.gpa}</p>` : ""}
      </div>
    `
    )
    .join("");

  const skillsHTML = skills.map((s) => `<span class="skill-tag">${s}</span>`).join("");

  const projectsHTML = projects
    .map(
      (p) => `
      <div class="project-item">
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        ${p.technologies.length > 0 ? `<p class="tech">Tech: ${p.technologies.join(", ")}</p>` : ""}
      </div>
    `
    )
    .join("");

  // Generate layout-specific HTML
  const getLayoutHTML = () => {
    switch (layout) {
      case "SIDEBAR":
        return `
          <div class="resume sidebar-layout">
            <aside class="sidebar" style="background: ${theme.primary}; color: white;">
              <div class="contact">
                <h1>${resume.fullName}</h1>
                ${resume.email ? `<p>${resume.email}</p>` : ""}
                ${resume.phone ? `<p>${resume.phone}</p>` : ""}
                ${resume.location ? `<p>${resume.location}</p>` : ""}
                ${resume.linkedinUrl ? `<p>LinkedIn</p>` : ""}
              </div>
              ${skills.length > 0 ? `<div class="section"><h2>Skills</h2><div class="skills-sidebar">${skillsHTML}</div></div>` : ""}
            </aside>
            <main>
              ${resume.summary ? `<section class="summary"><h2>Summary</h2><p>${resume.summary}</p></section>` : ""}
              ${experiences.length > 0 ? `<section><h2>Experience</h2>${experienceHTML}</section>` : ""}
              ${education.length > 0 ? `<section><h2>Education</h2>${educationHTML}</section>` : ""}
              ${projects.length > 0 ? `<section><h2>Projects</h2>${projectsHTML}</section>` : ""}
            </main>
          </div>
        `;
      case "HEADER":
        return `
          <div class="resume header-layout">
            <header style="background: ${theme.primary}; color: white; padding: 30px;">
              <h1>${resume.fullName}</h1>
              <div class="contact-row">
                ${resume.email ? `<span>${resume.email}</span>` : ""}
                ${resume.phone ? `<span>${resume.phone}</span>` : ""}
                ${resume.location ? `<span>${resume.location}</span>` : ""}
              </div>
            </header>
            <main>
              ${resume.summary ? `<section><h2>Summary</h2><p>${resume.summary}</p></section>` : ""}
              ${experiences.length > 0 ? `<section><h2>Experience</h2>${experienceHTML}</section>` : ""}
              ${skills.length > 0 ? `<section><h2>Skills</h2><div class="skills">${skillsHTML}</div></section>` : ""}
              ${education.length > 0 ? `<section><h2>Education</h2>${educationHTML}</section>` : ""}
              ${projects.length > 0 ? `<section><h2>Projects</h2>${projectsHTML}</section>` : ""}
            </main>
          </div>
        `;
      case "MINIMAL":
        return `
          <div class="resume minimal-layout">
            <header>
              <h1>${resume.fullName}</h1>
              <p class="contact-line">
                ${[resume.email, resume.phone, resume.location].filter(Boolean).join(" | ")}
              </p>
            </header>
            <main>
              ${resume.summary ? `<section><p class="summary-text">${resume.summary}</p></section>` : ""}
              ${experiences.length > 0 ? `<section><h2>Experience</h2>${experienceHTML}</section>` : ""}
              ${education.length > 0 ? `<section><h2>Education</h2>${educationHTML}</section>` : ""}
              ${skills.length > 0 ? `<section><h2>Skills</h2><p>${skills.join(", ")}</p></section>` : ""}
            </main>
          </div>
        `;
      case "CREATIVE":
        return `
          <div class="resume creative-layout">
            <div class="creative-header" style="border-left: 5px solid ${theme.accent};">
              <h1 style="color: ${theme.primary};">${resume.fullName}</h1>
              ${resume.targetRole ? `<p class="role">${resume.targetRole}</p>` : ""}
              <div class="contact-info">
                ${resume.email ? `<span>${resume.email}</span>` : ""}
                ${resume.phone ? `<span>${resume.phone}</span>` : ""}
                ${resume.location ? `<span>${resume.location}</span>` : ""}
              </div>
            </div>
            <main>
              ${resume.summary ? `<section><h2 style="color: ${theme.primary};">About</h2><p>${resume.summary}</p></section>` : ""}
              ${experiences.length > 0 ? `<section><h2 style="color: ${theme.primary};">Experience</h2>${experienceHTML}</section>` : ""}
              ${skills.length > 0 ? `<section><h2 style="color: ${theme.primary};">Skills</h2><div class="skills">${skillsHTML}</div></section>` : ""}
              ${education.length > 0 ? `<section><h2 style="color: ${theme.primary};">Education</h2>${educationHTML}</section>` : ""}
            </main>
          </div>
        `;
      default: // CLASSIC
        return `
          <div class="resume classic-layout">
            <header>
              <h1 style="color: ${theme.primary};">${resume.fullName}</h1>
              <div class="contact">
                ${resume.email ? `<span>${resume.email}</span>` : ""}
                ${resume.phone ? `<span>${resume.phone}</span>` : ""}
                ${resume.location ? `<span>${resume.location}</span>` : ""}
                ${resume.linkedinUrl ? `<span>LinkedIn</span>` : ""}
              </div>
            </header>
            <main>
              ${resume.summary ? `<section><h2 style="border-bottom: 2px solid ${theme.primary};">Summary</h2><p>${resume.summary}</p></section>` : ""}
              ${experiences.length > 0 ? `<section><h2 style="border-bottom: 2px solid ${theme.primary};">Experience</h2>${experienceHTML}</section>` : ""}
              ${skills.length > 0 ? `<section><h2 style="border-bottom: 2px solid ${theme.primary};">Skills</h2><div class="skills">${skillsHTML}</div></section>` : ""}
              ${education.length > 0 ? `<section><h2 style="border-bottom: 2px solid ${theme.primary};">Education</h2>${educationHTML}</section>` : ""}
              ${projects.length > 0 ? `<section><h2 style="border-bottom: 2px solid ${theme.primary};">Projects</h2>${projectsHTML}</section>` : ""}
            </main>
          </div>
        `;
    }
  };

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          font-size: 11pt;
          line-height: 1.4;
          color: #333;
        }
        .resume {
          max-width: 8.5in;
          margin: 0 auto;
          padding: 0.5in;
        }
        h1 {
          font-size: 24pt;
          margin-bottom: 5px;
        }
        h2 {
          font-size: 12pt;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin: 15px 0 10px;
          padding-bottom: 5px;
        }
        h3 {
          font-size: 11pt;
          font-weight: 600;
        }
        .contact {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
          margin-bottom: 15px;
          font-size: 10pt;
          color: #666;
        }
        .contact-row {
          display: flex;
          gap: 20px;
          justify-content: center;
        }
        .contact-line {
          text-align: center;
          color: #666;
          margin-bottom: 15px;
        }
        section {
          margin-bottom: 15px;
        }
        .experience-item, .education-item, .project-item {
          margin-bottom: 12px;
        }
        .exp-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        .company {
          color: #666;
          font-size: 10pt;
        }
        .date {
          color: #888;
          font-size: 10pt;
          white-space: nowrap;
        }
        ul {
          margin: 8px 0 0 20px;
        }
        li {
          margin-bottom: 3px;
        }
        .skills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .skill-tag {
          background: #f0f0f0;
          padding: 3px 10px;
          border-radius: 3px;
          font-size: 10pt;
        }
        .skills-sidebar .skill-tag {
          background: rgba(255,255,255,0.2);
          color: white;
        }
        .tech {
          font-size: 10pt;
          color: #666;
          font-style: italic;
        }
        /* Sidebar layout */
        .sidebar-layout {
          display: flex;
          padding: 0;
        }
        .sidebar-layout .sidebar {
          width: 200px;
          padding: 30px 20px;
          flex-shrink: 0;
        }
        .sidebar-layout main {
          flex: 1;
          padding: 30px;
        }
        /* Header layout */
        .header-layout {
          padding: 0;
        }
        .header-layout header {
          text-align: center;
        }
        .header-layout main {
          padding: 30px;
        }
        /* Minimal layout */
        .minimal-layout header {
          text-align: center;
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 1px solid #ddd;
        }
        .summary-text {
          text-align: center;
          font-style: italic;
          margin-bottom: 15px;
        }
        /* Creative layout */
        .creative-header {
          padding-left: 20px;
          margin-bottom: 20px;
        }
        .creative-header .role {
          font-size: 14pt;
          color: #666;
        }
        .contact-info {
          display: flex;
          gap: 15px;
          margin-top: 10px;
          font-size: 10pt;
          color: #666;
        }
      </style>
    </head>
    <body>
      ${getLayoutHTML()}
    </body>
    </html>
  `;
};

export const generatePDF = async (resume: ResumeData): Promise<Buffer> => {
  const html = generateResumeHTML(resume);

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "Letter",
      printBackground: true,
      margin: {
        top: "0",
        right: "0",
        bottom: "0",
        left: "0",
      },
    });

    return Buffer.from(pdfBuffer);
  } finally {
    await browser.close();
  }
};
