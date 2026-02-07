import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const fs = require('fs');
const path = require('path');
const matter = require(path.join(process.cwd(), 'frontend/node_modules/gray-matter'));

const dir = path.join(process.cwd(), 'frontend/content/resume-examples');

function countWords(text) {
  return text.split(/\s+/).filter(w => w.length > 0).length;
}

// Category-specific intro expansions for missing categories
const categoryIntros = {
  'Food Service': 'Food service hiring managers review resumes for speed, reliability, and the ability to maintain quality under pressure. Your resume should demonstrate experience with food safety protocols, kitchen efficiency, and consistent performance during high-volume service periods. Quantify your impact through covers served, food cost percentages, or customer satisfaction metrics.',
  'Hospitality': 'Hospitality hiring managers evaluate candidates based on guest satisfaction skills, operational efficiency, and the ability to handle high-pressure service situations with professionalism. Your resume should highlight specific guest-facing accomplishments, revenue contributions, and operational improvements that demonstrate your commitment to exceptional service standards.',
  'Cleaning': 'Cleaning and maintenance hiring managers prioritize reliability, attention to detail, and knowledge of safety protocols. Your resume should quantify the scope of your work — square footage maintained, number of rooms or units serviced daily, and specific cleaning certifications or chemical handling training that demonstrate professional-level competence.',
  'Construction': 'Construction hiring managers evaluate candidates based on trade certifications, safety records, and project experience. Your resume should prominently feature OSHA certifications, specific trade licenses, equipment proficiency, and project scope to demonstrate your qualifications for physically demanding, safety-critical work environments.',
  'Transportation': 'Transportation hiring managers verify license credentials, safety compliance records, and route management experience. Your resume should clearly present your commercial license class, endorsements, years of incident-free driving, and any specialized training in hazardous materials handling or passenger transport regulations.',
};

