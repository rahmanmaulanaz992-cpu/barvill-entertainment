import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compiler: {
    // Production safe: Hapus semua console.log (kecuali error) untuk hasil inspect yang profesional
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  experimental: {
    // Mengurangi waktu load dengan mengoptimalkan tree-shaking library berat
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
};

export default nextConfig;
