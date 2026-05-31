"use client";

import { useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import ReleaseCard from "@/components/ui/ReleaseCard";
import type { SpotifyRelease } from "@/lib/spotify";
import type { YouTubeVideo } from "@/lib/youtube";
import type { Artist } from "@/types/music";

interface ClientArtistViewProps {
  artist: Artist;
  releases: SpotifyRelease[];
  videos: YouTubeVideo[];
}

export default function ClientArtistView({ artist, releases, videos }: ClientArtistViewProps) {
  const prefersReducedMotion = useReducedMotion();
  
  // --- MOUSE PARALLAX SYSTEM ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 200, mass: 0.5 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 200, mass: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (prefersReducedMotion) return;
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, prefersReducedMotion]);

  // Ambient Movement Based on Mouse
  const bgX = useTransform(smoothX, [-1000, 1000], [-30, 30]);
  const bgY = useTransform(smoothY, [-1000, 1000], [-30, 30]);
  const titleX = useTransform(smoothX, [-1000, 1000], [15, -15]);
  const titleY = useTransform(smoothY, [-1000, 1000], [15, -15]);

  // --- SCROLL PARALLAX SYSTEM ---
  const { scrollYProgress } = useScroll();
  
  // Hero Fades & Parallax
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroBlur = useTransform(scrollYProgress, [0, 0.3], ["blur(0px)", "blur(20px)"]);

  return (
    <main className="relative w-full bg-black text-white min-h-screen overflow-x-hidden">
      
      {/* --- CINEMATIC GRAIN OVERLAY --- */}
      <div 
        className="fixed inset-0 w-full h-full pointer-events-none z-50 mix-blend-screen opacity-30" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      {/* --- RETURN NAVIGATION --- */}
      <Link 
        href="/"
        className="fixed top-8 left-6 md:left-12 z-50 flex items-center gap-4 group"
      >
        <div className="w-8 h-px bg-white/30 group-hover:w-16 group-hover:bg-white transition-all duration-700 ease-out" />
        <span className="text-[9px] md:text-[10px] tracking-[0.4em] uppercase text-white/50 group-hover:text-white transition-colors duration-700">
          Return to Ecosystem
        </span>
      </Link>

      {/* --- IMMERSIVE HERO SECTION --- */}
      <motion.section 
        style={{ y: heroY, opacity: heroOpacity, filter: heroBlur }}
        className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Background Layer: Atmospheric Image */}
        <motion.div style={{ x: bgX, y: bgY }} className="absolute inset-0 w-[110vw] h-[110vh] -left-[5vw] -top-[5vh]">
          <Image 
            src={artist.image || "/images/artist-placeholder.jpg"} 
            alt={artist.name}
            fill
            className="object-cover grayscale opacity-30 mix-blend-screen"
            priority
          />
          {/* Depth Gradients */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.9)_100%)]" />
          <div className="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-black" />
        </motion.div>

        {/* Central Typographic Layer */}
        <motion.div style={{ x: titleX, y: titleY }} className="relative z-10 flex flex-col items-center text-center px-4">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-[10px] md:text-xs tracking-[0.5em] text-white/50 uppercase mb-8 block"
          >
            Signal Ident: {artist.status}
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-8xl lg:text-9xl font-light tracking-[0.2em] uppercase text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.2)]"
          >
            {artist.name}
          </motion.h1>

          {/* Ambient Cycle Status */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 1 }}
            className="mt-12 flex items-center gap-6"
          >
            <div className="w-12 h-px bg-white/20" />
            <span className="text-[9px] tracking-[0.4em] uppercase text-white/40">Cycle: {artist.cycle || "DORMANT"}</span>
            <div className="w-12 h-px bg-white/20" />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* --- ATMOSPHERE / LORE SECTION --- */}
      <section className="relative z-20 w-full min-h-[60vh] flex items-center justify-center px-6 py-24 bg-black">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl text-center flex flex-col items-center"
        >
          <span className="text-[10px] tracking-[0.4em] text-white/40 uppercase mb-8 block">World Signal</span>
          <h2 className="text-xl md:text-3xl font-light leading-relaxed tracking-wider text-white/80">
            {artist.description}
          </h2>
          <div className="w-px h-24 bg-linear-to-b from-white/30 to-transparent mt-16" />
        </motion.div>
      </section>

      {/* --- AUDIO TRANSMISSION (SPOTIFY RELEASES) --- */}
      {releases.length > 0 && (
        <section className="relative z-20 w-full px-6 md:px-12 lg:px-24 py-24 border-t border-white/5 bg-black">
          <div className="mb-16 flex flex-col items-center text-center">
            <span className="text-[10px] tracking-[0.4em] text-white/40 uppercase mb-4 block">Sonic Archive</span>
            <h3 className="text-3xl md:text-5xl font-light tracking-[0.2em] uppercase">Transmissions</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {releases.map((release, idx) => (
              <motion.div 
                key={release.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: idx * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <ReleaseCard release={release} />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* --- CINEMATIC VISUAL MEDIA STRIP (YOUTUBE UPLOADS) --- */}
      {videos.length > 0 && (
        <section className="relative z-20 w-full py-24 border-t border-white/5 bg-black overflow-hidden">
          <div className="px-6 md:px-12 lg:px-24 mb-16">
            <span className="text-[10px] tracking-[0.4em] text-white/40 uppercase mb-4 block">Visual Archive</span>
            <h3 className="text-3xl md:text-5xl font-light tracking-[0.2em] uppercase">Cinematic Signals</h3>
          </div>

          {/* Horizontal Scrolling Rail */}
          <div className="flex overflow-x-auto gap-6 md:gap-8 px-6 md:px-12 lg:px-24 snap-x snap-mandatory hide-scrollbar pb-12" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {videos.map((video, idx) => (
              <motion.a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                key={video.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: idx * 0.15 }}
                viewport={{ once: true }}
                className="group relative flex-none w-[85vw] md:w-[50vw] lg:w-[40vw] aspect-video bg-white/5 border border-white/10 snap-center shrink-0 cursor-pointer overflow-hidden"
              >
                {/* High Contrast Monochrome Thumbnail */}
                <Image 
                  src={video.thumbnail} 
                  alt={video.title}
                  fill
                  className="object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-out"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Atmospheric Overlays */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-1000" />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-1000" />
                
                {/* Metadata Reveal */}
                <div className="absolute bottom-6 md:bottom-8 left-6 md:left-8 right-6 md:right-8 z-20 flex flex-col justify-end pointer-events-none">
                  <div className="overflow-hidden mb-2">
                    <h4 className="text-sm md:text-lg font-light tracking-[0.2em] uppercase text-white drop-shadow-lg translate-y-0 transition-transform duration-700 ease-out">
                      {video.title}
                    </h4>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[8px] md:text-[9px] tracking-[0.3em] text-white/50 uppercase">
                      {new Date(video.publishedAt).getFullYear()} — Extracted Vision
                    </span>
                  </div>
                </div>

                {/* Interactive Play Blur Reveal */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 scale-50 group-hover:scale-150" />
              </motion.a>
            ))}
          </div>
        </section>
      )}

      {/* --- FOOTER CINEMATIC PADDING --- */}
      <div className="w-full h-32 md:h-48 bg-black flex items-center justify-center">
        <div className="w-full max-w-sm h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
      </div>

    </main>
  );
}