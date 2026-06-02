import { getReleases } from "@/lib/google-sheets";
import ReleasesClient from "./ReleasesClient";

export const metadata = {
  title: "Releases — Barvill Entertainment",
  description: "Menampilkan katalog rilisan Barvill Entertainment.",
};

export default async function ReleasesPage() {
  const releases = await getReleases();
  
  // Anda bisa mengecek jumlah rilis yang terbaca di log terminal ketika build/dev
  console.log(`[Releases Page] Berhasil membaca ${releases.length} data rilisan dari Google Sheets.`);

  return <ReleasesClient releases={releases} />;
}