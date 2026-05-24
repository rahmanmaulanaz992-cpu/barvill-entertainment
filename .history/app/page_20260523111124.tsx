"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="relative h-[100dvh] min-h-screen w-full bg-black text-white flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* --- CINEMATIC BACKGROUND SYSTEM --- */}

      {/* 1. Base Gradient Cinematic Hitam */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-black to-[#050505] pointer-events-none z-0" />

      {/* 3. Animated Ambient Blur */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-white/5 blur-[120px] md:blur-[150px] pointer-events-none z-0"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[-20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-white/5 blur-[100px] md:blur-[120px] pointer-events-none z-0"
      />

      {/* 2. Subtle Radial Light Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_60%)] pointer-events-none z-0" />

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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="relative z-10 flex flex-col items-center w-full max-w-4xl"
      >
        {/* Subtitle Kecil */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
          className="mb-6"
        >
          <span className="text-[10px] md:text-xs tracking-[0.4em] text-white/50 uppercase text-center block">
            Barbarian Village
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.6 }}
          className="text-4xl md:text-6xl lg:text-7xl font-light tracking-[0.25em] text-center uppercase leading-tight mb-10"
        >
          BARVILL
          <span className="block text-xl md:text-3xl lg:text-4xl font-medium text-white/80 tracking-[0.3em] mt-3 md:mt-5">
            ENTERTAINMENT
          </span>
        </motion.h1>

        {/* Minimalist Vertical Divider */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.8 }}
          className="w-px h-16 md:h-20 bg-white/20 mb-10"
        />

        {/* Subtitle / Quote */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 1.0 }}
          className="text-xs md:text-sm text-white/60 font-light text-center max-w-lg leading-relaxed italic mb-12"
        >
          “Misi Kami sederhana, bantu kamu fokus pada karyamu, sisanya biar kami yang urus.”
        </motion.p>

        {/* Outline Button */}
        <motion.button
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 1.2 }}
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