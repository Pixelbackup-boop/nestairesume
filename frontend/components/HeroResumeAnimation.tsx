'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Image from 'next/image';

// Animation timing (4 seconds per cycle)
const ANIMATION_DURATION = 4;
const SECTION_DELAY = 0.25;

// Demo CV Data
const CV_DATA = {
  name: 'Sarah Johnson',
  title: 'Senior Software Engineer',
  email: 'sarah.johnson@email.com',
  location: 'San Francisco, CA',
  phone: '+1 (555) 123-4567',
  photo: '/Img/sarah-johnson.jpg',
  summary: 'Innovative software engineer with 8+ years of experience building scalable web applications and leading cross-functional teams.',
  experience: [
    {
      company: 'Google',
      role: 'Senior Software Engineer',
      date: '2021 - Present',
      bullets: [
        'Led development of core search features serving 1B+ users',
        'Reduced page load time by 40% through optimization',
      ]
    },
    {
      company: 'Meta',
      role: 'Software Engineer',
      date: '2018 - 2021',
      bullets: [
        'Built real-time messaging features for 500M+ users',
        'Mentored 5 junior developers',
      ]
    }
  ],
  skills: ['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker'],
  education: {
    degree: 'B.S. Computer Science',
    school: 'Stanford University',
    year: '2018'
  }
};

