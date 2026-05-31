"use client";

import React from "react";
import { motion } from "framer-motion";
import { Artist } from "@/types/music";

const cinematicEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const itemFadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.8, ease: cinematicEase } },
};

export default function ArtistCard({ artist }: { artist: Artist }) {
  return (
    <motion.div
      variants={itemFadeUpVariants}
      whileHover={{ scale: 1.01, y: -4, boxShadow: "0px 10px 40px rgba(0,0,0,0.5)" }}
      whileTap={{ scale: 0.96, opacity: 0.8 }}
      transition={{ duration: 0.8, ease: cinematicEase }}
      role="link"
      tabIndex={0}
      aria-label={`Explore artist ${artist.name}`}
      className="group relative flex flex-col justify-end p-10 md:p-14 min-h-[28rem] md:min-h-[32rem] aspect-[3/4] md:aspect-auto bg-white/5 border border-white/5 backdrop-blur-md overflow-hidden cursor-pointer"
    >
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-110 opacity-30 group-hover:opacity-50 grayscale group-hover:grayscale-0"
          style={{ backgroundImage: `url(${artist.image})` }}
        />
        {/* Depth Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/40 to-transparent transition-opacity duration-700 ease-out" />
      </div>

      {/* Status Badges */}
      {artist.status && (
        <div className="absolute top-8 right-8 px-3 py-1.5 border border-white/10 rounded-full text-[8px] tracking-[0.2em] text-white/50 bg-black/20 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out z-20">
          {artist.status}
        </div>
      )}
      {artist.cycle && (
        <div className="absolute top-8 left-8 text-[8px] tracking-[0.2em] text-white/30 uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 z-20">
          <span className="block mb-1 text-white/50">Current Cycle</span>
          {artist.cycle}
        </div>
      )}

      {/* Card Content & Typography Hierarchy */}
      <div className="relative z-10 flex flex-col">
        <span className="text-[10px] tracking-[0.3em] text-white/40 mb-4 transition-colors duration-500 group-hover:text-white/70">
          {artist.atmosphere}
        </span>
        <div className="w-8 h-px bg-white/20 mb-6 transition-all duration-700 ease-out group-hover:w-16 group-hover:bg-white/50" />
        <h3 className="text-2xl md:text-3xl font-light tracking-[0.2em] uppercase text-white/90 transition-colors duration-500 group-hover:text-white mb-4">
          {artist.name}
        </h3>
        
        <p className="text-xs text-white/50 font-light leading-relaxed max-w-sm h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 group-hover:mt-2 transition-all duration-700 ease-out overflow-hidden">
          {artist.description}
        </p>
      </div>
    </motion.div>
  );
}