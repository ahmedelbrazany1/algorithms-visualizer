import { expect, test } from "@playwright/test";

test.describe("Home and navigation", () => {
  test("opens home page and shows main entry points", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { name: /Algorithms Visualizer/i })).toBeVisible();
    await expect(page.getByText(/SET222/i)).toBeVisible();
    await expect(page.getByRole("link", { name: /Searching Algorithms/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Sorting Algorithms/i })).toBeVisible();
  });

  test("basic responsive check", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    const searchingCard = page.getByRole("link", { name: /Searching Algorithms/i });
    await expect(searchingCard).toBeVisible();
    await searchingCard.click();
    await expect(page.getByRole("heading", { name: /Searching Algorithms/i })).toBeVisible();
  });
});
