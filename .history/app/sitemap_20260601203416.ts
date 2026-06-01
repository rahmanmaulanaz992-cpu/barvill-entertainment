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

  // Contoh kalau kamu mau tambahkan halaman artikel jurnal secara dinamis nanti:
  // (Untuk sekarang, masukkan manual dulu atau biarkan rute statis di atas berjalan)
  const journalPosts = [
    '/journal/a-beautiful-boy', // Sesuaikan dengan path artikel game kamu
  ].map((post) => ({
    url: `${baseUrl}${post}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...routes, ...journalPosts];
}