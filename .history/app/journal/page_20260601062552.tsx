import Link from "next/link";
import { NotionJournalArticle } from "@/lib/notion";

export default async function JournalPage() {
  const getBaseUrl = () => {
    if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
    if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    
    // Fallback localhost HANYA untuk mode development
    if (process.env.NODE_ENV === "development") return "http://localhost:3000";
    
    throw new Error("Base URL is not configured. Please set NEXT_PUBLIC_SITE_URL.");
  };

  let journalArticles: NotionJournalArticle[] = [];
  let fetchError: string | null = null;

  try {
    const baseUrl = getBaseUrl();
    const res = await fetch(`${baseUrl}/api/journal`, {
      cache: "no-store",
    });
    
    if (!res.ok) {
      fetchError = `HTTP Error ${res.status}: ${res.statusText}`;
    } else {
      journalArticles = await res.json();
    }
  } catch (error) {
    console.error("Error fetching journal articles:", error);
    fetchError = error instanceof Error ? error.message : "Fetch network failed.";
  }

  // --- ERROR STATE UI ---
  // Menampilkan error secara visual di production agar tidak tersembunyi
  if (fetchError) {
    return (
      <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 flex flex-col items-center justify-center bg-black text-white">
        <div className="bg-red-500/10 border border-red-500/30 p-8 rounded-2xl max-w-2xl text-center">
          <h1 className="text-3xl font-bold text-red-500 mb-4 tracking-widest uppercase">Internal Server Error</h1>
          <p className="text-neutral-400 mb-6">Failed to retrieve journal data in production.</p>
          <code className="block bg-black/60 p-4 rounded-lg text-sm text-red-400 break-all text-left">
            {fetchError}
          </code>
        </div>
      </main>
    );
  }

  // --- NORMAL UI ---
  const publishedArticles = Array.isArray(journalArticles) ? journalArticles : [];
  const featuredArticle = publishedArticles.length > 0 ? publishedArticles[0] : null;
  const latestArticles = publishedArticles.length > 1 ? publishedArticles.slice(1) : [];

  const shortExcerpt =
    featuredArticle?.excerpt && featuredArticle.excerpt.length > 150
      ? featuredArticle.excerpt.slice(0, 150) + "..."
      : featuredArticle?.excerpt || "";

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 lg:px-24 max-w-[1800px] mx-auto bg-black text-white">
      {/* --- HEADER SECTION --- */}
      <header className="flex flex-col gap-6 max-w-4xl">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter uppercase text-white">
          Barvill Journal
        </h1>
        <p className="text-lg md:text-xl text-neutral-400 max-w-2xl">
          News, updates, releases and stories from Barvill Entertainment.
        </p>
      </header>

      {/* --- FEATURED ARTICLE SECTION --- */}
      {featuredArticle && featuredArticle.slug && (
        <section className="mt-16 relative w-full h-[60vh] md:h-[75vh] rounded-2xl overflow-hidden group">
          <Link href={`/journal/${featuredArticle.slug}`}>
            <img
              src={featuredArticle.cover || "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80"}
              alt={featuredArticle.title || "Featured Article"}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="absolute inset-0 p-6 md:p-12 pb-12 md:pb-16 flex flex-col justify-end">
              <span className="text-xs md:text-sm font-semibold tracking-widest uppercase text-neutral-300 mb-4">
                {featuredArticle.category || "Journal"}
              </span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white max-w-3xl leading-tight mb-4 line-clamp-2">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white max-w-4xl leading-tight mb-4">
                {featuredArticle.title || "Untitled Article"}
              </h2>
              <p className="text-neutral-400 max-w-2xl text-sm md:text-base hidden md:block mb-6 line-clamp-2 leading-relaxed">
                {shortExcerpt}
              </p>
              <div className="flex items-center text-xs md:text-sm text-neutral-500 uppercase tracking-widest">
                <span>{featuredArticle.date || ""}</span>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* --- LATEST ARTICLES SECTION --- */}
      {latestArticles.length > 0 && (
        <section className="mt-24">
          <div className="mb-12 border-b border-white/10 pb-6">
            <h3 className="text-2xl md:text-4xl font-bold uppercase tracking-wide text-white">
              Latest Articles
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {latestArticles.map((article) => {
              if (!article || !article.slug) return null;
              return (
                <Link key={article.slug} href={`/journal/${article.slug}`}>
                  <article className="group cursor-pointer flex flex-col gap-6">
                    <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-white/5">
                      <img
                        src={article.cover || "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80"}
                        alt={article.title || "Article"}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                    </div>
                    <div className="flex flex-col gap-3">
                      <span className="text-xs font-semibold tracking-widest uppercase text-neutral-400">
                        {article.category || "Journal"}
                      </span>
                      <h4 className="text-xl md:text-2xl font-bold text-white group-hover:text-neutral-300 transition-colors leading-snug">
                        {article.title || "Untitled"}
                      </h4>
                      <span className="text-xs text-neutral-500 uppercase tracking-widest mt-1">
                        {article.date || ""}
                      </span>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
}