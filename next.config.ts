import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compiler: {
    // Production safe: Remove all console.log (except error) for professional inspect results
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
    // Reduce load time by optimizing tree-shaking for heavy libraries
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
};

export default nextConfig;
