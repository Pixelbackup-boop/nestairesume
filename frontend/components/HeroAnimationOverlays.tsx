'use client';

import { motion } from 'framer-motion';

// AI Robot Pen
function AIRobotPen() {
  const penPositions = [
    { x: 120, y: 40 },
    { x: 200, y: 130 },
    { x: 180, y: 175 },
    { x: 200, y: 225 },
    { x: 180, y: 290 },
    { x: 200, y: 350 },
    { x: 150, y: 450 },
    { x: 350, y: 260 },
  ];

  return (
    <motion.div
      className="absolute pointer-events-none z-30"
      style={{ width: 80, height: 100 }}
      initial={{ x: 350, y: 80, opacity: 0, rotate: 25 }}
      animate={{
        x: penPositions.map(p => p.x),
        y: penPositions.map(p => p.y),
        opacity: [0, 1, 1, 1, 1, 1, 1, 0],
        rotate: [25, 20, 15, 18, 15, 18, 15, 25],
      }}
      transition={{
        duration: 2.8,
        times: [0, 0.07, 0.16, 0.25, 0.34, 0.43, 0.52, 1],
        ease: 'easeInOut',
      }}
    >
      <svg width="80" height="100" viewBox="0 0 80 100" fill="none">
        <defs>
          <linearGradient id="robotGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <linearGradient id="armGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#64748b" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
          <filter id="robotGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id="penTipGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="2" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <g filter="url(#robotGlow)">
          <ellipse cx="40" cy="24" rx="22" ry="18" fill="url(#robotGradient)" />
          <path d="M28 18 C32 22, 36 18, 40 22 C44 18, 48 22, 52 18" stroke="#fff" strokeWidth="2" fill="none" opacity="0.5" />
          <path d="M30 28 C34 24, 38 28, 42 24 C46 28, 50 24, 52 28" stroke="#fff" strokeWidth="1.5" fill="none" opacity="0.3" />
          <text x="40" y="28" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold" fontFamily="system-ui, sans-serif">AI</text>
          <line x1="40" y1="6" x2="40" y2="12" stroke="#94a3b8" strokeWidth="2" />
          <circle cx="40" cy="4" r="3" fill="#22d3ee" opacity="0.8" />
          <circle cx="18" cy="24" r="2" fill="#22d3ee" opacity="0.7" />
          <circle cx="62" cy="24" r="2" fill="#22d3ee" opacity="0.7" />
        </g>

        <g>
          <rect x="35" y="42" width="10" height="20" rx="3" fill="url(#armGradient)" />
          <circle cx="40" cy="62" r="6" fill="#64748b" stroke="#94a3b8" strokeWidth="1" />
          <rect x="36" y="62" width="8" height="18" rx="2" fill="url(#armGradient)" />
        </g>

        <g filter="url(#penTipGlow)">
          <path d="M36 80 L40 98 L44 80 Z" fill="url(#robotGradient)" />
          <circle cx="40" cy="96" r="4" fill="#3b82f6" opacity="0.8" />
        </g>
      </svg>
    </motion.div>
  );
}

// Sparkle effects
function WritingSparkles() {
  const sparklePositions = [
    { x: 140, y: 60, delay: 0.1, size: 16 },
    { x: 220, y: 150, delay: 0.35, size: 18 },
    { x: 200, y: 195, delay: 0.55, size: 12 },
    { x: 220, y: 245, delay: 0.75, size: 16 },
    { x: 200, y: 310, delay: 0.95, size: 14 },
    { x: 220, y: 370, delay: 1.15, size: 18 },
    { x: 170, y: 470, delay: 1.35, size: 16 },
    { x: 130, y: 85, delay: 0.2, size: 10 },
    { x: 240, y: 175, delay: 0.45, size: 12 },
    { x: 190, y: 275, delay: 0.85, size: 11 },
  ];

  return (
    <>
      {sparklePositions.map((pos, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute pointer-events-none"
          style={{ left: pos.x, top: pos.y, width: pos.size, height: pos.size }}
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0], rotate: [0, 180, 360] }}
          transition={{ delay: pos.delay, duration: 0.5, ease: 'easeOut' }}
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
            <path
              d="M12 2L13.5 9L20 10.5L13.5 12L12 19L10.5 12L4 10.5L10.5 9L12 2Z"
              fill="#fbbf24"
              filter="drop-shadow(0 0 4px #fbbf24)"
            />
          </svg>
        </motion.div>
      ))}
    </>
  );
}

// Magic floating particles
function MagicParticles() {
  const particles = [
    { x: 280, y: 90, delay: 0.2 },
    { x: 290, y: 180, delay: 0.5 },
    { x: 285, y: 270, delay: 0.8 },
    { x: 295, y: 360, delay: 1.1 },
    { x: 10, y: 110, delay: 0.3 },
    { x: 5, y: 220, delay: 0.7 },
    { x: 15, y: 330, delay: 1.0 },
    { x: 8, y: 470, delay: 1.4 },
  ];

  return (
    <>
      {particles.map((p, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-2 h-2 rounded-full pointer-events-none"
          style={{
            left: p.x,
            top: p.y,
            background: i % 2 === 0 ? '#3b82f6' : '#8b5cf6',
            boxShadow: `0 0 8px ${i % 2 === 0 ? '#3b82f6' : '#8b5cf6'}`,
          }}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: [0, 1, 0], y: [0, -30, -60], x: [0, i % 2 === 0 ? 10 : -10, 0] }}
          transition={{ delay: p.delay, duration: 1, ease: 'easeOut' }}
        />
      ))}
    </>
  );
}

export default function HeroAnimationOverlays() {
  return (
    <>
      <AIRobotPen />
      <WritingSparkles />
      <MagicParticles />
    </>
  );
}
