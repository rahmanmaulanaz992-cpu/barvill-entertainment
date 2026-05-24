"use client";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/30 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
        <h1 className="text-white tracking-[0.4em] text-sm">
          BARVILL
        </h1>

        <div className="flex gap-8 text-xs uppercase tracking-[0.3em] text-white/70">
          <a href="#">Home</a>
          <a href="#">Artists</a>
          <a href="#">Releases</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </div>
      </div>
    </nav>
  );
}