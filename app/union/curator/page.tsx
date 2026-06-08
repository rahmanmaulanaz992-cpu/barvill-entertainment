'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// Link CSV Google Sheets DAO OF SOUND DATABASE
const GOOGLE_SHEETS_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSaHHxnO29NbiYQym-ID_3OIE25Rna3_SS8OCqMmYFeQCbOqhLidKLSFBio8lCQHptTnjy0KygEQhRv/pub?output=csv";

const GENRES = [
  "All Genres", "Pop", "Mandopop", "J-Pop", "K-Pop", "Indo Pop (I-Pop)", "Cantopop",
  "Rock", "Alternative", "Indie", "Hip-Hop / Rap", "R&B", "Soul", "Funk",
  "Electronic", "Dance / EDM", "Ambient", "Classical", "Soundtrack / Score",
  "Jazz", "Blues", "Folk / Acoustic", "Country", "Reggae", "Latin",
  "Afrobeats", "Metal", "Punk", "New Age", "Gospel"
];

const PLATFORMS = ["All Platforms", "Spotify", "YouTube Music", "Apple Music", "QQ Music", "Amazon Music"];

// Ikon Platform Menggunakan SVG Manual (Pasti Jalan, Tanpa Error Library)
const PlatformIcon = ({ platform }: { platform: string }) => {
  const p = platform.toLowerCase();
  if (p.includes('spotify')) return <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.558 17.295c-.157.258-.474.342-.731.186-2.007-1.226-4.532-1.503-7.514-.823-.294.067-.58-.126-.647-.42-.067-.293.126-.58.42-.647 3.25-.745 6.064-.42 8.35.986.258.156.342.473.186.731zm.992-2.22c-.208.337-.638.45-1.002.242-2.304-1.408-5.81-1.82-8.528-.996-.443.134-.913-.116-1.047-.56-.134-.443.116-.913.56-1.047 3.123-.941 7.025-.477 9.71 1.168.337.208.45.638.242 1.002zm.12-2.268c-2.738-1.624-7.215-1.774-9.824-.982-.544.167-1.121-.137-1.288-.681-.167-.544.137-1.121.681-1.288 3.013-.923 8.019-.74 11.162 1.127.49.292.651.916.36 1.406-.291.49-.916.651-1.406.36z"/></svg>;
  if (p.includes('youtube')) return <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.377.505 9.377.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>;
  if (p.includes('apple')) return <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.76 2.5-3.15 2.5-1.37 0-1.83-.8-3.38-.8-1.54 0-2.07.8-3.44.8-1.44 0-2.45-1.35-3.45-2.78C2.53 17.55 1 12.87 1 8.54c0-2.82.87-5.18 2.45-6.65C4.7 0.6 6.55 0 7.55 0c1.37 0 2.57 1.05 3.33 1.05 0.74 0 2.15-1.05 3.73-1.05 1.95 0 3.65 1.05 4.75 2.72-3.8 2.25-3.23 7.55 0.38 9.25-0.34 0.5-1.28 1.93-1.03 2.73zM12.5 0c0.35 1.63-0.78 3.25-2.43 3.25-0.2 0-0.45-0.05-0.65-0.1C9.6 1.7 10.75 0 12.5 0z"/></svg>;
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>;
};

interface Playlist {
  id: number;
  title: string;
  platform: string;
  url: string;
  genre: string;
  status: string;
  desc: string;
  coverUrl: string;
}

export default function CuratorPage() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All Genres");
  const [selectedPlatform, setSelectedPlatform] = useState("All Platforms");

  useEffect(() => {
    async function fetchSpreadsheetData() {
      try {
        const response = await fetch(GOOGLE_SHEETS_CSV_URL);
        const dataText = await response.text();
        const lines = dataText.split(/\r?\n/);
        if (lines.length < 2) return;

        const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
        const titleIdx = headers.findIndex(h => h.includes("nama playlist"));
        const platformIdx = headers.findIndex(h => h.includes("platform"));
        const urlIdx = headers.findIndex(h => h.includes("url") || h.includes("link"));
        const genreIdx = headers.findIndex(h => h.includes("genre"));
        const statusIdx = headers.findIndex(h => h.includes("status"));
        const descIdx = headers.findIndex(h => h.includes("deskripsi"));
        const coverIdx = headers.findIndex(h => h.includes("foto") || h.includes("cover"));

        const parsedData = lines.slice(1).map((row, index) => {
          const cols = row.split(',');
          return {
            id: index,
            title: cols[titleIdx] || "Untitled",
            platform: cols[platformIdx] || "Spotify",
            url: cols[urlIdx] || "#",
            genre: cols[genreIdx] || "Pop",
            status: cols[statusIdx] || "draf",
            desc: cols[descIdx] || "",
            coverUrl: cols[coverIdx] || ""
          };
        }).filter(item => item.status.toLowerCase() === 'publish');
        
        setPlaylists(parsedData);
      } catch (e) { console.error(e); } finally { setLoading(false); }
    }
    fetchSpreadsheetData();
  }, []);

  const filtered = playlists.filter(p => 
    (p.title.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (selectedGenre === "All Genres" || p.genre.toLowerCase() === selectedGenre.toLowerCase()) &&
    (selectedPlatform === "All Platforms" || p.platform.toLowerCase() === selectedPlatform.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-zinc-400 font-sans px-6 md:px-16 py-12">
      <div className="mb-12"><Link href="/union" className="text-[10px] tracking-[0.3em] uppercase hover:text-white transition-colors">← Back to Union</Link></div>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl text-white tracking-[0.2em] font-light mb-12 uppercase">DAO OF SOUND</h1>
        
        <div className="flex flex-col md:flex-row gap-4 mb-12 pb-12 border-b border-zinc-900">
          <input className="flex-1 bg-zinc-950 border border-zinc-900 text-white p-4 text-xs tracking-widest uppercase focus:outline-none" placeholder="SEARCH SIGNAL..." onChange={e => setSearchQuery(e.target.value)} />
          <select className="bg-zinc-950 border border-zinc-900 p-4 text-xs tracking-widest uppercase" onChange={e => setSelectedGenre(e.target.value)}>{GENRES.map(g => <option key={g} value={g}>{g}</option>)}</select>
          <select className="bg-zinc-950 border border-zinc-900 p-4 text-xs tracking-widest uppercase" onChange={e => setSelectedPlatform(e.target.value)}>{PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}</select>
        </div>

        {loading ? <div className="py-20 text-center text-xs animate-pulse">SYNCING...</div> : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map(p => (
              <a key={p.id} href={p.url} target="_blank" className="group flex flex-col bg-zinc-950 border border-zinc-900 hover:border-zinc-700 transition-all duration-500">
                <div className="w-full aspect-square bg-zinc-900 relative overflow-hidden border-b border-zinc-900">
                  <img src={p.coverUrl} referrerPolicy="no-referrer" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-1.5 bg-zinc-900 px-2 py-0.5 text-white">
                      <PlatformIcon platform={p.platform} />
                      <span className="text-[9px] font-mono tracking-widest uppercase">{p.platform}</span>
                    </div>
                    <span className="text-[9px] font-mono tracking-widest border border-zinc-800 text-zinc-500 px-2 py-0.5 uppercase">{p.genre}</span>
                  </div>
                  <h2 className="text-white text-sm tracking-widest uppercase font-medium line-clamp-1">{p.title}</h2>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}