import { test } from "@playwright/test";
import { openSortingAlgorithm, resetAndExpectIdle, runSortAndWaitForResult } from "./helpers";

test.describe("Insertion Sort E2E", () => {
  test("runs insertion sort to completion", async ({ page }) => {
    await openSortingAlgorithm(page, /Insertion Sort/i);
    await runSortAndWaitForResult(page, "8 3 6 1", /Insert key 1 at index 0\./i);
    await resetAndExpectIdle(page, "sort");
  });
});
