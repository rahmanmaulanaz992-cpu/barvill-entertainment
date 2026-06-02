"use client";

import { useEffect, useRef } from "react";

export default function AmbientAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hasInteracted = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0; // Mulai dari sunyi untuk fade-in cinematic
    const targetVolume = 0.5;
    const volumeStep = 0.002;

    const startAudio = () => {
      if (hasInteracted.current) return;
      hasInteracted.current = true;

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
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
          .catch(() => {});
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

    return () => {
      removeListeners();
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  // Merender tag audio fisik ke dalam HTML agar bisa dibaca oleh SoundToggle
  return (
    <audio
      ref={audioRef}
      src="/audio/ambient.mp3"
      loop
      className="hidden"
      preload="auto"
    />
  );
}