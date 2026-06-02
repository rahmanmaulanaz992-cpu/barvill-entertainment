import { getReleases } from "./google-sheets";

export async function getReleaseBySlug(slug: string) {
  const releases = await getReleases();

  return releases.find((release) => release.slug === slug);
}

export async function getReleasesByArtist(
  artistSlug: string
) {
  const releases = await getReleases();

  return releases.filter(
    (release) => release.artistSlug === artistSlug
  );
}