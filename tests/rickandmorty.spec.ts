import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5173/');
});

test.describe('Rick and Morty App', () => {
  test('should display characters', async ({ page }) => {
    await page.waitForSelector('.relative.rounded-lg.overflow-hidden');
  });
});

test.describe('Rick', () => {
  test('should display characters', async ({ page }) => {
    await expect(page.getByText('Rick and Morty')).toBeVisible();
  });
});
