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
    title: "Welcome to Barbarian Village: Home",
    slug: "selamat-datang-di-desa-barbar-rumah",
    excerpt: "An in-depth look at the origins of Barvill Entertainment and the 'Barbarian Village' philosophy that serves as our foundation.",
    category: "News",
    cover: "/journal/article-1.jpg",
    published: true,
    date: "OCT 25, 2026",
  },
  {
    id: "2",
    title: "Behind The Sound of Silent Atlas",
    slug: "behind-the-sound-of-silent-atlas",
    excerpt: "An in-depth exploration behind the creative process of making the Silent Atlas album, which blends organic and electronic elements.",
    category: "Behind The Scene",
    cover: "/journal/article-2.jpg",
    published: true,
    date: "SEP 14, 2026",
  },
  {
    id: "3",
    title: "BOYZAI Announces New Release",
    slug: "boyzai-announces-new-release",
    excerpt: "BOYZAI returns with his latest work, bringing a darker and more experimental cinematic hip-hop nuance.",
    category: "Release",
    cover: "/journal/article-3.jpg",
    published: true,
    date: "AUG 30, 2026",
  }
];