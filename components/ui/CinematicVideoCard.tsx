"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import type { YouTubeVideo } from "@/lib/youtube";

export default function CinematicVideoCard({ video }: { video: YouTubeVideo }) {
  return (
    <motion.a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Watch cinematic visual: ${video.title}`}
      className="group relative flex flex-col w-full aspect-video overflow-hidden bg-black border border-white/10 cursor-pointer"
      whileHover="hover"
      initial="initial"
    >
      {/* Optimized Lazy Image (Monochrome Default) */}
      <Image 
        src={video.thumbnail} 
        alt={video.title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover grayscale opacity-40 transition-all duration-1000 ease-out group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-80"
      />
      
      {/* Cinematic Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.05),transparent_50%)] z-10 pointer-events-none" />

      {/* Meta Text */}
      <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 z-20 flex flex-col justify-end">
        <span className="text-[9px] md:text-[10px] tracking-[0.4em] text-white/50 uppercase mb-3 block group-hover:text-white/80 transition-colors duration-700">
          Visual Signal
        </span>
        <h3 className="text-xs md:text-sm lg:text-base font-light tracking-[0.2em] text-white line-clamp-2 uppercase leading-relaxed">
          {video.title}
        </h3>
      </div>
    </motion.a>
  );
}