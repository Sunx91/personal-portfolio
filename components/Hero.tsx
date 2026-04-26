"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Github, Instagram, Linkedin, Mail, Phone } from "lucide-react";
import { useRef } from "react";
import { HeroWireframeScene } from "@/components/HeroWireframeScene";
import { useSiteReady } from "@/components/SiteEntrance";
import { easeOut } from "@/lib/motion";

const tagline =
  "Building scalable, intelligent systems with a focus on backend engineering, AI, and cybersecurity.";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const social = [
  {
    href: "https://github.com/Sunx91",
    label: "GitHub",
    Icon: Github,
  },
  {
    href: "https://www.linkedin.com/in/sunath-sandul",
    label: "LinkedIn",
    Icon: Linkedin,
  },
  {
    href: "https://instagram.com/sandul.ig",
    label: "Instagram",
    Icon: Instagram,
  },
  {
    href: "mailto:sunx.3295@gmail.com",
    label: "Email",
    Icon: Mail,
  },
  {
    href: "tel:+94704266980",
    label: "Phone",
    Icon: Phone,
  },
] as const;

export function Hero() {
  const ready = useSiteReady();
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-dvh min-w-0 flex-col md:min-h-dvh"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        initial={false}
        animate={ready ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: reduceMotion ? 0.2 : 0.85, ease: easeOut, delay: ready ? 0.05 : 0 }}
      >
        <HeroWireframeScene sectionRef={sectionRef} />
      </motion.div>

      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_55%_45%_at_85%_45%,rgba(99,102,241,0.12),transparent_55%),radial-gradient(ellipse_40%_35%_at_15%_30%,rgba(168,85,247,0.08),transparent_50%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(0,0,0,0.75)_0%,rgba(0,0,0,0.35)_38%,transparent_68%)] md:bg-[linear-gradient(90deg,rgba(0,0,0,0.82)_0%,rgba(0,0,0,0.25)_42%,transparent_72%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px] opacity-40 [mask-image:linear-gradient(90deg,black_35%,transparent_85%)]"
        aria-hidden
      />

      <div className="relative z-10 flex min-w-0 flex-1 flex-col justify-center px-4 pb-28 pt-24 sm:px-6 sm:pb-32 sm:pt-28 md:pb-24 md:pt-32">
        <div className="mx-auto grid w-full min-w-0 max-w-6xl flex-1 gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] md:items-center md:gap-8 lg:gap-12">
          <motion.div
            variants={container}
            initial="hidden"
            animate={ready ? "show" : "hidden"}
            className="flex min-w-0 max-w-xl flex-col gap-8"
          >
            <div>
              <motion.span
                variants={item}
                className="inline-flex items-center gap-2 rounded-full border border-indigo-400/35 bg-indigo-500/10 px-3 py-1 text-xs font-medium tracking-wide text-indigo-200/90"
              >
                <span className="relative flex size-2.5 items-center justify-center">
                  <span className="absolute size-1.5 rounded-full bg-indigo-300" />
                  {reduceMotion ? null : (
                    <>
                      <motion.span
                        aria-hidden
                        className="absolute size-2.5 rounded-full border border-indigo-300/60"
                        animate={{ scale: [1, 1.95], opacity: [0.55, 0] }}
                        transition={{
                          duration: 1.4,
                          repeat: Infinity,
                          ease: "easeOut",
                        }}
                      />
                      <motion.span
                        aria-hidden
                        className="absolute size-2.5 rounded-full border border-indigo-300/45"
                        animate={{ scale: [1, 2.25], opacity: [0.4, 0] }}
                        transition={{
                          duration: 1.4,
                          delay: 0.25,
                          repeat: Infinity,
                          ease: "easeOut",
                        }}
                      />
                    </>
                  )}
                </span>
                Computer Science Undergraduate
              </motion.span>
              <motion.h1
                variants={item}
                className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
              >
                <span className="block">Sunath</span>
                <span className="block text-zinc-100">Sandul Jayalath</span>
              </motion.h1>
              <motion.p
                variants={item}
                className="mt-5 max-w-xl text-base leading-relaxed text-[#A1A1AA] sm:text-lg"
              >
                {tagline}
              </motion.p>
            </div>

            <motion.div variants={item} className="flex flex-wrap gap-3">
              {social.map(({ href, label, Icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  {...(reduceMotion
                    ? {}
                    : {
                      whileHover: { scale: 1.03, y: -1 },
                      whileTap: { scale: 0.98 },
                    })}
                  transition={{ duration: 0.2, ease: easeOut }}
                  className="flex size-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-zinc-300 shadow-[0_8px_32px_rgba(0,0,0,0.35)] transition-colors hover:border-white/20 hover:text-white"
                >
                  <Icon className="size-5" />
                </motion.a>
              ))}
            </motion.div>

            <motion.div variants={item} className="flex flex-wrap gap-3">
              <motion.a
                href="#projects"
                {...(reduceMotion
                  ? {}
                  : { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 } })}
                transition={{ duration: 0.2, ease: easeOut }}
                className="inline-flex items-center justify-center rounded-2xl bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_32px_rgba(99,102,241,0.35)] transition-colors hover:bg-indigo-400"
              >
                View Work
              </motion.a>
              <motion.a
                href="#contact"
                {...(reduceMotion
                  ? {}
                  : { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 } })}
                transition={{ duration: 0.2, ease: easeOut }}
                className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-transparent px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/[0.04]"
              >
                Contact
              </motion.a>
            </motion.div>
          </motion.div>

          <div
            className="relative hidden min-h-[280px] md:block md:min-h-[340px]"
            aria-hidden
          />
        </div>

        <motion.div
          initial={false}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{
            delay: ready ? (reduceMotion ? 0.2 : 0.95) : 0,
            duration: 0.55,
            ease: easeOut,
          }}
          className="pointer-events-none absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-zinc-500">
            Scroll
          </span>
          <div className="relative flex h-9 w-5 justify-center rounded-full border border-white/20">
            {reduceMotion ? (
              <span className="mt-2 block size-1 rounded-full bg-indigo-400" />
            ) : (
              <motion.span
                className="mt-2 block size-1 rounded-full bg-indigo-400"
                animate={{ y: [0, 10, 0], opacity: [1, 0.35, 1] }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
