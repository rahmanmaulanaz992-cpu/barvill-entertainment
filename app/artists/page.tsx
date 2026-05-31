import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { artists } from "@/data/artists";

export const metadata: Metadata = {
  title: "Artists — Barvill Entertainment",
  description: "Barvill Entertainment artist ecosystem.",
};

export default function ArtistsPage() {
  const sortedArtists = [...artists].sort(
    (a, b) => a.order - b.order
  );

  return (
    <main className="min-h-screen bg-black text-white px-6 md:px-12 pt-32 pb-24">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="mb-20">
          <p className="text-xs tracking-[0.4em] uppercase text-white/40 mb-4">
            Barvill Entertainment
          </p>

          <h1 className="text-5xl md:text-7xl tracking-[0.15em] uppercase font-light">
            Artists
          </h1>
        </div>

        {/* Artists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {sortedArtists.map((artist) => (
            <div
              key={artist.name}
              className="group relative border border-white/10 bg-white/[0.02] overflow-hidden"
            >
              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={
                    artist.image ||
                    "/images/artist-placeholder.jpg"
                  }
                  alt={artist.name}
                  fill
                  className="object-cover grayscale transition-all duration-1000 ease-out group-hover:grayscale-0 group-hover:scale-105 group-hover:brightness-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                {artist.featured && (
                  <p className="text-[10px] tracking-[0.4em] uppercase text-white/40 mb-4">
                    Featured Entity
                  </p>
                )}

                <h2 className="text-2xl tracking-[0.15em] uppercase mb-3">
                  {artist.name}
                </h2>

                <p className="text-sm text-white/50 mb-6">
                  {artist.genre?.join(" / ")}
                </p>

                {/* Links */}
                <div className="flex gap-3">
                  {artist.spotifyId && (
                    <Link
                      href={`https://open.spotify.com/artist/${artist.spotifyId}`}
                      target="_blank"
                      className="border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black transition"
                    >
                      Spotify
                    </Link>
                  )}

                  {artist.youtubeChannelId && (
                    <Link
                      href={`https://youtube.com/${artist.youtubeChannelId}`}
                      target="_blank"
                      className="border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black transition"
                    >
                      YouTube
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}