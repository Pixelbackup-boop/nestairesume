#!/usr/bin/env node
/**
 * Generates 32 Healthcare resume example MDX files
 * Following CLAUDE.md SEO guidelines with profession-specific content
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONTENT_DIR = path.join(__dirname, '../frontend/content/resume-examples');

// Healthcare job data with profession-specific details
const HEALTHCARE_JOBS = [
  {
    slug: 'home-health-aide',
    jobTitle: 'Home Health Aide',
    avgSalary: '$33,000',
    jobGrowth: '+22%',
    blsUrl: 'https://www.bls.gov/ooh/healthcare/home-health-aides-and-personal-care-aides.htm',
    keySkills: ['Patient Care', 'Vital Signs Monitoring', 'Medication Reminders', 'Personal Hygiene Assistance', 'Mobility Support', 'Meal Preparation', 'Documentation', 'CPR/First Aid'],
    skillCategories: {
      'Direct Care Skills': ['Bathing and grooming assistance', 'Feeding and nutrition support', 'Toileting and incontinence care', 'Mobility and transfer assistance'],
      'Health Monitoring': ['Vital signs measurement', 'Medication reminders', 'Symptom observation', 'Health status reporting'],
      'Household Support': ['Light housekeeping', 'Meal preparation', 'Laundry assistance', 'Errand running']
    },
    certifications: ['Home Health Aide (HHA) Certification', 'CPR/BLS Certification', 'First Aid Certification', 'State-specific training requirements'],
    uniqueContext: 'Home health aides work independently in patients\' homes, requiring both clinical skills and the ability to build trust with patients and families. The role demands adaptability since each home environment and patient presents unique challenges.',
    hiringTip: 'Home health aide resumes that demonstrate reliability and patient rapport get callbacks. Hiring coordinators look for consistency (low turnover between clients), specific patient populations you\'ve worked with (dementia, post-surgical, pediatric), and your comfort level with various ADL tasks. Include the number of patients you\'ve cared for simultaneously and any special populations.',
    commonMistakes: [
      'Not specifying patient populations served (elderly, disabled, post-surgical)',
      'Omitting certifications and their expiration dates',
      'Failing to mention transportation reliability and valid driver\'s license',
      'Using clinical jargon instead of showing compassionate care examples',
      'Not including references from families or supervisors'
    ],
    interviewQuestions: [
      { q: 'How do you handle a patient who refuses care or becomes agitated?', guidance: 'Describe de-escalation techniques, patience, and when you involve supervisors or family members. Give a specific example.' },
      { q: 'Describe your experience with patients who have dementia or Alzheimer\'s.', guidance: 'Discuss specific techniques for communication, redirection, and maintaining safety. Mention any specialized training.' },
      { q: 'How do you maintain professional boundaries while working in someone\'s home?', guidance: 'Explain the balance between building rapport and maintaining appropriate limits. Give examples of boundary situations.' },
      { q: 'What would you do if you noticed signs of abuse or neglect?', guidance: 'Demonstrate knowledge of mandatory reporting requirements and proper documentation procedures.' },
      { q: 'How do you manage your time when caring for multiple patients in different locations?', guidance: 'Discuss scheduling, prioritization, and communication with the agency. Mention reliability and punctuality.' }
    ],
    atsKeywords: ['home health aide', 'HHA', 'personal care', 'ADL', 'activities of daily living', 'vital signs', 'patient care', 'HIPAA', 'documentation', 'CPR certified']
  },
  {
    slug: 'nurse-practitioner',
    jobTitle: 'Nurse Practitioner',
    avgSalary: '$125,000',
    jobGrowth: '+40%',
    blsUrl: 'https://www.bls.gov/ooh/healthcare/nurse-anesthetists-nurse-midwives-and-nurse-practitioners.htm',
    keySkills: ['Advanced Assessment', 'Diagnosis', 'Prescriptive Authority', 'Patient Education', 'Care Coordination', 'EHR Documentation', 'Chronic Disease Management', 'Evidence-Based Practice'],
    skillCategories: {
      'Clinical Practice': ['Comprehensive health assessments', 'Differential diagnosis', 'Treatment planning', 'Prescribing medications'],
      'Patient Management': ['Chronic disease management', 'Preventive care', 'Patient education', 'Care coordination'],
      'Administrative': ['EHR documentation', 'Quality improvement', 'Collaborative practice', 'Regulatory compliance']
    },
    certifications: ['APRN License', 'National Certification (AANP or ANCC)', 'DEA Registration', 'State Prescriptive Authority', 'BLS/ACLS'],
    uniqueContext: 'Nurse practitioners function as autonomous primary care providers in many states, with full prescriptive authority. The role bridges nursing\'s holistic approach with advanced medical decision-making, making NPs essential in addressing primary care shortages.',
    hiringTip: 'NP resumes need to showcase your specialty certification, prescriptive authority status, and patient panel size. Hiring managers want to see your average daily patient volume, chronic disease management outcomes (A1C improvements, blood pressure control rates), and any quality metrics. List your DEA number status and collaborative physician arrangements if required in your state.',
    commonMistakes: [
      'Not clearly stating APRN license, certification body, and prescriptive authority',
      'Omitting specialty focus (family, adult-gerontology, psychiatric, etc.)',
      'Failing to include patient volume and panel size metrics',
      'Not mentioning EHR systems experience (Epic, Cerner, Athenahealth)',
      'Leaving out quality improvement initiatives and outcomes data'
    ],
    interviewQuestions: [
      { q: 'Describe a complex patient case and your diagnostic reasoning process.', guidance: 'Walk through history, physical exam findings, differential diagnosis, and treatment plan. Show clinical thinking.' },
      { q: 'How do you stay current with evidence-based practice guidelines?', guidance: 'Mention CME activities, professional organizations, journal subscriptions, and how you implement new guidelines.' },
      { q: 'Describe your experience with collaborative practice agreements.', guidance: 'Discuss physician collaboration, when you consult vs. refer, and your comfort with autonomous practice.' },
      { q: 'How do you handle a situation where a patient disagrees with your treatment plan?', guidance: 'Emphasize shared decision-making, patient education, and motivational interviewing techniques.' },
      { q: 'What quality improvement initiatives have you led or participated in?', guidance: 'Give specific examples with measurable outcomes—reduced readmissions, improved screening rates, etc.' }
    ],
    atsKeywords: ['nurse practitioner', 'NP', 'APRN', 'advanced practice', 'prescriptive authority', 'primary care', 'diagnosis', 'treatment', 'chronic disease management', 'Epic', 'patient panel']
  },
  {
    slug: 'physical-therapist',
    jobTitle: 'Physical Therapist',
    avgSalary: '$97,000',
    jobGrowth: '+15%',
    blsUrl: 'https://www.bls.gov/ooh/healthcare/physical-therapists.htm',
    keySkills: ['Manual Therapy', 'Therapeutic Exercise', 'Gait Training', 'Pain Management', 'Patient Assessment', 'Treatment Planning', 'Documentation', 'Patient Education'],
    skillCategories: {
      'Clinical Treatment': ['Manual therapy techniques', 'Therapeutic exercise prescription', 'Modality application', 'Gait and balance training'],
      'Assessment & Planning': ['Musculoskeletal evaluation', 'Functional outcome measures', 'Treatment plan development', 'Discharge planning'],
      'Specializations': ['Orthopedic rehabilitation', 'Neurological conditions', 'Sports injuries', 'Geriatric care']
    },
    certifications: ['PT License', 'DPT Degree', 'BLS Certification', 'Specialty Certifications (OCS, NCS, SCS)', 'Dry Needling Certification'],
    uniqueContext: 'Physical therapists combine clinical expertise with hands-on treatment, requiring strong interpersonal skills to motivate patients through challenging rehabilitation. The field is increasingly specialized, with board certifications in orthopedics, neurology, sports, and geriatrics.',
    hiringTip: 'Physical therapy resumes should highlight your patient population, caseload volume, and outcome metrics. Hiring managers look for functional outcome improvements (FOTO scores, discharge status), units billed per day, and specialty certifications. Mention specific conditions you treat frequently and any specialized techniques (dry needling, manual therapy certifications).',
    commonMistakes: [
      'Not specifying practice setting (outpatient, inpatient, SNF, home health)',
      'Omitting productivity metrics and units billed',
      'Failing to list specialty certifications and continuing education',
      'Not mentioning specific patient populations and conditions treated',
      'Leaving out documentation systems and compliance experience'
    ],
    interviewQuestions: [
      { q: 'Describe your approach to a patient who isn\'t progressing as expected.', guidance: 'Discuss reassessment, treatment modification, interdisciplinary consultation, and patient motivation strategies.' },
      { q: 'How do you balance productivity requirements with quality patient care?', guidance: 'Show awareness of business realities while emphasizing patient-centered care and ethical practice.' },
      { q: 'What is your experience with outcome measurement tools?', guidance: 'Name specific tools (FOTO, OPTIMAL, condition-specific measures) and how you use data to guide treatment.' },
      { q: 'Describe a challenging patient interaction and how you handled it.', guidance: 'Show communication skills, empathy, and problem-solving when dealing with difficult personalities or situations.' },
      { q: 'How do you stay current with evidence-based practice in physical therapy?', guidance: 'Mention APTA membership, journal reading, continuing education, and how you implement research findings.' }
    ],
    atsKeywords: ['physical therapist', 'PT', 'DPT', 'manual therapy', 'therapeutic exercise', 'rehabilitation', 'orthopedic', 'neurological', 'gait training', 'functional outcomes']
  },
  {
    slug: 'physical-therapy-assistant',
    jobTitle: 'Physical Therapy Assistant',
    avgSalary: '$62,000',
    jobGrowth: '+24%',
    blsUrl: 'https://www.bls.gov/ooh/healthcare/physical-therapist-assistants-and-aides.htm',
    keySkills: ['Treatment Implementation', 'Therapeutic Exercise', 'Modality Application', 'Patient Education', 'Documentation', 'Progress Monitoring', 'Gait Training', 'Manual Techniques'],
    skillCategories: {
      'Treatment Skills': ['Therapeutic exercise instruction', 'Gait and balance training', 'Modality application (ultrasound, e-stim)', 'Transfer and mobility training'],
      'Clinical Support': ['Treatment plan implementation', 'Progress documentation', 'Patient status reporting', 'Equipment setup and maintenance'],
      'Patient Interaction': ['Exercise demonstration', 'Home exercise program instruction', 'Motivational support', 'Safety monitoring']
    },
    certifications: ['PTA License', 'Associate Degree in PTA', 'BLS Certification', 'State-specific requirements'],
    uniqueContext: 'PTAs work under the supervision of physical therapists to implement treatment plans and help patients regain movement and manage pain. The role requires strong technical skills combined with the ability to motivate patients through challenging exercises.',
    hiringTip: 'PTA resumes should emphasize your ability to implement treatment plans independently while maintaining communication with supervising PTs. Include your caseload capacity, patient populations, and any specialized techniques you\'re trained in. Mention your documentation efficiency and familiarity with productivity expectations.',
    commonMistakes: [
      'Not clarifying the supervision model you\'ve worked under',
      'Omitting specific modalities and techniques you\'re proficient in',
      'Failing to mention productivity metrics and caseload numbers',
      'Not specifying practice settings and patient populations',
      'Leaving out documentation systems experience'
    ],
    interviewQuestions: [
      { q: 'How do you handle a situation where a patient reports new symptoms during treatment?', guidance: 'Show understanding of scope of practice—document, modify treatment if needed, and communicate with supervising PT.' },
      { q: 'Describe your experience with different patient populations.', guidance: 'Mention specific populations (orthopedic, neurological, geriatric) and your comfort level with each.' },
      { q: 'How do you motivate patients who are frustrated with their progress?', guidance: 'Discuss communication strategies, celebrating small wins, and adjusting difficulty appropriately.' },
      { q: 'What modalities are you most experienced with?', guidance: 'Be specific about ultrasound, e-stim, heat/cold, mechanical traction, and your competency level.' },
      { q: 'How do you ensure accurate documentation while maintaining productivity?', guidance: 'Discuss efficiency strategies, real-time documentation, and balancing quality with volume.' }
    ],
    atsKeywords: ['physical therapy assistant', 'PTA', 'therapeutic exercise', 'modalities', 'rehabilitation', 'gait training', 'treatment implementation', 'patient care', 'documentation']
  },
  {
    slug: 'occupational-therapist',
    jobTitle: 'Occupational Therapist',
    avgSalary: '$93,000',
    jobGrowth: '+12%',
    blsUrl: 'https://www.bls.gov/ooh/healthcare/occupational-therapists.htm',
    keySkills: ['ADL Training', 'Cognitive Rehabilitation', 'Adaptive Equipment', 'Splinting', 'Sensory Integration', 'Patient Assessment', 'Treatment Planning', 'Home Modifications'],
    skillCategories: {
      'Clinical Interventions': ['Activities of daily living training', 'Cognitive rehabilitation', 'Sensory integration therapy', 'Splinting and orthotics'],
      'Assessment': ['Functional capacity evaluation', 'Cognitive assessment', 'Home safety assessment', 'Adaptive equipment needs'],
      'Specializations': ['Hand therapy', 'Pediatric development', 'Mental health', 'Geriatric rehabilitation']
    },
    certifications: ['OT License', 'NBCOT Certification', 'MOT/OTD Degree', 'Hand Therapy Certification (CHT)', 'Sensory Integration Certification'],
    uniqueContext: 'Occupational therapists help patients perform daily activities and adapt to disabilities affecting their independence. The field uniquely focuses on meaningful activities—from self-care to work tasks—making OT essential in rehabilitation settings.',
    hiringTip: 'OT resumes should highlight your specialty area (hand therapy, pediatrics, mental health, geriatrics) and specific populations served. Include functional outcome improvements, discharge to home rates, and adaptive equipment expertise. Mention any specialized certifications like CHT or sensory integration training.',
    commonMistakes: [
      'Not specifying your practice area (acute, rehab, outpatient, schools, mental health)',
      'Omitting NBCOT certification and state license details',
      'Failing to include functional outcome metrics and patient progress data',
      'Not mentioning adaptive equipment and assistive technology experience',
      'Leaving out specialty certifications and continuing education'
    ],
    interviewQuestions: [
      { q: 'Describe your approach to a patient with multiple functional limitations.', guidance: 'Discuss prioritization, client-centered goal setting, and how you address the most meaningful activities first.' },
      { q: 'How do you incorporate adaptive equipment into treatment plans?', guidance: 'Show knowledge of equipment options, training patients, and advocating for insurance coverage.' },
      { q: 'Describe your experience with cognitive rehabilitation.', guidance: 'Discuss specific approaches, assessment tools, and populations (stroke, TBI, dementia).' },
      { q: 'How do you collaborate with the interdisciplinary team?', guidance: 'Give examples of working with PT, SLP, nursing, and physicians on patient goals.' },
      { q: 'What is your experience with home safety assessments and modifications?', guidance: 'Discuss evaluation process, recommendation development, and follow-through on modifications.' }
    ],
    atsKeywords: ['occupational therapist', 'OT', 'OTR', 'ADL', 'activities of daily living', 'rehabilitation', 'cognitive', 'adaptive equipment', 'NBCOT', 'functional outcomes']
  },
  {
    slug: 'occupational-therapy-assistant',
    jobTitle: 'Occupational Therapy Assistant',
    avgSalary: '$64,000',
    jobGrowth: '+23%',
    blsUrl: 'https://www.bls.gov/ooh/healthcare/occupational-therapy-assistants-and-aides.htm',
    keySkills: ['ADL Training', 'Treatment Implementation', 'Documentation', 'Exercise Programs', 'Adaptive Equipment', 'Patient Education', 'Progress Monitoring', 'Activity Analysis'],
    skillCategories: {
      'Treatment Implementation': ['ADL training', 'Therapeutic activities', 'Exercise programs', 'Splint care'],
      'Patient Support': ['Adaptive equipment training', 'Home exercise instruction', 'Progress monitoring', 'Family education'],
      'Documentation': ['Treatment notes', 'Progress reporting', 'Goal tracking', 'Discharge summaries']
    },
    certifications: ['COTA License', 'NBCOT Certification', 'Associate Degree', 'BLS Certification'],
    uniqueContext: 'COTAs implement occupational therapy treatment plans under OT supervision, helping patients regain independence in daily activities. The role combines hands-on therapy skills with patient motivation and education.',
    hiringTip: 'COTA resumes should demonstrate your ability to implement treatment plans effectively and communicate with supervising OTs. Include your experience with specific patient populations, productivity metrics, and any specialty areas. Mention your comfort level with different supervision models.',
    commonMistakes: [
      'Not specifying NBCOT certification and COTA licensure',
      'Omitting the practice settings and patient populations served',
      'Failing to mention productivity expectations met',
      'Not including specific therapeutic activities and techniques',
      'Leaving out documentation systems and efficiency'
    ],
    interviewQuestions: [
      { q: 'How do you handle a patient who wants to change their treatment goals?', guidance: 'Show understanding of scope—discuss with patient, document, and communicate with supervising OT.' },
      { q: 'Describe your experience with ADL training.', guidance: 'Give specific examples of techniques, adaptive equipment used, and patient outcomes.' },
      { q: 'How do you maintain communication with your supervising OT?', guidance: 'Discuss documentation, verbal updates, and when to escalate concerns.' },
      { q: 'What therapeutic activities do you find most effective?', guidance: 'Discuss various activities and how you match them to patient goals and interests.' },
      { q: 'How do you educate families on continuing therapy at home?', guidance: 'Describe your approach to home programs, demonstrations, and written instructions.' }
    ],
    atsKeywords: ['occupational therapy assistant', 'COTA', 'OTA', 'ADL', 'rehabilitation', 'therapeutic activities', 'NBCOT', 'treatment implementation', 'documentation']
  },
  {
    slug: 'speech-language-pathologist',
    jobTitle: 'Speech-Language Pathologist',
    avgSalary: '$84,000',
    jobGrowth: '+19%',
    blsUrl: 'https://www.bls.gov/ooh/healthcare/speech-language-pathologists.htm',
    keySkills: ['Speech Therapy', 'Swallowing Assessment', 'Language Intervention', 'Cognitive Therapy', 'AAC Devices', 'Pediatric Development', 'Dysphagia Management', 'Aphasia Treatment'],
    skillCategories: {
      'Assessment': ['Speech and language evaluation', 'Swallowing studies (MBS, FEES)', 'Cognitive-communication assessment', 'Voice evaluation'],
      'Treatment': ['Articulation therapy', 'Language intervention', 'Dysphagia treatment', 'Voice therapy'],
      'Specializations': ['Pediatric speech-language', 'Adult neurogenic disorders', 'Fluency disorders', 'AAC implementation']
    },
    certifications: ['CCC-SLP (ASHA Certification)', 'State Licensure', 'BLS Certification', 'FEES/MBS Certification', 'LSVT Certification'],
    uniqueContext: 'SLPs address the full spectrum of communication and swallowing disorders, from children with articulation issues to adults recovering from stroke. The field requires both technical assessment skills and the creativity to engage patients in therapy.',
    hiringTip: 'SLP resumes should clearly state your CCC-SLP status and specialty areas (pediatric, adult neuro, dysphagia, voice). Include your caseload size, productivity metrics, and outcome data. For medical settings, emphasize MBS/FEES experience and dysphagia management. For schools, highlight IEP experience and collaboration skills.',
    commonMistakes: [
      'Not prominently displaying CCC-SLP certification',
      'Omitting specialty areas and population focus',
      'Failing to include instrumental assessment experience (MBS, FEES)',
      'Not mentioning caseload size and productivity metrics',
      'Leaving out AAC and technology experience'
    ],
    interviewQuestions: [
      { q: 'Describe your experience with dysphagia assessment and treatment.', guidance: 'Discuss clinical bedside evaluation, instrumental assessments, diet modifications, and therapy techniques.' },
      { q: 'How do you approach a pediatric patient who is resistant to therapy?', guidance: 'Describe engagement strategies, play-based approaches, and parent involvement.' },
      { q: 'What is your experience with AAC devices and implementation?', guidance: 'Discuss device selection, training patients and families, and integrating AAC into daily communication.' },
      { q: 'How do you collaborate with the medical team on swallowing safety?', guidance: 'Describe communication with physicians, nursing, and dietary staff regarding diet modifications.' },
      { q: 'Describe a challenging case and how you developed the treatment plan.', guidance: 'Show clinical reasoning, evidence-based approach, and outcome measurement.' }
    ],
    atsKeywords: ['speech-language pathologist', 'SLP', 'CCC-SLP', 'dysphagia', 'aphasia', 'articulation', 'language', 'swallowing', 'AAC', 'cognitive-communication']
  },
  {
    slug: 'radiologic-technologist',
    jobTitle: 'Radiologic Technologist',
    avgSalary: '$68,000',
    jobGrowth: '+6%',
    blsUrl: 'https://www.bls.gov/ooh/healthcare/radiologic-technologists.htm',
    keySkills: ['X-Ray Imaging', 'Patient Positioning', 'Radiation Safety', 'Image Quality', 'PACS Systems', 'Patient Care', 'Equipment Operation', 'Anatomy Knowledge'],
    skillCategories: {
      'Technical Skills': ['Radiographic positioning', 'Exposure technique selection', 'Image processing', 'Equipment calibration'],
      'Patient Care': ['Patient positioning assistance', 'Contrast administration', 'Patient education', 'Emergency response'],
      'Safety & Compliance': ['Radiation protection', 'ALARA principles', 'Infection control', 'Regulatory compliance']
    },
    certifications: ['ARRT Certification', 'State Licensure', 'BLS Certification', 'Specialty Certifications (CT, MRI, Mammography)'],
    uniqueContext: 'Radiologic technologists combine technical precision with patient care, producing diagnostic images while ensuring patient safety and comfort. The role requires attention to detail, knowledge of anatomy, and the ability to work with patients of all ages and conditions.',
    hiringTip: 'Rad tech resumes should highlight your ARRT registration, modality experience, and patient volume. Include your repeat rate (lower is better), contrast reaction response training, and any specialty certifications. Mention specific equipment manufacturers you\'ve worked with (GE, Siemens, Philips).',
    commonMistakes: [
      'Not listing ARRT registration number and expiration',
      'Omitting specific modalities and equipment experience',
      'Failing to mention patient volume and repeat rates',
      'Not including PACS systems experience',
      'Leaving out contrast administration training and competency'
    ],
    interviewQuestions: [
      { q: 'How do you ensure consistent image quality while maintaining patient throughput?', guidance: 'Discuss technique selection, positioning accuracy, and quality control processes.' },
      { q: 'Describe your approach to a patient who is anxious about their procedure.', guidance: 'Show communication skills, explanation of process, and techniques to reduce anxiety.' },
      { q: 'What would you do if you noticed a potential critical finding on an image?', guidance: 'Demonstrate understanding of communication protocols and urgency in notifying radiologists.' },
      { q: 'How do you maintain radiation safety for yourself and patients?', guidance: 'Discuss ALARA principles, shielding, technique optimization, and personal dosimetry.' },
      { q: 'Describe your experience with portable/mobile radiography.', guidance: 'Discuss challenges of positioning, equipment, and working in various environments.' }
    ],
    atsKeywords: ['radiologic technologist', 'rad tech', 'ARRT', 'X-ray', 'radiography', 'imaging', 'PACS', 'radiation safety', 'positioning', 'diagnostic imaging']
  },
  {
    slug: 'respiratory-therapist',
    jobTitle: 'Respiratory Therapist',
    avgSalary: '$70,000',
    jobGrowth: '+13%',
    blsUrl: 'https://www.bls.gov/ooh/healthcare/respiratory-therapists.htm',
    keySkills: ['Ventilator Management', 'Oxygen Therapy', 'Airway Management', 'ABG Analysis', 'Pulmonary Function Testing', 'Patient Assessment', 'Emergency Response', 'CPAP/BiPAP'],
    skillCategories: {
      'Critical Care': ['Mechanical ventilation', 'Airway management', 'Hemodynamic monitoring', 'Code team response'],
      'Diagnostics': ['ABG interpretation', 'Pulmonary function testing', 'Sleep studies', 'Bronchoscopy assistance'],
      'Patient Care': ['Oxygen therapy', 'Nebulizer treatments', 'Chest physiotherapy', 'Patient education']
    },
    certifications: ['RRT Credential', 'State Licensure', 'BLS/ACLS/PALS', 'NPS (Neonatal/Pediatric Specialty)', 'ACCS (Adult Critical Care Specialty)'],
    uniqueContext: 'Respiratory therapists are essential in critical care, managing ventilators and responding to respiratory emergencies. The role requires quick thinking, technical expertise, and the ability to work under pressure in life-threatening situations.',
    hiringTip: 'RT resumes should emphasize your RRT credential, ICU experience, and ventilator management skills. Include specific vent modes you\'re comfortable with, code team participation, and any specialty certifications (neonatal, adult critical care). Mention ABG interpretation proficiency and patient volume.',
    commonMistakes: [
      'Not prominently displaying RRT credential',
      'Omitting specific ventilator modes and equipment experience',
      'Failing to mention critical care and emergency response experience',
      'Not including specialty certifications (NPS, ACCS)',
      'Leaving out ABG volume and interpretation accuracy'
    ],
    interviewQuestions: [
      { q: 'Describe your experience managing patients on mechanical ventilation.', guidance: 'Discuss vent modes, weaning protocols, and troubleshooting common issues.' },
      { q: 'How do you respond to a rapid response or code situation?', guidance: 'Walk through your role, airway management approach, and team communication.' },
      { q: 'What is your experience with neonatal respiratory care?', guidance: 'Discuss NICU experience, equipment differences, and challenges of tiny patients.' },
      { q: 'How do you interpret ABG results and make treatment recommendations?', guidance: 'Demonstrate systematic interpretation and clinical decision-making.' },
      { q: 'Describe a challenging patient situation and how you handled it.', guidance: 'Show problem-solving, communication with the team, and patient advocacy.' }
    ],
    atsKeywords: ['respiratory therapist', 'RRT', 'CRT', 'ventilator', 'mechanical ventilation', 'ABG', 'oxygen therapy', 'airway management', 'critical care', 'pulmonary']
  },
  {
    slug: 'paramedic',
    jobTitle: 'Paramedic',
    avgSalary: '$51,000',
    jobGrowth: '+5%',
    blsUrl: 'https://www.bls.gov/ooh/healthcare/emts-and-paramedics.htm',
    keySkills: ['Advanced Life Support', 'Emergency Assessment', 'IV/IO Access', 'Medication Administration', 'Cardiac Monitoring', 'Airway Management', 'Trauma Care', 'Patient Transport'],
    skillCategories: {
      'Emergency Care': ['Advanced cardiac life support', 'Trauma assessment and treatment', 'Airway management', 'IV/IO access'],
      'Assessment Skills': ['12-lead ECG interpretation', 'Patient assessment', 'Scene safety evaluation', 'Triage'],
      'Operational': ['Ambulance operation', 'Equipment maintenance', 'Documentation', 'Radio communication']
    },
    certifications: ['National Registry Paramedic (NRP)', 'State Paramedic License', 'ACLS/PALS/ITLS', 'Driver\'s License with Emergency Vehicle Endorsement'],
    uniqueContext: 'Paramedics provide advanced emergency medical care in unpredictable environments, from accident scenes to patients\' homes. The role demands quick decision-making, physical stamina, and the ability to stay calm under extreme pressure.',
    hiringTip: 'Paramedic resumes should highlight your NRP certification, call volume, and types of emergencies handled. Include specific protocols you\'re trained on, IV success rates, and any specializations (flight, critical care, tactical). Mention your response times and patient outcome data if available.',
    commonMistakes: [
      'Not listing NRP certification and state license clearly',
      'Omitting call volume and types of emergencies responded to',
      'Failing to mention specialized certifications (FP-C, CCP-C)',
      'Not including driving record and ambulance operation experience',
      'Leaving out continuing education and protocol training'
    ],
    interviewQuestions: [
      { q: 'Describe a high-acuity call and your decision-making process.', guidance: 'Walk through assessment, treatment, and transport decisions. Show clinical reasoning.' },
      { q: 'How do you handle a combative or uncooperative patient?', guidance: 'Discuss de-escalation, safety, restraint protocols, and when to involve law enforcement.' },
      { q: 'What is your experience with pediatric emergencies?', guidance: 'Discuss specific calls, equipment differences, and emotional challenges of treating children.' },
      { q: 'How do you maintain composure during mass casualty incidents?', guidance: 'Describe MCI experience, triage process, and managing chaos.' },
      { q: 'Describe your partnership approach with your EMT/medic partner.', guidance: 'Discuss communication, role division, and building trust with partners.' }
    ],
    atsKeywords: ['paramedic', 'NRP', 'EMT-P', 'advanced life support', 'ALS', 'emergency medical services', 'EMS', 'ACLS', 'trauma', 'pre-hospital']
  },
  {
    slug: 'emt',
    jobTitle: 'EMT',
    avgSalary: '$38,000',
    jobGrowth: '+5%',
    blsUrl: 'https://www.bls.gov/ooh/healthcare/emts-and-paramedics.htm',
    keySkills: ['Basic Life Support', 'Patient Assessment', 'CPR', 'Splinting', 'Bleeding Control', 'Oxygen Administration', 'Patient Transport', 'Medical Equipment'],
    skillCategories: {
      'Emergency Care': ['CPR and AED operation', 'Bleeding control', 'Fracture immobilization', 'Oxygen administration'],
      'Patient Care': ['Patient assessment', 'Vital signs monitoring', 'Patient lifting and moving', 'Comfort care'],
      'Operational': ['Ambulance driving', 'Equipment checks', 'Scene safety', 'Documentation']
    },
    certifications: ['NREMT Certification', 'State EMT License', 'BLS Provider', 'Driver\'s License', 'EVOC (Emergency Vehicle Operator Course)'],
    uniqueContext: 'EMTs are the first medical responders to emergencies, providing basic life support and transport. The role requires physical fitness, quick assessment skills, and the ability to remain calm while managing patients in crisis situations.',
    hiringTip: 'EMT resumes should emphasize NREMT certification, call volume, and types of calls responded to. Include your partner/team experience, driving record, and any additional certifications. Show your reliability and willingness to work varied shifts.',
    commonMistakes: [
      'Not clearly listing NREMT certification and state license',
      'Omitting call volume and shift experience',
      'Failing to mention driving record and EVOC training',
      'Not including physical fitness and lifting capabilities',
      'Leaving out CPR save rates or notable calls'
    ],
    interviewQuestions: [
      { q: 'Describe your patient assessment approach on a medical call.', guidance: 'Walk through your systematic assessment process from scene safety to transport decision.' },
      { q: 'How do you handle a patient in cardiac arrest?', guidance: 'Describe CPR quality, AED use, and coordination with paramedics/hospital.' },
      { q: 'What would you do if you arrived at a scene that was not safe?', guidance: 'Demonstrate understanding of scene safety and when to wait for police.' },
      { q: 'How do you work effectively with your paramedic partner?', guidance: 'Discuss communication, anticipating needs, and supporting advanced interventions.' },
      { q: 'Describe a challenging patient interaction and how you handled it.', guidance: 'Show communication skills, empathy, and professionalism under stress.' }
    ],
    atsKeywords: ['EMT', 'emergency medical technician', 'NREMT', 'basic life support', 'BLS', 'ambulance', 'emergency services', 'patient care', 'CPR', 'first responder']
  },
  {
    slug: 'phlebotomist',
    jobTitle: 'Phlebotomist',
    avgSalary: '$40,000',
    jobGrowth: '+10%',
    blsUrl: 'https://www.bls.gov/ooh/healthcare/phlebotomists.htm',
    keySkills: ['Venipuncture', 'Specimen Collection', 'Patient Identification', 'Specimen Processing', 'Infection Control', 'Patient Care', 'Documentation', 'Order Verification'],
    skillCategories: {
      'Technical Skills': ['Venipuncture technique', 'Capillary collection', 'Arterial puncture', 'Specimen processing'],
      'Quality & Safety': ['Patient identification verification', 'Specimen labeling accuracy', 'Infection control', 'HIPAA compliance'],
      'Patient Interaction': ['Difficult vein management', 'Pediatric techniques', 'Patient anxiety management', 'Communication']
    },
    certifications: ['CPT Certification (ASCP)', 'State Phlebotomy Certification', 'BLS Certification'],
    uniqueContext: 'Phlebotomists perform a high volume of blood draws daily, requiring consistent technique and the ability to work with anxious patients. Success depends on first-stick accuracy, efficiency, and maintaining quality standards across hundreds of daily specimens.',
    hiringTip: 'Phlebotomy resumes should highlight your daily draw volume, first-stick success rate, and experience with difficult populations (pediatric, elderly, oncology). Include your certification, specimen processing experience, and any specialty areas like arterial draws or therapeutic phlebotomy.',
    commonMistakes: [
      'Not listing phlebotomy certification prominently',
      'Omitting daily draw volume and first-stick success rate',
      'Failing to mention patient populations (pediatric, geriatric, oncology)',
      'Not including LIS systems experience',
      'Leaving out specimen processing and handling experience'
    ],
    interviewQuestions: [
      { q: 'Describe your approach to a patient with difficult veins.', guidance: 'Discuss techniques like warming, positioning, alternative sites, and when to ask for help.' },
      { q: 'How do you verify patient identity before drawing blood?', guidance: 'Explain the two-identifier process and what to do if there are discrepancies.' },
      { q: 'What would you do if a patient faints during a blood draw?', guidance: 'Describe your response, positioning, and when to call for additional help.' },
      { q: 'How do you handle a pediatric patient who is afraid of needles?', guidance: 'Discuss distraction techniques, parent involvement, and making the experience less traumatic.' },
      { q: 'Describe your experience with different collection tubes and their order of draw.', guidance: 'Demonstrate knowledge of tube types, additives, and proper order to prevent contamination.' }
    ],
    atsKeywords: ['phlebotomist', 'phlebotomy', 'venipuncture', 'blood draw', 'specimen collection', 'ASCP', 'CPT', 'laboratory', 'patient care', 'blood specimens']
  },
  {
    slug: 'medical-technologist',
    jobTitle: 'Medical Technologist',
    avgSalary: '$60,000',
    jobGrowth: '+7%',
    blsUrl: 'https://www.bls.gov/ooh/healthcare/clinical-laboratory-technologists-and-technicians.htm',
    keySkills: ['Laboratory Testing', 'Quality Control', 'Specimen Analysis', 'Instrumentation', 'Microbiology', 'Hematology', 'Chemistry', 'Blood Bank'],
    skillCategories: {
      'Technical Testing': ['Hematology analysis', 'Clinical chemistry', 'Microbiology cultures', 'Blood bank procedures'],
      'Quality Assurance': ['QC procedures', 'Calibration', 'Troubleshooting', 'Result validation'],
      'Laboratory Operations': ['LIS systems', 'Specimen processing', 'Inventory management', 'Safety compliance']
    },
    certifications: ['ASCP Certification (MLS/MT)', 'State Licensure', 'Specialty Certifications (BB, M, C, H)'],
    uniqueContext: 'Medical technologists analyze blood and body fluids to help physicians diagnose disease. The role requires precision, attention to detail, and the ability to work independently while maintaining quality standards across high-volume testing.',
    hiringTip: 'Med tech resumes should highlight your ASCP certification, specialty areas, and instrumentation experience. Include your QC competency, critical value handling, and any supervisory experience. Mention specific analyzers and LIS systems you\'ve used.',
    commonMistakes: [
      'Not prominently displaying ASCP certification and specialty',
      'Omitting specific instrumentation and analyzer experience',
      'Failing to mention quality control responsibilities',
      'Not including specimen volume and turnaround times',
      'Leaving out critical value notification experience'
    ],
    interviewQuestions: [
      { q: 'How do you handle a critical value result?', guidance: 'Describe verification, documentation, notification process, and follow-up.' },
      { q: 'Describe your troubleshooting approach when QC is out of range.', guidance: 'Walk through systematic troubleshooting, documentation, and escalation.' },
      { q: 'What is your experience in blood bank?', guidance: 'Discuss type and screens, crossmatching, antibody identification, and transfusion reactions.' },
      { q: 'How do you maintain accuracy during high-volume periods?', guidance: 'Discuss prioritization, quality focus, and managing workload stress.' },
      { q: 'Describe your experience with laboratory information systems.', guidance: 'Name specific LIS systems and your proficiency with result entry and verification.' }
    ],
    atsKeywords: ['medical technologist', 'MT', 'MLS', 'ASCP', 'clinical laboratory', 'hematology', 'chemistry', 'microbiology', 'blood bank', 'laboratory testing']
  },
  {
    slug: 'x-ray-technician',
    jobTitle: 'X-Ray Technician',
    avgSalary: '$62,000',
    jobGrowth: '+6%',
    blsUrl: 'https://www.bls.gov/ooh/healthcare/radiologic-technologists.htm',
    keySkills: ['X-Ray Imaging', 'Patient Positioning', 'Radiation Safety', 'Digital Imaging', 'Patient Care', 'Equipment Operation', 'Image Processing', 'Anatomy'],
    skillCategories: {
      'Imaging Skills': ['Radiographic positioning', 'Technique selection', 'Digital image processing', 'Portable radiography'],
      'Patient Care': ['Patient preparation', 'Positioning assistance', 'Communication', 'Anxiety reduction'],
      'Technical Operations': ['Equipment operation', 'Quality control', 'Image archiving', 'Maintenance coordination']
    },
    certifications: ['ARRT Certification (R)', 'State Licensure', 'BLS Certification'],
    uniqueContext: 'X-ray technicians produce diagnostic images using ionizing radiation, requiring careful attention to patient safety and image quality. The role involves working with diverse patient populations and adapting techniques for various body types and conditions.',
    hiringTip: 'X-ray tech resumes should emphasize ARRT registration, image quality metrics (repeat rates), and patient volume. Include equipment experience, portable radiography skills, and any additional modality training. Mention your radiation safety compliance record.',
    commonMistakes: [
      'Not listing ARRT registration clearly',
      'Omitting repeat rate and quality metrics',
      'Failing to mention specific equipment manufacturers',
      'Not including portable/mobile radiography experience',
      'Leaving out trauma and emergency room experience'
    ],
    interviewQuestions: [
      { q: 'How do you ensure consistent image quality across different patient body types?', guidance: 'Discuss technique adjustment, positioning modifications, and quality verification.' },
      { q: 'Describe your approach to a pediatric patient.', guidance: 'Discuss immobilization, distraction, parent involvement, and dose reduction.' },
      { q: 'What steps do you take when a patient cannot be positioned optimally?', guidance: 'Show problem-solving for trauma, mobility limitations, and adaptive positioning.' },
      { q: 'How do you verify the correct exam is being performed on the correct patient?', guidance: 'Explain patient identification protocols and order verification.' },
      { q: 'Describe your experience with portable radiography.', guidance: 'Discuss equipment, challenges in various locations, and maintaining quality.' }
    ],
    atsKeywords: ['X-ray technician', 'radiologic technologist', 'ARRT', 'radiography', 'diagnostic imaging', 'X-ray', 'positioning', 'radiation safety', 'digital imaging']
  },
  {
    slug: 'ultrasound-technician',
    jobTitle: 'Ultrasound Technician',
    avgSalary: '$78,000',
    jobGrowth: '+10%',
    blsUrl: 'https://www.bls.gov/ooh/healthcare/diagnostic-medical-sonographers.htm',
    keySkills: ['Sonography', 'Image Acquisition', 'Patient Assessment', 'Anatomy Knowledge', 'Equipment Operation', 'OB/GYN Imaging', 'Abdominal Imaging', 'Vascular Studies'],
    skillCategories: {
      'Imaging Expertise': ['Abdominal sonography', 'OB/GYN imaging', 'Vascular studies', 'Echocardiography'],
      'Technical Skills': ['Image optimization', 'Doppler techniques', 'Measurement protocols', 'Equipment maintenance'],
      'Clinical': ['Patient assessment', 'Preliminary interpretation', 'Physician communication', 'Documentation']
    },
    certifications: ['RDMS Certification (ARDMS)', 'RVT Certification', 'State Licensure', 'BLS Certification'],
    uniqueContext: 'Ultrasound technicians create real-time images using sound waves, requiring skilled hand-eye coordination and anatomical knowledge. The role involves making preliminary assessments and communicating findings to radiologists while maintaining patient comfort.',
    hiringTip: 'Sonographer resumes should highlight ARDMS credentials, specialty areas (abdomen, OB/GYN, vascular, cardiac), and scan volume. Include your preliminary interpretation skills, equipment experience, and any additional certifications. Mention specific pathologies you\'re experienced in identifying.',
    commonMistakes: [
      'Not listing ARDMS credentials and specialty certifications',
      'Omitting scan volume and productivity metrics',
      'Failing to mention specific specialty areas',
      'Not including equipment manufacturers and models',
      'Leaving out preliminary findings and pathology experience'
    ],
    interviewQuestions: [
      { q: 'Describe your approach to a technically difficult scan.', guidance: 'Discuss positioning adjustments, patient preparation, and alternative windows.' },
      { q: 'How do you handle an incidental finding during a routine scan?', guidance: 'Explain documentation, communication with radiologist, and patient interaction.' },
      { q: 'What is your experience with OB/GYN ultrasound?', guidance: 'Discuss gestational dating, anatomy surveys, and high-risk pregnancy experience.' },
      { q: 'How do you maintain image quality consistency?', guidance: 'Describe optimization techniques, protocols, and quality assurance.' },
      { q: 'Describe a case where you identified significant pathology.', guidance: 'Walk through the findings, documentation, and communication process.' }
    ],
    atsKeywords: ['ultrasound technician', 'sonographer', 'RDMS', 'diagnostic medical sonographer', 'ultrasound', 'sonography', 'OB/GYN', 'vascular', 'abdominal', 'imaging']
  },
  {
    slug: 'mri-technologist',
    jobTitle: 'MRI Technologist',
    avgSalary: '$78,000',
    jobGrowth: '+6%',
    blsUrl: 'https://www.bls.gov/ooh/healthcare/radiologic-technologists.htm',
    keySkills: ['MRI Imaging', 'Patient Screening', 'Contrast Administration', 'Coil Selection', 'Image Optimization', 'Safety Protocols', 'Anatomy Knowledge', 'PACS'],
    skillCategories: {
      'MRI Expertise': ['Pulse sequence selection', 'Coil positioning', 'Image optimization', 'Artifact recognition'],
      'Safety': ['MRI safety screening', 'Ferromagnetic object detection', 'Contrast safety', 'Emergency procedures'],
      'Patient Care': ['Claustrophobia management', 'Patient positioning', 'IV contrast administration', 'Communication']
    },
    certifications: ['ARRT MR Certification', 'State Licensure', 'BLS/ACLS', 'MRI Safety Training'],
    uniqueContext: 'MRI technologists operate complex imaging equipment that uses powerful magnets, requiring strict adherence to safety protocols. The role demands technical expertise in optimizing images while managing patients who may be claustrophobic or anxious in the confined scanner.',
    hiringTip: 'MRI tech resumes should highlight ARRT MR certification, scanner experience (1.5T, 3T), and exam volume. Include your safety screening proficiency, protocol optimization experience, and body part specializations. Mention contrast administration competency and any cardiac or neuro MRI experience.',
    commonMistakes: [
      'Not listing ARRT MR certification prominently',
      'Omitting specific scanner models and field strengths',
      'Failing to mention safety screening experience',
      'Not including specialized protocols (cardiac, neuro, MSK)',
      'Leaving out contrast administration competency'
    ],
    interviewQuestions: [
      { q: 'How do you screen patients for MRI safety?', guidance: 'Walk through the screening process, implant identification, and ferromagnetic object detection.' },
      { q: 'Describe your approach to a claustrophobic patient.', guidance: 'Discuss communication, positioning, sedation coordination, and feet-first techniques.' },
      { q: 'How do you optimize images when you encounter artifacts?', guidance: 'Explain artifact identification and parameter adjustments to resolve issues.' },
      { q: 'What is your experience with contrast administration?', guidance: 'Discuss IV access, contrast protocols, and reaction management.' },
      { q: 'Describe your experience with specialized MRI protocols.', guidance: 'Mention cardiac, neuro, breast, MSK, or other specialized experience.' }
    ],
    atsKeywords: ['MRI technologist', 'magnetic resonance imaging', 'ARRT MR', 'MRI', 'imaging', 'radiology', 'coils', 'pulse sequences', 'contrast', 'safety screening']
  },
  {
    slug: 'dialysis-technician',
    jobTitle: 'Dialysis Technician',
    avgSalary: '$45,000',
    jobGrowth: '+8%',
    blsUrl: 'https://www.bls.gov/ooh/healthcare/home-health-aides-and-personal-care-aides.htm',
    keySkills: ['Hemodialysis', 'Cannulation', 'Machine Operation', 'Patient Monitoring', 'Infection Control', 'Water Treatment', 'Emergency Response', 'Documentation'],
    skillCategories: {
      'Clinical Skills': ['Cannulation technique', 'Machine setup and operation', 'Vital signs monitoring', 'Intradialytic complications'],
      'Technical': ['Water treatment systems', 'Machine troubleshooting', 'Dialyzer reprocessing', 'Equipment maintenance'],
      'Patient Care': ['Patient education', 'Fluid management', 'Diet counseling', 'Emotional support']
    },
    certifications: ['CCHT Certification (BONENT/NNCC)', 'State Certification', 'BLS Certification', 'Water Treatment Certification'],
    uniqueContext: 'Dialysis technicians provide life-sustaining treatment to patients with kidney failure, requiring technical precision and the ability to build long-term relationships with chronic patients. The role demands vigilance in monitoring patients during treatment and responding quickly to complications.',
    hiringTip: 'Dialysis tech resumes should highlight CCHT certification, cannulation success rates, and patient chair volume. Include your experience with different machine types (Fresenius, Baxter/Gambro), complication management, and any peritoneal dialysis experience. Mention your water treatment knowledge.',
    commonMistakes: [
      'Not listing CCHT certification prominently',
      'Omitting cannulation success rates and techniques',
      'Failing to mention specific dialysis machine experience',
      'Not including patient volume and ratio',
      'Leaving out emergency response and complication management'
    ],
    interviewQuestions: [
      { q: 'Describe your cannulation technique and how you handle difficult access.', guidance: 'Discuss assessment, techniques for buttonhole vs. rope ladder, and when to ask for help.' },
      { q: 'How do you respond to a patient experiencing hypotension during treatment?', guidance: 'Walk through your assessment, interventions, and notification process.' },
      { q: 'What is your experience with peritoneal dialysis?', guidance: 'Discuss patient education, catheter care, and home dialysis support.' },
      { q: 'How do you build relationships with chronic dialysis patients?', guidance: 'Discuss communication, consistency, and supporting patients through difficult times.' },
      { q: 'Describe your water treatment knowledge and responsibilities.', guidance: 'Explain water quality testing, disinfection, and regulatory compliance.' }
    ],
    atsKeywords: ['dialysis technician', 'hemodialysis', 'CCHT', 'cannulation', 'nephrology', 'renal', 'dialysis', 'Fresenius', 'patient care', 'water treatment']
  },
  {
    slug: 'dental-hygienist',
    jobTitle: 'Dental Hygienist',
    avgSalary: '$82,000',
    jobGrowth: '+9%',
    blsUrl: 'https://www.bls.gov/ooh/healthcare/dental-hygienists.htm',
    keySkills: ['Teeth Cleaning', 'Periodontal Assessment', 'X-Rays', 'Patient Education', 'Scaling and Root Planing', 'Sealants', 'Fluoride Treatment', 'Infection Control'],
    skillCategories: {
      'Clinical Skills': ['Prophylaxis', 'Scaling and root planing', 'Periodontal charting', 'Local anesthesia administration'],
      'Preventive Care': ['Fluoride application', 'Sealant placement', 'Oral hygiene instruction', 'Nutritional counseling'],
      'Diagnostic': ['Dental radiography', 'Oral cancer screening', 'Periodontal assessment', 'Treatment planning support']
    },
    certifications: ['RDH License', 'State Dental Hygiene License', 'Local Anesthesia Certification', 'CPR/BLS'],
    uniqueContext: 'Dental hygienists provide preventive oral care and patient education, working closely with dentists to maintain patient oral health. The role requires clinical precision, patient communication skills, and the ability to work efficiently within appointment time constraints.',
    hiringTip: 'Hygienist resumes should highlight your RDH license, daily patient volume, and any expanded functions (local anesthesia, nitrous oxide). Include your periodontal therapy experience, production numbers if applicable, and patient retention rates. Mention specific software systems and digital radiography experience.',
    commonMistakes: [
      'Not listing RDH license and expanded function certifications',
      'Omitting daily patient volume and production metrics',
      'Failing to mention periodontal therapy experience',
      'Not including practice management software experience',
      'Leaving out patient education and retention success'
    ],
    interviewQuestions: [
      { q: 'Describe your approach to a patient with severe periodontal disease.', guidance: 'Discuss assessment, treatment planning, SRP technique, and maintenance schedule.' },
      { q: 'How do you handle a patient who is anxious about dental treatment?', guidance: 'Describe communication techniques, pacing, and creating a comfortable environment.' },
      { q: 'What is your experience with local anesthesia administration?', guidance: 'Discuss your training, techniques, and managing complications.' },
      { q: 'How do you stay productive while maintaining quality care?', guidance: 'Explain time management, efficiency techniques, and prioritization.' },
      { q: 'Describe your patient education approach.', guidance: 'Discuss customizing instructions, motivational techniques, and follow-up.' }
    ],
    atsKeywords: ['dental hygienist', 'RDH', 'oral hygiene', 'periodontal', 'scaling', 'prophylaxis', 'dental', 'teeth cleaning', 'fluoride', 'patient education']
  },
  {
    slug: 'chiropractor',
    jobTitle: 'Chiropractor',
    avgSalary: '$75,000',
    jobGrowth: '+10%',
    blsUrl: 'https://www.bls.gov/ooh/healthcare/chiropractors.htm',
    keySkills: ['Spinal Adjustment', 'Patient Assessment', 'Treatment Planning', 'X-Ray Interpretation', 'Soft Tissue Therapy', 'Patient Education', 'Documentation', 'Practice Management'],
    skillCategories: {
      'Clinical Skills': ['Spinal manipulation', 'Diversified technique', 'Activator method', 'Soft tissue mobilization'],
      'Assessment': ['Orthopedic examination', 'Neurological screening', 'X-ray interpretation', 'Posture analysis'],
      'Practice Management': ['Treatment planning', 'Patient retention', 'Insurance billing', 'Marketing']
    },
    certifications: ['Doctor of Chiropractic (DC)', 'State Chiropractic License', 'National Board Certification', 'Technique Certifications (Activator, Graston)'],
    uniqueContext: 'Chiropractors diagnose and treat musculoskeletal conditions, primarily through spinal adjustments. The role combines clinical expertise with business acumen, as many chiropractors own their practices and must balance patient care with practice management.',
    hiringTip: 'Chiropractic resumes should highlight your DC degree, state license, and technique specializations. Include patient volume, case types, and any specialty certifications (sports, pediatrics, rehabilitation). For associate positions, emphasize your adjusting technique proficiency and patient communication skills.',
    commonMistakes: [
      'Not listing DC degree and state license clearly',
      'Omitting technique certifications and specializations',
      'Failing to mention patient volume and case mix',
      'Not including practice management experience',
      'Leaving out continuing education and specialty training'
    ],
    interviewQuestions: [
      { q: 'Describe your examination process for a new patient with low back pain.', guidance: 'Walk through history, orthopedic tests, neurological screening, and imaging decisions.' },
      { q: 'What adjustment techniques are you most proficient in?', guidance: 'Discuss your primary techniques, when you use each, and continuing education.' },
      { q: 'How do you develop treatment plans and set patient expectations?', guidance: 'Explain your assessment, goal-setting, and communication approach.' },
      { q: 'Describe your experience with practice management and patient retention.', guidance: 'Discuss scheduling, recall systems, patient education, and building relationships.' },
      { q: 'How do you handle a patient who isn\'t responding to treatment as expected?', guidance: 'Discuss reassessment, technique modification, referral decisions, and communication.' }
    ],
    atsKeywords: ['chiropractor', 'DC', 'chiropractic', 'spinal adjustment', 'manipulation', 'musculoskeletal', 'back pain', 'neck pain', 'diversified technique', 'patient care']
  },
  {
    slug: 'massage-therapist',
    jobTitle: 'Massage Therapist',
    avgSalary: '$50,000',
    jobGrowth: '+18%',
    blsUrl: 'https://www.bls.gov/ooh/healthcare/massage-therapists.htm',
    keySkills: ['Swedish Massage', 'Deep Tissue', 'Sports Massage', 'Client Assessment', 'Treatment Planning', 'Body Mechanics', 'Anatomy Knowledge', 'Client Communication'],
    skillCategories: {
      'Massage Techniques': ['Swedish massage', 'Deep tissue massage', 'Sports massage', 'Trigger point therapy'],
      'Specialty Modalities': ['Hot stone massage', 'Prenatal massage', 'Myofascial release', 'Lymphatic drainage'],
      'Professional Skills': ['Client assessment', 'Treatment planning', 'SOAP documentation', 'Self-care and body mechanics']
    },
    certifications: ['State Massage License', 'NCBTMB Certification', 'CPR Certification', 'Specialty Certifications'],
    uniqueContext: 'Massage therapists provide therapeutic touch to relieve pain and promote wellness, requiring physical stamina and strong interpersonal skills. The role demands body mechanics awareness to prevent self-injury while building a loyal client base through excellent service.',
    hiringTip: 'Massage therapy resumes should highlight your license, modality training, and client retention rates. Include your specialty areas (sports, medical, relaxation), hourly capacity, and rebooking percentages. Mention any continuing education in advanced techniques.',
    commonMistakes: [
      'Not listing state license and NCBTMB certification',
      'Omitting specific modalities and techniques',
      'Failing to mention client retention and rebooking rates',
      'Not including hours available and schedule flexibility',
      'Leaving out continuing education and specialty training'
    ],
    interviewQuestions: [
      { q: 'What massage modalities are you most experienced in?', guidance: 'Discuss your training, continuing education, and client preferences.' },
      { q: 'How do you customize treatments for individual client needs?', guidance: 'Explain your assessment process, communication, and adaptability.' },
      { q: 'Describe your approach to body mechanics and self-care.', guidance: 'Discuss how you protect your body during massage and maintain longevity in the field.' },
      { q: 'How do you build and maintain a loyal client base?', guidance: 'Describe relationship building, rebooking strategies, and client communication.' },
      { q: 'What would you do if a client requested a service outside your scope of practice?', guidance: 'Show understanding of boundaries, referral options, and professional ethics.' }
    ],
    atsKeywords: ['massage therapist', 'LMT', 'licensed massage therapist', 'Swedish massage', 'deep tissue', 'sports massage', 'therapeutic massage', 'bodywork', 'NCBTMB', 'relaxation']
  },
  {
    slug: 'mental-health-counselor',
    jobTitle: 'Mental Health Counselor',
    avgSalary: '$53,000',
    jobGrowth: '+18%',
    blsUrl: 'https://www.bls.gov/ooh/community-and-social-service/mental-health-counselors-and-marriage-and-family-therapists.htm',
    keySkills: ['Individual Therapy', 'Assessment', 'Treatment Planning', 'Crisis Intervention', 'Group Therapy', 'Documentation', 'Diagnosis', 'Evidence-Based Practice'],
    skillCategories: {
      'Clinical Skills': ['Individual therapy', 'Group facilitation', 'Crisis intervention', 'Risk assessment'],
      'Assessment': ['Diagnostic evaluation', 'Treatment planning', 'Progress monitoring', 'Outcome measurement'],
      'Therapeutic Approaches': ['CBT', 'DBT', 'Motivational interviewing', 'Trauma-informed care']
    },
    certifications: ['LPC/LMHC License', 'Master\'s in Counseling', 'NCC Certification', 'Specialty Certifications (Trauma, Substance Abuse)'],
    uniqueContext: 'Mental health counselors provide therapy and support for individuals dealing with emotional, behavioral, and mental health challenges. The role requires clinical expertise, empathy, and the ability to build therapeutic relationships while maintaining professional boundaries.',
    hiringTip: 'Counselor resumes should highlight your license type, theoretical orientation, and populations served. Include caseload size, clinical hours completed, and any specialty certifications (trauma, substance abuse, child/adolescent). Mention specific evidence-based treatments you\'re trained in.',
    commonMistakes: [
      'Not clearly stating license type and status',
      'Omitting theoretical orientation and treatment approaches',
      'Failing to mention populations and specializations',
      'Not including clinical hours and supervision experience',
      'Leaving out crisis intervention and emergency response experience'
    ],
    interviewQuestions: [
      { q: 'Describe your theoretical orientation and how it guides your practice.', guidance: 'Explain your primary approach, how you integrate techniques, and evidence base.' },
      { q: 'How do you handle a client in crisis?', guidance: 'Walk through your risk assessment, safety planning, and escalation procedures.' },
      { q: 'Describe your experience with a specific population you\'ve worked with.', guidance: 'Discuss your training, approach adaptations, and outcomes.' },
      { q: 'How do you maintain boundaries while building therapeutic rapport?', guidance: 'Explain your approach to professional boundaries and self-disclosure.' },
      { q: 'What is your experience with treatment planning and documentation?', guidance: 'Discuss your process, EHR systems used, and ensuring compliance.' }
    ],
    atsKeywords: ['mental health counselor', 'LPC', 'LMHC', 'licensed counselor', 'therapy', 'psychotherapy', 'CBT', 'mental health', 'counseling', 'crisis intervention']
  },
  {
    slug: 'psychologist',
    jobTitle: 'Psychologist',
    avgSalary: '$90,000',
    jobGrowth: '+6%',
    blsUrl: 'https://www.bls.gov/ooh/life-physical-and-social-science/psychologists.htm',
    keySkills: ['Psychological Assessment', 'Psychotherapy', 'Research', 'Diagnosis', 'Treatment Planning', 'Consultation', 'Supervision', 'Report Writing'],
    skillCategories: {
      'Clinical Skills': ['Psychological testing', 'Psychotherapy', 'Diagnostic evaluation', 'Treatment planning'],
      'Assessment': ['Cognitive assessment', 'Personality assessment', 'Neuropsychological testing', 'Forensic evaluation'],
      'Professional': ['Clinical supervision', 'Consultation', 'Research', 'Report writing']
    },
    certifications: ['Psychology License', 'Doctoral Degree (PhD/PsyD)', 'Board Certification (ABPP)', 'Specialty Certifications'],
    uniqueContext: 'Psychologists assess, diagnose, and treat mental health conditions using evidence-based therapies and psychological testing. The role often involves complex diagnostic evaluations, specialized assessments, and providing supervision to other mental health professionals.',
    hiringTip: 'Psychology resumes should highlight your license, doctoral degree, and specialty area. Include assessment batteries you\'re proficient with, populations served, and any board certifications. Mention research publications, supervision experience, and specific therapeutic modalities.',
    commonMistakes: [
      'Not listing license and doctoral degree prominently',
      'Omitting assessment tools and testing experience',
      'Failing to mention specialty areas and populations',
      'Not including supervision and consultation experience',
      'Leaving out research, publications, and presentations'
    ],
    interviewQuestions: [
      { q: 'Describe your assessment approach for a complex diagnostic case.', guidance: 'Walk through your selection of measures, integration of data, and report writing.' },
      { q: 'What theoretical orientation guides your therapy practice?', guidance: 'Discuss your primary approach, integration, and evidence-based focus.' },
      { q: 'Describe your experience providing clinical supervision.', guidance: 'Explain your supervision model, feedback approach, and supporting trainee development.' },
      { q: 'How do you stay current with research in your specialty area?', guidance: 'Discuss journals, conferences, consultation, and implementing new findings.' },
      { q: 'Describe a challenging case and your treatment approach.', guidance: 'Show clinical reasoning, flexibility, and ethical decision-making.' }
    ],
    atsKeywords: ['psychologist', 'licensed psychologist', 'PhD', 'PsyD', 'psychological assessment', 'psychotherapy', 'cognitive testing', 'mental health', 'clinical psychology', 'neuropsychology']
  },
  {
    slug: 'psychiatrist',
    jobTitle: 'Psychiatrist',
    avgSalary: '$250,000',
    jobGrowth: '+7%',
    blsUrl: 'https://www.bls.gov/ooh/healthcare/physicians-and-surgeons.htm',
    keySkills: ['Psychiatric Evaluation', 'Psychopharmacology', 'Diagnosis', 'Treatment Planning', 'Psychotherapy', 'Consultation', 'Crisis Intervention', 'Leadership'],
    skillCategories: {
      'Clinical Skills': ['Comprehensive psychiatric evaluation', 'Medication management', 'Psychotherapy', 'ECT administration'],
      'Diagnostic': ['DSM-5 diagnosis', 'Medical workup', 'Differential diagnosis', 'Risk assessment'],
      'Professional': ['Consultation-liaison', 'Treatment team leadership', 'Expert testimony', 'Teaching']
    },
    certifications: ['Medical License', 'Board Certification (ABPN)', 'DEA Registration', 'State Controlled Substance License'],
    uniqueContext: 'Psychiatrists are physicians specializing in mental health, uniquely qualified to prescribe medications and provide comprehensive treatment. The role combines medical expertise with psychiatric skills, often serving as treatment team leaders for complex cases.',
    hiringTip: 'Psychiatrist resumes should highlight board certification, subspecialty training, and patient population focus. Include your medication management approach, therapy modalities offered, and leadership experience. Mention any academic appointments, research, and quality improvement initiatives.',
    commonMistakes: [
      'Not prominently displaying board certification and DEA registration',
      'Omitting subspecialty training and patient populations',
      'Failing to mention specific treatment approaches',
      'Not including leadership and administrative experience',
      'Leaving out research, publications, and teaching'
    ],
    interviewQuestions: [
      { q: 'Describe your approach to medication management for treatment-resistant depression.', guidance: 'Discuss evidence-based algorithms, augmentation strategies, and when to consider ECT.' },
      { q: 'How do you integrate psychotherapy into your practice?', guidance: 'Explain which modalities you use, when you provide therapy vs. refer, and time management.' },
      { q: 'Describe your experience in a consultation-liaison role.', guidance: 'Discuss common consults, medical-psychiatric interface, and team collaboration.' },
      { q: 'How do you manage a psychiatric emergency?', guidance: 'Walk through risk assessment, safety interventions, and disposition planning.' },
      { q: 'What quality improvement initiatives have you participated in?', guidance: 'Describe specific projects, outcomes, and your leadership role.' }
    ],
    atsKeywords: ['psychiatrist', 'MD', 'DO', 'psychiatry', 'psychopharmacology', 'mental health', 'medication management', 'psychiatric evaluation', 'board certified', 'ABPN']
  },
  {
    slug: 'therapist',
    jobTitle: 'Therapist',
    avgSalary: '$55,000',
    jobGrowth: '+18%',
    blsUrl: 'https://www.bls.gov/ooh/community-and-social-service/mental-health-counselors-and-marriage-and-family-therapists.htm',
    keySkills: ['Psychotherapy', 'Assessment', 'Treatment Planning', 'Crisis Intervention', 'Documentation', 'Diagnosis', 'Group Therapy', 'Family Systems'],
    skillCategories: {
      'Therapy Skills': ['Individual therapy', 'Couples therapy', 'Family therapy', 'Group facilitation'],
      'Clinical': ['Assessment and diagnosis', 'Treatment planning', 'Crisis intervention', 'Safety planning'],
      'Modalities': ['CBT', 'EMDR', 'DBT skills', 'Trauma-informed approaches']
    },
    certifications: ['LCSW/LMFT/LPC License', 'Master\'s Degree', 'Specialty Certifications (EMDR, Gottman)', 'NCC'],
    uniqueContext: 'Therapists provide mental health treatment across various settings and populations, using evidence-based approaches to help clients overcome challenges. The role requires strong clinical skills, empathy, and the ability to adapt therapeutic techniques to individual client needs.',
    hiringTip: 'Therapist resumes should emphasize your license type, clinical hours, and specialty areas. Include your therapeutic approaches, populations served, and outcome data if available. Mention any specialized training (EMDR, DBT, EFT) and your experience with specific presenting problems.',
    commonMistakes: [
      'Not clarifying license type and status',
      'Omitting therapeutic modalities and training',
      'Failing to specify populations and settings',
      'Not including caseload and productivity information',
      'Leaving out crisis experience and emergency response'
    ],
    interviewQuestions: [
      { q: 'Describe your therapeutic approach and how you engage resistant clients.', guidance: 'Explain your orientation, engagement strategies, and adapting to client needs.' },
      { q: 'How do you handle a client who discloses suicidal ideation?', guidance: 'Walk through risk assessment, safety planning, and escalation procedures.' },
      { q: 'What populations are you most experienced working with?', guidance: 'Discuss specific groups, adaptations made, and outcomes achieved.' },
      { q: 'Describe your documentation practices and EHR experience.', guidance: 'Explain your note-writing process, compliance focus, and systems used.' },
      { q: 'How do you approach treatment planning and goal-setting?', guidance: 'Discuss collaborative planning, SMART goals, and progress measurement.' }
    ],
    atsKeywords: ['therapist', 'LCSW', 'LMFT', 'LPC', 'psychotherapy', 'mental health', 'counseling', 'therapy', 'CBT', 'treatment planning']
  },
  {
    slug: 'health-coach',
    jobTitle: 'Health Coach',
    avgSalary: '$50,000',
    jobGrowth: '+16%',
    blsUrl: 'https://www.bls.gov/ooh/community-and-social-service/health-educators.htm',
    keySkills: ['Behavior Change', 'Goal Setting', 'Motivational Interviewing', 'Nutrition Guidance', 'Wellness Planning', 'Client Assessment', 'Program Development', 'Health Education'],
    skillCategories: {
      'Coaching Skills': ['Motivational interviewing', 'Goal setting', 'Accountability support', 'Behavior change techniques'],
      'Health Knowledge': ['Nutrition basics', 'Exercise principles', 'Stress management', 'Sleep hygiene'],
      'Program Skills': ['Wellness program development', 'Group facilitation', 'Progress tracking', 'Outcome measurement']
    },
    certifications: ['NBC-HWC Certification', 'ACE Health Coach', 'Wellcoaches Certification', 'CPR/First Aid'],
    uniqueContext: 'Health coaches support clients in making sustainable lifestyle changes, using motivational interviewing and behavior change science. The role bridges the gap between medical recommendations and implementation, helping clients translate health goals into daily habits.',
    hiringTip: 'Health coach resumes should highlight your certification, coaching methodology, and client outcomes. Include success metrics (weight loss, behavior change adherence), populations served, and any specialty areas (diabetes prevention, corporate wellness). Mention your approach to virtual coaching.',
    commonMistakes: [
      'Not listing health coaching certification prominently',
      'Omitting client outcomes and success metrics',
      'Failing to specify coaching methodology',
      'Not including group and program facilitation experience',
      'Leaving out technology platforms and virtual coaching experience'
    ],
    interviewQuestions: [
      { q: 'Describe your coaching approach and how you support behavior change.', guidance: 'Explain your methodology, use of motivational interviewing, and accountability strategies.' },
      { q: 'How do you help a client who is stuck and not making progress?', guidance: 'Discuss reassessment, exploring barriers, and adjusting goals.' },
      { q: 'What is your experience with corporate wellness programs?', guidance: 'Describe program development, group coaching, and measuring ROI.' },
      { q: 'How do you handle a client whose goals conflict with medical advice?', guidance: 'Show understanding of scope, collaboration with healthcare providers, and supporting medical compliance.' },
      { q: 'Describe your approach to virtual coaching and technology use.', guidance: 'Discuss platforms used, engagement strategies, and maintaining connection remotely.' }
    ],
    atsKeywords: ['health coach', 'wellness coach', 'NBC-HWC', 'health coaching', 'behavior change', 'motivational interviewing', 'wellness', 'lifestyle', 'nutrition', 'fitness']
  },
  {
    slug: 'dietitian',
    jobTitle: 'Dietitian',
    avgSalary: '$68,000',
    jobGrowth: '+7%',
    blsUrl: 'https://www.bls.gov/ooh/healthcare/dietitians-and-nutritionists.htm',
    keySkills: ['Medical Nutrition Therapy', 'Nutrition Assessment', 'Diet Planning', 'Patient Education', 'Clinical Documentation', 'Menu Planning', 'Tube Feeding', 'Diabetes Education'],
    skillCategories: {
      'Clinical Skills': ['Nutrition assessment', 'Medical nutrition therapy', 'Enteral/parenteral nutrition', 'Diabetes management'],
      'Counseling': ['Diet counseling', 'Behavior modification', 'Patient education', 'Motivational interviewing'],
      'Administrative': ['Menu planning', 'Food service management', 'Quality improvement', 'Regulatory compliance']
    },
    certifications: ['RD/RDN Credential', 'State Licensure', 'CDCES (Diabetes)', 'CNSC (Nutrition Support)', 'CSO (Oncology)'],
    uniqueContext: 'Registered dietitians provide evidence-based nutrition therapy, translating complex nutritional science into practical eating plans. The role spans clinical settings, community health, and food service, requiring both scientific expertise and communication skills.',
    hiringTip: 'Dietitian resumes should highlight your RD credential, specialty certifications, and patient populations. Include your caseload volume, MNT outcomes, and any tube feeding or TPN experience for clinical roles. Mention specific conditions you specialize in (renal, diabetes, oncology).',
    commonMistakes: [
      'Not listing RD/RDN credential and state license',
      'Omitting specialty certifications (CDCES, CNSC)',
      'Failing to mention patient populations and conditions',
      'Not including caseload volume and productivity',
      'Leaving out tube feeding and critical care experience'
    ],
    interviewQuestions: [
      { q: 'Describe your approach to medical nutrition therapy for a complex patient.', guidance: 'Walk through assessment, diagnosis, intervention, and monitoring.' },
      { q: 'How do you counsel patients who are resistant to dietary changes?', guidance: 'Discuss motivational interviewing, small changes, and patient-centered approaches.' },
      { q: 'What is your experience with tube feeding and parenteral nutrition?', guidance: 'Describe formula selection, monitoring, and troubleshooting complications.' },
      { q: 'How do you stay current with nutrition research?', guidance: 'Mention journals, continuing education, and implementing evidence-based updates.' },
      { q: 'Describe your experience with diabetes education.', guidance: 'Discuss carb counting, CGM integration, insulin adjustment support, and program structure.' }
    ],
    atsKeywords: ['dietitian', 'RD', 'RDN', 'registered dietitian', 'nutrition', 'medical nutrition therapy', 'MNT', 'diet', 'diabetes education', 'clinical nutrition']
  },
  {
    slug: 'nutritionist',
    jobTitle: 'Nutritionist',
    avgSalary: '$58,000',
    jobGrowth: '+7%',
    blsUrl: 'https://www.bls.gov/ooh/healthcare/dietitians-and-nutritionists.htm',
    keySkills: ['Nutrition Counseling', 'Meal Planning', 'Health Education', 'Client Assessment', 'Program Development', 'Weight Management', 'Sports Nutrition', 'Wellness Coaching'],
    skillCategories: {
      'Counseling Skills': ['Nutrition assessment', 'Meal planning', 'Behavior change support', 'Client education'],
      'Specialty Areas': ['Weight management', 'Sports nutrition', 'Wellness programs', 'Corporate health'],
      'Program Development': ['Group education', 'Workshop facilitation', 'Content creation', 'Outcome tracking']
    },
    certifications: ['CNS Certification', 'State Certification (varies)', 'Specialty Certifications', 'Health Coach Certification'],
    uniqueContext: 'Nutritionists help clients improve their eating habits and achieve health goals through education and counseling. The role varies significantly by state regulations, with some states requiring licensure and others allowing practice with certification alone.',
    hiringTip: 'Nutritionist resumes should clarify your credentials, certification, and any state licensure. Include your client outcomes, specialty areas (weight loss, sports, wellness), and program development experience. Be clear about your scope of practice based on your qualifications.',
    commonMistakes: [
      'Not clarifying credentials and scope of practice',
      'Omitting specific certifications and training',
      'Failing to mention client outcomes and success stories',
      'Not including specialty areas and populations',
      'Leaving out program development and group education experience'
    ],
    interviewQuestions: [
      { q: 'Describe your nutrition counseling approach and methodology.', guidance: 'Explain your assessment process, planning approach, and follow-up.' },
      { q: 'How do you help clients achieve sustainable weight loss?', guidance: 'Discuss behavior change, realistic goal-setting, and long-term maintenance.' },
      { q: 'What is your experience with sports nutrition?', guidance: 'Describe athlete populations, periodization, and performance nutrition strategies.' },
      { q: 'How do you stay within your scope of practice?', guidance: 'Show understanding of limitations and when to refer to RDs or physicians.' },
      { q: 'Describe your experience developing wellness programs.', guidance: 'Discuss program design, implementation, and measuring outcomes.' }
    ],
    atsKeywords: ['nutritionist', 'CNS', 'nutrition', 'meal planning', 'weight management', 'wellness', 'diet', 'health education', 'sports nutrition', 'nutrition counseling']
  },
  {
    slug: 'optometrist',
    jobTitle: 'Optometrist',
    avgSalary: '$125,000',
    jobGrowth: '+9%',
    blsUrl: 'https://www.bls.gov/ooh/healthcare/optometrists.htm',
    keySkills: ['Eye Examination', 'Diagnosis', 'Vision Correction', 'Contact Lens Fitting', 'Disease Management', 'Patient Education', 'Prescribing', 'Practice Management'],
    skillCategories: {
      'Clinical Skills': ['Comprehensive eye exams', 'Refraction', 'Contact lens fitting', 'Disease diagnosis'],
      'Disease Management': ['Glaucoma management', 'Diabetic eye care', 'Dry eye treatment', 'Ocular emergencies'],
      'Practice': ['Prescription writing', 'Patient education', 'Specialty services', 'Referral coordination']
    },
    certifications: ['OD Degree', 'State Optometry License', 'TPA Certification', 'Board Certification'],
    uniqueContext: 'Optometrists provide primary eye care, examining eyes, diagnosing conditions, and prescribing corrective lenses. The expanding scope of practice in many states includes managing eye diseases and co-managing surgical patients.',
    hiringTip: 'Optometrist resumes should highlight your OD degree, state license, and scope of practice (therapeutics, glaucoma, injections). Include your patient volume, specialty services (ortho-k, dry eye, pediatrics), and technology proficiency. Mention EHR systems and diagnostic equipment experience.',
    commonMistakes: [
      'Not listing OD degree and license prominently',
      'Omitting therapeutic certification and scope',
      'Failing to mention patient volume and productivity',
      'Not including specialty services offered',
      'Leaving out equipment and technology experience'
    ],
    interviewQuestions: [
      { q: 'Describe your approach to a comprehensive eye examination.', guidance: 'Walk through your exam sequence, key assessments, and patient communication.' },
      { q: 'How do you manage patients with glaucoma?', guidance: 'Discuss monitoring protocols, treatment algorithms, and referral criteria.' },
      { q: 'What is your experience with specialty contact lenses?', guidance: 'Describe fitting experience with scleral, ortho-k, and specialty designs.' },
      { q: 'How do you handle practice management aspects of optometry?', guidance: 'Discuss efficiency, patient flow, and balancing clinical care with business.' },
      { q: 'Describe your approach to pediatric eye care.', guidance: 'Explain techniques for examining children and communicating with parents.' }
    ],
    atsKeywords: ['optometrist', 'OD', 'eye exam', 'vision', 'contact lenses', 'glasses', 'optometry', 'eye care', 'refraction', 'glaucoma']
  },
  {
    slug: 'optician',
    jobTitle: 'Optician',
    avgSalary: '$42,000',
    jobGrowth: '+5%',
    blsUrl: 'https://www.bls.gov/ooh/healthcare/opticians-dispensing.htm',
    keySkills: ['Frame Selection', 'Lens Fitting', 'Prescription Interpretation', 'Adjustments', 'Customer Service', 'Measurements', 'Repairs', 'Sales'],
    skillCategories: {
      'Technical Skills': ['Prescription interpretation', 'Frame measurements', 'Lens selection', 'Frame adjustments and repairs'],
      'Customer Service': ['Frame styling', 'Patient education', 'Insurance processing', 'Problem resolution'],
      'Sales': ['Product knowledge', 'Upselling techniques', 'Inventory management', 'Vendor relations']
    },
    certifications: ['ABO Certification', 'NCLE Certification', 'State Licensure (where required)', 'Manufacturer Training'],
    uniqueContext: 'Opticians fit and dispense eyeglasses and contact lenses, combining technical expertise with retail skills. The role requires understanding of optical physics, face anatomy, and fashion to help patients see clearly while looking their best.',
    hiringTip: 'Optician resumes should highlight ABO/NCLE certifications, sales performance, and customer satisfaction metrics. Include your frame styling expertise, lens knowledge, and any specialty fitting experience. Mention specific product lines and POS/dispensing software used.',
    commonMistakes: [
      'Not listing ABO/NCLE certifications',
      'Omitting sales metrics and performance',
      'Failing to mention specialty fitting experience',
      'Not including customer satisfaction scores',
      'Leaving out software and technology experience'
    ],
    interviewQuestions: [
      { q: 'How do you help a patient select frames that suit their face shape and prescription?', guidance: 'Discuss face shape analysis, prescription considerations, and lifestyle factors.' },
      { q: 'Describe your approach to explaining progressive lenses to a first-time wearer.', guidance: 'Show patient education skills and managing expectations.' },
      { q: 'How do you handle a patient who is unhappy with their new glasses?', guidance: 'Discuss troubleshooting, adjustments, and customer service approach.' },
      { q: 'What is your experience with specialty lenses?', guidance: 'Describe experience with progressives, digital lenses, and specialty coatings.' },
      { q: 'How do you balance patient care with sales goals?', guidance: 'Show integrity while meeting business objectives through quality service.' }
    ],
    atsKeywords: ['optician', 'ABO', 'NCLE', 'dispensing', 'eyeglasses', 'frames', 'lenses', 'optical', 'prescription', 'eyewear']
  },
  {
    slug: 'sterile-processing-technician',
    jobTitle: 'Sterile Processing Technician',
    avgSalary: '$45,000',
    jobGrowth: '+6%',
    blsUrl: 'https://www.bls.gov/ooh/healthcare/medical-equipment-preparers.htm',
    keySkills: ['Instrument Sterilization', 'Decontamination', 'Instrument Assembly', 'Quality Assurance', 'Infection Control', 'Documentation', 'Inventory Management', 'Equipment Operation'],
    skillCategories: {
      'Technical Skills': ['Decontamination procedures', 'Sterilization methods', 'Instrument assembly', 'Packaging techniques'],
      'Quality Assurance': ['Biological indicators', 'Chemical indicators', 'Documentation', 'Tracking systems'],
      'Equipment': ['Steam sterilizers', 'Low-temperature sterilizers', 'Ultrasonic cleaners', 'Automated washers']
    },
    certifications: ['CRCST Certification (HSPA)', 'CBSPD Certification', 'CIS Certification', 'State Requirements'],
    uniqueContext: 'Sterile processing technicians ensure surgical instruments are properly cleaned, sterilized, and ready for patient procedures. The role is critical to infection prevention, requiring attention to detail and strict adherence to protocols.',
    hiringTip: 'SPD tech resumes should highlight your certification, instrument knowledge, and quality metrics. Include your experience with specific sterilizer types, instrument sets, and tracking systems. Mention any specialty instrument experience (ortho, neuro, cardiac).',
    commonMistakes: [
      'Not listing CRCST or CBSPD certification',
      'Omitting specific equipment and sterilizer experience',
      'Failing to mention quality metrics and error rates',
      'Not including instrument set experience',
      'Leaving out tracking system and software experience'
    ],
    interviewQuestions: [
      { q: 'Describe the decontamination process for surgical instruments.', guidance: 'Walk through the steps from receiving to cleaning, showing attention to detail.' },
      { q: 'How do you ensure proper sterilization has been achieved?', guidance: 'Discuss biological and chemical indicators, documentation, and release criteria.' },
      { q: 'What would you do if you noticed a damaged instrument during assembly?', guidance: 'Explain documentation, notification, and replacement procedures.' },
      { q: 'Describe your experience with specialty instrument sets.', guidance: 'Discuss complex sets you\'ve worked with and any specialty training.' },
      { q: 'How do you prioritize work when there are urgent case needs?', guidance: 'Show ability to manage competing priorities while maintaining quality.' }
    ],
    atsKeywords: ['sterile processing', 'SPD', 'CRCST', 'sterilization', 'decontamination', 'surgical instruments', 'central sterile', 'infection control', 'autoclaving', 'instrument processing']
  },
  {
    slug: 'epidemiologist',
    jobTitle: 'Epidemiologist',
    avgSalary: '$78,000',
    jobGrowth: '+26%',
    blsUrl: 'https://www.bls.gov/ooh/life-physical-and-social-science/epidemiologists.htm',
    keySkills: ['Disease Investigation', 'Data Analysis', 'Research Design', 'Statistical Analysis', 'Report Writing', 'Surveillance', 'Outbreak Response', 'Public Health Policy'],
    skillCategories: {
      'Research Skills': ['Study design', 'Data collection', 'Statistical analysis', 'Literature review'],
      'Technical': ['SAS/SPSS/R', 'GIS mapping', 'Surveillance systems', 'Database management'],
      'Public Health': ['Disease surveillance', 'Outbreak investigation', 'Policy development', 'Health communication']
    },
    certifications: ['MPH/PhD Degree', 'CPH Certification', 'State Epidemiology Requirements'],
    uniqueContext: 'Epidemiologists investigate disease patterns and causes to prevent illness and improve public health. The role requires strong analytical skills, scientific rigor, and the ability to translate findings into actionable public health recommendations.',
    hiringTip: 'Epidemiologist resumes should highlight your degree, statistical software proficiency, and outbreak investigation experience. Include your publications, grant funding, and specific disease areas. Mention your experience with surveillance systems and public health emergency response.',
    commonMistakes: [
      'Not listing degree and certifications clearly',
      'Omitting statistical software and methods experience',
      'Failing to mention outbreak investigation experience',
      'Not including publications and presentations',
      'Leaving out emergency preparedness experience'
    ],
    interviewQuestions: [
      { q: 'Describe your experience investigating a disease outbreak.', guidance: 'Walk through your epidemiologic approach, data collection, and findings.' },
      { q: 'What statistical methods are you most experienced with?', guidance: 'Discuss regression, survival analysis, spatial analysis, and software used.' },
      { q: 'How do you communicate complex findings to non-technical audiences?', guidance: 'Describe your approach to reports, presentations, and policy briefs.' },
      { q: 'Describe your experience with disease surveillance systems.', guidance: 'Mention specific systems (NEDSS, ArboNET) and your role.' },
      { q: 'How do you ensure data quality in your research?', guidance: 'Discuss validation, cleaning procedures, and maintaining integrity.' }
    ],
    atsKeywords: ['epidemiologist', 'epidemiology', 'public health', 'disease surveillance', 'outbreak investigation', 'biostatistics', 'SAS', 'data analysis', 'MPH', 'infectious disease']
  },
  {
    slug: 'hospice-nurse',
    jobTitle: 'Hospice Nurse',
    avgSalary: '$78,000',
    jobGrowth: '+6%',
    blsUrl: 'https://www.bls.gov/ooh/healthcare/registered-nurses.htm',
    keySkills: ['Palliative Care', 'Pain Management', 'Symptom Control', 'Family Support', 'End-of-Life Care', 'Documentation', 'Care Coordination', 'Emotional Support'],
    skillCategories: {
      'Clinical Skills': ['Pain assessment and management', 'Symptom control', 'Comfort care', 'Medication management'],
      'Psychosocial': ['Grief support', 'Family counseling', 'Spiritual care coordination', 'Cultural sensitivity'],
      'Care Coordination': ['Interdisciplinary team', 'Care planning', 'Crisis management', 'Community resources']
    },
    certifications: ['RN License', 'CHPN Certification', 'BLS', 'State-specific hospice requirements'],
    uniqueContext: 'Hospice nurses provide compassionate end-of-life care, focusing on comfort rather than cure. The role requires clinical expertise in symptom management combined with exceptional emotional intelligence to support patients and families through dying.',
    hiringTip: 'Hospice nurse resumes should highlight your RN license, CHPN certification, and palliative care experience. Include your patient caseload, comfort with death and dying, and family support skills. Mention any specialized training in pain management or grief counseling.',
    commonMistakes: [
      'Not listing RN license and CHPN certification',
      'Omitting hospice-specific experience and patient volume',
      'Failing to mention pain management expertise',
      'Not including on-call and crisis response experience',
      'Leaving out family support and grief counseling skills'
    ],
    interviewQuestions: [
      { q: 'Why did you choose hospice nursing?', guidance: 'Share your philosophy on end-of-life care and what draws you to this work.' },
      { q: 'Describe your approach to pain management in terminal patients.', guidance: 'Discuss assessment, medication management, and advocating for comfort.' },
      { q: 'How do you support a family through the dying process?', guidance: 'Explain your approach to education, emotional support, and grief preparation.' },
      { q: 'Describe a challenging patient or family situation and how you handled it.', guidance: 'Show communication skills, cultural sensitivity, and problem-solving.' },
      { q: 'How do you practice self-care in this emotionally demanding role?', guidance: 'Discuss strategies for processing grief and maintaining your own wellbeing.' }
    ],
    atsKeywords: ['hospice nurse', 'CHPN', 'palliative care', 'end-of-life', 'pain management', 'hospice', 'RN', 'comfort care', 'symptom management', 'terminal illness']
  }
];

// Generate MDX content following CLAUDE.md guidelines
function generateMDXContent(job) {
  const date = new Date().toISOString().split('T')[0];
  const author = 'Anna Papalia'; // Healthcare author

  // Generate professional summaries
  const summaries = generateProfessionalSummaries(job);

  // Generate achievement bullets
  const achievements = generateAchievements(job);

  // Generate format tips
  const formatTips = generateFormatTips(job);

  // Generate FAQ
  const faq = generateFAQ(job);

  return `---
title: '${job.jobTitle} Resume: Examples & Writing Guide 2026'
slug: ${job.slug}
description: >-
  ${job.jobTitle} resume example with professional resume format and templates.
  Highlight your ${job.keySkills.slice(0, 2).join(' and ').toLowerCase()} skills.
cardSummary: >-
  Stand out in healthcare hiring. See how ${job.jobTitle}s showcase ${job.keySkills[0]} and career achievements.
date: '${date}'
author: ${author}
category: Healthcare
tags:
  - ${job.slug} resume
  - ${job.jobTitle.toLowerCase()} resume
  - ${job.jobTitle.toLowerCase()} resume example
  - healthcare resume
  - ${job.slug} cv
  - ${job.jobTitle.toLowerCase()} resume template
  - resume format
  - ats resume template
image: /images/resume-examples/${job.slug}.png
imageAlt: ${job.jobTitle} Resume Example
featured: false
jobTitle: ${job.jobTitle}
avgSalary: '${job.avgSalary}'
jobGrowth: ${job.jobGrowth}
keySkills:
${job.keySkills.map(s => `  - ${s}`).join('\n')}
faq:
${faq}
---
## What Makes a Great ${job.jobTitle} Resume?

${job.uniqueContext}

Healthcare employers evaluate ${job.jobTitle} candidates on specific credentials, clinical competencies, and demonstrated outcomes. With ${job.jobGrowth} projected job growth and an average salary of ${job.avgSalary}, competition for top ${job.jobTitle} positions requires a resume that immediately communicates your qualifications and value. This guide covers the specific sections, metrics, and formatting that healthcare recruiters look for when reviewing ${job.jobTitle} applications.

## Professional Summary Examples

${summaries}

## Salary & Job Outlook

${job.jobTitle} professionals earn a median annual salary of approximately **${job.avgSalary}**, with compensation varying based on experience, location, and work setting. Employment for this occupation is projected to grow **${job.jobGrowth}** over the next decade, faster than the average for all occupations due to increasing healthcare demand.

**Sources:** Salary estimates are based on data from the [U.S. Bureau of Labor Statistics Occupational Outlook Handbook](${job.blsUrl}), [Glassdoor](https://www.glassdoor.com/Salaries/${job.slug}-salary-SRCH_KO0,${job.slug.length}.htm), and [PayScale](https://www.payscale.com/research/US/Job=${job.jobTitle.replace(/ /g, '_')}/Salary). Actual compensation varies based on geographic location, facility type, certifications, and years of experience.

## Essential Skills to Highlight

${Object.entries(job.skillCategories).map(([category, skills]) => `### ${category}
${skills.map(s => `- ${s}`).join('\n')}`).join('\n\n')}

## Required Certifications

${job.certifications.map(c => `- ${c}`).join('\n')}

## Achievement-Focused Bullet Points

Quantify your impact with specific metrics:

${achievements}

## ${job.jobTitle} Resume Format & Template Tips

${formatTips}

## Hiring Manager Tip

> **${job.hiringTip.split('.')[0]}.**

${job.hiringTip.split('.').slice(1).join('.')}

## Common Mistakes to Avoid

${job.commonMistakes.map((m, i) => `### ${i + 1}. ${m.split(' ').slice(0, 3).join(' ')}...

${m}`).join('\n\n')}

## Common ${job.jobTitle} Interview Questions

Preparing for interviews is essential for landing your ${job.jobTitle} role. Here are questions frequently asked in ${job.jobTitle} interviews:

${job.interviewQuestions.map(q => `### "${q.q}"

${q.guidance}`).join('\n\n')}

## ATS Optimization for ${job.jobTitle} Resumes

Healthcare ATS systems screen for specific credentials, certifications, and clinical keywords. Missing key terms can disqualify an otherwise strong application.

- Include exact credential abbreviations: "${job.certifications.slice(0, 2).join('", "')}"
- Use clinical terminology from job postings: ${job.atsKeywords.slice(0, 5).map(k => `"${k}"`).join(', ')}
- List specific equipment, systems, or protocols you're experienced with
- Include both full terms and abbreviations for searchability
- Mention specific patient populations and care settings

## Explore More Healthcare Resume Resources

Looking for more career guidance? Check out these related resources:

- [Nurse Resume Example](/resume-examples/nurse)
- [Medical Assistant Resume Example](/resume-examples/medical-assistant)
- [Healthcare Resume Keywords](/blog/resume-keywords-by-industry)

Ready to build your ${job.jobTitle} resume? [Try our AI-powered resume builder](/builder) — optimized for ATS compatibility and healthcare recruiter expectations.
`;
}

function generateProfessionalSummaries(job) {
  const skills = job.keySkills;
  return `**For Entry-Level ${job.jobTitle}:**
"Recently certified ${job.jobTitle} with hands-on clinical experience in ${skills[0].toLowerCase()} and ${skills[1].toLowerCase()}. Completed training with focus on ${skills[2].toLowerCase()} and patient-centered care. ${job.certifications[0]} certified with strong foundation in healthcare protocols and safety procedures."

**For Experienced ${job.jobTitle}:**
"Dedicated ${job.jobTitle} with 5+ years of experience in ${skills[0].toLowerCase()} and ${skills[1].toLowerCase()}. Consistently maintained high patient satisfaction scores while managing complex cases. Proficient in ${skills[4].toLowerCase()} with proven track record of quality outcomes and team collaboration."

**For Senior ${job.jobTitle}:**
"Accomplished ${job.jobTitle} with 10+ years of progressive experience leading ${skills[0].toLowerCase()} initiatives. Expert in ${skills[2].toLowerCase()} with demonstrated success improving departmental outcomes by 25%. Mentor to junior staff with comprehensive knowledge of ${skills[3].toLowerCase()} and regulatory compliance."`;
}

function generateAchievements(job) {
  const skills = job.keySkills;
  return `- "Maintained ${Math.floor(Math.random() * 5) + 95}% compliance rate in ${skills[0].toLowerCase()} protocols across ${Math.floor(Math.random() * 100) + 200}+ patient interactions"
- "Reduced patient wait times by ${Math.floor(Math.random() * 20) + 15}% through improved ${skills[1].toLowerCase()} workflows"
- "Trained ${Math.floor(Math.random() * 10) + 5} new team members on ${skills[2].toLowerCase()} procedures with 100% certification pass rate"
- "Achieved patient satisfaction scores averaging ${(Math.random() * 0.5 + 4.5).toFixed(1)}/5.0 over 12-month period"
- "Implemented ${skills[3].toLowerCase()} improvements resulting in ${Math.floor(Math.random() * 25) + 10}% efficiency gains"
- "Maintained perfect attendance record while managing caseload of ${Math.floor(Math.random() * 20) + 15}+ patients daily"`;
}

function generateFormatTips(job) {
  return `${job.jobTitle} resumes require specific attention to credentials and clinical experience. Here are formatting guidelines tailored to this role:

- **Credentials first** — List your ${job.certifications.slice(0, 2).join(', ')} immediately after your name. Healthcare recruiters verify credentials before reading anything else.
- **Quantify your experience** — Include patient volumes, success rates, and quality metrics. Numbers demonstrate competence better than generic descriptions.
- **Highlight relevant certifications** — Create a dedicated section for certifications with expiration dates. Keep them current and prominently displayed.
- **Use clinical terminology** — Mirror the language from job postings. Include specific equipment, systems, and protocols you're trained on.
- **One page for <5 years experience** — Focus on your most relevant and recent experience. Senior professionals may use two pages for extensive accomplishments.
- **Include continuing education** — Healthcare evolves rapidly. Show your commitment to staying current with recent training and certifications.`;
}

function generateFAQ(job) {
  const skills = job.keySkills;
  return `  - question: What skills should I put on a ${job.jobTitle} resume?
    answer: >-
      ${job.jobTitle} hiring managers evaluate candidates on credentials,
      clinical competencies, and patient care outcomes. Your skills section should
      lead with ${skills[0]}, ${skills[1]}, ${skills[2]} and include additional
      competencies that demonstrate your range within the field. Prioritize skills
      mentioned in the specific job description you are applying for.
  - question: How long should a ${job.jobTitle} resume be?
    answer: >-
      One page for early-career professionals. Experienced ${job.jobTitle}s with
      multiple certifications, specializations, or leadership roles may use two
      pages. Focus on depth over breadth — detailed accomplishments with measurable
      outcomes in your most relevant roles are more valuable than brief mentions of
      every position you have held.
  - question: What is the best resume format for a ${job.jobTitle}?
    answer: >-
      For ${job.jobTitle} applications, the reverse-chronological format performs
      best with healthcare recruiters. Place your credentials and certifications
      prominently near the top of your resume. Use clear sections for experience,
      education, and skills. Avoid creative formatting that might fail ATS parsing.
  - question: How much does a ${job.jobTitle} make?
    answer: >-
      ${job.jobTitle} professionals earn an average of ${job.avgSalary}, with
      ${job.jobGrowth} projected job growth. Compensation varies based on
      specialization, geographic region, facility type, and experience level.
      Emphasize quantifiable achievements on your resume to position yourself
      for above-average compensation.
  - question: What should I include in my ${job.jobTitle} resume?
    answer: >-
      A competitive ${job.jobTitle} resume should open with a professional summary
      highlighting your strongest qualifications, followed by credentials and
      certifications. Include a skills section covering ${skills[0]}, ${skills[1]},
      ${skills[2]} and other relevant competencies. Your work experience should
      emphasize achievements with specific metrics rather than listing daily
      responsibilities.`;
}

// Main execution
console.log('🏥 Generating Healthcare resume examples...\n');

let created = 0;
let skipped = 0;

for (const job of HEALTHCARE_JOBS) {
  const filePath = path.join(CONTENT_DIR, `${job.slug}.mdx`);

  if (fs.existsSync(filePath)) {
    console.log(`⏭️  ${job.slug}.mdx already exists`);
    skipped++;
    continue;
  }

  const content = generateMDXContent(job);
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ Created ${job.slug}.mdx`);
  created++;
}

console.log('\n📊 Summary:');
console.log(`   ✅ Created: ${created}`);
console.log(`   ⏭️  Skipped: ${skipped}`);
console.log(`   📁 Total Healthcare Jobs: ${HEALTHCARE_JOBS.length}`);
