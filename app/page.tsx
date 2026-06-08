"use client";

import { useEffect, useRef, useState } from "react";
import { motion, Easing, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import MagneticWrapper from "@/components/ui/MagneticWrapper";
import { getLatestUploads, type YouTubeVideo } from "@/lib/youtube";
import { artists } from "@/data/artists";

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
const heroStaggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.3, delayChildren: 1.2 } }
};

const CinematicDivider = ({ narrativeText }: { narrativeText?: string }) => (
  <div className="relative w-full py-24 md:py-64 flex flex-col items-center justify-center pointer-events-none select-none z-10 overflow-hidden">
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
          animate={{ opacity: [0.15, 0.4, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="text-white/60 text-[10px] md:text-xs font-mono tracking-[0.5em] uppercase text-center blur-[1px] md:blur-none"
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

export default function HomePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Barvill Entertainment",
    "url": "https://barvillentertainment.com",
    "logo": "https://barvillentertainment.com/data/logo-barvill.jpg"
  };

  // --- DYNAMIC ARTIST DATA ---
  const safeArtists = Array.isArray(artists) ? artists : [];
  const featuredArtists = safeArtists
    .filter((artist) => artist?.featured)
    .sort((a, b) => (a.order || 0) - (b.order || 0));
  const secondFeaturedArtist = featuredArtists.length > 0 ? featuredArtists[0] : null; // Kept for the second section

  // --- CINEMATIC MOUSE INERTIA ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Heavier cinematic inertia for Barvill's signature melancholic gravity
  const smoothX = useSpring(mouseX, { damping: 180, stiffness: 10, mass: 12 });
  const smoothY = useSpring(mouseY, { damping: 180, stiffness: 10, mass: 12 });

  // --- CINEMATIC SCROLL PARALLAX ---
  const { scrollY, scrollYProgress } = useScroll();
  const smoothScrollY = useSpring(scrollY, { damping: 160, stiffness: 10, mass: 12 }); // Deepest, heaviest scroll momentum

  const heroBgY = useTransform(smoothScrollY, [0, 1200], [0, 350]); // Sink deeper
  const heroTypoY = useTransform(smoothScrollY, [0, 1200], [0, -350]); // Rise faster
  const heroContentY = useTransform(smoothScrollY, [0, 800], [0, 80]); // Further stabilized slow lagging
  const heroOpacity = useTransform(scrollY, [0, 700], [1, 0]); // Longer, more natural fade out
  const heroDarken = useTransform(scrollY, [0, 900], [0, 1]); // Longer, smoother darkening

  // Layered Massive Typography Scroll
  const giantTypo2Y = useTransform(smoothScrollY, [500, 4000], [200, -500]);
  const giantTypo3Y = useTransform(smoothScrollY, [1500, 5000], [300, -600]);

  // Global Atmosphere Tracker
  const globalAtmosY = useTransform(smoothScrollY, [0, 6000], ["0%", "100%"]);

  // --- CINEMATIC RELEASE SCROLL PARALLAX ---
  const releaseRef = useRef<HTMLElement>(null);
  const { scrollYProgress: releaseScroll } = useScroll({ target: releaseRef, offset: ["start end", "end start"] });
  const smoothReleaseScroll = useSpring(releaseScroll, { damping: 90, stiffness: 15, mass: 5 });
  const releaseArtY = useTransform(smoothReleaseScroll, [0, 1], ["-20%", "20%"]);
  const releaseContentY = useTransform(smoothReleaseScroll, [0, 1], ["20%", "-20%"]);
  const releaseTitleY = useTransform(smoothReleaseScroll, [0, 1], ["35%", "-35%"]);

  // --- CINEMATIC ARTIST SCROLL PARALLAX ---
  const artistRef = useRef<HTMLElement>(null);
  const { scrollYProgress: artistScroll } = useScroll({ target: artistRef, offset: ["start end", "end start"] });
  const smoothArtistScroll = useSpring(artistScroll, { damping: 90, stiffness: 15, mass: 5 });
  const artistArtY = useTransform(smoothArtistScroll, [0, 1], ["-20%", "20%"]);
  const artistContentY = useTransform(smoothArtistScroll, [0, 1], ["20%", "-20%"]);
  const artistTitleY = useTransform(smoothArtistScroll, [0, 1], ["35%", "-35%"]);

  // --- CINEMATIC JOURNAL SCROLL PARALLAX ---
  const journalRef = useRef<HTMLElement>(null);
  const { scrollYProgress: journalScroll } = useScroll({ target: journalRef, offset: ["start end", "end start"] });
  const smoothJournalScroll = useSpring(journalScroll, { damping: 90, stiffness: 15, mass: 5 });
  const journalArtY = useTransform(smoothJournalScroll, [0, 1], ["-15%", "15%"]);
  const journalContentY = useTransform(smoothJournalScroll, [0, 1], ["25%", "-25%"]);
  const journalBoxY = useTransform(smoothJournalScroll, [0, 1], ["15%", "-15%"]);

  // Global Cinematic Scroll Indicator
  const scrollProgress = useSpring(scrollYProgress, { damping: 50, stiffness: 40 });
  const progressHeight = useTransform(scrollProgress, [0, 1], ["0%", "100%"]);
  const progressOpacity = useTransform(scrollY, [0, 300], [0, 1]);

  // --- LAYERED DEPTH PARALLAX ---
  // Background Layer
  const bgX = useTransform(smoothX, [-1, 1], ["-1.5vw", "1.5vw"]);
  const bgY = useTransform(smoothY, [-1, 1], ["-1.5vh", "1.5vh"]);

  // Far Typography Layer (Deepest, moves slow in same direction)
  const typoFarX = useTransform(smoothX, [-1, 1], ["-2.5vw", "2.5vw"]);
  const typoFarY = useTransform(smoothY, [-1, 1], ["-2.5vh", "2.5vh"]);

  // Mid Typography Layer (Moves slow opposite)
  const typoMidX = useTransform(smoothX, [-1, 1], ["3vw", "-3vw"]);
  const typoMidY = useTransform(smoothY, [-1, 1], ["3vh", "-3vh"]);

  // Near Typography Layer (Moves fast opposite)
  const typoNearX = useTransform(smoothX, [-1, 1], ["-6vw", "6vw"]);
  const typoNearY = useTransform(smoothY, [-1, 1], ["-6vh", "6vh"]);

  // Foreground Content Layer
  const fgX = useTransform(smoothX, [-1, 1], ["1.5vw", "-1.5vw"]);
  const fgY = useTransform(smoothY, [-1, 1], ["1.5vh", "-1.5vh"]);

  // Spatial Rotations
  const rotateX = useTransform(smoothY, [-1, 1], ["8deg", "-8deg"]);
  const rotateY = useTransform(smoothX, [-1, 1], ["-8deg", "8deg"]);

  const typoRotateX = useTransform(smoothY, [-1, 1], ["-12deg", "12deg"]);
  const typoRotateY = useTransform(smoothX, [-1, 1], ["12deg", "-12deg"]);

  const envX = useTransform(smoothX, [-1, 1], ["-2%", "2%"]);
  const envY = useTransform(smoothY, [-1, 1], ["-2%", "2%"]);

  // --- DYNAMIC ECOSYSTEM STATE ---
  const [latestVideo, setLatestVideo] = useState<YouTubeVideo | null>(null);

  useEffect(() => {
    const fetchEcosystem = async () => {
      try {
        const ytIds = artists.map(a => a.youtubeChannelId).filter(Boolean) as string[];
        
        const videos = await getLatestUploads(ytIds, 1);
        if (videos?.length) {
          setLatestVideo(videos[0]);
        } else {
          throw new Error("No videos found from API");
        }
      } catch (error) {
        const fallbackVideo = {
          title: "THIS IS BARVILL",
          artist: "Barvill Entertainment",
          channelTitle: "Barvill Entertainment",
          thumbnail: "https://img.youtube.com/vi/qktecDUbZ00/maxresdefault.jpg",
          url: "https://youtu.be/qktecDUbZ00",
          publishedAt: "2026"
        } as unknown as YouTubeVideo;
        setLatestVideo(fallbackVideo);
      }
    };
    fetchEcosystem();
  }, []);

  const displayVideo = latestVideo || {
    title: "THIS IS BARVILL",
    artist: "Barvill Entertainment",
    channelTitle: "Barvill Entertainment",
    publishedAt: "2026",
    url: "https://youtu.be/qktecDUbZ00",
    thumbnail: "https://img.youtube.com/vi/qktecDUbZ00/maxresdefault.jpg"
  };

  // --- DYNAMIC LATEST JOURNAL ARTICLE ---
  const [latestArticle, setLatestArticle] = useState({
    slug: "the-anatomy-of-sound",
    title: "The Anatomy of Sound",
    category: "Behind The Scene",
    date: "OCT 24, 2026",
    content: ["Delving deeper into the creative process behind 'THE AWAKENING' era. How a mechanical soundscape was created from organically destroyed analog instruments."],
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80"
  });

  useEffect(() => {
    const fetchLatestArticle = async () => {
      try {
        const res = await fetch("/api/journal");
        if (!res.ok) throw new Error("Failed to fetch journal articles");
        const data = await res.json();
        if (data && data.length > 0) {
          const latest = data[0];
          setLatestArticle({
            slug: latest.slug || "the-anatomy-of-sound",
            title: latest.title || "The Anatomy of Sound",
            category: latest.category || "Behind The Scene",
            date: latest.date || "OCT 24, 2026",
            content: [latest.excerpt || ""],
            image: latest.cover || latest.image || "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80"
          });
        }
      } catch (error) {
        console.error("Failed to fetch API Journal:", error);
      }
    };
    fetchLatestArticle();
  }, []);

  // Split title safely to retain the cinematic two-liner typography effect
  const titleParts = latestArticle.title.split(":");
  const titleFirst = titleParts[0];
  const titleSecond = titleParts.length > 1 ? titleParts.slice(1).join(":").trim() : "";

  // --- EXTRACT VIDEO ID DYNAMICALLY FROM YOUTUBE URL ---
  const videoId = displayVideo.url 
    ? (displayVideo.url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/)?.[1] || "qktecDUbZ00")
    : "qktecDUbZ00";

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates from -1 to 1
      const normalizedX = (e.clientX / window.innerWidth) * 2 - 1;
      const normalizedY = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(normalizedX);
      mouseY.set(normalizedY);
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <main className="relative w-full bg-black text-white flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />
      {/* Global Cinematic Film Grain & Fog Environment */}

      {/* Environmental Identity Fragment */}
      <div className="fixed top-8 left-4 md:left-8 z-50 pointer-events-none mix-blend-screen opacity-40" aria-hidden="true">
        <p className="text-[8px] md:text-[9px] tracking-[0.4em] font-mono text-white/40 uppercase leading-relaxed flex flex-col gap-1">
          <span>LOC: BARVILL_SPACE</span>
          <motion.span animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>ATMOSPHERE: HEAVY</motion.span>
          <span>RESONANCE: <motion.span animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>ACTIVE</motion.span></span>
        </p>
      </div>

      <motion.div 
        animate={{ opacity: [0.03, 0.06, 0.03] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="fixed inset-0 z-50 pointer-events-none mix-blend-screen hidden md:block"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Sonic Resonance Illusion (Deep Sub-bass breathing) */}
      <motion.div
        animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.02, 0.06, 0.02] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] aspect-square rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_60%)] mix-blend-screen pointer-events-none z-0 transform-gpu hidden md:block"
        aria-hidden="true"
      />

      {/* Environmental Fog Layers */}
      <motion.div style={{ x: envX, y: envY }} className="fixed inset-0 z-0 pointer-events-none mix-blend-screen opacity-15 hidden md:block">
        <motion.div 
          animate={{ 
            x: ["-5%", "5%", "-5%"], 
            y: ["-2%", "2%", "-2%"],
            scale: [1, 1.05, 1],
            opacity: [0.05, 0.12, 0.05]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vh] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06)_0%,transparent_60%)] blur-[100px] will-change-transform"
        />
        <motion.div 
          animate={{ 
            x: ["5%", "-5%", "5%"], 
            y: ["2%", "-2%", "2%"],
            scale: [1.05, 1, 1.05],
            opacity: [0.03, 0.1, 0.03]
          }}
          transition={{ duration: 40, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="absolute -bottom-[20%] -right-[10%] w-[80vw] h-[80vh] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.04)_0%,transparent_60%)] blur-[120px] will-change-transform hidden md:block"
        />
      </motion.div>

      {/* Global Scroll Progress Bar */}
      <motion.div 
        style={{ opacity: progressOpacity }}
        className="fixed right-4 md:right-8 top-[20%] bottom-[20%] w-px bg-white/5 z-50 pointer-events-none hidden md:block"
      >
        <motion.div 
          style={{ height: progressHeight }} 
          className="w-full bg-white/60 shadow-[0_0_12px_rgba(255,255,255,0.4)] origin-top will-change-transform"
        />
        {/* Scroll Journey Markers */}
        <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[7px] font-mono tracking-[0.3em] text-white/30">Z: 00</span>
        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[7px] font-mono tracking-[0.3em] text-white/30">Z: 99</span>
      </motion.div>

      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative w-full h-svh flex flex-col items-center justify-center px-4 md:px-8 overflow-hidden bg-black perspective-[1200px]" style={{ perspective: "1200px" }}>
        
        {/* Layer 1: Background Depth */}
        <motion.div style={{ y: heroBgY }} className="absolute inset-0 z-0 pointer-events-none will-change-transform">
          <motion.div 
            initial={{ opacity: 0, scale: 1.15 }}
            animate={{ opacity: 1, scale: 1.1 }}
            transition={{ duration: 4, ease: "easeOut" }}
            style={{ x: bgX, y: bgY }} 
            className="absolute inset-0 will-change-transform"
          >
            <div 
              style={{ backgroundImage: `url('${displayVideo.thumbnail}')` }}
              className="absolute inset-0 bg-cover bg-center grayscale opacity-15" 
            />
            <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/80 to-black" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#000000_100%)] opacity-95" />
          </motion.div>
          {/* Atmospheric Transition Overlay (Darkens on Scroll) */}
          <motion.div style={{ opacity: heroDarken }} className="absolute inset-0 bg-black z-30 pointer-events-none" />
        </motion.div>

        {/* Layer 2: Atmosphere & Light Leaks */}
        <div className="absolute inset-0 z-10 pointer-events-none hidden md:block">
          <motion.div 
            animate={{ opacity: [0.02, 0.06, 0.02], scale: [1, 1.1, 1] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,1)_0%,transparent_60%)] blur-[100px] mix-blend-screen will-change-transform" 
          />
          <motion.div 
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#000_100%)] opacity-90 mix-blend-multiply" 
          />
        </div>

        {/* Layer 3: Massive Typography System */}
        <motion.div style={{ y: heroTypoY, rotateX: typoRotateX, rotateY: typoRotateY }} className="absolute inset-0 z-10 overflow-hidden pointer-events-none select-none flex items-center justify-center will-change-transform">
            
            {/* FAR LAYER - Deepest depth */}
            <motion.div 
              style={{ x: typoFarX, y: typoFarY }} 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 6, delay: 0.2, ease: cinematicEase }}
              className="absolute top-[5%] -left-[10%] whitespace-nowrap will-change-transform mix-blend-screen hidden md:flex flex-col items-start"
            >
              <span className="text-[8px] md:text-[10px] tracking-[0.5em] text-white/20 font-mono uppercase mb-4 ml-12 md:ml-24">Echo_01: Absence</span>
              <motion.h2 
                animate={{ opacity: [0.02, 0.06, 0.02], filter: ["blur(32px)", "blur(48px)", "blur(32px)"], scale: [0.98, 1.02, 0.98] }}
                transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
                className="text-[35vw] font-extralight tracking-tighter text-white uppercase leading-none"
              >
              {(displayVideo as any).channelTitle || "OBLIVION"}
              </motion.h2>
            </motion.div>

            {/* MID LAYER */}
            <motion.div 
              style={{ x: typoMidX, y: typoMidY }} 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 5, delay: 0.8, ease: cinematicEase }}
              className="absolute top-[25%] -right-[15%] whitespace-nowrap will-change-transform mix-blend-screen hidden md:flex flex-col items-end"
            >
              <span className="text-[8px] md:text-[10px] tracking-[0.5em] text-white/20 font-mono uppercase mb-4 mr-12 md:mr-24">Echo_02: Frequency</span>
              <motion.h2 
                animate={{ opacity: [0.05, 0.12, 0.05], filter: ["blur(12px)", "blur(20px)", "blur(12px)"], scale: [1, 1.03, 1] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="text-[28vw] font-light tracking-widest text-transparent uppercase leading-none" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}
              >
              {"RESONANCE"}
              </motion.h2>
            </motion.div>

            {/* NEAR LAYER */}
            <motion.div 
              style={{ x: typoNearX, y: typoNearY }} 
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 4, delay: 1.4, ease: cinematicEase }}
              className="absolute bottom-[5%] -left-[5%] whitespace-nowrap will-change-transform mix-blend-screen hidden md:flex flex-col items-start"
            >
              <span className="text-[8px] md:text-[10px] tracking-[0.5em] text-white/20 font-mono uppercase mb-4 ml-8 md:ml-16">Echo_03: Residual</span>
              <motion.h2 
                animate={{ opacity: [0.03, 0.08, 0.03], filter: ["blur(8px)", "blur(16px)", "blur(8px)"], scale: [1.02, 0.98, 1.02] }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 4 }}
                className="text-[22vw] font-medium tracking-tight text-white uppercase leading-none"
              >
              {String((displayVideo as any).publishedAt || "2026").substring(0, 4)}
              </motion.h2>
            </motion.div>
        </motion.div>

        {/* Layer 4: Foreground Focal Point */}
        <motion.div style={{ y: heroContentY, opacity: heroOpacity }} className="relative z-20 text-center flex flex-col items-center max-w-5xl mx-auto will-change-transform">
          <motion.div
            style={{ x: fgX, y: fgY, rotateX, rotateY }}
            variants={heroStaggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center will-change-transform"
          >
            <motion.div variants={fadeUp} className="mb-10 flex items-center gap-6 opacity-60">
              <div className="w-12 md:w-24 h-px bg-white/20" />
            <span className="text-[9px] md:text-[10px] tracking-[0.5em] text-white/50 uppercase font-mono">
              BARBARIAN VILLAGE
            </span>
            <div className="w-12 md:w-24 h-px bg-white/20" />
            </motion.div>

            <motion.h1
            variants={fadeUp}
            className="flex flex-col items-center text-5xl md:text-8xl lg:text-[10rem] font-light tracking-tight leading-[0.85] text-white uppercase mb-12 relative z-20"
          >
            <motion.span 
              animate={{ textShadow: ["0px 0px 10px rgba(255,255,255,0.1)", "0px 0px 40px rgba(255,255,255,0.3)", "0px 0px 10px rgba(255,255,255,0.1)"] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="block text-white"
            >
              BARVILL
            </motion.span>
            <span className="block text-2xl md:text-5xl lg:text-[4rem] text-white/20 font-extralight tracking-[0.3em] mt-4 italic drop-shadow-none">ENTERTAINMENT</span>
            </motion.h1>

            <motion.p
            variants={fadeUp}
            className="max-w-lg text-xs md:text-sm text-white/40 font-light leading-loose tracking-[0.2em] relative z-20"
          >
            Our mission is simple,<br /> Let you focus on your craft,<br />
            we will take care of the rest.
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div style={{ opacity: heroOpacity }} className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.5, duration: 2, ease: cinematicEase }}
            className="flex flex-col items-center gap-6"
          >
            <div className="w-px h-20 md:h-24 bg-linear-to-b from-white/0 via-white/50 to-white/0 animate-pulse" />
            <span className="text-[8px] md:text-[9px] tracking-[0.5em] text-white/40 uppercase font-medium">Scroll</span>
          </motion.div>
        </motion.div>
      </section>

      {/* WRAPPER FOR MAIN CONTENT: Makes it rise above the parallaxed hero */}
      <div className="relative z-30 flex flex-col w-full">
        
        {/* Cinematic Gradient Transition from Hero to Content */}
        <div className="w-full h-[30vh] md:h-[40vh] bg-linear-to-b from-transparent via-black/80 to-black pointer-events-none" />

        <div className="relative bg-black flex flex-col w-full">

        {/* Global Continuous Atmospheric Gradient */}
        <motion.div style={{ y: globalAtmosY }} className="absolute inset-0 z-0 pointer-events-none h-[200vh] hidden md:block">
          {/* Subtle slow drifting light */}
          <motion.div 
            animate={{ 
              opacity: [0.05, 0.15, 0.05],
              x: ["-5%", "5%", "-5%"],
              y: ["-2%", "2%", "-2%"]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08)_0%,transparent_50%)] blur-[120px] mix-blend-screen will-change-transform" 
          />
          {/* Breathing darkness for depth */}
          <motion.div 
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 5 }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#000_100%)] mix-blend-multiply" 
          />
        </motion.div>

      {/* 2. CINEMATIC FEATURED MUSIC VIDEO SECTION */}
      <section ref={releaseRef} className="relative w-full min-h-[100vh] md:min-h-[140vh] flex items-center justify-center py-24 md:py-72 px-4 md:px-8 overflow-hidden">
        
        {/* Layer 1: Massive Atmospheric Typography */}
        <div className="absolute inset-0 z-0 hidden md:flex items-center justify-center pointer-events-none mix-blend-screen overflow-hidden">
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
            variants={fadeUpSlow}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20%" }}
            className="w-full md:w-[50vw] aspect-video relative z-10 bg-white/5 border border-white/5 group cursor-pointer shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden"
          >
            <motion.div 
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 group-hover:scale-[1.05] transition-all duration-[1.5s] ease-[0.16,1,0.3,1] pointer-events-none"
              style={{ filter: "none", mixBlendMode: "normal" }}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center md:hidden"
                style={{ backgroundImage: `url('${displayVideo.thumbnail}')` }}
              />
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&playsinline=1&rel=0`}
                className="hidden md:block absolute inset-0 w-full h-full scale-[1.15]"
                allow="autoplay; encrypted-media"
                frameBorder="0"
                style={{ filter: "none", mixBlendMode: "normal" }}
              />
            </motion.div>
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-30 transition-opacity duration-[1.5s] ease-[0.16,1,0.3,1] pointer-events-none" />
          </motion.div>

          {/* Layer 2B: Overlapping Editorial Content */}
          <motion.div 
            style={{ y: releaseContentY }}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20%" }}
            className="w-full md:w-[45vw] md:-ml-[10vw] relative z-20 -mt-6 md:mt-24 lg:mt-32 flex flex-col items-start text-left bg-black/40 backdrop-blur-xl border border-white/5 hover:border-white/15 transition-colors duration-1000 ease-[0.16,1,0.3,1] p-6 md:p-14 shadow-[0_30px_60px_rgba(0,0,0,0.9)]"
          >
            
            <motion.h2 variants={fadeUp} className="text-4xl md:text-7xl lg:text-[6.5rem] font-light tracking-tighter uppercase text-white leading-[0.85] mb-4 md:mb-6">
            {(displayVideo as any).title}
            </motion.h2>
            
            <motion.div variants={fadeUp} className="flex items-center gap-6 mb-12">
              <span className="text-lg md:text-xl font-light tracking-[0.4em] uppercase text-white/80">{((displayVideo as any).channelTitle || (displayVideo as any).artist)}</span>
              <div className="w-1 h-1 bg-white/30 rounded-full" />
              <span className="text-[10px] md:text-xs tracking-[0.3em] text-white/40 uppercase font-mono">
                {String((displayVideo as any).publishedAt || "2026").substring(0,4)}
              </span>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col w-full gap-6">
              <MagneticWrapper>
              <button 
                onClick={() => displayVideo.url && window.open(displayVideo.url, "_blank")}
                className="relative w-full overflow-hidden group border border-white/10 hover:border-white/30 bg-transparent px-10 py-5 text-[10px] tracking-[0.4em] uppercase text-white cursor-pointer flex items-center justify-center gap-4 transition-colors duration-700 ease-[0.16,1,0.3,1]"
              >
                  <span className="relative z-10 transition-colors duration-700 ease-[0.16,1,0.3,1] group-hover:text-black font-medium">WATCH NOW</span>
                  <div className="absolute inset-0 bg-white scale-y-0 origin-bottom transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:scale-y-100" />
                </button>
              </MagneticWrapper>
              
              <MagneticWrapper>
                <button className="group flex items-center justify-center gap-4 w-full py-4 cursor-pointer">
                  <span className="text-[10px] tracking-[0.3em] text-white/40 group-hover:text-white uppercase font-mono transition-colors duration-1000 ease-[0.16,1,0.3,1]">Decrypt Lore</span>
                  <div className="w-8 h-px bg-white/20 group-hover:w-16 group-hover:bg-white transition-all duration-1000 ease-[0.16,1,0.3,1]" />
                </button>
              </MagneticWrapper>
            </motion.div>
          </motion.div>

        </div>
      </section>

      <CinematicDivider narrativeText="Sector 01: Descent Into Anomaly" />

      {/* 3. CINEMATIC ARTIST PRESENCE SECTION */}
      <section ref={artistRef} className="relative w-full min-h-[100vh] md:min-h-[140vh] flex items-center justify-center py-24 md:py-72 px-4 md:px-8 overflow-hidden">
        
        {/* Layer 1: Massive Atmospheric Typo Background */}
        <div className="absolute inset-0 z-0 hidden md:flex items-center justify-center pointer-events-none mix-blend-screen overflow-hidden">
          <motion.div 
            style={{ y: giantTypo2Y }} 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 0.3, scale: 1 }}
            transition={{ duration: 4, ease: cinematicEase }}
            viewport={{ once: true, margin: "10%" }}
            className="whitespace-nowrap will-change-transform flex flex-col items-center"
          >
            <span className="text-[10px] md:text-[11px] tracking-[0.5em] text-white/20 font-mono uppercase mb-4 md:mb-8">Fragment: 02</span>
            <motion.h2 
              animate={{ opacity: [0.03, 0.1, 0.03], filter: ["blur(28px)", "blur(40px)", "blur(28px)"], scale: [1, 1.03, 1] }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="text-[30vw] font-extralight tracking-tighter text-white uppercase leading-none"
            >
            ARTIST
            </motion.h2>
          </motion.div>
        </div>

        {/* Layer 2: Fragmented Oversized Artist Identity */}
        <div className="absolute inset-0 z-0 hidden md:flex items-center justify-center pointer-events-none mix-blend-screen overflow-hidden">
          <motion.div 
            style={{ y: artistTitleY }} 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 0.2, scale: 1 }}
            transition={{ duration: 4, delay: 0.2, ease: cinematicEase }}
            viewport={{ once: true, margin: "10%" }}
            className="whitespace-nowrap will-change-transform flex flex-col items-center"
          >
            <motion.h2 
              animate={{ opacity: [0.05, 0.15, 0.05] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              className="text-[35vw] font-light tracking-tighter text-transparent uppercase leading-none" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.08)' }}
            >
            {(displayVideo as any).title}
            </motion.h2>
          </motion.div>
        </div>

        {/* Layer 3: Main Composition Wrapper */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center justify-center">
          
          <div className="w-full flex flex-col md:flex-row items-center justify-center relative mt-20">
            {/* Layer 3A: Floating Editorial Text Container */}
            <motion.div 
              style={{ y: artistContentY }}
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-20%" }}
              className="w-full md:w-[40vw] relative z-20 md:mr-[5vw] -mt-6 md:mt-0 mb-12 md:mb-0 md:-mt-[20vh] flex flex-col items-start text-left bg-black/40 backdrop-blur-xl border border-white/5 hover:border-white/15 transition-colors duration-1000 ease-[0.16,1,0.3,1] p-6 md:p-14 shadow-[0_30px_60px_rgba(0,0,0,0.9)] order-2 md:order-1"
            >
              <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
                <div className="w-8 h-px bg-white/30" />
              <span className="text-[9px] tracking-[0.4em] text-white/40 uppercase font-mono">BARVILL ENTERTAINMENT</span>
              </motion.div>
              
              <motion.h3 variants={fadeUp} className="text-4xl md:text-7xl font-light tracking-widest uppercase text-white leading-[0.9] mb-4 md:mb-6">
                {(displayVideo as any).title}
              </motion.h3>
              
              <motion.div variants={fadeUp} className="w-full">
                <MagneticWrapper>
              <button 
                onClick={() => window.open("https://youtu.be/_x0tBifMst0", "_blank")}
                className="group flex items-center justify-center gap-6 w-full py-5 border border-white/10 hover:border-white/30 bg-transparent hover:bg-white transition-all duration-700 ease-[0.16,1,0.3,1] cursor-pointer"
              >
                <span className="text-[9px] tracking-[0.5em] text-white/50 group-hover:text-black uppercase font-medium transition-colors duration-700 ease-[0.16,1,0.3,1] truncate px-4 max-w-[200px] md:max-w-xs">
                  WATCH NOW
                </span>
                    <div className="w-8 h-px bg-white/30 group-hover:w-16 group-hover:bg-black transition-all duration-700 ease-[0.16,1,0.3,1]" />
                  </button>
                </MagneticWrapper>
              </motion.div>
            </motion.div>

            {/* Layer 3B: Massive Atmospheric Portrait */}
            <motion.div 
              style={{ y: artistArtY, x: useTransform(smoothX, [-1, 1], ["1%", "-1%"]) }}
              variants={fadeUpSlow}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-20%" }}
              className="w-full max-w-sm md:max-w-none md:w-[45vw] aspect-[3/4] relative z-10 bg-white/5 border border-white/5 group cursor-pointer shadow-[0_40px_80px_rgba(0,0,0,0.9)] overflow-hidden order-1 md:order-2 mx-auto md:mx-0"
            >
              <motion.div 
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 grayscale opacity-50 group-hover:opacity-100 group-hover:scale-[1.05] transition-all duration-[1.5s] ease-[0.16,1,0.3,1] pointer-events-none"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center md:hidden"
                  style={{ backgroundImage: `url('https://img.youtube.com/vi/_x0tBifMst0/maxresdefault.jpg')` }}
                />
                <iframe
                  src={`https://www.youtube.com/embed/_x0tBifMst0?autoplay=1&mute=1&loop=1&playlist=_x0tBifMst0&controls=0&modestbranding=1&playsinline=1&rel=0`}
                  className="hidden md:block absolute inset-0 w-full h-full scale-[1.15]"
                  allow="autoplay; encrypted-media"
                  frameBorder="0"
                />
              </motion.div>
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-90 group-hover:opacity-40 transition-opacity duration-[1.5s] ease-[0.16,1,0.3,1]" />
              
              {/* Cinematic Vignette */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,1)_100%)] mix-blend-multiply opacity-90 group-hover:opacity-50 transition-opacity duration-[1.5s] ease-[0.16,1,0.3,1]" />

              {/* Hover overlay hint */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-[1.5s] ease-[0.16,1,0.3,1] translate-y-4 group-hover:translate-y-0">
                 <span className="text-[10px] tracking-[0.5em] text-white uppercase font-medium bg-black/50 backdrop-blur-md px-8 py-4 border border-white/20">Initiate Sequence</span>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      <CinematicDivider narrativeText="Sector 02: Structural Resonance" />

      {/* 4. CINEMATIC EDITORIAL JOURNAL SECTION */}
      <section ref={journalRef} className="relative w-full min-h-[100vh] md:min-h-[140vh] flex items-center justify-center py-24 md:py-72 px-4 md:px-8 overflow-hidden">
        
        {/* Layer 1: Massive Atmospheric Typo Background */}
        <div className="absolute inset-0 z-0 hidden md:flex items-center justify-center pointer-events-none mix-blend-screen overflow-hidden">
          <motion.div 
            style={{ y: giantTypo3Y }} 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 0.3, scale: 1 }}
            transition={{ duration: 4, ease: cinematicEase }}
            viewport={{ once: true, margin: "10%" }}
            className="whitespace-nowrap will-change-transform flex flex-col items-center"
          >
            <span className="text-[10px] md:text-[11px] tracking-[0.5em] text-white/20 font-mono uppercase mb-4 md:mb-8">Fragment: 01</span>
            <motion.h2 
              animate={{ opacity: [0.04, 0.12, 0.04], filter: ["blur(24px)", "blur(36px)", "blur(24px)"], scale: [1.02, 0.98, 1.02] }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="text-[30vw] font-extralight tracking-tighter text-white uppercase leading-none"
            >
              ARCHIVES
            </motion.h2>
          </motion.div>
        </div>

        {/* Layer 2: Main Composition Wrapper */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center justify-center mt-20">
          
          <div className="w-full flex flex-col items-center justify-center relative">
            
            {/* Header Context */}
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-20%" }}
              className="flex flex-col items-center gap-6 mb-20 md:mb-32"
            >
              <div className="w-px h-16 bg-linear-to-b from-transparent via-white/30 to-transparent" />
              <span className="text-[9px] tracking-[0.4em] text-white/40 uppercase font-mono">Memory Archives</span>
            </motion.div>

            {/* Layer 3A: Large Cinematic Editorial Image */}
            <motion.div 
              style={{ y: journalArtY, x: useTransform(smoothX, [-1, 1], ["-0.5%", "0.5%"]) }}
              variants={fadeUpSlow}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-20%" }}
              onClick={() => window.location.href = `/journal/${latestArticle.slug}`}
              className="w-full md:w-[75vw] aspect-video md:aspect-[21/9] relative z-10 bg-white/5 border border-white/5 group cursor-pointer shadow-[0_40px_80px_rgba(0,0,0,0.9)] overflow-hidden"
            >
              <motion.div 
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
                style={{ backgroundImage: `url('${latestArticle.image}')` }}
                className="absolute inset-0 bg-cover bg-center grayscale opacity-50 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-[1.5s] ease-[0.16,1,0.3,1]" 
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-90 group-hover:opacity-40 transition-opacity duration-[1.5s] ease-[0.16,1,0.3,1]" />
              
              {/* Vignette */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,1)_100%)] mix-blend-multiply opacity-90 group-hover:opacity-60 transition-opacity duration-[1.5s] ease-[0.16,1,0.3,1]" />
              
              {/* Hover overlay hint */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-[1.5s] ease-[0.16,1,0.3,1] translate-y-4 group-hover:translate-y-0">
                 <span className="text-[10px] tracking-[0.5em] text-white uppercase font-medium bg-black/50 backdrop-blur-md px-8 py-4 border border-white/20">VIEW PROFILE</span>
              </div>
            </motion.div>

            {/* Layer 3B: Overlapping Massive Story Title */}
            <motion.div 
              style={{ y: journalContentY }}
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-20%" }}
              className="w-full relative z-20 flex flex-col items-center text-center -mt-12 md:-mt-[25vh] pointer-events-none"
            >
              <motion.h3 variants={fadeUp} className="text-4xl md:text-8xl lg:text-[9rem] font-light tracking-tighter uppercase text-white leading-[0.85] mix-blend-screen drop-shadow-2xl">
                <span className="block italic font-extralight text-white/70 tracking-[0.1em] text-2xl md:text-6xl lg:text-[5rem] mb-2 md:mb-6">{titleFirst}</span>
                {titleSecond}
              </motion.h3>
            </motion.div>

            {/* Layer 3C: Editorial Meta & Excerpt (Floating Box) */}
            <motion.div 
              style={{ y: journalBoxY }}
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-20%" }}
              className="w-full md:w-[35vw] relative z-30 mt-8 md:mt-24 flex flex-col items-center md:items-start text-center md:text-left bg-black/40 backdrop-blur-xl border border-white/5 hover:border-white/15 transition-colors duration-1000 ease-[0.16,1,0.3,1] p-6 md:p-14 shadow-[0_30px_60px_rgba(0,0,0,0.9)]"
            >
              <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
                <span className="text-[9px] tracking-[0.4em] text-white/40 uppercase font-mono">{latestArticle.category}</span>
                <div className="w-4 h-px bg-white/30" />
                <span className="text-[9px] tracking-[0.4em] text-white/40 uppercase font-mono">{latestArticle.date}</span>
              </motion.div>

              <motion.p variants={fadeUp} className="text-xs md:text-sm text-white/40 font-light leading-loose tracking-[0.2em] mb-12 line-clamp-4 break-words break-all text-ellipsis overflow-hidden">
                {latestArticle.content[0]?.length > 200 
                  ? latestArticle.content[0].substring(0, 197) + "..." 
                  : latestArticle.content[0]}
              </motion.p>

              <motion.div variants={fadeUp} className="w-full flex justify-center md:justify-start">
                <MagneticWrapper>
                  <button 
                    onClick={() => window.location.href = `/journal/${latestArticle.slug}`}
                    className="group flex items-center justify-center gap-6 py-4 cursor-pointer border border-transparent hover:border-white/20 px-8 transition-colors duration-700 ease-[0.16,1,0.3,1]"
                  >
                    <span className="text-[9px] tracking-[0.5em] text-white/50 group-hover:text-white uppercase font-medium transition-colors duration-700 ease-[0.16,1,0.3,1]">Decode Transmission</span>
                    <div className="w-8 h-px bg-white/30 group-hover:w-16 group-hover:bg-white transition-all duration-700 ease-[0.16,1,0.3,1]" />
                  </button>
                </MagneticWrapper>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      <CinematicDivider narrativeText="Sector 03: The Lingering Echoes" />

      </div>
      </div>
    </main>
  );
}