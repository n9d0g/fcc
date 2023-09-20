import { test, expect } from '@playwright/test'

test('has title', async ({ page }) => {
	await page.goto('https://fcccanada.ca/give')
	await expect(page).toHaveTitle('FCC | Give')
})
