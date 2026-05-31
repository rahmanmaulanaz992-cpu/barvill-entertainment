import { NextResponse } from "next/server";
import { getJournalArticles } from "@/lib/notion";

export async function GET() {
  try {
    const articles = await getJournalArticles();
    
    const formattedArticles = articles.map((article) => ({
      id: article.id,
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      category: article.category,
      cover: article.cover,
      date: article.date,
    }));

    return NextResponse.json(formattedArticles);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error while fetching journal articles" },
      { status: 500 }
    );
  }
}