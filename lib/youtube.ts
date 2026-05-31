"use server";

export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  url: string;
}

interface YouTubePlaylistItem {
  id?: {
    videoId?: string;
  };

  snippet?: {
    title?: string;
    publishedAt?: string;
    thumbnails?: {
      high?: {
        url?: string;
      };
    };
  };
}

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3/search";

async function fetchChannelVideos(channelId: string, limit: number): Promise<YouTubeVideo[]> {
  if (!YOUTUBE_API_KEY) return [];

  try {
    const url = new URL(YOUTUBE_API_URL);
    url.searchParams.append("part", "snippet");
    
    // Perbaikan: Bedakan pencarian antara YouTube Handle (@) dan Channel ID (UC...)
    if (channelId.startsWith("@")) {
      url.searchParams.append("q", channelId);
    } else {
      url.searchParams.append("channelId", channelId);
    }
    url.searchParams.append("maxResults", limit.toString());
    url.searchParams.append("order", "date");
    url.searchParams.append("type", "video");
    url.searchParams.append("key", YOUTUBE_API_KEY);

    const response = await fetch(url.toString(), {
      next: { revalidate: 3600 }, // Cache 1 jam agar production-safe & fast reload
    });

    if (!response.ok) return [];

    const data = await response.json();
    if (!data.items) return [];

    return data.items.map((item: any) => ({
      id: item.id?.videoId || "",
      title: item.snippet?.title || "",
      thumbnail: item.snippet?.thumbnails?.high?.url || item.snippet?.thumbnails?.default?.url || "",
      publishedAt: item.snippet?.publishedAt || "",
      url: `https://www.youtube.com/watch?v=${item.id?.videoId}`,
    })).filter((v: YouTubeVideo) => v.id !== ""); // Pastikan video ter-map dengan valid
  } catch (_error) {
    return []; // Fallback individual channel
  }
}

export async function getLatestUploads(
  channelIds?: string[],
  limit: number = 3
): Promise<YouTubeVideo[]> {
  if (!channelIds || channelIds.length === 0) return [];

  try {
    // Ambil seluruh rilis video dari setiap artis secara paralel
    const allVideos = await Promise.all(
      channelIds.map((id) => fetchChannelVideos(id, limit))
    );

    const flatVideos = allVideos.flat().filter(Boolean);

    // Deduplikasi (menghindari channel collab menampilkan ID yg sama 2x)
    const uniqueVideosMap = new Map<string, YouTubeVideo>();
    flatVideos.forEach((video) => {
      if (video.id && !uniqueVideosMap.has(video.id)) {
        uniqueVideosMap.set(video.id, video);
      }
    });

    // Urutkan jadwal rilis video berdasar rentang waktu paling baru
    return Array.from(uniqueVideosMap.values()).sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  } catch (_error) {
    return []; // Graceful fallback aman mencegah UI collapse
  }
}