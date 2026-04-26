"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Briefcase, Code, User } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { easeOut } from "@/lib/motion";

type PovId = "everyone" | "recruiters" | "developers";

const POV_OPTIONS: {
  id: PovId;
  label: string;
  Icon: typeof User;
}[] = [
    { id: "everyone", label: "Everyone", Icon: User },
    { id: "recruiters", label: "Recruiters", Icon: Briefcase },
    { id: "developers", label: "Developers", Icon: Code },
  ];

const POV_COPY: Record<PovId, string> = {
  everyone:
    "I enjoy turning complex ideas into simple, reliable systems. I build practical applications that are scalable, efficient, and designed to solve real-world problems.",
  recruiters:
    "I am a Computer Science undergraduate focused on backend engineering, AI systems, and cybersecurity. I build scalable applications using modern technologies, with strong attention to clean architecture, performance, and maintainability.",
  developers:
    "I work with REST APIs, backend systems, and AI workflows. My stack includes FastAPI, React, and data-driven tools, with a focus on writing clean, modular code and designing systems that scale.",
};

const sectionEase = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.06 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: sectionEase },
  },
};

const fadeUpImage = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: sectionEase },
  },
};

export function About() {
  const [imageReady, setImageReady] = useState(false);
  const [pov, setPov] = useState<PovId>("everyone");
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, ease: sectionEase }}
      className="scroll-mt-24 bg-black px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="relative order-1 mx-auto w-full max-w-md pb-24 sm:pb-28 lg:order-none lg:mx-0 lg:max-w-none lg:pb-0"
        >
          <motion.div
            variants={fadeUpImage}
            className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-[#27272a] shadow-[0_20px_48px_rgba(0,0,0,0.45)]"
          >
            <AnimatePresence>
              {!imageReady ? (
                <motion.div
                  key="about-img-skeleton"
                  className="absolute inset-0 z-10 overflow-hidden rounded-2xl bg-zinc-900"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: easeOut }}
                >
                  <div
                    className="absolute inset-0 animate-pulse bg-zinc-800/50"
                    aria-hidden
                  />
                </motion.div>
              ) : null}
            </AnimatePresence>
            <motion.div
              className="relative h-full w-full"
              initial={{ opacity: 0, scale: 1.015 }}
              animate={
                imageReady
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 1.015 }
              }
              transition={{ duration: 0.55, ease: easeOut }}
            >
              <Image
                src="/img/me.jpg"
                alt="Professional portrait"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover grayscale"
                priority={false}
                onLoadingComplete={() => setImageReady(true)}
              />
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="absolute -bottom-1 left-4 right-4 sm:left-6 sm:bottom-2 sm:right-auto sm:w-[min(100%,280px)]"
          >
            <div className="rounded-xl border border-[#27272a] bg-zinc-900/80 px-5 py-4 backdrop-blur-md">
              <div className="mb-3 flex gap-1.5">
                <span className="h-0.5 w-6 rounded-full bg-indigo-400" />
                <span className="h-0.5 w-3 rounded-full bg-indigo-400/70" />
              </div>
              <p className="text-4xl font-bold tabular-nums tracking-tight text-indigo-200 sm:text-5xl">
                Learning
              </p>
              <p className="mt-1 text-sm font-medium text-[#a1a1aa]">
                Through Execution
              </p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="order-2 flex min-w-0 flex-col gap-8 pt-2 lg:order-none lg:pt-0"
        >
          <motion.div variants={fadeUp} className="flex flex-col">
            <h2 className="text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-5xl">
              <span className="block">Building scalable systems</span>
              <span className="block text-indigo-400">
                with intelligence and precision
              </span>
            </h2>

            <div
              className="mt-6 flex flex-wrap gap-x-6 gap-y-1"
              role="tablist"
              aria-label="Choose how you view this profile"
            >
              {POV_OPTIONS.map(({ id, label, Icon }) => {
                const active = pov === id;
                return (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    id={`about-pov-${id}`}
                    onClick={() => setPov(id)}
                    className={`relative flex items-center gap-2 pb-2 text-sm font-medium transition-colors ${active
                      ? "text-white"
                      : "text-zinc-500 hover:text-zinc-300"
                      }`}
                  >
                    <Icon
                      className="size-4 shrink-0 opacity-90"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                    {label}
                    {active ? (
                      <motion.span
                        layoutId="about-pov-underline"
                        className="absolute bottom-0 left-0 right-0 h-px bg-indigo-400"
                        transition={
                          reduceMotion
                            ? { duration: 0 }
                            : { type: "spring", stiffness: 420, damping: 34 }
                        }
                      />
                    ) : null}
                  </button>
                );
              })}
            </div>

            <div
              className="mt-6 max-w-xl"
              role="tabpanel"
              id="about-pov-panel"
              aria-live="polite"
              aria-labelledby={`about-pov-${pov}`}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={pov}
                  initial={
                    reduceMotion
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 10 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  exit={
                    reduceMotion
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: -6 }
                  }
                  transition={{ duration: 0.22, ease: sectionEase }}
                  className="text-base leading-relaxed text-[#a1a1aa] sm:text-lg"
                >
                  {POV_COPY[pov]}
                </motion.p>
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
            <motion.a
              href="#projects"
              {...(reduceMotion
                ? {}
                : { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 } })}
              transition={{ duration: 0.2, ease: easeOut }}
              className="inline-flex items-center justify-center rounded-2xl bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_32px_rgba(99,102,241,0.35)] transition-colors hover:bg-indigo-400"
            >
              View Projects
            </motion.a>
            <motion.a
              href="#contact"
              {...(reduceMotion
                ? {}
                : { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 } })}
              transition={{ duration: 0.2, ease: easeOut }}
              className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-transparent px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/[0.04]"
            >
              Contact Me
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
