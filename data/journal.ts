export interface JournalArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  cover: string;
  published: boolean;
  date: string;
}

export const journalArticles: JournalArticle[] = [
  {
    id: "1",
    title: "Selamat Datang di Desa Barbar: Rumah",
    slug: "selamat-datang-di-desa-barbar-rumah",
    excerpt: "Mengupas tuntas tentang awal mula terbentuknya Barvill Entertainment dan filosofi 'Desa Barbar' yang menjadi fondasi kami.",
    category: "News",
    cover: "/journal/article-1.jpg",
    published: true,
    date: "OCT 25, 2026",
  },
  {
    id: "2",
    title: "Behind The Sound of Silent Atlas",
    slug: "behind-the-sound-of-silent-atlas",
    excerpt: "Eksplorasi mendalam di balik proses kreatif pembuatan album Silent Atlas yang memadukan unsur organik dan elektronik.",
    category: "Behind The Scene",
    cover: "/journal/article-2.jpg",
    published: true,
    date: "SEP 14, 2026",
  },
  {
    id: "3",
    title: "BOYZAI Announces New Release",
    slug: "boyzai-announces-new-release",
    excerpt: "BOYZAI kembali dengan karya terbarunya, membawa nuansa sinematik hip-hop yang lebih kelam dan eksperimental.",
    category: "Release",
    cover: "/journal/article-3.jpg",
    published: true,
    date: "AUG 30, 2026",
  }
];