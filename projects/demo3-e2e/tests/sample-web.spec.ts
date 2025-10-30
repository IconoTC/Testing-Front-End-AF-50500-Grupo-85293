import { test, expect } from '@playwright/test';

test.describe('Home page with no auth', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://practicesoftwaretesting.com/');
    });

    test('check sign in', async ({ page }) => {
        await expect(page.getByTestId('nav-sign-in')).toHaveText('Sign in');
        await expect(page.getByRole('link', { name: 'Sign in' })).toBeVisible();
    });

    test('validate page title', async ({ page }) => {
        await expect(page).toHaveTitle(
            'Practice Software Testing - Toolshop - v5.0'
        );
    });

    test('grid loads with 9 items', async ({ page }) => {
        const productGrid = page.locator('.col-md-9');
        const items = productGrid.getByRole('link');
        await expect(items).toHaveCount(9);
        expect(await items.count()).toBe(9);
    });

    test('search for Thor Hammer', async ({ page }) => {
        // const productGrid = page.locator('.col-md-9');
        // await page.getByTestId('search-query').fill('Thor Hammer');
        await page.getByPlaceholder('Search').fill('Thor Hammer');
        await page.getByRole('button', { name: 'Search' }).click();
        const productGrid = page.locator('.col-md-9');
        await expect(productGrid.getByRole('link')).toHaveCount(1);
        await expect(page.getByAltText('Thor Hammer')).toBeVisible();
    });
});

test.describe('Home page with no auth', () => {
    test.use({ storageState: '.auth/customer01.json' });

    test.beforeEach(async ({ page }) => {
        await page.goto('https://practicesoftwaretesting.com/');
    });

    test('check customer 01 is signed in', async ({ page }) => {
        await expect(page.getByTestId('nav-sign-in')).not.toBeVisible();
        await expect(page.getByTestId('nav-menu')).toContainText('Jane Doe');
    });
});
