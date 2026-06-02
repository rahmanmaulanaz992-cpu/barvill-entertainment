import { notFound } from "next/navigation";
import { getReleaseBySlug } from "@/lib/releases";
import Link from "next/link";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ReleasePage({ params }: PageProps) {
  const { slug } = await params;
  const release = await getReleaseBySlug(slug);

  if (!release) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0b0b0c] text-neutral-100 pt-32 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Tombol Kembali - Diberi container z-index tinggi agar lolos dari jeratan navbar */}
        <div className="mb-8 relative z-30 block w-fit">
          <Link 
            href="/releases" 
            className="text-sm text-neutral-400 hover:text-white transition-colors duration-200 flex items-center gap-2 relative z-30 pointer-events-auto w-fit"
          >
            ← Kembali ke Rilisan
          </Link>
        </div>

        {/* Grid Utama: Cover dan Info Utama */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start mb-12">
          
          {/* Bagian Cover Art */}
          <div className="w-full aspect-square bg-neutral-900 rounded-lg overflow-hidden shadow-2xl border border-neutral-800">
            {release.cover ? (
              <img 
                src={release.cover} 
                alt={`${release.title} cover`} 
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-neutral-600">
                No Cover Art
              </div>
            )}
          </div>

          {/* Bagian Detail Lagu */}
          <div className="flex flex-col justify-center">
            <span className="text-xs font-bold tracking-widest text-neutral-500 uppercase mb-2">
              {release.releaseType || "Single"}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-2">
              {release.title}
            </h1>
            <p className="text-xl text-neutral-400 font-medium mb-6">
              {release.artist}
            </p>

            {/* Metadata Ringkas */}
            <div className="grid grid-cols-2 gap-4 border-t border-b border-neutral-800 py-4 mb-8 text-sm text-neutral-400">
              <div>
                <p className="text-xs text-neutral-500">Genre</p>
                <p className="font-medium text-neutral-300">{release.genre || "-"}</p>
              </div>
              <div>
                <p className="text-xs text-neutral-500">Tanggal Rilis</p>
                <p className="font-medium text-neutral-300">
                  {release.releaseDate || "-"}
                </p>
              </div>
            </div>

            {/* Tombol Link Streaming (Hanya muncul jika ada link-nya) */}
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Dengarkan di</p>
              
              {release.Spotify && (
                <a href={release.Spotify} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between w-full bg-neutral-900 border border-neutral-800 hover:border-[#1DB954] hover:bg-[#1DB954]/5 rounded-md px-4 py-3 transition-all duration-300 group">
                  <span className="font-medium text-sm group-hover:text-[#1DB954]">Spotify</span>
                  <span className="text-xs text-neutral-500 group-hover:text-[#1DB954]">Putar ↗</span>
                </a>
              )}

              {release["YouTube Music"] && (
                <a href={release["YouTube Music"]} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between w-full bg-neutral-900 border border-neutral-800 hover:border-[#FF0000] hover:bg-[#FF0000]/5 rounded-md px-4 py-3 transition-all duration-300 group">
                  <span className="font-medium text-sm group-hover:text-[#FF0000]">YouTube Music</span>
                  <span className="text-xs text-neutral-500 group-hover:text-[#FF0000]">Putar ↗</span>
                </a>
              )}

              {release["Apple Music"] && (
                <a href={release["Apple Music"]} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between w-full bg-neutral-900 border border-neutral-800 hover:border-[#FA243C] hover:bg-[#FA243C]/5 rounded-md px-4 py-3 transition-all duration-300 group">
                  <span className="font-medium text-sm group-hover:text-[#FA243C]">Apple Music</span>
                  <span className="text-xs text-neutral-500 group-hover:text-[#FA243C]">Dengarkan ↗</span>
                </a>
              )}
            </div>

          </div>
        </div>

        {/* Bagian Bawah: Deskripsi & Lirik */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-neutral-800 pt-10">
          
          {/* Deskripsi (Kiri - Lebar 1/3) */}
          <div className="md:col-span-1">
            <h2 className="text-lg font-semibold text-white mb-3">Tentang Rilisan</h2>
            <p className="text-sm text-neutral-400 leading-relaxed whitespace-pre-line">
              {release.description || "Tidak ada deskripsi untuk rilisan ini."}
            </p>
          </div>

          {/* Lirik Lagu (Kanan - Lebar 2/3) */}
          <div className="md:col-span-2 bg-neutral-900/40 border border-neutral-800/60 rounded-xl p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-white mb-4">Lirik Lagu</h2>
            {release.lyrics ? (
              <p className="text-neutral-300 text-sm sm:text-base leading-loose whitespace-pre-line font-serif italic tracking-wide">
                {release.lyrics}
              </p>
            ) : (
              <p className="text-sm text-neutral-500 italic">Lirik tidak tersedia.</p>
            )}
          </div>

        </div>

      </div>
    </main>
  );
}