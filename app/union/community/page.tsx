'use client';
import React from 'react';
import Link from 'next/link';

export default function InnerSectPage() {
  const lobbies = [
    { name: 'JOIN LOBBY INDONESIA', url: 'https://chat.whatsapp.com/FNtRyAEt1sG5nV76ppGaNl?s=cl&p=a&mlu=0' },
    { name: 'JOIN LOBBY CHINESE', url: 'https://chat.whatsapp.com/IJD5QM7wSdmBJkH4SJA3ie?s=cl&p=a&mlu=0' },
    { name: 'JOIN LOBBY GLOBAL', url: 'https://chat.whatsapp.com/JzMGpSPN3UXHO8qTmroOID?s=cl&p=a&mlu=0' },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 h-full w-full object-cover opacity-50"
      >
        <source src="/video/inner_sect.mp4" type="video/mp4" />
      </video>

      {/* Gradient Overlay for Dark Effect at the Bottom */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black via-black/50 to-transparent z-[1]" />

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center pt-48 px-6 md:px-16">
        
        {/* Back Link */}
        <div className="absolute top-12 left-6 md:left-16">
          <Link href="/union" className="text-[10px] tracking-[0.3em] uppercase text-zinc-400 transition-colors hover:text-white">
            ← BACK
          </Link>
        </div>
        
        <div className="w-full max-w-xl text-center">
          <h1 className="text-xl text-white tracking-[0.2em] mb-2 uppercase">INNER SECT</h1>
          <p className="text-[10px] tracking-widest mb-12 uppercase text-zinc-400">Designated Community Lobbies</p>
          
          {/* Lobby Buttons */}
          <div className="space-y-4">
            {lobbies.map((lobby) => (
              <a 
                key={lobby.name} 
                href={lobby.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full border border-zinc-700 bg-black/40 p-4 text-[10px] tracking-[0.2em] uppercase text-zinc-300 backdrop-blur-sm transition-all hover:border-white hover:text-white"
              >
                {lobby.name}
              </a>
            ))}
          </div>
          
          <div className="mt-16 pt-8 border-t border-zinc-800">
            <p className="text-[9px] tracking-[0.2em] uppercase text-zinc-600">
              Ensuring you have WhatsApp installed is crucial for direct access to our exclusive communities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}