"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    // Toggle glassmorphism background when scrolled past 50px
    if (latest > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }

    // Hide navbar when scrolling down, show when scrolling up
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.nav 
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} // Cinematic ease-out
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-in-out ${
        scrolled 
          ? "bg-black/40 backdrop-blur-md border-b border-white/10 py-4" 
          : "bg-transparent border-b border-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
        <h1 className="text-white tracking-[0.4em] text-sm">
          BARVILL
        </h1>

        <div className="hidden md:flex gap-8 text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/60 font-light">
          {["Home", "Artists", "Releases", "About", "Contact"].map((item) => (
            <a 
              key={item} 
              href="#" 
              className="group relative hover:text-white transition-colors duration-500"
            >
              <span className="relative z-10 transition-all duration-500 ease-out group-hover:tracking-[0.4em]">
                {item}
              </span>
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-px bg-white/60 transition-all duration-500 ease-out group-hover:w-full" />
            </a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}