"use client";

import { useEffect, useRef, useState } from "react";

export default function AmbientAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hasInteracted = useRef(false);
  
  // State untuk melacak status audio aktif atau tidak
  const [isMuted, setIsMuted] = useState(false);
  const [isAudioStarted, setIsAudioStarted] = useState(false);

  useEffect(() => {
    // Inisialisasi HTMLAudioElement secara aman
    const audio = new Audio("/audio/ambient.mp3");
    audio.loop = true;
    audio.volume = 0; // Mulai dari sunyi untuk efek cinematic fade-in
    audioRef.current = audio;

    const targetVolume = 0.5;
    const volumeStep = 0.02; // Dipercepat sedikit agar fade-in terasa responsif

    const startAudio = () => {
      if (hasInteracted.current) return;
      hasInteracted.current = true;

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsAudioStarted(true);
            // Efek atmospheric fade-in
            fadeIntervalRef.current = setInterval(() => {
              if (audio.volume < targetVolume) {
                audio.volume = Math.min(audio.volume + volumeStep, targetVolume);
              } else {
                clearIntervalRefs();
              }
            }, 50);
          })
          .catch(() => {
            // Fallback senyap jika diblokir browser
          });
      }

      removeListeners();
    };

    const clearIntervalRefs = () => {
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = null;
      }
    };

    const addListeners = () => {
      window.addEventListener("click", startAudio, { once: true });
      window.addEventListener("touchstart", startAudio, { once: true });
      window.addEventListener("keydown", startAudio, { once: true });
    };

    const removeListeners = () => {
      window.removeEventListener("click", startAudio);
      window.removeEventListener("touchstart", startAudio);
      window.removeEventListener("keydown", startAudio);
    };

    addListeners();

    return () => {
      removeListeners();
      clearIntervalRefs();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current = null;
      }
    };
  }, []);

  // Fungsi toggle play dan pause saat tombol diklik
  const toggleSound = () => {
    const audio = audioRef.current;
    if (!audio || !isAudioStarted) return;

    if (isMuted) {
      // Jika dalam keadaan Muted, jalankan Play kembali
      audio.play().then(() => {
        setIsMuted(false);
        // Fade in volume kembali ke 0.5
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = setInterval(() => {
          if (audio.volume < 0.5) {
            audio.volume = Math.min(audio.volume + 0.05, 0.5);
          } else {
            if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
          }
        }, 50);
      });
    } else {
      // Jika sedang berbunyi, lakukan Fade out volume sebelum di-pause
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = setInterval(() => {
        if (audio.volume > 0.01) {
          audio.volume = Math.max(audio.volume - 0.05, 0);
        } else {
          audio.volume = 0;
          audio.pause();
          setIsMuted(true);
          if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
        }
      }, 50);
    }
  };

  return (
    /* Tombol Terapung di Pojok Kanan Bawah (Menyesuaikan desain Barvill) */
    <div className="fixed bottom-8 right-4 md:right-8 z-50 pointer-events-auto">
      <button
        onClick={toggleSound}
        className="group border border-white/10 hover:border-white/30 bg-black/40 backdrop-blur-md px-5 py-3 text-[10px] tracking-[0.4em] uppercase text-white cursor-pointer flex flex-col items-end justify-center rounded-sm transition-colors duration-500 rounded-xs"
      >
        <span className="text-white/50 font-mono text-[9px] mb-0.5">SOUND</span>
        <span className="font-semibold transition-colors duration-300 group-hover:text-neutral-300">
          {isMuted || !isAudioStarted ? "OFF" : "ON"}
        </span>
      </button>
    </div>
  );
}