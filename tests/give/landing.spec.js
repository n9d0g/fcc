import { test, expect } from '@playwright/test'

test('has title', async ({ page }) => {
	await page.goto('/give')
	await expect(page).toHaveTitle('Give & Support | Freedom in Christ Church')
})
