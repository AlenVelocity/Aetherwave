"use client";

import { motion, useInView } from "framer-motion";
import React from "react";

export default function Features() {
  const ref = React.useRef(null);
  const isInView = useInView(ref);

  const FADE_UP_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      viewport={{ once: false }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.15,
          },
        },
      }}
    >
      <div className="mx-auto mt-12 max-w-7xl px-6 sm:mt-56 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <motion.h2
            variants={FADE_UP_ANIMATION_VARIANTS}
            className="text-base font-semibold leading-7 text-muted-foreground"
          >
            The Future of Conversations
          </motion.h2>
          <motion.p
            variants={FADE_UP_ANIMATION_VARIANTS}
            className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Dive into the Ethereal Experience
          </motion.p>
          <motion.p
            variants={FADE_UP_ANIMATION_VARIANTS}
            className="mt-6 text-lg leading-8"
          >
            Engage with simulated versions of fictional characters, historical figures, and more. AetherWave brings immersive, educational, and customizable conversations to your fingertips.
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}
