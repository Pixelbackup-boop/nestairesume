'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';

// Sample CV content to be typed
const CV_SECTIONS = [
  {
    type: 'name',
    content: 'Sarah Johnson',
    delay: 0,
  },
  {
    type: 'title',
    content: 'Senior Software Engineer',
    delay: 100,
  },
  {
    type: 'contact',
    content: 'sarah.johnson@email.com • San Francisco, CA',
    delay: 50,
  },
  {
    type: 'section-header',
    content: 'PROFESSIONAL SUMMARY',
    delay: 200,
  },
  {
    type: 'paragraph',
    content: 'Innovative software engineer with 8+ years of experience building scalable web applications. Expert in React, TypeScript, and cloud architecture.',
    delay: 30,
  },
  {
    type: 'section-header',
    content: 'EXPERIENCE',
    delay: 200,
  },
  {
    type: 'job-title',
    content: 'Senior Software Engineer • Google',
    delay: 50,
  },
  {
    type: 'date',
    content: '2020 - Present',
    delay: 50,
  },
  {
    type: 'bullet',
    content: '• Led development of core search features serving 1B+ users',
    delay: 25,
  },
  {
    type: 'bullet',
    content: '• Reduced page load time by 40% through optimization',
    delay: 25,
  },
  {
    type: 'section-header',
    content: 'SKILLS',
    delay: 200,
  },
  {
    type: 'skills',
    content: 'React • TypeScript • Node.js • Python • AWS • Docker',
    delay: 30,
  },
];

interface TypewriterTextProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  className?: string;
}

function TypewriterText({ text, speed = 40, onComplete, className }: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);

  return (
    <span className={className}>
      {displayedText}
      {currentIndex < text.length && (
        <span className="animate-pulse text-blue-500">|</span>
      )}
    </span>
  );
}

interface TypewriterCVProps {
  className?: string;
  autoStart?: boolean;
  onComplete?: () => void;
}

export function TypewriterCV({ className = '', autoStart = true, onComplete }: TypewriterCVProps) {
  const [currentSection, setCurrentSection] = useState(-1);
  const [completedSections, setCompletedSections] = useState<number[]>([]);
  const [isStarted, setIsStarted] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleSectionComplete = useCallback((index: number) => {
    setCompletedSections(prev => [...prev, index]);

    // Move to next section after a delay
    setTimeout(() => {
      if (index < CV_SECTIONS.length - 1) {
        setCurrentSection(index + 1);
      } else if (onComplete) {
        onComplete();
      }
    }, CV_SECTIONS[index + 1]?.delay || 500);
  }, [onComplete]);

  useEffect(() => {
    if (autoStart && !isStarted) {
      const startDelay = setTimeout(() => {
        setIsStarted(true);
        setCurrentSection(0);
      }, 800);
      return () => clearTimeout(startDelay);
    }
  }, [autoStart, isStarted]);

  const getSectionStyle = (type: string) => {
    switch (type) {
      case 'name':
        return 'text-lg font-bold text-gray-800';
      case 'title':
        return 'text-sm text-blue-600 font-medium';
      case 'contact':
        return 'text-xs text-gray-400 mt-1';
      case 'section-header':
        return 'text-xs font-bold text-gray-700 mt-4 mb-1 tracking-wider border-b border-gray-100 pb-1';
      case 'paragraph':
        return 'text-xs text-gray-600 leading-relaxed';
      case 'job-title':
        return 'text-xs font-semibold text-gray-700 mt-2';
      case 'date':
        return 'text-[10px] text-gray-500';
      case 'bullet':
        return 'text-xs text-gray-600 ml-2';
      case 'skills':
        return 'text-xs text-gray-600';
      default:
        return 'text-xs text-gray-600';
    }
  };

  // For reduced motion - show static content
  if (prefersReducedMotion) {
    return (
      <div className={`relative ${className}`}>
        <div className="a4-paper bg-white rounded-lg shadow-2xl p-6 w-64 h-80 overflow-hidden">
          {CV_SECTIONS.map((section, index) => (
            <div key={index} className={getSectionStyle(section.type)}>
              {section.content}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* AI Writing Indicator */}
      <AnimatePresence>
        {isStarted && currentSection < CV_SECTIONS.length && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute -top-8 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100 shadow-sm z-20"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="w-4 h-4"
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-blue-500">
                <path
                  d="M12 3L14.5 8.5L20 9.27L16 13.14L17 19L12 16L7 19L8 13.14L4 9.27L9.5 8.5L12 3Z"
                  fill="currentColor"
                />
              </svg>
            </motion.div>
            <span className="text-xs font-medium text-blue-600">AI Writing...</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Glow effect behind paper */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 blur-2xl rounded-full"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* A4 Paper */}
      <motion.div
        className="relative bg-white rounded-lg shadow-2xl overflow-hidden z-10"
        style={{
          width: '240px',
          height: '320px',
          padding: '20px',
        }}
        initial={{ opacity: 0, y: 20, rotateX: 10 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Paper texture overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-transparent pointer-events-none" />

        {/* Paper edge shadow */}
        <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-l from-gray-200/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-t from-gray-200/50 to-transparent" />

        {/* CV Content */}
        <div className="relative h-full overflow-hidden">
          {CV_SECTIONS.map((section, index) => (
            <div key={index} className={getSectionStyle(section.type)}>
              {completedSections.includes(index) ? (
                // Completed sections - static text
                <motion.span
                  initial={{ opacity: 0.7 }}
                  animate={{ opacity: 1 }}
                >
                  {section.content}
                </motion.span>
              ) : currentSection === index ? (
                // Current section - typewriter effect
                <TypewriterText
                  text={section.content}
                  speed={section.type === 'name' ? 80 : section.type === 'bullet' ? 25 : 35}
                  onComplete={() => handleSectionComplete(index)}
                />
              ) : null}
            </div>
          ))}
        </div>

        {/* Completion sparkle */}
        <AnimatePresence>
          {completedSections.length === CV_SECTIONS.length && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-2 right-2"
            >
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Floating pen/cursor that follows typing */}
      <AnimatePresence>
        {isStarted && currentSection < CV_SECTIONS.length && currentSection >= 0 && (
          <motion.div
            className="absolute z-20 pointer-events-none"
            initial={{ opacity: 0, x: 260, y: 40 }}
            animate={{
              opacity: 1,
              x: 245,
              y: 40 + (currentSection * 18),
            }}
            exit={{ opacity: 0, x: 280 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-blue-500 drop-shadow-lg">
              <path
                d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
                fill="currentColor"
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default TypewriterCV;
