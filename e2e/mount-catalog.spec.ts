import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { expect, test } from '@playwright/test';

const fixturePath = resolve(process.cwd(), 'e2e/fixtures/xivapi-mounts.json');
const fixture = readFileSync(fixturePath, 'utf-8');

test.beforeEach(async ({ page }) => {
  await page.route('https://xivapi.com/mount?**', async (route) => {
    await route.fulfill({
      contentType: 'application/json',
      body: fixture,
    });
  });
  await page.route('https://xivapi.com/i/**', async (route) => {
    await route.fulfill({ status: 204 });
  });
});

test('loads, searches and filters the mount catalog without using the live API', async ({ page }) => {
  await page.goto('/#/');

  await expect(page.getByRole('heading', { level: 1 })).toContainText('montures');
  await expect(page.getByRole('article')).toHaveCount(3);

  await page.getByLabel('Recherche par nom').fill('faucon');
  await expect(page.getByRole('article')).toHaveCount(1);
  await expect(page.getByRole('article')).toContainText('Faucon flamboyant');

  await page.getByLabel('Recherche par nom').fill('');
  await page.getByLabel('Filtre par extension').selectOption('Stormblood');
  await expect(page.getByRole('article')).toHaveCount(1);
  await expect(page.getByRole('article')).toContainText('Tigre de guerre');
});

for (const viewport of [375, 768, 1024, 1440]) {
  test(`keeps the catalogue within the ${viewport}px viewport`, async ({ page }) => {
    await page.setViewportSize({ width: viewport, height: 900 });
    await page.goto('/#/');

    await expect(page.getByRole('article').first()).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  });
}
