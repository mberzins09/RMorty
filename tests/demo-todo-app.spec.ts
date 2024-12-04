import { test, expect, type Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5173/');
});

test.describe('Rick and Morty Character List', () => {
  test('should display character cards with images and names', async ({ page }) => {
    // Wait for the first character card to be visible
    await page.waitForSelector('[data-testid="character-card"]');
    
    // Get all character cards
    const cards = await page.getByTestId('character-card').all();
    
    // Verify we have characters displayed
    expect(cards.length).toBeGreaterThan(0);
    
    // Check first card has image and name
    const firstCard = cards[0];
    await expect(firstCard.getByRole('img')).toBeVisible();
    await expect(firstCard.getByTestId('character-name')).toBeVisible();
  });

  test('should add character to favorites', async ({ page }) => {
    // Wait for the first character card
    const firstCard = await page.getByTestId('character-card').first();
    
    // Click favorite button
    await firstCard.getByRole('button', { name: /add to favorites/i }).click();
    
    // Verify success message
    await expect(page.getByText(/added to favorites/i)).toBeVisible();
  });

  test('should remove character from favorites', async ({ page }) => {
    // Navigate to favorites page
    await page.getByRole('link', { name: /favorites/i }).click();
    
    // Wait for favorite characters to load
    await page.waitForSelector('[data-testid="character-card"]');
    
    // Remove first favorite
    const firstCard = await page.getByTestId('character-card').first();
    await firstCard.getByRole('button', { name: /remove from favorites/i }).click();
    
    // Verify success message
    await expect(page.getByText(/removed from favorites/i)).toBeVisible();
  });

  test('should handle pagination correctly', async ({ page }) => {
    // Get initial page number
    const initialPage = await page.getByTestId('current-page').textContent();
    
    // Click next page button
    await page.getByRole('button', { name: /next/i }).click();
    
    // Verify page number increased
    const newPage = await page.getByTestId('current-page').textContent();
    expect(Number(newPage)).toBe(Number(initialPage) + 1);
    
    // Verify new characters loaded
    await expect(page.getByTestId('character-card')).toHaveCount(20);
  });

  test('should show error when adding duplicate favorite', async ({ page }) => {
    // Add character to favorites
    const firstCard = await page.getByTestId('character-card').first();
    await firstCard.getByRole('button', { name: /add to favorites/i }).click();
    
    // Try to add same character again
    await firstCard.getByRole('button', { name: /add to favorites/i }).click();
    
    // Verify error message
    await expect(page.getByText(/already in favorites/i)).toBeVisible();
  });
});
