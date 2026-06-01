import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import Navbar from "@/components/ui/Navbar";
import PageTransition from "@/components/ui/PageTransition";
import ClientProviders from "@/components/ui/ClientProviders";
import AmbientAudioWrapper from "@/components/ui/AmbientAudioWrapper";
import UniverseOverlayWrapper from "@/components/ui/UniverseOverlayWrapper";
import Footer from "@/components/ui/Footer";
import { GoogleAnalytics } from '@next/third-parties/google';

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5, // Accessibility friendly
  viewportFit: "cover", // Immersive cinematic feel on mobile (edge-to-edge)
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://barvillentertainment.com"),
  title: {
    default: "Barvill Entertainment — Entertainment Hub",
    template: "%s | Barvill Entertainment",
  },
  alternates: {
    canonical: "/",
  },
  formatDetection: {
    telephone: false, // Clean up unwanted auto-links on iOS
  },
  description: "Barvill Entertainment adalah entertainment hub independent yang berfokus pada pengembangan talenta, karya kreatif, artist development, dan ekosystem hiburan digital",
  keywords: [
    "Barvill Entertainment",
    "Entertainment Ecosystem",
    "Barbarian Village",
    "Digital Entertainment",
    "Entertainment Hub",
    "Artist Development",
    "Barvill",
    "Record Label",
    "Creative Community",
    "Independent Entertainment"
  ],
  authors: [{ name: "Barvill Entertainment" }],
  creator: "Barvill Entertainment",
  publisher: "Barvill Entertainment",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/",
    title: "Barvill Entertainment — Entertainment Hub",
    description: "Barvill Entertainment adalah entertainment hub independent yang berfokus pada pengembangan talenta, karya kreatif, artist development, dan ekosistem hiburan digital",
    siteName: "Barvill Entertainment",
    images: [
      {
        url: "/og-image.jpg", // Placeholder for Open Graph Image (1200x630)
        width: 1200,
        height: 630,
        alt: "Barvill Entertainment official Website and entertainment ecosistem",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Barvill Entertainment — Entertainment Hub",
    description: "Barvill Entertainment adalah entertainment hub independent yang berfokus pada pengembangan talenta, karya kreatif, artist development, dan ekosistem hiburan digital",
    creator: "@barvill", // Placeholder Twitter Handle
    images: ["/twitter-image.jpg"], // Placeholder for Twitter Image
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id" // Semantic update to match primary content language
      className={`${inter.className} h-full antialiased bg-black`}
      suppressHydrationWarning // Production safe handling for Next.js app router & extension injections
    >
      <body className="bg-black text-[#EAEAEA] min-h-full flex flex-col selection:bg-white/10 selection:text-white overscroll-none relative">
        {/* Global Cinematic Vignette for Atmospheric Depth */}
        <div 
          className="pointer-events-none fixed inset-0 z-[100] bg-[radial-gradient(circle_at_center,transparent_10%,rgba(0,0,0,0.4)_120%)] mix-blend-multiply" 
          aria-hidden="true" 
        />
        <AmbientAudioWrapper />
        <UniverseOverlayWrapper />
        <ClientProviders />
        <SmoothScroll>
          <Navbar />
          <PageTransition>
            {children}
          </PageTransition>
          <Footer />
        </SmoothScroll>
        <GoogleAnalytics gaId="G-MTW3GTNC3" />
      </body>
    </html>
  );
}
