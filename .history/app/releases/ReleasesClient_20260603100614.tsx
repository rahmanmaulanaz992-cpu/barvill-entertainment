"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, Variants } from "framer-motion";
import MagneticWrapper from "@/components/ui/MagneticWrapper";
import { useRouter } from "next/navigation";
import type { Release } from "@/lib/types";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemFadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1], // Cinematic custom ease-out
    },
  },
};

function formatDriveUrl(url: string): string {
  if (!url) return "";
  
  const cleanUrl = url.trim();
  
  if (cleanUrl.includes("drive.google.com")) {
    const match = cleanUrl.match(/\/d\/([a-zA-Z0-9_-]{25,})/) || cleanUrl.match(/id=([a-zA-Z0-9_-]{25,})/);
    if (match && match[1]) {
      const fileId = match[1];
      return `https://lh3.googleusercontent.com/d/${fileId}=w1000`;
    }
  }
  
  return cleanUrl;
}

// Konfigurasi limit rilisan per halaman (Sempurna untuk grid 3 kolom: 3 x 4 = 12)
const RELEASES_PER_PAGE = 12;

export default function ReleasesClient({ releases }: { releases: Release[] }) {
  const router = useRouter();
  
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const catalogRef = useRef<HTMLDivElement | null>(null);

  // Reset halaman kembali ke 1 jika query pencarian berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const filteredReleases = releases.filter((release) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;

    return (
      release.title.toLowerCase().includes(query) ||
      release.artist.toLowerCase().includes(query) ||
      (release.album && release.album.toLowerCase().includes(query))
    );
  });

  const totalPages = Math.ceil(filteredReleases.length / RELEASES_PER_PAGE);
  const indexOfLastRelease = currentPage * RELEASES_PER_PAGE;
  const indexOfFirstRelease = indexOfLastRelease - RELEASES_PER_PAGE;
  const currentReleases = filteredReleases.slice(indexOfFirstRelease, indexOfLastRelease);

  // Fungsi untuk smooth scrolling kembali ke atas bagian list musik saat ganti halaman
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    
    if (catalogRef.current) {
      const yOffset = -120; 
      const element = catalogRef.current;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handleImageError = (release: Release, identifier: string) => {
    setFailedImages((prev) => ({ ...prev, [identifier]: true }));
    console.warn(
      `%c[Barvill Web - Error Gambar]%c\n\nGagal memuat gambar untuk lagu:\n🎵 Judul: "${release.title}"\n🎤 Artis: ${release.artist}\n🔗 Tautan di Sheets: "${release.cover}"\n\n💡 Solusi:\n1. Pastikan tautan ImgBB adalah "Tautan langsung" (berakhiran .jpg/.png).\n2. Jika pakai Drive, ubah izin aksesnya ke "Anyone with the link".`,
      "background: #4a0000; color: #ff9999; font-weight: bold; padding: 4px 8px; border-radius: 4px;",
      "color: #ffcccc;"
    );
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 4) {
        pages.push("...");
      }

      const startPage = Math.max(2, currentPage - 2);
      const endPage = Math.min(totalPages - 1, currentPage + 2);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 3) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <main className="relative w-full min-h-screen bg-black text-white flex flex-col pt-32 pb-32 overflow-x-hidden">
      {/* --- AMBIENT CINEMATIC BACKGROUND --- */}
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
        <motion.div 
          animate={{ opacity: [0.03, 0.06, 0.03] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06)_0%,transparent_50%)]" 
        />
        <motion.div 
          animate={{ opacity: [0.02, 0.05, 0.02] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(255,255,255,0.04)_0%,transparent_60%)]" 
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.8)_100%)] mix-blend-multiply opacity-80" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 flex flex-col items-center"
      >
        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col items-center text-center w-full max-w-3xl mb-16 mt-12">
          <motion.div variants={itemFadeUp} className="mb-6 flex items-center gap-4">
            <div className="w-8 h-px bg-white/30" />
            <span className="text-[10px] md:text-xs tracking-[0.4em] text-white/50 uppercase font-mono">
              Music Catalog
            </span>
            <div className="w-8 h-px bg-white/30" />
          </motion.div>

          <motion.h1
            variants={itemFadeUp}
            className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tighter uppercase text-white leading-none mb-8"
          >
            RELEASES
          </motion.h1>

          <motion.p
            variants={itemFadeUp}
            className="text-sm md:text-base text-white/60 font-light leading-loose tracking-[0.15em] max-w-xl"
          >
            Menampilkan katalog rilisan Barvill Entertainment secara lengkap dan rapi.
          </motion.p>
        </div>

        {/* --- CINEMATIC SEARCH BAR --- */}
        <motion.div 
          variants={itemFadeUp} 
          className="relative w-full max-w-xl mb-20 z-20 group"
        >
          <div className="absolute -inset-px bg-linear-to-r from-white/10 to-white/5 rounded-xs opacity-30 group-focus-within:opacity-100 transition duration-1000" />
          <div className="relative flex items-center bg-black/60 backdrop-blur-xl border border-white/10 group-focus-within:border-white/30 rounded-xs transition-colors duration-500">
            {/* Search Icon */}
            <div className="pl-5 pr-3 text-white/40 pointer-events-none">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <input
              type="text"
              placeholder="CARI JUDUL, ARTIS, ATAU ALBUM..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-none outline-none py-4 pr-12 text-[10px] tracking-[0.3em] text-white uppercase placeholder:text-white/25 focus:ring-0 font-mono"
            />

            {/* Clear Button (X) */}
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-4 p-2 text-white/40 hover:text-white transition-colors cursor-pointer"
                aria-label="Hapus pencarian"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </motion.div>

        {/* --- DYNAMIC ARTIST GRID --- */}
        <div ref={catalogRef} className="w-full mb-16 scroll-mt-32">
          {filteredReleases.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <p className="text-xs tracking-[0.5em] font-mono text-white/30 uppercase mb-2">NO RELEASES FOUND</p>
              <p className="text-[10px] text-white/20 uppercase tracking-[0.2em]">Coba kata kunci pencarian yang lain</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 w-full">
              {currentReleases.map((release, idx) => {
                const identifier = release.slug || `release-${idx}`;
                const isImageBroken = failedImages[identifier];
                const directCoverUrl = formatDriveUrl(release.cover);

                return (
                  <motion.div 
                    key={identifier} 
                    variants={itemFadeUp} 
                    className="group relative flex flex-col bg-black/40 backdrop-blur-xl border border-white/5 hover:border-white/20 transition-colors duration-1000 p-6 md:p-8 shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
                  >
                    
                    {/* COVER ART CONTAINER */}
                    <div className="w-full aspect-square relative mb-8 overflow-hidden bg-white/5 border border-white/5 flex items-center justify-center">
                      {release.cover && !isImageBroken ? (
                        <motion.img 
                          src={directCoverUrl}
                          alt={`${release.title} cover`}
                          onError={() => handleImageError(release, identifier)}
                          className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.05] transition-all duration-[1.5s] ease-[0.16,1,0.3,1]"
                        />
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-red-950/10 border border-red-500/10">
                          <span className="text-[10px] tracking-[0.3em] text-red-400 font-mono uppercase mb-2">IMAGE ERROR</span>
                          <span className="text-[9px] text-white/30 tracking-wider">Periksa Console Browser (F12) untuk detail instruksi</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.8)_100%)] pointer-events-none mix-blend-multiply opacity-80 group-hover:opacity-40 transition-opacity duration-1000" />
                      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-1000 ease-out" />
                    </div>

                    {/* INFO SECTION */}
                    <div className="flex flex-col gap-2 mb-8 grow">
                      <h2 className="text-lg md:text-xl font-light tracking-[0.1em] uppercase text-white leading-tight mb-2 truncate" title={release.title}>
                        {release.title}
                      </h2>
                      <div className="flex flex-col gap-1">
                        <h3 className="text-sm tracking-[0.2em] uppercase text-white/60 font-medium truncate" title={release.artist}>
                          {release.artist}
                        </h3>
                        <div className="flex items-center gap-2 text-xs tracking-[0.15em] text-white/40 uppercase mt-2 font-mono">
                          <span>{release.releaseDate}</span>
                          {release.album && (
                            <>
                              <span className="w-1 h-1 rounded-full bg-white/20" />
                              <span className="truncate">{release.album}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* VIEW ACTION BUTTON */}
                    <div className="mt-auto w-full pt-6 border-t border-white/10">
                      <MagneticWrapper>
                        <button 
                          onClick={() => router.push(`/releases/${release.slug}`)} 
                          className="relative w-full overflow-hidden group/btn border border-white/10 hover:border-white/30 bg-transparent px-8 py-4 text-[10px] tracking-[0.4em] uppercase text-white cursor-pointer flex items-center justify-center transition-colors duration-700 ease-[0.16,1,0.3,1]"
                        >
                          <span className="relative z-10 transition-colors duration-700 ease-[0.16,1,0.3,1] group-hover/btn:text-black font-medium">VIEW RELEASE</span>
                          <div className="absolute inset-0 bg-white scale-y-0 origin-bottom transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover/btn:scale-y-100" />
                        </button>
                      </MagneticWrapper>
                    </div>

                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        {/* --- CINEMATIC PAGINATION CONTROLS --- */}
        {totalPages > 1 && (
          <motion.div 
            variants={itemFadeUp}
            className="flex flex-col items-center gap-6 mt-8 pt-8 border-t border-white/5 w-full select-none"
          >
            {/* Animated Brand Text: BARBARIAN VILLAGE */}
            <div className="flex flex-col items-center mb-2">
              <motion.span 
                animate={{ 
                  opacity: [0.4, 0.75, 0.4],
                  textShadow: [
                    "0 0 10px rgba(255,255,255,0)", 
                    "0 0 15px rgba(255,255,255,0.2)", 
                    "0 0 10px rgba(255,255,255,0)"
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="text-[12px] md:text-sm tracking-[0.6em] text-white/60 uppercase font-light font-mono block text-center translate-x-[0.3em] cursor-default"
              >
                Barbarian Village
              </motion.span>
            </div>

            <div className="flex items-center gap-2 md:gap-3 mt-1 font-mono">
              {/* Button Previous */}
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className={`px-3 py-2 text-[10px] tracking-wider uppercase border rounded-xs transition-all duration-300 flex items-center ${
                  currentPage === 1
                    ? "border-white/5 text-white/20 cursor-not-allowed"
                    : "border-white/10 text-white/60 hover:text-white hover:border-white/30 cursor-pointer"
                }`}
              >
                ← Prev
              </button>

              {/* Render dynamic page numbers */}
              <div className="flex items-center gap-1 md:gap-1.5">
                {getPageNumbers().map((pageNum, index) => {
                  const isCurrent = pageNum === currentPage;
                  const isEllipsis = pageNum === "...";

                  if (isEllipsis) {
                    return (
                      <span 
                        key={`ellipsis-${index}`} 
                        className="px-2 md:px-3 py-2 text-[10px] text-white/30 tracking-widest"
                      >
                        ...
                      </span>
                    );
                  }

                  return (
                    <button
                      key={`page-${pageNum}`}
                      onClick={() => handlePageChange(pageNum as number)}
                      className={`relative px-3 md:px-4 py-2 text-[10px] transition-all duration-300 font-medium rounded-xs cursor-pointer ${
                        isCurrent 
                          ? "text-black font-semibold" 
                          : "text-white/60 hover:text-white border border-transparent hover:border-white/10"
                      }`}
                    >
                      <span className="relative z-10">{pageNum}</span>
                      
                      {/* Active glistening block background */}
                      {isCurrent && (
                        <motion.div
                          layoutId="active-page-indicator"
                          className="absolute inset-0 bg-white rounded-xs shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                          transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Button Next */}
              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className={`px-3 py-2 text-[10px] tracking-wider uppercase border rounded-xs transition-all duration-300 flex items-center ${
                  currentPage === totalPages
                    ? "border-white/5 text-white/20 cursor-not-allowed"
                    : "border-white/10 text-white/60 hover:text-white hover:border-white/30 cursor-pointer"
                }`}
              >
                Next →
              </button>
            </div>
          </motion.div>
        )}

      </motion.div>
    </main>
  );
}