import { artists } from "@/data/artists";
import { getLatestReleases } from "@/lib/spotify";
import { NextResponse } from "next/server";

export async function GET() {
  console.log("API ROUTE HIT");

  try {
    const spotifyIds = artists
      .map((a) => a.spotifyId)
      .filter(Boolean) as string[];

    const releases = await getLatestReleases(spotifyIds);

    return NextResponse.json(releases);
  } catch (error) {
    console.error(error);
    return NextResponse.json([], { status: 500 });
  }
}