export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  url: string;
}

interface YouTubePlaylistItem {
  snippet: {
    resourceId: { videoId: string };
    title: string;
    thumbnails?: {
      maxres?: { url: string };
      high?: { url: string };
      medium?: { url: string };
    };
    publishedAt: string;
  };
}

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const BASE_URL = "https://www.googleapis.com/youtube/v3";

/**
 * Fetch latest videos from a specific channel's uploads playlist
 */
export async function getChannelVideos(channelId: string, maxResults: number = 3): Promise<YouTubeVideo[]> {
  if (!YOUTUBE_API_KEY) {
    console.warn("YouTube API Key is missing. Returning empty visual signals.");
    return [];
  }
  if (!channelId || channelId.startsWith("yt_")) return []; // ignore placeholder data

  try {
    // 1. Get channel's associated uploads playlist
    const channelRes = await fetch(
      `${BASE_URL}/channels?part=contentDetails&id=${channelId}&key=${YOUTUBE_API_KEY}`,
      { next: { revalidate: 3600 } } // Cache 1 hour for performance
    );

    if (!channelRes.ok) throw new Error("Failed to fetch channel data");
    const channelData = await channelRes.json();
    
    if (!channelData.items || channelData.items.length === 0) return [];
    const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads;

    // 2. Fetch items from the uploads playlist
    const playlistRes = await fetch(
      `${BASE_URL}/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=${maxResults}&key=${YOUTUBE_API_KEY}`,
      { next: { revalidate: 3600 } }
    );

    if (!playlistRes.ok) throw new Error("Failed to fetch playlist items");
    const playlistData = await playlistRes.json();

    return playlistData.items.map((item: YouTubePlaylistItem) => ({
      id: item.snippet.resourceId.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails?.maxres?.url || item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.medium?.url || "",
      publishedAt: item.snippet.publishedAt,
      url: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`
    }));
  } catch (error) {
    console.error(`[YouTube API] Error fetching for channel ${channelId}:`, error);
    return []; // Graceful empty state
  }
}

/**
 * Fetch the latest cross-channel videos for the global ecosystem
 */
export async function getLatestUploads(channelIds: string[], maxResults: number = 4): Promise<YouTubeVideo[]> {
  try {
    const validIds = channelIds.filter(id => id && !id.startsWith("yt_"));
    const promises = validIds.map(id => getChannelVideos(id, maxResults));
    const results = await Promise.all(promises);
    const allVideos = results.flat();
    
    // Sort descending by published date
    return allVideos
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, maxResults);
  } catch (error) {
    console.error("[YouTube API] Error fetching latest ecosystem uploads:", error);
    return [];
  }
}

/**
 * Fetch a specific featured video by Video ID
 */
export async function getFeaturedVideo(videoId: string): Promise<YouTubeVideo | null> {
  if (!YOUTUBE_API_KEY || !videoId) return null;
  
  try {
    // Implementation similar to getChannelVideos but targeting specific video
    // ... returning graceful fallback if fails
    return null; // Placeholder for expansion
  } catch (error) {
    console.error("[YouTube API] Error fetching featured video:", error);
    return null;
  }
}