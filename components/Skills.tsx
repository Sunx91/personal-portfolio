"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  BrainCircuit,
  Code2,
  LayoutTemplate,
  Server,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  fadeUpItem,
  sectionTransition,
  staggerFast,
  viewportOnce,
} from "@/lib/motion";

type Category =
  | "Programming"
  | "Frontend"
  | "Backend"
  | "AI & Data"
  | "Networking & Security"
  | "Tools";

type FilterId = "All" | Category;

const FILTERS: FilterId[] = [
  "All",
  "Programming",
  "Frontend",
  "Backend",
  "AI & Data",
  "Networking & Security",
  "Tools",
];

const SKILLS: { name: string; category: Category }[] = [
  { name: "Java", category: "Programming" },
  { name: "Python", category: "Programming" },
  { name: "JavaScript", category: "Programming" },
  { name: "SQL", category: "Programming" },
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "FastAPI", category: "Backend" },
  { name: "REST APIs", category: "Backend" },
  { name: "JSON", category: "Backend" },
  { name: "Server-side development", category: "Backend" },
  { name: "LangChain", category: "AI & Data" },
  { name: "Scikit-learn", category: "AI & Data" },
  { name: "Pandas", category: "AI & Data" },
  { name: "Data Visualization", category: "AI & Data" },
  { name: "Networking fundamentals", category: "Networking & Security" },
  { name: "Cybersecurity principles", category: "Networking & Security" },
  { name: "Basic security practices", category: "Networking & Security" },
  { name: "Git", category: "Tools" },
  { name: "GitHub", category: "Tools" },
  { name: "GitHub API", category: "Tools" },
  { name: "Vercel", category: "Tools" },
  { name: "Firebase", category: "Tools" },
  { name: "AI-driven workflows", category: "Tools" },
];

const CATEGORIES: Category[] = [
  "Programming",
  "Frontend",
  "Backend",
  "AI & Data",
  "Networking & Security",
  "Tools",
];

const CATEGORY_META: Record<
  Category,
  { blurb: string; Icon: typeof Code2 }
> = {
  Programming: {
    blurb: "Languages & query",
    Icon: Code2,
  },
  Frontend: {
    blurb: "UI & web stack",
    Icon: LayoutTemplate,
  },
  Backend: {
    blurb: "APIs & services",
    Icon: Server,
  },
  "AI & Data": {
    blurb: "ML, agents & data",
    Icon: BrainCircuit,
  },
  "Networking & Security": {
    blurb: "Foundations & posture",
    Icon: ShieldCheck,
  },
  Tools: {
    blurb: "Delivery & platforms",
    Icon: Wrench,
  },
};

const sectionEase = [0.22, 1, 0.36, 1] as const;

const filterButtonMotion = {
  hidden: { opacity: 0, scale: 0.94 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.32, ease: sectionEase },
  },
} as const;

function groupByCategory(
  items: typeof SKILLS,
): Record<Category, typeof SKILLS> {
  const empty = CATEGORIES.reduce(
    (acc, c) => {
      acc[c] = [];
      return acc;
    },
    {} as Record<Category, typeof SKILLS>,
  );
  for (const s of items) {
    empty[s.category].push(s);
  }
  return empty;
}

