import { useEffect, useMemo, useState } from "react";
import PageShell from "@/components/PageShell";
import Controls from "@/components/Controls";
import StatsPanel from "@/components/StatsPanel";
import SearchVisualizer from "@/components/SearchVisualizer";
import CodeMode from "@/components/CodeMode";
import Legend from "@/components/Legend";
import { useFramePlayer } from "@/hooks/useFramePlayer";
import { parseArray, isSorted, type SearchFrame } from "@/lib/algorithms";
import { toast } from "sonner";
import { AlertTriangle, BookOpen } from "lucide-react";

interface Props {
  title: string;
  description: string;
  howItWorks: string;
  defaultArray: string;
  defaultTarget: string;
  needsSorted?: boolean;
  note?: string;
  build: (arr: number[], target: number) => SearchFrame[];
  complexity: { best: string; average: string; worst: string; space: string };
  code: string;
  codeRunner: (arr: number[], target: number) => string[];
  back: string;
  legend: { color: string; label: string }[];
}

const SearchPage = ({
  title, description, howItWorks, defaultArray, defaultTarget,
  needsSorted, note, build, complexity, code, codeRunner, back, legend,
}: Props) => {
  const [arrayInput, setArrayInput] = useState(defaultArray);
  const [targetInput, setTargetInput] = useState(defaultTarget);
  const [speed, setSpeed] = useState(1.5);
  const [frames, setFrames] = useState<SearchFrame[]>([]);
  const player = useFramePlayer(frames, speed);

  const samples = [
    { label: "Sorted small", value: "1 3 5 7 9 11 13 15" },
    { label: "Sorted medium", value: "2 4 6 8 10 12 14 16 18 20 22" },
    { label: "Mixed", value: "23 5 17 9 42 8 11 6 30" },
    { label: "Single match", value: "10 20 30 40 50" },
  ];

  const handleStart = () => {
    let arr = parseArray(arrayInput);
    const t = Number(targetInput);
    if (arr.length === 0) return toast.error("Please enter at least one number.");
    if (Number.isNaN(t)) return toast.error("Target must be a number.");

    if (needsSorted && !isSorted(arr)) {
      arr = [...arr].sort((a, b) => a - b);
      setArrayInput(arr.join(" "));
      toast.warning("Array auto-sorted: this algorithm needs a sorted array.");
    }
    const f = build(arr, t);
    setFrames(f);
  };

  const handleReset = () => { setFrames([]); player.reset(); };
  const handleRandom = () => {
    const n = 8 + Math.floor(Math.random() * 5);
    const arr = Array.from({ length: n }, () => Math.floor(Math.random() * 90) + 1);
    if (needsSorted) arr.sort((a, b) => a - b);
    setArrayInput(arr.join(" "));
    setTargetInput(String(arr[Math.floor(Math.random() * arr.length)]));
  };

  const currentFrame = player.frame ?? { array: parseArray(arrayInput), message: "Press Start to run the algorithm." } as SearchFrame;
  const stepCount = currentFrame.step ?? 0;

  const runnerSteps = useMemo(() => () => {
    const arr = parseArray(arrayInput);
    let a = arr;
    if (needsSorted && !isSorted(arr)) a = [...arr].sort((x, y) => x - y);
    return codeRunner(a, Number(targetInput));
  }, [arrayInput, targetInput, needsSorted, codeRunner]);

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
            target={targetInput}
            onTargetChange={setTargetInput}
            onStart={handleStart}
            onReset={handleReset}
            onRandom={handleRandom}
            speed={speed}
            onSpeedChange={setSpeed}
            samples={samples}
            onSample={(v) => setArrayInput(v)}
          />
          {note && (
            <div className="glass rounded-xl p-4 flex gap-3 border-warning/40">
              <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">{note}</p>
            </div>
          )}
          <SearchVisualizer frame={currentFrame} />
          <Legend items={legend} />
          <div className="flex flex-wrap items-center gap-3">
            <CodeMode code={code} runner={runnerSteps} />
            <span className="text-xs text-muted-foreground">Open Code Mode to read and walk through the source code.</span>
          </div>
        </div>

        <aside className="space-y-6">
          <StatsPanel steps={stepCount} complexity={complexity} />
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

export default SearchPage;
