import React from 'react';
import Link from 'next/link';

const unionMenu = [
  { 
    no: "01", 
    title: "DAO OF SOUND", 
    desc: "Playlist Curator", 
    path: "/union/curator" 
  },
  { 
    no: "02", 
    title: "UNIT CONFIGURATION", 
    desc: "Talent Needs", 
    path: "/union/artist" 
  },
  { 
    no: "03", 
    title: "HEAVEN'S TRIAL", 
    desc: "Weekly Playlist Radar", 
    path: "/union/spotlight" 
  },
  { 
    no: "04", 
    title: "INNER SECT", 
    desc: "Community", 
    path: "/union/community" 
  },
  { 
    no: "05", 
    title: "EXTERNAL PACTS", 
    desc: "Partnership", 
    path: "/union/partnership" 
  },
  { 
    no: "06", 
    title: "ELDER'S HALL", 
    desc: "Professional Service Recommendations Outside Barvill", 
    path: "/union/recommended" 
  },
  { 
    no: "07", 
    title: "ANCIENT RELICS", 
    desc: "Talent Assets, Sponsor Needs", 
    path: "/union/press-vault" 
  },
];

export default function UnionDashboard() {
  return (
    <div className="min-h-screen bg-black text-zinc-500 font-sans px-6 md:px-16 py-16 selection:bg-zinc-800 selection:text-white">
      {/* Header */}
      <div className="flex flex-col items-center justify-center text-center my-20">
        <h1 className="text-4xl md:text-5xl text-white tracking-[0.3em] font-light mb-3">BARVILL UNION</h1>
        <p className="text-[10px] md:text-xs tracking-[0.25em] uppercase text-zinc-600">
          Centralized Management Hub & Roster Services
        </p>
      </div>

      {/* Menu Grid */}
      <div className="max-w-4xl mx-auto border-t border-zinc-900 divide-y divide-zinc-900">
        {unionMenu.map((menu) => (
          <Link key={menu.no} href={menu.path} className="group flex flex-col sm:flex-row sm:items-center justify-between py-6 hover:bg-zinc-950/50 px-4 transition-all duration-300">
            <div className="flex items-start gap-6">
              <span className="text-xs font-mono text-zinc-700 tracking-widest pt-1 w-6">{menu.no}</span>
              <div className="flex flex-col">
                <span className="text-sm tracking-[0.15em] text-zinc-300 group-hover:text-white transition-colors uppercase font-medium">
                  {menu.title}
                </span>
                <span className="text-xs text-zinc-600 mt-1 group-hover:text-zinc-500 transition-colors uppercase">
                  {menu.desc}
                </span>
              </div>
            </div>
            <div className="text-zinc-700 group-hover:text-zinc-400 transition-colors text-xs tracking-widest uppercase mt-4 sm:mt-0 font-mono">
              ENTER →
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}