import { test, expect } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

test('Accessibility test with axe-core', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/');
  const report = await new AxeBuilder({ page })
  .withTags(['wcag2a'])
  .analyze();
  expect(report.violations).toHaveLength(0);
});
