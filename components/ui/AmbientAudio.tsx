"use client";

import { useEffect, useRef } from "react";

export default function AmbientAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hasInteracted = useRef(false);

  useEffect(() => {
    // Initialize HTMLAudioElement safely
    const audio = new Audio("/audio/ambient.mp3");
    audio.loop = true;

    audio.addEventListener("play", () => {
      console.log("AUDIO PLAYING");
    });

    audio.addEventListener("error", (e) => {
      console.log("AUDIO ERROR", e);
    });

    audio.volume = 0; // Start completely silent for smooth atmospheric fade-in
    audioRef.current = audio;

    const targetVolume = 0.5;
    const volumeStep = 0.002;

    const startAudio = () => {
      console.log("AUDIO DIMULAI");
      if (hasInteracted.current) return;
      hasInteracted.current = true;

      // Attempt to play audio
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Soft atmospheric fade-in
            fadeIntervalRef.current = setInterval(() => {
              if (audio.volume < targetVolume) {
                audio.volume = Math.min(audio.volume + volumeStep, targetVolume);
              } else {
                if (fadeIntervalRef.current) {
                  clearInterval(fadeIntervalRef.current);
                  fadeIntervalRef.current = null;
                }
              }
            }, 100);
          })
          .catch(() => {
            // Graceful silent fallback if blocked by browser or file is missing
          });
      }

      removeListeners();
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

    // Cleanup on unmount (Production Safe)
    return () => {
      removeListeners();
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current = null;
      }
    };
  }, []);

  // Purely functional logic layer, renders absolutely nothing
  return null;
}