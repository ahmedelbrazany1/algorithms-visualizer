import { test } from "@playwright/test";
import { openSortingAlgorithm, resetAndExpectIdle, runSortAndWaitForResult } from "./helpers";

test.describe("Bubble Sort E2E", () => {
  test("runs bubble sort to completion", async ({ page }) => {
    await openSortingAlgorithm(page, /Bubble Sort/i);
    await runSortAndWaitForResult(page, "5 1 4 2", /Sorted!|already sorted/i);
    await resetAndExpectIdle(page, "sort");
  });
});
