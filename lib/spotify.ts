"use server";

export interface SpotifyRelease {
  id: string;
  name: string;
  album_type: string;
  release_date: string;
  artists?: {
    name: string;
  }[];

  images?: {
    url: string;
  }[];

  external_urls?: {
    spotify: string;
  };
}

const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const API_ENDPOINT = "https://api.spotify.com/v1";

async function getAccessToken(): Promise<string | null> {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    console.warn("⚠️ [Spotify] SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET is missing in environment variables.");
    return null;
  }

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  try {
    const response = await fetch(TOKEN_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
      cache: "no-store",
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("❌ [Spotify] Gagal mendapatkan Access Token. Error:", errorBody);
      return null;
    }
    
    const data = await response.json();
    return data.access_token;
  } catch (_error) {
    console.error("❌ [Spotify] Network/Auth Error:", _error);
    return null;
  }
}

async function getArtistAlbums(spotifyId: string, token: string, limit = 5): Promise<SpotifyRelease[]> {
  console.log("Fetching artist:", spotifyId);
  try {
    const response = await fetch(
      `${API_ENDPOINT}/artists/${spotifyId}/albums?include_groups=album,single&limit=${limit}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        next: { revalidate: 3600 },
      }
    );
    
    if (!response.ok) {
      console.error("Spotify API Error:", response.status, response.statusText);
      const errorBody = await response.text();
      console.error(`   - ❌ [Spotify] API Error for artist ${spotifyId} (${response.status}):`, errorBody);
      return [];
    }
    
    const data = await response.json();
    const items = data.items || [];
    console.log("Albums found:", items.length);
    return items;
  } catch (_error) {
    console.error(`   - ❌ [Spotify] Network/Fetch Error for artist ${spotifyId}:`, _error);
    return [];
  }
}

export async function getLatestReleases(
  spotifyIds?: string[]
): Promise<SpotifyRelease[]> {
  console.log("FUNCTION ENTERED: getLatestReleases");
  console.log("\n--- [Spotify] Starting getLatestReleases ---");
  
  console.log("SPOTIFY_CLIENT_ID:", !!process.env.SPOTIFY_CLIENT_ID);
  console.log("SPOTIFY_CLIENT_SECRET:", !!process.env.SPOTIFY_CLIENT_SECRET);
  console.log("Artist IDs:", spotifyIds);

  if (!spotifyIds || spotifyIds.length === 0) {
    console.log("Reason for []: spotifyIds is undefined or empty array.");
    return [];
  }

  try {
    const token = await getAccessToken();
    console.log("2. [Spotify] Acquired Access Token:", token ? `SUCCESS (...${token.slice(-10)})` : "FAILED");
    if (!token) {
      console.log("Reason for []: Access token could not be generated.");
      return [];
    }

    console.log("3. [Spotify] Fetching releases in chunks...");
    const chunkSize = 10;
    const allReleases: SpotifyRelease[][] = [];
    for (let i = 0; i < spotifyIds.length; i += chunkSize) {
      const chunk = spotifyIds.slice(i, i + chunkSize);
      console.log(`   - Processing chunk: [${chunk.join(', ')}]`);
      const chunkResponses = await Promise.all(chunk.map((id) => getArtistAlbums(id, token, 3)));
      allReleases.push(...chunkResponses);
    }

    const flatReleases = allReleases.flat().filter(Boolean);
    console.log("4. [Spotify] All releases (flattened):", flatReleases.length, "items found.");

    const uniqueReleasesMap = new Map<string, SpotifyRelease>();
    flatReleases.forEach((release) => {
      if (!uniqueReleasesMap.has(release.id)) {
        uniqueReleasesMap.set(release.id, release);
      }
    });

    const uniqueReleases = Array.from(uniqueReleasesMap.values());
    console.log("5. [Spotify] Unique releases (deduplicated):", uniqueReleases.length, "items.");

    const sortedReleases = uniqueReleases.sort(
      (a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
    );
    console.log("6. [Spotify] Hasil sorting release terbaru (Top 3):", sortedReleases.slice(0, 3).map(r => `"${r.name}" (${r.release_date})`));
    console.log("7. [Spotify] Final latest release yang dikembalikan:", sortedReleases[0]?.name || "None");
    console.log("--- [Spotify] Finished getLatestReleases ---\n");
    return sortedReleases;
  } catch (_error) {
    console.error("!!! [Spotify] A critical error occurred in getLatestReleases:", _error);
    console.log("Reason for []: Caught an unexpected exception in getLatestReleases.");
    return [];
  }
}

export async function getSpotifyAlbumCover(albumId: string): Promise<string | null> {
  if (!albumId) return null;

  try {
    const token = await getAccessToken();
    if (!token) return null;

    const response = await fetch(`${API_ENDPOINT}/albums/${albumId}`, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 3600 }, 
    });
    
    if (!response.ok) return null;
    
    const data = await response.json();
    return data.images?.[0]?.url || null;
  } catch (_error) {
    console.error(`Spotify Album Fetch Error for ${albumId}:`, _error);
    return null;
  }
}
