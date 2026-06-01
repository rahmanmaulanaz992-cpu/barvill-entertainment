import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const resolvedParams = await params;

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://barvillentertainment.com";

  const res = await fetch(`${baseUrl}/api/journal`, {
    cache: "no-store",
  });

  const journalArticles = await res.json();

  const article = journalArticles.find(
    (a: any) =>
      a.slug === decodeURIComponent(resolvedParams.slug)
  );

  if (!article) {
    return {
      title: "Journal | Barvill Entertainment",
    };
  }

  const seoDescription =
    article.excerpt.length > 160
      ? article.excerpt.slice(0, 157) + "..."
      : article.excerpt;

  return {
    title: `${article.title} | Barvill Entertainment`,
    description: seoDescription,
    openGraph: {
      title: `${article.title} | Barvill Entertainment`,
      description: seoDescription,
      url: `${baseUrl}/journal/${encodeURIComponent(article.slug)}`,
      siteName: "Barvill Entertainment",
      type: "article",
      images: [
        {
          url: article.cover,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.title} | Barvill Entertainment`,
      description: seoDescription,
      images: [article.cover],
    },
  };
}

export default async function JournalArticlePage({ params }: PageProps) {
  const resolvedParams = await params;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/journal`, {
    cache: "no-store",
  });
  const journalArticles = await res.json();

  const decodedSlug = decodeURIComponent(resolvedParams.slug);

  console.log("DECODED SLUG:", decodedSlug);

  const article = journalArticles.find((a: any) => a.slug === decodedSlug);

  console.log("URL SLUG:", resolvedParams.slug);

  console.log(
    "ALL SLUGS:",
    journalArticles.map((a: any) => a.slug)
  );

  console.log("FOUND ARTICLE:", article);

  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 lg:px-24 max-w-[1800px] mx-auto">
      {/* --- CINEMATIC HEADER SECTION --- */}
      <header className="relative w-full h-[60vh] md:h-[75vh] rounded-2xl overflow-hidden mb-16">
        <img
          src={article.cover}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-end max-w-5xl mx-auto w-full">
          <span className="text-xs md:text-sm font-semibold tracking-widest uppercase text-neutral-300 mb-4">
            {article.category}
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white max-w-4xl leading-tight mb-6">
            {article.title}
          </h1>
          <div className="flex items-center text-xs md:text-sm text-neutral-500 uppercase tracking-widest">
            <span>{article.date}</span>
          </div>
        </div>
      </header>

      {/* --- ARTICLE CONTENT --- */}
      <article className="max-w-4xl mx-auto px-4 md:px-0 flex flex-col gap-12">
        <p className="text-xl md:text-2xl leading-relaxed text-neutral-300 font-medium">
          {article.excerpt}
        </p>

        <div className="w-16 h-px bg-white/10" />

        <Link href="/journal" className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-neutral-500 hover:text-white transition-colors group">
          <span className="group-hover:-translate-x-1 transition-transform">&larr;</span> Back to Journal
        </Link>
      </article>
    </main>
  );
}