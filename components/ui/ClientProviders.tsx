"use client";

import dynamic from "next/dynamic";

const CustomCursor = dynamic(
  () => import("@/components/ui/CustomCursor"),
  { ssr: false }
);

const SoundToggle = dynamic(
  () => import("@/components/ui/SoundToggle"),
  { ssr: false }
);

const Preloader = dynamic(
  () => import("@/components/ui/Preloader"),
  { ssr: false }
);

export default function ClientProviders() {
  return (
    <>
      <CustomCursor />
      <SoundToggle />
      <Preloader />
    </>
  );
}