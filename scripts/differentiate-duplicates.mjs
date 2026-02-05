#!/usr/bin/env node
/**
 * Differentiates near-duplicate resume example pages by rewriting
 * the intro section and description to target distinct search intents.
 *
 * Groups:
 * 1. CNA trio: cna (abbreviation), certified-nursing-assistant (career growth), nursing-assistant (entry/uncertified)
 * 2. Pharmacy pair: pharmacy-tech (informal/entry), pharmacy-technician (formal/certified)
 * 3. Desktop support pair: desktop-support (general/helpdesk), desktop-support-engineer (senior/escalation)
 */

import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const require = createRequire(path.join(rootDir, 'frontend', 'package.json'));
const matter = require('gray-matter');

const CONTENT_DIR = path.join(rootDir, 'frontend/content/resume-examples');

const DIFFERENTIATIONS = {
  'cna': {
    description: 'CNA resume example for state-certified nursing assistants. Covers CNA exam credentials, clinical rotation experience, and how to format your certification on a resume. Free 2026 guide with ATS tips.',
    introHeading: '## What Makes a Great CNA Resume?',
    introBody: `This CNA resume example is designed specifically for candidates who hold (or are about to earn) their state CNA certification. The abbreviation "CNA" is how most job postings and healthcare staffing agencies list these roles, and your resume needs to match that terminology exactly for ATS compatibility.

A strong CNA resume leads with your certification details — state, license number, and expiration date — because healthcare recruiters verify credentials before reading anything else. Unlike a general "nursing assistant" resume, a CNA resume must demonstrate that you have completed a state-approved training program (typically 75-120 hours) and passed both the written and clinical skills components of the state competency exam.

This guide focuses on how to present your clinical rotation hours, patient care competencies, and facility-specific experience in a format that passes both ATS screening and the 7-second recruiter scan that determines whether your resume gets a closer look.`,
    summaries: {
      entry: '"Recently certified CNA (State of [State], License #XXXXX, exp. XX/2027) with 80 hours of clinical rotation at [Facility Name], a 200-bed skilled nursing facility. Provided ADL assistance, vital signs monitoring, and mobility support for 8-10 residents per shift during clinicals. CPR/BLS certified. Seeking first full-time CNA position to apply patient-centered care training in a long-term care or hospital setting."',
      mid: '"State-certified CNA with 3 years of bedside experience across acute care and long-term care environments. Currently caring for 12-15 patients per shift on a 40-bed medical-surgical unit, maintaining 96% patient satisfaction scores. Proficient in Epic EHR, infection control protocols, and dementia-specific care techniques. CNA certification current through 2027."',
      senior: '"Veteran CNA with 8+ years of clinical experience spanning hospital, rehabilitation, and hospice settings. Manage 15+ patients per shift, serve as CNA preceptor for new hires (trained 20+ CNAs), and maintain zero patient safety incidents across 3 consecutive years. Advanced competencies in wound care, catheter management, tracheostomy care, and end-of-life comfort measures. Preparing for LPN bridge program."'
    }
  },

  'certified-nursing-assistant': {
    description: 'Certified Nursing Assistant resume for experienced CNAs seeking career advancement. Covers charge aide roles, CNA II specialization, LPN bridge preparation, and leadership positioning. Free 2026 writing guide.',
    introHeading: '## What Makes a Great Certified Nursing Assistant Resume?',
    introBody: `This Certified Nursing Assistant resume example targets experienced professionals who are ready to advance beyond entry-level bedside care. If you have been working as a CNA for 2+ years and are pursuing charge aide responsibilities, CNA II certification, or preparing for an LPN or RN bridge program, this guide shows how to position your experience for the next step.

The difference between a Certified Nursing Assistant resume and a basic CNA resume is the emphasis on leadership, specialization, and career trajectory. Experienced Certified Nursing Assistants often take on mentorship roles, participate in quality improvement initiatives, and develop specialized skills in areas like wound care, dialysis support, or memory care — but they rarely highlight these differentiators on their resumes.

Healthcare hiring managers for senior CNA and charge aide positions look for three things: consistent clinical performance metrics, evidence of professional development, and proof that you can lead other CNAs. This guide shows how to structure your resume to demonstrate all three, whether you are applying for a promotion within your facility or transitioning to a higher-acuity setting.`,
    summaries: {
      entry: '"Certified Nursing Assistant with 2 years of long-term care experience seeking a charge aide or lead CNA position. Manage daily care for 12 residents including ADLs, vital signs, and behavioral health documentation. Completed advanced dementia care certification and serve as informal mentor to 3 newer CNAs on the evening shift."',
      mid: '"Experienced Certified Nursing Assistant with 5 years across skilled nursing and acute rehabilitation settings. Currently serving as charge aide on a 45-bed memory care unit, coordinating care assignments for 6 CNAs per shift and reporting to the charge nurse. Achieved CNA II certification with phlebotomy and EKG competencies. 98% patient satisfaction rating."',
      senior: '"Senior Certified Nursing Assistant and CNA preceptor with 10+ years of progressive clinical experience. Lead a team of 8 CNAs on a 60-bed rehabilitation unit, manage shift assignments, conduct new hire orientation, and participate in interdisciplinary care conferences. Currently enrolled in an LPN bridge program (expected completion 2027). Zero patient safety incidents over the past 4 years."'
    }
  },

  'nursing-assistant': {
    description: 'Nursing Assistant resume example for entry-level and non-certified patient care roles. Covers hospital aide, patient care technician, and pre-certification positions. Free 2026 writing guide with ATS tips.',
    introHeading: '## What Makes a Great Nursing Assistant Resume?',
    introBody: `This Nursing Assistant resume example is tailored for candidates entering patient care roles that may not require state CNA certification — including hospital aides, patient care assistants, and nursing assistant trainees. In many states and healthcare systems, "Nursing Assistant" is a broader title that encompasses both certified and non-certified patient care roles.

If you are transitioning into healthcare from another field, applying for a patient care technician (PCT) role, or working as a nursing assistant while pursuing your CNA certification, this guide addresses your specific situation. Entry-level nursing assistant positions often accept candidates with on-the-job training, Red Cross certification, or hospital-based training programs rather than requiring state CNA licensure.

The key challenge for Nursing Assistant applicants without full CNA certification is demonstrating clinical readiness through transferable skills: caregiving experience (even informal family caregiving counts), first aid training, patient communication abilities, and physical stamina for 8-12 hour shifts. This guide shows how to frame non-traditional healthcare experience in a way that resonates with nursing directors and clinical hiring managers.`,
    summaries: {
      entry: '"Compassionate Nursing Assistant with CPR/First Aid certification and 6 months of volunteer patient care experience at [Hospital Name]. Assisted nursing staff with patient transport, meal service, and comfort care for 20+ patients daily. Currently enrolled in a state-approved CNA training program (expected certification: [Month] 2026). Strong interpersonal skills developed through 3 years of home caregiving for elderly family member."',
      mid: '"Nursing Assistant with 2 years of hospital-based patient care experience on a 30-bed orthopedic unit. Provide ADL support, patient transport, and post-surgical monitoring for 10-12 patients per shift. Trained in safe patient handling, infection control, and EHR documentation (Cerner). Pursuing CNA certification to expand clinical scope."',
      senior: '"Experienced Nursing Assistant with 5+ years of patient care across hospital, home health, and assisted living settings. Currently supporting 15 patients per shift on a medical-surgical floor, assisting RN team with vitals, intake/output tracking, and wound care. Completed hospital-based advanced patient care technician training. CNA certification pending (exam scheduled [Month] 2026)."'
    }
  },

  'pharmacy-tech': {
    description: 'Pharmacy Tech resume example for retail and entry-level pharmacy positions. Covers prescription filling workflows, customer service metrics, and pharmacy software systems. Free 2026 guide with ATS tips.',
    introHeading: '## What Makes a Great Pharmacy Tech Resume?',
    introBody: `This Pharmacy Tech resume example targets candidates working in or applying to retail pharmacy environments — CVS, Walgreens, Walmart, Rite Aid, and independent pharmacies. The term "pharmacy tech" is the informal but widely-used title in retail settings, and matching this terminology in your resume helps with ATS compatibility for retail pharmacy job postings.

Retail pharmacy tech positions prioritize speed, accuracy, and customer service. Unlike hospital pharmacy technician roles (which focus on sterile compounding and clinical support), retail pharmacy tech work centers on prescription intake, data entry, insurance adjudication, third-party billing, and direct patient interaction at the pickup counter.

The strongest pharmacy tech resumes quantify prescription volume (Rx per day), accuracy rates, customer wait time improvements, and insurance claim resolution metrics. This guide shows how to present your retail pharmacy experience — whether you are newly certified or have years of experience — in a format that retail pharmacy hiring managers evaluate as job-ready from the first scan.`,
    summaries: {
      entry: '"Pharmacy Tech trainee with state registration and 6 months of retail pharmacy experience at [Pharmacy Name]. Process 150+ prescriptions daily including data entry, label generation, and customer pickup. Completed PTCB exam preparation and scheduled for certification. Proficient in QS/1 pharmacy software, insurance claim adjudication, and OTC product guidance."',
      mid: '"Experienced Pharmacy Tech with 3 years in high-volume retail pharmacy (300+ Rx/day). Certified Pharmacy Technician (CPhT) with expertise in prescription processing, insurance billing, controlled substance handling, and patient counseling triage. Reduced average prescription wait time from 25 minutes to 15 minutes through workflow optimization. Proficient in ScriptPro and RxConnect."',
      senior: '"Senior Pharmacy Tech and shift lead with 7+ years of retail pharmacy experience. Supervise 4 technicians during peak hours, manage inventory for a $2M+ annual revenue pharmacy, and train new hires on DEA compliance and pharmacy software systems. Maintained 99.8% dispensing accuracy across 200,000+ prescriptions. PTCB certified with immunization administration endorsement."'
    }
  },

  'pharmacy-technician': {
    description: 'Pharmacy Technician resume for PTCB/ExCPT-certified professionals in hospital, clinical, and specialty pharmacy settings. Covers sterile compounding, IV preparation, and clinical pharmacy support. Free 2026 guide.',
    introHeading: '## What Makes a Great Pharmacy Technician Resume?',
    introBody: `This Pharmacy Technician resume example is designed for PTCB or ExCPT-certified professionals working in hospital, clinical, or specialty pharmacy environments. The formal title "Pharmacy Technician" appears in institutional job postings — hospitals, health systems, compounding pharmacies, and long-term care facilities — where the role involves sterile compounding, IV admixture preparation, unit-dose dispensing, and direct clinical pharmacist support.

Hospital and clinical pharmacy technician roles demand a different skill set than retail positions. Sterile compounding (USP 797/800 compliance), hazardous drug handling, automated dispensing cabinet management (Pyxis, Omnicell), and medication cart filling are core competencies that differentiate clinical pharmacy technicians from retail counterparts.

The strongest pharmacy technician resumes for institutional settings emphasize accuracy rates, compounding volume, medication error prevention, and regulatory compliance. If you hold specialized certifications (Sterile Compounding, Chemotherapy/Hazardous Drug, or Medication History), these should appear prominently. This guide shows how to present hospital pharmacy experience in a format that clinical pharmacy directors prioritize during hiring.`,
    summaries: {
      entry: '"PTCB-Certified Pharmacy Technician with 1 year of hospital pharmacy experience at a 350-bed acute care facility. Prepare 50+ IV admixtures daily in a USP 797-compliant clean room. Proficient in Pyxis MedStation management, unit-dose packaging, and automated dispensing cabinet restocking. Completed sterile compounding competency validation."',
      mid: '"Certified Pharmacy Technician (CPhT) with 4 years of hospital pharmacy experience across inpatient, oncology, and OR pharmacy services. Compound 75+ sterile preparations daily including chemotherapy agents under USP 800 protocols. Manage controlled substance inventory with zero discrepancies over 18 months. Proficient in Epic Willow, BD Pyxis, and Baxter compounding systems."',
      senior: '"Senior Pharmacy Technician and pharmacy tech coordinator with 9+ years of clinical pharmacy experience. Supervise 6 technicians across day and evening shifts in a Level I trauma center pharmacy. Lead USP 797/800 compliance program, conduct monthly competency assessments, and serve on the Pharmacy & Therapeutics Committee. Specialty certifications: Sterile Compounding (CPhT-Adv) and Hazardous Drug Handling."'
    }
  },

  'desktop-support': {
    description: 'Desktop Support Technician resume for Tier 1-2 helpdesk and end-user support roles. Covers ticket resolution metrics, hardware troubleshooting, and common IT support tools. Free 2026 guide with ATS tips.',
    introHeading: '## What Makes a Great Desktop Support Resume?',
    introBody: `This Desktop Support resume example targets Tier 1 and Tier 2 helpdesk technicians who provide direct end-user support — troubleshooting hardware, software, network connectivity, and printer issues for employees who need to get back to work quickly. "Desktop Support" is the most common job title for these positions, appearing in thousands of active job postings across corporate IT departments and managed service providers.

Desktop support roles are evaluated primarily on ticket volume, resolution speed, and customer satisfaction. The best desktop support resumes quantify these metrics: how many tickets you close per day, your first-call resolution rate, your average resolution time, and your user satisfaction scores. These numbers tell hiring managers more about your capability than any list of certifications.

This guide shows how to present your helpdesk experience — whether you support 50 users or 500 — in a format that demonstrates both technical troubleshooting ability and the soft skills that make users feel supported. IT managers hiring desktop support technicians want someone who can fix the problem AND make the user feel good about the interaction.`,
    summaries: {
      entry: '"Desktop Support Technician with CompTIA A+ certification and 8 months of helpdesk experience supporting 100+ users. Resolve 15+ tickets daily covering Windows 10/11, Office 365, VPN connectivity, and printer issues. First-call resolution rate: 72%. Proficient in ServiceNow ticketing, Active Directory user management, and remote desktop tools (TeamViewer, Remote Desktop)."',
      mid: '"Desktop Support Specialist with 3 years of Tier 1-2 experience supporting 400+ users across a multi-site corporate environment. Resolve 25+ tickets daily with an 85% first-call resolution rate and 4.7/5.0 user satisfaction score. Skilled in Windows/macOS troubleshooting, Office 365 administration, Cisco VPN, and mobile device management (Intune). Reduced average ticket resolution time from 4 hours to 1.5 hours."',
      senior: '"Senior Desktop Support Technician and shift lead with 6+ years of enterprise helpdesk experience. Support 800+ users across 5 office locations and remote workforce. Manage Tier 2 escalations for complex network, imaging, and deployment issues. Lead desktop refresh projects (200+ workstation deployments) and train junior technicians. Certifications: CompTIA A+, Network+, ITIL Foundation."'
    }
  },

  'desktop-support-engineer': {
    description: 'Desktop Support Engineer resume for senior IT roles handling Tier 2-3 escalations, system imaging, endpoint management, and infrastructure projects. Covers SCCM, Intune, and enterprise deployment. Free 2026 guide.',
    introHeading: '## What Makes a Great Desktop Support Engineer Resume?',
    introBody: `This Desktop Support Engineer resume example is designed for senior-level IT professionals who go beyond basic troubleshooting to handle Tier 2-3 escalations, system imaging and deployment, endpoint management, and infrastructure projects. The "Engineer" title signals a higher level of technical depth than standard desktop support — and your resume needs to reflect that distinction.

Desktop Support Engineers are expected to solve problems that frontline helpdesk technicians cannot. This includes Group Policy troubleshooting, SCCM/Intune package deployment, OS imaging and driver management, network infrastructure issues (DHCP, DNS, VLAN), and scripting for automation (PowerShell, batch). Your resume should demonstrate that you operate at the systems level, not just the user level.

The strongest Desktop Support Engineer resumes show a progression from reactive troubleshooting to proactive infrastructure improvement: reducing ticket volume through automation, standardizing endpoint configurations, leading hardware refresh cycles, and mentoring junior support staff. This guide shows how to position your experience for engineering-level roles rather than being filtered into basic helpdesk positions.`,
    summaries: {
      entry: '"Desktop Support Engineer with CompTIA A+/Network+ certifications and 2 years of IT support experience. Handle Tier 2 escalations for 300+ users including Group Policy issues, SCCM software deployment, and network connectivity troubleshooting. Created PowerShell scripts automating 5 common support tasks, reducing manual resolution time by 40%. Proficient in Windows Server, Active Directory, and VMware."',
      mid: '"Desktop Support Engineer with 5 years of enterprise IT experience supporting 600+ users across hybrid (on-prem/Azure AD) environments. Manage endpoint deployment using SCCM and Intune, maintain Windows 11 SOE images, and troubleshoot Tier 2-3 escalations including Group Policy conflicts, driver issues, and network infrastructure problems. Reduced annual ticket volume by 20% through automated remediation scripts and self-service portal improvements."',
      senior: '"Senior Desktop Support Engineer and technical lead with 8+ years of enterprise endpoint management experience. Architect endpoint strategy for a 1,200-user organization including SCCM task sequences, Intune compliance policies, and BitLocker encryption deployment. Lead a team of 4 support engineers, manage $500K annual hardware refresh budget, and serve as escalation point for all desktop infrastructure issues. MCSE and ITIL v4 certified."'
    }
  },
};

