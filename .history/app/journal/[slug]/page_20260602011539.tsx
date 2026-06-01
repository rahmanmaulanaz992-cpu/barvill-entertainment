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

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://barvillentertainment.com";
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

  const currentArticleUrl = `${baseUrl}/journal/${encodeURIComponent(article.slug)}`;

  const seoDescription =
    article.excerpt.length > 160
      ? article.excerpt.slice(0, 157) + "..."
      : article.excerpt;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": seoDescription,
    "image": article.cover,
    "datePublished": article.date,
    "dateModified": article.date,
    "author": {
      "@type": "Organization",
      "name": "Barvill Entertainment"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Barvill Entertainment",
      "logo": {
        "@type": "ImageObject",
        "url": "https://barvillentertainment.com/data/logo-barvill.jpg"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": currentArticleUrl
    }
  };

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 lg:px-24 max-w-[1800px] mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {/* --- CINEMATIC HEADER SECTION --- */}
      <header className="relative w-full h-[60vh] md:h-[75vh] rounded-2xl overflow-hidden mb-16">
        <img
          src={article.cover}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </header>

      {/* --- ARTICLE CONTENT --- */}
      <article className="max-w-4xl mx-auto px-4 md:px-0 flex flex-col gap-12">
        <div className="flex flex-col gap-4 md:gap-6">
          <span className="text-xs md:text-sm font-semibold tracking-widest uppercase text-neutral-300">
            {article.category}
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            {article.title}
          </h1>
          <div className="flex items-center text-xs md:text-sm text-neutral-500 uppercase tracking-widest">
            <span>{article.date}</span>
          </div>
        </div>

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