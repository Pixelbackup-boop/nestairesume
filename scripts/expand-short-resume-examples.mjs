import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const fs = require('fs');
const path = require('path');
const matter = require(path.join(process.cwd(), 'frontend/node_modules/gray-matter'));

const dir = path.join(process.cwd(), 'frontend/content/resume-examples');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'));

function countWords(text) {
  return text.split(/\s+/).filter(w => w.length > 0).length;
}

function getSlug(filename) {
  return filename.replace('.mdx', '');
}

// Profession-specific expansions for the intro section
// Maps slug patterns to additional intro content
const introExpansions = {
  'sommelier': 'Wine expertise and certification level form the backbone of a strong sommelier resume. Restaurants and hotels evaluate candidates based on their knowledge of global wine regions, food pairing abilities, and ability to manage a profitable beverage program. Your resume should reflect both your palate development and your business acumen — including inventory management, vendor relationships, and revenue contribution from wine sales.',
  'storyboard-artist': 'Storyboard artist resumes succeed when they balance artistic skill with production workflow knowledge. Studios and agencies look for candidates who can translate scripts into visual sequences efficiently while meeting tight production deadlines. Beyond drawing ability, hiring managers want to see experience with animatics, shot composition, and collaboration with directors and animators across pre-production pipelines.',
  'food-stylist': 'Food styling resumes must demonstrate both culinary technique and visual storytelling ability. Agencies and brands hiring food stylists evaluate portfolios first, but the resume needs to establish your professional credibility — including clients served, publication credits, and experience across photography, video, and commercial shoots. Highlight your knowledge of food photography lighting, prop styling, and the specific techniques that make food camera-ready.',
  'education-consultant': 'Education consulting resumes must demonstrate expertise in curriculum design, institutional assessment, and measurable student outcomes. School districts and educational organizations evaluate consultants based on their ability to diagnose institutional challenges and implement data-driven improvements. Your resume should highlight specific programs developed, schools served, and quantifiable improvements in student achievement or institutional metrics.',
  'aquarium-keeper': 'Aquarium keeper resumes need to demonstrate expertise in aquatic animal husbandry, water chemistry management, and exhibit maintenance. Zoos and aquariums evaluate candidates based on their species knowledge, life support system experience, and ability to maintain animal welfare standards. Include specific species you have worked with, exhibit sizes managed, and any breeding or conservation program involvement.',
};

// Category-based intro expansions
const categoryIntros = {
  'Healthcare': 'Hiring managers in healthcare review resumes with a focus on clinical competency, patient safety, and regulatory compliance. Your resume should clearly present your licensure, certifications, and clinical experience in a format that demonstrates your readiness to deliver quality patient care from day one.',
  'Education': 'Education hiring committees evaluate resumes based on instructional methodology, classroom management, and measurable student outcomes. Your resume should demonstrate not just where you have taught, but how your teaching approach has positively impacted student learning and engagement.',
  'Technology': 'Technical hiring managers scan resumes for specific technology stacks, project complexity, and problem-solving ability. Your resume should lead with the technologies most relevant to your target role and support them with concrete examples of systems built, problems solved, and measurable impact delivered.',
  'Trades & Labor': 'Trades hiring managers prioritize safety certifications, hands-on technical skills, and reliability. Your resume should prominently feature relevant licenses, equipment certifications, and specific project experience that demonstrates your ability to work safely and efficiently on job sites.',
  'Business & Finance': 'Finance and business hiring managers focus on analytical ability, regulatory knowledge, and quantifiable results. Your resume should demonstrate your impact through specific metrics — revenue influenced, costs reduced, accounts managed, or compliance standards maintained.',
  'Creative & Design': 'Creative hiring managers evaluate both your portfolio and your resume. While your work samples showcase talent, your resume must demonstrate professional reliability — meeting deadlines, managing client relationships, and contributing to projects that delivered measurable business results.',
  'Hospitality & Service': 'Hospitality hiring managers look for customer service excellence, operational efficiency, and the ability to perform under pressure. Your resume should quantify your impact through guest satisfaction scores, revenue contributions, and operational improvements that demonstrate you can maintain service standards during high-volume periods.',
  'Legal': 'Legal hiring managers evaluate resumes for specific practice area expertise, jurisdictional knowledge, and case outcomes. Your resume should clearly present your bar admissions, practice specializations, and notable case results or transactions that demonstrate substantive legal competence.',
  'Public Service': 'Public service hiring processes often involve structured evaluations where resumes are scored against specific criteria. Your resume should directly address the qualifications listed in the job announcement, using the exact terminology from the posting to ensure evaluators can quickly match your experience to requirements.',
  'Animal Care': 'Animal care hiring managers look for species-specific experience, safety awareness, and genuine passion for animal welfare. Your resume should detail the types and numbers of animals you have cared for, specific husbandry protocols followed, and any specialized training or certifications in animal handling.',
  'Science & Research': 'Research hiring committees evaluate publication records, grant experience, and methodological expertise. Your resume should highlight specific research methodologies, laboratory techniques, published findings, and the real-world impact of your scientific contributions.',
  'Transportation': 'Transportation hiring managers verify certifications, safety records, and route experience. Your resume should prominently feature your license class, endorsements, safety record, and specific experience with vehicle types or route complexities relevant to the position.',
  'Manufacturing': 'Manufacturing hiring managers prioritize production efficiency, quality control experience, and safety compliance. Your resume should quantify your contributions through production rates, defect reduction percentages, and specific machinery or processes you have operated.',
  'Social Services': 'Social services hiring managers evaluate clinical skills, cultural competence, and caseload management ability. Your resume should demonstrate your experience with specific populations, intervention methodologies, and measurable client outcomes that reflect your effectiveness as a practitioner.',
};

