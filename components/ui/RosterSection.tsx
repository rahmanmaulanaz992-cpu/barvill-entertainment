"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, type MotionValue, type Easing } from "framer-motion";
import ArtistCard from "@/components/ui/ArtistCard";
import { artists } from "@/data/artists";
import MagneticWrapper from "@/components/ui/MagneticWrapper";

const cinematicEase: Easing = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 60, scale: 0.98, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: { duration: 2.4, ease: cinematicEase } }
};
const fadeUpSlow = {
  hidden: { opacity: 0, y: 100, scale: 0.95, filter: "blur(16px)" },
  visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: { duration: 3.2, ease: cinematicEase } }
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.25, delayChildren: 0.3 } }
};

interface RosterSectionProps {
  smoothX: MotionValue<number>;
  smoothScrollY: MotionValue<number>;
}

export default function RosterSection({ smoothX, smoothScrollY }: RosterSectionProps) {
  const artistRef = useRef<HTMLElement>(null);
  const { scrollYProgress: artistScroll } = useScroll({ target: artistRef, offset: ["start end", "end start"] });
  const smoothArtistScroll = useSpring(artistScroll, { damping: 90, stiffness: 15, mass: 5 });
  
  const giantTypo2Y = useTransform(smoothScrollY, [500, 4000], [200, -500]);
  const artistArtY = useTransform(smoothArtistScroll, [0, 1], ["-20%", "20%"]);
  const artistContentY = useTransform(smoothArtistScroll, [0, 1], ["20%", "-20%"]);
  const artistTitleY = useTransform(smoothArtistScroll, [0, 1], ["35%", "-35%"]);

  return (
    <section ref={artistRef} className="relative w-full min-h-[140vh] flex items-center justify-center py-40 md:py-72 px-4 md:px-8 overflow-hidden">
      
      {/* Layer 1: Massive Atmospheric Typo Background */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none mix-blend-screen overflow-hidden">
        <motion.div 
          style={{ y: giantTypo2Y }} 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 4, ease: cinematicEase }}
          viewport={{ once: true, margin: "10%" }}
          className="whitespace-nowrap will-change-transform flex flex-col items-center"
        >
          <span className="text-[10px] md:text-[11px] tracking-[0.5em] text-white/20 font-mono uppercase mb-4 md:mb-8">Fragment: 02</span>
          <motion.h2 
            animate={{ opacity: [0.03, 0.1, 0.03], filter: ["blur(28px)", "blur(40px)", "blur(28px)"], scale: [1, 1.03, 1] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="text-[30vw] font-extralight tracking-tighter text-white uppercase leading-none"
          >
            PRESENCE
          </motion.h2>
        </motion.div>
      </div>

      {/* Layer 2: Fragmented Oversized Artist Identity */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none mix-blend-screen overflow-hidden">
        <motion.div style={{ y: artistTitleY }} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 0.2, scale: 1 }} transition={{ duration: 4, delay: 0.2, ease: cinematicEase }} viewport={{ once: true, margin: "10%" }} className="whitespace-nowrap will-change-transform flex flex-col items-center">
          <motion.h2 animate={{ opacity: [0.05, 0.15, 0.05] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} className="text-[35vw] font-light tracking-tighter text-transparent uppercase leading-none" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.08)' }}>
            G-MARTYR
          </motion.h2>
        </motion.div>
      </div>

      {/* Layer 3: Main Composition Wrapper */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center justify-center">
        
        <div className="w-full flex flex-col md:flex-row items-center justify-center relative mt-20">
          {/* Layer 3A: Floating Editorial Text Container */}
          <motion.div style={{ y: artistContentY }} variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-20%" }} className="w-full md:w-[40vw] relative z-20 md:mr-[5vw] mb-12 md:mb-0 md:-mt-[20vh] flex flex-col items-start text-left bg-black/40 backdrop-blur-xl border border-white/5 hover:border-white/15 transition-colors duration-1000 ease-[0.16,1,0.3,1] p-8 md:p-14 shadow-[0_30px_60px_rgba(0,0,0,0.9)] order-2 md:order-1">
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
              <div className="w-8 h-px bg-white/30" />
              <span className="text-[9px] tracking-[0.4em] text-white/40 uppercase font-mono">Entity Presence</span>
            </motion.div>
            <motion.h3 variants={fadeUp} className="text-5xl md:text-7xl font-light tracking-widest uppercase text-white leading-[0.9] mb-6">G-Martyr</motion.h3>
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-12">
              <span className="text-[9px] md:text-[10px] tracking-[0.4em] text-white/50 uppercase font-mono">Industrial</span>
              <div className="w-1 h-1 bg-white/30 rounded-full" />
              <span className="text-[9px] md:text-[10px] tracking-[0.4em] text-white/50 uppercase font-mono">Experimental</span>
            </motion.div>
            <motion.p variants={fadeUp} className="text-xs md:text-sm text-white/40 font-light leading-loose tracking-[0.2em] mb-14 max-w-md">
              Visi murni yang menghancurkan batas antara desain suara mekanis dan emosi mentah. Kehadirannya tidak hanya didengar, tetapi dirasakan melalui frekuensi yang menembus ruang fisik.
            </motion.p>
            <motion.div variants={fadeUp} className="w-full">
              <MagneticWrapper>
                <button className="group flex items-center justify-center gap-6 w-full py-5 border border-white/10 hover:border-white/30 bg-transparent hover:bg-white transition-all duration-700 ease-[0.16,1,0.3,1] cursor-pointer">
                  <span className="text-[9px] tracking-[0.5em] text-white/50 group-hover:text-black uppercase font-medium transition-colors duration-700 ease-[0.16,1,0.3,1]">Enter The Void</span>
                  <div className="w-8 h-px bg-white/30 group-hover:w-16 group-hover:bg-black transition-all duration-700 ease-[0.16,1,0.3,1]" />
                </button>
              </MagneticWrapper>
            </motion.div>
          </motion.div>

          {/* Layer 3B: Massive Atmospheric Portrait */}
          <motion.div style={{ y: artistArtY, x: useTransform(smoothX, [-1, 1], ["1%", "-1%"]) }} variants={fadeUpSlow} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-20%" }} className="w-full md:w-[45vw] aspect-[3/4] relative z-10 bg-white/5 border border-white/5 group cursor-pointer shadow-[0_40px_80px_rgba(0,0,0,0.9)] overflow-hidden order-1 md:order-2">
            <motion.div animate={{ scale: [1, 1.02, 1] }} transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }} className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1533134486753-c833f0eddebd?auto=format&fit=crop&q=80')] bg-cover bg-center grayscale opacity-50 group-hover:opacity-100 group-hover:scale-[1.05] transition-all duration-[1.5s] ease-[0.16,1,0.3,1]" />
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-90 group-hover:opacity-40 transition-opacity duration-[1.5s] ease-[0.16,1,0.3,1]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,1)_100%)] mix-blend-multiply opacity-90 group-hover:opacity-50 transition-opacity duration-[1.5s] ease-[0.16,1,0.3,1]" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-[1.5s] ease-[0.16,1,0.3,1] translate-y-4 group-hover:translate-y-0">
               <span className="text-[10px] tracking-[0.5em] text-white uppercase font-medium bg-black/50 backdrop-blur-md px-8 py-4 border border-white/20">Initiate Sequence</span>
            </div>
          </motion.div>
        </div>
        
        {/* Cinematic Artist Grid Roster */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 w-full mt-32">
          {artists.map((artist) => (<ArtistCard key={artist.name} artist={artist} />))}
        </div>
      </div>
    </section>
  );
}