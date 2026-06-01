import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://barvillentertainment.com';

  // Daftar halaman statis website kamu
  const routes = [
    '',
    '/artists',
    '/releases',
    '/journal',
    '/archive',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const res = await fetch(`${baseUrl}/api/journal`, {
    cache: "no-store",
  });

  const articles = await res.json();

  const journalPosts = articles.map((article: any) => ({
    url: `${baseUrl}/journal/${encodeURIComponent(article.slug)}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...routes, ...journalPosts];
}