import { test, expect } from '@playwright/test';

test('Keyboard navigation test', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');

    // Foco inicial en el campo de búsqueda
    await page.getByRole('textbox', { name: 'Search' }).focus();
    'Sample'.split('').forEach(async (char) => {
        await page.keyboard.press(char);
    });
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', { name: 'Search' })).toBeFocused();
    page.keyboard.press('Enter');
    await expect(page.getByText('Sample')).toBeVisible();
});
