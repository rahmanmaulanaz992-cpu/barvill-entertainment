"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { journalArticles } from "@/data/journal";
import Link from "next/link";

const cinematicEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemFadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.8, ease: cinematicEase } },
};

export default function JournalArchiveSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative w-full z-10 flex flex-col items-center">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-7xl flex flex-col items-center"
      >
        {/* Minimalist Cinematic Header */}
        <motion.div variants={itemFadeUpVariants} className="flex flex-col items-center mb-24 md:mb-32">
          <span className="text-[10px] md:text-xs tracking-[0.4em] text-white/50 uppercase block text-center mb-6 cursor-default">
            Digital Mythology
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-[0.25em] uppercase text-center mb-8">
            THE ARCHIVE
          </h1>
          <div className="w-16 h-px bg-white/30" />
        </motion.div>

        {/* Asymmetric Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 lg:gap-16 w-full">
          {journalArticles.map((entry, idx) => {
            // Asymmetric Layout Core:
            // Item 1: Full width highlight (12 cols)
            // Item 2: Large offset (7 cols)
            // Item 3: Deep shift right (5 cols)
            const isFeatured = idx === 0;
            const spanClass = isFeatured
              ? "md:col-span-12 flex flex-col lg:flex-row gap-8 lg:gap-16 items-center"
              : idx % 3 === 1
              ? "md:col-span-7"
              : idx % 3 === 2
              ? "md:col-span-5 md:mt-32"
              : "md:col-span-6";

            return (
              <motion.div
                key={entry.id}
                variants={itemFadeUpVariants}
                className={`group relative flex flex-col cursor-pointer ${spanClass}`}
              >
                <Link href={`/journal/${entry.slug}`} className="absolute inset-0 z-20" aria-label={`Read ${entry.title}`} />
                
                {/* Atmospheric Thumbnail Layer */}
                <div className={`relative w-full overflow-hidden bg-white/5 border border-white/5 ${isFeatured ? "lg:w-3/5 aspect-video" : "aspect-[4/5] md:aspect-square"}`}>
                  <div className="absolute inset-0 bg-black/60 group-hover:bg-black/20 transition-colors duration-1000 ease-out z-10" />
                  <motion.div
                    animate={prefersReducedMotion ? {} : { scale: 1 }}
                    whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <div 
                      className="w-full h-full bg-cover bg-center grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 ease-out"
                      style={{ backgroundImage: `url(${entry.cover})` }}
                    />
                  </motion.div>
                </div>

                {/* Editorial Metadata Layer */}
                <div className={`flex flex-col mt-6 md:mt-8 ${isFeatured ? "lg:w-2/5 lg:mt-0" : ""}`}>
                  <div className="flex items-center gap-4 mb-5">
                    <span className="text-[8px] md:text-[9px] tracking-[0.3em] text-white/50 border border-white/10 px-3 py-1 rounded-full uppercase bg-white/5 group-hover:bg-white/10 transition-colors duration-500">
                      {entry.category}
                    </span>
                    <div className="w-1 h-1 rounded-full bg-white/20" />
                    <span className="text-[8px] md:text-[9px] tracking-[0.2em] text-white/40 uppercase">
                      {entry.date}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-light tracking-[0.15em] text-white/80 group-hover:text-white transition-colors duration-500 mb-5 uppercase leading-snug">
                    {entry.title}
                  </h3>
                  <div className="w-8 h-px bg-white/20 mb-5 transition-all duration-700 group-hover:w-16 group-hover:bg-white/50" />
                  <p className="text-xs md:text-sm text-white/50 font-light leading-loose tracking-wider max-w-xl group-hover:text-white/70 transition-colors duration-500">
                    {entry.excerpt}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}