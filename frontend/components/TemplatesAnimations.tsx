'use client';

import { ReactNode, useState } from 'react';
import { motion, useReducedMotion, Variants, AnimatePresence } from 'framer-motion';

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
// MODE TOGGLE (with animated indicator)
// ============================================

function ModeToggle({ children, className = '' }: AnimationProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0, ease: easeOut }}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// TEMPLATES GRID WITH STAGGER
// ============================================

const gridVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0,
      delayChildren: 0,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 1, y: 0, scale: 1 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0,
      ease: easeOut,
    },
  },
};

function TemplatesGrid({ children, className = '' }: AnimationProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={gridVariants}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// TEMPLATE CARD WITH HOVER ANIMATIONS
// ============================================

interface TemplateCardProps extends AnimationProps {
  isHovered?: boolean;
}

function TemplateCard({ children, className = '', isHovered = false }: TemplateCardProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={cardVariants}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// HOVER OVERLAY (for "Use Template" button)
// ============================================

interface HoverOverlayProps {
  isVisible: boolean;
  children: ReactNode;
  className?: string;
}

function HoverOverlay({ isVisible, children, className = '' }: HoverOverlayProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return isVisible ? <div className={className}>{children}</div> : null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={className}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.15, delay: 0.05 }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ============================================
// SEARCH / FILTERS SECTION
// ============================================

function FiltersSection({ children, className = '' }: AnimationProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0, ease: easeOut }}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// CATEGORY BUTTON (for filter pills)
// ============================================

interface CategoryButtonProps extends AnimationProps {
  isActive: boolean;
}

function CategoryButton({ children, className = '', isActive }: CategoryButtonProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={{
        backgroundColor: isActive ? undefined : undefined,
      }}
      transition={{ duration: 0.15 }}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// BOTTOM CTA
// ============================================

function CTA({ children, className = '' }: AnimationProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: easeOut }}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// NO RESULTS ANIMATION
// ============================================

function NoResults({ children, className = '' }: AnimationProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: easeOut }}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// EXPORT
// ============================================

export const TemplatesAnimations = {
  Hero,
  ModeToggle,
  TemplatesGrid,
  TemplateCard,
  HoverOverlay,
  FiltersSection,
  CategoryButton,
  CTA,
  NoResults,
};
