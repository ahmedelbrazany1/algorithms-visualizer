import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Code2, Play, RotateCcw } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  code: string;
  /** Returns an array of step explanations (and optional final result string at the end). */
  runner: () => string[];
}

const CodeMode = ({ code, runner }: Props) => {
  const [steps, setSteps] = useState<string[]>([]);
  const [running, setRunning] = useState(false);

  const start = async () => {
    setRunning(true);
    setSteps([]);
    const all = runner();
    for (let i = 0; i < all.length; i++) {
      await new Promise((r) => setTimeout(r, 600));
      setSteps((s) => [...s, all[i]]);
    }
    setRunning(false);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="glow" className="gap-2">
          <Code2 className="h-4 w-4" /> Code Mode
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-2xl bg-background border-l border-border p-0 flex flex-col">
        <SheetHeader className="p-6 border-b border-border bg-gradient-card">
          <SheetTitle className="font-display flex items-center gap-2">
            <Code2 className="h-5 w-5 text-primary" /> Code Mode
          </SheetTitle>
        </SheetHeader>

        <div className="p-6 space-y-4 overflow-y-auto scrollbar-thin flex-1">
          <div className="rounded-lg border border-border overflow-hidden shadow-soft">
            <div className="flex items-center gap-2 px-4 py-2 bg-secondary/60 border-b border-border">
              <span className="h-3 w-3 rounded-full bg-destructive/80" />
              <span className="h-3 w-3 rounded-full bg-warning/80" />
              <span className="h-3 w-3 rounded-full bg-success/80" />
              <span className="ml-3 text-xs text-muted-foreground font-mono">algorithm.js</span>
            </div>
            <pre className="p-4 text-sm font-mono leading-relaxed bg-card overflow-x-auto scrollbar-thin">
              <code>{code}</code>
            </pre>
          </div>

          <div className="flex gap-2">
            <Button onClick={start} disabled={running} variant="hero" className="gap-2">
              <Play className="h-4 w-4" /> {running ? "Running..." : "Start"}
            </Button>
            <Button onClick={() => setSteps([])} variant="outline" className="gap-2">
              <RotateCcw className="h-4 w-4" /> Reset
            </Button>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Execution steps</h3>
            <div className="space-y-2 min-h-[100px]">
              <AnimatePresence initial={false}>
                {steps.map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="glass rounded-md p-3 text-sm flex gap-3"
                  >
                    <span className="font-mono text-xs text-primary mt-0.5">#{i + 1}</span>
                    <span>{s}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
              {steps.length === 0 && !running && (
                <p className="text-sm text-muted-foreground italic">Press Start to walk through the code.</p>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CodeMode;
