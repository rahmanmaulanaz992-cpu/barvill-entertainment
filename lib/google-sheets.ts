import type { Release } from "./types";

const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSNVjIIlV6NAtvNk75PSJCfE2WQw1aB_dN95dvt-a8BBD76eih1QvFqIGbpY926IY0hIs41yxj1IlPq/pub?output=csv";

/**
 * Fungsi untuk mem-parse text CSV menjadi array 2 dimensi.
 * Mampu menangani nilai yang mengandung koma atau baris baru (seperti multi-line lyrics)
 * dengan aman, asalkan nilai tersebut dibungkus dengan tanda kutip (").
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
      // Menangani tanda kutip ganda ("") di dalam string yang di-escape
      if (inQuotes && nextChar === '"') {
        currentVal += '"';
        i++; // Lewati karakter kutip kedua
      } else {
        // Toggle status inQuotes
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      // Pemisah antar kolom pada CSV
      currentLine.push(currentVal);
      currentVal = "";
    } else if (char === "\n" && !inQuotes) {
      // Pemisah baris baru (Unix/Linux/macOS)
      currentLine.push(currentVal);
      result.push(currentLine);
      currentLine = [];
      currentVal = "";
    } else if (char === "\r" && nextChar === "\n" && !inQuotes) {
      // Pemisah baris baru (Windows)
      currentLine.push(currentVal);
      result.push(currentLine);
      currentLine = [];
      currentVal = "";
      i++; // Lewati \n
    } else {
      currentVal += char;
    }
  }

  // Memasukkan sisa nilai ke baris terakhir jika file tidak diakhiri dengan baris baru
  if (currentLine.length > 0 || currentVal !== "") {
    currentLine.push(currentVal);
    result.push(currentLine);
  }

  return result;
}

export async function getReleases(): Promise<Release[]> {
  try {
    // 1. Fetch data dari Google Sheets CSV dengan cache revalidasi 1 jam
    const response = await fetch(CSV_URL, {
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      return [];
    }

    const csvText = await response.text();
    
    // 2. Parse text CSV dengan aman menjadi array baris dan kolom
    const rows = parseCSV(csvText);

    // Jika tidak ada data selain header (atau kosong sama sekali)
    if (rows.length < 2) {
      return [];
    }

    // 3. Ambil baris pertama sebagai daftar header
    const headers = rows[0].map((h) => h.trim());
    const releases: Release[] = [];

    // 4. Looping setiap baris data (dimulai dari indeks 1 setelah header)
    for (let i = 1; i < rows.length; i++) {
      const values = rows[i];
      // 5. Abaikan baris kosong yang tidak sengaja terbaca
      if (values.length === 1 && values[0].trim() === "") continue;

      const rowData: Record<string, string> = {};
      headers.forEach((header, index) => {
        rowData[header] = values[index] || "";
      });

      // 6. Hanya proses dan masukkan data dengan status "published"
      if (rowData.status !== "published") {
        continue;
      }

      // 7. Bentuk objek release (menyesuaikan interface, sambil menyimpan ekstra kolom)
      const release = {
        slug: rowData.slug || "",
        title: rowData.title || "",
        artist: rowData.artist || "",
        artistSlug: rowData.artistSlug || "",
        album: rowData.album || "",
        cover: rowData.cover || "",
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

    // 8. Urutkan hasil berdasarkan releaseDate terbaru (Descending)
    releases.sort((a, b) => {
      const dateA = new Date(a.releaseDate).getTime();
      const dateB = new Date(b.releaseDate).getTime();
      
      // Fallback jika format tanggal tidak terbaca (NaN), turunkan ke bawah
      if (isNaN(dateA)) return 1;
      if (isNaN(dateB)) return -1;
      
      return dateB - dateA;
    });

    return releases;
  } catch (_error) {
    // Mencegah throw error untuk menjaga stabilitas UI, fallback ke array kosong
    return [];
  }
}