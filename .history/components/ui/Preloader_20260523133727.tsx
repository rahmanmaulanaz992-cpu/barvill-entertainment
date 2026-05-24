"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mengatur durasi preloader tampil sebelum mulai memudar (3.5 detik)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black text-white overflow-hidden pointer-events-auto"
          className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-black text-white overflow-hidden pointer-events-auto"
        >
          {/* Cinematic Background Noise */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-screen"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />

          <motion.div
            initial={{ opacity: 0, filter: "blur(20px)", scale: 0.9 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            exit={{ opacity: 0, filter: "blur(12px)", scale: 1.05 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="flex flex-col items-center z-10"
          >
            <span className="text-[10px] md:text-xs tracking-[0.4em] text-white/50 uppercase block mb-6">
              Barbarian Village
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-[0.25em] text-center uppercase leading-tight">
              BARVILL
              <span className="block text-lg md:text-2xl lg:text-3xl font-medium text-white/80 tracking-[0.3em] mt-3">
                ENTERTAINMENT
              </span>
            </h1>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}