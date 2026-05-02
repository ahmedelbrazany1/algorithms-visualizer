import { motion, AnimatePresence } from "framer-motion";
import type { SearchFrame } from "@/lib/algorithms";
import { ArrowDown, CheckCircle2, XCircle } from "lucide-react";

const isDiscarded = (i: number, ranges?: [number, number][]) =>
  !!ranges?.some(([a, b]) => i >= Math.min(a, b) && i <= Math.max(a, b));

const SearchVisualizer = ({ frame }: { frame: SearchFrame }) => {
  const { array, active, low, high, mid, estimate, discarded, found, failed, message } = frame;

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-6 md:p-8 overflow-x-auto scrollbar-thin">
        <div className="flex gap-2 md:gap-3 items-end justify-center min-h-[140px]">
          {array.map((v, i) => {
            const inDiscarded = isDiscarded(i, discarded);
            const inRange = (low === undefined || i >= low) && (high === undefined || i <= high);
            const isActive = active === i;
            const isFound = found === i;
            const isMid = mid === i;
            const isEst = estimate === i;

            let bg = "hsl(var(--viz-default))";
            let ring = "";
            if (isFound) bg = "hsl(var(--viz-found))";
            else if (isActive) bg = "hsl(var(--viz-active))";
            else if (isMid) bg = "hsl(var(--viz-compare))";
            if (inDiscarded || (low !== undefined && high !== undefined && !inRange)) {
              bg = "hsl(var(--viz-discarded))";
            }
            if (isEst) ring = "ring-2 ring-accent";

            return (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <div className="h-6 text-[10px] font-mono text-muted-foreground">
                  {low === i && <span className="text-accent">L</span>}
                  {high === i && <span className="text-accent">{low === i ? "/H" : "H"}</span>}
                </div>
                <motion.div
                  layout
                  animate={{
                    backgroundColor: bg,
                    scale: isActive || isFound ? 1.12 : 1,
                    y: isActive ? -6 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 320, damping: 24 }}
                  className={`relative w-12 h-14 md:w-14 md:h-16 rounded-lg grid place-items-center font-mono font-semibold text-foreground border border-border/40 shadow-soft ${ring} ${
                    inDiscarded ? "opacity-40" : ""
                  }`}
                >
                  {v}
                  {isFound && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 bg-success rounded-full p-0.5"
                    >
                      <CheckCircle2 className="h-4 w-4 text-success-foreground" />
                    </motion.div>
                  )}
                  <AnimatePresence>
                    {(isActive || isMid || isEst) && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute -top-7"
                      >
                        <ArrowDown className={`h-5 w-5 ${isEst ? "text-accent" : isMid ? "text-warning" : "text-accent"}`} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
                <div className="text-[10px] font-mono text-muted-foreground">{i}</div>
                {isMid && <div className="text-[10px] font-bold text-warning -mt-1">MID</div>}
                {isEst && !isMid && <div className="text-[10px] font-bold text-accent -mt-1">EST</div>}
              </div>
            );
          })}
        </div>
      </div>

      <div className={`glass rounded-xl px-5 py-4 flex items-center gap-3 ${
        found !== undefined ? "border-success/60" : failed ? "border-destructive/60" : ""
      }`}>
        {found !== undefined ? <CheckCircle2 className="h-5 w-5 text-success shrink-0" /> :
          failed ? <XCircle className="h-5 w-5 text-destructive shrink-0" /> :
          <span className="h-2 w-2 rounded-full bg-accent animate-pulse shrink-0" />}
        <p className="text-sm md:text-base">{message}</p>
      </div>
    </div>
  );
};

export default SearchVisualizer;
