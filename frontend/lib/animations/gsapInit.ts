import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Helper to check if user prefers reduced motion
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Safe animation wrapper - skips if reduced motion preferred
export function animateIfAllowed(
  target: gsap.TweenTarget,
  vars: gsap.TweenVars
): gsap.core.Tween | null {
  if (prefersReducedMotion()) return null;
  return gsap.to(target, vars);
}

// Create a scroll-triggered animation (returns null if reduced motion)
export function scrollTriggerAnimation(
  target: gsap.TweenTarget,
  vars: gsap.TweenVars,
  scrollTriggerVars: ScrollTrigger.Vars
): gsap.core.Tween | null {
  if (prefersReducedMotion()) return null;

  return gsap.to(target, {
    ...vars,
    scrollTrigger: {
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse',
      ...scrollTriggerVars,
    },
  });
}

// Stagger animation for multiple elements
export function staggerAnimation(
  targets: gsap.TweenTarget,
  vars: gsap.TweenVars,
  stagger: number | gsap.StaggerVars = 0.1
): gsap.core.Tween | null {
  if (prefersReducedMotion()) return null;

  return gsap.to(targets, {
    ...vars,
    stagger,
  });
}

// Timeline factory with reduced motion check
export function createTimeline(
  vars?: gsap.TimelineVars
): gsap.core.Timeline | null {
  if (prefersReducedMotion()) return null;
  return gsap.timeline(vars);
}

// Cleanup helper for React useEffect
export function cleanupScrollTriggers(triggerId?: string): void {
  if (triggerId) {
    ScrollTrigger.getById(triggerId)?.kill();
  } else {
    ScrollTrigger.getAll().forEach((st) => st.kill());
  }
}

// Export for direct usage
export { gsap, ScrollTrigger };
