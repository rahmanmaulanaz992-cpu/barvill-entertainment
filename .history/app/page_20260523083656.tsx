"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <h1 className="text-6xl font-bold tracking-[0.3em]">
        BARVILL
      </h1>
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="flex flex-col items-center w-full max-w-2xl"
      >
        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-light tracking-[0.25em] text-center uppercase leading-relaxed mb-6">
          BARVILL
          <br />
          <span className="text-2xl md:text-4xl font-medium text-white/90 tracking-[0.2em]">
            ENTERTAINMENT
          </span>
        </h1>

        {/* Divider & Sub-branding */}
        <div className="flex items-center w-full max-w-md mb-8">
          <div className="flex-grow h-[1px] bg-white/20"></div>
          <span className="px-4 text-[10px] md:text-xs tracking-[0.3em] text-white/50 uppercase text-center">
            BARBARIAN VILLAGE
          </span>
          <div className="flex-grow h-[1px] bg-white/20"></div>
        </div>

        {/* Subtitle / Quote */}
        <p className="text-xs md:text-sm text-white/60 font-light text-center max-w-md italic mb-12 leading-relaxed">
          “Misi Kami sederhana, bantu kamu fokus pada karyamu, sisanya biar kami yang urus”
        </p>

        {/* Outline Button */}
        <button className="px-8 py-3 border border-white/20 text-white/70 text-[10px] md:text-xs tracking-[0.2em] uppercase transition-all duration-500 hover:bg-white hover:text-black">
          UNDER MAINTENANCE
        </button>
      </motion.div>
    </main>
  );
}