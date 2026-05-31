export interface Artist {
  id?: string;
  name: string;
  slug?: string;
  image?: string;
  atmosphere?: string;
  description?: string;
  status?: string;
  cycle?: string;
  spotifyId: string;
  youtubeChannelId?: string;
  youtubeMusicUrl?: string;
  category?: string;
  featured?: boolean;
  order: number;
  genre: string[];
  featuredRelease?: {
    title: string;
    year: string;
    type: string;
    cover?: string;
    description?: string;
    formats: string[];
  };
}

export interface Release {
  id?: string;
  title: string;
  artist: string;
  genre?: string;
  cover: string;
  year?: string;
  type?: string;
  description?: string;
  spotifyUrl?: string;
  youtubeUrl?: string;
  releaseDate: string;
  featured?: boolean;
}