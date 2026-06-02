useEffect(() => {
    // Fungsi untuk mencari elemen audio secara berkala jika Next.js telat merender
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

    // Jalankan langsung dan beri sedikit delay aman untuk siklus render Next.js
    const cleanup = syncAudio();
    const timeoutId = setTimeout(syncAudio, 500);

    return () => {
      clearTimeout(timeoutId);
      if (cleanup) cleanup();
    };
  }, []
);