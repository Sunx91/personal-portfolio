"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import {
  fadeUpItem,
  sectionTransition,
  staggerFast,
  viewportOnce,
} from "@/lib/motion";

type ProjectKind = "fullstack" | "frontend" | "backend";

type FilterId = "all" | ProjectKind;

const FILTERS: { id: FilterId; label: string }[] = [
  { id: "all", label: "All Projects" },
  { id: "fullstack", label: "Full Stack" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
];

const TAG_LABEL: Record<ProjectKind, string> = {
  fullstack: "FULL-STACK",
  frontend: "FRONTEND",
  backend: "BACKEND",
};

type RepoLink = { label: string; href: string };

type Project = {
  id: string;
  title: string;
  description: string;
  year: string;
  kind: ProjectKind;
  tech: string[];
  /** Shown on image placeholder until you add a screenshot */
  coverMonogram: string;
  /** Optional: e.g. `/projects/devgrade_view.png` (file in `public/projects/`) */
  coverImage?: string;
  /** Optional link overlaid on the cover (e.g. SDGP page when iframe embedding is blocked). */
  coverOverlayLink?: { href: string; label: string };
  /** Empty = no public code link on the card */
  githubRepos: RepoLink[];
  /** null = no deployed demo */
  liveDemo: string | null;
};

/**
 * SafePaws uses two repositories (e.g. API + mobile). Set these to your real URLs.
 * X-Fiesta is live-only here — set the deployed site URL.
 */
const SAFEPAWS_REPOS: RepoLink[] = [
  { label: "Backend", href: "https://github.com/Sunx91/safe-paws-backend" },
  { label: "Mobile", href: "https://github.com/Sunx91/safe-paws-frontend" },
];

const SAFEPAWS_LIVE = "https://safepaws.site";
const SAFEPAWS_SDGP_SHOWCASE =
  "https://www.sdgp.lk/project/391cbd2b-c7db-4f90-b921-87d6d0d41514";
const XFIESTA_LIVE = "https://x-fiesta-26.vercel.app/";

const PROJECTS: Project[] = [
  {
    id: "devgrade",
    title: "DevGrade",
    description: "AI GitHub analyzer",
    year: "2026",
    kind: "fullstack",
    tech: ["Next.js", "OpenAI API", "GitHub API"],
    coverMonogram: "DG",
    coverImage: "/projects/devgrade_view.png",
    githubRepos: [{ label: "Repository", href: "https://github.com/Sunx91/DevGrade" }],
    liveDemo: null,
  },
  {
    id: "safepaws",
    title: "SafePaws",
    description: "SOS animal rescue platform",
    year: "2025/26",
    kind: "fullstack",
    tech: ["FastAPI", "React Native", "MongoDB"],
    coverMonogram: "SP",
    coverImage: "/projects/safepaws-sdgp-view.png",
    coverOverlayLink: {
      href: SAFEPAWS_SDGP_SHOWCASE,
      label: "SDGP showcase",
    },
    githubRepos: SAFEPAWS_REPOS,
    liveDemo: SAFEPAWS_LIVE,
  },
  {
    id: "desertmind",
    title: "DesertMind",
    description: "RAG chatbot system",
    year: "2026",
    kind: "backend",
    tech: ["React", "Flask", "LangChain", "ChromaDB"],
    coverMonogram: "DM",
    githubRepos: [{ label: "Repository", href: "https://github.com/Sunx91/DesertMind" }],
    liveDemo: null,
  },
  {
    id: "xfiesta",
    title: "X-Fiesta 26",
    description: "Event web app",
    year: "2026",
    kind: "frontend",
    tech: ["React", "Vite", "JavaScript"],
    coverMonogram: "XF",
    coverImage: "/projects/xfiesta-view.png",
    githubRepos: [],
    liveDemo: XFIESTA_LIVE,
  },
];

const COVER_GRADIENT: Record<ProjectKind, string> = {
  fullstack:
    "from-indigo-950/90 via-violet-950/70 to-zinc-950",
  frontend:
    "from-violet-950/85 via-fuchsia-950/60 to-zinc-950",
  backend:
    "from-slate-900 via-indigo-950/80 to-zinc-950",
};

const sectionEase = [0.22, 1, 0.36, 1] as const;

const filterButtonMotion = {
  hidden: { opacity: 0, scale: 0.92 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: sectionEase },
  },
} as const;

const MAX_VISIBLE_TECH = 3;

