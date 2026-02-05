#!/usr/bin/env node
/**
 * Generate remaining resume examples across multiple categories
 * Legal, Education, Government, Creative, Fitness, Animal Care, Real Estate, Cleaning
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONTENT_DIR = path.join(__dirname, '../frontend/content/resume-examples');

const CATEGORY_AUTHORS = {
  Legal: ['Sarah Chen', 'Alex Morgan'],
  Education: ['Anna Papalia', 'Ken Coleman'],
  Government: ['Jason M. Hill', 'Sarah Sutton'],
  Creative: ['Jessica Park', 'Alex Morgan'],
  Fitness: ['Ken Coleman', 'Sarah Sutton'],
  'Animal Care': ['Anna Papalia', 'Jessica Park'],
  'Real Estate': ['Sarah Chen', 'Jason M. Hill'],
  Cleaning: ['Ken Coleman', 'Sarah Sutton']
};

const ALL_JOBS = [
  // LEGAL (12 jobs)
  { slug: 'paralegal', jobTitle: 'Paralegal', category: 'Legal', avgSalary: '$58,000', jobGrowth: '+4%', blsUrl: 'https://www.bls.gov/ooh/legal/paralegals-and-legal-assistants.htm',
    keySkills: ['Legal Research', 'Document Drafting', 'Case Management', 'Discovery', 'Client Communication', 'Litigation Support', 'Filing', 'Compliance'],
    context: 'Paralegals support attorneys with research, documentation, and case management. The role requires attention to detail and understanding of legal procedures.' },
  { slug: 'legal-secretary', jobTitle: 'Legal Secretary', category: 'Legal', avgSalary: '$52,000', jobGrowth: '+4%', blsUrl: 'https://www.bls.gov/ooh/office-and-administrative-support/secretaries-and-administrative-assistants.htm',
    keySkills: ['Legal Documentation', 'Calendar Management', 'Court Filings', 'Transcription', 'Client Relations', 'Billing', 'Scheduling', 'Communication'],
    context: 'Legal secretaries manage attorney schedules, prepare documents, and maintain client relationships. Organization and legal terminology knowledge are essential.' },
  { slug: 'court-clerk', jobTitle: 'Court Clerk', category: 'Legal', avgSalary: '$45,000', jobGrowth: '+3%', blsUrl: 'https://www.bls.gov/ooh/office-and-administrative-support/court-reporters-and-simultaneous-captioners.htm',
    keySkills: ['Court Procedures', 'Document Filing', 'Record Management', 'Customer Service', 'Legal Terminology', 'Data Entry', 'Scheduling', 'Confidentiality'],
    context: 'Court clerks maintain court records, manage case files, and assist with court proceedings. Accuracy and understanding of court procedures are essential.' },
  { slug: 'legal-assistant', jobTitle: 'Legal Assistant', category: 'Legal', avgSalary: '$48,000', jobGrowth: '+4%', blsUrl: 'https://www.bls.gov/ooh/legal/paralegals-and-legal-assistants.htm',
    keySkills: ['Administrative Support', 'Document Preparation', 'Client Communication', 'Research', 'Filing', 'Scheduling', 'Database Management', 'Confidentiality'],
    context: 'Legal assistants provide administrative support to legal teams. The role combines general admin skills with legal knowledge.' },
  { slug: 'compliance-officer', jobTitle: 'Compliance Officer', category: 'Legal', avgSalary: '$75,000', jobGrowth: '+8%', blsUrl: 'https://www.bls.gov/ooh/business-and-financial/compliance-officers.htm',
    keySkills: ['Regulatory Compliance', 'Risk Assessment', 'Policy Development', 'Auditing', 'Training', 'Reporting', 'Investigation', 'Documentation'],
    context: 'Compliance officers ensure organizations follow laws and regulations. The role requires deep knowledge of regulatory requirements.' },
  { slug: 'court-reporter', jobTitle: 'Court Reporter', category: 'Legal', avgSalary: '$62,000', jobGrowth: '+3%', blsUrl: 'https://www.bls.gov/ooh/office-and-administrative-support/court-reporters-and-simultaneous-captioners.htm',
    keySkills: ['Stenography', 'Real-time Reporting', 'Legal Terminology', 'Accuracy', 'Transcription', 'Technology', 'Confidentiality', 'Certification'],
    context: 'Court reporters create verbatim records of legal proceedings. Speed, accuracy, and certification are essential.' },
  { slug: 'title-examiner', jobTitle: 'Title Examiner', category: 'Legal', avgSalary: '$50,000', jobGrowth: '+4%', blsUrl: 'https://www.bls.gov/ooh/legal/paralegals-and-legal-assistants.htm',
    keySkills: ['Title Search', 'Real Estate Law', 'Document Analysis', 'Research', 'Attention to Detail', 'Database Skills', 'Communication', 'Problem Solving'],
    context: 'Title examiners research property records to verify ownership and identify issues. Thoroughness and legal knowledge are essential.' },
  { slug: 'arbitrator', jobTitle: 'Arbitrator', category: 'Legal', avgSalary: '$70,000', jobGrowth: '+6%', blsUrl: 'https://www.bls.gov/ooh/legal/arbitrators-mediators-and-conciliators.htm',
    keySkills: ['Dispute Resolution', 'Negotiation', 'Legal Knowledge', 'Impartiality', 'Decision Making', 'Communication', 'Analysis', 'Certification'],
    context: 'Arbitrators resolve disputes outside of court. The role requires legal expertise and strong judgment.' },
  { slug: 'mediator', jobTitle: 'Mediator', category: 'Legal', avgSalary: '$65,000', jobGrowth: '+6%', blsUrl: 'https://www.bls.gov/ooh/legal/arbitrators-mediators-and-conciliators.htm',
    keySkills: ['Conflict Resolution', 'Communication', 'Negotiation', 'Facilitation', 'Impartiality', 'Legal Knowledge', 'Empathy', 'Problem Solving'],
    context: 'Mediators help parties reach agreements in disputes. Communication skills and neutrality are essential.' },
  { slug: 'legal-analyst', jobTitle: 'Legal Analyst', category: 'Legal', avgSalary: '$72,000', jobGrowth: '+5%', blsUrl: 'https://www.bls.gov/ooh/legal/paralegals-and-legal-assistants.htm',
    keySkills: ['Legal Research', 'Data Analysis', 'Report Writing', 'Case Analysis', 'Technology', 'Communication', 'Critical Thinking', 'Compliance'],
    context: 'Legal analysts research and analyze legal issues to support decision-making. Analytical skills and legal knowledge are essential.' },
  { slug: 'contracts-specialist', jobTitle: 'Contracts Specialist', category: 'Legal', avgSalary: '$68,000', jobGrowth: '+5%', blsUrl: 'https://www.bls.gov/ooh/legal/paralegals-and-legal-assistants.htm',
    keySkills: ['Contract Drafting', 'Negotiation', 'Risk Analysis', 'Compliance', 'Communication', 'Attention to Detail', 'Database Management', 'Vendor Relations'],
    context: 'Contracts specialists draft, review, and negotiate contracts. Attention to detail and negotiation skills are essential.' },
  { slug: 'litigation-support-specialist', jobTitle: 'Litigation Support Specialist', category: 'Legal', avgSalary: '$60,000', jobGrowth: '+4%', blsUrl: 'https://www.bls.gov/ooh/legal/paralegals-and-legal-assistants.htm',
    keySkills: ['E-Discovery', 'Document Review', 'Technology', 'Database Management', 'Legal Research', 'Project Management', 'Trial Preparation', 'Communication'],
    context: 'Litigation support specialists manage electronic discovery and trial preparation technology. Tech skills and legal knowledge are essential.' },

  // EDUCATION (15 jobs)
  { slug: 'elementary-teacher', jobTitle: 'Elementary Teacher', category: 'Education', avgSalary: '$62,000', jobGrowth: '+4%', blsUrl: 'https://www.bls.gov/ooh/education-training-and-library/kindergarten-and-elementary-school-teachers.htm',
    keySkills: ['Lesson Planning', 'Classroom Management', 'Differentiated Instruction', 'Assessment', 'Parent Communication', 'Curriculum Development', 'Technology Integration', 'Student Engagement'],
    context: 'Elementary teachers educate children in foundational subjects and skills. The role requires patience, creativity, and classroom management ability.' },
  { slug: 'high-school-teacher', jobTitle: 'High School Teacher', category: 'Education', avgSalary: '$64,000', jobGrowth: '+4%', blsUrl: 'https://www.bls.gov/ooh/education-training-and-library/high-school-teachers.htm',
    keySkills: ['Subject Expertise', 'Lesson Planning', 'Assessment', 'Classroom Management', 'College Prep', 'Differentiation', 'Technology', 'Mentoring'],
    context: 'High school teachers instruct students in specific subjects, preparing them for college and careers.' },
  { slug: 'special-education-teacher', jobTitle: 'Special Education Teacher', category: 'Education', avgSalary: '$63,000', jobGrowth: '+4%', blsUrl: 'https://www.bls.gov/ooh/education-training-and-library/special-education-teachers.htm',
    keySkills: ['IEP Development', 'Adaptive Instruction', 'Behavior Management', 'Assessment', 'Collaboration', 'Parent Communication', 'Patience', 'Advocacy'],
    context: 'Special education teachers work with students who have diverse learning needs, developing individualized programs.' },
  { slug: 'preschool-teacher', jobTitle: 'Preschool Teacher', category: 'Education', avgSalary: '$35,000', jobGrowth: '+18%', blsUrl: 'https://www.bls.gov/ooh/education-training-and-library/preschool-teachers.htm',
    keySkills: ['Early Childhood Education', 'Play-Based Learning', 'Social Development', 'Parent Communication', 'Patience', 'Creativity', 'Safety', 'Assessment'],
    context: 'Preschool teachers prepare young children for kindergarten through play-based learning and social development.' },
  { slug: 'teaching-assistant', jobTitle: 'Teaching Assistant', category: 'Education', avgSalary: '$30,000', jobGrowth: '+4%', blsUrl: 'https://www.bls.gov/ooh/education-training-and-library/teacher-assistants.htm',
    keySkills: ['Student Support', 'Classroom Assistance', 'Small Group Instruction', 'Material Preparation', 'Supervision', 'Communication', 'Patience', 'Flexibility'],
    context: 'Teaching assistants support teachers by working with students individually or in small groups.' },
  { slug: 'school-counselor', jobTitle: 'School Counselor', category: 'Education', avgSalary: '$60,000', jobGrowth: '+10%', blsUrl: 'https://www.bls.gov/ooh/community-and-social-service/school-and-career-counselors-and-advisors.htm',
    keySkills: ['Counseling', 'Academic Planning', 'Crisis Intervention', 'Career Guidance', 'Social-Emotional Learning', 'Parent Collaboration', 'Assessment', 'Advocacy'],
    context: 'School counselors support students\' academic, career, and social-emotional development.' },
  { slug: 'librarian', jobTitle: 'Librarian', category: 'Education', avgSalary: '$62,000', jobGrowth: '+6%', blsUrl: 'https://www.bls.gov/ooh/education-training-and-library/librarians-and-library-media-specialists.htm',
    keySkills: ['Collection Management', 'Research Assistance', 'Information Literacy', 'Programming', 'Technology', 'Customer Service', 'Cataloging', 'Community Outreach'],
    context: 'Librarians manage library resources and help patrons with research and information needs.' },
  { slug: 'college-professor', jobTitle: 'College Professor', category: 'Education', avgSalary: '$82,000', jobGrowth: '+12%', blsUrl: 'https://www.bls.gov/ooh/education-training-and-library/postsecondary-teachers.htm',
    keySkills: ['Subject Expertise', 'Research', 'Curriculum Development', 'Lecturing', 'Student Advising', 'Publication', 'Grant Writing', 'Academic Service'],
    context: 'College professors teach undergraduate and graduate students while conducting research in their fields.' },
  { slug: 'academic-advisor', jobTitle: 'Academic Advisor', category: 'Education', avgSalary: '$48,000', jobGrowth: '+8%', blsUrl: 'https://www.bls.gov/ooh/community-and-social-service/school-and-career-counselors-and-advisors.htm',
    keySkills: ['Academic Planning', 'Student Support', 'Degree Requirements', 'Career Guidance', 'Communication', 'Problem Solving', 'Data Management', 'Retention'],
    context: 'Academic advisors help students plan their education and navigate degree requirements.' },
  { slug: 'tutor', jobTitle: 'Tutor', category: 'Education', avgSalary: '$40,000', jobGrowth: '+8%', blsUrl: 'https://www.bls.gov/ooh/education-training-and-library/self-enrichment-teachers.htm',
    keySkills: ['Subject Knowledge', 'Individualized Instruction', 'Patience', 'Assessment', 'Communication', 'Motivation', 'Study Skills', 'Flexibility'],
    context: 'Tutors provide individualized instruction to help students improve in specific subjects.' },
  { slug: 'curriculum-developer', jobTitle: 'Curriculum Developer', category: 'Education', avgSalary: '$70,000', jobGrowth: '+5%', blsUrl: 'https://www.bls.gov/ooh/education-training-and-library/instructional-coordinators.htm',
    keySkills: ['Curriculum Design', 'Assessment Development', 'Standards Alignment', 'Content Creation', 'Teacher Training', 'Research', 'Technology Integration', 'Evaluation'],
    context: 'Curriculum developers create educational content and programs aligned with learning standards.' },
  { slug: 'esl-teacher', jobTitle: 'ESL Teacher', category: 'Education', avgSalary: '$56,000', jobGrowth: '+12%', blsUrl: 'https://www.bls.gov/ooh/education-training-and-library/adult-literacy-and-ged-teachers.htm',
    keySkills: ['English Instruction', 'Cultural Sensitivity', 'Assessment', 'Curriculum Development', 'Patience', 'Communication', 'Differentiation', 'TESOL Methods'],
    context: 'ESL teachers help non-native speakers develop English language proficiency.' },
  { slug: 'school-administrator', jobTitle: 'School Administrator', category: 'Education', avgSalary: '$100,000', jobGrowth: '+8%', blsUrl: 'https://www.bls.gov/ooh/management/elementary-middle-and-high-school-principals.htm',
    keySkills: ['Leadership', 'Budget Management', 'Curriculum Oversight', 'Staff Development', 'Student Discipline', 'Parent Relations', 'Policy Implementation', 'Strategic Planning'],
    context: 'School administrators lead schools, managing staff, budgets, and student outcomes.' },
  { slug: 'instructional-designer', jobTitle: 'Instructional Designer', category: 'Education', avgSalary: '$72,000', jobGrowth: '+10%', blsUrl: 'https://www.bls.gov/ooh/education-training-and-library/instructional-coordinators.htm',
    keySkills: ['Course Design', 'E-Learning', 'Learning Management Systems', 'Assessment', 'Multimedia', 'Adult Learning Theory', 'Project Management', 'Evaluation'],
    context: 'Instructional designers create effective learning experiences for corporate and educational settings.' },
  { slug: 'reading-specialist', jobTitle: 'Reading Specialist', category: 'Education', avgSalary: '$58,000', jobGrowth: '+4%', blsUrl: 'https://www.bls.gov/ooh/education-training-and-library/special-education-teachers.htm',
    keySkills: ['Reading Assessment', 'Intervention', 'Phonics Instruction', 'Reading Strategies', 'Teacher Coaching', 'Differentiation', 'Curriculum Knowledge', 'Progress Monitoring'],
    context: 'Reading specialists help struggling readers develop literacy skills and coach teachers.' },

  // GOVERNMENT (10 jobs)
  { slug: 'city-planner', jobTitle: 'City Planner', category: 'Government', avgSalary: '$78,000', jobGrowth: '+7%', blsUrl: 'https://www.bls.gov/ooh/life-physical-and-social-science/urban-and-regional-planners.htm',
    keySkills: ['Urban Planning', 'Zoning', 'GIS', 'Community Engagement', 'Policy Analysis', 'Environmental Review', 'Project Management', 'Presentation'],
    context: 'City planners develop land use plans and policies to guide community development.' },
  { slug: 'social-worker', jobTitle: 'Social Worker', category: 'Government', avgSalary: '$55,000', jobGrowth: '+9%', blsUrl: 'https://www.bls.gov/ooh/community-and-social-service/social-workers.htm',
    keySkills: ['Case Management', 'Counseling', 'Advocacy', 'Assessment', 'Crisis Intervention', 'Resource Connection', 'Documentation', 'Empathy'],
    context: 'Social workers help individuals and families navigate challenges and access services.' },
  { slug: 'firefighter', jobTitle: 'Firefighter', category: 'Government', avgSalary: '$52,000', jobGrowth: '+4%', blsUrl: 'https://www.bls.gov/ooh/protective-service/firefighters.htm',
    keySkills: ['Fire Suppression', 'Emergency Response', 'Physical Fitness', 'First Aid', 'Equipment Operation', 'Hazmat', 'Rescue', 'Team Coordination'],
    context: 'Firefighters respond to fires, medical emergencies, and disasters. Physical fitness and bravery are essential.' },
  { slug: 'police-officer', jobTitle: 'Police Officer', category: 'Government', avgSalary: '$65,000', jobGrowth: '+3%', blsUrl: 'https://www.bls.gov/ooh/protective-service/police-and-detectives.htm',
    keySkills: ['Law Enforcement', 'Investigation', 'Communication', 'Physical Fitness', 'Decision Making', 'Report Writing', 'Community Relations', 'Firearm Proficiency'],
    context: 'Police officers maintain public safety, investigate crimes, and serve their communities.' },
  { slug: 'park-ranger', jobTitle: 'Park Ranger', category: 'Government', avgSalary: '$45,000', jobGrowth: '+5%', blsUrl: 'https://www.bls.gov/ooh/protective-service/fish-and-game-wardens.htm',
    keySkills: ['Natural Resource Management', 'Visitor Services', 'Law Enforcement', 'Education', 'Emergency Response', 'Physical Fitness', 'Communication', 'Conservation'],
    context: 'Park rangers protect natural resources, educate visitors, and ensure park safety.' },
  { slug: 'postal-worker', jobTitle: 'Postal Worker', category: 'Government', avgSalary: '$48,000', jobGrowth: '-4%', blsUrl: 'https://www.bls.gov/ooh/office-and-administrative-support/postal-service-workers.htm',
    keySkills: ['Mail Processing', 'Customer Service', 'Physical Stamina', 'Attention to Detail', 'Time Management', 'Vehicle Operation', 'Route Management', 'Reliability'],
    context: 'Postal workers sort and deliver mail, serving as essential community connectors.' },
  { slug: 'correctional-officer', jobTitle: 'Correctional Officer', category: 'Government', avgSalary: '$48,000', jobGrowth: '+3%', blsUrl: 'https://www.bls.gov/ooh/protective-service/correctional-officers-and-bailiffs.htm',
    keySkills: ['Security', 'Inmate Supervision', 'Conflict Resolution', 'Emergency Response', 'Documentation', 'Physical Fitness', 'Communication', 'Rule Enforcement'],
    context: 'Correctional officers maintain security and supervise inmates in detention facilities.' },
  { slug: 'tsa-agent', jobTitle: 'TSA Agent', category: 'Government', avgSalary: '$45,000', jobGrowth: '+2%', blsUrl: 'https://www.bls.gov/ooh/protective-service/transportation-security-screeners.htm',
    keySkills: ['Security Screening', 'Customer Service', 'Attention to Detail', 'X-ray Interpretation', 'Communication', 'Physical Stamina', 'Protocol Compliance', 'Problem Solving'],
    context: 'TSA agents screen passengers and baggage to ensure aviation security.' },
  { slug: 'public-health-inspector', jobTitle: 'Public Health Inspector', category: 'Government', avgSalary: '$55,000', jobGrowth: '+5%', blsUrl: 'https://www.bls.gov/ooh/healthcare/occupational-health-and-safety-specialists.htm',
    keySkills: ['Health Code Enforcement', 'Inspection', 'Investigation', 'Communication', 'Documentation', 'Education', 'Regulatory Knowledge', 'Problem Solving'],
    context: 'Public health inspectors ensure food establishments and facilities meet health standards.' },
  { slug: 'code-enforcement-officer', jobTitle: 'Code Enforcement Officer', category: 'Government', avgSalary: '$48,000', jobGrowth: '+4%', blsUrl: 'https://www.bls.gov/ooh/protective-service/fish-and-game-wardens.htm',
    keySkills: ['Code Interpretation', 'Investigation', 'Communication', 'Documentation', 'Conflict Resolution', 'Public Relations', 'Legal Knowledge', 'Inspection'],
    context: 'Code enforcement officers ensure compliance with local ordinances and building codes.' },

  // CREATIVE (10 jobs)
  { slug: 'photographer', jobTitle: 'Photographer', category: 'Creative', avgSalary: '$45,000', jobGrowth: '+17%', blsUrl: 'https://www.bls.gov/ooh/media-and-communication/photographers.htm',
    keySkills: ['Photography', 'Editing', 'Lighting', 'Composition', 'Client Relations', 'Business Skills', 'Equipment Management', 'Portfolio Development'],
    context: 'Photographers capture images for commercial, artistic, and personal purposes.' },
  { slug: 'videographer', jobTitle: 'Videographer', category: 'Creative', avgSalary: '$55,000', jobGrowth: '+18%', blsUrl: 'https://www.bls.gov/ooh/media-and-communication/film-and-video-editors-and-camera-operators.htm',
    keySkills: ['Video Production', 'Editing', 'Camera Operation', 'Audio', 'Lighting', 'Storytelling', 'Client Communication', 'Project Management'],
    context: 'Videographers create video content for events, marketing, and entertainment.' },
  { slug: 'interior-designer', jobTitle: 'Interior Designer', category: 'Creative', avgSalary: '$60,000', jobGrowth: '+4%', blsUrl: 'https://www.bls.gov/ooh/arts-and-design/interior-designers.htm',
    keySkills: ['Space Planning', 'Color Theory', 'CAD Software', 'Client Relations', 'Project Management', 'Vendor Coordination', 'Material Selection', 'Budget Management'],
    context: 'Interior designers plan and design functional, aesthetically pleasing interior spaces.' },
  { slug: 'animator', jobTitle: 'Animator', category: 'Creative', avgSalary: '$78,000', jobGrowth: '+16%', blsUrl: 'https://www.bls.gov/ooh/arts-and-design/multimedia-artists-and-animators.htm',
    keySkills: ['2D/3D Animation', 'Character Design', 'Storyboarding', 'Software (Maya, Blender)', 'Timing', 'Creativity', 'Collaboration', 'Attention to Detail'],
    context: 'Animators create animated content for film, TV, games, and digital media.' },
  { slug: 'music-producer', jobTitle: 'Music Producer', category: 'Creative', avgSalary: '$55,000', jobGrowth: '+6%', blsUrl: 'https://www.bls.gov/ooh/entertainment-and-sports/music-directors-and-composers.htm',
    keySkills: ['Music Production', 'Recording', 'Mixing', 'Sound Design', 'Artist Development', 'DAW Software', 'Collaboration', 'Creativity'],
    context: 'Music producers create and shape recordings, working with artists to realize their vision.' },
  { slug: 'fashion-designer', jobTitle: 'Fashion Designer', category: 'Creative', avgSalary: '$77,000', jobGrowth: '+3%', blsUrl: 'https://www.bls.gov/ooh/arts-and-design/fashion-designers.htm',
    keySkills: ['Design', 'Pattern Making', 'Sewing', 'Trend Forecasting', 'CAD Software', 'Material Selection', 'Creativity', 'Industry Knowledge'],
    context: 'Fashion designers create clothing and accessories, bringing creative visions to market.' },
  { slug: 'art-director', jobTitle: 'Art Director', category: 'Creative', avgSalary: '$100,000', jobGrowth: '+6%', blsUrl: 'https://www.bls.gov/ooh/arts-and-design/art-directors.htm',
    keySkills: ['Visual Direction', 'Team Leadership', 'Design Strategy', 'Client Presentation', 'Brand Development', 'Project Management', 'Creativity', 'Communication'],
    context: 'Art directors lead visual direction for publications, advertising, and digital media.' },
  { slug: 'makeup-artist', jobTitle: 'Makeup Artist', category: 'Creative', avgSalary: '$40,000', jobGrowth: '+11%', blsUrl: 'https://www.bls.gov/ooh/personal-care-and-service/hairdressers-hairstylists-and-cosmetologists.htm',
    keySkills: ['Makeup Application', 'Color Theory', 'Client Consultation', 'Trend Knowledge', 'Portfolio Development', 'Product Knowledge', 'Sanitation', 'Creativity'],
    context: 'Makeup artists enhance appearances for fashion, film, television, and special events.' },
  { slug: 'florist', jobTitle: 'Florist', category: 'Creative', avgSalary: '$32,000', jobGrowth: '-5%', blsUrl: 'https://www.bls.gov/ooh/personal-care-and-service/florists.htm',
    keySkills: ['Floral Design', 'Customer Service', 'Plant Care', 'Color Theory', 'Business Skills', 'Event Planning', 'Creativity', 'Time Management'],
    context: 'Florists design and create floral arrangements for events and everyday occasions.' },
  { slug: 'voice-actor', jobTitle: 'Voice Actor', category: 'Creative', avgSalary: '$35,000', jobGrowth: '+5%', blsUrl: 'https://www.bls.gov/ooh/entertainment-and-sports/actors.htm',
    keySkills: ['Voice Acting', 'Character Voices', 'Home Studio', 'Auditioning', 'Script Interpretation', 'Marketing', 'Audio Editing', 'Versatility'],
    context: 'Voice actors provide voices for animation, commercials, video games, and audiobooks.' },

  // FITNESS & WELLNESS (8 jobs)
  { slug: 'personal-trainer', jobTitle: 'Personal Trainer', category: 'Fitness', avgSalary: '$45,000', jobGrowth: '+19%', blsUrl: 'https://www.bls.gov/ooh/personal-care-and-service/fitness-trainers-and-instructors.htm',
    keySkills: ['Exercise Programming', 'Client Assessment', 'Motivation', 'Nutrition Basics', 'Safety', 'Communication', 'Business Development', 'Certification'],
    context: 'Personal trainers design and supervise exercise programs to help clients achieve fitness goals.' },
  { slug: 'yoga-instructor', jobTitle: 'Yoga Instructor', category: 'Fitness', avgSalary: '$40,000', jobGrowth: '+19%', blsUrl: 'https://www.bls.gov/ooh/personal-care-and-service/fitness-trainers-and-instructors.htm',
    keySkills: ['Yoga Practice', 'Class Instruction', 'Modifications', 'Philosophy', 'Anatomy Knowledge', 'Communication', 'Safety', 'Certification'],
    context: 'Yoga instructors guide students through yoga practice, adapting to various levels and needs.' },
  { slug: 'fitness-instructor', jobTitle: 'Fitness Instructor', category: 'Fitness', avgSalary: '$42,000', jobGrowth: '+19%', blsUrl: 'https://www.bls.gov/ooh/personal-care-and-service/fitness-trainers-and-instructors.htm',
    keySkills: ['Group Exercise', 'Choreography', 'Music Selection', 'Motivation', 'Class Management', 'Safety', 'Certification', 'Energy'],
    context: 'Fitness instructors lead group exercise classes in various formats and fitness levels.' },
  { slug: 'sports-coach', jobTitle: 'Sports Coach', category: 'Fitness', avgSalary: '$38,000', jobGrowth: '+26%', blsUrl: 'https://www.bls.gov/ooh/entertainment-and-sports/coaches-and-scouts.htm',
    keySkills: ['Sport Expertise', 'Player Development', 'Strategy', 'Team Management', 'Communication', 'Motivation', 'Safety', 'Leadership'],
    context: 'Sports coaches train athletes and teams, developing skills and competitive strategies.' },
  { slug: 'wellness-coach', jobTitle: 'Wellness Coach', category: 'Fitness', avgSalary: '$48,000', jobGrowth: '+12%', blsUrl: 'https://www.bls.gov/ooh/personal-care-and-service/fitness-trainers-and-instructors.htm',
    keySkills: ['Behavior Change', 'Goal Setting', 'Holistic Health', 'Motivation', 'Communication', 'Assessment', 'Program Design', 'Certification'],
    context: 'Wellness coaches help clients improve overall health through lifestyle changes.' },
  { slug: 'pilates-instructor', jobTitle: 'Pilates Instructor', category: 'Fitness', avgSalary: '$45,000', jobGrowth: '+19%', blsUrl: 'https://www.bls.gov/ooh/personal-care-and-service/fitness-trainers-and-instructors.htm',
    keySkills: ['Pilates Method', 'Equipment Knowledge', 'Modifications', 'Anatomy', 'Client Assessment', 'Communication', 'Certification', 'Safety'],
    context: 'Pilates instructors teach Pilates exercises focusing on core strength and flexibility.' },
  { slug: 'athletic-trainer', jobTitle: 'Athletic Trainer', category: 'Fitness', avgSalary: '$50,000', jobGrowth: '+17%', blsUrl: 'https://www.bls.gov/ooh/healthcare/athletic-trainers.htm',
    keySkills: ['Injury Prevention', 'Emergency Care', 'Rehabilitation', 'Assessment', 'Communication', 'Documentation', 'Athlete Education', 'Certification'],
    context: 'Athletic trainers prevent and treat injuries for athletes, providing emergency care and rehabilitation.' },
  { slug: 'recreation-coordinator', jobTitle: 'Recreation Coordinator', category: 'Fitness', avgSalary: '$48,000', jobGrowth: '+10%', blsUrl: 'https://www.bls.gov/ooh/personal-care-and-service/recreation-workers.htm',
    keySkills: ['Program Planning', 'Event Management', 'Facility Coordination', 'Community Outreach', 'Budget Management', 'Staff Supervision', 'Communication', 'Safety'],
    context: 'Recreation coordinators plan and manage recreational programs and activities for communities.' },

  // ANIMAL CARE (6 jobs)
  { slug: 'veterinary-technician', jobTitle: 'Veterinary Technician', category: 'Animal Care', avgSalary: '$38,000', jobGrowth: '+20%', blsUrl: 'https://www.bls.gov/ooh/healthcare/veterinary-technologists-and-technicians.htm',
    keySkills: ['Animal Handling', 'Medical Procedures', 'Laboratory Skills', 'Anesthesia', 'Client Communication', 'Documentation', 'Emergency Care', 'Compassion'],
    context: 'Veterinary technicians assist veterinarians with animal care, procedures, and client communication.' },
  { slug: 'dog-trainer', jobTitle: 'Dog Trainer', category: 'Animal Care', avgSalary: '$35,000', jobGrowth: '+22%', blsUrl: 'https://www.bls.gov/ooh/personal-care-and-service/animal-care-and-service-workers.htm',
    keySkills: ['Training Methods', 'Behavior Assessment', 'Client Education', 'Patience', 'Communication', 'Business Skills', 'Safety', 'Certification'],
    context: 'Dog trainers teach dogs and their owners positive behaviors and obedience skills.' },
  { slug: 'pet-groomer', jobTitle: 'Pet Groomer', category: 'Animal Care', avgSalary: '$32,000', jobGrowth: '+22%', blsUrl: 'https://www.bls.gov/ooh/personal-care-and-service/animal-care-and-service-workers.htm',
    keySkills: ['Grooming Techniques', 'Breed Standards', 'Animal Handling', 'Customer Service', 'Safety', 'Equipment Maintenance', 'Patience', 'Attention to Detail'],
    context: 'Pet groomers bathe, clip, and style pets while ensuring their comfort and safety.' },
  { slug: 'animal-shelter-worker', jobTitle: 'Animal Shelter Worker', category: 'Animal Care', avgSalary: '$28,000', jobGrowth: '+22%', blsUrl: 'https://www.bls.gov/ooh/personal-care-and-service/animal-care-and-service-workers.htm',
    keySkills: ['Animal Care', 'Cleaning', 'Adoption Counseling', 'Customer Service', 'Compassion', 'Physical Stamina', 'Communication', 'Emotional Resilience'],
    context: 'Animal shelter workers care for homeless animals and help match them with adoptive families.' },
  { slug: 'zookeeper', jobTitle: 'Zookeeper', category: 'Animal Care', avgSalary: '$32,000', jobGrowth: '+22%', blsUrl: 'https://www.bls.gov/ooh/personal-care-and-service/animal-care-and-service-workers.htm',
    keySkills: ['Animal Husbandry', 'Feeding', 'Enrichment', 'Health Monitoring', 'Public Education', 'Safety', 'Physical Stamina', 'Conservation'],
    context: 'Zookeepers care for animals in zoos, providing enrichment and educating the public.' },
  { slug: 'pet-sitter', jobTitle: 'Pet Sitter', category: 'Animal Care', avgSalary: '$30,000', jobGrowth: '+22%', blsUrl: 'https://www.bls.gov/ooh/personal-care-and-service/animal-care-and-service-workers.htm',
    keySkills: ['Animal Care', 'Reliability', 'Communication', 'Emergency Response', 'Business Skills', 'Trust Building', 'Scheduling', 'Pet First Aid'],
    context: 'Pet sitters care for animals in their homes when owners are away.' },

  // REAL ESTATE (6 jobs)
  { slug: 'real-estate-agent', jobTitle: 'Real Estate Agent', category: 'Real Estate', avgSalary: '$52,000', jobGrowth: '+4%', blsUrl: 'https://www.bls.gov/ooh/sales/real-estate-brokers-and-sales-agents.htm',
    keySkills: ['Sales', 'Negotiation', 'Market Knowledge', 'Client Relations', 'Marketing', 'Communication', 'Networking', 'Licensing'],
    context: 'Real estate agents help clients buy, sell, and rent properties.' },
  { slug: 'property-manager', jobTitle: 'Property Manager', category: 'Real Estate', avgSalary: '$60,000', jobGrowth: '+7%', blsUrl: 'https://www.bls.gov/ooh/management/property-real-estate-and-community-association-managers.htm',
    keySkills: ['Tenant Relations', 'Maintenance Coordination', 'Lease Administration', 'Financial Management', 'Marketing', 'Legal Compliance', 'Communication', 'Problem Solving'],
    context: 'Property managers oversee residential and commercial properties for owners.' },
  { slug: 'real-estate-appraiser', jobTitle: 'Real Estate Appraiser', category: 'Real Estate', avgSalary: '$65,000', jobGrowth: '+5%', blsUrl: 'https://www.bls.gov/ooh/business-and-financial/appraisers-and-assessors-of-real-estate.htm',
    keySkills: ['Property Valuation', 'Market Analysis', 'Report Writing', 'Inspection', 'Licensing', 'Math Skills', 'Attention to Detail', 'Ethics'],
    context: 'Real estate appraisers determine property values for sales, mortgages, and tax purposes.' },
  { slug: 'leasing-consultant', jobTitle: 'Leasing Consultant', category: 'Real Estate', avgSalary: '$38,000', jobGrowth: '+4%', blsUrl: 'https://www.bls.gov/ooh/sales/real-estate-brokers-and-sales-agents.htm',
    keySkills: ['Sales', 'Customer Service', 'Property Tours', 'Application Processing', 'Marketing', 'Communication', 'Negotiation', 'Fair Housing'],
    context: 'Leasing consultants show rental properties and help prospective tenants through the application process.' },
  { slug: 'mortgage-loan-officer', jobTitle: 'Mortgage Loan Officer', category: 'Real Estate', avgSalary: '$65,000', jobGrowth: '+4%', blsUrl: 'https://www.bls.gov/ooh/business-and-financial/loan-officers.htm',
    keySkills: ['Loan Processing', 'Financial Analysis', 'Sales', 'Customer Service', 'Regulatory Compliance', 'Communication', 'Attention to Detail', 'Networking'],
    context: 'Mortgage loan officers help homebuyers obtain financing for property purchases.' },
  { slug: 'home-inspector', jobTitle: 'Home Inspector', category: 'Real Estate', avgSalary: '$62,000', jobGrowth: '+4%', blsUrl: 'https://www.bls.gov/ooh/construction-and-extraction/construction-and-building-inspectors.htm',
    keySkills: ['Inspection', 'Report Writing', 'Building Systems', 'Communication', 'Attention to Detail', 'Certification', 'Problem Identification', 'Client Education'],
    context: 'Home inspectors examine properties and report on their condition for buyers.' },

  // CLEANING & MAINTENANCE (6 jobs)
  { slug: 'janitor', jobTitle: 'Janitor', category: 'Cleaning', avgSalary: '$32,000', jobGrowth: '+6%', blsUrl: 'https://www.bls.gov/ooh/building-and-grounds-cleaning/janitors-and-building-cleaners.htm',
    keySkills: ['Cleaning', 'Floor Care', 'Equipment Operation', 'Safety', 'Reliability', 'Physical Stamina', 'Time Management', 'Attention to Detail'],
    context: 'Janitors maintain cleanliness and order in buildings through daily cleaning tasks.' },
  { slug: 'house-cleaner', jobTitle: 'House Cleaner', category: 'Cleaning', avgSalary: '$30,000', jobGrowth: '+6%', blsUrl: 'https://www.bls.gov/ooh/building-and-grounds-cleaning/maids-and-housekeeping-cleaners.htm',
    keySkills: ['Cleaning', 'Organization', 'Attention to Detail', 'Time Management', 'Customer Service', 'Trustworthiness', 'Physical Stamina', 'Discretion'],
    context: 'House cleaners maintain cleanliness in private homes for residential clients.' },
  { slug: 'window-cleaner', jobTitle: 'Window Cleaner', category: 'Cleaning', avgSalary: '$35,000', jobGrowth: '+6%', blsUrl: 'https://www.bls.gov/ooh/building-and-grounds-cleaning/janitors-and-building-cleaners.htm',
    keySkills: ['Window Cleaning', 'Height Safety', 'Equipment Use', 'Attention to Detail', 'Physical Fitness', 'Customer Service', 'Time Management', 'Safety Training'],
    context: 'Window cleaners maintain building windows, often working at heights.' },
  { slug: 'carpet-cleaner', jobTitle: 'Carpet Cleaner', category: 'Cleaning', avgSalary: '$35,000', jobGrowth: '+6%', blsUrl: 'https://www.bls.gov/ooh/building-and-grounds-cleaning/janitors-and-building-cleaners.htm',
    keySkills: ['Carpet Cleaning', 'Stain Removal', 'Equipment Operation', 'Customer Service', 'Chemical Knowledge', 'Physical Stamina', 'Time Management', 'Sales'],
    context: 'Carpet cleaners deep clean carpets and upholstery using specialized equipment.' },
  { slug: 'pressure-washer', jobTitle: 'Pressure Washer', category: 'Cleaning', avgSalary: '$38,000', jobGrowth: '+6%', blsUrl: 'https://www.bls.gov/ooh/building-and-grounds-cleaning/janitors-and-building-cleaners.htm',
    keySkills: ['Pressure Washing', 'Equipment Maintenance', 'Surface Knowledge', 'Safety', 'Customer Service', 'Physical Stamina', 'Time Management', 'Business Skills'],
    context: 'Pressure washers clean exterior surfaces of buildings, driveways, and equipment.' },
  { slug: 'pool-cleaner', jobTitle: 'Pool Cleaner', category: 'Cleaning', avgSalary: '$35,000', jobGrowth: '+6%', blsUrl: 'https://www.bls.gov/ooh/building-and-grounds-cleaning/grounds-maintenance-workers.htm',
    keySkills: ['Pool Chemistry', 'Equipment Maintenance', 'Cleaning', 'Customer Service', 'Reliability', 'Route Management', 'Problem Solving', 'Safety'],
    context: 'Pool cleaners maintain swimming pools by balancing chemistry and cleaning.' }
];

function generateMDXContent(job, authorName) {
  const currentDate = new Date().toISOString().split('T')[0];
  const year = new Date().getFullYear();

  return `---
title: '${job.jobTitle} Resume: Examples & Writing Guide ${year}'
slug: ${job.slug}
description: >-
  ${job.jobTitle} resume example with professional format. Highlight your skills and experience.
cardSummary: >-
  Get hired as a ${job.jobTitle}. Showcase ${job.keySkills[0]} and professional achievements.
date: '${currentDate}'
author: ${authorName}
category: ${job.category}
tags:
  - ${job.slug.replace(/-/g, ' ')} resume
  - ${job.category.toLowerCase()} resume
  - ${job.jobTitle.toLowerCase()} resume
  - resume format
  - professional resume
image: /images/resume-examples/${job.slug}.png
imageAlt: ${job.jobTitle} Resume Example
featured: false
jobTitle: ${job.jobTitle}
avgSalary: '${job.avgSalary}'
jobGrowth: ${job.jobGrowth}
keySkills:
${job.keySkills.map(s => `  - ${s}`).join('\n')}
faq:
  - question: What skills should I put on a ${job.jobTitle} resume?
    answer: >-
      Include ${job.keySkills.slice(0,4).join(', ')} and other relevant competencies.
  - question: How much does a ${job.jobTitle} make?
    answer: >-
      ${job.jobTitle} professionals earn an average of ${job.avgSalary}, with ${job.jobGrowth} projected growth.
---
## What Makes a Great ${job.jobTitle} Resume?

${job.context} With ${job.jobGrowth} growth and ${job.avgSalary} average salary, ${job.jobTitle} positions offer solid career opportunities.

## Professional Summary Examples

**Entry-Level:** "Motivated ${job.jobTitle} with training in ${job.keySkills[0]} and ${job.keySkills[1]}. Strong work ethic with commitment to excellence."

**Experienced:** "Skilled ${job.jobTitle} with 4+ years of experience. Proven track record in ${job.keySkills[0]} and ${job.keySkills[2]} with excellent results."

## Salary & Job Outlook

${job.jobTitle} professionals earn approximately **${job.avgSalary}** with **${job.jobGrowth}** projected growth.

**Sources:** [BLS](${job.blsUrl}), [Glassdoor](https://www.glassdoor.com/Salaries/), [PayScale](https://www.payscale.com/).

## Key Skills to Include

${job.keySkills.map(s => `- ${s}`).join('\n')}

## Resume Tips

- Lead with relevant certifications and qualifications
- Quantify achievements with specific metrics
- Highlight skills matching the job description
- Keep formatting clean and professional
- Include relevant keywords for ATS systems

Ready to build your ${job.jobTitle} resume? [Try our AI-powered resume builder](/builder).
`;
}

// Main execution
console.log('🚀 Generating remaining resume examples...\n');

let created = 0, skipped = 0;
const categoryCounters = {};

ALL_JOBS.forEach((job, index) => {
  const filePath = path.join(CONTENT_DIR, `${job.slug}.mdx`);

  if (fs.existsSync(filePath)) {
    console.log(`⏭️  Skipped: ${job.slug}.mdx (exists)`);
    skipped++;
    return;
  }

  // Get author based on category
  categoryCounters[job.category] = (categoryCounters[job.category] || 0) + 1;
  const authors = CATEGORY_AUTHORS[job.category] || CATEGORY_AUTHORS.Legal;
  const author = authors[categoryCounters[job.category] % authors.length];

  fs.writeFileSync(filePath, generateMDXContent(job, author), 'utf-8');
  console.log(`✅ Created: ${job.slug}.mdx (${job.category})`);
  created++;
});

console.log(`\n📊 Summary:`);
console.log(`   ✅ Created: ${created}`);
console.log(`   ⏭️  Skipped: ${skipped}`);
console.log(`   📁 Total Jobs: ${ALL_JOBS.length}`);
