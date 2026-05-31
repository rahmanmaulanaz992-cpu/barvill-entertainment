"use client";

import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { usePathname } from "next/navigation";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // 10. ACCESSIBILITY SAFETY: Hentikan eksekusi custom motion jika diaktifkan OS
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // 3. IMPLEMENT LENIS SYSTEM (Cinematic Configuration)
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) =>
        Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });
    lenisRef.current = lenis;

    // 9. PERFORMANCE RULES: Optimized RequestAnimationFrame Loop
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Mencegah posisi scroll tertinggal saat pindah halaman
  useEffect(() => {
    if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true });
  }, [pathname]);

  return <>{children}</>;
}