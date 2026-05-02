import { motion } from "framer-motion";
import type { SortFrame } from "@/lib/algorithms";

const SortVisualizer = ({ frame }: { frame: SortFrame }) => {
  const { array, comparing = [], swapping = [], pivot, sorted = [], currentMin, key, group = [], message } = frame;
  const max = Math.max(...array, 1);

  const colorFor = (i: number) => {
    if (sorted.includes(i)) return "hsl(var(--viz-sorted))";
    if (pivot === i) return "hsl(var(--viz-pivot))";
    if (swapping.includes(i)) return "hsl(var(--primary))";
    if (currentMin === i) return "hsl(var(--accent))";
    if (key === i) return "hsl(var(--viz-pivot))";
    if (comparing.includes(i)) return "hsl(var(--viz-compare))";
    return "hsl(var(--viz-default))";
  };

  const inGroup = (i: number) => group.find(([a, b]) => i >= a && i <= b);

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-6 md:p-8 overflow-x-auto scrollbar-thin">
        <div className="flex gap-1.5 md:gap-2 items-end justify-center min-h-[280px] relative">
          {array.map((v, i) => {
            const g = inGroup(i);
            const height = (v / max) * 240 + 30;
            return (
              <motion.div
                key={i}
                layout
                transition={{ type: "spring", stiffness: 280, damping: 26 }}
                className="flex flex-col items-center gap-1 relative"
              >
                {g && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 h-1 w-full bg-accent/40 rounded" />
                )}
                <motion.div
                  animate={{ backgroundColor: colorFor(i), height }}
                  transition={{ duration: 0.35 }}
                  className="w-7 md:w-10 rounded-t-md border border-border/40 shadow-soft grid place-items-end pb-1.5"
                >
                  <span className="text-[10px] md:text-xs font-mono font-semibold text-foreground">{v}</span>
                </motion.div>
                <span className="text-[10px] font-mono text-muted-foreground">{i}</span>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="glass rounded-xl px-5 py-4 flex items-center gap-3">
        <span className="h-2 w-2 rounded-full bg-accent animate-pulse shrink-0" />
        <p className="text-sm md:text-base">{message}</p>
      </div>
    </div>
  );
};

export default SortVisualizer;
