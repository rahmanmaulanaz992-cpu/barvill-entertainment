"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function SoundToggle() {
  const [isSoundOn, setIsSoundOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const syncAudio = () => {
      const audioEl = document.querySelector("audio");
      
      if (audioEl) {
        audioRef.current = audioEl;
        setIsSoundOn(!audioEl.paused);

        const handlePlay = () => setIsSoundOn(true);
        const handlePause = () => setIsSoundOn(false);

        audioEl.addEventListener("play", handlePlay);
        audioEl.addEventListener("pause", handlePause);

        return () => {
          audioEl.removeEventListener("play", handlePlay);
          audioEl.removeEventListener("pause", handlePause);
        };
      }
    };

    const cleanup = syncAudio();
    const timeoutId = setTimeout(syncAudio, 500);

    return () => {
      clearTimeout(timeoutId);
      if (cleanup) cleanup();
    };
  }, []);

  const toggleSound = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play().catch((err) => console.error("Audio playback failed:", err));
      } else {
        audioRef.current.pause();
      }
    } else {
      setIsSoundOn((prev) => !prev);
    }
  };

  return (
    <motion.button
      onClick={toggleSound}
      aria-label={isSoundOn ? "Mute ambient sound" : "Play ambient sound"}
      whileHover={{
        scale: 1.05,
        borderColor: "rgba(255,255,255,0.4)",
      }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 flex items-center gap-3 px-5 py-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.03)] transition-shadow hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] group outline-none"
    >
      {/* Cinematic Animated Equalizer Icon */}
      <div className="flex items-end h-3" style={{ gap: "3px" }} aria-hidden="true">
        {[1, 2, 3].map((bar) => (
          <motion.div
            key={bar}
            animate={{
              height: isSoundOn ? ["20%", "100%", "40%", "80%", "20%"] : "20%",
            }}
            transition={{
              duration: 1.5,
              repeat: isSoundOn ? Infinity : 0,
              ease: "easeInOut",
              delay: bar * 0.1,
            }}
            className="w-0.5 bg-white/80 rounded-full"
          />
        ))}
      </div>

      {/* Minimalist Text State */}
      <span className="text-[9px] md:text-[10px] font-medium tracking-[0.3em] uppercase w-18 text-left opacity-70 group-hover:opacity-100 transition-opacity">
        {isSoundOn ? "SOUND ON" : "SOUND OFF"}
      </span>
    </motion.button>
  );
}