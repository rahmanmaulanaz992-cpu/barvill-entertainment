"use client";

import React from "react";
import { motion, Easing } from "framer-motion";
import MagneticWrapper from "@/components/ui/MagneticWrapper";

const cinematicEase: Easing = [0.16, 1, 0.3, 1];
const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } } };
const itemFadeUpVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 1.8, ease: cinematicEase } } };

export default function JournalArticlePage() {
  // Fallback data statis untuk mempertahankan cinematic visual tanpa bergantung pada dynamic routes / mock module
  const article = {
    category: "Behind The Scene",
    date: "OCT 24, 2026",
    title: "The Anatomy of Sound: G-Martyr's Industrial Awakening",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80",
    content: [
      "Dalam era di mana algoritma mendikte struktur lagu, G-Martyr memilih untuk mundur ke ruang bawah tanah. 'THE AWAKENING' bukanlah album yang ditulis, melainkan dirakit layaknya mesin perang.",
      "Proses kreatifnya melibatkan instrumen yang sengaja dirusak: amplifier analog yang didorong melampaui batas panasnya, plat besi yang dipukul untuk menciptakan reverb alami, dan rekaman field-audio dari pabrik yang ditinggalkan.",
      "Keindahan dari karya G-Martyr terletak pada kemampuannya menemukan harmoni di tengah kekacauan mekanis. Ini adalah transmisi murni dari visi artistik yang menolak berkompromi."
    ]
  };

  return (
    <main className="relative w-full min-h-screen bg-black text-white flex flex-col pt-32 pb-32">
      {/* Editorial Header */}
      <section className="relative z-10 w-full max-w-4xl mx-auto px-4 md:px-6 mb-16 text-center">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col items-center">
          <motion.div variants={itemFadeUpVariants} className="flex items-center gap-3 mb-8">
            <span className="text-[9px] tracking-[0.3em] text-white/50 uppercase">{article.category}</span>
            <div className="w-1 h-1 rounded-full bg-white/20" />
            <span className="text-[9px] tracking-[0.3em] text-white/50 uppercase">{article.date}</span>
          </motion.div>
          
          <motion.h1 variants={itemFadeUpVariants} className="text-3xl md:text-5xl lg:text-6xl font-light tracking-[0.15em] leading-tight text-white uppercase mb-12">
            {article.title}
          </motion.h1>
          
          <motion.div variants={itemFadeUpVariants} className="w-px h-16 bg-white/30" />
        </motion.div>
      </section>

      {/* Featured Editorial Visual */}
      <section className="relative z-10 w-full max-w-6xl mx-auto px-4 md:px-6 mb-20">
        <motion.div 
          initial={{ opacity: 0, y: 40 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 2, ease: cinematicEase, delay: 0.5 }}
          className="w-full aspect-[16/9] md:aspect-[21/9] relative overflow-hidden bg-white/5 border border-white/10"
        >
          <div className="absolute inset-0 bg-cover bg-center grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-1000" style={{ backgroundImage: `url(${article.image})` }} />
        </motion.div>
      </section>

      {/* Reading Content */}
      <section className="relative z-10 w-full max-w-3xl mx-auto px-4 md:px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={containerVariants} className="space-y-10">
          {article.content.map((paragraph, idx) => (
            <motion.p key={idx} variants={itemFadeUpVariants} className="text-sm md:text-base lg:text-lg text-white/70 font-light leading-[2.2] tracking-wide">
              {paragraph}
            </motion.p>
          ))}
        </motion.div>
      </section>

      {/* Return to Archive */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="fixed bottom-8 right-8 z-50">
        <MagneticWrapper>
          <a href="/" className="group flex items-center gap-4 cursor-pointer">
            <span className="text-[9px] tracking-[0.3em] text-white/50 uppercase group-hover:text-white transition-colors duration-500">Close Transmit</span>
            <div className="w-8 h-px bg-white/30 group-hover:w-12 group-hover:bg-white transition-all duration-500" />
          </a>
        </MagneticWrapper>
      </motion.div>
    </main>
  );
}