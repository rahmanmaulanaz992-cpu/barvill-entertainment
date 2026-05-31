"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isRouting, setIsRouting] = useState(false);

  // Membangun ilusi Loading "Entering Atmosphere" secara seamless
  useEffect(() => {
    setIsRouting(true);
    const timeout = setTimeout(() => setIsRouting(false), 1200);
    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <>
      {/* Immersive Atmospheric Route Overlay */}
      <AnimatePresence>
        {isRouting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none mix-blend-screen"
          >
            {/* Background darkening / blur drift */}
            <div className="absolute inset-0 bg-black/20 backdrop-blur-md" />
            
            {/* Center light leak pulsing */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, filter: "blur(20px)" }}
              animate={{ scale: 1, opacity: 0.5, filter: "blur(10px)" }}
              exit={{ scale: 1.1, opacity: 0, filter: "blur(30px)" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute w-[40vw] h-[40vh] bg-white rounded-full mix-blend-overlay"
            />
            
            {/* Signal Transition Text */}
            <motion.span
              initial={{ opacity: 0, y: 10, letterSpacing: "0.2em" }}
              animate={{ opacity: 0.7, y: 0, letterSpacing: "0.5em" }}
              exit={{ opacity: 0, y: -10, letterSpacing: "0.8em" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 text-[10px] md:text-xs uppercase text-white/50 font-light"
            >
              Entering Atmosphere
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Core Page Content Transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, filter: "blur(15px)", y: 20, scale: 0.98 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0, scale: 1 }}
          exit={{ opacity: 0, filter: "blur(15px)", y: -20, scale: 0.98 }}
          transition={{
            duration: 1.4,
            ease: [0.16, 1, 0.3, 1], // Luxury cinematic cubic-bezier
          }}
          className="w-full h-full flex-grow flex flex-col"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}