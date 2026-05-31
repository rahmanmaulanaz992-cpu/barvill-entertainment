"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  const cinematicEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 1.5, ease: cinematicEase }}
      className="relative w-full pt-24 md:pt-32 pb-12 px-4 md:px-6 bg-black z-20 flex flex-col items-center overflow-hidden"
    >
      {/* Cinematic Top Separator Glow */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] max-w-4xl h-[40vh] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.03)_0%,transparent_60%)] pointer-events-none" aria-hidden="true" />

      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-20 relative z-10">
        
        {/* LEFT: Brand Ecosystem */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <span className="text-[10px] md:text-xs tracking-[0.4em] text-white/40 uppercase block cursor-default">
            Barbarian Village
          </span>
          <h3 className="text-lg md:text-xl font-light tracking-[0.25em] text-white uppercase mb-2 cursor-default drop-shadow-md">
            Barvill Entertainment
          </h3>
          <p className="text-xs md:text-sm text-white/50 font-light leading-relaxed tracking-wider max-w-sm cursor-default">
            Barvill—singkatan dari Barbarian Village (Kampung Barbar)—adalah hub entertainment independen yang menaungi musik, talenta virtual, dan produksi visual. Kami adalah wadah bagi kolektif yang &apos;barbar&apos; dalam kreativitas dan keberanian berkarya. Misi kami sederhana: Anda fokus mencipta, kami yang mengelola sisanya.
          </p>
        </div>

        {/* CENTER: Navigation */}
        <div className="lg:col-span-4 flex flex-col lg:items-center">
          <div className="flex flex-col gap-6">
            <h4 className="text-[9px] md:text-[10px] tracking-[0.4em] text-white/40 uppercase block mb-2 cursor-default">
              Ecosystem
            </h4>
            <nav className="flex flex-col gap-5">
              {["Artists", "Releases", "Journal", "Archive", "Contact"].map((item) => (
                <Link 
                  key={item} 
                  href={`/${item.toLowerCase()}`}
                  className="group relative text-xs font-light tracking-[0.2em] text-white/60 uppercase transition-all duration-500 hover:text-white w-max"
                >
                  <span className="relative z-10 transition-all duration-500 ease-out group-hover:tracking-[0.3em]">
                    {item}
                  </span>
                  <span className="absolute -bottom-2 left-0 w-0 h-px bg-white/30 transition-all duration-500 ease-out group-hover:w-full" />
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* RIGHT: Contact & Socials */}
        <div className="lg:col-span-4 flex flex-col lg:items-end">
          <div className="flex flex-col gap-10 w-full lg:w-auto">
            
            {/* Social Links */}
            <div className="flex flex-col gap-6 lg:items-end">
              <h4 className="text-[9px] md:text-[10px] tracking-[0.4em] text-white/40 uppercase block cursor-default">
                CONNECT
              </h4>
              <div className="flex flex-wrap gap-6">
                {[
                  { name: "Instagram", url: "https://www.instagram.com/barvillentertainment/" },
                  { name: "Barvill Taiwan", url: "https://www.instagram.com/barvill_tw/" },
                  { name: "Spotify", url: "https://open.spotify.com/intl-id/artist/74wVlGa7KGG8FKDYYPwlvZ" },
                  { name: "YouTube", url: "https://youtube.com/@barvillentertainment" },
                  { name: "TikTok", url: "https://www.tiktok.com/@barvill_" }
                ].map((item) => (
                  <a 
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-light tracking-[0.2em] text-white/60 uppercase transition-all duration-500 hover:text-white hover:-translate-y-1"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="flex flex-col gap-3 lg:items-end">
              <h4 className="text-[9px] md:text-[10px] tracking-[0.4em] text-white/40 uppercase block mt-2 cursor-default">
                Email
              </h4>
              <a 
                href="mailto:Barvillentertainment@gmail.com" 
                className="text-sm md:text-base text-white/80 font-light tracking-widest transition-colors duration-500 hover:text-white mb-2"
              >
                Barvillentertainment@gmail.com
              </a>
              
              <h4 className="text-[9px] md:text-[10px] tracking-[0.4em] text-white/40 uppercase block mt-2 cursor-default">
                WhatsApp / Telepon
              </h4>
              <a 
                href="https://wa.me/6285117754894"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm md:text-base text-white/80 font-light tracking-widest transition-colors duration-500 hover:text-white mb-2"
              >
                +62 851-1775-4894
              </a>

              <h4 className="text-[9px] md:text-[10px] tracking-[0.4em] text-white/40 uppercase block mt-2 cursor-default">
                Alamat
              </h4>
              <span className="text-xs md:text-sm text-white/60 font-light tracking-widest cursor-default max-w-xs text-left lg:text-right">
                JL Ahmad Yani, Trikora, Banjarbaru, Kalimantan Selatan, Indonesia
              </span>
            </div>

          </div>
        </div>
      </div>

      {/* BOTTOM: Copyright */}
      <div className="w-full max-w-7xl pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
        <p className="text-[9px] md:text-[10px] tracking-[0.3em] text-white/30 uppercase text-center md:text-left cursor-default">
          © 2026 Barvill Entertainment. All Rights Reserved.
        </p>
        <div className="w-8 h-px bg-white/20 md:hidden" /> {/* Mobile Separator */}
      </div>
    </motion.footer>
  );
}