// Slug-specific additional paragraphs to add to the intro section
const slugExpansions = {
  'baker': 'Bakeries and restaurants evaluate bakers on product consistency, recipe scaling ability, and production speed. Feature your experience with specific baking techniques — lamination, fermentation timing, decoration — alongside volume metrics like daily production counts and waste reduction achievements.',
  'bellhop': 'Hotels assess bellhop candidates on guest interaction skills, physical stamina, and knowledge of hotel amenities. Your resume should highlight guest satisfaction contributions, luggage handling volume, and any additional responsibilities like concierge duties or VIP guest services.',
  'busser': 'Restaurant managers hiring bussers look for speed, teamwork, and attention to table presentation standards. Quantify your pace — tables cleared per shift, turnaround time — and highlight your coordination with servers and kitchen staff during peak dining hours.',
  'casino-dealer': 'Casino hiring processes are uniquely rigorous, requiring gaming licenses, mathematical accuracy under observation, and impeccable customer service. Your resume should list specific games dealt, gaming authority certifications, and any experience handling high-stakes tables or tournament events.',
  'cruise-ship-worker': 'Cruise line recruiters evaluate candidates differently than land-based hospitality. They prioritize adaptability, close-quarters teamwork, and the ability to maintain service excellence over extended contracts. Include sea-time hours, ship sizes worked, and STCW certifications alongside your hospitality experience.',
  'dishwasher': 'Kitchen managers hiring dishwashers look for speed, reliability, and knowledge of sanitation standards. Your resume should quantify throughput — dishes and utensils processed per shift — and highlight your understanding of commercial dishwashing equipment, chemical safety, and health department sanitation requirements.',
  'front-desk-agent': 'Front desk candidates are evaluated on multitasking ability, conflict resolution, and proficiency with property management systems. Your resume should reference specific PMS platforms you have used (Opera, Fosse, Maestro), check-in volume handled per shift, and guest satisfaction scores that reflect your service quality.',
  'housekeeper': 'Housekeeping managers prioritize consistency, speed, and adherence to brand cleanliness standards. Your resume should quantify rooms cleaned per shift, inspection pass rates, and any experience with specialized cleaning procedures such as biohazard cleanup or luxury property turndown service.',
  'housekeeping-supervisor': 'Hotels hiring housekeeping supervisors evaluate management ability, quality control systems, and staff training effectiveness. Your resume should demonstrate team sizes managed, inspection scores maintained, and operational improvements like reduced turnover time or improved guest satisfaction ratings related to room cleanliness.',
  'night-auditor': 'Night auditor candidates must demonstrate accounting accuracy, independence, and security awareness. Your resume should highlight experience with end-of-day reconciliation procedures, specific PMS systems operated, and your ability to manage front desk operations autonomously during overnight shifts.',
  'reservation-agent': 'Reservation centers evaluate agents on booking accuracy, upselling ability, and call handling metrics. Your resume should include average call handling time, booking conversion rates, and revenue generated through upgrades and add-on services to demonstrate both efficiency and sales aptitude.',
  'spa-manager': 'Spa and wellness hiring committees look for a blend of hospitality management and wellness industry knowledge. Your resume should demonstrate revenue management, therapist scheduling efficiency, retail product sales performance, and guest retention rates that reflect your ability to run a profitable wellness operation.',
  'tour-guide': 'Tour companies evaluate guides on communication skills, destination knowledge, and guest satisfaction ratings. Your resume should quantify tours led, group sizes managed, and review scores received across platforms. Multilingual abilities and specialized certifications in historical interpretation or adventure guiding are significant differentiators.',
  'travel-agent': 'Travel agencies assess agents on booking volume, client retention, and destination expertise. Your resume should feature total booking revenue generated, client portfolio size, preferred supplier certifications, and specialization areas like luxury travel, corporate travel, or destination weddings.',
  'valet-attendant': 'Valet services evaluate attendants on driving record, efficiency, and guest interaction quality. Your resume should feature your clean driving record, vehicles handled per shift, and any experience at high-end properties or events where attention to vehicle care and guest discretion are paramount.',
  'fast-food-worker': 'Quick-service restaurants evaluate candidates on speed, accuracy, and consistency. Your resume should include order accuracy rates, average service times, and any experience with specific POS systems or food preparation stations that demonstrate your ability to maintain quality during rush periods.',
  'food-runner': 'Restaurants evaluate food runners on speed, accuracy, and communication with both kitchen and front-of-house staff. Your resume should quantify plates delivered per shift, highlight your knowledge of menu items for guest inquiries, and demonstrate your coordination with servers to ensure timely, accurate service.',
  'catering-manager': 'Catering companies and event venues assess managers on event execution, client satisfaction, and revenue management. Feature specific event sizes coordinated, client retention rates, and revenue managed per quarter to demonstrate your ability to deliver seamless events while meeting financial targets.',
  'dietary-aide': 'Healthcare facilities evaluate dietary aides on accuracy in diet compliance, food safety knowledge, and patient interaction skills. Your resume should highlight experience with therapeutic diets, tray accuracy rates, and any collaboration with dietitians or nursing staff to meet patient nutritional requirements.',
  'prep-cook': 'Kitchen managers evaluate prep cooks on consistency, knife skills, and the ability to maintain production schedules. Your resume should quantify daily prep volume, highlight your knowledge of mise en place standards, and reference specific cuisines or techniques that demonstrate your culinary foundation.',
  'pastry-chef': 'Bakeries, hotels, and restaurants assess pastry chefs on creative range, production consistency, and menu development ability. Feature signature items created, daily production volumes, and any awards or recognition that distinguish your pastry work from competitors.',
  'commercial-cleaner': 'Commercial cleaning contracts require reliability documentation and scope of work capability. Your resume should specify square footage maintained per shift, types of facilities serviced (medical, office, industrial), and certifications in specialized cleaning methods like floor care, carpet extraction, or post-construction cleanup.',
  'residential-cleaner': 'Residential cleaning clients and agencies evaluate cleaners on attention to detail, efficiency, and trustworthiness. Your resume should highlight homes serviced per day, client retention rates, and any experience with specialized services like deep cleaning, move-out cleaning, or eco-friendly product expertise.',
  'iron-worker': 'Iron working contractors evaluate candidates on welding certifications, structural steel experience, and safety compliance. Your resume should feature AWS welding certifications, specific project types completed (bridges, high-rises, industrial), and tonnage installed to demonstrate your capability on commercial-scale structural projects.',
  'dispatcher': 'Dispatch operations evaluate candidates on multitasking ability, communication clarity, and familiarity with dispatch software. Your resume should feature average call volume managed, dispatch accuracy rates, and experience with specific CAD or fleet management systems used in your industry.',
};

