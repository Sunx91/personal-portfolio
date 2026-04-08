"use client";

import { motion } from "framer-motion";
import {
  Briefcase,
  Github,
  Linkedin,
  Mail,
  Send,
} from "lucide-react";
import { type FormEvent, useState } from "react";
import {
  easeOut,
  fadeUpItem,
  fadeUpItemSmall,
  sectionTransition,
  staggerMedium,
  viewportOnce,
  viewportOnceTight,
} from "@/lib/motion";

export function Contact() {
  const [sentHint, setSentHint] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();
    const subject = encodeURIComponent(
      name ? `Portfolio inquiry from ${name}` : "Portfolio inquiry",
    );
    const body = encodeURIComponent(
      [
        name && `Name: ${name}`,
        email && `Email: ${email}`,
        "",
        message || "(No message provided)",
      ]
        .filter(Boolean)
        .join("\n"),
    );
    window.location.href = `mailto:sunx.3295@gmail.com?subject=${subject}&body=${body}`;
    setSentHint(true);
    setTimeout(() => setSentHint(false), 4000);
  }

  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={sectionTransition}
      className="scroll-mt-24 bg-black px-4 pb-16 pt-20 sm:px-6 sm:pb-20 sm:pt-28"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-start">
          {/* Left */}
          <motion.div
            variants={staggerMedium}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnceTight}
          >
            <motion.h2
              variants={fadeUpItem}
              className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              Let&apos;s Collaborate
            </motion.h2>
            <motion.p
              variants={fadeUpItem}
              className="mt-6 max-w-lg text-base leading-relaxed text-[#a1a1aa] sm:text-lg"
            >
              Have a project in mind or interested in collaborating? Let me know
              what you&apos;re working on and I&apos;ll get back to you as soon as
              possible.
            </motion.p>

            <motion.div
              variants={fadeUpItem}
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-indigo-500/40 bg-indigo-500/10 px-4 py-2 text-sm font-medium text-indigo-200"
            >
              <Briefcase className="size-4 shrink-0" strokeWidth={1.75} />
              Open for internships
            </motion.div>

            <motion.div
              variants={fadeUpItem}
              className="mt-10 flex flex-col gap-3"
            >
              <a
                href="mailto:sunx.3295@gmail.com"
                className="flex items-center gap-4 rounded-lg border border-[#27272a] p-4 transition hover:border-zinc-600 hover:bg-zinc-900/40"
              >
                <div className="flex size-11 shrink-0 items-center justify-center rounded-md border border-[#27272a] bg-zinc-950">
                  <Mail className="size-5 text-white" strokeWidth={1.75} />
                </div>
                <div className="min-w-0 text-left">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#71717a]">
                    Email
                  </p>
                  <p className="mt-0.5 truncate text-sm font-medium text-white sm:text-base">
                    sunx.3295@gmail.com
                  </p>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/sunath-sandul"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-lg border border-[#27272a] p-4 transition hover:border-zinc-600 hover:bg-zinc-900/40"
              >
                <div className="flex size-11 shrink-0 items-center justify-center rounded-md border border-[#27272a] bg-zinc-950">
                  <Linkedin className="size-5 text-white" strokeWidth={1.75} />
                </div>
                <div className="min-w-0 text-left">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#71717a]">
                    LinkedIn
                  </p>
                  <p className="mt-0.5 truncate text-sm font-medium text-white sm:text-base">
                    linkedin.com/in/sunath-sandul
                  </p>
                </div>
              </a>
            </motion.div>

            <motion.p
              variants={fadeUpItem}
              className="mt-10 text-sm text-[#71717a]"
            >
              Response time: typically within 24 hours
            </motion.p>
          </motion.div>

          {/* Right: form */}
          <motion.div
            variants={staggerMedium}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnceTight}
            className="rounded-lg border border-[#27272a] bg-transparent p-6 sm:p-8"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <motion.div
                variants={fadeUpItemSmall}
                className="grid gap-6 sm:grid-cols-2"
              >
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="contact-name"
                    className="text-sm font-semibold text-white"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Your name"
                    className="rounded-md border border-[#27272a] bg-zinc-950/80 px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none transition focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="contact-email"
                    className="text-sm font-semibold text-white"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="your@email.com"
                    className="rounded-md border border-[#27272a] bg-zinc-950/80 px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none transition focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
              </motion.div>

              <motion.div variants={fadeUpItemSmall} className="flex flex-col gap-2">
                <label
                  htmlFor="contact-message"
                  className="text-sm font-semibold text-white"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me about your project..."
                  className="resize-y rounded-md border border-[#27272a] bg-zinc-950/80 px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none transition focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20"
                />
              </motion.div>

              {sentHint ? (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-indigo-300"
                >
                  Opening your email client… If nothing opens, email me directly
                  at sunx.3295@gmail.com
                </motion.p>
              ) : null}

              <motion.button
                variants={fadeUpItemSmall}
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-md border border-zinc-600 bg-transparent py-3.5 text-sm font-semibold text-white transition hover:border-zinc-500 hover:bg-zinc-900/50 focus-visible:border-indigo-500/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/25"
              >
                <Send className="size-4" strokeWidth={1.75} />
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Site footer */}
        <motion.footer
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnceTight}
          transition={{ duration: 0.55, ease: easeOut }}
          className="mt-20 flex flex-col items-center justify-between gap-6 border-t border-[#27272a] pt-10 sm:flex-row"
        >
          <p className="text-center text-sm text-[#71717a] sm:text-left">
            © {new Date().getFullYear()} Sunath Sandul Jayalath. All rights
            reserved.
          </p>
          <div className="flex items-center gap-5">
            <a
              href="https://github.com/Sunx91"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 transition hover:text-indigo-300"
              aria-label="GitHub"
            >
              <Github className="size-5" strokeWidth={1.5} />
            </a>
            <a
              href="https://www.linkedin.com/in/sunath-sandul"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 transition hover:text-indigo-300"
              aria-label="LinkedIn"
            >
              <Linkedin className="size-5" strokeWidth={1.5} />
            </a>
            <a
              href="mailto:sunx.3295@gmail.com"
              className="text-zinc-500 transition hover:text-indigo-300"
              aria-label="Email"
            >
              <Mail className="size-5" strokeWidth={1.5} />
            </a>
          </div>
        </motion.footer>
      </div>
    </motion.section>
  );
}
