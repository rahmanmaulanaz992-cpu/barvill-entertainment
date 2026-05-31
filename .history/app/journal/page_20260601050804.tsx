import Link from "next/link";
import { NotionJournalArticle } from "@/lib/notion";

export default async function JournalPage() {
  // Praktik yang lebih aman untuk Vercel: Gunakan VERCEL_URL jika tersedia
  const getBaseUrl = () => {
    if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    return "http://localhost:3000";
  };

  const baseUrl = getBaseUrl();
  let journalArticles: NotionJournalArticle[] = [];

  try {
    // Gunakan URL absolute karena ini Server Component
    const res = await fetch(`${baseUrl.replace(/\/$/, "")}/api/journal`, {
      cache: "no-store",
    });
    
    if (res.ok) {
      journalArticles = await res.json();
      console.log("JUMLAH ARTIKEL:", journalArticles.length);
      console.log("DATA ARTIKEL:", JSON.stringify(journalArticles, null, 2));
    } else {
      console.error(`Failed to fetch journal: ${res.status} ${res.statusText}`);
    }
  } catch (error) {
    console.error("Error fetching journal articles:", error);
  }

  return (
    <main className="pt-32 p-10 text-white">
      <h1>DEBUG JOURNAL</h1>

      <p>Total Artikel: {journalArticles.length}</p>

      <pre>
        {JSON.stringify(journalArticles, null, 2)}
      </pre>
    </main>
  );
}