import { describe, expect, it } from "vitest";
import { linearSearch } from "@/lib/algorithms";
import { getDisplayedStep } from "@/lib/stepCounter";

describe("step counter display logic", () => {
  it("starts from 0", () => {
    expect(getDisplayedStep(0, 7)).toBe(0);
  });

  it("does not increment on terminal frame", () => {
    expect(getDisplayedStep(6, 7)).toBe(5);
  });

  it("matches expected linear-search sample", () => {
    const frames = linearSearch([1, 2, 3, 4, 6, 7, 9], 6);
    const terminalIndex = frames.length - 1;
    const shown = getDisplayedStep(terminalIndex, frames.length);
    expect(shown).toBe(5);
  });
});
