"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Artists", href: "/artists" },
    { name: "Releases", href: "/releases" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
      className="fixed top-0 w-full z-50 bg-black/10 backdrop-blur-md border-b border-white/5"
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 h-20 md:h-24 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-white text-lg md:text-xl font-light tracking-[0.3em] uppercase transition-opacity hover:opacity-70"
        >
          BARVILL
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-white/60 hover:text-white text-[10px] md:text-xs font-light tracking-[0.2em] uppercase transition-all duration-500"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Placeholder */}
        <div className="md:hidden flex items-center">
          <button className="text-white/70 text-[10px] font-light tracking-[0.2em] uppercase transition-all duration-500 hover:text-white">
            MENU
          </button>
        </div>
      </div>
    </motion.nav>
  );
}