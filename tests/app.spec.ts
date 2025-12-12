import { test, expect } from '@playwright/test';

test.describe('Christmas Advent Calendar App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    
    // Enable manual unlock mode to access all days for testing
    // Set localStorage directly to enable manual unlock mode
    await page.evaluate(() => {
      localStorage.setItem('holiday-advent-calendar:manual-unlock', 'true');
    });
    
    // Reload the page for the setting to take effect
    await page.reload();
    await page.waitForLoadState('networkidle');
  });

  test('has correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Christmas Advent Calendar/);
  });

  test('renders main header with title', async ({ page }) => {
    // Check header is visible with correct text
    await expect(page.getByRole('heading', { name: /Holiday Advent Calendar 2025/i })).toBeVisible();
  });

  test('displays the story subtitle', async ({ page }) => {
    await expect(page.getByText('Deep Sleigh Learning - A Holiday Model')).toBeVisible();
  });

  test('renders 24 calendar day boxes', async ({ page }) => {
    // Count all calendar day buttons (days 1-23 have exact name, day 24 has "TODAY!" suffix)
    const dayButtons = [];
    for (let day = 1; day <= 23; day++) {
      dayButtons.push(page.getByRole('button', { name: String(day), exact: true }));
    }
    // Day 24 has "TODAY!" badge
    dayButtons.push(page.getByRole('button', { name: /^24/ }));
    
    // Verify all 24 buttons are visible
    for (const button of dayButtons) {
      await expect(button).toBeVisible();
    }
  });

  test('unlocked calendar box can be clicked to open modal', async ({ page }) => {
    // Click on day 1 (should be unlocked since demo mode unlocks all days)
    const dayOneButton = page.getByRole('button', { name: '1', exact: true });
    await dayOneButton.click();

    // Modal should appear with the day's content
    await expect(page.getByText('December 1, 2025')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Day 1: The Crisis Begins' })).toBeVisible();
  });

  test('modal displays correct content for selected day', async ({ page }) => {
    // Click on day 3
    const dayThreeButton = page.getByRole('button', { name: '3', exact: true });
    await dayThreeButton.click();

    // Check modal content is correct for day 3
    await expect(page.getByText('December 3, 2025')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Day 3: GPS Disaster' })).toBeVisible();
    await expect(page.getByText(/sleigh's GPS was broken/)).toBeVisible();
  });

  test('modal can be closed using close button', async ({ page }) => {
    // Open modal
    const dayOneButton = page.getByRole('button', { name: '1', exact: true });
    await dayOneButton.click();

    // Modal should be visible
    await expect(page.getByText('December 1, 2025')).toBeVisible();

    // Click close button
    const closeButton = page.getByRole('button', { name: /close/i });
    await closeButton.click();

    // Modal should be closed
    await expect(page.getByText('December 1, 2025')).not.toBeVisible();
  });

  test('footer displays story context text', async ({ page }) => {
    await expect(page.getByText('A story about collaboration between humans and AI')).toBeVisible();
    await expect(page.getByText('New chapters unlock daily throughout December 2025')).toBeVisible();
  });

  test('can navigate through multiple days', async ({ page }) => {
    // Open day 1
    await page.getByRole('button', { name: '1', exact: true }).click();
    await expect(page.getByRole('heading', { name: 'Day 1: The Crisis Begins' })).toBeVisible();
    
    // Close modal
    await page.getByRole('button', { name: /close/i }).click();
    await expect(page.getByRole('heading', { name: 'Day 1: The Crisis Begins' })).not.toBeVisible();

    // Open day 24 (has "TODAY!" badge so name includes that)
    await page.getByRole('button', { name: /^24/ }).click();
    await expect(page.getByRole('heading', { name: 'Day 24: Joyful Ending' })).toBeVisible();
  });
});

