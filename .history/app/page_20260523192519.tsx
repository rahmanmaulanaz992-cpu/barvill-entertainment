"use client";

import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring, useScroll, useTransform, Variants } from "framer-motion";
import TextReveal from "@/components/ui/TextReveal";

// --- MAGNETIC BUTTON COMPONENT ---
function MagneticWrapper({ children }: { children: React.ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Apple inspired smooth subtle spring for magnetic feel
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    // Subtle magnetic pull (15% of distance)
    x.set((clientX - centerX) * 0.15);
    y.set((clientY - centerY) * 0.15);
  };

  const handleMouseLeave = () => {
    // Return to origin
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ x: smoothX, y: smoothY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative inline-flex"
    >
      {children}
    </motion.div>
  );
}

// --- CINEMATIC DIVIDER COMPONENT ---
function CinematicDivider() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Cinematic section transition overlay (Black & Blur)
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 0.8, 0.8, 0]);
  const lightOpacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 0.1, 0.1, 0]);
  const lightY = useTransform(scrollYProgress, [0, 1], ["-30%", "30%"]);

  return (
    <>
      {/* --- CINEMATIC SECTION TRANSITION OVERLAY --- */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="fixed inset-0 w-screen h-screen pointer-events-none z-30 flex items-center justify-center"
      >
        {/* Base dark blend with blur for immersive scene transition */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />
        
        {/* Cinematic light leak crossfade atmosphere */}
        <motion.div
          style={{ opacity: lightOpacity, y: lightY }}
          className="absolute w-screen h-[40vh] bg-white blur-[120px] rounded-full mix-blend-screen"
        />
      </motion.div>

      <div ref={containerRef} className="relative w-full h-24 md:h-40 flex items-center justify-center z-10 overflow-hidden">
      {/* Core Crisp Line */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        viewport={{ once: true }}
        className="absolute w-full max-w-5xl h-px bg-linear-to-r from-transparent via-white/15 to-transparent origin-center"
      />
      {/* Soft Blur Atmosphere */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: [0, 0.3, 0.1], scaleX: 1 }}
        transition={{ duration: 3, ease: "easeInOut", delay: 0.2 }}
        viewport={{ once: true }}
        className="absolute w-3/4 max-w-3xl bg-white/20 blur-[10px] rounded-full origin-center"
        style={{ height: "3px" }}
      />
      {/* Vertical Depth Gradient */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        viewport={{ once: true }}
        className="absolute inset-0 bg-linear-to-b from-transparent via-white/2 to-transparent pointer-events-none"
      />
      </div>
    </>
  );
}

// --- CINEMATIC REVEAL ANIMATION SYSTEM ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Jeda stagger yang elegan antar elemen
      delayChildren: 0.1,
    },
  },
};

const itemFadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.6, ease: [0.16, 1, 0.3, 1] }, // Apple-like smooth cubic-bezier
  },
};

const itemBlurFadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(12px)", scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: { duration: 1.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const itemLineYVariants: Variants = {
  hidden: { opacity: 0, scaleY: 0, originY: 0 },
  visible: { opacity: 1, scaleY: 1, originY: 0, transition: { duration: 1.8, ease: [0.16, 1, 0.3, 1] } },
};

const itemLineXVariants: Variants = {
  hidden: { opacity: 0, scaleX: 0 },
  visible: { opacity: 1, scaleX: 1, transition: { duration: 1.8, ease: [0.16, 1, 0.3, 1] } },
};

