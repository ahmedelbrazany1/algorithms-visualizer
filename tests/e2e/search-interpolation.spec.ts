import { test } from "@playwright/test";
import { openSearchingAlgorithm, resetAndExpectIdle, runSearchAndWaitForResult } from "./helpers";

test.describe("Interpolation Search E2E", () => {
  test("runs interpolation search to completion", async ({ page }) => {
    await openSearchingAlgorithm(page, /Interpolation Search/i);
    await runSearchAndWaitForResult(page, "10 20 30 40 50", "40", /Found 40 at index 3\./i);
    await resetAndExpectIdle(page, "search");
  });
});
