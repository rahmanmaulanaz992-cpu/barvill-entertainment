"use client";

import React from "react";
import { motion } from "framer-motion";

export interface Article {
  title: string;
  category: string;
  date: string;
  excerpt: string;
  image: string;
}

const cinematicEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const itemFadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.8, ease: cinematicEase } },
};

export default function JournalCard({ article }: { article: Article }) {
  return (
    <motion.div
      variants={itemFadeUpVariants}
      whileHover={{ y: -4 }}
      className="group relative flex flex-col cursor-pointer"
      role="link"
      tabIndex={0}
      aria-label={`Read article: ${article.title}`}
    >
      {/* Image Wrapper */}
      <div className="w-full aspect-4/3 md:aspect-[4/3] relative overflow-hidden bg-white/5 border border-white/5 mb-6 shrink-0">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-105 opacity-50 group-hover:opacity-90 grayscale group-hover:grayscale-0 will-change-transform"
          style={{ backgroundImage: `url(${article.image})` }}
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700 ease-out" />
      </div>

      {/* Meta Data */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-[8px] md:text-[9px] tracking-[0.3em] text-white/40 uppercase">{article.category}</span>
        <div className="w-1 h-1 rounded-full bg-white/20" />
        <span className="text-[8px] md:text-[9px] tracking-[0.3em] text-white/40 uppercase">{article.date}</span>
      </div>

      {/* Typography Hierarchy */}
      <h3 className="text-base md:text-lg font-light tracking-[0.1em] text-white/90 group-hover:text-white transition-colors duration-500 mb-3 line-clamp-2 uppercase">
        {article.title}
      </h3>
      <p className="text-xs font-light text-white/50 leading-relaxed line-clamp-3 mb-6">
        {article.excerpt}
      </p>

      {/* Elegant Interaction */}
      <div className="mt-auto flex items-center gap-3 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
        <span className="text-[9px] tracking-[0.3em] text-white uppercase">Read Transmission</span>
        <div className="w-8 h-px bg-white group-hover:w-16 transition-all duration-700 ease-out" />
      </div>
    </motion.div>
  );
}