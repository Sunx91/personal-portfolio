/** Shared easing and Framer Motion presets for consistent load / scroll reveals */

export const easeOut = [0.22, 1, 0.36, 1] as const;

export const sectionTransition = {
  duration: 0.6,
  ease: easeOut,
} as const;

export const fadeUpTransition = {
  duration: 0.55,
  ease: easeOut,
} as const;

export const staggerFast = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
} as const;

export const staggerMedium = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
  },
} as const;

export const fadeUpItem = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: fadeUpTransition,
  },
} as const;

export const fadeUpItemSmall = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: easeOut },
  },
} as const;

export const viewportOnce = {
  once: true,
  margin: "-80px",
} as const;

export const viewportOnceTight = {
  once: true,
  margin: "-40px",
} as const;
