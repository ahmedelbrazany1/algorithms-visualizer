import { test } from "@playwright/test";
import { openSortingAlgorithm, resetAndExpectIdle, runSortAndWaitForResult } from "./helpers";

test.describe("Quick Sort E2E", () => {
  test("runs quick sort to completion", async ({ page }) => {
    await openSortingAlgorithm(page, /Quick Sort/i);
    await runSortAndWaitForResult(page, "10 7 8 9 1 5", /Sorted!/i);
    await resetAndExpectIdle(page, "sort");
  });
});
