import { describe, expect, it } from "vitest";
import { linearSearch } from "@/lib/algorithms";
import { getDisplayedStep } from "@/lib/stepCounter";

describe("step counter logic", () => {
  it("returns 0 for invalid or empty state", () => {
    expect(getDisplayedStep(-1, 0)).toBe(0);
    expect(getDisplayedStep(0, 0)).toBe(0);
  });

  it("does not increment on the terminal frame", () => {
    expect(getDisplayedStep(6, 7)).toBe(5);
  });

  it("matches linear search example playback", () => {
    const frames = linearSearch([1, 2, 3, 4, 6, 7, 9], 6);
    const terminalIndex = frames.length - 1;
    expect(getDisplayedStep(terminalIndex, frames.length)).toBe(5);
  });
});

