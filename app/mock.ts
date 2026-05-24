export interface ArtistDetail {
  slug: string;
  name: string;
  category: string;
  status: string;
  bio: string[];
  image: string;
  releases: { slug: string; title: string; year: string; type: string }[];
  socials: { platform: string; url: string }[];
}

export interface ReleaseDetail {
  slug: string;
  title: string;
  artist: string;
  artistSlug: string;
  type: string;
  date: string;
  description: string;
  image: string;
  formats: string[];
  tracklist: string[];
  credits: { role: string; name: string }[];
}

export interface ArticleDetail {
  slug: string;
  title: string;
  category: string;
  date: string;
  content: string[];
  image: string;
}

export const artistsData: ArtistDetail[] = [
  {
    slug: "boyzai",
    name: "BOYZAI",
    category: "CINEMATIC HIP-HOP",
    status: "EXCLUSIVE",
    bio: [
      "BOYZAI adalah anomali di tengah industri yang seragam. Berangkat dari sirkuit bawah tanah distopia, penceritaan audio-visualnya menjembatani tekstur industrial brutal dengan kerentanan lirik introspektif.",
      "Karyanya bukan sekadar musik, melainkan arsitektur sinematik murni yang meredefinisi batasan hip-hop alternatif. Di bawah Barvill Entertainment, visi ini dibebaskan tanpa kompromi."
    ],
    image: "https://images.unsplash.com/photo-1493225457289-7170889f0747?auto=format&fit=crop&q=80",
    releases: [{ slug: "echoes", title: "ECHOES", year: "2026", type: "Album" }],
    socials: [{ platform: "Spotify", url: "#" }, { platform: "Instagram", url: "#" }]
  },
  {
    slug: "g-martyr",
    name: "G-MARTYR",
    category: "INDUSTRIAL EXPERIMENTAL",
    status: "EXCLUSIVE",
    bio: [
      "G-MARTYR beroperasi di frekuensi yang tidak terlihat. Seorang visioner yang menghancurkan instrumen organik secara analog untuk menciptakan lanskap suara mekanis yang absolut.",
      "Pendekatannya terhadap desain suara mengubah noise menjadi bahasa utama, mengundang pendengar masuk ke dalam dimensi distopia yang gelap namun sangat manusiawi."
    ],
    image: "https://images.unsplash.com/photo-1533134486753-c833f0eddebd?auto=format&fit=crop&q=80",
    releases: [{ slug: "the-awakening", title: "THE AWAKENING", year: "2026", type: "Short Film" }],
    socials: [{ platform: "SoundCloud", url: "#" }, { platform: "YouTube", url: "#" }]
  }
];

export const releasesData: ReleaseDetail[] = [
  {
    slug: "echoes",
    title: "ECHOES",
    artist: "BOYZAI",
    artistSlug: "boyzai",
    type: "ALBUM",
    date: "OCT 2026",
    description: "Sebuah pengalaman audio-visual distopia. Menyatukan tekstur industrial brutal dengan kerentanan introspektif. ECHOES adalah monumen sinematik dari BOYZAI.",
    image: "https://images.unsplash.com/photo-1493225457289-7170889f0747?auto=format&fit=crop&q=80",
    formats: ["Digital / Streaming", "12\" Limited Vinyl", "Spatial Audio"],
    tracklist: [
      "1. STATIC AWAKENING (04:12)",
      "2. ECHOES FROM THE VOID (03:45)",
      "3. MACHINE HEART / HUMAN SOUL (05:20)",
      "4. FREQUENCY DECAY (02:15)",
      "5. REQUIEM (06:30)"
    ],
    credits: [
      { role: "Production & Sound Design", name: "BOYZAI" },
      { role: "Executive Producer", name: "Barvill Studios" },
      { role: "Mastering", name: "Sterling Sound" }
    ]
  }
];

export const articlesData: ArticleDetail[] = [
  {
    slug: "the-anatomy-of-sound",
    title: "The Anatomy of Sound: G-Martyr's Industrial Awakening",
    category: "Behind The Scene",
    date: "OCT 24, 2026",
    content: [
      "Dalam era di mana algoritma mendikte struktur lagu, G-Martyr memilih untuk mundur ke ruang bawah tanah. 'THE AWAKENING' bukanlah album yang ditulis, melainkan dirakit layaknya mesin perang.",
      "Proses kreatifnya melibatkan instrumen yang sengaja dirusak: amplifier analog yang didorong melampaui batas panasnya, plat besi yang dipukul untuk menciptakan reverb alami, dan rekaman field-audio dari pabrik yang ditinggalkan.",
      "Keindahan dari karya G-Martyr terletak pada kemampuannya menemukan harmoni di tengah kekacauan mekanis. Ini adalah transmisi murni dari visi artistik yang menolak berkompromi."
    ],
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80"
  },
  {
    slug: "novielle-debut",
    title: "Novielle: Bridging The Gap Between Soul and Machine",
    category: "Artist Spotlight",
    date: "OCT 12, 2026",
    content: [
      "Suara Novielle adalah entitas yang hidup. Di satu sisi, ia membawa kehangatan soul tradisional; di sisi lain, ia terbungkus dalam distorsi elektronik mutakhir."
    ],
    image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80"
  }
];