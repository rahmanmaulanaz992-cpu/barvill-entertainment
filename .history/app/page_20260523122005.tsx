"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";

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


  // --- SCROLL TRACKING SYSTEM (Cinematic Parallax) ---
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 1000], [0, 300]); // Background bergerak turun sangat lambat
  const midY = useTransform(scrollY, [0, 1000], [0, 150]); // Midground sedikit tertinggal
  const fgY = useTransform(scrollY, [0, 1000], [0, -250]); // Foreground bergerak naik cepat (ilusi dekat lensa)
  const heroY = useTransform(scrollY, [0, 800], [0, 200]); // Teks hero sedikit tertinggal ke bawah
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]); // Teks hero memudar elegan
  const heroScale = useTransform(scrollY, [0, 500], [1, 0.95]); // Teks hero mengecil perlahan

  return (
    <main className="relative h-dvh min-h-screen w-full bg-black text-white flex flex-col items-center justify-center px-6 overflow-hidden">
    <main className="relative w-full bg-black text-white flex flex-col overflow-x-hidden">
      {/* --- CINEMATIC BACKGROUND SYSTEM --- */}

      {/* 1. Base Gradient Cinematic Hitam (Parallax) */}
      <motion.div 
        style={{ y: bgY }}
        className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-black to-[#050505] pointer-events-none z-0" 
        className="fixed inset-0 w-full h-screen bg-gradient-to-b from-neutral-950 via-black to-[#050505] pointer-events-none z-0" 
      />

      {/* Interactive Mouse Glow */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%", // Offset to center the glow on cursor
          translateY: "-50%",
        }}
        className="absolute top-0 left-0 w-[40vw] h-[40vw] max-w-[37.5rem] max-h-[37.5rem] rounded-full bg-white/5 blur-[120px] pointer-events-none z-0 mix-blend-screen"
        className="fixed top-0 left-0 w-[40vw] h-[40vw] max-w-[37.5rem] max-h-[37.5rem] rounded-full bg-white/5 blur-[120px] pointer-events-none z-0 mix-blend-screen"
      />

      {/* --- BACKGROUND ATMOSPHERE WRAPPER (Parallax) --- */}
      <motion.div className="absolute inset-0 pointer-events-none z-0" style={{ y: bgY }}>
      <motion.div className="fixed inset-0 w-full h-screen pointer-events-none z-0" style={{ y: bgY }}>
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
      </motion.div>
      {/* --- END BACKGROUND ATMOSPHERE WRAPPER --- */}

      {/* --- LAYER 2: MIDGROUND (Atmosphere & Small Particles) --- */}
      <motion.div className="absolute inset-0 pointer-events-none z-5" style={{ y: midY }}>
      <motion.div className="fixed inset-0 w-full h-screen pointer-events-none z-5" style={{ y: midY }}>
        {/* Ambient Blur Layer di Belakang Text */}
        <motion.div
          animate={{ opacity: [0.03, 0.08, 0.03], scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[30vh] bg-white/10 blur-[120px] rounded-full mix-blend-screen"
        />
        {/* Floating Midground Particles (Lebih tajam & kecil) */}
        <motion.div 
          animate={{ y: ["110vh", "-20vh"], x: [0, 40, -20, 0], opacity: [0, 0.4, 0] }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          className="absolute left-[15%] w-1 h-1 bg-white rounded-full blur-[1px] mix-blend-screen"
        />
        <motion.div 
          animate={{ y: ["110vh", "-20vh"], x: [0, -30, 20, 0], opacity: [0, 0.3, 0] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear", delay: 15 }}
          className="absolute left-[75%] w-1.5 h-1.5 bg-white rounded-full blur-[1px] mix-blend-screen"
        />
      </motion.div>

      {/* --- HERO CONTENT WRAPPER WITH SCROLL PARALLAX --- */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 z-10">
      <motion.div 
        style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
        className="relative z-10 flex flex-col items-center w-full max-w-4xl"
        className="relative flex flex-col items-center w-full max-w-4xl"
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, ease: "easeOut", delay: 0.4 }}
            className="mb-6"
          >
            <span className="text-[10px] md:text-xs tracking-[0.4em] text-white/50 uppercase text-center block">
              Barbarian Village
            </span>
          </motion.div>

          {/* Title dengan Cinematic Blur & Scale Reveal */}
          <motion.h1
            initial={{ opacity: 0, y: 30, filter: "blur(12px)", scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
            transition={{ duration: 2, ease: "easeOut", delay: 0.6 }}
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
            initial={{ opacity: 0, scaleY: 0, originY: 0 }}
            whileInView={{ opacity: 1, scaleY: 1 }}
            transition={{ duration: 2, ease: "easeOut", delay: 0.8 }}
            className="relative w-px h-16 md:h-20 bg-white/10 mb-10 overflow-hidden"
          >
            <motion.div
              animate={{ y: ["-100%", "300%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute inset-0 w-full h-[40%] bg-gradient-to-b from-transparent via-white/80 to-transparent"
            />
          </motion.div>

          {/* Subtitle / Quote */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, ease: "easeOut", delay: 1.0 }}
            className="text-xs md:text-sm text-white/60 font-light text-center max-w-lg leading-relaxed italic mb-12"
          >
            “Misi Kami sederhana, bantu kamu fokus pada karyamu, sisanya biar kami yang urus.”
          </motion.p>

          {/* Outline Button Wrapped for Safe Hover Transitions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, ease: "easeOut", delay: 1.2 }}
          >
            <motion.button
              whileHover={{ 
                scale: 1.03,
                borderColor: "rgba(255,255,255,0.6)",
                boxShadow: "0px 0px 30px rgba(255,255,255,0.25)"
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="group relative px-10 py-4 border border-white/20 text-white text-[10px] md:text-xs tracking-[0.3em] uppercase overflow-hidden"
            >
              <span className="relative z-10 transition-all duration-700 ease-in-out group-hover:text-black font-medium group-hover:tracking-[0.4em]">
                ENTER EXPERIENCE
              </span>
              <div className="absolute inset-0 bg-white translate-y-[101%] transition-transform duration-700 ease-out group-hover:translate-y-0" />
            </motion.button>
          </motion.div>
        </motion.div>
        </motion.div>
      </motion.div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col items-center w-full max-w-3xl text-center"
        >
          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            className="mb-8"
          >
            <span className="text-[10px] md:text-xs tracking-[0.4em] text-white/50 uppercase block">
              Barbarian Village
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 30, filter: "blur(12px)", scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
            transition={{ duration: 2, ease: "easeOut", delay: 0.4 }}
            className="text-3xl md:text-5xl lg:text-6xl font-light tracking-[0.25em] uppercase mb-12"
          >
            ABOUT BARVILL
          </motion.h2>

          {/* Elegant Divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 2, ease: "easeOut", delay: 0.6 }}
            className="w-12 md:w-20 h-px bg-white/30 mb-12 origin-center"
          />

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.8, ease: "easeOut", delay: 0.8 }}
            className="text-sm md:text-base lg:text-lg text-white/60 font-light leading-loose tracking-wider max-w-2xl"
          >
            Barvill Entertainment adalah ruang bagi artist dan kreator untuk berkembang dengan identitas, visi, dan atmosfer mereka sendiri.
          </motion.p>
        </motion.div>
      </section>

      {/* --- LAYER 3: FOREGROUND (Cinematic Bokeh & Edge Light Leaks) --- */}
      <motion.div className="absolute inset-0 pointer-events-none z-20" style={{ y: fgY }}>
      <motion.div className="fixed inset-0 w-full h-screen pointer-events-none z-20" style={{ y: fgY }}>
        {/* Floating Foreground Bokeh (Sangat soft & besar seolah dekat dengan lensa kamera) */}
        <motion.div 
          animate={{ y: ["120vh", "-20vh"], x: [0, 50, -50, 0], opacity: [0, 0.08, 0] }}
          transition={{ duration: 55, repeat: Infinity, ease: "linear", delay: 5 }}
          className="absolute left-[20%] w-10 h-10 bg-white/20 rounded-full blur-md mix-blend-screen"
        />
        <motion.div 
          animate={{ y: ["120vh", "-20vh"], x: [0, -70, 40, 0], opacity: [0, 0.06, 0] }}
          transition={{ duration: 70, repeat: Infinity, ease: "linear", delay: 25 }}
          className="absolute left-[80%] w-14 h-14 bg-white/20 rounded-full blur-lg mix-blend-screen"
        />
        {/* Atmospheric Light Leak (Cahaya pinggir dari depan layar) */}
        <motion.div
          animate={{ opacity: [0, 0.04, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-15%] right-[-10%] w-[50vw] h-[50vw] bg-white/10 blur-[150px] rounded-full mix-blend-screen"
        />
      </motion.div>

    </main>
  );
}