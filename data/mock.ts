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
      "BOYZAI is an anomaly amidst a uniform industry. Emerging from the dystopian underground circuit, his audio-visual storytelling bridges brutal industrial textures with introspective lyrical vulnerability.",
      "His work is not just music, but pure cinematic architecture that redefines the boundaries of alternative hip-hop. Under Barvill Entertainment, this vision is unleashed without compromise."
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
      "G-MARTYR operates on unseen frequencies. A visionary who analogically destroys organic instruments to create an absolute mechanical soundscape.",
      "His approach to sound design turns noise into a primary language, inviting listeners into a dark yet deeply human dystopian dimension."
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
    description: "A dystopian audio-visual experience. Uniting brutal industrial textures with introspective vulnerability. ECHOES is a cinematic monument from BOYZAI.",
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
      "In an era where algorithms dictate song structures, G-Martyr chose to retreat to the underground. 'THE AWAKENING' is not an album written, but assembled like a war machine.",
      "His creative process involves deliberately damaged instruments: analog amplifiers pushed beyond their thermal limits, iron plates struck to create natural reverb, and field-audio recordings from abandoned factories.",
      "The beauty of G-Martyr's work lies in his ability to find harmony amidst mechanical chaos. It is a pure transmission of an artistic vision that refuses to compromise."
    ],
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80"
  },
  {
    slug: "novielle-debut",
    title: "Novielle: Bridging The Gap Between Soul and Machine",
    category: "Artist Spotlight",
    date: "OCT 12, 2026",
    content: [
      "Novielle's voice is a living entity. On one hand, it carries the warmth of traditional soul; on the other, it is enveloped in cutting-edge electronic distortion."
    ],
    image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80"
  }
];