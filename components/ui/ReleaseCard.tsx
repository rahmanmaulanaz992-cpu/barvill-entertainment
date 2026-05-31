import Image from "next/image";
import Link from "next/link";
import type { SpotifyRelease } from "@/lib/spotify";

interface ReleaseCardProps {
  release: SpotifyRelease;
}

export default function ReleaseCard({ release }: ReleaseCardProps) {
  if (!release) return null;

  const coverImage = release.images?.[0]?.url || "/images/placeholder-cover.jpg";
  const externalUrl = release.external_urls?.spotify || "#";

  return (
    <Link 
      href={externalUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Listen to ${release.name || "Release"} on Spotify`}
      className="group relative flex flex-col gap-4 overflow-hidden"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-[#111] grayscale transition-all duration-700 ease-out group-hover:grayscale-0">
        <Image
          src={coverImage}
          alt={release.name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Atmospheric overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-100" />
      </div>
      
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-medium tracking-widest text-[#EAEAEA] uppercase">
          {release.name || "Unknown Release"}
        </h3>
        <p className="text-xs tracking-widest text-[#888] uppercase">
          {release.release_date?.slice(0, 4) || "TBA"} — {release.album_type || "Release"}
        </p>
      </div>
    </Link>
  );
}