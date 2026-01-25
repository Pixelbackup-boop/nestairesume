'use client';

import { ReactNode, useEffect, useState } from 'react';
import { motion, useReducedMotion, Variants, useSpring, useInView } from 'framer-motion';
import { useRef } from 'react';

interface AnimationProps {
  children: ReactNode;
  className?: string;
}

// Shared easing
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
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: easeOut }}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// STATS CARDS STAGGER
// ============================================

const statsContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const statsCardVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
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

function StatsContainer({ children, className = '' }: AnimationProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={statsContainerVariants}
    >
      {children}
    </motion.div>
  );
}

function StatsCard({ children, className = '' }: AnimationProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={statsCardVariants}>
      {children}
    </motion.div>
  );
}

// ============================================
// COUNT-UP NUMBER ANIMATION
// ============================================

interface CountUpProps {
  value: number;
  className?: string;
  duration?: number;
}

function CountUp({ value, className = '', duration = 1.5 }: CountUpProps) {
  const prefersReducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (prefersReducedMotion || !isInView) {
      setDisplayValue(value);
      return;
    }

    let startTime: number | null = null;
    const startValue = 0;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

      // Ease out quad
      const easedProgress = 1 - (1 - progress) * (1 - progress);
      const currentValue = Math.round(startValue + (value - startValue) * easedProgress);

      setDisplayValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration, prefersReducedMotion, isInView]);

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  );
}

// ============================================
// CTA CARD (with gradient border animation)
// ============================================

function CTACard({ children, className = '' }: AnimationProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4, ease: easeOut }}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// RESUME CARDS GRID STAGGER
// ============================================

const resumeGridVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const resumeCardVariants: Variants = {
  hidden: { opacity: 0, y: 25, scale: 0.97 },
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

function ResumeGrid({ children, className = '' }: AnimationProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={resumeGridVariants}
    >
      {children}
    </motion.div>
  );
}

function ResumeCard({ children, className = '' }: AnimationProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={resumeCardVariants}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// SECTION (scroll triggered)
// ============================================

function Section({ children, className = '' }: AnimationProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: easeOut }}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// EMPTY STATE
// ============================================

function EmptyState({ children, className = '' }: AnimationProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: easeOut }}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// TEMPLATE USAGE BAR (animated width)
// ============================================

interface UsageBarProps {
  percentage: number;
  className?: string;
}

function UsageBar({ percentage, className = '' }: UsageBarProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  if (prefersReducedMotion) {
    return <div className={className} style={{ width: `${percentage}%` }} />;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ width: 0 }}
      animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: easeOut }}
    />
  );
}

// ============================================
// PRO TIPS SECTION
// ============================================

function ProTips({ children, className = '' }: AnimationProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: easeOut }}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// EXPORT
// ============================================

export const DashboardAnimations = {
  Hero,
  StatsContainer,
  StatsCard,
  CountUp,
  CTACard,
  ResumeGrid,
  ResumeCard,
  Section,
  EmptyState,
  UsageBar,
  ProTips,
};
