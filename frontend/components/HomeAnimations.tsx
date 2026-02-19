'use client';

import { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface AnimationProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

// Shared easing - cubic bezier for smooth feel
const easeOut: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

// ============================================
// HERO SECTION ANIMATIONS (uses `animate`, safe with SSR)
// ============================================

function Hero({ children, className = '' }: AnimationProps) {
  return <div className={className}>{children}</div>;
}

function HeroTitle({ children, className = '' }: AnimationProps) {
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

function HeroSubtitle({ children, className = '' }: AnimationProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.15, ease: easeOut }}
    >
      {children}
    </motion.div>
  );
}

function HeroCTA({ children, className = '' }: AnimationProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3, ease: easeOut }}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// SECTION ANIMATIONS — plain divs (no whileInView)
// Framer Motion whileInView causes hydration ghosting
// with React 19 server components. CSS handles fade-in.
// ============================================

function CardsContainer({ children, className = '' }: AnimationProps) {
  return <div className={className}>{children}</div>;
}

function Card({ children, className = '' }: AnimationProps) {
  return <div className={className}>{children}</div>;
}

function Timeline({ children, className = '' }: AnimationProps) {
  return <div className={className}>{children}</div>;
}

function TimelineHeader({ children, className = '' }: AnimationProps) {
  return <div className={className}>{children}</div>;
}

function TimelineStep({ children, className = '' }: AnimationProps) {
  return <div className={className}>{children}</div>;
}

function ProfileCard({ children, className = '' }: AnimationProps) {
  return <div className={className}>{children}</div>;
}

function Section({ children, className = '' }: AnimationProps) {
  return <div className={className}>{children}</div>;
}

function FeaturesGrid({ children, className = '' }: AnimationProps) {
  return <div className={className}>{children}</div>;
}

function FeatureCard({ children, className = '' }: AnimationProps) {
  return <div className={className}>{children}</div>;
}

function StepsGrid({ children, className = '' }: AnimationProps) {
  return <div className={className}>{children}</div>;
}

function Step({ children, className = '' }: AnimationProps) {
  return <div className={className}>{children}</div>;
}

function TestimonialsGrid({ children, className = '' }: AnimationProps) {
  return <div className={className}>{children}</div>;
}

function Testimonial({ children, className = '' }: AnimationProps) {
  return <div className={className}>{children}</div>;
}

// ============================================
// EXPORTS
// ============================================

export {
  Hero,
  HeroTitle,
  HeroSubtitle,
  HeroCTA,
  CardsContainer,
  Card,
  Timeline,
  TimelineHeader,
  TimelineStep,
  ProfileCard,
  Section,
  FeaturesGrid,
  FeatureCard,
  StepsGrid,
  Step,
  TestimonialsGrid,
  Testimonial,
};
