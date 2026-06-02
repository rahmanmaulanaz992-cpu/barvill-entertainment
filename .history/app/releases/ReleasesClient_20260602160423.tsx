"use client";

import React from "react";
import { motion } from "framer-motion";
import MagneticWrapper from "@/components/ui/MagneticWrapper";
import { useRouter } from "next/navigation";
import type { Release } from "@/lib/types";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemFadeUp: any = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: "easeOut",
    },
  },
};

interface ReleasesClientProps {
  releases: Release[];
}

export default function ReleasesClient({ releases }: ReleasesClientProps) {
  const router = useRouter();

  return (
    <main className="relative w-full min-h-screen bg-black text-white flex flex-col pt-32 pb-32 overflow-x-hidden">
      {/* --- AMBIENT CINEMATIC BACKGROUND --- */}
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
        <motion.div 
          animate={{ opacity: [0.03, 0.06, 0.03] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06)_0%,transparent_50%)]" 
        />
        <motion.div 
          animate={{ opacity: [0.02, 0.05, 0.02] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(255,255,255,0.04)_0%,transparent_60%)]" 
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.8)_100%)] mix-blend-multiply opacity-80" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 flex flex-col items-center"
      >
        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col items-center text-center w-full max-w-3xl mb-24 mt-12">
          <motion.div variants={itemFadeUp} className="mb-6 flex items-center gap-4">
            <div className="w-8 h-px bg-white/30" />
            <span className="text-[10px] md:text-xs tracking-[0.4em] text-white/50 uppercase font-mono">
              Music Catalog
            </span>
            <div className="w-8 h-px bg-white/30" />
          </motion.div>

          <motion.h1
            variants={itemFadeUp}
            className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tighter uppercase text-white leading-none mb-8"
          >
            RELEASES
          </motion.h1>

          <motion.p
            variants={itemFadeUp}
            className="text-sm md:text-base text-white/60 font-light leading-loose tracking-[0.15em] max-w-xl"
          >
            Menampilkan katalog rilisan Barvill Entertainment.
          </motion.p>
        </div>

        {/* --- DYNAMIC ARTIST GRID --- */}
        {releases.length === 0 ? (
          <div className="flex items-center justify-center py-32">
            <p className="text-xs tracking-[0.5em] font-mono text-white/30 uppercase">NO RELEASES AVAILABLE</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 w-full">
            {releases.map((release, idx) => (
              <motion.div key={release.slug || idx} variants={itemFadeUp} className="group relative flex flex-col bg-black/40 backdrop-blur-xl border border-white/5 hover:border-white/20 transition-colors duration-1000 p-6 md:p-8 shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
                <div className="w-full aspect-square relative mb-8 overflow-hidden bg-white/5 border border-white/5">
                  <motion.div className="absolute inset-0 bg-cover bg-center opacity-80 group-hover:opacity-100 group-hover:scale-[1.05] transition-all duration-[1.5s] ease-[0.16,1,0.3,1]" style={{ backgroundImage: `url('${release.cover}')` }} />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.8)_100%)] pointer-events-none mix-blend-multiply opacity-80 group-hover:opacity-40 transition-opacity duration-1000" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/90 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-1000 ease-out" />
                </div>
                <div className="flex flex-col gap-2 mb-8 grow">
                  {/* UPDATE: Ukuran font judul disesuaikan jadi text-lg md:text-xl agar muat satu baris */}
                  <h2 className="text-lg md:text-xl font-light tracking-[0.1em] uppercase text-white leading-tight mb-2 truncate" title={release.title}>{release.title}</h2>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm tracking-[0.2em] uppercase text-white/60 font-medium truncate" title={release.artist}>{release.artist}</h3>
                    <div className="flex items-center gap-2 text-xs tracking-[0.15em] text-white/40 uppercase mt-2">
                      <span>{release.releaseDate}</span>
                      {release.album && (
                        <>
                          <span className="w-1 h-1 rounded-full bg-white/20" />
                          <span className="truncate">{release.album}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-auto w-full pt-6 border-t border-white/10">
                  <MagneticWrapper>
                    <button onClick={() => router.push(`/releases/${release.slug}`)} className="relative w-full overflow-hidden group/btn border border-white/10 hover:border-white/30 bg-transparent px-8 py-4 text-[10px] tracking-[0.4em] uppercase text-white cursor-pointer flex items-center justify-center transition-colors duration-700 ease-[0.16,1,0.3,1]">
                      <span className="relative z-10 transition-colors duration-700 ease-[0.16,1,0.3,1] group-hover/btn:text-black font-medium">VIEW RELEASE</span>
                      <div className="absolute inset-0 bg-white scale-y-0 origin-bottom transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover/btn:scale-y-100" />
                    </button>
                  </MagneticWrapper>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </main>
  );
}