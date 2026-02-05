#!/usr/bin/env node

/**
 * Generate 10 Creative & Design resume examples following CLAUDE.md guidelines
 */

import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = path.join(process.cwd(), 'frontend/content/resume-examples');

const JOBS = [
  {
    slug: 'illustrator',
    jobTitle: 'Illustrator',
    category: 'Creative',
    avgSalary: '$55,000',
    salaryRange: '$38,000 - $85,000',
    yearsExperience: '2-5',
    jobGrowth: '4%',
    blsUrl: 'https://www.bls.gov/ooh/arts-and-design/craft-and-fine-artists.htm',
    cardSummary: 'Bring ideas to life visually. Show your style range and commercial success.',
    skills: {
      technical: ['Digital Illustration', 'Traditional Media', 'Vector Art', 'Character Design'],
      software: ['Adobe Illustrator', 'Photoshop', 'Procreate', 'Clip Studio Paint'],
      business: ['Client Communication', 'Art Direction', 'Licensing', 'Project Management']
    },
    certifications: ['Adobe Certified', 'Fine Arts Degree', 'Illustration Certificate'],
    summaries: {
      entry: 'Emerging illustrator with BFA in Illustration and internship experience at design studio. Proficient in digital and traditional media with developing portfolio across editorial, book, and product illustration. Adobe Creative Suite expert.',
      mid: 'Professional illustrator with 4 years creating artwork for publishing, advertising, and tech clients. Work featured in national publications and product packaging. Developed 3 licensing partnerships generating recurring royalty income.',
      senior: 'Senior Illustrator and Art Director with 10+ years and recognizable visual style. Created artwork for Fortune 500 campaigns, bestselling books, and major publications. Represented by top illustration agency. Mentor emerging artists.'
    },
    bullets: [
      'Created 500+ illustrations for clients including Google, Penguin Books, and The New York Times',
      'Developed visual identity for product line generating $2M+ in retail sales',
      'Illustrated 12 childrens books, 3 receiving industry award nominations',
      'Built licensing portfolio generating $35K annual passive income across 8 partners',
      'Reduced project turnaround by 40% through improved digital workflow',
      'Grew social media following to 50K with work regularly featured on design blogs'
    ],
    formatTips: [
      'Lead with portfolio link—this is your primary qualification',
      'Include recognizable client names to establish credibility',
      'List specific illustration styles or specialties',
      'Mention awards, publications, or notable projects',
      'Include licensing or passive income if applicable'
    ],
    hiringTip: {
      insight: 'Your portfolio does 90% of the talking. But I also need to know you can hit deadlines, take feedback, and communicate professionally. Show me client work, not just personal projects.',
      elaboration: 'Art directors hire illustrators based on visual style fit and professional reliability. Your resume should demonstrate both artistic range and business skills. Include notable clients, turnaround capabilities, and revision process experience. Personal work shows creativity; client work proves you can deliver.'
    },
    interviewQuestions: [
      { q: 'Walk me through your creative process for a new project', guidance: 'Describe briefing, research, sketching, feedback incorporation, and final delivery.' },
      { q: 'How do you handle feedback that conflicts with your artistic vision?', guidance: 'Show collaboration skills while advocating for effective solutions.' },
      { q: 'Tell me about a challenging project and how you solved it', guidance: 'Demonstrate problem-solving and communication through a specific example.' },
      { q: 'How do you manage multiple projects with competing deadlines?', guidance: 'Show organizational skills and realistic capacity assessment.' },
      { q: 'What illustration styles or techniques are you most comfortable with?', guidance: 'Be specific about your strengths while showing adaptability.' }
    ],
    mistakes: [
      'No portfolio link—this is essential for any creative role',
      'Only personal work without demonstrating client project experience',
      'Generic "proficient in Adobe" without showing software depth',
      'Omitting client names when you have recognizable ones',
      'Not mentioning turnaround time or project management abilities'
    ],
    atsKeywords: ['illustrator', 'illustration', 'digital art', 'Adobe Illustrator', 'Photoshop', 'character design', 'editorial illustration', 'book illustration', 'vector']
  },
  {
    slug: 'motion-graphics-designer',
    jobTitle: 'Motion Graphics Designer',
    category: 'Creative',
    avgSalary: '$65,000',
    salaryRange: '$45,000 - $95,000',
    yearsExperience: '2-5',
    jobGrowth: '8%',
    blsUrl: 'https://www.bls.gov/ooh/arts-and-design/multimedia-artists-and-animators.htm',
    cardSummary: 'Make graphics move and tell stories. Show your animation skills and view counts.',
    skills: {
      animation: ['2D Animation', 'Kinetic Typography', 'Logo Animation', 'Explainer Videos'],
      software: ['After Effects', 'Cinema 4D', 'Premiere Pro', 'Lottie/Bodymovin'],
      design: ['Visual Design', 'Storyboarding', 'Color Theory', 'Brand Systems']
    },
    certifications: ['Adobe Certified', 'Motion Design School', 'Cinema 4D Certification'],
    summaries: {
      entry: 'Motion designer with strong foundation in After Effects and Cinema 4D. Created social media animations and explainer videos for startup clients. Understanding of animation principles with growing portfolio of commercial work.',
      mid: 'Motion Graphics Designer with 4 years creating animated content for broadcast, digital, and social platforms. Produced 200+ animations including broadcast graphics, explainer videos, and social campaigns. Expert in After Effects expressions and Cinema 4D.',
      senior: 'Senior Motion Designer leading animation for global brands. Work viewed 100M+ times across platforms. Developed motion systems for major brand refreshes. Mentor junior designers and establish animation standards.'
    },
    bullets: [
      'Created 300+ motion graphics projects with combined view count exceeding 50M',
      'Developed animated brand system for Fortune 500 company used across all digital touchpoints',
      'Produced 60-second explainer video achieving 35% conversion lift for SaaS client',
      'Built expression-based template system reducing production time by 60%',
      'Led motion design for broadcast rebrand reaching 2M daily viewers',
      'Mentored 4 junior animators and established departments motion standards'
    ],
    formatTips: [
      'Lead with demo reel link—motion design requires video portfolio',
      'Include view counts or reach metrics to demonstrate impact',
      'List specific software expertise with version/plugin knowledge',
      'Mention broadcast experience if applicable—it indicates technical quality',
      'Highlight any template or system development'
    ],
    hiringTip: {
      insight: 'Your reel needs to be under 90 seconds and show variety. I watch for technical skill AND design sense. Also, can you work fast? Include any metrics on turnaround or production efficiency.',
      elaboration: 'Creative directors hire motion designers who combine technical animation skills with strong design fundamentals. Your demo reel should show range (broadcast, social, explainers) and polish. Production speed matters in agency settings—highlight workflow efficiency or template systems you developed.'
    },
    interviewQuestions: [
      { q: 'Walk me through a project from your reel', guidance: 'Explain the brief, your approach, technical challenges, and final delivery.' },
      { q: 'How do you optimize animations for different platforms?', guidance: 'Show knowledge of file formats, compression, and platform-specific requirements.' },
      { q: 'Describe your After Effects workflow', guidance: 'Discuss organization, expressions, precomps, and render settings.' },
      { q: 'How do you handle a client who keeps asking for changes?', guidance: 'Show revision management and scope control skills.' },
      { q: 'What motion design trends are you excited about?', guidance: 'Demonstrate industry awareness and continuous learning.' }
    ],
    mistakes: [
      'Demo reel too long (over 2 minutes) or missing entirely',
      'Only school projects without professional client work',
      'Not specifying software proficiency levels',
      'Omitting production metrics or view counts',
      'Generic descriptions without technical detail'
    ],
    atsKeywords: ['motion graphics', 'After Effects', 'animation', 'Cinema 4D', 'motion design', 'explainer video', 'broadcast graphics', 'kinetic typography', 'Lottie']
  },
  {
    slug: 'copywriter',
    jobTitle: 'Copywriter',
    category: 'Creative',
    avgSalary: '$58,000',
    salaryRange: '$42,000 - $85,000',
    yearsExperience: '2-4',
    jobGrowth: '9%',
    blsUrl: 'https://www.bls.gov/ooh/media-and-communication/writers-and-authors.htm',
    cardSummary: 'Write words that sell. Show your conversion lifts and brand work.',
    skills: {
      writing: ['Brand Voice', 'Headlines', 'Long-form Copy', 'UX Writing'],
      strategy: ['Creative Briefs', 'Audience Research', 'A/B Testing', 'SEO'],
      platforms: ['Digital Ads', 'Email Marketing', 'Social Media', 'Print Advertising']
    },
    certifications: ['Google Ads Certification', 'HubSpot Content Marketing', 'Portfolio School'],
    summaries: {
      entry: 'Junior copywriter with portfolio school training and internship at creative agency. Write compelling headlines, body copy, and social content. Understanding of brand voice development and creative brief interpretation.',
      mid: 'Copywriter with 4 years crafting campaigns for consumer brands. Work spans digital, print, and broadcast with focus on conversion-driven copy. A/B testing shows 40% average lift vs. control. Specialize in tech and lifestyle brands.',
      senior: 'Senior Copywriter and Creative Lead with 8+ years developing campaigns for global brands. Led copy for award-winning campaigns including Cannes Lion shortlist. Develop brand voices and mentor junior writers. Specialize in brand manifesto and long-form storytelling.'
    },
    bullets: [
      'Wrote copy for campaigns reaching 50M+ consumers across digital, print, and broadcast',
      'Achieved 45% average conversion lift through A/B tested headlines and CTAs',
      'Developed brand voice guidelines adopted across 12-market global rollout',
      'Created email sequences generating $1.2M attributed revenue for e-commerce client',
      'Contributed to award-winning campaign shortlisted for Cannes Lions',
      'Mentored 3 junior copywriters and established department writing standards'
    ],
    formatTips: [
      'Include portfolio link with samples organized by category',
      'Lead with conversion metrics or business results, not just creative awards',
      'List brand categories you specialize in (tech, fashion, healthcare)',
      'Mention campaign reach or spend levels to indicate scale',
      'Highlight any awards but dont lead with them'
    ],
    hiringTip: {
      insight: 'I care less about awards and more about results. Show me copy that moved the needle—conversion rates, click-throughs, sales lift. Also, can you write in different voices or just your own?',
      elaboration: 'Creative directors hire copywriters who deliver business results, not just clever headlines. Your resume should lead with metrics: conversion lifts, revenue attributed to campaigns, engagement improvements. Show versatility across brand voices and formats. Awards are nice but secondary to business impact.'
    },
    interviewQuestions: [
      { q: 'Walk me through your process for a new campaign', guidance: 'Describe brief interpretation, research, concepting, and refinement.' },
      { q: 'How do you adapt your voice for different brands?', guidance: 'Show research methods and ability to subsume personal style.' },
      { q: 'Tell me about copy you wrote that performed exceptionally well', guidance: 'Include metrics and explain why you think it worked.' },
      { q: 'How do you handle creative feedback you disagree with?', guidance: 'Show collaboration while advocating for effective copy.' },
      { q: 'Write a headline for [product/service]', guidance: 'Be prepared for on-the-spot writing tests.' }
    ],
    mistakes: [
      'No portfolio link or samples inaccessible',
      'Awards-focused without business results',
      'Only one type of copy (all social or all long-form)',
      'Generic writing descriptions without specific outcomes',
      'Not mentioning collaboration with art directors or strategy'
    ],
    atsKeywords: ['copywriter', 'copywriting', 'brand voice', 'advertising copy', 'creative writing', 'headlines', 'conversion copy', 'UX writing', 'content strategy']
  },
  {
    slug: 'creative-director',
    jobTitle: 'Creative Director',
    category: 'Creative',
    avgSalary: '$125,000',
    salaryRange: '$85,000 - $180,000',
    yearsExperience: '8-12',
    jobGrowth: '6%',
    blsUrl: 'https://www.bls.gov/ooh/management/advertising-promotions-and-marketing-managers.htm',
    cardSummary: 'Lead creative vision and teams. Show your award-winning campaigns and business impact.',
    skills: {
      leadership: ['Creative Vision', 'Team Building', 'Client Relationships', 'Pitch Development'],
      creative: ['Campaign Development', 'Brand Strategy', 'Art Direction', 'Concept Development'],
      business: ['Budget Management', 'New Business', 'Vendor Management', 'Resource Planning']
    },
    certifications: ['Ad Industry Awards', 'Executive Leadership Training'],
    summaries: {
      entry: 'Associate Creative Director transitioning from senior designer role. Led creative for key accounts generating $5M in billings. Managed team of 4 creatives. Work recognized with regional Addy awards.',
      mid: 'Creative Director with 10 years leading campaigns for consumer and B2B brands. Built creative department from 4 to 12 people. Work awarded Cannes Lions, One Show, and D&AD. Drive $15M in annual billings.',
      senior: 'Executive Creative Director with 15+ years building award-winning creative departments at top agencies. Led pitches winning $50M+ in new business. Work in permanent collection at Museum of Modern Art. Board member of industry association.'
    },
    bullets: [
      'Led creative department of 15 producing work for clients totaling $25M annual billings',
      'Directed campaigns winning Cannes Lion, One Show Gold, and 12 regional awards',
      'Built creative team from 5 to 18, establishing hiring standards and mentorship program',
      'Drove 35% revenue growth through creative-led pitches winning 8 new accounts',
      'Developed brand platforms for 3 Fortune 500 companies adopted globally',
      'Established agencys first integrated content studio, generating $3M new revenue stream'
    ],
    formatTips: [
      'Lead with billings or revenue responsibility to establish seniority',
      'List awards selectively—major shows only (Cannes, One Show, D&AD)',
      'Include team size built and managed',
      'Highlight new business wins and pitch leadership',
      'Mention any brand work with wide recognition or cultural impact'
    ],
    hiringTip: {
      insight: 'I need to see three things: can you win pitches, can you win awards, and can you keep clients happy? Show me business development success alongside the creative accolades.',
      elaboration: 'Agency leadership hires creative directors who drive business results through creative excellence. Your resume must demonstrate revenue impact (billings, new business wins), creative recognition (selective major awards), and team leadership (building and retaining talent). Pure creative portfolios without business context wont suffice at this level.'
    },
    interviewQuestions: [
      { q: 'Walk me through a campaign youre most proud of', guidance: 'Cover creative insight, execution, and business results.' },
      { q: 'How do you build and maintain creative culture?', guidance: 'Discuss hiring, mentorship, standards, and environment.' },
      { q: 'Tell me about a pitch you led and won', guidance: 'Describe strategy, creative approach, and what clinched it.' },
      { q: 'How do you handle a client who wants to kill your best work?', guidance: 'Show client management while protecting creative standards.' },
      { q: 'Whats your approach to developing creative talent?', guidance: 'Discuss mentorship, feedback, and career development philosophy.' }
    ],
    mistakes: [
      'Pure creative portfolio without leadership or business context',
      'Too many awards listed dilutes impact—curate to major shows',
      'Not quantifying team size or revenue responsibility',
      'Omitting new business or pitch experience',
      'No clear progression showing path to CD role'
    ],
    atsKeywords: ['creative director', 'creative leadership', 'advertising', 'campaign development', 'brand strategy', 'Cannes Lions', 'One Show', 'pitch', 'agency', 'art direction']
  },
  {
    slug: 'brand-designer',
    jobTitle: 'Brand Designer',
    category: 'Creative',
    avgSalary: '$68,000',
    salaryRange: '$50,000 - $95,000',
    yearsExperience: '3-6',
    jobGrowth: '7%',
    blsUrl: 'https://www.bls.gov/ooh/arts-and-design/graphic-designers.htm',
    cardSummary: 'Build visual identities that last. Show your brand systems and style guides.',
    skills: {
      identity: ['Logo Design', 'Visual Systems', 'Typography', 'Color Theory'],
      applications: ['Brand Guidelines', 'Packaging', 'Environmental Design', 'Digital Assets'],
      strategy: ['Brand Strategy', 'Competitive Analysis', 'Stakeholder Presentations', 'Research']
    },
    certifications: ['Adobe Certified', 'Brand Strategy Certificate', 'Design Degree'],
    summaries: {
      entry: 'Junior brand designer with BFA and agency internship experience. Skilled in logo development, visual identity systems, and brand guideline documentation. Strong typography and color theory foundation.',
      mid: 'Brand Designer with 5 years developing visual identities for startups and established companies. Created 25+ complete brand systems from strategy through implementation. Expert in scalable design systems and cross-platform consistency.',
      senior: 'Senior Brand Designer leading identity programs for global brands. Developed visual systems used across 50+ markets. Work featured in design publications and industry case studies. Specialize in brand evolution and refresh projects.'
    },
    bullets: [
      'Designed complete brand identity systems for 30+ clients across tech, retail, and hospitality',
      'Led visual identity refresh for $500M company, increasing brand recognition by 40%',
      'Created scalable design systems reducing asset production time by 50%',
      'Developed 100+ page brand guidelines ensuring consistency across 12 global markets',
      'Designed packaging system generating 25% shelf appeal improvement in retail testing',
      'Work featured in Brand New, Communication Arts, and 3 industry award programs'
    ],
    formatTips: [
      'Include portfolio link featuring complete brand systems, not just logos',
      'List notable client industries and company sizes',
      'Highlight scalability and implementation across touchpoints',
      'Mention any measurable brand impact (recognition, preference studies)',
      'Include design publication features or awards'
    ],
    hiringTip: {
      insight: 'Anyone can design a logo—I need someone who can build a system. Show me how your identities scale across touchpoints, from business cards to billboards to apps.',
      elaboration: 'Agencies and in-house teams hire brand designers who think systematically. Your portfolio should demonstrate complete identity programs: logo, typography, color, applications, and guidelines. Include implementation examples showing how the system flexes across touchpoints. Strategic thinking that connects visual choices to brand positioning differentiates you.'
    },
    interviewQuestions: [
      { q: 'Walk me through your brand development process', guidance: 'Cover discovery, strategy, visual exploration, refinement, and delivery.' },
      { q: 'How do you ensure brand consistency at scale?', guidance: 'Discuss systems thinking, guidelines, and asset management.' },
      { q: 'Tell me about a rebrand project and its challenges', guidance: 'Show stakeholder management and balancing heritage with evolution.' },
      { q: 'How do you present brand work to clients?', guidance: 'Describe storytelling, rationale, and handling feedback.' },
      { q: 'Whats your approach to typography in brand systems?', guidance: 'Demonstrate deep typography knowledge and strategic selection criteria.' }
    ],
    mistakes: [
      'Portfolio shows only logos without system applications',
      'No brand guidelines or documentation samples',
      'Generic design experience without brand focus',
      'Not showing strategic rationale behind visual choices',
      'Missing implementation examples across touchpoints'
    ],
    atsKeywords: ['brand designer', 'visual identity', 'brand guidelines', 'logo design', 'brand system', 'identity design', 'typography', 'brand strategy', 'style guide']
  },
  {
    slug: 'web-designer',
    jobTitle: 'Web Designer',
    category: 'Creative',
    avgSalary: '$58,000',
    salaryRange: '$42,000 - $82,000',
    yearsExperience: '2-5',
    jobGrowth: '8%',
    blsUrl: 'https://www.bls.gov/ooh/computer-and-information-technology/web-developers.htm',
    cardSummary: 'Design websites that convert. Show your UI skills and user metrics.',
    skills: {
      design: ['UI Design', 'Responsive Design', 'Design Systems', 'Prototyping'],
      tools: ['Figma', 'Adobe XD', 'Sketch', 'Webflow'],
      web: ['HTML/CSS Basics', 'CMS Platforms', 'Accessibility', 'SEO Fundamentals']
    },
    certifications: ['Figma Certification', 'Google UX Certificate', 'Webflow Expert'],
    summaries: {
      entry: 'Web designer with design degree and freelance experience creating responsive websites for small businesses. Proficient in Figma, Webflow, and WordPress. Understanding of conversion optimization and user experience principles.',
      mid: 'Web Designer with 4 years designing marketing sites, e-commerce experiences, and web applications. Created designs generating $5M+ in client revenue. Expert in design systems, responsive patterns, and developer handoff.',
      senior: 'Senior Web Designer leading digital design for agency serving tech and e-commerce clients. Established design system practice reducing production time by 40%. Work generates measurable conversion improvements averaging 35%.'
    },
    bullets: [
      'Designed 50+ responsive websites generating combined client revenue of $8M',
      'Created design system reducing new project setup time from 2 weeks to 2 days',
      'Achieved 40% average conversion lift through user-centered redesign approach',
      'Built Webflow sites eliminating developer dependency for 60% of projects',
      'Improved site accessibility to WCAG 2.1 AA compliance for 25 client projects',
      'Mentored 3 junior designers on design systems and responsive methodology'
    ],
    formatTips: [
      'Include portfolio link showing live sites, not just mockups',
      'Lead with conversion or business metrics from your designs',
      'List design tools with proficiency levels',
      'Mention development skills (HTML/CSS, Webflow) if you have them',
      'Highlight design systems or component library experience'
    ],
    hiringTip: {
      insight: 'I need designers who understand the web isnt print. Show me you know responsive design, interaction patterns, and accessibility. Bonus points if you can build in Webflow or code CSS.',
      elaboration: 'Digital agencies hire web designers who bridge design and development. Your portfolio should show responsive designs with interaction considerations. Production skills (Webflow, HTML/CSS) increase your value. Include conversion metrics to demonstrate business impact. Design system experience indicates efficiency at scale.'
    },
    interviewQuestions: [
      { q: 'Walk me through your design process for a new website', guidance: 'Cover discovery, wireframes, visual design, prototyping, and handoff.' },
      { q: 'How do you approach responsive design?', guidance: 'Discuss mobile-first, breakpoint strategy, and content prioritization.' },
      { q: 'Tell me about a design that significantly improved conversions', guidance: 'Include before/after metrics and explain your approach.' },
      { q: 'How do you hand off designs to developers?', guidance: 'Describe specifications, asset preparation, and communication practices.' },
      { q: 'Whats your experience with design systems?', guidance: 'Discuss component libraries, documentation, and scaling benefits.' }
    ],
    mistakes: [
      'Portfolio shows only static mockups without responsive examples',
      'No live sites or interaction demonstrations',
      'Missing conversion or business metrics',
      'Generic "designed websites" without specific outcomes',
      'No mention of accessibility considerations'
    ],
    atsKeywords: ['web designer', 'UI design', 'responsive design', 'Figma', 'Webflow', 'website design', 'design system', 'user interface', 'HTML', 'CSS']
  },
  {
    slug: 'video-editor',
    jobTitle: 'Video Editor',
    category: 'Creative',
    avgSalary: '$52,000',
    salaryRange: '$35,000 - $78,000',
    yearsExperience: '2-5',
    jobGrowth: '12%',
    blsUrl: 'https://www.bls.gov/ooh/media-and-communication/film-and-video-editors-and-camera-operators.htm',
    cardSummary: 'Craft stories through editing. Show your reel variety and view counts.',
    skills: {
      editing: ['Narrative Editing', 'Color Grading', 'Audio Mixing', 'Motion Graphics'],
      software: ['Premiere Pro', 'Final Cut Pro', 'DaVinci Resolve', 'After Effects'],
      production: ['Asset Management', 'Codec Knowledge', 'Export Settings', 'Archival']
    },
    certifications: ['Adobe Certified', 'Avid Certified', 'DaVinci Resolve Training'],
    summaries: {
      entry: 'Video editor with film school training and YouTube channel experience. Proficient in Premiere Pro and DaVinci Resolve. Edited 100+ videos including short films, social content, and corporate work.',
      mid: 'Video Editor with 4 years cutting content for broadcast, digital, and social platforms. Edited work viewed 20M+ times. Expert in narrative pacing, color grading, and sound design. Specialize in documentary and branded content.',
      senior: 'Senior Editor with 8+ years and credits on Emmy-nominated series and viral campaigns. Lead editor for production company handling $2M+ annual projects. Mentor junior editors and manage post-production workflows.'
    },
    bullets: [
      'Edited 200+ videos totaling 50M+ views across YouTube, broadcast, and social platforms',
      'Led post-production for branded content series generating 25M impressions',
      'Reduced average edit time by 35% through improved project organization and templates',
      'Color graded 50+ projects including national broadcast commercials',
      'Edited documentary feature screened at 5 film festivals and acquired for streaming',
      'Managed team of 3 editors on high-volume social content account'
    ],
    formatTips: [
      'Include reel link—essential for any editing position',
      'Lead with view counts or reach metrics',
      'List software proficiency with specific versions',
      'Mention turnaround speed for time-sensitive content',
      'Highlight any broadcast, film, or streaming credits'
    ],
    hiringTip: {
      insight: 'Your reel should show range and pacing sense. I also need editors who can work fast—include turnaround times or mention experience with tight deadlines.',
      elaboration: 'Production companies hire editors who combine creative storytelling with technical efficiency. Your reel should demonstrate range (narrative, commercial, social) and strong pacing instincts. Include view counts and any notable placements (broadcast, streaming). Fast turnaround capability is increasingly important for digital content.'
    },
    interviewQuestions: [
      { q: 'Walk me through your editing process', guidance: 'Describe assembly, rough cut, fine cut, color, and sound stages.' },
      { q: 'How do you approach editing for different platforms?', guidance: 'Discuss pacing, aspect ratios, and platform-specific considerations.' },
      { q: 'Tell me about your color grading workflow', guidance: 'Describe software, LUTs, color correction, and creative grading.' },
      { q: 'How do you handle a project with poor source material?', guidance: 'Show problem-solving with audio issues, coverage gaps, or quality problems.' },
      { q: 'Whats your approach to staying organized on large projects?', guidance: 'Discuss folder structure, naming conventions, and asset management.' }
    ],
    mistakes: [
      'No reel or samples inaccessible',
      'Reel too long (over 2 minutes) or poorly paced',
      'Only one content type without showing range',
      'Not mentioning software and technical capabilities',
      'Generic descriptions without view counts or metrics'
    ],
    atsKeywords: ['video editor', 'Premiere Pro', 'Final Cut', 'DaVinci Resolve', 'color grading', 'post-production', 'video editing', 'narrative editing', 'broadcast']
  },
  {
    slug: 'content-creator',
    jobTitle: 'Content Creator',
    category: 'Creative',
    avgSalary: '$48,000',
    salaryRange: '$32,000 - $85,000',
    yearsExperience: '1-4',
    jobGrowth: '15%',
    blsUrl: 'https://www.bls.gov/ooh/media-and-communication/writers-and-authors.htm',
    cardSummary: 'Create content that builds audiences. Show your follower growth and engagement.',
    skills: {
      creation: ['Video Production', 'Photography', 'Writing', 'Graphic Design'],
      platforms: ['TikTok', 'Instagram', 'YouTube', 'LinkedIn'],
      strategy: ['Content Strategy', 'Analytics', 'Trend Spotting', 'Audience Building']
    },
    certifications: ['Google Analytics', 'HubSpot Content Marketing', 'Platform Creator Programs'],
    summaries: {
      entry: 'Content creator with growing personal brand (25K followers) and freelance experience managing brand social accounts. Skilled in video production, copywriting, and content strategy. Understanding of platform algorithms and engagement optimization.',
      mid: 'Content Creator with 3 years building audiences for brands and personal channels. Grew accounts from 0 to 100K+ followers. Content generated 50M+ impressions and $500K in attributable revenue. Expert in TikTok, Instagram, and YouTube.',
      senior: 'Senior Content Creator and Social Media Director with 500K+ combined following. Built content programs generating $2M+ annual revenue for clients. Creator partnerships with major brands. Advise on content strategy and creator programs.'
    },
    bullets: [
      'Built personal brand to 150K followers across TikTok and Instagram with 8% engagement rate',
      'Created content generating 75M+ impressions and $800K attributable client revenue',
      'Grew client Instagram from 5K to 85K followers in 12 months through strategic content',
      'Produced 500+ pieces of content including video, photography, and written posts',
      'Developed content calendars and strategies for 15 brand clients',
      'Achieved 3 viral posts exceeding 5M views each'
    ],
    formatTips: [
      'Include social links—your channels ARE your portfolio',
      'Lead with follower counts and engagement rates',
      'Show growth trajectories (X to Y followers in Z months)',
      'Include revenue attribution if trackable',
      'List platform expertise and content formats'
    ],
    hiringTip: {
      insight: 'Follower counts mean nothing without engagement. Show me your engagement rate and prove you can grow accounts, not just maintain them. Also, can you create on brand or just for yourself?',
      elaboration: 'Brands hire content creators who can deliver measurable growth. Your resume should demonstrate engagement rates (not just follower counts), growth trajectories, and business impact. Show ability to create for brands, not just personal content. Platform-specific expertise and algorithm understanding are key.'
    },
    interviewQuestions: [
      { q: 'How do you develop a content strategy for a new brand?', guidance: 'Discuss audience research, competitive analysis, content pillars, and measurement.' },
      { q: 'Walk me through creating a piece of content from idea to publish', guidance: 'Cover ideation, production, editing, optimization, and posting strategy.' },
      { q: 'How do you stay ahead of platform algorithm changes?', guidance: 'Show continuous learning and adaptation strategies.' },
      { q: 'Tell me about content that significantly outperformed', guidance: 'Analyze why it worked and what you learned.' },
      { q: 'How do you balance brand guidelines with authentic content?', guidance: 'Show ability to maintain brand voice while creating engaging content.' }
    ],
    mistakes: [
      'No social links to prove your content abilities',
      'Only follower counts without engagement metrics',
      'Personal content only without brand or client work',
      'Not showing growth or before/after trajectories',
      'Generic social media descriptions without platform specifics'
    ],
    atsKeywords: ['content creator', 'social media', 'TikTok', 'Instagram', 'YouTube', 'content strategy', 'video production', 'engagement', 'viral', 'influencer']
  },
  {
    slug: 'game-designer',
    jobTitle: 'Game Designer',
    category: 'Creative',
    avgSalary: '$75,000',
    salaryRange: '$52,000 - $110,000',
    yearsExperience: '3-6',
    jobGrowth: '10%',
    blsUrl: 'https://www.bls.gov/ooh/arts-and-design/multimedia-artists-and-animators.htm',
    cardSummary: 'Design games people cant stop playing. Show your shipped titles and player metrics.',
    skills: {
      design: ['Systems Design', 'Level Design', 'Economy Design', 'Narrative Design'],
      tools: ['Unity', 'Unreal Engine', 'Figma', 'Game Maker'],
      analysis: ['Player Analytics', 'Playtesting', 'Balancing', 'Monetization']
    },
    certifications: ['Game Design Degree', 'Unity Certification', 'Unreal Developer'],
    summaries: {
      entry: 'Game designer with degree in game development and shipped indie title on Steam. Experience in level design, systems balancing, and player testing. Proficient in Unity and documentation tools. Passion for mobile and puzzle games.',
      mid: 'Game Designer with 4 years at mobile studios working on titles with 10M+ downloads. Designed core loops, progression systems, and monetization features. Data-driven approach achieved 15% retention improvement. Shipped 3 titles.',
      senior: 'Senior Game Designer with 8+ years and 5 shipped titles totaling 50M+ downloads. Led design for top-50 grossing mobile game. Expert in F2P systems, live operations, and player retention. Mentor junior designers and define game vision.'
    },
    bullets: [
      'Designed systems for mobile RPG reaching #12 on App Store with 8M+ downloads',
      'Improved D7 retention by 18% through tutorial redesign and early game pacing',
      'Created economy balancing spreadsheets managing 200+ items and progression curves',
      'Led design for 15 content updates increasing monthly revenue by 25%',
      'Conducted 50+ playtests and implemented feedback loops improving user satisfaction',
      'Documented 500+ pages of game design specifications for development team'
    ],
    formatTips: [
      'List shipped titles with download numbers and rankings',
      'Include retention or monetization metrics you influenced',
      'Specify game genres and platforms you specialize in',
      'Mention design documentation and tool proficiency',
      'Highlight any personal or indie projects demonstrating skills'
    ],
    hiringTip: {
      insight: 'Shipped titles matter more than anything. I need to see games you actually worked on and what specifically you designed. Portfolio should include design docs, not just the finished game.',
      elaboration: 'Game studios hire designers with shipped products and demonstrable impact. Your resume must list released titles with your specific contribution. Include metrics (downloads, retention, revenue) where possible. Design documentation samples prove you can communicate vision to teams. Genre and platform expertise should align with the studio focus.'
    },
    interviewQuestions: [
      { q: 'Walk me through your design process for a new feature', guidance: 'Cover ideation, documentation, iteration, testing, and implementation.' },
      { q: 'How do you balance player fun with monetization?', guidance: 'Show understanding of ethical F2P design and player-first thinking.' },
      { q: 'Describe a design that didnt work and what you learned', guidance: 'Demonstrate iteration mindset and learning from failure.' },
      { q: 'How do you use data in your design decisions?', guidance: 'Discuss A/B testing, analytics, and balancing intuition with data.' },
      { q: 'Play one of our games—whats one thing youd change?', guidance: 'Be prepared with constructive, specific feedback.' }
    ],
    mistakes: [
      'No shipped titles or only personal projects',
      'No metrics or impact from games worked on',
      'Generic game descriptions without your specific contribution',
      'Missing design documentation samples',
      'Not specifying genre and platform expertise'
    ],
    atsKeywords: ['game designer', 'game design', 'systems design', 'level design', 'Unity', 'Unreal', 'mobile games', 'F2P', 'retention', 'monetization']
  },
  {
    slug: 'set-designer',
    jobTitle: 'Set Designer',
    category: 'Creative',
    avgSalary: '$55,000',
    salaryRange: '$38,000 - $85,000',
    yearsExperience: '3-6',
    jobGrowth: '5%',
    blsUrl: 'https://www.bls.gov/ooh/arts-and-design/set-and-exhibit-designers.htm',
    cardSummary: 'Build worlds for screen and stage. Show your production credits and design range.',
    skills: {
      design: ['Scenic Design', 'Model Making', 'Drafting', 'Material Knowledge'],
      software: ['AutoCAD', 'SketchUp', 'Vectorworks', 'Photoshop'],
      production: ['Budget Management', 'Vendor Coordination', 'Construction Supervision', 'Safety Compliance']
    },
    certifications: ['USITT Member', 'AutoCAD Certified', 'MFA Scenic Design'],
    summaries: {
      entry: 'Set designer with MFA in Scenic Design and regional theater credits. Skilled in drafting, model making, and shop drawings. Experience with both realistic and stylized design approaches. Proficient in AutoCAD and SketchUp.',
      mid: 'Set Designer with 5 years designing for theater, film, and commercial production. 40+ production credits including Off-Broadway and national commercials. Expert in budget management, vendor relationships, and construction oversight.',
      senior: 'Senior Production Designer with 12+ years and major feature film credits. Designed sets for $50M+ budget productions. Emmy nomination for limited series. Supervise art department teams of 20+. Known for period accuracy and practical builds.'
    },
    bullets: [
      'Designed sets for 45+ productions including 3 Off-Broadway shows and 2 feature films',
      'Managed design budgets ranging from $50K to $1.2M across theater and film',
      'Supervised construction of 30,000 sq ft soundstage build for streaming series',
      'Developed design package including 200+ drawings, renderings, and specifications',
      'Coordinated with 15 vendors and specialty fabricators on period-accurate details',
      'Received 2 industry award nominations for scenic design excellence'
    ],
    formatTips: [
      'List production credits with venues/studios and budget levels',
      'Include portfolio link showing designs, models, and finished sets',
      'Mention budget ranges you have managed',
      'Highlight period or specialty design experience',
      'Note union status (IATSE/USA) if applicable'
    ],
    hiringTip: {
      insight: 'I need to see the full journey—concept sketches through finished set. Portfolio should show your design thinking, not just pretty pictures. Budget management experience matters as much as design sense.',
      elaboration: 'Production designers hire set designers who combine artistic vision with practical execution. Your portfolio should show process: concept art, technical drawings, models, and finished builds. Include budget management and vendor coordination experience. Union status and safety credentials matter for film/TV work.'
    },
    interviewQuestions: [
      { q: 'Walk me through your design process for a new production', guidance: 'Cover script analysis, research, concept development, and technical execution.' },
      { q: 'How do you balance creative vision with budget constraints?', guidance: 'Show practical problem-solving and prioritization skills.' },
      { q: 'Describe a challenging build and how you solved it', guidance: 'Demonstrate technical knowledge and collaboration.' },
      { q: 'How do you collaborate with directors and other designers?', guidance: 'Show communication skills and ability to realize others visions.' },
      { q: 'Whats your experience with digital drafting tools?', guidance: 'List specific software and proficiency levels.' }
    ],
    mistakes: [
      'Portfolio shows only finished sets without process work',
      'No production credits or venues mentioned',
      'Missing budget or scale information',
      'Generic design experience without entertainment industry focus',
      'Not mentioning union status or safety certifications'
    ],
    atsKeywords: ['set designer', 'scenic design', 'production design', 'AutoCAD', 'Vectorworks', 'theater', 'film', 'television', 'art department', 'construction drawings']
  }
];

