import { useEffect, useRef, useState } from "react";

export function useFramePlayer<T>(frames: T[], speed: number) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (frames.length === 0 && playing) setPlaying(false);
    if (frames.length > 0 && index > frames.length - 1) setIndex(0);
  }, [frames.length, index, playing]);

  useEffect(() => {
    if (!playing) return;
    if (index >= frames.length - 1) { setPlaying(false); return; }
    const delay = 800 / speed;
    timer.current = window.setTimeout(() => setIndex((i) => i + 1), delay);
    return () => { if (timer.current) window.clearTimeout(timer.current); };
  }, [playing, index, frames.length, speed]);

  const play = () => { if (frames.length === 0) return; if (index >= frames.length - 1) setIndex(0); setPlaying(true); };
  const pause = () => setPlaying(false);
  const reset = () => { setPlaying(false); setIndex(0); };

  return { index, frame: frames[index], playing, play, pause, reset, setIndex };
}
