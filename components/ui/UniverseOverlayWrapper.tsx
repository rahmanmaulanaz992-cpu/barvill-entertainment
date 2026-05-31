"use client";

import dynamic from "next/dynamic";

// Safe dynamic import to prevent hydration mismatch for heavily randomized UI
const UniverseOverlay = dynamic(() => import("./UniverseOverlay"), {
  ssr: false,
});

export default function UniverseOverlayWrapper() {
  return <UniverseOverlay />;
}