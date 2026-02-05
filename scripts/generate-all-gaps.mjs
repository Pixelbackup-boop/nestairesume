#!/usr/bin/env node

/**
 * Generate all remaining examples to reach 526 target
 * Real Estate: +5, Animal Care: +3, Education: +2, Fitness: +1, Cleaning: +1
 * Plus fill remaining gaps in other categories
 */

import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = path.join(process.cwd(), 'frontend/content/resume-examples');

const JOBS = [
  // Real Estate (+5)
  {
    slug: 'real-estate-appraiser',
    jobTitle: 'Real Estate Appraiser',
    category: 'Real Estate',
    avgSalary: '$58,000',
    salaryRange: '$42,000 - $85,000',
    yearsExperience: '2-5',
    jobGrowth: '5%',
    cardSummary: 'Determine property values with precision. Show your certifications and report volume.',
    skills: ['Property Valuation', 'Market Analysis', 'Report Writing', 'Comparable Sales', 'USPAP Compliance'],
    certifications: ['State Licensed Appraiser', 'Certified Residential Appraiser', 'MAI Designation'],
    hiringTip: 'Lenders want appraisers with quick turnaround and clean reports. Show me your volume, turnaround time, and any specialty property types you handle.',
    atsKeywords: ['real estate appraiser', 'property valuation', 'USPAP', 'appraisal report', 'market analysis', 'comparable sales', 'residential appraiser']
  },
  {
    slug: 'title-examiner',
    jobTitle: 'Title Examiner',
    category: 'Real Estate',
    avgSalary: '$48,000',
    salaryRange: '$35,000 - $65,000',
    yearsExperience: '1-3',
    jobGrowth: '4%',
    cardSummary: 'Uncover title issues before they become problems. Show your search accuracy and volume.',
    skills: ['Title Search', 'Document Review', 'Chain of Title', 'Lien Research', 'Legal Description'],
    certifications: ['Title Examiner Certification', 'Paralegal Certificate'],
    hiringTip: 'Title companies need examiners who find issues others miss while maintaining volume. Show me your search accuracy rate and daily production numbers.',
    atsKeywords: ['title examiner', 'title search', 'chain of title', 'lien search', 'legal description', 'title insurance', 'real estate closing']
  },
  {
    slug: 'escrow-officer',
    jobTitle: 'Escrow Officer',
    category: 'Real Estate',
    avgSalary: '$55,000',
    salaryRange: '$40,000 - $78,000',
    yearsExperience: '2-4',
    jobGrowth: '5%',
    cardSummary: 'Close deals with confidence. Show your transaction volume and accuracy.',
    skills: ['Escrow Processing', 'Document Preparation', 'Funds Management', 'Closing Coordination', 'Regulatory Compliance'],
    certifications: ['Escrow Officer License', 'Notary Public', 'ALTA Best Practices'],
    hiringTip: 'I need escrow officers who can handle volume without errors. Show me monthly closings, accuracy rate, and experience with different transaction types.',
    atsKeywords: ['escrow officer', 'real estate closing', 'title insurance', 'settlement', 'HUD-1', 'closing disclosure', 'funds disbursement']
  },
  {
    slug: 'leasing-consultant',
    jobTitle: 'Leasing Consultant',
    category: 'Real Estate',
    avgSalary: '$38,000',
    salaryRange: '$28,000 - $55,000',
    yearsExperience: '0-2',
    jobGrowth: '7%',
    cardSummary: 'Fill units and keep residents happy. Show your lease conversion rates.',
    skills: ['Property Tours', 'Lease Negotiation', 'Tenant Screening', 'CRM Software', 'Move-in Coordination'],
    certifications: ['NAA Leasing Professional', 'Fair Housing Certification'],
    hiringTip: 'Leasing is a numbers game. Show me your traffic-to-lease conversion rate and any occupancy improvements you contributed to.',
    atsKeywords: ['leasing consultant', 'apartment leasing', 'property tours', 'tenant screening', 'occupancy', 'lease conversion', 'Yardi', 'RealPage']
  },
  {
    slug: 'commercial-real-estate-broker',
    jobTitle: 'Commercial Real Estate Broker',
    category: 'Real Estate',
    avgSalary: '$85,000',
    salaryRange: '$50,000 - $200,000',
    yearsExperience: '3-7',
    jobGrowth: '6%',
    cardSummary: 'Close deals that shape skylines. Show your transaction volume and deal sizes.',
    skills: ['Market Analysis', 'Deal Structuring', 'Client Acquisition', 'Financial Modeling', 'Lease Negotiation'],
    certifications: ['Real Estate License', 'CCIM Designation', 'SIOR'],
    hiringTip: 'CRE brokers are judged by transaction volume and deal size. Show me your closed deals, average commission, and client roster.',
    atsKeywords: ['commercial real estate', 'CRE broker', 'lease negotiation', 'investment sales', 'CCIM', 'tenant representation', 'landlord representation']
  },

  // Animal Care (+3)
  {
    slug: 'animal-control-officer',
    jobTitle: 'Animal Control Officer',
    category: 'Animal Care',
    avgSalary: '$40,000',
    salaryRange: '$30,000 - $55,000',
    yearsExperience: '1-3',
    jobGrowth: '8%',
    cardSummary: 'Protect animals and communities. Show your capture skills and case resolution.',
    skills: ['Animal Capture', 'Law Enforcement', 'Investigation', 'Public Education', 'Report Writing'],
    certifications: ['Animal Control Officer Certification', 'Euthanasia Technician', 'Peace Officer Standards'],
    hiringTip: 'I need officers who can handle dangerous animal situations safely while also being ambassadors to the community. Show me your case load and resolution rates.',
    atsKeywords: ['animal control', 'animal services', 'cruelty investigation', 'dangerous animal', 'field officer', 'animal capture', 'humane enforcement']
  },
  {
    slug: 'wildlife-biologist',
    jobTitle: 'Wildlife Biologist',
    category: 'Animal Care',
    avgSalary: '$65,000',
    salaryRange: '$48,000 - $90,000',
    yearsExperience: '3-6',
    jobGrowth: '5%',
    cardSummary: 'Study wildlife and guide conservation. Show your research impact and publications.',
    skills: ['Population Studies', 'Habitat Assessment', 'GIS Mapping', 'Statistical Analysis', 'Grant Writing'],
    certifications: ['Certified Wildlife Biologist', 'Masters in Wildlife Biology', 'GIS Certification'],
    hiringTip: 'Research agencies hire biologists who can secure funding and publish. Show me your grants won, publications, and species expertise.',
    atsKeywords: ['wildlife biologist', 'conservation', 'population study', 'habitat assessment', 'endangered species', 'field research', 'GIS', 'ecological']
  },
  {
    slug: 'aquarium-keeper',
    jobTitle: 'Aquarium Keeper',
    category: 'Animal Care',
    avgSalary: '$38,000',
    salaryRange: '$28,000 - $52,000',
    yearsExperience: '1-3',
    jobGrowth: '6%',
    cardSummary: 'Care for aquatic life in stunning exhibits. Show your species expertise and water chemistry skills.',
    skills: ['Water Chemistry', 'Fish Health', 'Exhibit Maintenance', 'Animal Training', 'Public Education'],
    certifications: ['Scuba Certification', 'Aquarium Science Certificate', 'First Aid'],
    hiringTip: 'Aquarium keepers need both animal husbandry skills and ability to engage visitors. Show me your species experience and any program development.',
    atsKeywords: ['aquarium keeper', 'aquarist', 'marine biology', 'water chemistry', 'fish husbandry', 'exhibit maintenance', 'animal care']
  },

  // Education (+2)
  {
    slug: 'curriculum-developer',
    jobTitle: 'Curriculum Developer',
    category: 'Education',
    avgSalary: '$68,000',
    salaryRange: '$50,000 - $95,000',
    yearsExperience: '3-6',
    jobGrowth: '7%',
    cardSummary: 'Design learning experiences that work. Show your curriculum adoptions and student outcomes.',
    skills: ['Instructional Design', 'Learning Standards', 'Assessment Development', 'Content Writing', 'EdTech Tools'],
    certifications: ['Instructional Design Certificate', 'Teaching License', 'Masters in Curriculum'],
    hiringTip: 'Curriculum developers are judged by adoption and outcomes. Show me curricula youve developed, districts using them, and any measurable student achievement gains.',
    atsKeywords: ['curriculum developer', 'instructional design', 'learning standards', 'assessment', 'Common Core', 'NGSS', 'educational content', 'course development']
  },
  {
    slug: 'education-consultant',
    jobTitle: 'Education Consultant',
    category: 'Education',
    avgSalary: '$72,000',
    salaryRange: '$52,000 - $105,000',
    yearsExperience: '5-10',
    jobGrowth: '8%',
    cardSummary: 'Transform schools and districts. Show your client results and implementation success.',
    skills: ['School Improvement', 'Professional Development', 'Data Analysis', 'Change Management', 'Stakeholder Engagement'],
    certifications: ['Principal License', 'Doctorate in Education', 'Consulting Certification'],
    hiringTip: 'Districts hire consultants who have been in the trenches and delivered results. Show me schools youve worked with and measurable improvements achieved.',
    atsKeywords: ['education consultant', 'school improvement', 'professional development', 'instructional coaching', 'district leadership', 'educational reform']
  },

  // Fitness (+1)
  {
    slug: 'pilates-instructor',
    jobTitle: 'Pilates Instructor',
    category: 'Fitness',
    avgSalary: '$52,000',
    salaryRange: '$35,000 - $78,000',
    yearsExperience: '1-4',
    jobGrowth: '15%',
    cardSummary: 'Build core strength and body awareness. Show your certifications and client transformations.',
    skills: ['Mat Pilates', 'Reformer', 'Injury Rehabilitation', 'Anatomy Knowledge', 'Class Programming'],
    certifications: ['Comprehensive Pilates Certification', 'STOTT Certified', 'Balanced Body', 'First Aid/CPR'],
    hiringTip: 'Studios want instructors with comprehensive certification (not just mat) and specialty experience. Show me your training lineage and any rehabilitation or special population expertise.',
    atsKeywords: ['pilates instructor', 'reformer', 'mat pilates', 'STOTT', 'Balanced Body', 'classical pilates', 'rehabilitation', 'group fitness']
  },

  // Cleaning (+1)
  {
    slug: 'hospital-housekeeper',
    jobTitle: 'Hospital Housekeeper',
    category: 'Cleaning',
    avgSalary: '$32,000',
    salaryRange: '$26,000 - $42,000',
    yearsExperience: '0-2',
    jobGrowth: '9%',
    cardSummary: 'Maintain infection-free healthcare environments. Show your protocol knowledge and compliance.',
    skills: ['Infection Control', 'Terminal Cleaning', 'Biohazard Handling', 'Equipment Sanitation', 'OSHA Compliance'],
    certifications: ['Hospital Housekeeping Certification', 'Bloodborne Pathogens', 'OSHA Training'],
    hiringTip: 'Healthcare housekeepers must understand infection control protocols. Show me your training in terminal cleaning and any experience with isolation rooms or OR turnover.',
    atsKeywords: ['hospital housekeeper', 'EVS', 'environmental services', 'infection control', 'terminal cleaning', 'healthcare cleaning', 'biohazard', 'sanitation']
  },

  // Additional Food Service (+4) to reach 25
  {
    slug: 'food-safety-manager',
    jobTitle: 'Food Safety Manager',
    category: 'Food Service',
    avgSalary: '$58,000',
    salaryRange: '$42,000 - $78,000',
    yearsExperience: '3-5',
    jobGrowth: '8%',
    cardSummary: 'Keep food operations safe and compliant. Show your inspection record and program development.',
    skills: ['HACCP', 'Regulatory Compliance', 'Staff Training', 'Audit Management', 'Quality Assurance'],
    certifications: ['CP-FS', 'SQF Practitioner', 'HACCP Certification', 'ServSafe Instructor'],
    hiringTip: 'Food safety managers are judged by audit scores and incident rates. Show me your facility audit results and any programs you developed to improve compliance.',
    atsKeywords: ['food safety manager', 'HACCP', 'FDA compliance', 'food safety audit', 'SQF', 'quality assurance', 'regulatory compliance']
  },
  {
    slug: 'food-stylist',
    jobTitle: 'Food Stylist',
    category: 'Food Service',
    avgSalary: '$55,000',
    salaryRange: '$35,000 - $95,000',
    yearsExperience: '2-5',
    jobGrowth: '6%',
    cardSummary: 'Make food look irresistible on camera. Show your client list and portfolio.',
    skills: ['Food Presentation', 'Photography Collaboration', 'Prop Styling', 'Recipe Testing', 'Quick Hands'],
    certifications: ['Culinary Degree', 'Food Photography Workshop'],
    hiringTip: 'Food stylists are hired for their portfolio. Show me your published work, the photographers you collaborate with, and any major brand clients.',
    atsKeywords: ['food stylist', 'food photography', 'prop styling', 'culinary arts', 'commercial photography', 'advertising', 'editorial']
  },
  {
    slug: 'sommelier',
    jobTitle: 'Sommelier',
    category: 'Food Service',
    avgSalary: '$58,000',
    salaryRange: '$40,000 - $95,000',
    yearsExperience: '3-6',
    jobGrowth: '5%',
    cardSummary: 'Curate wine experiences that elevate dining. Show your certifications and program revenue.',
    skills: ['Wine Knowledge', 'Beverage Program', 'Staff Training', 'Inventory Management', 'Guest Relations'],
    certifications: ['Court of Master Sommeliers', 'WSET', 'Certified Sommelier'],
    hiringTip: 'Sommeliers are judged by certification level and revenue impact. Show me your CMS level and any beverage program revenue growth you achieved.',
    atsKeywords: ['sommelier', 'wine director', 'beverage program', 'Court of Master Sommeliers', 'WSET', 'wine list', 'wine pairing']
  },
  {
    slug: 'food-scientist',
    jobTitle: 'Food Scientist',
    category: 'Food Service',
    avgSalary: '$72,000',
    salaryRange: '$52,000 - $100,000',
    yearsExperience: '3-6',
    jobGrowth: '7%',
    cardSummary: 'Develop products that consumers love. Show your launches and patents.',
    skills: ['Product Development', 'Sensory Analysis', 'Food Chemistry', 'Quality Control', 'Regulatory Knowledge'],
    certifications: ['Food Science Degree', 'CFS Certification', 'HACCP'],
    hiringTip: 'Food scientists are valued for products launched and problems solved. Show me SKUs youve developed that made it to market and any formulation challenges you overcame.',
    atsKeywords: ['food scientist', 'product development', 'R&D', 'food chemistry', 'sensory evaluation', 'quality control', 'formulation']
  },

  // Additional Government (+1)
  {
    slug: 'health-inspector',
    jobTitle: 'Health Inspector',
    category: 'Government',
    avgSalary: '$55,000',
    salaryRange: '$40,000 - $75,000',
    yearsExperience: '2-4',
    jobGrowth: '5%',
    cardSummary: 'Protect public health through inspections. Show your certification and enforcement record.',
    skills: ['Facility Inspection', 'Health Code Enforcement', 'Report Writing', 'Public Education', 'Investigation'],
    certifications: ['Registered Environmental Health Specialist', 'CP-FS', 'NEHA Certification'],
    hiringTip: 'Health departments want inspectors who can educate as well as enforce. Show me your inspection volume, enforcement actions, and any outbreak investigations.',
    atsKeywords: ['health inspector', 'environmental health', 'food inspection', 'REHS', 'sanitarian', 'public health', 'health code', 'FDA']
  },

  // Additional Creative (+1)
  {
    slug: 'storyboard-artist',
    jobTitle: 'Storyboard Artist',
    category: 'Creative',
    avgSalary: '$65,000',
    salaryRange: '$45,000 - $95,000',
    yearsExperience: '2-5',
    jobGrowth: '8%',
    cardSummary: 'Visualize stories frame by frame. Show your production credits and sample boards.',
    skills: ['Sequential Art', 'Cinematography', 'Character Acting', 'Quick Sketching', 'Storyboard Pro'],
    certifications: ['Animation Degree', 'Film Studies'],
    hiringTip: 'Storyboard artists are hired for speed and cinematic thinking. Show me boards from shipped productions and your pages-per-day rate.',
    atsKeywords: ['storyboard artist', 'storyboarding', 'animation', 'pre-production', 'sequential art', 'animatic', 'Storyboard Pro', 'visual development']
  }
];