function ProjectCoverPlaceholder({
  kind,
  monogram,
}: {
  kind: ProjectKind;
  monogram: string;
}) {
  const grad = COVER_GRADIENT[kind];
  return (
    <div
      className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden"
      aria-hidden
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${grad}`}
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:24px_24px] opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
      <div className="relative flex flex-col items-center justify-center gap-2 px-6 text-center">
        <span className="text-[clamp(2.5rem,12vw,3.75rem)] font-bold leading-none tracking-tight text-white/[0.12]">
          {monogram}
        </span>
        <span className="max-w-[14rem] text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500">
          Project preview
        </span>
      </div>
    </div>
  );
}

function ProjectCover({
  project,
}: {
  project: Project;
}) {
  const { coverImage, coverMonogram, coverOverlayLink, title, kind } = project;

  if (coverImage) {
    return (
      <div className="relative h-full w-full">
        <Image
          src={coverImage}
          alt={`${title} project preview`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {coverOverlayLink ? (
          <a
            href={coverOverlayLink.href}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-2 right-2 z-[1] rounded-md border border-zinc-600/80 bg-black/75 px-2 py-1 text-[10px] font-medium text-zinc-200 backdrop-blur-sm transition hover:border-indigo-500/50 hover:text-white"
          >
            {coverOverlayLink.label}
          </a>
        ) : null}
      </div>
    );
  }

  return (
    <ProjectCoverPlaceholder kind={kind} monogram={coverMonogram} />
  );
}

function ProjectLinks({
  githubRepos,
  liveDemo,
}: {
  githubRepos: RepoLink[];
  liveDemo: string | null;
}) {
  const hasGithub = githubRepos.length > 0;
  const hasLive = Boolean(liveDemo);

  if (!hasGithub && !hasLive) return null;

  const rowClass =
    hasGithub && hasLive
      ? "sm:justify-between"
      : hasLive
        ? "sm:justify-end"
        : "";

  return (
    <div
      className={`mt-auto flex flex-col gap-3 border-t border-[#27272a] pt-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4 sm:gap-y-2 ${rowClass}`}
    >
      {hasGithub ? (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          {githubRepos.map((repo) => (
            <a
              key={`${repo.label}-${repo.href}`}
              href={repo.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition hover:text-indigo-300"
            >
              <Github className="size-4 shrink-0" strokeWidth={1.75} />
              {githubRepos.length > 1 ? repo.label : "GitHub"}
            </a>
          ))}
        </div>
      ) : null}
      {hasLive && liveDemo ? (
        <a
          href={liveDemo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition hover:text-indigo-300"
        >
          <ExternalLink className="size-4 shrink-0" strokeWidth={1.75} />
          Live demo
        </a>
      ) : null}
    </div>
  );
}

function TechRow({ tech }: { tech: string[] }) {
  const visible = tech.slice(0, MAX_VISIBLE_TECH);
  const more = tech.length - visible.length;
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {visible.map((t) => (
        <span
          key={t}
          className="rounded-md border border-zinc-700 px-2 py-1 text-xs font-medium text-zinc-300"
        >
          {t}
        </span>
      ))}
      {more > 0 ? (
        <span className="text-xs font-medium text-[#a1a1aa]">
          +{more} more
        </span>
      ) : null}
    </div>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<FilterId>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return PROJECTS;
    return PROJECTS.filter((p) => p.kind === filter);
  }, [filter]);

  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={sectionTransition}
      className="scroll-mt-24 bg-black px-4 py-20 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="max-w-2xl"
          variants={staggerFast}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <motion.h2
            variants={fadeUpItem}
            className="text-2xl font-semibold tracking-tight text-white sm:text-3xl"
          >
            Featured Projects
          </motion.h2>
          <motion.p
            variants={fadeUpItem}
            className="mt-4 text-base leading-relaxed text-[#a1a1aa] sm:text-lg"
          >
            A selection of projects across full-stack, frontend, and backend
            development.
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-10 flex flex-wrap gap-2"
          variants={staggerFast}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {FILTERS.map(({ id, label }) => {
            const active = filter === id;
            return (
              <motion.button
                key={id}
                type="button"
                variants={filterButtonMotion}
                onClick={() => setFilter(id)}
                className={`rounded-md border px-3.5 py-2 text-sm font-medium transition-colors duration-200 ${
                  active
                    ? "border-white bg-white text-black"
                    : "border-zinc-700 bg-transparent text-white hover:border-zinc-600 hover:bg-zinc-900"
                }`}
              >
                {label}
              </motion.button>
            );
          })}
        </motion.div>

        <motion.div
          layout
          className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.article
                key={p.id}
                layout
                initial={{ opacity: 0, y: 24, filter: "blur(5px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 14, scale: 0.97, filter: "blur(4px)" }}
                transition={{
                  duration: 0.34,
                  delay: i * 0.055,
                  ease: sectionEase,
                  layout: { duration: 0.25 },
                }}
                whileHover={{ scale: 1.02 }}
                className="group flex flex-col overflow-hidden rounded-lg border border-[#27272a] bg-transparent transition-[border-color,box-shadow] duration-200 hover:border-indigo-500/35 hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
              >
                <div
                  className="relative aspect-video w-full overflow-hidden rounded-t-lg bg-zinc-950"
                  aria-label={`${p.title} cover preview`}
                >
                  <motion.div
                    className="absolute inset-0 h-full w-full overflow-hidden"
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.45, ease: sectionEase }}
                  >
                    <ProjectCover project={p} />
                  </motion.div>
                  <div
                    className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/55 via-transparent to-black/20"
                    aria-hidden
                  />
                  <span className="absolute right-3 top-3 z-[2] rounded-full border border-zinc-700 bg-black/50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-zinc-300 backdrop-blur-sm">
                    {TAG_LABEL[p.kind]}
                  </span>
                </div>

                <div className="flex flex-1 flex-col gap-3 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="font-bold text-white">{p.title}</h3>
                      <p className="mt-0.5 text-xs text-[#a1a1aa]">{p.year}</p>
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed text-[#a1a1aa]">
                    {p.description}
                  </p>

                  <TechRow tech={p.tech} />

                  <ProjectLinks
                    githubRepos={p.githubRepos}
                    liveDemo={p.liveDemo}
                  />
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.section>
  );
}
