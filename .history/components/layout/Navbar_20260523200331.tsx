"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, useReducedMotion } from "framer-motion";

export default function Navbar() {
  const { scrollY } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");

  const navItems = ["Home", "Artists", "Releases", "About", "Contact"];

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

  // Scroll-aware Intersection Observer
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("section"));
    
    // Map section index from page.tsx to nav items
    const sectionMapping: Record<number, string> = {
      0: "Home",
      1: "About",
      2: "Artists",
      4: "Contact", // Index 3 is the Marquee section (ignored)
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sections.indexOf(entry.target as HTMLElement);
            if (sectionMapping[index]) {
              setActiveItem(sectionMapping[index]);
            }
          }
        });
      },
      { threshold: 0.4 } // Trigger when 40% of the section is visible
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  // Smooth scroll click handler
  const handleNavClick = (e: React.MouseEvent, item: string) => {
    e.preventDefault();
    setActiveItem(item);
    
    const sections = document.querySelectorAll("section");
    let targetIndex = -1;
    
    if (item === "Home") targetIndex = 0;
    if (item === "About") targetIndex = 1;
    if (item === "Artists") targetIndex = 2;
    if (item === "Contact") targetIndex = 4;

    if (targetIndex !== -1 && sections[targetIndex]) {
      sections[targetIndex].scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav 
      variants={{
        visible: { y: 0 },
        hidden: { y: prefersReducedMotion ? 0 : "-100%", opacity: prefersReducedMotion ? 0 : 1 },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: prefersReducedMotion ? 0.3 : 0.6, ease: prefersReducedMotion ? "easeOut" : [0.16, 1, 0.3, 1] }} // Cinematic ease-out
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-in-out ${
        scrolled 
          ? "bg-black/40 backdrop-blur-md border-b border-white/10 py-4" 
          : "bg-transparent border-b border-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
        <h1 
          className="text-white tracking-[0.4em] text-sm cursor-pointer"
          onClick={(e) => handleNavClick(e, "Home")}
        >
          BARVILL
        </h1>

        <div className="hidden md:flex gap-8 text-[10px] md:text-xs uppercase tracking-[0.3em] font-light relative">
          {navItems.map((item) => {
            const isActive = activeItem === item;

            return (
              <a 
                key={item} 
                href="#" 
                onClick={(e) => handleNavClick(e, item)}
                className={`group relative py-2 transition-colors duration-500 ${
                  isActive ? "text-white" : "text-white/60 hover:text-white"
                }`}
              >
                <span className={`relative z-10 transition-all duration-500 ease-out ${isActive ? "tracking-[0.4em]" : "group-hover:tracking-[0.4em]"}`}>
                  {item}
                </span>
                
                {/* Inactive Hover Underline */}
                {!isActive && (
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-px bg-white/50 transition-all duration-500 ease-out group-hover:w-full" />
                )}

                {/* Active Cinematic Underline (LayoutId) */}
                {isActive && (
                  <motion.span 
                    layoutId="navbar-active-indicator"
                    className="absolute -bottom-2 left-0 w-full h-px bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}