export function HeroResumeAnimation({ className = '' }: { className?: string }) {
  const [cycle, setCycle] = useState(0);
  const [showComplete, setShowComplete] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const interval = setInterval(() => {
      setShowComplete(false);
      setCycle(c => c + 1);
    }, ANIMATION_DURATION * 1000 + 1500);

    const completeTimeout = setTimeout(() => {
      setShowComplete(true);
    }, SECTION_DELAY * 8 * 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(completeTimeout);
    };
  }, [cycle]);

  if (prefersReducedMotion) {
    return <StaticResume className={className} />;
  }

  return (
    <div className={`relative ${className}`}>
      {/* Ambient glow */}
      <motion.div
        className="absolute -inset-8 bg-gradient-to-br from-blue-500/20 via-indigo-500/20 to-purple-500/20 blur-3xl rounded-full"
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -inset-4 bg-gradient-to-tr from-cyan-400/10 to-blue-500/10 blur-2xl rounded-full"
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />

      {/* Main container */}
      <div className="relative w-80 h-[520px]">
        {/* A4 Paper */}
        <motion.div
          key={`paper-${cycle}`}
          className="absolute inset-0 rounded-xl overflow-hidden"
          data-theme-preserve="light"
          style={{
            backgroundColor: '#ffffff',
            boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0,0,0,0.05)'
          }}
          initial={{ opacity: 0, scale: 0.85, rotateY: -15 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          {/* Paper content */}
          <div className="p-5 pb-6 h-full overflow-hidden text-left">
            {/* Header - Blue Background with Photo, Name & Title */}
            <TypewriterSection delay={0} cycle={cycle}>
              <div className="-m-5 mb-[10px] p-4 bg-gradient-to-r from-blue-600 to-blue-500">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white/30 shadow-lg flex-shrink-0">
                    <Image
                      src={CV_DATA.photo}
                      alt={CV_DATA.name}
                      width={56}
                      height={56}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">{CV_DATA.name}</h2>
                    <p className="text-[11px] font-medium text-blue-100">{CV_DATA.title}</p>
                  </div>
                </div>
                <p className="text-[10px] text-blue-100/80 mt-2">
                  {CV_DATA.email} • {CV_DATA.location}
                </p>
              </div>
            </TypewriterSection>

            {/* Summary */}
            <TypewriterSection delay={SECTION_DELAY} cycle={cycle}>
              <div className="mt-4">
                <h3 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider border-b border-gray-100 pb-1">
                  Professional Summary
                </h3>
                <p className="text-[9px] text-gray-600 mt-1.5 leading-relaxed">
                  {CV_DATA.summary}
                </p>
              </div>
            </TypewriterSection>

            {/* Experience */}
            <TypewriterSection delay={SECTION_DELAY * 2} cycle={cycle}>
              <div className="mt-3">
                <h3 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider border-b border-gray-100 pb-1">
                  Experience
                </h3>
              </div>
            </TypewriterSection>

            {/* Job 1 */}
            <TypewriterSection delay={SECTION_DELAY * 3} cycle={cycle}>
              <div className="mt-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-[10px] font-semibold text-gray-700">{CV_DATA.experience[0].role}</span>
                  <span className="text-[8px] text-gray-500">{CV_DATA.experience[0].date}</span>
                </div>
                <p className="text-[9px] text-blue-600">{CV_DATA.experience[0].company}</p>
                <ul className="mt-1 space-y-0.5">
                  {CV_DATA.experience[0].bullets.map((bullet, i) => (
                    <li key={i} className="text-[8px] text-gray-600 flex items-start gap-1">
                      <span className="text-blue-500 mt-0.5">•</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </TypewriterSection>

            {/* Job 2 */}
            <TypewriterSection delay={SECTION_DELAY * 4} cycle={cycle}>
              <div className="mt-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-[10px] font-semibold text-gray-700">{CV_DATA.experience[1].role}</span>
                  <span className="text-[8px] text-gray-500">{CV_DATA.experience[1].date}</span>
                </div>
                <p className="text-[9px] text-blue-600">{CV_DATA.experience[1].company}</p>
                <ul className="mt-1 space-y-0.5">
                  {CV_DATA.experience[1].bullets.map((bullet, i) => (
                    <li key={i} className="text-[8px] text-gray-600 flex items-start gap-1">
                      <span className="text-blue-500 mt-0.5">•</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </TypewriterSection>

            {/* Skills */}
            <TypewriterSection delay={SECTION_DELAY * 5} cycle={cycle}>
              <div className="mt-3">
                <h3 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider border-b border-gray-100 pb-1">
                  Skills
                </h3>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {CV_DATA.skills.map((skill, i) => (
                    <span key={i} className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[8px] rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </TypewriterSection>

            {/* Education */}
            <TypewriterSection delay={SECTION_DELAY * 6} cycle={cycle}>
              <div className="mt-3">
                <h3 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider border-b border-gray-100 pb-1">
                  Education
                </h3>
                <div className="mt-1.5">
                  <p className="text-[10px] font-semibold text-gray-700">{CV_DATA.education.degree}</p>
                  <p className="text-[9px] text-gray-400">{CV_DATA.education.school} • {CV_DATA.education.year}</p>
                </div>
              </div>
            </TypewriterSection>
          </div>

          {/* Completion checkmark */}
          <AnimatePresence>
            {showComplete && (
              <motion.div
                className="absolute top-3 right-3"
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* AI Robot Pen */}
        <AIRobotPen cycle={cycle} />

        {/* Writing sparkles */}
        <WritingSparkles cycle={cycle} />

        {/* Magic particles */}
        <MagicParticles cycle={cycle} />
      </div>
    </div>
  );
}

// Typewriter section that fades in with slide
function TypewriterSection({
  children,
  delay,
  cycle
}: {
  children: React.ReactNode;
  delay: number;
  cycle: number;
}) {
  return (
    <motion.div
      key={`section-${delay}-${cycle}`}
      initial={{ opacity: 0, x: -10, filter: 'blur(4px)' }}
      animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
      transition={{ delay, duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

// AI Robot Pen - Bigger & More Detailed
function AIRobotPen({ cycle }: { cycle: number }) {
  const penPositions = [
    { x: 120, y: 40 },  // Header with photo (blue section)
    { x: 200, y: 130 }, // Summary
    { x: 180, y: 175 }, // Experience header
    { x: 200, y: 225 }, // Job 1
    { x: 180, y: 290 }, // Job 2
    { x: 200, y: 350 }, // Skills
    { x: 150, y: 450 }, // Education
    { x: 350, y: 260 }, // Exit
  ];

  return (
    <motion.div
      key={`pen-${cycle}`}
      className="absolute pointer-events-none z-30"
      style={{ width: 80, height: 100 }}
      initial={{ x: 350, y: 80, opacity: 0, rotate: 25 }}
      animate={{
        x: penPositions.map(p => p.x),
        y: penPositions.map(p => p.y),
        opacity: [0, 1, 1, 1, 1, 1, 1, 0],
        rotate: [25, 20, 15, 18, 15, 18, 15, 25],
      }}
      transition={{
        duration: 2.8,
        times: [0, 0.07, 0.16, 0.25, 0.34, 0.43, 0.52, 1],
        ease: 'easeInOut',
      }}
    >
      <svg width="80" height="100" viewBox="0 0 80 100" fill="none">
        <defs>
          <linearGradient id="robotGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <linearGradient id="armGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#64748b" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
          <filter id="robotGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id="penTipGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="2" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Robot Head / AI Brain */}
        <g filter="url(#robotGlow)">
          <ellipse cx="40" cy="24" rx="22" ry="18" fill="url(#robotGradient)" />
          {/* Brain circuit lines */}
          <path d="M28 18 C32 22, 36 18, 40 22 C44 18, 48 22, 52 18" stroke="#fff" strokeWidth="2" fill="none" opacity="0.5" />
          <path d="M30 28 C34 24, 38 28, 42 24 C46 28, 50 24, 52 28" stroke="#fff" strokeWidth="1.5" fill="none" opacity="0.3" />
          {/* AI Text */}
          <text x="40" y="28" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold" fontFamily="system-ui, sans-serif">AI</text>
          {/* Antenna */}
          <line x1="40" y1="6" x2="40" y2="12" stroke="#94a3b8" strokeWidth="2" />
          <motion.circle
            cx="40" cy="4" r="3" fill="#22d3ee"
            animate={{ opacity: [1, 0.5, 1], scale: [1, 1.2, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
          {/* Side lights */}
          <motion.circle cx="18" cy="24" r="2" fill="#22d3ee"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 0.3, repeat: Infinity }}
          />
          <motion.circle cx="62" cy="24" r="2" fill="#22d3ee"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 0.3, repeat: Infinity }}
          />
        </g>

        {/* Robot Arm */}
        <g>
          <rect x="35" y="42" width="10" height="20" rx="3" fill="url(#armGradient)" />
          <circle cx="40" cy="62" r="6" fill="#64748b" stroke="#94a3b8" strokeWidth="1" />
          <rect x="36" y="62" width="8" height="18" rx="2" fill="url(#armGradient)" />
        </g>

        {/* Pen tip */}
        <g filter="url(#penTipGlow)">
          <path d="M36 80 L40 98 L44 80 Z" fill="url(#robotGradient)" />
          <motion.circle cx="40" cy="96" r="4" fill="#3b82f6"
            animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.3, 1] }}
            transition={{ duration: 0.2, repeat: Infinity }}
          />
        </g>
      </svg>
    </motion.div>
  );
}

// Sparkle effects
function WritingSparkles({ cycle }: { cycle: number }) {
  const sparklePositions = [
    { x: 140, y: 60, delay: 0.1, size: 16 },
    { x: 220, y: 150, delay: 0.35, size: 18 },
    { x: 200, y: 195, delay: 0.55, size: 12 },
    { x: 220, y: 245, delay: 0.75, size: 16 },
    { x: 200, y: 310, delay: 0.95, size: 14 },
    { x: 220, y: 370, delay: 1.15, size: 18 },
    { x: 170, y: 470, delay: 1.35, size: 16 },
    { x: 130, y: 85, delay: 0.2, size: 10 },
    { x: 240, y: 175, delay: 0.45, size: 12 },
    { x: 190, y: 275, delay: 0.85, size: 11 },
  ];

  return (
    <>
      {sparklePositions.map((pos, i) => (
        <motion.div
          key={`sparkle-${i}-${cycle}`}
          className="absolute pointer-events-none"
          style={{ left: pos.x, top: pos.y, width: pos.size, height: pos.size }}
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0], rotate: [0, 180, 360] }}
          transition={{ delay: pos.delay, duration: 0.5, ease: 'easeOut' }}
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
            <path
              d="M12 2L13.5 9L20 10.5L13.5 12L12 19L10.5 12L4 10.5L10.5 9L12 2Z"
              fill="#fbbf24"
              filter="drop-shadow(0 0 4px #fbbf24)"
            />
          </svg>
        </motion.div>
      ))}
    </>
  );
}

// Magic floating particles
function MagicParticles({ cycle }: { cycle: number }) {
  const particles = [
    { x: 280, y: 90, delay: 0.2 },
    { x: 290, y: 180, delay: 0.5 },
    { x: 285, y: 270, delay: 0.8 },
    { x: 295, y: 360, delay: 1.1 },
    { x: 10, y: 110, delay: 0.3 },
    { x: 5, y: 220, delay: 0.7 },
    { x: 15, y: 330, delay: 1.0 },
    { x: 8, y: 470, delay: 1.4 },
  ];

  return (
    <>
      {particles.map((p, i) => (
        <motion.div
          key={`particle-${i}-${cycle}`}
          className="absolute w-2 h-2 rounded-full pointer-events-none"
          style={{
            left: p.x,
            top: p.y,
            background: i % 2 === 0 ? '#3b82f6' : '#8b5cf6',
            boxShadow: `0 0 8px ${i % 2 === 0 ? '#3b82f6' : '#8b5cf6'}`,
          }}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: [0, 1, 0], y: [0, -30, -60], x: [0, i % 2 === 0 ? 10 : -10, 0] }}
          transition={{ delay: p.delay, duration: 1, ease: 'easeOut' }}
        />
      ))}
    </>
  );
}

// Static fallback
function StaticResume({ className }: { className: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="w-80 h-[520px] rounded-xl shadow-2xl overflow-hidden" data-theme-preserve="light" style={{ backgroundColor: '#ffffff', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.2)' }}>
        {/* Blue Header */}
        <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-500">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white/30 shadow-lg flex-shrink-0">
              <Image
                src={CV_DATA.photo}
                alt={CV_DATA.name}
                width={56}
                height={56}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">{CV_DATA.name}</h2>
              <p className="text-[11px] font-medium text-blue-100">{CV_DATA.title}</p>
            </div>
          </div>
          <p className="text-[10px] text-blue-100/80 mt-2">{CV_DATA.email} • {CV_DATA.location}</p>
        </div>
        {/* Content */}
        <div className="p-5 pb-6">
          <div className="mt-1">
            <h3 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider border-b border-gray-100 pb-1">Summary</h3>
            <p className="text-[9px] text-gray-600 mt-1.5">{CV_DATA.summary}</p>
          </div>
        </div>
        <div className="absolute top-3 right-3 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default HeroResumeAnimation;
