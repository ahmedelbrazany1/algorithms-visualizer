import { Clock, Database, Activity, GitCompare, ArrowLeftRight } from "lucide-react";

interface Item { label: string; value: string | number; }
interface Props {
  steps: number;
  comparisons?: number;
  swaps?: number;
  complexity: { best: string; average: string; worst: string; space: string };
}

const Pill = ({ icon: Icon, label, value }: { icon: any; label: string; value: string | number }) => (
  <div className="glass rounded-xl p-4 flex items-center gap-3">
    <div className="h-10 w-10 rounded-lg bg-gradient-primary/20 border border-primary/30 grid place-items-center text-primary">
      <Icon className="h-5 w-5" />
    </div>
    <div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="font-display text-lg font-semibold">{value}</div>
    </div>
  </div>
);

const StatsPanel = ({ steps, comparisons, swaps, complexity }: Props) => {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <Pill icon={Activity} label="Steps" value={steps} />
        {comparisons !== undefined && <Pill icon={GitCompare} label="Comparisons" value={comparisons} />}
        {swaps !== undefined && <Pill icon={ArrowLeftRight} label="Swaps/Moves" value={swaps} />}
      </div>
      <div className="glass rounded-2xl p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
          <Clock className="h-4 w-4" /> Complexity
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          {[
            { k: "Best", v: complexity.best, color: "text-success" },
            { k: "Average", v: complexity.average, color: "text-accent" },
            { k: "Worst", v: complexity.worst, color: "text-warning" },
            { k: "Space", v: complexity.space, color: "text-primary-glow" },
          ].map((c) => (
            <div key={c.k} className="rounded-lg border border-border/60 p-3 bg-secondary/30">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{c.k}</div>
              <div className={`font-mono font-semibold mt-1 ${c.color}`}>{c.v}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
          <Database className="h-3.5 w-3.5" /> Time / Space classes shown in Big-O notation.
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;
