"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Artists", href: "/artists" },
  { name: "Releases", href: "/releases" },
  { name: "Journal", href: "/journal" },
  { name: "Archive", href: "/archive" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Handle Scroll detection safely
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initialize on mount
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Safe route-change handler for closing mobile menu
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Mobile body lock safety (prevents layout shift and background scrolling)
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[80] transition-all duration-700 ease-[0.16,1,0.3,1] ${
        isScrolled
          ? "bg-black/50 backdrop-blur-xl border-b border-white/5 py-4"
          : "bg-transparent py-6 md:py-8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex justify-between items-center">
        {/* Brand Logo */}
        <Link href="/" className="relative z-[90] group flex flex-col pointer-events-auto">
          <span className="text-[11px] md:text-xs font-light tracking-[0.4em] text-white uppercase transition-colors duration-500 group-hover:text-white/70">
            BARVILL
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 pointer-events-auto">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className="relative group py-2"
              >
                <span className={`text-[9px] md:text-[10px] tracking-[0.25em] uppercase transition-colors duration-500 ${isActive ? "text-white font-medium" : "text-white/50 group-hover:text-white"}`}>
                  {link.name}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/40"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden relative z-[90] p-2 flex flex-col justify-center items-center gap-[5px] w-10 h-10 pointer-events-auto"
          aria-label="Toggle Menu"
        >
          <motion.span animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="w-6 h-[1px] bg-white block" />
          <motion.span animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }} transition={{ duration: 0.3 }} className="w-6 h-[1px] bg-white block" />
          <motion.span animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="w-6 h-[1px] bg-white block" />
        </button>
      </div>

      {/* Mobile Cinematic Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[80] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center pointer-events-auto"
          >
            {/* Mobile Cinematic overlay fog */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.03)_0%,transparent_60%)] pointer-events-none" />
            
            <nav className="flex flex-col items-center gap-10 relative z-10">
              {NAV_LINKS.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div key={link.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
                    <Link href={link.href} className="group relative flex flex-col items-center">
                      <span className={`text-xl font-light tracking-[0.3em] uppercase transition-colors duration-500 ${isActive ? "text-white" : "text-white/50 hover:text-white"}`}>
                        {link.name}
                      </span>
                      {isActive && (
                        <motion.div layoutId="activeNavMobile" className="w-8 h-[1px] bg-white/40 mt-3" transition={{ type: "spring", stiffness: 300, damping: 30 }} />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}