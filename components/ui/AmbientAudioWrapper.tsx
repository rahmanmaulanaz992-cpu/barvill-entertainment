"use client";

import dynamic from "next/dynamic";

// Safe dynamic import to prevent hydration mismatch with HTMLAudioElement
const AmbientAudio = dynamic(() => import("./AmbientAudio"), {
  ssr: false,
});

export default function AmbientAudioWrapper() {
  return <AmbientAudio />;
}