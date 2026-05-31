"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, type Easing } from "framer-motion";
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

interface ReleaseSectionProps {
  featuredRelease?: {
    title: string;
    artist: string;
  };
}

export default function ReleaseSection({ featuredRelease = { title: "ECHOES", artist: "BOYZAI" } }: ReleaseSectionProps) {
  const releaseRef = useRef<HTMLElement>(null);
  const { scrollYProgress: releaseScroll } = useScroll({ target: releaseRef, offset: ["start end", "end start"] });
  const smoothReleaseScroll = useSpring(releaseScroll, { damping: 90, stiffness: 15, mass: 5 });
  
  const releaseArtY = useTransform(smoothReleaseScroll, [0, 1], ["-20%", "20%"]);
  const releaseContentY = useTransform(smoothReleaseScroll, [0, 1], ["20%", "-20%"]);
  const releaseTitleY = useTransform(smoothReleaseScroll, [0, 1], ["35%", "-35%"]);

  return (
    <section ref={releaseRef} className="relative w-full min-h-[140vh] flex items-center justify-center py-40 md:py-72 px-4 md:px-8 overflow-hidden">
      
      {/* Layer 1: Massive Atmospheric Typography */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none mix-blend-screen overflow-hidden">
        <motion.div 
          style={{ y: releaseTitleY }} 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 0.2, scale: 1 }}
          transition={{ duration: 4, ease: cinematicEase }}
          viewport={{ once: true, margin: "10%" }}
          className="whitespace-nowrap will-change-transform flex flex-col items-center"
        >
          <span className="text-[10px] md:text-[11px] tracking-[0.5em] text-white/20 font-mono uppercase mb-4 md:mb-8">Fragment: 03</span>
          <motion.h2 
            animate={{ opacity: [0.04, 0.12, 0.04], filter: ["blur(32px)", "blur(48px)", "blur(32px)"], scale: [0.98, 1.02, 0.98] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            className="text-[40vw] font-extralight tracking-tighter text-white uppercase leading-none"
          >
            ANOMALY
          </motion.h2>
        </motion.div>
      </div>

      {/* Layer 2: Main Composition Wrapper */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center">
        
        {/* Layer 2A: Large Parallax Artwork */}
        <motion.div 
          style={{ y: releaseArtY }} 
          variants={fadeUpSlow} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-20%" }}
          className="w-full md:w-[50vw] aspect-square md:aspect-[4/5] relative z-10 bg-white/5 border border-white/5 group cursor-pointer shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden"
        >
          <motion.div 
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1493225457289-7170889f0747?auto=format&fit=crop&q=80')] bg-cover bg-center grayscale opacity-70 group-hover:opacity-100 group-hover:scale-[1.05] transition-all duration-[1.5s] ease-[0.16,1,0.3,1]" 
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-30 transition-opacity duration-[1.5s] ease-[0.16,1,0.3,1]" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-[1.5s] ease-[0.16,1,0.3,1] translate-y-4 group-hover:translate-y-0">
             <span className="text-[10px] tracking-[0.5em] text-white uppercase font-medium bg-black/50 backdrop-blur-md px-6 py-3 border border-white/20">Explore Sonic Space</span>
          </div>
        </motion.div>

        {/* Layer 2B: Overlapping Editorial Content */}
        <motion.div 
          style={{ y: releaseContentY }}
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-20%" }}
          className="w-full md:w-[45vw] md:-ml-[10vw] relative z-20 mt-12 md:mt-48 flex flex-col items-start text-left bg-black/40 backdrop-blur-xl border border-white/5 hover:border-white/15 transition-colors duration-1000 ease-[0.16,1,0.3,1] p-8 md:p-14 shadow-[0_30px_60px_rgba(0,0,0,0.9)]"
        >
          <motion.h2 variants={fadeUp} className="text-5xl md:text-7xl lg:text-[6.5rem] font-light tracking-tighter uppercase text-white leading-[0.85] mb-6">{featuredRelease.title}</motion.h2>
          <motion.p variants={fadeUp} className="text-sm md:text-base text-white/50 font-light leading-loose tracking-[0.15em] mb-16 max-w-lg">
            Menampilkan rilisan terbaru dari Barvill:<br />
            &quot;{featuredRelease.title}&quot; oleh {featuredRelease.artist}.<br />
            <br />
            Dengarkan sekarang.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col w-full gap-6">
            <MagneticWrapper>
              <button className="relative w-full overflow-hidden group border border-white/10 hover:border-white/30 bg-transparent px-10 py-5 text-[10px] tracking-[0.4em] uppercase text-white cursor-pointer flex items-center justify-center gap-4 transition-colors duration-700 ease-[0.16,1,0.3,1]">
                <span className="relative z-10 transition-colors duration-700 ease-[0.16,1,0.3,1] group-hover:text-black font-medium">LISTEN NOW</span>
                <div className="absolute inset-0 bg-white scale-y-0 origin-bottom transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:scale-y-100" />
              </button>
            </MagneticWrapper>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}