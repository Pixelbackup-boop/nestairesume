'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: Direction;
  className?: string;
  /** Set to true for elements that should animate when they enter viewport */
  once?: boolean;
  /** Amount of element that needs to be visible (0-1) */
  threshold?: number;
}

const directionOffsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 30 },
  down: { x: 0, y: -30 },
  left: { x: 30, y: 0 },
  right: { x: -30, y: 0 },
  none: { x: 0, y: 0 },
};

export function FadeIn({
  children,
  delay = 0,
  duration = 0.5,
  direction = 'up',
  className = '',
  once = true,
  threshold = 0.1,
}: FadeInProps) {
  const prefersReducedMotion = useReducedMotion();
  const offset = directionOffsets[direction];

  // Skip animation if user prefers reduced motion
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount: threshold }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1], // Cubic bezier for smooth feel
      }}
    >
      {children}
    </motion.div>
  );
}

/** FadeIn that triggers immediately on mount (not viewport-based) */
export function FadeInOnMount({
  children,
  delay = 0,
  duration = 0.5,
  direction = 'up',
  className = '',
}: Omit<FadeInProps, 'once' | 'threshold'>) {
  const prefersReducedMotion = useReducedMotion();
  const offset = directionOffsets[direction];

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
