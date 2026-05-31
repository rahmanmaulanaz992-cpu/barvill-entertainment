"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const signals = [
  {
    id: "01",
    question: "WHAT IS BARVILL?",
    answer: "Lebih dari sebuah entitas bisnis. Barvill adalah ekosistem sinematik tempat frekuensi suara dan visi visual dilebur menjadi satu identitas utuh. Kami mengkurasi masa depan pengalaman pendengaran dalam format yang absolut."
  },
  {
    id: "02",
    question: "IS THIS A LABEL OR A WORLD?",
    answer: "Keduanya. Kami beroperasi sebagai kurator artistik, namun membangun dunia di mana setiap rilis, visual, dan teks adalah fragmen dari narasi yang lebih besar. Sebuah alam semesta yang terus bernapas dan merespons."
  },
  {
    id: "03",
    question: "DO YOU ACCEPT TRANSMISSIONS?",
    answer: "Kami selalu mendengarkan anomali frekuensi di luar kelaziman. Jika visi Anda tidak dapat ditampung oleh ruang konvensional, kirimkan sinyal Anda. Hanya frekuensi yang selaras yang akan kami respon."
  },
  {
    id: "04",
    question: "WHERE DOES THE SOUND COME FROM?",
    answer: "Dari ruang hampa antara realitas dan imajinasi. Dari benturan antara instrumen organik dan arsitektur digital. Kami mencari suara yang terasa seperti ingatan dari masa depan yang belum terjadi."
  }
];

export default function AtmosphericSignals() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <div className="w-full flex flex-col gap-0 border-t border-white/10 relative">
      {signals.map((signal) => {
        const isActive = activeId === signal.id;
        return (
          <div key={signal.id} className="border-b border-white/10 flex flex-col group/signal">
            <button
              onClick={() => setActiveId(isActive ? null : signal.id)}
              className="w-full text-left py-8 md:py-12 flex items-center justify-between focus:outline-none relative overflow-hidden"
            >
              {/* Cinematic Hover Background */}
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-[100%] group-hover/signal:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none" />

              <div className="flex items-center gap-8 md:gap-16 z-10 relative">
                <span className="text-[10px] md:text-xs tracking-[0.4em] text-white/30 font-light group-hover/signal:text-white/60 transition-colors duration-500 w-6 md:w-8">
                  {signal.id}
                </span>
                <span className="text-xs md:text-base lg:text-lg font-light tracking-[0.25em] uppercase text-white/70 group-hover/signal:text-white transition-colors duration-500">
                  {signal.question}
                </span>
              </div>
              <motion.div
                animate={{ rotate: isActive ? 45 : 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-3 h-3 md:w-4 md:h-4 relative opacity-40 group-hover/signal:opacity-100 transition-opacity duration-500 z-10 shrink-0"
              >
                <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-white" />
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-white" />
              </motion.div>
            </button>
            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-10 md:pb-16 pl-[calc(2rem+1.5rem)] md:pl-[calc(4rem+2rem)] pr-4 md:pr-12">
                    <p className="text-sm md:text-base text-white/50 font-light leading-relaxed tracking-wider max-w-3xl italic">
                      {signal.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}