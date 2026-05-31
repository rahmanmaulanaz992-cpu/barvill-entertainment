"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, type MotionValue, type Easing } from "framer-motion";
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

interface JournalSectionProps {
  smoothX: MotionValue<number>;
  smoothScrollY: MotionValue<number>;
}

export default function JournalSection({ smoothX, smoothScrollY }: JournalSectionProps) {
  const journalRef = useRef<HTMLElement>(null);
  const { scrollYProgress: journalScroll } = useScroll({ target: journalRef, offset: ["start end", "end start"] });
  const smoothJournalScroll = useSpring(journalScroll, { damping: 90, stiffness: 15, mass: 5 });
  
  const giantTypo3Y = useTransform(smoothScrollY, [1500, 5000], [300, -600]);
  const journalArtY = useTransform(smoothJournalScroll, [0, 1], ["-15%", "15%"]);
  const journalContentY = useTransform(smoothJournalScroll, [0, 1], ["25%", "-25%"]);
  const journalBoxY = useTransform(smoothJournalScroll, [0, 1], ["15%", "-15%"]);

  return (
    <section ref={journalRef} className="relative w-full min-h-[140vh] flex items-center justify-center py-40 md:py-72 px-4 md:px-8 overflow-hidden">
      
      {/* Layer 1: Massive Atmospheric Typo Background */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none mix-blend-screen overflow-hidden">
        <motion.div 
          style={{ y: giantTypo3Y }} 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 4, ease: cinematicEase }}
          viewport={{ once: true, margin: "10%" }}
          className="whitespace-nowrap will-change-transform flex flex-col items-center"
        >
          <span className="text-[10px] md:text-[11px] tracking-[0.5em] text-white/20 font-mono uppercase mb-4 md:mb-8">Fragment: 01</span>
          <motion.h2 
            animate={{ opacity: [0.04, 0.12, 0.04], filter: ["blur(24px)", "blur(36px)", "blur(24px)"], scale: [1.02, 0.98, 1.02] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="text-[30vw] font-extralight tracking-tighter text-white uppercase leading-none"
          >
            ARCHIVES
          </motion.h2>
        </motion.div>
      </div>

      {/* Layer 2: Main Composition Wrapper */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center justify-center mt-20">
        
        <div className="w-full flex flex-col items-center justify-center relative">
          {/* Header Context */}
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-20%" }} className="flex flex-col items-center gap-6 mb-20 md:mb-32">
            <div className="w-px h-16 bg-linear-to-b from-transparent via-white/30 to-transparent" />
            <span className="text-[9px] tracking-[0.4em] text-white/40 uppercase font-mono">Memory Archives</span>
          </motion.div>

          {/* Layer 3A: Large Cinematic Editorial Image */}
          <motion.div style={{ y: journalArtY, x: useTransform(smoothX, [-1, 1], ["-0.5%", "0.5%"]) }} variants={fadeUpSlow} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-20%" }} className="w-full md:w-[75vw] aspect-video md:aspect-[21/9] relative z-10 bg-white/5 border border-white/5 group cursor-pointer shadow-[0_40px_80px_rgba(0,0,0,0.9)] overflow-hidden">
            <motion.div animate={{ scale: [1, 1.02, 1] }} transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }} className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80')] bg-cover bg-center grayscale opacity-50 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-[1.5s] ease-[0.16,1,0.3,1]" />
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-90 group-hover:opacity-40 transition-opacity duration-[1.5s] ease-[0.16,1,0.3,1]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,1)_100%)] mix-blend-multiply opacity-90 group-hover:opacity-60 transition-opacity duration-[1.5s] ease-[0.16,1,0.3,1]" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-[1.5s] ease-[0.16,1,0.3,1] translate-y-4 group-hover:translate-y-0">
               <span className="text-[10px] tracking-[0.5em] text-white uppercase font-medium bg-black/50 backdrop-blur-md px-8 py-4 border border-white/20">Read Article</span>
            </div>
          </motion.div>

          {/* Layer 3B: Overlapping Massive Story Title */}
          <motion.div style={{ y: journalContentY }} variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-20%" }} className="w-full relative z-20 flex flex-col items-center text-center -mt-[15vh] md:-mt-[25vh] pointer-events-none">
            <motion.h3 variants={fadeUp} className="text-5xl md:text-8xl lg:text-[9rem] font-light tracking-tighter uppercase text-white leading-[0.85] mix-blend-screen drop-shadow-2xl">
              <span className="block italic font-extralight text-white/70 tracking-[0.1em] text-3xl md:text-6xl lg:text-[5rem] mb-2 md:mb-6">The Anatomy of</span>Sound
            </motion.h3>
          </motion.div>

          {/* Layer 3C: Editorial Meta & Excerpt (Floating Box) */}
          <motion.div style={{ y: journalBoxY }} variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-20%" }} className="w-full md:w-[35vw] relative z-30 mt-12 md:mt-24 flex flex-col items-center md:items-start text-center md:text-left bg-black/40 backdrop-blur-xl border border-white/5 hover:border-white/15 transition-colors duration-1000 ease-[0.16,1,0.3,1] p-8 md:p-14 shadow-[0_30px_60px_rgba(0,0,0,0.9)]">
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
              <span className="text-[9px] tracking-[0.4em] text-white/40 uppercase font-mono">Behind The Scene</span>
              <div className="w-4 h-px bg-white/30" />
              <span className="text-[9px] tracking-[0.4em] text-white/40 uppercase font-mono">Oct 24</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}