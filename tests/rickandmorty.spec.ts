import { test, expect } from '@playwright/test';
import fs from 'fs';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5173/');
});

test.describe('Rick and Morty App', () => {
  test('clicking on next page opens new characters', async ({ page }) => {
    // Get initial character names
    const initialNames = await page.locator('.relative.rounded-lg.overflow-hidden h2').allTextContents();
    
    // Click next page button
    await page.getByRole('button', { name: /next/i }).click();
    
    // Wait for new characters to load
    await page.waitForTimeout(1000);
    
    // Get new character names
    const newNames = await page.locator('.relative.rounded-lg.overflow-hidden h2').allTextContents();
    
    // Verify the first character name is different
    expect(initialNames[0]).not.toBe(newNames[0]);
  });

  test('clicking on character can see character\'s Location, Origin, and Gender', async ({ page }) => {
    // Click on the first character card
    const firstCard = await page.locator('.relative.rounded-lg.overflow-hidden').first();
    const characterName = await firstCard.locator('h2').textContent();
    await firstCard.click();
    
    // Wait for and verify modal content
    const modal = page.locator('.bg-gradient-to-br.from-indigo-100');
    await expect(modal).toBeVisible();
    
    // Verify character details are visible
    const modalContent = modal.locator('p');
    await expect(modalContent.filter({ hasText: 'Location:' })).toBeVisible();
    await expect(modalContent.filter({ hasText: 'Origin:' })).toBeVisible();
    await expect(modalContent.filter({ hasText: 'Gender:' })).toBeVisible();
    
    // Close modal
    await modal.getByRole('button', { name: 'X' }).click();
  });

  test('in first page can see Rick', async ({ page }) => {
    // Check if Rick is visible on the first page
    await expect(page.locator('h2:has-text("Rick")')).toBeVisible();
  });

  test('clicking on add favorites button, character is added in db.json file', async ({ page }) => {
    // Click favorite button on the first character
    const favoriteButton = await page.locator('button:has-text("❤️")').first();
    await favoriteButton.click();
    
    // Wait for the action to complete
    await page.waitForTimeout(1000);
    
    // Verify character is added in db.json
    const dbData = JSON.parse(fs.readFileSync('db.json', 'utf-8'));
    expect(dbData.favorites.length).toBeGreaterThan(0);
  });

  test('filtering by status "Alive" shows only alive characters', async ({ page }) => {
    // Select "Alive" from the first status filter dropdown
    await page.selectOption('select:nth-child(1)', { label: 'Alive' });
    
    // Wait for filtering to apply
    await page.waitForTimeout(1000);
    
    // Get all character cards
    const characterCards = await page.locator('.relative.rounded-lg.overflow-hidden').all();
    expect(characterCards.length).toBeGreaterThan(0);
    
    // Check each card's status text
    for (const card of characterCards) {
      const statusText = await card.locator('p', { hasText: 'Status:' }).textContent();
      expect(statusText).toContain('Status: Alive');
    }
  });
});

test.describe('Rick', () => {
  test('should display header', async ({ page }) => {
    await expect(page.getByText('Rick & Morty')).toBeVisible(); 
  });
});
