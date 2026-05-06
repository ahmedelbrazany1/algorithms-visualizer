import { describe, expect, it } from "vitest";
import {
  binarySearch,
  bubbleSort,
  insertionSort,
  interpolationSearch,
  isSorted,
  linearSearch,
  mergeSort,
  parseArray,
  quickSort,
  selectionSort,
  type SearchFrame,
  type SortFrame,
} from "@/lib/algorithms";

const lastSearchFrame = (frames: SearchFrame[]) => frames.at(-1);
const finalSortedArray = (frames: SortFrame[]) => frames.at(-1)?.array ?? [];
const sortedCopy = (input: number[]) => [...input].sort((a, b) => a - b);

describe("search algorithms", () => {
  describe("linearSearch", () => {
    it("finds target in a normal unsorted array", () => {
      const frames = linearSearch([9, 1, 4, 7, 3], 7);
      expect(lastSearchFrame(frames)?.found).toBe(3);
    });

    it("returns not found when target is missing", () => {
      const frames = linearSearch([2, 4, 6, 8], 7);
      expect(lastSearchFrame(frames)?.failed).toBe(true);
    });

    it("handles empty input", () => {
      const frames = linearSearch([], 10);
      expect(lastSearchFrame(frames)?.failed).toBe(true);
      expect(lastSearchFrame(frames)?.step).toBe(0);
    });

    it("handles single element input", () => {
      expect(lastSearchFrame(linearSearch([5], 5))?.found).toBe(0);
      expect(lastSearchFrame(linearSearch([5], 4))?.failed).toBe(true);
    });

    it("handles duplicates by finding the first match", () => {
      const frames = linearSearch([4, 2, 2, 9], 2);
      expect(lastSearchFrame(frames)?.found).toBe(1);
    });
  });

  describe("binarySearch", () => {
    const input = [1, 3, 5, 7, 9, 11, 13];

    it("finds target in a sorted array", () => {
      const frames = binarySearch(input, 11);
      expect(lastSearchFrame(frames)?.found).toBe(5);
    });

    it("returns not found when target is missing", () => {
      const frames = binarySearch(input, 8);
      expect(lastSearchFrame(frames)?.failed).toBe(true);
    });

    it("handles empty input", () => {
      const frames = binarySearch([], 10);
      expect(lastSearchFrame(frames)?.failed).toBe(true);
      expect(lastSearchFrame(frames)?.step).toBe(0);
    });

    it("handles single element input", () => {
      expect(lastSearchFrame(binarySearch([5], 5))?.found).toBe(0);
      expect(lastSearchFrame(binarySearch([5], 4))?.failed).toBe(true);
    });

    it("handles duplicates", () => {
      const arr = [1, 2, 2, 2, 3, 4];
      const frames = binarySearch(arr, 2);
      const index = lastSearchFrame(frames)?.found;
      expect(index).toBeDefined();
      expect(arr[index as number]).toBe(2);
    });
  });

  describe("interpolationSearch", () => {
    const input = [10, 20, 30, 40, 50, 60, 70, 80];

    it("finds target in sorted uniform array", () => {
      const frames = interpolationSearch(input, 70);
      expect(lastSearchFrame(frames)?.found).toBe(6);
    });

    it("returns not found when target is missing", () => {
      const frames = interpolationSearch(input, 75);
      expect(lastSearchFrame(frames)?.failed).toBe(true);
    });

    it("handles empty input", () => {
      const frames = interpolationSearch([], 10);
      expect(lastSearchFrame(frames)?.failed).toBe(true);
      expect(lastSearchFrame(frames)?.step).toBe(0);
    });

    it("handles single element input", () => {
      expect(lastSearchFrame(interpolationSearch([5], 5))?.found).toBe(0);
      expect(lastSearchFrame(interpolationSearch([5], 4))?.failed).toBe(true);
    });

    it("handles duplicate values in flat range", () => {
      expect(lastSearchFrame(interpolationSearch([5, 5, 5, 5], 5))?.found).toBe(
        0,
      );
      expect(
        lastSearchFrame(interpolationSearch([5, 5, 5, 5], 6))?.failed,
      ).toBe(true);
    });
  });
});

describe("sorting algorithms", () => {
  const sortAlgorithms: Record<string, (input: number[]) => SortFrame[]> = {
    bubbleSort,
    selectionSort,
    insertionSort,
    quickSort,
    mergeSort,
  };

  const scenarios = [
    { name: "normal input", input: [5, 2, 8, 1, 9, 3] },
    { name: "already sorted input", input: [1, 2, 3, 4, 5, 6] },
    { name: "reverse sorted input", input: [6, 5, 4, 3, 2, 1] },
    { name: "input with duplicates", input: [4, 2, 4, 1, 3, 2, 1] },
    { name: "single element input", input: [42] },
    { name: "empty input", input: [] },
  ];

  for (const [name, build] of Object.entries(sortAlgorithms)) {
    describe(name, () => {
      for (const scenario of scenarios) {
        it(`sorts ${scenario.name}`, () => {
          const original = [...scenario.input];
          const frames = build(scenario.input);
          const lastFrame = finalSortedArray(frames);

          expect(frames.length).toBeGreaterThan(0);
          expect(lastFrame).toEqual(sortedCopy(scenario.input));
          expect(scenario.input).toEqual(original);
        });
      }
    });
  }
});

describe("helpers", () => {
  it("parseArray parses space/comma values and ignores invalid tokens", () => {
    expect(parseArray("1, 2  x 3  , 4")).toEqual([1, 2, 3, 4]);
  });

  it("isSorted validates ascending order", () => {
    expect(isSorted([])).toBe(true);
    expect(isSorted([1])).toBe(true);
    expect(isSorted([1, 2, 2, 3])).toBe(true);
    expect(isSorted([3, 2, 1])).toBe(false);
  });
});
