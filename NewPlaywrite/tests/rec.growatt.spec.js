import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('https://server-us.growatt.com/login');
    await page.getByPlaceholder('User Name').click();
    await page.getByPlaceholder('User Name').fill('johnnie321');
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill('133Utica');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForTimeout(2500);
    await page.goto('https://server-us.growatt.com/index');
    await page.waitForTimeout(2500);
    const animPan = page.locator('class=animPan');
    console.log(animPan)

await page.pause();
});