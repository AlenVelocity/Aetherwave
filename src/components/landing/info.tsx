"use client";

// import {
//   FADE_DOWN_ANIMATION_VARIANTS,
//   FADE_UP_ANIMATION_VARIANTS,
// } from "@/lib/constants";
import { motion, useInView } from "framer-motion";
import React from "react";
// import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { HeartFilledIcon } from "@radix-ui/react-icons";

const features = [
  {
    name: "Advanced Voice Synthesis",
    description:
      "Leveraging state-of-the-art models like ElevenLabs, Tacotron and WaveRNN to produce high-quality synthetic voices.",
    icon: HeartFilledIcon,
  },
  {
    name: "Conversational AI",
    description:
      "We'll be using varios LLMs such as Jailbroken GPT 3.5/4, LLAMA 2 and Vicuna-7b. The goal is to ensure that the voices not only sound authentic but are also adept at holding engaging conversations.",
    icon: HeartFilledIcon,
  },
  {
    name: "Dynamic Character Customization",
    description:
      "Leverage advanced algorithms to modify and fine-tune AI personalities, offering premium users a tailored conversational experience.",
    icon: HeartFilledIcon,
  },
  {
    name: "Targeted Community Modules",
    description:
      "Deploy specialized modules for niche communities, optimizing for unique conversational experiences in fandoms like Harry Potter and Marvel.",
    icon: HeartFilledIcon,
  }
];


export default function Info() {
  //   const { ref: refBottom, inView: inViewBottom } = useInView({
  //     triggerOnce: false,
  //   });
  const ref = React.useRef(null);
  const isInView = useInView(ref);

  const FADE_DOWN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };
  const FADE_UP_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };
  return (
    <div className="overflow-hidden py-24 sm:py-32 mt-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
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
  <motion.h2
  variants={FADE_UP_ANIMATION_VARIANTS}
  className="text-base font-semibold leading-7 text-muted-foreground"
>
  AetherWave: Experience the Ethereal
</motion.h2>
<motion.p
  variants={FADE_UP_ANIMATION_VARIANTS}
  className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl"
>
  Harness the Elements with AetherWave
</motion.p>
<motion.p
  variants={FADE_UP_ANIMATION_VARIANTS}
  className="mt-6 text-lg leading-8 "
>
  Dive into immersive conversations, educational insights, and customizable experiences with your favorite personalities and fictional characters.
</motion.p>
                <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 lg:max-w-none">
                  {features.map((feature) => (
                    <motion.div
                      key={feature.name}
                      variants={FADE_DOWN_ANIMATION_VARIANTS}
                      className="relative pl-9"
                    >
                      <dt className="inline font-semibold">
                        <feature.icon
                          className="absolute left-1 top-1 h-5 w-5 text-muted-foreground"
                          aria-hidden="true"
                        />
                        {feature.name}
                      </dt>{" "}
                      <dd className="inline">{feature.description}</dd>
                    </motion.div>
                  ))}
                </dl>
              </motion.div>
            </div>
          </div>
          <Image
            src="/webb1.jpg"
            alt="Product screenshot"
            className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
            width={2432}
            height={1442}
          />
        </div>
      </div>
    </div>
  );
}
