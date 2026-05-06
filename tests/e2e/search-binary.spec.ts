import { test } from "@playwright/test";
import { openSearchingAlgorithm, resetAndExpectIdle, runSearchAndWaitForResult } from "./helpers";

test.describe("Binary Search E2E", () => {
  test("runs binary search to completion", async ({ page }) => {
    await openSearchingAlgorithm(page, /Binary Search/i);
    await runSearchAndWaitForResult(page, "2 4 6 8 10 12 14", "12", /Found 12 at index 5\./i);
    await resetAndExpectIdle(page, "search");
  });
});