function generateMDX(job) {
  const today = new Date().toISOString().split('T')[0];
  const skillCategories = Object.entries(job.skills);

  return `---
title: "${job.jobTitle} Resume Example & Writing Guide 2025"
description: "Professional ${job.jobTitle.toLowerCase()} resume example with expert tips. Learn how to showcase your ${Object.values(job.skills).flat().slice(0, 3).join(', ').toLowerCase()} expertise."
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
${Object.values(job.skills).flat().slice(0, 6).map(s => `  - "${s}"`).join('\n')}
certifications:
${job.certifications.map(c => `  - "${c}"`).join('\n')}
tags:
  - "${job.jobTitle.toLowerCase()} resume"
  - "${job.jobTitle.toLowerCase()} resume example"
  - "creative resume"
  - "resume example"
  - "resume template"
  - "ats resume"
---

## What Makes a Great ${job.jobTitle} Resume?

A ${job.jobTitle.toLowerCase()} resume must lead with visual proof of your abilities—your portfolio does the heavy lifting. But the resume itself needs to demonstrate you can deliver results, meet deadlines, and work professionally with clients and teams.

The most effective ${job.jobTitle.toLowerCase()} resumes combine strong portfolio links with quantifiable impact: view counts, revenue attribution, client lists, and business outcomes that prove your creative work delivers value.

## Professional Summary Examples

### Entry-Level ${job.jobTitle}
${job.summaries.entry}

### Mid-Level ${job.jobTitle}
${job.summaries.mid}

### Senior ${job.jobTitle}
${job.summaries.senior}

## Salary & Job Outlook

The ${job.jobTitle.toLowerCase()} field offers diverse opportunities across industries:

- **Median Salary:** ${job.avgSalary}
- **Salary Range:** ${job.salaryRange}
- **Job Growth:** ${job.jobGrowth} (next decade)

*Sources: [U.S. Bureau of Labor Statistics](${job.blsUrl}), [Glassdoor](https://www.glassdoor.com/Salaries/), [PayScale](https://www.payscale.com/research/US/). Compensation varies significantly by market, specialization, and whether you work in-house, agency, or freelance.*

## Essential Skills to Highlight

${skillCategories.map(([category, skills]) => `### ${category.charAt(0).toUpperCase() + category.slice(1)} Skills
${skills.map(s => `- ${s}`).join('\n')}`).join('\n\n')}

## Achievement-Focused Bullet Points

Strong ${job.jobTitle.toLowerCase()} bullet points quantify creative impact:

${job.bullets.map(b => `- ${b}`).join('\n')}

## ${job.jobTitle} Resume Format & Template Tips

${job.formatTips.map((tip, i) => `${i + 1}. **${tip.split('—')[0].split('–')[0]}**`).join('\n')}

## Hiring Manager Tip

> **"${job.hiringTip.insight}"**

${job.hiringTip.elaboration}

## Common ${job.jobTitle} Interview Questions

${job.interviewQuestions.map((q, i) => `### ${i + 1}. ${q.q}
${q.guidance}`).join('\n\n')}

## Common Mistakes to Avoid

${job.mistakes.map((m, i) => `${i + 1}. **${m.split('—')[0]}**`).join('\n')}

## ATS Optimization for ${job.jobTitle} Resumes

Many creative roles still use ATS systems for initial screening. Include these keywords naturally:

**Priority Keywords:** ${job.atsKeywords.slice(0, 5).join(', ')}

**Additional Keywords:** ${job.atsKeywords.slice(5).join(', ')}

While portfolio quality matters most, matching job posting language improves your chances of reaching human review.

## Related Resources

- [Creative Portfolio Tips](/en/blog/creative-portfolio-guide)
- [Resume Writing Guide](/en/blog/resume-writing-guide)
- [Interview Preparation](/en/blog/interview-preparation)
- [Browse All Templates](/en/templates)
`;
}

async function main() {
  console.log(`\\n📝 Generating ${JOBS.length} Creative resume examples (CLAUDE.md compliant)...\\n`);

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
