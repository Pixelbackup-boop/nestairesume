'use client';

import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

interface CountUpProps {
  /** Target number to count up to */
  value: number;
  /** Animation duration in seconds */
  duration?: number;
  /** Number of decimal places */
  decimals?: number;
  /** Prefix (e.g., "$") */
  prefix?: string;
  /** Suffix (e.g., "%", "+") */
  suffix?: string;
  /** CSS class for the number */
  className?: string;
  /** Start animation when element enters viewport */
  once?: boolean;
}

export function CountUp({
  value,
  duration = 2,
  decimals = 0,
  prefix = '',
  suffix = '',
  className = '',
  once = true,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, amount: 0.5 });
  const prefersReducedMotion = useReducedMotion();

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 50,
    stiffness: 100,
    duration: duration * 1000,
  });

  useEffect(() => {
    if (isInView && !prefersReducedMotion) {
      motionValue.set(value);
    } else if (prefersReducedMotion) {
      // Immediately show final value if reduced motion
      motionValue.set(value);
    }
  }, [isInView, value, motionValue, prefersReducedMotion]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      if (ref.current) {
        const formatted = decimals > 0
          ? latest.toFixed(decimals)
          : Math.round(latest).toLocaleString();
        ref.current.textContent = `${prefix}${formatted}${suffix}`;
      }
    });

    return () => unsubscribe();
  }, [springValue, prefix, suffix, decimals]);

  // Show initial value or final value based on reduced motion preference
  const initialDisplay = prefersReducedMotion
    ? `${prefix}${decimals > 0 ? value.toFixed(decimals) : value.toLocaleString()}${suffix}`
    : `${prefix}0${suffix}`;

  return (
    <span ref={ref} className={className}>
      {initialDisplay}
    </span>
  );
}
