"use client";

import React from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export default function MagneticWrapper({ children }: { children: React.ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const prefersReducedMotion = useReducedMotion();

  // Apple inspired smooth subtle spring for magnetic feel
  const springConfig = prefersReducedMotion ? { damping: 100, stiffness: 1000, mass: 0.1 } : { damping: 25, stiffness: 150, mass: 0.5 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    // Subtle magnetic pull (15% of distance)
    x.set((clientX - centerX) * 0.15);
    y.set((clientY - centerY) * 0.15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div style={{ x: smoothX, y: smoothY }} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className="relative inline-flex">
      {children}
    </motion.div>
  );
}