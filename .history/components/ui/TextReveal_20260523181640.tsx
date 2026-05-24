"use client";

import { motion, Variants } from "framer-motion";
import React from "react";

interface TextRevealProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
}

export default function TextReveal({ text, className = "", as = "div" }: TextRevealProps) {
  // Local stagger wrapper
  const localContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08, // Cinematic pacing per word
      },
    },
  };

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 20, filter: "blur(8px)", scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      scale: 1,
      transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] }, // Apple-inspired luxury ease
    },
  };

  const words = text.split(" ");
  const MotionTag = motion[as as keyof typeof motion] as any;

  return (
    <MotionTag variants={localContainerVariants} className={className}>
      {words.map((word, idx) => (
        <motion.span
          key={idx}
          variants={wordVariants}
          className="inline-block whitespace-pre" // preserve Exact font spacing (&nbsp;)
        >
          {word}{idx < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </MotionTag>
  );
}