"use client";

import React from "react";
import { motion, Easing } from "framer-motion";

const cinematicEase: Easing = [0.16, 1, 0.3, 1];

export default function CinematicDivider({ narrativeText }: { narrativeText?: string }) {
  return (
    <div className="relative w-full py-40 md:py-64 flex flex-col items-center justify-center pointer-events-none select-none z-10 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-black via-transparent to-black z-0 opacity-80" />
      
      {narrativeText && (
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 3, ease: cinematicEase }}
          viewport={{ once: true, margin: "-20%" }}
          className="absolute z-20 text-center px-4"
        >
          <motion.div 
            animate={{ opacity: [0.15, 0.4, 0.15], filter: ["blur(1px)", "blur(3px)", "blur(1px)"] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="text-white/60 text-[10px] md:text-xs font-mono tracking-[0.5em] uppercase text-center"
          >
            {narrativeText}
          </motion.div>
        </motion.div>
      )}

      <motion.div 
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: [0.5, 1, 0.5], scaleX: 1 }}
        transition={{ opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" }, scaleX: { duration: 3.5, ease: cinematicEase } }}
        viewport={{ once: true, margin: "-20%" }}
        className="w-full max-w-5xl h-px bg-linear-to-r from-transparent via-white/20 to-transparent origin-center z-10" 
      />
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 4, ease: cinematicEase, delay: 0.5 }}
        viewport={{ once: true, margin: "-20%" }}
        className="absolute w-1/2 max-w-xl h-10 rounded-full origin-center z-10" 
      >
        <motion.div 
          animate={{ opacity: [0.1, 0.4, 0.1], scaleY: [0.8, 1.5, 0.8], scaleX: [0.9, 1.1, 0.9] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="w-full h-full bg-white/10 blur-[20px] rounded-full"
        />
      </motion.div>
    </div>
  );
}