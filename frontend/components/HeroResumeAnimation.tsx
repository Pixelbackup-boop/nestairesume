'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Image from 'next/image';

// Lazy-load decorative animation overlays (robot pen, sparkles, particles)
// These are ~180 lines of Framer Motion SVG — deferring them improves LCP
const HeroAnimationOverlays = React.lazy(() => import('./HeroAnimationOverlays'));

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
      {/* Ambient glow — CSS animations instead of Framer Motion for faster hydration */}
      <div
        className="absolute -inset-8 bg-gradient-to-br from-blue-500/20 via-indigo-500/20 to-purple-500/20 blur-3xl rounded-full animate-ambient-glow"
      />
      <div
        className="absolute -inset-4 bg-gradient-to-tr from-cyan-400/10 to-blue-500/10 blur-2xl rounded-full animate-ambient-glow-alt"
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
                      priority
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

        {/* Decorative overlays — lazy-loaded to reduce initial JS bundle */}
        <Suspense fallback={null}>
          <HeroAnimationOverlays cycle={cycle} />
        </Suspense>
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

// Static fallback for reduced motion
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
                priority
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
