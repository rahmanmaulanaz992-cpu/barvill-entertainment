export type ReleaseType = "SINGLE" | "EP" | "ALBUM";

export interface Release {
  id: string;
  artistId: string;
  title: string;
  type: ReleaseType;
  releaseDate: string;
  coverImage: string;
  youtubeMusicUrl: string;
  featured: boolean;
}

export const releases: Release[] = [];