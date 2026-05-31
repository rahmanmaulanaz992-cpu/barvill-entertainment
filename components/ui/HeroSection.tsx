"use client";

import React from "react";
import { motion, useTransform, type MotionValue, type Easing } from "framer-motion";

const cinematicEase: Easing = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 60, scale: 0.98, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: { duration: 2.4, ease: cinematicEase } }
};

const heroStaggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.3, delayChildren: 1.2 } }
};

interface HeroSectionProps {
  smoothX: MotionValue<number>;
  smoothY: MotionValue<number>;
  scrollY: MotionValue<number>;
  smoothScrollY: MotionValue<number>;
  featuredRelease: {
    title: string;
    artist: string;
  };
}

export default function HeroSection({ smoothX, smoothY, scrollY, smoothScrollY, featuredRelease }: HeroSectionProps) {
  const heroBgY = useTransform(smoothScrollY, [0, 1200], [0, 350]); 
  const heroTypoY = useTransform(smoothScrollY, [0, 1200], [0, -350]); 
  const heroContentY = useTransform(smoothScrollY, [0, 800], [0, 80]); 
  const heroOpacity = useTransform(scrollY, [0, 700], [1, 0]); 
  const heroDarken = useTransform(scrollY, [0, 900], [0, 1]); 

  const bgX = useTransform(smoothX, [-1, 1], ["-1.5vw", "1.5vw"]);
  const bgY = useTransform(smoothY, [-1, 1], ["-1.5vh", "1.5vh"]);
  const typoFarX = useTransform(smoothX, [-1, 1], ["-2.5vw", "2.5vw"]);
  const typoFarY = useTransform(smoothY, [-1, 1], ["-2.5vh", "2.5vh"]);
  const typoMidX = useTransform(smoothX, [-1, 1], ["3vw", "-3vw"]);
  const typoMidY = useTransform(smoothY, [-1, 1], ["3vh", "-3vh"]);
  const typoNearX = useTransform(smoothX, [-1, 1], ["-6vw", "6vw"]);
  const typoNearY = useTransform(smoothY, [-1, 1], ["-6vh", "6vh"]);
  const fgX = useTransform(smoothX, [-1, 1], ["1.5vw", "-1.5vw"]);
  const fgY = useTransform(smoothY, [-1, 1], ["1.5vh", "-1.5vh"]);
  const rotateX = useTransform(smoothY, [-1, 1], ["8deg", "-8deg"]);
  const rotateY = useTransform(smoothX, [-1, 1], ["-8deg", "8deg"]);
  const typoRotateX = useTransform(smoothY, [-1, 1], ["-12deg", "12deg"]);
  const typoRotateY = useTransform(smoothX, [-1, 1], ["12deg", "-12deg"]);

  return (
    <section className="relative w-full h-svh flex flex-col items-center justify-center px-4 md:px-8 overflow-hidden bg-black perspective-[1200px]" style={{ perspective: "1200px" }}>
      
      {/* Layer 1: Background Depth */}
      <motion.div style={{ y: heroBgY }} className="absolute inset-0 z-0 pointer-events-none will-change-transform">
        <motion.div 
          initial={{ opacity: 0, scale: 1.15 }}
          animate={{ opacity: 1, scale: 1.1 }}
          transition={{ duration: 4, ease: "easeOut" }}
          style={{ x: bgX, y: bgY }} 
          className="absolute inset-0 will-change-transform"
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?auto=format&fit=crop&q=80')] bg-cover bg-center grayscale opacity-15" />
          <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/80 to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#000000_100%)] opacity-95" />
        </motion.div>
        <motion.div style={{ opacity: heroDarken }} className="absolute inset-0 bg-black z-30 pointer-events-none" />
      </motion.div>

      {/* Layer 2: Atmosphere & Light Leaks */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <motion.div 
          animate={{ opacity: [0.02, 0.06, 0.02], scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,1)_0%,transparent_60%)] blur-[100px] mix-blend-screen will-change-transform" 
        />
        <motion.div 
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#000_100%)] opacity-90 mix-blend-multiply" 
        />
      </div>

      {/* Layer 3: Massive Typography System */}
      <motion.div style={{ y: heroTypoY, rotateX: typoRotateX, rotateY: typoRotateY }} className="absolute inset-0 z-10 overflow-hidden pointer-events-none select-none flex items-center justify-center will-change-transform">
          {/* FAR LAYER */}
          <motion.div style={{ x: typoFarX, y: typoFarY }} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 6, delay: 0.2, ease: cinematicEase }} className="absolute top-[5%] -left-[10%] whitespace-nowrap will-change-transform mix-blend-screen flex flex-col items-start">
            <motion.h2 animate={{ opacity: [0.02, 0.06, 0.02], filter: ["blur(32px)", "blur(48px)", "blur(32px)"], scale: [0.98, 1.02, 0.98] }} transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }} className="text-[35vw] font-extralight tracking-tighter text-white uppercase leading-none">
              {featuredRelease.artist}
            </motion.h2>
          </motion.div>
          {/* MID LAYER */}
          <motion.div style={{ x: typoMidX, y: typoMidY }} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 5, delay: 0.8, ease: cinematicEase }} className="absolute top-[25%] -right-[15%] whitespace-nowrap will-change-transform mix-blend-screen flex flex-col items-end">
            <motion.h2 animate={{ opacity: [0.05, 0.12, 0.05], filter: ["blur(12px)", "blur(20px)", "blur(12px)"], scale: [1, 1.03, 1] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="text-[28vw] font-light tracking-widest text-transparent uppercase leading-none" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>
              BARVILL
            </motion.h2>
          </motion.div>
          {/* NEAR LAYER */}
          <motion.div style={{ x: typoNearX, y: typoNearY }} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 4, delay: 1.4, ease: cinematicEase }} className="absolute bottom-[5%] -left-[5%] whitespace-nowrap will-change-transform mix-blend-screen flex flex-col items-start">
            <motion.h2 animate={{ opacity: [0.03, 0.08, 0.03], filter: ["blur(8px)", "blur(16px)", "blur(8px)"], scale: [1.02, 0.98, 1.02] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 4 }} className="text-[22vw] font-medium tracking-tight text-white uppercase leading-none">
              {featuredRelease.title}
            </motion.h2>
          </motion.div>
      </motion.div>

      {/* Layer 4: Foreground Focal Point */}
      <motion.div style={{ y: heroContentY, opacity: heroOpacity }} className="relative z-20 text-center flex flex-col items-center max-w-5xl mx-auto will-change-transform">
        <motion.div style={{ x: fgX, y: fgY, rotateX, rotateY }} variants={heroStaggerContainer} initial="hidden" animate="visible" className="flex flex-col items-center will-change-transform">

          <motion.h1 variants={fadeUp} className="flex flex-col items-center text-6xl md:text-8xl lg:text-[10rem] font-light tracking-tight leading-[0.85] text-white uppercase mb-12 relative z-20">
            <motion.span 
              animate={{ textShadow: ["0px 0px 10px rgba(255,255,255,0.1)", "0px 0px 40px rgba(255,255,255,0.3)", "0px 0px 10px rgba(255,255,255,0.1)"] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="block text-white"
            >
              BARVILL
            </motion.span>
            <span className="block text-3xl md:text-5xl lg:text-[4rem] text-white/20 font-extralight tracking-[0.3em] mt-4 italic drop-shadow-none">ENTERTAINMENT</span>
          </motion.h1>

          <motion.div variants={fadeUp} className="flex flex-col items-center gap-8 text-center relative z-20 mt-4">
            <p className="text-white/60 leading-[2] tracking-[0.12em]">
              Menampilkan rilisan terbaru dari Barvill:<br />
              &quot;{featuredRelease.title}&quot; oleh {featuredRelease.artist}.<br />
              <br />
              Dengarkan sekarang.
            </p>
            
            <button className="relative overflow-hidden group border border-white/10 hover:border-white/30 bg-transparent px-10 py-5 text-[10px] tracking-[0.4em] uppercase text-white cursor-pointer flex items-center justify-center gap-4 transition-colors duration-700 ease-[0.16,1,0.3,1]">
              <span className="relative z-10 transition-colors duration-700 ease-[0.16,1,0.3,1] group-hover:text-black font-medium">LISTEN NOW</span>
              <div className="absolute inset-0 bg-white scale-y-0 origin-bottom transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:scale-y-100" />
            </button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div style={{ opacity: heroOpacity }} className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5, duration: 2, ease: cinematicEase }}
          className="flex flex-col items-center gap-6"
        >
          <div className="w-px h-20 md:h-24 bg-linear-to-b from-white/0 via-white/50 to-white/0 animate-pulse" />
          <span className="text-[8px] md:text-[9px] tracking-[0.5em] text-white/40 uppercase font-medium">Scroll</span>
        </motion.div>
      </motion.div>
    </section>
  );
}