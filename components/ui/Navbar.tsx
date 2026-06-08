"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "HOME", path: "/" },
  { label: "ARTISTS", path: "/artists" },
  { label: "RELEASES", path: "/releases" },
  { label: "JOURNAL", path: "/journal" },
  { label: "ARCHIVE", path: "/archive" },
  { label: "UNION", path: "/union" },
  { label: "CONTACT", path: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Mencegah scroll pada background ketika menu mobile sedang terbuka
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        
        {/* Logo / Brand Name */}
        <Link href="/" className="text-white text-lg tracking-[0.3em] uppercase font-light z-50">
          BARVILL
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`text-[10px] lg:text-xs tracking-widest uppercase transition-colors duration-500 pb-1 border-b ${
                  isActive
                    ? "text-white border-white"
                    : "text-neutral-500 border-transparent hover:text-neutral-300"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden relative w-6 h-4 z-50 focus:outline-none cursor-pointer"
          aria-label="Toggle Menu"
        >
          {/* Animasi murni menggunakan transform (rotate & translate) tanpa memicu reflow */}
          <span className={`absolute top-0 left-0 w-full h-[1px] bg-white transition-transform duration-500 ease-[0.16,1,0.3,1] origin-center ${isOpen ? 'translate-y-[7.5px] rotate-45' : 'translate-y-0 rotate-0'}`} />
          <span className={`absolute top-1/2 left-0 w-full h-[1px] bg-white -translate-y-1/2 transition-opacity duration-500 ease-[0.16,1,0.3,1] ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
          <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-white transition-transform duration-500 ease-[0.16,1,0.3,1] origin-center ${isOpen ? '-translate-y-[7.5px] -rotate-45' : 'translate-y-0 rotate-0'}`} />
        </button>
      </div>

      {/* Mobile Fullscreen Menu */}
      <div
        className={`fixed inset-0 bg-black z-40 flex flex-col items-center justify-center transition-all duration-700 ease-[0.16,1,0.3,1] ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center space-y-8">
          {navLinks.map((link, index) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className={`text-lg tracking-[0.25em] uppercase transition-all duration-500 ease-[0.16,1,0.3,1] pb-1 border-b ${
                  isActive
                    ? "text-white border-white"
                    : "text-neutral-600 border-transparent hover:text-neutral-300"
                } ${
                  isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${isOpen ? index * 75 + 100 : 0}ms` }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}