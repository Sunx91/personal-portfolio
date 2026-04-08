export default function Loading() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-black text-white">
      <div
        className="flex flex-col items-center gap-6"
        role="status"
        aria-live="polite"
        aria-label="Loading"
      >
        <div className="relative size-12">
          <div className="absolute inset-0 rounded-full border border-white/10" />
          <div
            className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-indigo-400 border-r-indigo-500/50"
            style={{
              animationDuration: "0.9s",
            }}
          />
        </div>
        <div className="h-0.5 w-20 overflow-hidden rounded-full bg-zinc-800">
          <div
            className="h-full w-1/3 animate-pulse rounded-full bg-indigo-500"
            style={{
              animation: "loader-bar 1.1s cubic-bezier(0.22, 1, 0.36, 1) infinite",
            }}
          />
        </div>
        <style>{`
          @keyframes loader-bar {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(280%); }
          }
        `}</style>
      </div>
    </div>
  );
}
