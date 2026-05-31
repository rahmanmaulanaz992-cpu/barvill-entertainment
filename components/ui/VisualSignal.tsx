import React from "react";
import { getLatestUploads, type YouTubeVideo } from "@/lib/youtube";
import CinematicVideoCard from "./CinematicVideoCard";
import TextReveal from "./TextReveal";
import { artists } from "@/data/artists";

export default async function VisualSignal() {
  // Ekstrak YouTube ID asli dari ecosystem
  const channelIds = artists
    .map((artist) => artist.youtubeChannelId)
    .filter((id): id is string => Boolean(id));

  // Mengambil video terbaru (fallback kosong jika tidak ada ID)
  const videos = await getLatestUploads(channelIds, 3);

  return (
    <section className="relative w-full py-24 md:py-32 px-4 md:px-6 z-10 flex flex-col items-center border-t border-white/5 bg-black/50">
      <div className="w-full max-w-6xl mb-16 flex flex-col items-center text-center">
        <span className="text-[10px] md:text-xs tracking-[0.4em] text-white/50 uppercase block mb-6">
          Cinematic Media Archives
        </span>
        <TextReveal as="h2" text="VISUAL SIGNAL" className="text-2xl md:text-4xl font-light tracking-[0.25em] uppercase" />
        <div className="w-8 md:w-12 h-px bg-white/20 mt-8" />
      </div>

      {!videos || videos.length === 0 ? (
        <div className="w-full max-w-6xl flex items-center justify-center py-20 border border-white/5 bg-white/[0.02]">
          <p className="text-xs tracking-[0.5em] font-mono text-white/30 uppercase">No Visual Signals Found</p>
        </div>
      ) : (
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {videos.map((video: YouTubeVideo) => (
            <CinematicVideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </section>
  );
}