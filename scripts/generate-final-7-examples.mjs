#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = path.join(process.cwd(), 'frontend/content/resume-examples');

// Final 7 to reach 500+
const JOBS = [
  {
    slug: 'limousine-driver',
    jobTitle: 'Limousine Driver',
    category: 'Transportation',
    avgSalary: '$38,000',
    salaryRange: '$28,000 - $55,000',
    yearsExperience: '1-3',
    jobGrowth: '5%',
    keySkills: ['Chauffeur Service', 'Route Planning', 'Client Relations', 'Vehicle Maintenance', 'Professional Appearance'],
    certifications: ['Commercial Drivers License', 'Defensive Driving', 'First Aid'],
    cardSummary: 'Deliver VIP experiences on wheels. Show your client service and safety record.',
    hiringTip: 'Limo drivers are judged on professionalism and discretion. Highlight high-profile clients served (without names), perfect driving record, and luxury vehicle experience.',
    interviewQuestions: [
      { q: 'How do you ensure client confidentiality?', guidance: 'Emphasize discretion and professionalism' },
      { q: 'Describe your vehicle inspection routine', guidance: 'Show thoroughness and attention to detail' },
      { q: 'How do you handle special requests?', guidance: 'Demonstrate flexibility and service orientation' },
      { q: 'How do you navigate unfamiliar areas?', guidance: 'Show navigation skills and backup planning' },
      { q: 'Describe your experience with corporate clients', guidance: 'Highlight professionalism' }
    ],
    atsKeywords: ['chauffeur', 'limousine driver', 'executive transport', 'luxury vehicle', 'VIP service', 'CDL']
  },
  {
    slug: 'moving-company-driver',
    jobTitle: 'Moving Company Driver',
    category: 'Transportation',
    avgSalary: '$42,000',
    salaryRange: '$32,000 - $58,000',
    yearsExperience: '1-3',
    jobGrowth: '6%',
    keySkills: ['Furniture Handling', 'Truck Driving', 'Customer Service', 'Loading Optimization', 'Damage Prevention'],
    certifications: ['CDL Class B', 'DOT Medical Card', 'First Aid'],
    cardSummary: 'Move families and businesses safely. Show your efficiency and zero-damage record.',
    hiringTip: 'Moving companies want drivers who can also lead crews. Highlight damage claim rates, moves completed per week, and ability to handle specialty items (pianos, antiques).',
    interviewQuestions: [
      { q: 'How do you protect furniture during a move?', guidance: 'Describe padding and wrapping techniques' },
      { q: 'How do you optimize truck loading?', guidance: 'Show spatial planning skills' },
      { q: 'How do you handle customer complaints?', guidance: 'Demonstrate customer service focus' },
      { q: 'Describe your experience with specialty items', guidance: 'Mention pianos, antiques, safes' },
      { q: 'How do you manage a moving crew?', guidance: 'Show leadership skills' }
    ],
    atsKeywords: ['moving driver', 'furniture mover', 'CDL', 'commercial driver', 'relocation', 'logistics', 'crew lead']
  },
  {
    slug: 'residential-cleaner',
    jobTitle: 'Residential Cleaner',
    category: 'Cleaning',
    avgSalary: '$32,000',
    salaryRange: '$24,000 - $42,000',
    yearsExperience: '0-2',
    jobGrowth: '8%',
    keySkills: ['Deep Cleaning', 'Time Management', 'Attention to Detail', 'Chemical Safety', 'Client Communication'],
    certifications: ['Cleaning Certification', 'First Aid', 'Background Check'],
    cardSummary: 'Transform homes into spotless spaces. Show your efficiency and client retention.',
    hiringTip: 'Residential cleaners should highlight homes cleaned per day, recurring client relationships, and any specialty services (move-out cleaning, post-construction).',
    interviewQuestions: [
      { q: 'How many homes can you clean in a day?', guidance: 'Provide realistic numbers based on home size' },
      { q: 'How do you handle cleaning chemicals safely?', guidance: 'Show safety awareness' },
      { q: 'Describe your approach to deep cleaning', guidance: 'Outline systematic process' },
      { q: 'How do you handle client requests for changes?', guidance: 'Demonstrate flexibility' },
      { q: 'How do you ensure nothing is damaged?', guidance: 'Show careful attention to belongings' }
    ],
    atsKeywords: ['residential cleaner', 'house cleaner', 'deep cleaning', 'maid service', 'cleaning professional', 'home care']
  },
  {
    slug: 'commercial-cleaner',
    jobTitle: 'Commercial Cleaner',
    category: 'Cleaning',
    avgSalary: '$35,000',
    salaryRange: '$26,000 - $45,000',
    yearsExperience: '0-2',
    jobGrowth: '7%',
    keySkills: ['Floor Care', 'Sanitization', 'Equipment Operation', 'OSHA Compliance', 'Team Coordination'],
    certifications: ['OSHA 10', 'Floor Care Certification', 'Bloodborne Pathogens'],
    cardSummary: 'Keep businesses pristine and safe. Show your square footage coverage and compliance.',
    hiringTip: 'Commercial cleaners should highlight square footage maintained, types of facilities serviced (medical, office, industrial), and any specialized equipment certifications.',
    interviewQuestions: [
      { q: 'What square footage can you cover per shift?', guidance: 'Provide realistic productivity metrics' },
      { q: 'How do you prioritize tasks in a large facility?', guidance: 'Show organizational skills' },
      { q: 'What floor care equipment have you operated?', guidance: 'List specific machines' },
      { q: 'How do you handle biohazard situations?', guidance: 'Demonstrate safety protocols' },
      { q: 'Describe your experience in medical facilities', guidance: 'Show understanding of healthcare cleaning standards' }
    ],
    atsKeywords: ['commercial cleaner', 'janitorial', 'floor care', 'sanitization', 'OSHA', 'facility maintenance', 'industrial cleaning']
  },
  {
    slug: 'pet-groomer',
    jobTitle: 'Pet Groomer',
    category: 'Animal Care',
    avgSalary: '$35,000',
    salaryRange: '$25,000 - $52,000',
    yearsExperience: '1-3',
    jobGrowth: '10%',
    keySkills: ['Breed-Specific Grooming', 'Scissor Techniques', 'Animal Handling', 'Customer Service', 'Sanitation'],
    certifications: ['National Dog Groomers Association Certification', 'Pet First Aid', 'Breed Certifications'],
    cardSummary: 'Transform furry friends into show-stoppers. Show your breed expertise and client retention.',
    hiringTip: 'Pet groomers should highlight dogs groomed per day, breed specializations, and any certifications. Repeat client rate demonstrates skill and trust.',
    interviewQuestions: [
      { q: 'How many dogs can you groom in a day?', guidance: 'Provide realistic numbers by breed complexity' },
      { q: 'How do you handle anxious or aggressive animals?', guidance: 'Show safety techniques and patience' },
      { q: 'What breeds are you most experienced with?', guidance: 'Highlight specialty breeds' },
      { q: 'How do you handle a matted coat?', guidance: 'Demonstrate technical knowledge' },
      { q: 'How do you upsell services to clients?', guidance: 'Show business awareness' }
    ],
    atsKeywords: ['pet groomer', 'dog groomer', 'animal grooming', 'breed cuts', 'scissor work', 'NDGA certified', 'hand stripping']
  },
  {
    slug: 'animal-shelter-worker',
    jobTitle: 'Animal Shelter Worker',
    category: 'Animal Care',
    avgSalary: '$32,000',
    salaryRange: '$24,000 - $42,000',
    yearsExperience: '0-2',
    jobGrowth: '16%',
    keySkills: ['Animal Care', 'Kennel Management', 'Adoption Counseling', 'Medical Monitoring', 'Public Education'],
    certifications: ['Animal Care Certification', 'Fear Free Certified', 'Euthanasia Technician'],
    cardSummary: 'Save lives and find forever homes. Show your adoption rates and animal care skills.',
    hiringTip: 'Shelter workers should highlight adoption success rates, animal handling experience, and ability to work in emotionally challenging environments.',
    interviewQuestions: [
      { q: 'How do you handle euthanasia emotionally?', guidance: 'Show resilience and self-care' },
      { q: 'Describe your animal assessment process', guidance: 'Show evaluation skills' },
      { q: 'How do you match adopters with pets?', guidance: 'Demonstrate adoption counseling' },
      { q: 'How do you handle a bite incident?', guidance: 'Show safety protocols' },
      { q: 'How do you socialize fearful animals?', guidance: 'Demonstrate behavioral knowledge' }
    ],
    atsKeywords: ['animal shelter', 'kennel attendant', 'adoption counselor', 'animal care', 'rescue', 'Fear Free', 'humane society']
  },
  {
    slug: 'fitness-center-manager',
    jobTitle: 'Fitness Center Manager',
    category: 'Fitness',
    avgSalary: '$55,000',
    salaryRange: '$40,000 - $78,000',
    yearsExperience: '3-5',
    jobGrowth: '10%',
    keySkills: ['Facility Operations', 'Staff Management', 'Membership Sales', 'Budget Management', 'Customer Retention'],
    certifications: ['Certified Fitness Manager', 'CPR/AED', 'Business Management'],
    cardSummary: 'Build thriving fitness communities. Show your membership growth and retention rates.',
    hiringTip: 'Fitness center managers should highlight membership growth percentages, revenue generation, staff development, and member retention rates.',
    interviewQuestions: [
      { q: 'How do you drive membership sales?', guidance: 'Describe marketing and sales strategies' },
      { q: 'How do you handle member complaints?', guidance: 'Show customer service skills' },
      { q: 'Describe your staff scheduling approach', guidance: 'Show operational management' },
      { q: 'How do you maintain equipment?', guidance: 'Demonstrate facility management' },
      { q: 'How do you measure member satisfaction?', guidance: 'Show data-driven approach' }
    ],
    atsKeywords: ['fitness center manager', 'gym manager', 'membership sales', 'facility management', 'retention', 'fitness operations', 'health club']
  }
];

