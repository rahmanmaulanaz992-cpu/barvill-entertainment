"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Cinematic smooth spring damping for luxury feel
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const springConfig = prefersReducedMotion 
    ? { damping: 100, stiffness: 1000, mass: 0.1 } 
    : { damping: 25, stiffness: 150, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    // Callback listener untuk mendeteksi perubahan kapabilitas pointer
    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
    };

    mediaQuery.addEventListener("change", handleMediaChange);

    // Menghindari sinkron setState di body useEffect, lakukan inisialisasi awal secara asinkron
    const initTimeout = setTimeout(() => {
      setIsDesktop(mediaQuery.matches);
    }, 0);

    return () => {
      clearTimeout(initTimeout);
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  useEffect(() => {
    // Jangan jalankan binding event mouse jika bukan di desktop
    if (!isDesktop) return;

    let ticking = false;
    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!ticking) {
        requestAnimationFrame(() => {
          if (!isVisible) setIsVisible(true);
          mouseX.set(e.clientX);
          mouseY.set(e.clientY);
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        window.getComputedStyle(target).cursor === "pointer"
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isDesktop, mouseX, mouseY, isVisible]);

  if (!isDesktop) return null;

  return (
    <>
      {/* Hide the default cursor specifically only when this component mounts on desktop */}
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
      
      {/* 1. Immersive Pointer Atmosphere (Soft Ambient Glow) */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.4 : 0.15,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className="fixed top-0 left-0 w-16 h-16 bg-white rounded-full blur-[15px] pointer-events-none z-40 mix-blend-screen"
        className="fixed top-0 left-0 w-16 h-16 bg-white rounded-full blur-[15px] pointer-events-none z-40 mix-blend-screen will-change-transform"
      />

      {/* 2. Hover Reactive Ring (Expands & morphs on Links/Buttons) */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 1 : 0.3,
          opacity: isHovering ? 1 : 0,
          borderWidth: isHovering ? "1px" : "0px",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="fixed top-0 left-0 w-12 h-12 border-white/40 rounded-full pointer-events-none z-50 mix-blend-screen"
        className="fixed top-0 left-0 w-12 h-12 border-white/40 rounded-full pointer-events-none z-50 mix-blend-screen will-change-transform"
      />

      {/* 3. Core Cursor Dot (Crisp & Minimal) */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 0 : 1,
          opacity: isHovering ? 0 : 1,
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-50 mix-blend-difference"
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-50 mix-blend-difference will-change-transform"
      />
    </>
  );
}