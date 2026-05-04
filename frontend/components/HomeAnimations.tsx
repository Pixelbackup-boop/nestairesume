// All hero/section animation wrappers below are now plain divs (no JS).
// Removing 'use client' and Framer Motion imports allows this file to be
// rendered as a Server Component, eliminating the JS bundle cost for the
// homepage hero entirely.
import { ReactNode } from 'react';

interface AnimationProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

// ============================================
// HERO SECTION ANIMATIONS — plain divs (no entry animation)
// ============================================
// Previously used Framer Motion `initial={ opacity: 0 }` entry animations.
// Problem: server renders the H1/CTA at opacity: 0, so the LCP element
// stays invisible until React hydrates and Framer Motion runs the
// fade-in. On mobile with 4x CPU throttle, hydration takes 5+ seconds —
// pushing mobile LCP to 9s+. PSI flagged this as the actual bottleneck
// after image bytes were optimized but mobile LCP didn't drop.
// Trade: lose 0.6s decorative fade-in, gain ~3-5s LCP improvement.

function Hero({ children, className = '' }: AnimationProps) {
  return <div className={className}>{children}</div>;
}

function HeroTitle({ children, className = '' }: AnimationProps) {
  return <div className={className}>{children}</div>;
}

function HeroSubtitle({ children, className = '' }: AnimationProps) {
  return <div className={className}>{children}</div>;
}

function HeroCTA({ children, className = '' }: AnimationProps) {
  return <div className={className}>{children}</div>;
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
