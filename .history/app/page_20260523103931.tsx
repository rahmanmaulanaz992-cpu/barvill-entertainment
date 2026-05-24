"use client";

import { motion } from "framer-motion";

export default function Home() {
  // Animasi stagger untuk container
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.4,
      },
    },
  };

  // Animasi smooth fade-up untuk setiap item
  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1], // Cinematic smooth easing (Expo out)
      },
    },
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 overflow-hidden">
    <main className="relative h-[100dvh] min-h-screen w-full bg-black text-white flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Subtle cinematic radial glow di background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04)_0%,transparent_100%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="flex flex-col items-center w-full max-w-2xl"
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center w-full max-w-4xl"
      >
        {/* Subtitle Kecil */}
        <motion.div variants={itemVariants} className="mb-6">
          <span className="text-[10px] md:text-xs tracking-[0.4em] text-white/50 uppercase text-center block">
            Barbarian Village
          </span>
        </motion.div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-light tracking-[0.25em] text-center uppercase leading-relaxed mb-6">
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-6xl lg:text-7xl font-light tracking-[0.25em] text-center uppercase leading-tight mb-10"
        >
          BARVILL
          <br />
          <span className="text-2xl md:text-4xl font-medium text-white/90 tracking-[0.2em]">
          <span className="block text-xl md:text-3xl lg:text-4xl font-medium text-white/80 tracking-[0.3em] mt-3 md:mt-5">
            ENTERTAINMENT
          </span>
        </h1>
        </motion.h1>

        {/* Divider & Sub-branding */}
        <div className="flex items-center w-full max-w-md mb-8">
          <div className="grow h-px bg-white/20"></div>
          <span className="px-4 text-[10px] md:text-xs tracking-[0.3em] text-white/50 uppercase text-center">
            BARBARIAN VILLAGE
          </span>
          <div className="grow h-px bg-white/20"></div>
        </div>
        {/* Minimalist Vertical Divider */}
        <motion.div variants={itemVariants} className="w-px h-16 md:h-20 bg-white/20 mb-10" />

        {/* Subtitle / Quote */}
        <p className="text-xs md:text-sm text-white/60 font-light text-center max-w-md italic mb-12 leading-relaxed">
          “Misi Kami sederhana, bantu kamu fokus pada karyamu, sisanya biar kami yang urus”
        </p>
        <motion.p
          variants={itemVariants}
          className="text-xs md:text-sm text-white/60 font-light text-center max-w-lg leading-relaxed italic mb-12"
        >
          “Misi Kami sederhana, bantu kamu fokus pada karyamu, sisanya biar kami yang urus.”
        </motion.p>

        {/* Outline Button */}
        <button className="px-8 py-3 border border-white/20 text-white/70 text-[10px] md:text-xs tracking-[0.2em] uppercase transition-all duration-500 hover:bg-white hover:text-black">
          UNDER MAINTENANCE
        </button>
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