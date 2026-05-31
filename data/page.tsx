import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { JournalArticle, journalArticles } from "@/data/journal";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// 1. SEO & Metadata Setup
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const entry = journalArticles.find((e) => e.slug === resolvedParams.slug);
  
  if (!entry) {
    return {
      title: "Signal Lost | Barvill Entertainment",
      description: "The requested archive could not be located.",
    };
  }

  return {
    title: `${entry.title} | The Archive`,
    description: entry.excerpt,
    openGraph: {
      title: `${entry.title} | Barvill Entertainment`,
      description: entry.excerpt,
      images: [entry.cover],
      type: "article",
    },
  };
}

// 2. Main Page Component (Server Component for safe build & SEO)
export default async function JournalArticlePage({ params }: PageProps) {
  const resolvedParams = await params;
  const entry = journalArticles.find((e) => e.slug === resolvedParams.slug);

  // Graceful Fallback: Invalid Slug
  if (!entry) return notFound();

  // Graceful Fallback: Missing Content (fallback to excerpt)
  // Type assertion used to safely check for content without mutating types
  const contentArray: string[] = (entry as { content?: string[] }).content || [entry.excerpt];

  return (
    <main className="relative w-full min-h-screen bg-black text-white flex flex-col pt-32 pb-32 overflow-x-hidden">
      {/* Cinematic Motion Keyframes (Server-Side Safe) */}
      <style>{`
        @keyframes cinematicFadeUp {
          0% { opacity: 0; transform: translateY(40px); filter: blur(12px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0px); }
        }
        .animate-cinematic {
          animation: cinematicFadeUp 1.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
      `}</style>

      {/* Cinematic Film Grain Overlay */}
      <div 
        className="fixed top-[-50%] left-[-50%] w-[200%] h-[200%] pointer-events-none z-40 mix-blend-screen opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* Core Dark Ambient Base */}
      <div className="absolute inset-0 w-full h-full bg-linear-to-b from-neutral-950 to-black pointer-events-none z-0" aria-hidden="true" />
      
      {/* Subtle Top Glow Transmisi Archive */}
      <div className="absolute inset-0 w-full h-[80vh] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.05)_0%,transparent_60%)] pointer-events-none z-0 mix-blend-screen" aria-hidden="true" />

      <article className="relative z-10 w-full max-w-4xl mx-auto px-4 md:px-6 flex flex-col items-center mt-12 md:mt-24">
        
        {/* Editorial Header */}
        <header className="animate-cinematic w-full flex flex-col items-center text-center" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[9px] md:text-[10px] tracking-[0.3em] text-white/50 border border-white/10 px-4 py-1.5 rounded-full uppercase bg-white/5">
              {entry.category}
            </span>
            <div className="w-1 h-1 rounded-full bg-white/20" />
            <span className="text-[9px] md:text-[10px] tracking-[0.3em] text-white/40 uppercase">
              {entry.date}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-[0.15em] text-white uppercase leading-tight mb-12 drop-shadow-lg">
            {entry.title}
          </h1>
          <div className="w-16 h-px bg-white/30 mb-16" />
        </header>

        {/* Cinematic Hero Image */}
        <div className="animate-cinematic w-full aspect-[16/9] md:aspect-[21/9] relative overflow-hidden bg-white/5 border border-white/10 mb-16 md:mb-24 shadow-[0_20px_40px_rgba(0,0,0,0.5)]" style={{ animationDelay: '300ms' }}>
          {entry.cover ? (
            <Image
              src={entry.cover}
              alt={entry.title}
              fill
              unoptimized // Safe fallback for external domains without touching next.config.js
              className="object-cover grayscale hover:grayscale-0 opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-1000 ease-[0.16,1,0.3,1]"
              priority
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[10px] tracking-[0.4em] text-white/30 uppercase">Signal Lost</span>
            </div>
          )}
          <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-80 pointer-events-none" />
        </div>

        {/* Article Content */}
        <div className="animate-cinematic w-full max-w-3xl space-y-8 md:space-y-10" style={{ animationDelay: '500ms' }}>
          {contentArray.map((paragraph: string, idx: number) => (
            <p key={idx} className="text-sm md:text-base lg:text-lg text-white/70 font-light leading-[2.2] tracking-wide text-justify md:text-left">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Return to Archive Navigation */}
        <div className="animate-cinematic mt-24 md:mt-32 w-full flex justify-center" style={{ animationDelay: '700ms' }}>
          <Link href="/journal" className="group flex flex-col items-center gap-4 cursor-pointer" aria-label="Return to Archive">
            <span className="text-[10px] tracking-[0.3em] text-white/40 uppercase group-hover:text-white transition-colors duration-500 group-hover:tracking-[0.4em]">
              Return to Archive
            </span>
            <div className="w-px h-12 bg-white/20 group-hover:bg-white/60 group-hover:h-16 transition-all duration-700 ease-[0.16,1,0.3,1]" />
          </Link>
        </div>

      </article>
    </main>
  );
}