export function Skills() {
  const [filter, setFilter] = useState<FilterId>("All");

  const filtered = useMemo(() => {
    if (filter === "All") return SKILLS;
    return SKILLS.filter((s) => s.category === filter);
  }, [filter]);

  const grouped = useMemo(() => groupByCategory(SKILLS), []);

  const totalSkills = SKILLS.length;
  const categoryCount = CATEGORIES.length;

  return (
    <motion.section
      id="skills"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={sectionTransition}
      className="scroll-mt-24 overflow-hidden bg-black px-4 py-20 sm:px-6 sm:py-28"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/35 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-32 top-1/4 h-80 w-80 rounded-full bg-indigo-600/10 blur-[100px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 bottom-1/4 h-64 w-64 rounded-full bg-violet-600/8 blur-[90px]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <motion.div
            className="max-w-2xl"
            variants={staggerFast}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
          >
            <motion.div variants={fadeUpItem} className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-200/90">
                <Sparkles className="size-3.5 text-indigo-400" aria-hidden />
                Stack
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUpItem}
              className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl"
            >
              Skills &{" "}
              <span className="bg-gradient-to-r from-indigo-200 to-violet-300 bg-clip-text text-transparent">
                tools
              </span>
            </motion.h2>
            <motion.p
              variants={fadeUpItem}
              className="mt-4 text-base leading-relaxed text-zinc-400 sm:text-lg"
            >
              Technologies I use to ship backends, experiments, and secure
              systems—organized by domain so you can scan what matters.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerFast}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="flex shrink-0 flex-wrap gap-3 sm:justify-end"
          >
            <motion.div
              variants={fadeUpItem}
              className="rounded-2xl border border-zinc-800/90 bg-zinc-950/60 px-5 py-4 backdrop-blur-sm"
            >
              <p className="text-2xl font-bold tabular-nums text-white">
                {totalSkills}
              </p>
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                Technologies
              </p>
            </motion.div>
            <motion.div
              variants={fadeUpItem}
              className="rounded-2xl border border-zinc-800/90 bg-zinc-950/60 px-5 py-4 backdrop-blur-sm"
            >
              <p className="text-2xl font-bold tabular-nums text-indigo-200">
                {categoryCount}
              </p>
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                Domains
              </p>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="mt-12 flex flex-wrap gap-2"
          variants={staggerFast}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          role="tablist"
          aria-label="Filter skills by category"
        >
          {FILTERS.map((id) => {
            const active = filter === id;
            return (
              <motion.button
                key={id}
                type="button"
                role="tab"
                aria-selected={active}
                variants={filterButtonMotion}
                onClick={() => setFilter(id)}
                className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                  active
                    ? "bg-white text-black shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_8px_30px_rgba(99,102,241,0.2)]"
                    : "border border-zinc-700/90 bg-zinc-950/50 text-zinc-300 backdrop-blur-sm hover:border-indigo-500/35 hover:text-white"
                }`}
              >
                {id === "All" ? "Overview" : id}
              </motion.button>
            );
          })}
        </motion.div>

        <div className="mt-10">
          <AnimatePresence mode="wait">
            {filter === "All" ? (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: sectionEase }}
                className="grid gap-5 sm:gap-6 md:grid-cols-2"
              >
                {CATEGORIES.map((cat, ci) => {
                  const list = grouped[cat];
                  const { blurb, Icon } = CATEGORY_META[cat];
                  return (
                    <motion.article
                      key={cat}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{
                        duration: 0.45,
                        delay: ci * 0.05,
                        ease: sectionEase,
                      }}
                      className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-800/80 bg-gradient-to-b from-zinc-900/40 via-zinc-950/50 to-black/60 p-5 shadow-[0_24px_60px_rgba(0,0,0,0.35)] backdrop-blur-md sm:p-6"
                    >
                      <div
                        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-500/[0.07] via-transparent to-violet-600/[0.04] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        aria-hidden
                      />
                      <div className="relative flex items-start justify-between gap-4 border-b border-zinc-800/80 pb-4">
                        <div className="flex min-w-0 items-start gap-3">
                          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-indigo-500/25 bg-indigo-500/10 text-indigo-300">
                            <Icon className="size-5" strokeWidth={1.75} />
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-semibold leading-snug text-white">
                              {cat}
                            </h3>
                            <p className="mt-0.5 text-xs text-zinc-500">
                              {blurb}
                            </p>
                          </div>
                        </div>
                        <span className="shrink-0 rounded-md bg-zinc-900/80 px-2 py-1 text-xs font-medium tabular-nums text-zinc-400">
                          {list.length}
                        </span>
                      </div>
                      <ul className="relative mt-4 flex flex-wrap gap-2">
                        {list.map((s) => (
                          <li key={s.name}>
                            <span className="inline-flex rounded-lg border border-zinc-800/90 bg-zinc-950/70 px-3 py-1.5 text-sm text-zinc-200 transition-colors duration-200 group-hover:border-zinc-700">
                              {s.name}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </motion.article>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                key={filter}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.32, ease: sectionEase }}
                className="rounded-2xl border border-zinc-800/80 bg-gradient-to-br from-zinc-900/35 via-zinc-950/40 to-black/50 p-6 backdrop-blur-md sm:p-8"
              >
                <div className="flex flex-col gap-4 border-b border-zinc-800/80 pb-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex size-12 items-center justify-center rounded-xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-200">
                      {(() => {
                        const { Icon } = CATEGORY_META[filter];
                        return <Icon className="size-6" strokeWidth={1.75} />;
                      })()}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white sm:text-2xl">
                        {filter}
                      </h3>
                      <p className="mt-0.5 text-sm text-zinc-500">
                        {CATEGORY_META[filter].blurb} · {filtered.length}{" "}
                        {filtered.length === 1 ? "item" : "items"}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFilter("All")}
                    className="self-start text-sm font-medium text-indigo-300 transition hover:text-indigo-200 sm:self-auto"
                  >
                    ← Back to overview
                  </button>
                </div>
                <motion.ul
                  layout
                  className="mt-6 flex flex-wrap gap-2"
                >
                  <AnimatePresence mode="popLayout">
                    {filtered.map((skill, i) => (
                      <motion.li
                        key={skill.name}
                        layout
                        initial={{ opacity: 0, scale: 0.92, y: 8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 4 }}
                        transition={{
                          duration: 0.28,
                          delay: i * 0.02,
                          ease: sectionEase,
                          layout: { duration: 0.22 },
                        }}
                      >
                        <span className="inline-flex rounded-xl border border-zinc-700/80 bg-zinc-950/80 px-4 py-2 text-sm font-medium text-zinc-100 shadow-sm transition hover:border-indigo-500/40 hover:bg-indigo-500/[0.07]">
                          {skill.name}
                        </span>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </motion.ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}
