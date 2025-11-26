import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Vite \+ React/);
});

test('renders main heading', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  
  // Check if the main heading exists (adjust selector based on your actual app)
  // For a default Vite app, it might be an h1 or similar
  // await expect(page.locator('h1')).toBeVisible();
});
