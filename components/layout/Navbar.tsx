"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, useReducedMotion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { scrollY } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    if (latest > previous && latest > 150 && !mobileMenuOpen) {
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
      2: "Releases",
      3: "Artists",
      5: "Contact", // Index 4 is the Marquee section (ignored)
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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileMenuOpen]);

  // Smooth scroll click handler
  const handleNavClick = (e: React.MouseEvent, item: string) => {
    e.preventDefault();
    setActiveItem(item);
    
    const sections = document.querySelectorAll("section");
    let targetIndex = -1;
    
    if (item === "Home") targetIndex = 0;
    if (item === "About") targetIndex = 1;
    if (item === "Releases") targetIndex = 2;
    if (item === "Artists") targetIndex = 3;
    if (item === "Contact") targetIndex = 5;

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
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-700 ease-in-out ${
        scrolled || mobileMenuOpen
          ? "bg-black/50 backdrop-blur-xl border-b border-white/5 py-4" 
          : "bg-transparent border-b border-transparent py-6 md:py-8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between relative z-50">
        <h1 
          className="text-white tracking-[0.4em] text-sm cursor-pointer"
          onClick={(e) => handleNavClick(e, "Home")}
        >
          BARVILL
        </h1>

        {/* Mobile Hamburger Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
          className="md:hidden relative flex flex-col items-center justify-center w-8 h-8 gap-1.5 focus:outline-hidden"
        >
          <motion.span animate={mobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} className="w-6 h-px bg-white block origin-center" transition={{ duration: 0.3 }} />
          <motion.span animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }} className="w-6 h-px bg-white block" transition={{ duration: 0.3 }} />
          <motion.span animate={mobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} className="w-6 h-px bg-white block origin-center" transition={{ duration: 0.3 }} />
        </button>

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

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 w-screen h-screen bg-black/90 backdrop-blur-3xl flex flex-col items-center justify-center z-40"
          >
            <div className="flex flex-col items-center gap-10">
              {navItems.map((item, i) => {
                const isActive = activeItem === item;
                return (
                  <motion.a
                    key={item}
                    href="#"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    onClick={(e) => {
                      handleNavClick(e, item);
                      setMobileMenuOpen(false);
                    }}
                    className={`relative text-lg md:text-xl tracking-[0.4em] uppercase font-light transition-colors duration-500 ${
                      isActive ? "text-white" : "text-white/50 hover:text-white"
                    }`}
                  >
                    {item}
                    {isActive && (
                      <motion.span 
                        layoutId="mobile-active-indicator"
                        className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1/2 h-px bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                      />
                    )}
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}