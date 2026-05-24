"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Home() {
  // --- MOUSE TRACKING SYSTEM ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Cinematic smooth spring damping for luxury feel
  const smoothX = useSpring(mouseX, { damping: 40, stiffness: 50, mass: 1.5 });
  const smoothY = useSpring(mouseY, { damping: 40, stiffness: 50, mass: 1.5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // --- CINEMATIC REVEAL SYSTEM ---
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.4,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 }, // Translasi kecil agar reveal terasa halus/soft
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.6, // Lambat & elegan
        ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier (cinematic ease out)
      },
    },
  };

  return (
    <main className="relative h-[100dvh] min-h-screen w-full bg-black text-white flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* --- CINEMATIC BACKGROUND SYSTEM --- */}

      {/* 1. Base Gradient Cinematic Hitam */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-black to-[#050505] pointer-events-none z-0" />

      {/* Interactive Mouse Glow */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%", // Offset to center the glow on cursor
          translateY: "-50%",
        }}
        className="absolute top-0 left-0 w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] rounded-full bg-white/5 blur-[120px] pointer-events-none z-0 mix-blend-screen"
      />

      {/* 2. Floating Blur Orb Animation (Ambient Moving Light) */}
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

      {/* 3. Subtle Radial Light Glow (Animated for Depth) */}
      <motion.div 
        animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.05, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0%,transparent_60%)] pointer-events-none z-0" 
      />

      {/* 5. Depth Effect (Vignette) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.8)_100%)] pointer-events-none z-0" />

      {/* 4. Grain/Noise Overlay Tipis */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.03] mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      {/* --- END CINEMATIC BACKGROUND SYSTEM --- */}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }} // Memicu animasi setelah 20% area terlihat
        className="relative z-10 flex flex-col items-center w-full max-w-4xl"
      >
        {/* Subtitle Kecil */}
        <motion.div
          variants={itemVariants}
          className="mb-6"
        >
          <span className="text-[10px] md:text-xs tracking-[0.4em] text-white/50 uppercase text-center block">
            Barbarian Village
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-6xl lg:text-7xl font-light tracking-[0.25em] text-center uppercase leading-tight mb-10"
        >
          BARVILL
          <span className="block text-xl md:text-3xl lg:text-4xl font-medium text-white/80 tracking-[0.3em] mt-3 md:mt-5">
            ENTERTAINMENT
          </span>
        </motion.h1>

        {/* Minimalist Vertical Divider */}
        <motion.div
          variants={itemVariants}
          className="w-px h-16 md:h-20 bg-white/20 mb-10"
        />

        {/* Subtitle / Quote */}
        <motion.p
          variants={itemVariants}
          className="text-xs md:text-sm text-white/60 font-light text-center max-w-lg leading-relaxed italic mb-12"
        >
          “Misi Kami sederhana, bantu kamu fokus pada karyamu, sisanya biar kami yang urus.”
        </motion.p>

        {/* Outline Button */}
        <motion.button
          variants={itemVariants}
          className="group relative px-10 py-4 border border-white/20 text-white text-[10px] md:text-xs tracking-[0.3em] uppercase overflow-hidden"
        >
          <span className="relative z-10 transition-colors duration-700 ease-in-out group-hover:text-black font-medium">
            ENTER EXPERIENCE
          </span>
          <div className="absolute inset-0 bg-white translate-y-[101%] transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:translate-y-0" />
        </motion.button>
      </motion.div>
    </main>
  );
}