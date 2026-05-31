import { notFound } from "next/navigation";
import { artists } from "@/data/artists";
import { getLatestReleases } from "@/lib/spotify";
import { getLatestUploads } from "@/lib/youtube";
import ClientArtistView from "@/components/ui/ClientArtistView";

export async function generateStaticParams() {
  return artists.map((artist) => ({
    slug: artist.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const artist = artists.find((a) => a.slug === params.slug);
  if (!artist) return { title: "Signal Lost" };

  return {
    title: `${artist.name} — Barvill Entertainment`,
    description: artist.description,
  };
}

export default async function ArtistPage({ params }: { params: { slug: string } }) {
  const artist = artists.find((a) => a.slug === params.slug);
  
  if (!artist) {
    notFound();
  }

  // Fetch data Spotify & YouTube secara paralel
  const [releases, videos] = await Promise.all([
    artist.spotifyId ? getLatestReleases([artist.spotifyId]) : [],
    artist.youtubeChannelId ? getLatestUploads([artist.youtubeChannelId], 5) : []
  ]);

  return <ClientArtistView artist={artist} releases={releases} videos={videos} />;
}