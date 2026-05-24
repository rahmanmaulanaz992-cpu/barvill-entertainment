import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compiler: {
    // Production safe: Hapus semua console.log (kecuali error) untuk hasil inspect yang profesional
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false,
  },
  experimental: {
    // Mengurangi waktu load dengan mengoptimalkan tree-shaking library berat
    optimizePackageImports: ["framer-motion"],
  },
};

export default nextConfig;
