"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import MagneticWrapper from "@/components/ui/MagneticWrapper";
import type { Article } from "./JournalCard";

const cinematicEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const itemFadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.8, ease: cinematicEase } },
};

export default function FeaturedArticle({ article }: { article: Article }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="w-full flex flex-col lg:flex-row items-center lg:items-start gap-10 md:gap-16 mb-20"
    >
      {/* Large Editorial Image */}
      <motion.div 
        variants={itemFadeUpVariants} 
        role="link"
        tabIndex={0}
        aria-label={`Read featured article: ${article.title}`}
        className="w-full lg:w-[60%] aspect-video md:aspect-[21/9] lg:aspect-[16/10] relative group overflow-hidden bg-white/5 border border-white/10 shrink-0 cursor-pointer"
      >
        <div className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-80 transition-all duration-1000 group-hover:scale-105 grayscale group-hover:grayscale-0 will-change-transform" style={{ backgroundImage: `url(${article.image})` }} />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-1000 ease-out z-10" />
        <div className="absolute top-6 left-6 md:top-8 md:left-8 z-20">
          <span className="text-[8px] md:text-[9px] tracking-[0.3em] text-white bg-black/40 backdrop-blur-md border border-white/10 px-4 py-1.5 uppercase">Featured Transmission</span>
        </div>
      </motion.div>

      {/* Editorial Text Block */}
      <motion.div variants={itemFadeUpVariants} className="w-full lg:w-[40%] flex flex-col justify-center h-full lg:pt-8 text-center lg:text-left items-center lg:items-start">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[9px] tracking-[0.3em] text-white/50 uppercase">{article.category}</span>
          <div className="w-1 h-1 rounded-full bg-white/20" />
          <span className="text-[9px] tracking-[0.3em] text-white/50 uppercase">{article.date}</span>
        </div>
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-[0.15em] leading-tight text-white mb-6 uppercase">
          {article.title}
        </h3>
        <div className="w-12 h-px bg-white/30 mb-6 hidden lg:block" />
        <p className="text-sm md:text-base text-white/60 font-light leading-loose tracking-wider mb-10 max-w-lg">
          {article.excerpt}
        </p>
        <MagneticWrapper>
          <motion.button whileHover={{ scale: 1.02, borderColor: "rgba(255,255,255,0.4)" }} whileTap={{ scale: 0.95 }} className="group relative px-8 py-4 border border-white/20 text-white text-[10px] tracking-[0.3em] uppercase overflow-hidden">
            <span className="relative z-10 transition-colors duration-700 ease-in-out group-hover:text-black font-medium">READ FULL ARCHIVE</span>
            <div className="absolute inset-0 bg-white translate-y-[101%] transition-transform duration-700 ease-out group-hover:translate-y-0" />
          </motion.button>
        </MagneticWrapper>
      </motion.div>
    </motion.div>
  );
}