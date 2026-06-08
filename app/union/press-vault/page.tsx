'use client';
import React from 'react';
import Link from 'next/link';

export default function AncientRelicsPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-zinc-400 font-sans">
      
      {/* Background Aesthetic */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-900/40 via-black to-black" />
      </div>

      {/* Konten Utama */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 md:px-16">
        
        {/* Back Link */}
        <div className="absolute top-12 left-6 md:left-16">
          <Link href="/union" className="text-[10px] tracking-[0.3em] uppercase hover:text-white transition-colors">
            ← BACK
          </Link>
        </div>
        
        <div className="w-full max-w-2xl text-center">
          <h1 className="text-2xl md:text-3xl text-white tracking-[0.3em] mb-2 uppercase font-light">
            ANCIENT RELICS
          </h1>
          <p className="text-[10px] tracking-[0.2em] mb-12 uppercase text-zinc-400">
            Talent Assets & Sponsorship Requirements
          </p>
          
          {/* Coming Soon Indicator */}
          <div className="inline-block border border-zinc-800 bg-zinc-900/30 backdrop-blur-md px-12 py-6">
            <h2 className="text-[12px] tracking-[0.8em] text-white uppercase animate-pulse">
              Coming Soon
            </h2>
          </div>

          <div className="mt-16 pt-8 border-t border-zinc-900 max-w-sm mx-auto">
            <p className="text-[9px] tracking-[0.2em] uppercase text-zinc-600 leading-relaxed">
              Archiving talent assets and sponsorship frameworks. Access to this vault is restricted to authorized partners.
            </p>
          </div>
        </div>
      </div>

      {/* Efek Garis Tipis */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
    </div>
  );
}