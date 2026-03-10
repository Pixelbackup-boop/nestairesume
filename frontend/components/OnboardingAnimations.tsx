'use client';

import { ReactNode } from 'react';
import { motion, useReducedMotion, Variants, AnimatePresence } from 'framer-motion';

interface AnimationProps {
  children?: ReactNode;
  className?: string;
}

// Shared easing
const easeOut: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

// ============================================
// MODAL BACKDROP
// ============================================

interface BackdropProps extends AnimationProps {
  onClick?: () => void;
}

function Backdrop({ children, className = '', onClick }: BackdropProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className={className} onClick={onClick}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// MODAL CONTAINER (scale + fade)
// ============================================

function Modal({ children, className = '' }: AnimationProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 10 }}
      transition={{ duration: 0.25, ease: easeOut }}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// STEP CONTAINER (for AnimatePresence)
// ============================================

interface StepProps extends AnimationProps {
  stepKey: number | string;
  direction?: 'forward' | 'backward';
}

const stepVariants: Variants = {
  enter: (direction: string) => ({
    opacity: 0,
    x: direction === 'forward' ? 30 : -30,
  }),
  center: {
    opacity: 1,
    x: 0,
  },
  exit: (direction: string) => ({
    opacity: 0,
    x: direction === 'forward' ? -30 : 30,
  }),
};

function Step({ children, className = '', stepKey, direction = 'forward' }: StepProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      key={stepKey}
      className={className}
      custom={direction}
      variants={stepVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.35, ease: easeOut }}
    >
      {children}
    </motion.div>
  );
}

// Wrapper for AnimatePresence with mode
function StepContainer({ children, className = '' }: AnimationProps) {
  return (
    <div className={className}>
      <AnimatePresence mode="wait">{children}</AnimatePresence>
    </div>
  );
}

// ============================================
// PROGRESS DOT (with scale animation)
// ============================================

interface ProgressDotProps {
  isActive: boolean;
  isCompleted: boolean;
  className?: string;
}

function ProgressDot({ isActive, isCompleted: _isCompleted, className = '' }: ProgressDotProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className} />;
  }

  return (
    <motion.div
      className={className}
      animate={{
        scale: isActive ? 1.25 : 1,
      }}
      transition={{ duration: 0.3, ease: easeOut }}
    />
  );
}

// ============================================
// FORM FIELDS STAGGER
// ============================================

const formContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const formFieldVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: easeOut,
    },
  },
};

function FormContainer({ children, className = '' }: AnimationProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={formContainerVariants}
    >
      {children}
    </motion.div>
  );
}

function FormField({ children, className = '' }: AnimationProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={formFieldVariants}>
      {children}
    </motion.div>
  );
}

// ============================================
// METHOD CARDS (for step 1)
// ============================================

const methodGridVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const methodCardVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: easeOut,
    },
  },
};

function MethodGrid({ children, className = '' }: AnimationProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={methodGridVariants}
    >
      {children}
    </motion.div>
  );
}

function MethodCard({ children, className = '' }: AnimationProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={methodCardVariants}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// TEMPLATE CARDS (for step 4)
// ============================================

const templateGridVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const templateCardVariants: Variants = {
  hidden: { opacity: 0, y: 15, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.35,
      ease: easeOut,
    },
  },
};

function TemplateGrid({ children, className = '' }: AnimationProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={templateGridVariants}
    >
      {children}
    </motion.div>
  );
}

function TemplateCard({ children, className = '' }: AnimationProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={templateCardVariants}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// PROCESSING MESSAGE (fade between messages)
// ============================================

interface ProcessingMessageProps {
  message: string;
  className?: string;
}

function ProcessingMessage({ message, className = '' }: ProcessingMessageProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <p className={className}>{message}</p>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.p
        key={message}
        className={className}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -5 }}
        transition={{ duration: 0.2 }}
      >
        {message}
      </motion.p>
    </AnimatePresence>
  );
}

// ============================================
// SELECTED CHECKMARK
// ============================================

function Checkmark({ children, className = '' }: AnimationProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.2, ease: easeOut }}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// EXPORT
// ============================================

export const OnboardingAnimations = {
  Backdrop,
  Modal,
  Step,
  StepContainer,
  ProgressDot,
  FormContainer,
  FormField,
  MethodGrid,
  MethodCard,
  TemplateGrid,
  TemplateCard,
  ProcessingMessage,
  Checkmark,
};
