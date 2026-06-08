import type { Release } from "./types";

const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSNVjIIlV6NAtvNk75PSJCfE2WQw1aB_dN95dvt-a8BBD76eih1QvFqIGbpY926IY0hIs41yxj1IlPq/pub?output=csv";

/**
 * Automated function to convert regular Google Drive share links
 * into Direct View format (lh3.googleusercontent.com)
 */
function formatDriveUrl(url: string): string {
  if (!url) return "";
  
  // Detect if this is a Google Drive link
  if (url.includes("drive.google.com")) {
    // Regex to extract File ID from various Drive link formats
    const match = url.match(/\/d\/([^/]+)/) || url.match(/id=([^&]+)/);
    if (match && match[1]) {
      const fileId = match[1];
      return `http://googleusercontent.com/profile/picture/${fileId}`;
    }
  }
  
  // If not a Drive link (e.g., other hosting links), return as is
  return url;
}

/**
 * Function to parse CSV text into a 2-dimensional array.
 */
function parseCSV(text: string): string[][] {
  const result: string[][] = [];
  let currentLine: string[] = [];
  let currentVal = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentVal += '"';
        i++; 
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      currentLine.push(currentVal);
      currentVal = "";
    } else if (char === "\n" && !inQuotes) {
      currentLine.push(currentVal);
      result.push(currentLine);
      currentLine = [];
      currentVal = "";
    } else if (char === "\r" && nextChar === "\n" && !inQuotes) {
      currentLine.push(currentVal);
      result.push(currentLine);
      currentLine = [];
      currentVal = "";
      i++; 
    } else {
      currentVal += char;
    }
  }

  if (currentLine.length > 0 || currentVal !== "") {
    currentLine.push(currentVal);
    result.push(currentLine);
  }

  return result;
}

export async function getReleases(): Promise<Release[]> {
  try {
    const response = await fetch(CSV_URL, {
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      return [];
    }

    const csvText = await response.text();
    const rows = parseCSV(csvText);

    if (rows.length < 2) {
      return [];
    }

    const headers = rows[0].map((h) => h.trim());
    const releases: Release[] = [];

    for (let i = 1; i < rows.length; i++) {
      const values = rows[i];
      if (values.length === 1 && values[0].trim() === "") continue;

      const rowData: Record<string, string> = {};
      headers.forEach((header, index) => {
        rowData[header] = values[index] || "";
      });

      if (rowData.status !== "published") {
        continue;
      }

      // Here the formatDriveUrl function automatically formats the link before inserting into the object
      const release = {
        slug: rowData.slug || "",
        title: rowData.title || "",
        artist: rowData.artist || "",
        artistSlug: rowData.artistSlug || "",
        album: rowData.album || "",
        cover: formatDriveUrl(rowData.cover || ""), // <--- AUTOMATICALLY FORMATTED HERE
        lyrics: rowData.lyrics || "",
        audioUrl: rowData.audioUrl || "",
        releaseDate: rowData.releaseDate || "",
        releaseType: rowData.releaseType || "",
        trackNumber: rowData.trackNumber || "",
        language: rowData.language || "",
        genre: rowData.genre || "",
        description: rowData.description || "",
        Spotify: rowData.Spotify || "",
        "YouTube Music": rowData["YouTube Music"] || "",
        "Apple Music": rowData["Apple Music"] || "",
        status: rowData.status || "",
      };

      releases.push(release);
    }

    releases.sort((a, b) => {
      const dateA = new Date(a.releaseDate).getTime();
      const dateB = new Date(b.releaseDate).getTime();
      
      if (isNaN(dateA)) return 1;
      if (isNaN(dateB)) return -1;
      
      return dateB - dateA;
    });

    return releases;
  } catch (_error) {
    return [];
  }
}