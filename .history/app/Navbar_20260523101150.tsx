"use client";

import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/20 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
        <h1 className="text-white tracking-[0.4em] text-sm font-light">
          BARVILL
        </h1>

        <div className="flex items-center gap-8 text-xs tracking-[0.3em] uppercase text-white/70">
          <a href="#">Home</a>
          <a href="#">Artists</a>
          <a href="#">Releases</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </div>
      </div>
    </motion.nav>
  );
}
