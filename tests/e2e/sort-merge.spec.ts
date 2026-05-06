import { test } from "@playwright/test";
import { openSortingAlgorithm, resetAndExpectIdle, runSortAndWaitForResult } from "./helpers";

test.describe("Merge Sort E2E", () => {
  test("runs merge sort to completion", async ({ page }) => {
    await openSortingAlgorithm(page, /Merge Sort/i);
    await runSortAndWaitForResult(page, "38 27 43 3", /Sorted!/i);
    await resetAndExpectIdle(page, "sort");
  });
});
