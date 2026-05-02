import { describe, expect, it } from "vitest";
import {
  binarySearch,
  bubbleSort,
  insertionSort,
  interpolationSearch,
  linearSearch,
  mergeSort,
  quickSort,
  selectionSort,
  type SearchFrame,
  type SortFrame,
} from "@/lib/algorithms";

const sortBuilders = {
  bubbleSort,
  selectionSort,
  insertionSort,
  quickSort,
  mergeSort,
};

const sortScenarios = [
  [5, 2, 8, 1, 9, 3, 7, 4, 6],
  [1, 2, 3, 4, 5, 6, 7, 8],
  [9, 8, 7, 6, 5, 4, 3, 2, 1],
  [4, 2, 4, 1, 3, 2, 5, 1, 3],
  [42],
];

const isSortedAsc = (arr: number[]) => arr.every((v, i) => i === 0 || arr[i - 1] <= v);

const expectMonotonicCounters = (frames: SortFrame[]) => {
  for (let i = 1; i < frames.length; i++) {
    expect(frames[i].comparisons).toBeGreaterThanOrEqual(frames[i - 1].comparisons);
    expect(frames[i].swaps).toBeGreaterThanOrEqual(frames[i - 1].swaps);
  }
};

const expectNoInvalidSearchNumbers = (frames: SearchFrame[]) => {
  for (const frame of frames) {
    for (const v of [frame.active, frame.low, frame.high, frame.mid, frame.estimate, frame.found]) {
      if (v !== undefined) expect(Number.isFinite(v)).toBe(true);
    }
  }
};

describe("sorting frame steps and counters", () => {
  for (const [name, build] of Object.entries(sortBuilders)) {
    it(`${name} sorts correctly across scenarios with valid counters`, () => {
      for (const scenario of sortScenarios) {
        const frames = build(scenario);
        expect(frames.length).toBeGreaterThan(0);

        const finalArray = frames.at(-1)?.array ?? [];
        expect(finalArray.length).toBe(scenario.length);
        expect(isSortedAsc(finalArray)).toBe(true);
        expectMonotonicCounters(frames);
      }
    });
  }

  it("bubble sort exits early on already sorted input", () => {
    const arr = [1, 2, 3, 4, 5, 6, 7];
    const frames = bubbleSort(arr);
    const last = frames.at(-1);
    expect(last?.comparisons).toBe(arr.length - 1);
    expect(last?.message).toContain("already sorted");
  });

  it("insertion sort counts comparisons on sorted input correctly", () => {
    const arr = [1, 2, 3, 4, 5];
    const frames = insertionSort(arr);
    const last = frames.at(-1);
    expect(last?.comparisons).toBe(arr.length - 1);
  });
});

describe("search frame steps and edge cases", () => {
  it("linear search handles found and not found", () => {
    const arr = [3, 9, 1, 8, 4];
    const found = linearSearch(arr, 8);
    const notFound = linearSearch(arr, 99);
    expect(found.at(-1)?.found).toBe(3);
    expect(found.at(-1)?.step).toBe(4);
    expect(notFound.at(-1)?.failed).toBe(true);
    expect(notFound.at(-1)?.step).toBe(arr.length);
    expectNoInvalidSearchNumbers(found);
    expectNoInvalidSearchNumbers(notFound);
  });

  it("binary search handles found and not found", () => {
    const arr = [1, 3, 5, 7, 9, 11, 13];
    const found = binarySearch(arr, 11);
    const notFound = binarySearch(arr, 8);
    expect(found.at(-1)?.found).toBe(5);
    expect(found.at(-1)?.step).toBe(2);
    expect(notFound.at(-1)?.failed).toBe(true);
    expect(notFound.at(-1)?.step).toBe(3);
    expectNoInvalidSearchNumbers(found);
    expectNoInvalidSearchNumbers(notFound);
  });

  it("binary search sample shows 4 steps for target 14", () => {
    const frames = binarySearch([2, 4, 6, 8, 10, 12, 14, 16, 18, 20], 14);
    expect(frames.at(-1)?.found).toBe(6);
    expect(frames.at(-1)?.step).toBe(4);
  });

  it("interpolation search avoids NaN on flat ranges", () => {
    const flat = [5, 5, 5, 5, 5];
    const found = interpolationSearch(flat, 5);
    const notFound = interpolationSearch(flat, 7);

    expect(found.at(-1)?.found).toBeDefined();
    expect(notFound.at(-1)?.failed).toBe(true);
    expectNoInvalidSearchNumbers(found);
    expectNoInvalidSearchNumbers(notFound);
  });
});
