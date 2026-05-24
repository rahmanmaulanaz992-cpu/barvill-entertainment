import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import Navbar from "@/components/layout/Navbar";
import PageTransition from "@/components/ui/PageTransition";
import Preloader from "@/components/ui/Preloader";
import CustomCursor from "@/components/ui/CustomCursor";
import SoundToggle from "@/components/ui/SoundToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://barvill.com"),
  title: {
    default: "Barvill Entertainment — Cinematic Music Label Experience",
    template: "%s | Barvill Entertainment",
  },
  description: "Barvill Entertainment adalah label musik cinematic modern dengan pengalaman website immersive, luxury, dan editorial yang menghadirkan artist, visual, dan storytelling dalam atmosfer digital premium.",
  keywords: [
    "Barvill Entertainment",
    "cinematic music label",
    "immersive music website",
    "luxury music experience",
    "editorial label",
    "modern entertainment brand"
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
    title: "Barvill Entertainment — Cinematic Music Label Experience",
    description: "Barvill Entertainment adalah label musik cinematic modern dengan pengalaman website immersive, luxury, dan editorial yang menghadirkan artist, visual, dan storytelling dalam atmosfer digital premium.",
    siteName: "Barvill Entertainment",
    images: [
      {
        url: "/og-image.jpg", // Placeholder for Open Graph Image (1200x630)
        width: 1200,
        height: 630,
        alt: "Barvill Entertainment Cinematic Experience",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Barvill Entertainment — Cinematic Music Label Experience",
    description: "Barvill Entertainment adalah label musik cinematic modern dengan pengalaman website immersive, luxury, dan editorial yang menghadirkan artist, visual, dan storytelling dalam atmosfer digital premium.",
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
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CustomCursor />
        <SoundToggle />
        <Preloader />
        <SmoothScrollProvider>
          <Navbar />
          <PageTransition>
            {children}
          </PageTransition>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
