"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import TextReveal from "@/components/ui/TextReveal";
import MagneticWrapper from "@/components/ui/MagneticWrapper";
import type { Artist } from "./ArtistCard";

const cinematicEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemFadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.8, ease: cinematicEase } },
};

export default function ArtistSpotlight({ artist }: { artist: Artist }) {
  if (!artist.featuredRelease) return null;

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 md:px-6 py-24 md:py-32 z-10">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="w-full max-w-6xl flex flex-col lg:flex-row items-center gap-12 md:gap-20"
      >
        {/* Poster Artwork Editorial Placeholder */}
        <motion.div 
          variants={itemFadeUpVariants} 
          role="link"
          tabIndex={0}
          aria-label={`View release details: ${artist.featuredRelease.title}`}
          className="w-full lg:w-1/2 aspect-4/5 md:aspect-square relative group overflow-hidden bg-white/5 border border-white/10 backdrop-blur-md shrink-0 cursor-pointer"
        >
          <div className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-70 transition-opacity duration-1000 grayscale group-hover:grayscale-0" style={{ backgroundImage: `url(${artist.image})` }} />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.08),transparent_50%)]" />
          <div className="absolute inset-0 bg-black/60 group-hover:bg-black/20 transition-colors duration-1000 ease-out z-10" />
          {/* Floating identity elements inside poster */}
          <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end z-20">
            <div className="flex flex-col">
              <span className="text-[10px] tracking-[0.4em] text-white/50 mb-3 block">OUT NOW</span>
              <span className="text-2xl md:text-3xl font-light tracking-[0.2em] text-white">{artist.featuredRelease.title}</span>
            </div>
            <span className="text-[9px] tracking-[0.3em] text-white/40 border border-white/20 px-4 py-1.5 rounded-full uppercase">{artist.featuredRelease.type}</span>
          </div>
        </motion.div>

        {/* Editorial Text Content */}
        <motion.div variants={itemFadeUpVariants} className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
          <span className="text-[10px] md:text-xs tracking-[0.4em] text-white/50 uppercase block mb-6">Cinematic Transmission</span>
          <TextReveal as="h2" text={`${artist.name} : ${artist.featuredRelease.title}`} className="text-3xl md:text-5xl font-light tracking-[0.25em] uppercase mb-8" />
          <div className="w-12 md:w-20 h-px bg-white/30 mb-8 origin-left hidden lg:block" />
          <p className="text-sm md:text-base lg:text-lg text-white/60 font-light leading-loose tracking-wider max-w-xl mb-8 cursor-default">
            {artist.featuredRelease.description}
          </p>
          <motion.div variants={itemFadeUpVariants} className="flex flex-wrap justify-center lg:justify-start gap-3 md:gap-4 mb-12 w-full max-w-xl">
            {artist.featuredRelease.formats.map((format, idx) => (
              <span key={idx} className="text-[8px] md:text-[9px] tracking-[0.3em] text-white/40 border border-white/10 bg-white/5 px-4 py-2 rounded-full uppercase cursor-default">{format}</span>
            ))}
          </motion.div>
          <MagneticWrapper>
            <motion.button whileHover={{ scale: 1.02, borderColor: "rgba(255,255,255,0.4)", boxShadow: "0px 0px 40px rgba(255,255,255,0.15)" }} whileTap={{ scale: 0.95, opacity: 0.8 }} transition={{ type: "spring", stiffness: 400, damping: 25 }} className="group relative px-10 py-4 border border-white/20 text-white text-[10px] md:text-xs tracking-[0.3em] uppercase overflow-hidden">
              <span className="relative z-10 transition-all duration-700 ease-in-out group-hover:text-black font-medium group-hover:tracking-[0.4em]">LISTEN THE RECORD</span>
              <div className="absolute inset-0 bg-white translate-y-[101%] transition-transform duration-700 ease-out group-hover:translate-y-0" />
            </motion.button>
          </MagneticWrapper>
        </motion.div>
      </motion.div>
    </section>
  );
}