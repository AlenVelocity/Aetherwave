"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import VariantCarousel from "./variant-carousel";
import { VelocityScroll } from "../ui/velocity";

export default function IntroText() {
  const ref = React.useRef(null);
  const isInView = useInView(ref);

  const FADE_DOWN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <motion.div
          initial="hidden"
          ref={ref}
          animate={isInView ? "show" : "hidden"}
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
<motion.h1
  variants={FADE_DOWN_ANIMATION_VARIANTS}
  className="text-4xl font-bold tracking-tight sm:text-6xl"
>
  AetherWave
</motion.h1>
<motion.p
  variants={FADE_DOWN_ANIMATION_VARIANTS}
  className="mt-6 text-lg leading-8"
>
  Dive deep into immersive conversations, educational insights, and customizable experiences.
</motion.p>


          <motion.div
            variants={FADE_DOWN_ANIMATION_VARIANTS}
            className="mt-10 flex items-center justify-center gap-x-6 "
          >
            <Link href="https://discord.gg/CfTVUuHn37" className="z-50">
              <Button>Get started</Button>
            </Link>

            <Link href="https://wool-novel-de6.notion.site/AetherWave-caa540afcff5424c9d95c551cf44d029" className="z-50">
              <Button variant="outline">
                Learn more &nbsp;<span aria-hidden="true">→</span>
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
      <div className="mt-16 flow-root sm:mt-24">
        <motion.div
          className="rounded-md"
          initial={{ y: 100, opacity: 0 }} // Image starts from 100px below and fully transparent
          animate={{ y: 0, opacity: 1 }} // Image ends at its original position and fully opaque
          transition={{ type: "spring", stiffness: 50, damping: 20 }} // transition specifications
        >
          <AnimatePresence mode="wait">
            <VelocityScroll textA="HARNESS THE ELEMENTS" textB="EXPERIENCE THE ETHEREAL"/>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
