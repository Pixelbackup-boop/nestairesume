'use client';

import { motion, useReducedMotion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

interface StaggerContainerProps {
  children: ReactNode;
  /** Delay between each child animation */
  staggerDelay?: number;
  /** Initial delay before animations start */
  delay?: number;
  className?: string;
  /** Animate when entering viewport */
  once?: boolean;
  /** Amount of container that needs to be visible (0-1) */
  threshold?: number;
}

const containerVariants: Variants = {
  hidden: {},
  visible: (custom: { staggerDelay: number; delay: number }) => ({
    transition: {
      staggerChildren: custom.staggerDelay,
      delayChildren: custom.delay,
    },
  }),
};

export function StaggerContainer({
  children,
  staggerDelay = 0.1,
  delay = 0,
  className = '',
  once = true,
  threshold = 0.1,
}: StaggerContainerProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      variants={containerVariants}
      custom={{ staggerDelay, delay }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  /** Direction the item fades in from */
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

const itemDirectionOffsets = {
  up: { y: 20 },
  down: { y: -20 },
  left: { x: 20 },
  right: { x: -20 },
  none: {},
};

export function StaggerItem({
  children,
  className = '',
  direction = 'up',
}: StaggerItemProps) {
  const offset = itemDirectionOffsets[direction];

  const itemVariants: Variants = {
    hidden: { opacity: 0, ...offset },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}

/** Grid-specific stagger for card layouts */
export function StaggerGrid({
  children,
  staggerDelay = 0.08,
  className = '',
}: StaggerContainerProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