// Expansion for ATS section
const atsExpansions = {
  'default': '\nFormat your resume as a single-column layout without tables, text boxes, or graphics. Use standard section headings that ATS parsers recognize: Professional Summary, Work Experience, Education, Skills, and Certifications. Save as PDF unless the application specifically requests .docx format. Ensure your contact information appears in the body of the resume, not in headers or footers that some ATS systems skip during parsing.\n',
};

let updated = 0;
let alreadyOk = 0;

for (const file of files) {
  const filePath = path.join(dir, file);
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  const slug = getSlug(file);

  const bodyWords = countWords(content);
  if (bodyWords >= 800) {
    alreadyOk++;
    continue;
  }

  const wordsNeeded = 800 - bodyWords + 10; // Add 10 word buffer
  let newContent = content;
  let wordsAdded = 0;

  // Strategy 1: Expand the intro section (add after the first paragraph under "## What Makes a Great")
  if (wordsNeeded > 0) {
    const introMatch = newContent.match(/(## What Makes a Great[^\n]*\n\n[^\n]+\n)/);
    if (introMatch) {
      let expansion = '';

      // Check for slug-specific expansion first
      if (introExpansions[slug]) {
        expansion = introExpansions[slug];
      } else {
        // Use category-based expansion
        const category = data.category || '';
        if (categoryIntros[category]) {
          expansion = categoryIntros[category];
        }
      }

      if (expansion) {
        const insertPoint = introMatch[0];
        newContent = newContent.replace(insertPoint, insertPoint + '\n' + expansion + '\n');
        wordsAdded += countWords(expansion);
      }
    }
  }

  // Strategy 2: Expand ATS section if still under target
  if (bodyWords + wordsAdded < 800) {
    const atsMatch = newContent.match(/(## ATS Optimization for[^\n]*\n\n)/);
    if (atsMatch) {
      // Check if there's already a "Format your resume" paragraph
      const hasFormatAdvice = newContent.includes('Format your resume as a single-column');
      if (!hasFormatAdvice) {
        // Find the end of the ATS section to add content
        const atsKeywordsMatch = newContent.match(/(\*\*Additional Keywords:\*\*[^\n]*\n)/);
        if (atsKeywordsMatch) {
          const insertAfter = atsKeywordsMatch[0];
          newContent = newContent.replace(insertAfter, insertAfter + atsExpansions['default']);
          wordsAdded += countWords(atsExpansions['default']);
        }
      }
    }
  }

  // Strategy 3: Expand interview question guidance if still under target
  if (bodyWords + wordsAdded < 800) {
    // Find generic one-line interview answers and expand them slightly
    const genericAnswers = [
      {
        find: 'Describe specific projects or situations where you applied this skill effectively.',
        replace: 'Describe specific projects or situations where you applied this skill effectively. Use concrete examples with measurable outcomes — mention the scope of the project, your specific role, and the result you achieved.'
      },
      {
        find: 'Discuss continuing education, certifications, and professional development.',
        replace: 'Discuss continuing education, certifications, and professional development activities. Mention specific courses, conferences, publications, or professional associations that keep your skills current and demonstrate commitment to growth in your field.'
      },
      {
        find: 'Use the STAR method to structure your response with measurable outcomes.',
        replace: 'Use the STAR method to structure your response with measurable outcomes. Describe the Situation, the Task you were responsible for, the Action you took, and the quantifiable Result. Choose an example that demonstrates problem-solving and resilience.'
      },
      {
        find: 'Connect your skills and goals with the specific opportunity.',
        replace: 'Connect your skills and goals with the specific opportunity. Research the company beforehand and reference specific aspects of their work, culture, or mission that align with your professional interests and career trajectory.'
      },
      {
        find: 'Show your organizational skills and decision-making process.',
        replace: 'Show your organizational skills and decision-making process. Explain the framework or criteria you use to evaluate urgency and importance, and provide a specific example where effective prioritization led to a successful outcome.'
      }
    ];

    for (const { find, replace } of genericAnswers) {
      if (newContent.includes(find) && bodyWords + wordsAdded < 800) {
        newContent = newContent.replace(find, replace);
        wordsAdded += countWords(replace) - countWords(find);
      }
    }
  }

  if (wordsAdded > 0) {
    const newRaw = matter.stringify(newContent, data);
    fs.writeFileSync(filePath, newRaw);
    updated++;
    const finalWords = countWords(newContent);
    if (finalWords < 800) {
      console.log(`⚠️  ${slug}: ${bodyWords} → ${finalWords} (still under 800, need ${800 - finalWords} more)`);
    }
  }
}

// Second pass: check remaining under-800 files
const remaining = [];
for (const file of files) {
  const filePath = path.join(dir, file);
  const raw = fs.readFileSync(filePath, 'utf8');
  const { content } = matter(raw);
  const words = countWords(content);
  if (words < 800) {
    remaining.push({ file, words, need: 800 - words });
  }
}

console.log(`\nUpdated: ${updated} files`);
console.log(`Already OK: ${alreadyOk} files`);
console.log(`Still under 800: ${remaining.length} files`);
if (remaining.length > 0) {
  remaining.forEach(r => console.log(`  ${r.file}: ${r.words} words (need ${r.need} more)`));
}
