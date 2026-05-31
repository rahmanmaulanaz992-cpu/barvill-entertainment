"use client";

import React from "react";
import { motion, useTransform, useSpring, type MotionValue } from "framer-motion";

interface EnvironmentHUDProps {
  smoothX: MotionValue<number>;
  smoothY: MotionValue<number>;
  scrollY: MotionValue<number>;
  scrollYProgress: MotionValue<number>;
}

export default function EnvironmentHUD({ smoothX, smoothY, scrollY, scrollYProgress }: EnvironmentHUDProps) {
  const envX = useTransform(smoothX, [-1, 1], ["-2%", "2%"]);
  const envY = useTransform(smoothY, [-1, 1], ["-2%", "2%"]);

  const scrollProgress = useSpring(scrollYProgress, { damping: 50, stiffness: 40 });
  const progressHeight = useTransform(scrollProgress, [0, 1], ["0%", "100%"]);
  const progressOpacity = useTransform(scrollY, [0, 300], [0, 1]);

  return (
    <>
      {/* Environmental Identity Fragment */}
      <div className="fixed top-8 left-4 md:left-8 z-50 pointer-events-none mix-blend-screen opacity-40" aria-hidden="true">
        <p className="text-[8px] md:text-[9px] tracking-[0.4em] font-mono text-white/40 uppercase leading-relaxed flex flex-col gap-1">
          <span>LOC: BARVILL_SPACE</span>
          <motion.span animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>ATMOSPHERE: HEAVY</motion.span>
          <span>RESONANCE: <motion.span animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>ACTIVE</motion.span></span>
        </p>
      </div>

      <motion.div 
        animate={{ opacity: [0.03, 0.06, 0.03] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="fixed inset-0 z-50 pointer-events-none mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Sonic Resonance Illusion (Deep Sub-bass breathing) */}
      <motion.div
        animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.02, 0.06, 0.02] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] aspect-square rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_60%)] mix-blend-screen pointer-events-none z-0 transform-gpu"
        aria-hidden="true"
      />

      {/* Environmental Fog Layers */}
      <motion.div style={{ x: envX, y: envY }} className="fixed inset-0 z-0 pointer-events-none mix-blend-screen opacity-15">
        <motion.div 
          animate={{ x: ["-5%", "5%", "-5%"], y: ["-2%", "2%", "-2%"], scale: [1, 1.05, 1], opacity: [0.05, 0.12, 0.05] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vh] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06)_0%,transparent_60%)] blur-[100px] will-change-transform"
        />
        <motion.div 
          animate={{ x: ["5%", "-5%", "5%"], y: ["2%", "-2%", "2%"], scale: [1.05, 1, 1.05], opacity: [0.03, 0.1, 0.03] }}
          transition={{ duration: 40, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="absolute -bottom-[20%] -right-[10%] w-[80vw] h-[80vh] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.04)_0%,transparent_60%)] blur-[120px] will-change-transform hidden md:block"
        />
      </motion.div>

      {/* Global Scroll Progress Bar */}
      <motion.div style={{ opacity: progressOpacity }} className="fixed right-4 md:right-8 top-[20%] bottom-[20%] w-px bg-white/5 z-50 pointer-events-none hidden md:block">
        <motion.div style={{ height: progressHeight }} className="w-full bg-white/60 shadow-[0_0_12px_rgba(255,255,255,0.4)] origin-top will-change-transform" />
        <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[7px] font-mono tracking-[0.3em] text-white/30">Z: 00</span>
        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[7px] font-mono tracking-[0.3em] text-white/30">Z: 99</span>
      </motion.div>
    </>
  );
}