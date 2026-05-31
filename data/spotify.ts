// Spotify API Foundation Architecture
// Ready for Client Credentials / Auth Flow implementation

export const getSpotifyToken = async () => {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    console.warn("Spotify Client ID atau Secret tidak ditemukan di file .env");
    return null;
  }

  // Enkripsi kredensial ke Base64 (Syarat wajib Spotify)
  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
    }),
    next: { revalidate: 3600 }, // Caching token otomatis selama 1 jam
  });

  const data = await response.json();
  return data.access_token;
};

export const getArtistData = async (spotifyId: string) => {
  // Foundation for fetching real-time monthly listeners, followers, etc.
  console.log(`[Spotify System] Ready to fetch data for ${spotifyId}`);
  return null;
};

export const getLatestReleases = async (spotifyId: string) => {
  const token = await getSpotifyToken();
  if (!token) return [];

  // Mengambil karya (Album/Single/EP) terbaru dan riil dari Spotify API
  const response = await fetch(`https://api.spotify.com/v1/artists/${spotifyId}/albums?include_groups=album,single,ep&limit=10`, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 86400 } // Cache otomatis selama 24 jam (Next.js)
  });

  if (!response.ok) return [];

  const data = await response.json();
  return data.items; // Raw array berisi data real album/single dari server
};