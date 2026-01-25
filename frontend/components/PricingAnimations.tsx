'use client';

import { ReactNode, useState, useRef, useEffect } from 'react';
import { motion, useReducedMotion, Variants, AnimatePresence } from 'framer-motion';

interface AnimationProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const easeOut: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

// ============================================
// HERO SECTION
// ============================================

function Hero({ children, className = '' }: AnimationProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: easeOut }}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// PRICING CARDS STAGGER
// ============================================

const gridVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: easeOut,
    },
  },
};

function PricingGrid({ children, className = '' }: AnimationProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={gridVariants}
    >
      {children}
    </motion.div>
  );
}

function PricingCard({ children, className = '', highlighted = false }: AnimationProps & { highlighted?: boolean }) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={cardVariants}
      whileHover={highlighted ? { scale: 1.02, y: -5 } : { scale: 1.01, y: -3 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// MOST POPULAR BADGE WITH PULSE
// ============================================

function Badge({ children, className = '' }: AnimationProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <span className={className}>{children}</span>;
  }

  return (
    <motion.span
      className={className}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        delay: 0.6,
        duration: 0.4,
        ease: easeOut
      }}
    >
      <motion.span
        className="inline-block"
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'easeInOut',
        }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}

// ============================================
// COMPARISON TABLE
// ============================================

const tableVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const rowVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: easeOut,
    },
  },
};

function ComparisonTable({ children, className = '' }: AnimationProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={tableVariants}
    >
      {children}
    </motion.div>
  );
}

function TableRow({ children, className = '' }: AnimationProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <tr className={className}>{children}</tr>;
  }

  return (
    <motion.tr className={className} variants={rowVariants}>
      {children}
    </motion.tr>
  );
}

// ============================================
// FAQ ACCORDION (with GSAP for height)
// ============================================

const faqContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const faqItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: easeOut,
    },
  },
};

function FAQContainer({ children, className = '' }: AnimationProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={faqContainerVariants}
    >
      {children}
    </motion.div>
  );
}

interface FAQItemProps {
  question: string;
  answer: string;
  className?: string;
}

function FAQItem({ question, answer, className = '' }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !contentRef.current) return;

    // Dynamic import GSAP for accordion animation
    import('@/lib/animations/gsapInit').then(({ gsap }) => {
      if (isOpen) {
        gsap.fromTo(
          contentRef.current,
          { height: 0, opacity: 0 },
          { height: 'auto', opacity: 1, duration: 0.3, ease: 'power2.out' }
        );
      } else {
        gsap.to(contentRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.2,
          ease: 'power2.in',
        });
      }
    });
  }, [isOpen, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <div className={`bg-white dark:bg-bg-card rounded-xl border border-gray-200 dark:border-border-subtle ${className}`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-6 text-left flex items-center justify-between"
        >
          <h3 className="font-semibold text-gray-900 dark:text-white">{question}</h3>
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isOpen && (
          <div className="px-6 pb-6">
            <p className="text-gray-600 dark:text-gray-400 text-sm">{answer}</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <motion.div
      className={`bg-white dark:bg-bg-card rounded-xl border border-gray-200 dark:border-border-subtle overflow-hidden ${className}`}
      variants={faqItemVariants}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 text-left flex items-center justify-between group"
      >
        <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-accent-green transition-colors">
          {question}
        </h3>
        <motion.svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>
      <div
        ref={contentRef}
        style={{ height: 0, opacity: 0, overflow: 'hidden' }}
      >
        <div className="px-6 pb-6">
          <p className="text-gray-600 dark:text-gray-400 text-sm">{answer}</p>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================
// FAQ SECTION HEADER
// ============================================

function FAQHeader({ children, className = '' }: AnimationProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, ease: easeOut }}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// CTA SECTION
// ============================================

function CTA({ children, className = '' }: AnimationProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, ease: easeOut }}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// EXPORT
// ============================================

export const PricingAnimations = {
  Hero,
  PricingGrid,
  PricingCard,
  Badge,
  ComparisonTable,
  TableRow,
  FAQContainer,
  FAQItem,
  FAQHeader,
  CTA,
};
