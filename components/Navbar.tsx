"use client";

import { FileDown, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { easeOut } from "@/lib/motion";
import { useSiteReady } from "@/components/SiteEntrance";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
] as const;

const navBarStagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.06 },
  },
} as const;

const navBarItem = {
  hidden: { opacity: 0, y: -12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: easeOut },
  },
} as const;

export function Navbar() {
  const ready = useSiteReady();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <motion.header
      initial={false}
      animate={
        ready
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: -20 }
      }
      transition={{ duration: 0.55, ease: easeOut }}
      className="pointer-events-none fixed left-0 right-0 top-0 z-50 flex justify-center px-3 pt-4 sm:px-4 sm:pt-5"
    >
      <div className="pointer-events-auto relative w-full max-w-4xl">
      <motion.nav
        aria-label="Primary"
        variants={navBarStagger}
        initial="hidden"
        animate={ready ? "show" : "hidden"}
        className={`flex w-full items-center justify-between gap-2 rounded-full border border-[#27272a] px-3 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl transition-colors duration-300 sm:gap-4 sm:px-5 sm:py-2.5 ${
          scrolled ? "bg-zinc-950/85" : "bg-zinc-950/65"
        }`}
      >
        <motion.a
          variants={navBarItem}
          href="https://sandul.online"
          className="shrink-0 pl-1 text-base font-bold tracking-tight text-white sm:text-lg"
          aria-label="sandul.online home"
        >
          Sandul<span className="text-indigo-400">.online</span>
        </motion.a>

        <motion.div
          variants={navBarItem}
          className="hidden flex-1 items-center justify-center gap-7 md:flex"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-[#a1a1aa] transition-colors hover:text-indigo-300"
            >
              {l.label}
            </a>
          ))}
        </motion.div>

        <motion.div
          variants={navBarItem}
          className="flex shrink-0 items-center gap-2 sm:gap-3"
        >
          <a
            href="/Sunath_Sandul_CV.pdf"
            download
            className="hidden items-center gap-2 rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-[0_0_24px_rgba(99,102,241,0.25)] transition hover:bg-indigo-400 sm:inline-flex"
          >
            <FileDown className="size-4 shrink-0" aria-hidden />
            Resume
          </a>

          <button
            type="button"
            className="flex size-9 items-center justify-center rounded-full border border-[#27272a] text-zinc-300 transition hover:border-zinc-600 hover:bg-zinc-900/80 hover:text-white md:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? (
              <X className="size-5" strokeWidth={1.75} />
            ) : (
              <Menu className="size-5" strokeWidth={1.75} />
            )}
          </button>
        </motion.div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-40 rounded-2xl border border-[#27272a] bg-zinc-950/95 p-4 shadow-[0_24px_64px_rgba(0,0,0,0.55)] backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-[#a1a1aa] transition hover:bg-zinc-900 hover:text-indigo-300"
                  onClick={() => setMobileOpen(false)}
                >
                  {l.label}
                </a>
              ))}
              <a
                href="/Sunath_Sandul_CV.pdf"
                download
                className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-indigo-500 py-2.5 text-sm font-semibold text-white hover:bg-indigo-400"
                onClick={() => setMobileOpen(false)}
              >
                <FileDown className="size-4 shrink-0" aria-hidden />
                Resume
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      </div>
    </motion.header>
  );
}
