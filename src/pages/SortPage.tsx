import { useEffect, useMemo, useState } from "react";
import PageShell from "@/components/PageShell";
import Controls from "@/components/Controls";
import StatsPanel from "@/components/StatsPanel";
import SortVisualizer from "@/components/SortVisualizer";
import CodeMode from "@/components/CodeMode";
import Legend from "@/components/Legend";
import { useFramePlayer } from "@/hooks/useFramePlayer";
import { parseArray, type SortFrame } from "@/lib/algorithms";
import { getDisplayedStep } from "@/lib/stepCounter";
import { toast } from "sonner";
import { BookOpen } from "lucide-react";

interface Props {
  title: string;
  description: string;
  howItWorks: string;
  defaultArray: string;
  build: (arr: number[]) => SortFrame[];
  complexity: { best: string; average: string; worst: string; space: string };
  code: string;
  codeRunner: (arr: number[]) => string[];
  back: string;
  legend: { color: string; label: string }[];
}

const SortPage = ({
  title, description, howItWorks, defaultArray, build, complexity, code, codeRunner, back, legend,
}: Props) => {
  const [arrayInput, setArrayInput] = useState(defaultArray);
  const [speed, setSpeed] = useState(1.5);
  const [frames, setFrames] = useState<SortFrame[]>([]);
  const player = useFramePlayer(frames, speed);

  const samples = [
    { label: "Random small", value: "5 2 8 1 9 3 7 4 6" },
    { label: "Already sorted", value: "1 2 3 4 5 6 7 8" },
    { label: "Reverse sorted", value: "9 8 7 6 5 4 3 2 1" },
    { label: "Duplicates", value: "4 2 4 1 3 2 5 1 3" },
  ];

  const handleStart = () => {
    const arr = parseArray(arrayInput);
    if (arr.length === 0) return toast.error("Please enter at least one number.");
    if (arr.length > 30) return toast.error("Please use 30 numbers or fewer for a clear visualization.");
    const f = build(arr);
    setFrames(f);
  };
  const handleReset = () => { setFrames([]); player.reset(); };
  const handleRandom = () => {
    const n = 8 + Math.floor(Math.random() * 6);
    const arr = Array.from({ length: n }, () => Math.floor(Math.random() * 95) + 5);
    setArrayInput(arr.join(" "));
  };

  const currentFrame: SortFrame = player.frame ?? {
    array: parseArray(arrayInput),
    message: "Press Start to run the algorithm.",
    comparisons: 0, swaps: 0,
  };
  const stepCount = player.frame ? getDisplayedStep(player.index, frames.length) : 0;

  const runnerSteps = useMemo(() => () => codeRunner(parseArray(arrayInput)), [arrayInput, codeRunner]);

  useEffect(() => {
    if (frames.length === 0) return;
    player.reset();
    player.play();
    // player callbacks close over the latest frames in this render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frames]);

  return (
    <PageShell title={title} subtitle={description} back={back}>
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <Controls
            arrayInput={arrayInput}
            onArrayChange={setArrayInput}
            onStart={handleStart}
            onReset={handleReset}
            onRandom={handleRandom}
            speed={speed}
            onSpeedChange={setSpeed}
            samples={samples}
            onSample={(v) => setArrayInput(v)}
          />
          <SortVisualizer frame={currentFrame} />
          <Legend items={legend} />
          <div className="flex flex-wrap items-center gap-3">
            <CodeMode code={code} runner={runnerSteps} />
            <span className="text-xs text-muted-foreground">Open Code Mode to read and walk through the source code.</span>
          </div>
        </div>

        <aside className="space-y-6">
          <StatsPanel
            steps={stepCount}
            comparisons={currentFrame.comparisons}
            swaps={currentFrame.swaps}
            complexity={complexity}
          />
          <div className="glass rounded-2xl p-5">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
              <BookOpen className="h-4 w-4" /> How it works
            </h3>
            <p className="text-sm leading-relaxed text-foreground/90 whitespace-pre-line">{howItWorks}</p>
          </div>
        </aside>
      </div>
    </PageShell>
  );
};

export default SortPage;
