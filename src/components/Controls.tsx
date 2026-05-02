import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, RotateCcw, Shuffle, Pause } from "lucide-react";
import { ReactNode } from "react";

interface Props {
  arrayInput: string;
  onArrayChange: (v: string) => void;
  target?: string;
  onTargetChange?: (v: string) => void;
  onStart: () => void;
  onReset: () => void;
  onRandom: () => void;
  speed: number;
  onSpeedChange: (n: number) => void;
  samples?: { label: string; value: string }[];
  onSample?: (v: string) => void;
  running?: boolean;
  onPause?: () => void;
  extra?: ReactNode;
}

const Controls = ({
  arrayInput, onArrayChange, target, onTargetChange,
  onStart, onReset, onRandom, speed, onSpeedChange,
  samples, onSample, running, onPause, extra,
}: Props) => {
  return (
    <div className="glass rounded-2xl p-5 md:p-6 space-y-5 shadow-soft">
      <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
        <div className="space-y-2">
          <Label htmlFor="arr" className="text-xs uppercase tracking-wider text-muted-foreground">Array (space or comma separated)</Label>
          <Input
            id="arr"
            value={arrayInput}
            onChange={(e) => onArrayChange(e.target.value)}
            placeholder="1 2 3 4 6 7 9"
            className="font-mono bg-input/60"
          />
        </div>
        {onTargetChange && (
          <div className="space-y-2 md:w-40">
            <Label htmlFor="t" className="text-xs uppercase tracking-wider text-muted-foreground">Target</Label>
            <Input id="t" value={target} onChange={(e) => onTargetChange(e.target.value)} placeholder="6" className="font-mono bg-input/60" />
          </div>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Animation speed</Label>
            <span className="text-xs font-mono text-muted-foreground">{speed}×</span>
          </div>
          <Slider min={0.5} max={4} step={0.5} value={[speed]} onValueChange={(v) => onSpeedChange(v[0])} />
        </div>
        {samples && onSample && (
          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Sample arrays</Label>
            <Select onValueChange={onSample}>
              <SelectTrigger className="bg-input/60"><SelectValue placeholder="Choose a sample" /></SelectTrigger>
              <SelectContent>
                {samples.map((s) => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {extra}

      <div className="flex flex-wrap gap-2 pt-1">
        {running && onPause ? (
          <Button onClick={onPause} variant="hero" size="lg" className="gap-2"><Pause className="h-4 w-4" /> Pause</Button>
        ) : (
          <Button onClick={onStart} variant="hero" size="lg" className="gap-2"><Play className="h-4 w-4" /> Start</Button>
        )}
        <Button onClick={onReset} variant="outline" size="lg" className="gap-2"><RotateCcw className="h-4 w-4" /> Reset</Button>
        <Button onClick={onRandom} variant="glow" size="lg" className="gap-2"><Shuffle className="h-4 w-4" /> Random</Button>
      </div>
    </div>
  );
};

export default Controls;