function generateMDX(job) {
  const today = new Date().toISOString().split('T')[0];

  return `---
title: "${job.jobTitle} Resume Example & Writing Guide 2025"
description: "Professional ${job.jobTitle.toLowerCase()} resume example with expert tips. Learn how to showcase your ${job.skills.slice(0, 3).join(', ').toLowerCase()} expertise."
slug: "${job.slug}"
date: "${today}"
author: "Sarah Chen"
authorBio: "Career coach with 10+ years helping professionals land their dream jobs."
image: "/images/resume-examples/${job.slug}.svg"
imageAlt: "${job.jobTitle} Resume Example"
readTime: "8 min read"
category: "${job.category}"
cardSummary: "${job.cardSummary}"
jobTitle: "${job.jobTitle}"
avgSalary: "${job.avgSalary}"
salaryRange: "${job.salaryRange}"
yearsExperience: "${job.yearsExperience}"
jobGrowth: "${job.jobGrowth}"
keySkills:
${job.skills.map(s => `  - "${s}"`).join('\n')}
certifications:
${job.certifications.map(c => `  - "${c}"`).join('\n')}
tags:
  - "${job.jobTitle.toLowerCase()} resume"
  - "${job.jobTitle.toLowerCase()} resume example"
  - "${job.category.toLowerCase()} resume"
  - "resume example"
  - "resume template"
  - "ats resume"
---

## What Makes a Great ${job.jobTitle} Resume?

A strong ${job.jobTitle.toLowerCase()} resume demonstrates both technical expertise and measurable impact. Hiring managers in this field specifically look for candidates who can show quantifiable achievements alongside professional credentials.

The most effective ${job.jobTitle.toLowerCase()} resumes lead with relevant certifications and showcase specific outcomes: volume handled, improvements achieved, or results delivered.

## Professional Summary Examples

### Entry-Level ${job.jobTitle}
Motivated professional entering the ${job.category.toLowerCase()} field with foundational training in ${job.skills[0].toLowerCase()} and ${job.skills[1].toLowerCase()}. ${job.certifications[0] ? `Currently pursuing ${job.certifications[0]}.` : ''} Eager to apply knowledge and develop expertise in a professional environment.

### Mid-Level ${job.jobTitle}
Experienced ${job.jobTitle.toLowerCase()} with ${job.yearsExperience} years delivering results in ${job.skills[0].toLowerCase()} and ${job.skills[1].toLowerCase()}. Proven track record of meeting performance targets while maintaining quality standards. Known for ${job.skills[2].toLowerCase()} expertise.

### Senior ${job.jobTitle}
Accomplished ${job.jobTitle.toLowerCase()} professional with extensive experience leading initiatives and mentoring team members. ${job.certifications[0] ? `${job.certifications[0]} certified with` : 'Demonstrated'} expertise across all aspects of the role. Recognized for innovation and consistent delivery.

## Salary & Job Outlook

The ${job.jobTitle.toLowerCase()} field offers competitive compensation:

- **Median Salary:** ${job.avgSalary}
- **Salary Range:** ${job.salaryRange}
- **Job Growth:** ${job.jobGrowth} (next decade)

*Sources: [U.S. Bureau of Labor Statistics](https://www.bls.gov/ooh/), [Glassdoor](https://www.glassdoor.com/Salaries/), [PayScale](https://www.payscale.com/research/US/). Actual compensation varies by location, experience, and employer.*

## Essential Skills to Highlight

### Core Competencies
${job.skills.slice(0, 2).map(s => `- ${s}`).join('\n')}

### Technical Skills
${job.skills.slice(2, 4).map(s => `- ${s}`).join('\n')}

### Professional Skills
- ${job.skills[4] || 'Communication'}
- Problem-solving
- Attention to detail

## Achievement-Focused Bullet Points

Strong ${job.jobTitle.toLowerCase()} bullet points quantify your impact:

- Demonstrated expertise in ${job.skills[0].toLowerCase()}, achieving consistent performance
- Applied ${job.skills[1].toLowerCase()} skills to improve departmental efficiency
- Utilized ${job.skills[2].toLowerCase()} to deliver measurable results
- Maintained compliance with industry standards and regulatory requirements
- Collaborated with team members to achieve organizational goals
- Contributed to process improvements reducing errors and increasing productivity

## ${job.jobTitle} Resume Format & Template Tips

1. **Lead with credentials** - ${job.certifications[0] ? `Feature ${job.certifications[0]} prominently` : 'List relevant certifications first'}
2. **Quantify achievements** - Include specific metrics and numbers
3. **Match job keywords** - Mirror terminology from job postings
4. **Show progression** - Demonstrate career growth and increasing responsibility
5. **Keep it focused** - Prioritize relevant experience for this specific role

## Hiring Manager Tip

> **"${job.hiringTip}"**

This insight reflects what hiring managers prioritize when reviewing ${job.jobTitle.toLowerCase()} candidates. Make sure your resume addresses these specific concerns.

## Common ${job.jobTitle} Interview Questions

### 1. Tell me about your experience with ${job.skills[0].toLowerCase()}
Describe specific projects or situations where you applied this skill effectively.

### 2. How do you stay current in this field?
Discuss continuing education, certifications, and professional development.

### 3. Describe a challenging situation you handled
Use the STAR method to structure your response with measurable outcomes.

### 4. What interests you about this ${job.jobTitle.toLowerCase()} position?
Connect your skills and goals with the specific opportunity.

### 5. How do you prioritize competing demands?
Show your organizational skills and decision-making process.

## Common Mistakes to Avoid

1. **Missing certifications** - ${job.certifications[0] ? `Credentials like ${job.certifications[0]} should be prominently displayed` : 'Relevant certifications are essential'}
2. **Generic descriptions** - Use specific metrics and outcomes instead of vague statements
3. **Ignoring keywords** - Include terms like ${job.atsKeywords.slice(0, 3).join(', ')} for ATS optimization
4. **Poor organization** - Lead with most relevant experience and qualifications
5. **Typos and errors** - Proofread carefully as attention to detail matters in this field

## ATS Optimization for ${job.jobTitle} Resumes

Include these keywords naturally throughout your resume:

**Priority Keywords:** ${job.atsKeywords.slice(0, 4).join(', ')}

**Additional Keywords:** ${job.atsKeywords.slice(4).join(', ')}

## Related Resources

- [Resume Writing Guide](/en/blog/resume-writing-guide)
- [Cover Letter Tips](/en/blog/cover-letter-tips)
- [Interview Preparation](/en/blog/interview-preparation)
- [Browse All Templates](/en/templates)
`;
}

async function main() {
  console.log(`\\n📝 Generating ${JOBS.length} remaining resume examples to reach 526...\\n`);

  let created = 0;
  let skipped = 0;

  for (const job of JOBS) {
    const filePath = path.join(OUTPUT_DIR, `${job.slug}.mdx`);

    if (fs.existsSync(filePath)) {
      console.log(`⏭️  Skipped (exists): ${job.slug}`);
      skipped++;
      continue;
    }

    const content = generateMDX(job);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Created: ${job.slug}`);
    created++;
  }

  console.log(`\\n📊 Summary:`);
  console.log(`   Created: ${created}`);
  console.log(`   Skipped: ${skipped}`);
}

main().catch(console.error);
