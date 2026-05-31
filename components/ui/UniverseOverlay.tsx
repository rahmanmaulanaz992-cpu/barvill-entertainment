"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRef } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
  size: number;
  targetX: number;
  targetOpacity: number;
  mobileSafe: string;
}

export default function UniverseOverlay() {
  const prefersReducedMotion = useReducedMotion();

  // Use lazy useRef to keep component pure and avoid useMemo side-effect warnings
  const particlesRef = useRef<Particle[]>([]);
  if (particlesRef.current.length === 0) {
    particlesRef.current = Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 15 + Math.random() * 20,
      delay: Math.random() * -30,
      size: 1 + Math.random() * 2,
      // Pre-calculate animation targets to keep render pure
      targetX: Math.random() * 10 - 5,
      targetOpacity: Math.random() * 0.2 + 0.1,
      // Mobile Performance Safeguard: Hide 60% of particles on small screens
      mobileSafe: i < 8 ? "block" : "hidden md:block",
    }));
  }

  const particles = particlesRef.current;

  return (
    <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden" aria-hidden="true" style={{ transform: "translateZ(0)" }}>
      {/* Cinematic Gradient Fog (Slow Opacity Pulse) */}
      <motion.div
        animate={prefersReducedMotion ? { opacity: 0.05 } : { opacity: [0.03, 0.08, 0.03] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.04)_0%,transparent_70%)] mix-blend-screen will-change-opacity"
      />

      {/* Floating Particles Ecosystem */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ x: `${p.x}vw`, y: `${p.y}vh`, opacity: 0 }}
          animate={prefersReducedMotion ? { opacity: 0.1 } : {
            y: [`${p.y}vh`, `${p.y - 15}vh`, `${p.y}vh`],
            x: [`${p.x}vw`, `${p.x + p.targetX}vw`, `${p.x}vw`],
            opacity: [0, p.targetOpacity, 0],
          }}
          transition={{ duration: p.duration, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
          className={`absolute rounded-full bg-white mix-blend-screen will-change-transform ${p.mobileSafe}`}
          style={{
            width: p.size,
            height: p.size,
            filter: "blur(1px)",
            transform: "translateZ(0)",
          }}
        />
      ))}

      {/* Soft Vignette Depth Illusion Filter */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.2)_100%)] mix-blend-multiply" />
    </div>
  );
}