// ─── Main ──────────────────────────────────────────────────────────────

for (const [slug, diff] of Object.entries(DIFFERENTIATIONS)) {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${slug}.mdx`);
    continue;
  }

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);

  // Update description
  data.description = diff.description;

  // Replace intro section (from first ## to ## Professional Summary)
  const summaryIdx = content.indexOf('## Professional Summary');
  if (summaryIdx === -1) {
    console.log(`⚠️  No Professional Summary found in ${slug}.mdx — skipping`);
    continue;
  }

  const newIntro = `${diff.introHeading}\n\n${diff.introBody}\n\n`;

  // Replace professional summaries
  const salaryIdx = content.indexOf('## Salary');
  const essentialIdx = content.indexOf('## Essential Skills');
  const afterSummaryIdx = salaryIdx !== -1 ? salaryIdx : essentialIdx;

  if (afterSummaryIdx === -1) {
    console.log(`⚠️  No section after summaries found in ${slug}.mdx — skipping`);
    continue;
  }

  const newSummaries = `## Professional Summary Examples

**For Entry-Level:**
${diff.summaries.entry}

**For Mid-Level:**
${diff.summaries.mid}

**For Senior:**
${diff.summaries.senior}

`;

  const newContent = newIntro + newSummaries + content.slice(afterSummaryIdx);

  const newFile = matter.stringify(newContent, data);
  fs.writeFileSync(filePath, newFile, 'utf-8');
  console.log(`✅ Differentiated: ${slug}.mdx`);
}

console.log('\n🎯 All near-duplicate pages differentiated.');