const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'));
let updated = 0;

for (const file of files) {
  const filePath = path.join(dir, file);
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  const slug = file.replace('.mdx', '');
  const bodyWords = countWords(content);

  if (bodyWords >= 800) continue;

  let newContent = content;
  let wordsAdded = 0;

  // Strategy 1: Add slug-specific intro expansion
  if (slugExpansions[slug]) {
    const introMatch = newContent.match(/(## What Makes a Great[^\n]*\n\n[^\n]+\n)/);
    if (introMatch) {
      // Check if we already added a category expansion in pass 1
      const insertPoint = introMatch[0];
      // Find the end of the intro section (before ## Professional Summary)
      const summaryIdx = newContent.indexOf('## Professional Summary');
      const introEndIdx = summaryIdx > 0 ? summaryIdx : newContent.indexOf('\n## ', introMatch.index + 10);

      if (introEndIdx > 0) {
        const beforeSummary = newContent.substring(0, introEndIdx);
        const afterSummary = newContent.substring(introEndIdx);

        // Only add if this exact text doesn't already exist
        if (!beforeSummary.includes(slugExpansions[slug])) {
          newContent = beforeSummary + '\n' + slugExpansions[slug] + '\n\n' + afterSummary;
          wordsAdded += countWords(slugExpansions[slug]);
        }
      }
    }
  }
  // Strategy 1b: Category-based expansion if no slug-specific
  else if (categoryIntros[data.category]) {
    const introMatch = newContent.match(/(## What Makes a Great[^\n]*\n\n[^\n]+\n)/);
    if (introMatch) {
      const summaryIdx = newContent.indexOf('## Professional Summary');
      const introEndIdx = summaryIdx > 0 ? summaryIdx : newContent.indexOf('\n## ', introMatch.index + 10);

      if (introEndIdx > 0) {
        const beforeSummary = newContent.substring(0, introEndIdx);
        const afterSummary = newContent.substring(introEndIdx);

        if (!beforeSummary.includes(categoryIntros[data.category])) {
          newContent = beforeSummary + '\n' + categoryIntros[data.category] + '\n\n' + afterSummary;
          wordsAdded += countWords(categoryIntros[data.category]);
        }
      }
    }
  }

  // Strategy 2: Expand ATS section if still needed
  if (bodyWords + wordsAdded < 800) {
    const hasFormatAdvice = newContent.includes('Format your resume as a single-column');
    if (!hasFormatAdvice) {
      const atsKeywordsMatch = newContent.match(/(\*\*Additional Keywords:\*\*[^\n]*\n)/);
      if (atsKeywordsMatch) {
        const atsExpansion = '\nFormat your resume as a single-column layout without tables, text boxes, or graphics. Use standard section headings that ATS parsers recognize: Professional Summary, Work Experience, Education, Skills, and Certifications. Save as PDF unless the application specifically requests .docx format. Ensure your contact information appears in the body of the resume, not in headers or footers that some ATS systems skip during parsing.\n';
        newContent = newContent.replace(atsKeywordsMatch[0], atsKeywordsMatch[0] + atsExpansion);
        wordsAdded += countWords(atsExpansion);
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
    } else {
      console.log(`✅ ${slug}: ${bodyWords} → ${finalWords}`);
    }
  }
}

// Final check
const remaining = [];
for (const file of files) {
  const raw = fs.readFileSync(path.join(dir, file), 'utf8');
  const { content } = matter(raw);
  const words = countWords(content);
  if (words < 800) remaining.push({ file, words });
}

console.log(`\nPass 2 updated: ${updated} files`);
console.log(`Still under 800: ${remaining.length} files`);
remaining.forEach(r => console.log(`  ${r.file}: ${r.words} words`));