export default function Home() {
  // --- MOUSE TRACKING SYSTEM ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Cinematic smooth spring damping for luxury feel
  const smoothX = useSpring(mouseX, { damping: 40, stiffness: 50, mass: 1.5 });
  const smoothY = useSpring(mouseY, { damping: 40, stiffness: 50, mass: 1.5 });

  // Layered Immersive Mouse Parallax
  const bgMouseX = useTransform(smoothX, [0, 1920], [-15, 15]); // Background (Lambat/Dalam)
  const bgMouseY = useTransform(smoothY, [0, 1080], [-15, 15]);
  const midMouseX = useTransform(smoothX, [0, 1920], [-30, 30]); // Midground (Sedang)
  const midMouseY = useTransform(smoothY, [0, 1080], [-30, 30]);
  const fgMouseX = useTransform(smoothX, [0, 1920], [-60, 60]); // Foreground (Cepat/Dekat lensa)
  const fgMouseY = useTransform(smoothY, [0, 1080], [-60, 60]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);


  // --- SCROLL TRACKING SYSTEM (Cinematic Parallax) ---
  const { scrollY, scrollYProgress } = useScroll();
  const scrollProgressSpring = useSpring(scrollYProgress, { damping: 40, stiffness: 100, mass: 0.5 });
  const scrollBarOpacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]); // Fade in/out dynamically

  // Premium Cinematic Smooth Parallax Basis
  const parallaxScrollY = useSpring(scrollY, { damping: 45, stiffness: 120, mass: 0.5 });

  // Layered Depth Illusion System
  const bgY = useTransform(parallaxScrollY, [0, 4000], [0, 300]); // Deep background (paling lambat)
  const glowY1 = useTransform(parallaxScrollY, [0, 4000], [0, 150]); // Ambient slow glow
  const glowY2 = useTransform(parallaxScrollY, [0, 4000], [0, 250]); // Ambient mid glow
  const midY1 = useTransform(parallaxScrollY, [0, 4000], [0, 80]); // Midground belakang
  const midY2 = useTransform(parallaxScrollY, [0, 4000], [0, -120]); // Midground depan
  const fgY1 = useTransform(parallaxScrollY, [0, 4000], [0, -250]); // Foreground bokeh lambat
  const fgY2 = useTransform(parallaxScrollY, [0, 4000], [0, -450]); // Foreground bokeh cepat (ilusi lensa dekat)

  // --- FAKE WEBGL ENVIRONMENTAL DEPTH SYSTEM ---
  const envY1 = useTransform(parallaxScrollY, [0, 4000], [0, 200]); // Float up slightly
  const envY2 = useTransform(parallaxScrollY, [0, 4000], [0, -150]); // Float down slightly
  const envY3 = useTransform(parallaxScrollY, [0, 4000], [0, 300]); // Deep core float

  const heroY = useTransform(parallaxScrollY, [0, 800], [0, 150]); // Teks hero tertinggal cinematic
  const heroOpacity = useTransform(parallaxScrollY, [0, 500], [1, 0]); // Teks hero memudar elegan
  const heroScale = useTransform(parallaxScrollY, [0, 500], [1, 0.95]); // Teks hero mengecil perlahan

  // --- DYNAMIC ATMOSPHERE TRANSITION SYSTEM ---
  // Mood layers reacting to scroll progress for immersive scene changes
  const moodHero = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const moodAbout = useTransform(scrollYProgress, [0.15, 0.35, 0.55], [0, 1, 0]);
  const moodArtists = useTransform(scrollYProgress, [0.45, 0.65, 0.85], [0, 1, 0]);
  const moodFooter = useTransform(scrollYProgress, [0.75, 0.9, 1], [0, 1, 1]);

  const artists = [
    { name: "BOYZAI", category: "HIP-HOP / RAP" },
    { name: "NOVIELLE", category: "R&B / SOUL" },
    { name: "G-MARTYR", category: "ALTERNATIVE" },
    { name: "VO-ICE", category: "ELECTRONIC" },
  ];

  return (
    <main className="relative w-full bg-black text-white flex flex-col overflow-x-hidden">
      {/* --- CINEMATIC FILM GRAIN OVERLAY --- */}
      <motion.div
        animate={{
          x: ["0%", "-1%", "0.5%", "-0.5%", "0%"],
          y: ["0%", "0.5%", "-1%", "1%", "0%"],
          opacity: [0.03, 0.05, 0.03]
        }}
        transition={{
          x: { duration: 15, repeat: Infinity, ease: "linear" },
          y: { duration: 20, repeat: Infinity, ease: "linear" },
          opacity: { duration: 8, repeat: Infinity, ease: "easeInOut" }
        }}
        className="fixed top-[-50%] left-[-50%] w-[200%] h-[200%] pointer-events-none z-40 mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* --- GLOBAL SCROLL PROGRESS INDICATOR --- */}
      <motion.div
        style={{ opacity: scrollBarOpacity }}
        className="fixed right-2 md:right-6 top-1/4 bottom-1/4 w-px bg-white/10 z-50 pointer-events-none mix-blend-screen hidden sm:block"
      >
        <motion.div
          style={{ scaleY: scrollProgressSpring }}
        className="w-full h-full bg-linear-to-b from-white/20 via-white/80 to-white/20 origin-top shadow-[0_0_15px_rgba(255,255,255,0.5)]"
        />
      </motion.div>

      {/* --- CINEMATIC BACKGROUND SYSTEM --- */}

      {/* 1. Base Gradient Cinematic Hitam (Parallax) */}
      <motion.div 
        style={{ y: bgY }}
        className="fixed inset-0 w-full h-screen bg-linear-to-b from-neutral-950 to-black pointer-events-none z-0" 
      />

      {/* --- DYNAMIC ATMOSPHERE TRANSITION SYSTEM --- */}
      <div className="fixed inset-0 w-full h-screen pointer-events-none z-0 mix-blend-screen">
        {/* Mood 1: Hero (Top Ambient Light) */}
        <motion.div style={{ opacity: moodHero }} className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06)_0%,transparent_60%)]" />
        {/* Mood 2: About (Center Calm Glow) */}
        <motion.div style={{ opacity: moodAbout }} className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]" />
        {/* Mood 3: Artists (Edgy Dual Side Glow) */}
        <motion.div style={{ opacity: moodArtists }} className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(255,255,255,0.04)_0%,transparent_60%),radial-gradient(ellipse_at_right,rgba(255,255,255,0.04)_0%,transparent_60%)]" />
        {/* Mood 4: Footer (Bottom Heavy Ground Glow) */}
        <motion.div style={{ opacity: moodFooter }} className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(255,255,255,0.06)_0%,transparent_60%)]" />
      </div>

      {/* --- FAKE WEBGL ENVIRONMENTAL RENDERING SYSTEM --- */}
      <motion.div className="fixed inset-0 w-full h-screen pointer-events-none z-0 mix-blend-screen">
        {/* Environmental Volumetric Layer 1 */}
        <motion.div style={{ y: envY1 }} className="absolute inset-0 w-full h-full pointer-events-none">
          <motion.div
            animate={{ 
              x: ["-5vw", "10vw", "-5vw"],
              y: ["-5vh", "5vh", "-5vh"],
              scale: [1, 1.15, 1],
              opacity: [0.01, 0.03, 0.01]
            }}
            transition={{ duration: 45, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-20%] left-[-20%] w-[140vw] h-[140vh] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.04)_0%,transparent_60%)] blur-[100px]"
          />
        </motion.div>

        {/* Environmental Volumetric Layer 2 */}
        <motion.div style={{ y: envY2 }} className="absolute inset-0 w-full h-full pointer-events-none">
          <motion.div
            animate={{ 
              x: ["10vw", "-10vw", "10vw"],
              y: ["5vh", "-5vh", "5vh"],
              scale: [1.1, 0.9, 1.1],
              opacity: [0.01, 0.04, 0.01]
            }}
            transition={{ duration: 55, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[-30%] right-[-20%] w-[150vw] h-[120vh] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,transparent_60%)] blur-[120px]"
          />
        </motion.div>

        {/* Environmental Volumetric Layer 3 - Deep Core */}
        <motion.div style={{ y: envY3 }} className="absolute inset-0 w-full h-full pointer-events-none">
          <motion.div
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.2, 1],
              opacity: [0.02, 0.05, 0.02]
            }}
            transition={{ duration: 65, repeat: Infinity, ease: "linear" }}
            className="absolute top-[10%] left-[10%] w-[120vw] h-[120vh] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)] blur-[150px] origin-center"
          />
        </motion.div>
      </motion.div>

      {/* --- CINEMATIC AMBIENT LIGHT SWEEP (Glossy Reflection) --- */}
      <motion.div
        style={{ y: glowY1 }}
        animate={{
          x: ["-150vw", "150vw"],
          opacity: [0.01, 0.04, 0.01]
        }}
        transition={{
          x: { duration: 35, repeat: Infinity, ease: "linear" },
          opacity: { duration: 15, repeat: Infinity, ease: "easeInOut" }
        }}
      className="fixed top-[-20%] bottom-[-20%] w-screen bg-linear-to-r from-transparent via-white to-transparent blur-[140px] pointer-events-none z-0 mix-blend-screen skew-x-[-30deg]"
      />

      {/* Interactive Mouse Glow */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%", // Offset to center the glow on cursor
          translateY: "-50%",
        }}
        className="fixed top-0 left-0 w-[40vw] aspect-square max-w-2xl rounded-full bg-white/5 blur-[120px] pointer-events-none z-0 mix-blend-screen"
      />

      {/* --- BACKGROUND ATMOSPHERE WRAPPER (Parallax) --- */}
      <motion.div className="fixed inset-0 w-full h-screen pointer-events-none z-0">
        {/* --- IMMERSIVE CINEMATIC AMBIENT SYSTEM --- */}
        <motion.div style={{ x: bgMouseX, y: bgMouseY }} className="absolute inset-0 w-full h-full pointer-events-none">
          {/* Large Atmospheric Gradient Sweeps */}
          <motion.div style={{ y: glowY1 }} className="absolute inset-0 w-full h-full pointer-events-none">
            <motion.div
              animate={{ rotate: [0, 360], scale: [0.9, 1.1, 0.9], opacity: [0.03, 0.07, 0.03] }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute top-[10%] left-[-10%] w-[80vw] h-[40vw] bg-linear-to-r from-white/10 blur-[100px] md:blur-[150px] rounded-full mix-blend-screen origin-center"
            />
          </motion.div>
          <motion.div style={{ y: glowY2 }} className="absolute inset-0 w-full h-full pointer-events-none">
            <motion.div
              animate={{ rotate: [360, 0], scale: [1, 1.2, 1], opacity: [0.02, 0.05, 0.02] }}
              transition={{ duration: 75, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-[10%] right-[-10%] w-[70vw] h-[50vw] bg-linear-to-l from-white/10 blur-[120px] md:blur-[160px] rounded-full origin-center"
            />
          </motion.div>
          {/* Fullscreen Subtle Pulse */}
          <motion.div style={{ y: glowY1 }} className="absolute inset-0 w-full h-full pointer-events-none">
            <motion.div
              animate={{ opacity: [0.01, 0.04, 0.01] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-linear-to-b from-white/5 mix-blend-overlay"
            />
          </motion.div>
        </motion.div>
        {/* ------------------------------------------ */}

        {/* 2. Floating Blur Orb Animation (Ambient Moving Light) */}
        <motion.div style={{ y: glowY2 }} className="absolute inset-0 w-full h-full pointer-events-none">
          <motion.div
            animate={{ 
              x: [0, 80, -40, 0],
              y: [0, -60, 50, 0],
              scale: [1, 1.15, 0.9, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-15%] left-[-15%] w-[60vw] h-[60vw] rounded-full bg-white/10 blur-[140px] md:blur-[180px] pointer-events-none z-0 mix-blend-screen"
          />
        </motion.div>
        <motion.div style={{ y: glowY1 }} className="absolute inset-0 w-full h-full pointer-events-none">
          <motion.div
            animate={{ 
              x: [0, -90, 50, 0],
              y: [0, 70, -60, 0],
              scale: [1, 1.2, 0.95, 1],
              opacity: [0.08, 0.15, 0.08]
            }}
            transition={{ duration: 24, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-[-15%] right-[-15%] w-[55vw] h-[55vw] rounded-full bg-white/10 blur-[130px] md:blur-[160px] pointer-events-none z-0 mix-blend-screen"
          />
        </motion.div>

      {/* 3. Subtle Radial Light Glow (Animated for Depth) */}
        <motion.div style={{ y: bgY }} className="absolute inset-0 w-full h-full pointer-events-none">
          <motion.div 
            animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.05, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0%,transparent_60%)] pointer-events-none z-0" 
          />
        </motion.div>

      {/* 5. Depth Effect (Vignette) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.8)_100%)] pointer-events-none z-0" />
      </motion.div>
      {/* --- END BACKGROUND ATMOSPHERE WRAPPER --- */}

      {/* --- LAYER 2: MIDGROUND (Atmosphere & Small Particles) --- */}
      <motion.div style={{ x: midMouseX, y: midMouseY }} className="fixed inset-0 w-full h-screen pointer-events-none z-5">
        {/* Ambient Blur Layer di Belakang Text */}
        <motion.div style={{ y: midY1 }} className="absolute inset-0 w-full h-full pointer-events-none">
          <motion.div
            animate={{ opacity: [0.03, 0.08, 0.03], scale: [1, 1.1, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[30vh] bg-white/10 blur-[120px] rounded-full mix-blend-screen"
          />
        </motion.div>
        {/* Floating Midground Particles (Lebih tajam & kecil) */}
        <motion.div style={{ y: midY2 }} className="absolute inset-0 w-full h-full pointer-events-none">
          <motion.div 
            animate={{ y: ["110vh", "-20vh"], x: [0, 40, -20, 0], opacity: [0, 0.4, 0] }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
            className="absolute left-[15%] w-1 h-1 bg-white rounded-full blur-[1px] mix-blend-screen"
          />
        </motion.div>
        <motion.div style={{ y: midY1 }} className="absolute inset-0 w-full h-full pointer-events-none">
          <motion.div 
            animate={{ y: ["110vh", "-20vh"], x: [0, -30, 20, 0], opacity: [0, 0.3, 0] }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear", delay: 15 }}
            className="absolute left-[75%] w-1.5 h-1.5 bg-white rounded-full blur-[1px] mix-blend-screen"
          />
        </motion.div>
      </motion.div>

      {/* --- HERO CONTENT WRAPPER WITH SCROLL PARALLAX --- */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 z-10">
      <motion.div 
        style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
        className="relative flex flex-col items-center w-full max-w-4xl"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }} // Memicu animasi setelah 20% area terlihat
          className="w-full flex flex-col items-center"
        >
        {/* Subtle Floating Wrapper untuk ilusi melayang di ruang hampa (dengan opacity breathing) */}
        <motion.div
          animate={{ y: [-6, 6, -6], opacity: [0.95, 1, 0.95] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center w-full"
        >
          {/* Subtitle Kecil */}
          <motion.div variants={itemFadeUpVariants} className="mb-6">
            <motion.span 
              whileHover={{ opacity: 0.7, letterSpacing: "0.45em" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-[10px] md:text-xs tracking-[0.4em] text-white/50 uppercase text-center block cursor-default origin-center"
            >
              Barbarian Village
            </motion.span>
          </motion.div>

          {/* Title dengan Cinematic Blur & Scale Reveal */}
          <motion.h1
            variants={itemBlurFadeUpVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-light tracking-[0.25em] text-center uppercase leading-tight mb-10"
          >
            BARVILL
            <motion.span 
              animate={{ 
                opacity: [0.7, 1, 0.7], 
                textShadow: ["0px 0px 0px rgba(255,255,255,0)", "0px 0px 15px rgba(255,255,255,0.2)", "0px 0px 0px rgba(255,255,255,0)"] 
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="block text-xl md:text-3xl lg:text-4xl font-medium text-white/80 tracking-[0.3em] mt-3 md:mt-5"
            >
              ENTERTAINMENT
            </motion.span>
          </motion.h1>

          {/* Minimalist Vertical Divider (dengan Falling Shimmer Light) */}
          <motion.div
            variants={itemLineYVariants}
            className="relative w-px h-16 md:h-20 bg-white/10 mb-10 overflow-hidden"
          >
            <motion.div
              animate={{ y: ["-100%", "300%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute inset-0 w-full h-[40%] bg-linear-to-b via-white/80"
            />
          </motion.div>

          {/* Subtitle / Quote */}
          <motion.p
            variants={itemFadeUpVariants}
            whileHover={{ opacity: 0.7, scale: 0.99, y: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs md:text-sm text-white/60 font-light text-center max-w-lg leading-relaxed italic mb-12 cursor-default"
          >
            “Misi Kami sederhana, bantu kamu fokus pada karyamu, sisanya biar kami yang urus.”
          </motion.p>

          {/* Outline Button Wrapped for Safe Hover Transitions */}
          <motion.div variants={itemFadeUpVariants}>
            <MagneticWrapper>
              <motion.button
                whileHover={{ 
                  scale: 1.03,
                  borderColor: "rgba(255,255,255,0.6)",
                  boxShadow: "0px 0px 30px rgba(255,255,255,0.25)"
                }}
                whileTap={{ scale: 0.95, opacity: 0.8 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="group relative px-10 py-4 border border-white/20 text-white text-[10px] md:text-xs tracking-[0.3em] uppercase overflow-hidden"
              >
                <span className="relative z-10 transition-all duration-700 ease-in-out group-hover:text-black font-medium group-hover:tracking-[0.4em]">
                  ENTER EXPERIENCE
                </span>
                <div className="absolute inset-0 bg-white translate-y-[101%] transition-transform duration-700 ease-out group-hover:translate-y-0" />
              </motion.button>
            </MagneticWrapper>
          </motion.div>
        </motion.div>
        </motion.div>
      </motion.div>

      {/* --- SCROLL CUE INDICATOR (Hero Section) --- */}
      <motion.div
        style={{ opacity: heroOpacity }}
        className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20 pointer-events-none"
      >
        <motion.span 
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="text-[8px] md:text-[9px] tracking-[0.5em] text-white/50 uppercase block"
        >
          Scroll
        </motion.span>
        <div className="w-px h-12 md:h-16 bg-white/10 relative overflow-hidden">
          <motion.div
            animate={{ y: ["-100%", "300%"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-[50%] bg-linear-to-b from-transparent via-white/80 to-transparent"
          />
        </div>
      </motion.div>
      </section>

      {/* --- CINEMATIC TRANSITION SPACE --- */}
      <CinematicDivider />

      {/* --- ABOUT SECTION --- */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col items-center w-full max-w-3xl text-center"
        >
          {/* Subtle Floating Wrapper */}
          <motion.div
            animate={{ y: [-4, 4, -4] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="flex flex-col items-center w-full"
          >
          {/* Subtitle */}
          <motion.div variants={itemFadeUpVariants} className="mb-8">
            <motion.span 
              whileHover={{ opacity: 0.7, letterSpacing: "0.45em" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-[10px] md:text-xs tracking-[0.4em] text-white/50 uppercase block cursor-default origin-center"
            >
              Barbarian Village
            </motion.span>
          </motion.div>

          {/* Title */}
          <TextReveal
            as="h2"
            text="ABOUT BARVILL"
            className="text-3xl md:text-5xl lg:text-6xl font-light tracking-[0.25em] uppercase mb-12"
          />

          {/* Elegant Divider */}
          <motion.div
            variants={itemLineXVariants}
            className="w-12 md:w-20 h-px bg-white/30 mb-12 origin-center"
          />

          {/* Description */}
          <motion.p
            variants={itemFadeUpVariants}
            whileHover={{ opacity: 0.8, scale: 0.99, y: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm md:text-base lg:text-lg text-white/60 font-light leading-loose tracking-wider max-w-2xl cursor-default"
          >
            Barvill Entertainment adalah ruang bagi artist dan kreator untuk berkembang dengan identitas, visi, dan atmosfer mereka sendiri.
          </motion.p>
          </motion.div>
        </motion.div>
      </section>

      {/* --- CINEMATIC TRANSITION SPACE --- */}
      <CinematicDivider />

      {/* --- FEATURED ARTISTS SECTION --- */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 py-24 z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col items-center w-full max-w-5xl"
        >
          {/* Subtle Floating Wrapper */}
          <motion.div
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="flex flex-col items-center w-full"
          >
          {/* Header Subtitle */}
          <motion.div variants={itemFadeUpVariants} className="mb-6">
            <motion.span 
              whileHover={{ opacity: 0.7, letterSpacing: "0.45em" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-[10px] md:text-xs tracking-[0.4em] text-white/50 uppercase block text-center cursor-default origin-center"
            >
              Our Talents
            </motion.span>
          </motion.div>

          {/* Section Title */}
          <TextReveal
            as="h2"
            text="FEATURED ARTISTS"
            className="text-3xl md:text-5xl lg:text-6xl font-light tracking-[0.25em] uppercase text-center mb-16"
          />

          {/* Cinematic Artist Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 w-full">
            {artists.map((artist) => (
              <motion.div
                key={artist.name}
                variants={itemFadeUpVariants}
                whileHover={{ scale: 1.015, y: -4 }}
                whileTap={{ scale: 0.96, opacity: 0.8 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex flex-col justify-end p-10 md:p-14 min-h-64 md:min-h-72 bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden cursor-pointer"
              >
                {/* Hover Glow & Blur Atmosphere */}
            <div className="absolute inset-0 bg-linear-to-br from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out z-0" />
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 blur-[50px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out z-0" />

                {/* Card Content */}
                <span className="relative z-10 text-[10px] tracking-[0.3em] text-white/40 mb-4 transition-colors duration-500 group-hover:text-white/70">
                  {artist.category}
                </span>
                <div className="relative z-10 w-8 h-px bg-white/20 mb-6 transition-all duration-700 ease-out group-hover:w-16 group-hover:bg-white/50" />
                <h3 className="relative z-10 text-2xl md:text-3xl font-light tracking-[0.2em] uppercase text-white/90 transition-colors duration-500 group-hover:text-white">
                  {artist.name}
                </h3>
              </motion.div>
            ))}
          </div>
          </motion.div>
        </motion.div>
      </section>

      {/* --- CINEMATIC TRANSITION SPACE --- */}
      <CinematicDivider />

      {/* --- CINEMATIC MARQUEE SECTION --- */}
      <section className="relative w-full py-16 md:py-24 z-10 overflow-hidden flex items-center justify-center border-y border-white/5">
        {/* Edge Fade Masks for Cinematic Depth */}
        <div className="absolute inset-y-0 left-0 w-1/4 md:w-1/6 bg-linear-to-r from-black to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-1/4 md:w-1/6 bg-linear-to-l from-black to-transparent z-20 pointer-events-none" />

        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="flex flex-nowrap w-max"
        >
          {/* Render 4 blocks to ensure a seamless -50% loop for ultra-wide screens */}
          {[...Array(4)].map((_, idx) => (
            <span
              key={idx}
              className="text-3xl md:text-5xl lg:text-7xl font-light tracking-[0.25em] text-white/10 px-4 md:px-8 whitespace-nowrap"
            >
              BARVILL ENTERTAINMENT • BARBARIAN VILLAGE • MUSIC • VISUAL • CREATIVE • IMMERSIVE • CINEMATIC •
            </span>
          ))}
        </motion.div>
      </section>

      {/* --- CINEMATIC TRANSITION SPACE --- */}
      <CinematicDivider />

      {/* --- FINAL CTA SECTION --- */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 z-10">
        {/* Subtle background glow for CTA */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col items-center w-full max-w-3xl text-center"
        >
          {/* Subtle Floating Wrapper */}
          <motion.div
            animate={{ y: [-4, 4, -4], opacity: [0.98, 1, 0.98] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center w-full"
          >
          {/* Subtitle */}
          <motion.div variants={itemFadeUpVariants} className="mb-8">
            <motion.span 
              whileHover={{ opacity: 0.7, letterSpacing: "0.45em" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-[10px] md:text-xs tracking-[0.4em] text-white/50 uppercase block cursor-default origin-center"
            >
              Barbarian Village
            </motion.span>
          </motion.div>

          {/* Title */}
          <TextReveal
            as="h2"
            text="JOIN THE VISION"
            className="text-4xl md:text-6xl lg:text-7xl font-light tracking-[0.25em] uppercase mb-12"
          />

          {/* Glowing Divider */}
          <motion.div
            variants={itemLineXVariants}
            className="relative w-16 md:w-24 h-px bg-white/30 mb-12 origin-center"
          >
            <div className="absolute inset-0 bg-white blur-sm opacity-50" />
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemFadeUpVariants}
            whileHover={{ opacity: 0.8, scale: 0.99, y: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm md:text-base lg:text-lg text-white/60 font-light leading-loose tracking-wider max-w-xl mb-14 cursor-default"
          >
            Bersama kami membangun ruang untuk musik, visual, dan identitas artistik yang imersif.
          </motion.p>

          {/* CTA Button */}
          <motion.div variants={itemFadeUpVariants}>
            <MagneticWrapper>
              <motion.button
                whileHover={{ 
                  scale: 1.03,
                  borderColor: "rgba(255,255,255,0.6)",
                  boxShadow: "0px 0px 30px rgba(255,255,255,0.25)"
                }}
                whileTap={{ scale: 0.95, opacity: 0.8 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="group relative px-12 py-5 border border-white/20 text-white text-[10px] md:text-xs tracking-[0.3em] uppercase overflow-hidden bg-white/5 backdrop-blur-md"
              >
                <span className="relative z-10 transition-all duration-700 ease-in-out group-hover:text-black font-medium group-hover:tracking-[0.4em]">
                  ENTER BARVILL
                </span>
                <div className="absolute inset-0 bg-white translate-y-[101%] transition-transform duration-700 ease-out group-hover:translate-y-0" />
              </motion.button>
            </MagneticWrapper>
          </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* --- CINEMATIC FOOTER --- */}
      <motion.footer
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="relative w-full pt-32 pb-12 px-6 z-10 flex flex-col items-center bg-linear-to-t from-black"
      >
        {/* Cinematic Glowing Top Divider */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-linear-to-r via-white/20" />

        <div className="w-full max-w-7xl flex flex-col lg:flex-row justify-between items-center lg:items-end gap-16 lg:gap-0 mb-20 text-center lg:text-left">
          {/* Left: Brand */}
          <motion.div
            variants={itemFadeUpVariants} className="flex flex-col gap-3">
            <motion.span 
              whileHover={{ opacity: 0.7, letterSpacing: "0.45em" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-[10px] md:text-xs tracking-[0.4em] text-white/50 uppercase block cursor-default origin-left"
            >
              Barbarian Village
            </motion.span>
            <motion.h3 
              whileHover={{ opacity: 0.8 }}
              transition={{ duration: 0.6 }}
              className="text-sm md:text-lg font-light tracking-[0.3em] text-white uppercase cursor-default"
            >
              BARVILL ENTERTAINMENT
            </motion.h3>
          </motion.div>

          {/* Center: Navigation Links */}
          <motion.div
            variants={itemFadeUpVariants} className="flex flex-col md:flex-row gap-8 md:gap-12">
            {["Home", "Artists", "About", "Contact"].map((item) => (
              <motion.a
                key={item}
                href="#"
                whileHover={{ y: -2, scale: 1.02, opacity: 1 }}
                whileTap={{ scale: 0.95, opacity: 0.7 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="group relative text-[10px] md:text-xs font-light tracking-[0.3em] text-white/60 uppercase transition-colors duration-500 hover:text-white"
              >
                <span className="relative z-10 transition-all duration-500 ease-out group-hover:tracking-[0.4em]">
                  {item}
                </span>
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-px bg-white/50 transition-all duration-500 ease-out group-hover:w-full" />
              </motion.a>
            ))}
          </motion.div>

          {/* Right: Social Placeholders */}
          <motion.div
            variants={itemFadeUpVariants} className="flex flex-col md:flex-row gap-8 md:gap-12">
            {["Instagram", "YouTube", "Spotify"].map((item) => (
              <motion.a
                key={item}
                href="#"
                whileHover={{ y: -2, scale: 1.02, opacity: 1 }}
                whileTap={{ scale: 0.95, opacity: 0.7 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="group relative text-[10px] md:text-xs font-light tracking-[0.3em] text-white/60 uppercase transition-colors duration-500 hover:text-white"
              >
                <span className="relative z-10 transition-all duration-500 ease-out group-hover:tracking-[0.4em]">
                  {item}
                </span>
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-px bg-white/50 transition-all duration-500 ease-out group-hover:w-full" />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Bottom: Copyright Text */}
        <motion.div
          variants={itemFadeUpVariants}
          className="w-full max-w-7xl flex flex-col items-center pt-8 border-t border-white/10"
        >
          <p className="text-[9px] md:text-[10px] tracking-[0.3em] text-white/30 uppercase text-center">
            © 2026 Barvill Entertainment. All Rights Reserved.
          </p>
        </motion.div>
      </motion.footer>

      {/* --- LAYER 3: FOREGROUND (Cinematic Bokeh & Edge Light Leaks) --- */}
      <motion.div style={{ x: fgMouseX, y: fgMouseY }} className="fixed inset-0 w-full h-screen pointer-events-none z-20">
        {/* Floating Foreground Bokeh (Sangat soft & besar seolah dekat dengan lensa kamera) */}
        <motion.div style={{ y: fgY1 }} className="absolute inset-0 w-full h-full pointer-events-none">
          <motion.div 
            animate={{ y: ["120vh", "-20vh"], x: [0, 50, -50, 0], opacity: [0, 0.08, 0] }}
            transition={{ duration: 55, repeat: Infinity, ease: "linear", delay: 5 }}
            className="absolute left-[20%] w-10 h-10 bg-white/20 rounded-full blur-md mix-blend-screen"
          />
        </motion.div>
        <motion.div style={{ y: fgY2 }} className="absolute inset-0 w-full h-full pointer-events-none">
          <motion.div 
            animate={{ y: ["120vh", "-20vh"], x: [0, -70, 40, 0], opacity: [0, 0.06, 0] }}
            transition={{ duration: 70, repeat: Infinity, ease: "linear", delay: 25 }}
            className="absolute left-[80%] w-14 h-14 bg-white/20 rounded-full blur-lg mix-blend-screen"
          />
        </motion.div>
        {/* Atmospheric Light Leak (Cahaya pinggir dari depan layar) */}
        <motion.div style={{ y: fgY1 }} className="absolute inset-0 w-full h-full pointer-events-none">
          <motion.div
            animate={{ opacity: [0, 0.04, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-15%] right-[-10%] w-[50vw] h-[50vw] bg-white/10 blur-[150px] rounded-full mix-blend-screen"
          />
        </motion.div>
      </motion.div>

    </main>
  );
}