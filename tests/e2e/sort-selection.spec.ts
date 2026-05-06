import { test } from "@playwright/test";
import { openSortingAlgorithm, resetAndExpectIdle, runSortAndWaitForResult } from "./helpers";

test.describe("Selection Sort E2E", () => {
  test("runs selection sort to completion", async ({ page }) => {
    await openSortingAlgorithm(page, /Selection Sort/i);
    await runSortAndWaitForResult(page, "29 10 14 7", /Index 3 sorted\./i);
    await resetAndExpectIdle(page, "sort");
  });
});
