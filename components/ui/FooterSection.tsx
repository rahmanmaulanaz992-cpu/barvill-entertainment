"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import MagneticWrapper from "@/components/ui/MagneticWrapper";

export default function FooterSection() {
  return (
    <footer className="relative w-full py-32 md:py-48 px-4 md:px-8 overflow-hidden">
      <motion.div 
        animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.05, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(255,255,255,0.05)_0%,transparent_60%)] pointer-events-none mix-blend-screen will-change-transform" 
      /> 

      <motion.div 
        animate={{ opacity: [0.01, 0.03, 0.01], filter: ["blur(20px)", "blur(30px)", "blur(20px)"], y: ["-10%", "10%", "-10%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none mix-blend-screen"
      >
        <h2 className="text-[30vw] font-extralight tracking-tighter text-white uppercase leading-none">
          VOID
        </h2>
      </motion.div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        <div className="text-[9px] tracking-[0.3em] text-white/30 uppercase">
          &copy; {new Date().getFullYear()} Barvill Entertainment
        </div>
        
        <div className="flex items-center gap-10">
          {['Transmission Log', 'Freq. Scan', 'Deep Dive'].map((item) => (
            <MagneticWrapper key={item}>
              <Link href="#" className="relative group text-[10px] tracking-[0.2em] text-white/40 hover:text-white uppercase transition-colors duration-1000 py-2 px-4">
                <span className="relative z-10">{item}</span>
              </Link>
            </MagneticWrapper>
          ))}
        </div>
        <div className="flex items-center gap-10">
          {['INSTAGRAM', 'SPOTIFY', 'YOUTUBE'].map((social) => (
            <MagneticWrapper key={social}>
              <Link href="#" className="relative group text-[10px] tracking-[0.2em] text-white/40 hover:text-white uppercase transition-colors duration-1000 py-2 px-4">
                <span className="relative z-10">{social}</span>
              </Link>
            </MagneticWrapper>
          ))}
        </div>
      </div>
    </footer>
  );
}