function generateMDX(job) {
  const today = new Date().toISOString().split('T')[0];

  return `---
title: "${job.jobTitle} Resume Example & Writing Guide 2025"
description: "Professional ${job.jobTitle.toLowerCase()} resume example with expert writing tips. Learn how to highlight your ${job.keySkills.slice(0, 3).join(', ').toLowerCase()} skills."
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
${job.keySkills.map(s => `  - "${s}"`).join('\n')}
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

A strong ${job.jobTitle.toLowerCase()} resume demonstrates your ability to deliver results in the ${job.category.toLowerCase()} field. Hiring managers in this industry specifically look for candidates who can show measurable impact in ${job.keySkills.slice(0, 2).join(' and ').toLowerCase()}.

The most effective ${job.jobTitle.toLowerCase()} resumes go beyond listing job duties. They showcase quantifiable achievements that prove you can excel in this role.

## Professional Summary Examples

### Entry-Level ${job.jobTitle}
Motivated professional with foundational training in ${job.keySkills[0].toLowerCase()} and ${job.keySkills[1].toLowerCase()}. ${job.certifications[0] ? `Currently pursuing ${job.certifications[0]} certification.` : ''} Strong work ethic with demonstrated ability to learn quickly and contribute to team success.

### Mid-Level ${job.jobTitle}
Experienced ${job.jobTitle.toLowerCase()} with ${job.yearsExperience} years delivering results in ${job.keySkills[0].toLowerCase()} and ${job.keySkills[1].toLowerCase()}. Proven track record of exceeding performance targets while maintaining high standards. Seeking to leverage expertise in a challenging new role.

### Senior ${job.jobTitle}
Accomplished ${job.jobTitle.toLowerCase()} professional with extensive experience leading initiatives in ${job.keySkills[0].toLowerCase()}. Known for developing innovative solutions that improve efficiency and drive results. ${job.certifications[0] ? `${job.certifications[0]} certified with` : 'Demonstrated'} expertise mentoring junior team members.

## Salary & Job Outlook

The ${job.jobTitle.toLowerCase()} field offers competitive compensation with growth potential:

- **Median Salary:** ${job.avgSalary}
- **Salary Range:** ${job.salaryRange}
- **Job Growth:** ${job.jobGrowth} (next decade)

*Sources: [U.S. Bureau of Labor Statistics](https://www.bls.gov/ooh/), [Glassdoor](https://www.glassdoor.com/Salaries/), [PayScale](https://www.payscale.com/research/US/). Actual compensation varies by location, experience, and employer.*

## Essential Skills to Highlight

### Core Competencies
${job.keySkills.slice(0, 2).map(s => `- ${s}`).join('\n')}

### Technical Skills
${job.keySkills.slice(2, 4).map(s => `- ${s}`).join('\n')}

### Professional Skills
${job.keySkills.slice(4).map(s => `- ${s}`).join('\n')}
- Communication
- Problem-solving

## Achievement-Focused Bullet Points

Strong ${job.jobTitle.toLowerCase()} bullet points demonstrate measurable impact:

- Improved ${job.keySkills[0].toLowerCase()} efficiency by 25%, reducing processing time
- Implemented new ${job.keySkills[1].toLowerCase()} procedures, increasing accuracy by 30%
- Trained 5+ team members on ${job.keySkills[2].toLowerCase()} best practices
- Received consistent positive feedback for ${job.keySkills[3].toLowerCase()} abilities
- Reduced errors by 40% through improved quality control processes
- Contributed to team achieving 95%+ satisfaction ratings

## ${job.jobTitle} Resume Format & Template Tips

Your ${job.jobTitle.toLowerCase()} resume should emphasize relevant experience prominently. Consider these formatting recommendations:

- **Lead with impact:** Open with a summary highlighting your strongest ${job.category.toLowerCase()} achievements
- **Quantify results:** Include specific metrics like percentages, dollar amounts, or volume handled
- **Highlight certifications:** ${job.certifications[0] ? `Feature credentials like ${job.certifications[0]} prominently` : 'Feature relevant certifications prominently'}
- **Use industry keywords:** Include terms like "${job.atsKeywords.slice(0, 3).join('", "')}" for ATS optimization
- **Keep it concise:** One page for entry-level, two pages maximum for experienced professionals

## Hiring Manager Tip

> **"${job.hiringTip}"**

This insight reflects what decision-makers prioritize when reviewing ${job.jobTitle.toLowerCase()} candidates. Make sure your resume addresses these specific concerns directly.

## Common ${job.jobTitle} Interview Questions

${job.interviewQuestions.map((q, i) => `### ${i + 1}. ${q.q}
${q.guidance}`).join('\n\n')}

## Common Mistakes to Avoid

1. **Focusing on duties instead of achievements** - Describe what you accomplished, not just what you were responsible for
2. **Missing relevant keywords** - Include industry terms like ${job.atsKeywords.slice(0, 3).join(', ')} for ATS screening
3. **Omitting certifications** - ${job.certifications[0] ? `Credentials like ${job.certifications[0]} can set you apart` : 'Relevant certifications can set you apart'}
4. **Using generic descriptions** - Be specific about your contributions and their impact
5. **Neglecting soft skills** - ${job.category} roles require strong interpersonal abilities alongside technical skills

## ATS Optimization for ${job.jobTitle} Resumes

Ensure your resume passes Applicant Tracking Systems by including these keywords naturally throughout your document:

**Priority Keywords:** ${job.atsKeywords.slice(0, 4).join(', ')}

**Additional Keywords:** ${job.atsKeywords.slice(4).join(', ')}

Match the exact phrasing from job descriptions when possible, but maintain natural readability.

## Related Resources

- [Resume Writing Guide](/en/blog/resume-writing-guide)
- [Cover Letter Tips](/en/blog/cover-letter-tips)
- [Interview Preparation](/en/blog/interview-preparation)
- [Browse All Templates](/en/templates)
`;
}

async function main() {
  console.log(`\\n📝 Generating final ${JOBS.length} resume examples to reach 500+...\\n`);

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
