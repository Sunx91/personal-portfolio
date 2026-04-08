"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { easeOut } from "@/lib/motion";

const SiteReadyContext = createContext(false);

/** True after the entrance loader has finished (always true with reduced motion). */
export function useSiteReady() {
  return useContext(SiteReadyContext);
}

const MIN_DISPLAY_MS = 520;

type Props = { children: ReactNode };

export function SiteEntrance({ children }: Props) {
  const reduceMotion = useReducedMotion();
  const [ready, setReady] = useState(!!reduceMotion);
  const doneRef = useRef(false);

  useEffect(() => {
    if (reduceMotion) {
      setReady(true);
      return;
    }

    let cancelled = false;
    const t0 = performance.now();
    const timeoutIds: number[] = [];

    const complete = () => {
      if (cancelled || doneRef.current) return;
      doneRef.current = true;
      const elapsed = performance.now() - t0;
      const rest = Math.max(0, MIN_DISPLAY_MS - elapsed);
      timeoutIds.push(
        window.setTimeout(() => {
          if (!cancelled) setReady(true);
        }, rest),
      );
    };

    const run = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(complete);
      });
    };

    if (typeof document !== "undefined" && document.fonts?.ready) {
      void document.fonts.ready.then(run).catch(run);
    } else {
      run();
    }

    return () => {
      cancelled = true;
      timeoutIds.forEach((id) => window.clearTimeout(id));
    };
  }, [reduceMotion]);

  return (
    <SiteReadyContext.Provider value={ready}>
      <AnimatePresence>
        {!ready ? (
          <motion.div
            key="site-loader"
            role="status"
            aria-live="polite"
            aria-busy="true"
            aria-label="Loading site"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.42, ease: easeOut }}
          >
            <div className="flex flex-col items-center gap-8">
              <div className="relative size-[4.5rem]">
                <motion.div
                  className="absolute inset-0 rounded-full border border-white/[0.08]"
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: [0.4, 0.9, 0.4] }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-transparent border-t-indigo-400 border-r-indigo-500/40"
                  style={{ transformOrigin: "50% 50%" }}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 0.95,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <motion.div
                  className="absolute inset-[22%] rounded-full bg-indigo-500/20 blur-md"
                  animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.6, 0.35] }}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
              <div className="flex flex-col items-center gap-2">
                <p className="text-sm font-medium tracking-tight text-zinc-300">
                  Sandul<span className="text-indigo-400">.online</span>
                </p>
                <motion.div
                  className="h-0.5 w-24 overflow-hidden rounded-full bg-zinc-800"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15 }}
                >
                  <motion.div
                    className="h-full w-1/3 rounded-full bg-indigo-500"
                    animate={{ x: ["-100%", "280%"] }}
                    transition={{
                      duration: 1.1,
                      repeat: Infinity,
                      ease: easeOut,
                    }}
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      {children}
    </SiteReadyContext.Provider>
  );
}
