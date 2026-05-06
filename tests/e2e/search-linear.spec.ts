import { test } from "@playwright/test";
import { openSearchingAlgorithm, resetAndExpectIdle, runSearchAndWaitForResult } from "./helpers";

test.describe("Linear Search E2E", () => {
  test("runs linear search to completion", async ({ page }) => {
    await openSearchingAlgorithm(page, /Linear Search/i);
    await runSearchAndWaitForResult(page, "1 3 5 7 9", "7", /Found 7 at index 3\./i);
    await resetAndExpectIdle(page, "search");
  });
});
