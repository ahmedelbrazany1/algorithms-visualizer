import { expect, type Page } from "@playwright/test";

export async function openSearchingAlgorithm(page: Page, algorithmName: RegExp) {
  await page.goto("/");
  await page.getByRole("link", { name: /Searching Algorithms/i }).click();
  await expect(page.getByRole("heading", { name: /Searching Algorithms/i })).toBeVisible();
  await page.getByRole("link", { name: algorithmName }).click();
  await expect(page.getByRole("heading", { name: algorithmName })).toBeVisible();
}

export async function openSortingAlgorithm(page: Page, algorithmName: RegExp) {
  await page.goto("/");
  await page.getByRole("link", { name: /Sorting Algorithms/i }).click();
  await expect(page.getByRole("heading", { name: /Sorting Algorithms/i })).toBeVisible();
  await page.getByRole("link", { name: algorithmName }).click();
  await expect(page.getByRole("heading", { name: algorithmName })).toBeVisible();
}

export async function runSearchAndWaitForResult(
  page: Page,
  arrayInput: string,
  targetInput: string,
  expectedFinalMessage: RegExp,
) {
  await page.getByLabel(/Array \(space or comma separated\)/i).fill(arrayInput);
  await page.getByLabel(/Target/i).fill(targetInput);
  await page.getByRole("button", { name: /^Start$/i }).first().click();

  const status = page.getByRole("status", { name: /Search status/i });
  await expect(status).toContainText(expectedFinalMessage, { timeout: 20_000 });
}

export async function runSortAndWaitForResult(
  page: Page,
  arrayInput: string,
  expectedFinalMessage: RegExp,
) {
  await page.getByLabel(/Array \(space or comma separated\)/i).fill(arrayInput);
  await page.getByRole("button", { name: /^Start$/i }).first().click();

  const status = page.getByRole("status", { name: /Sort status/i });
  await expect(status).toContainText(expectedFinalMessage, { timeout: 20_000 });
}

export async function resetAndExpectIdle(page: Page, kind: "search" | "sort") {
  await page.getByRole("button", { name: /^Reset$/i }).first().click();
  const statusName = kind === "search" ? /Search status/i : /Sort status/i;
  await expect(page.getByRole("status", { name: statusName })).toContainText(
    /Press Start to run the algorithm/i,
  );
}
