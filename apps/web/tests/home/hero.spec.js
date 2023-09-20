import { test, expect } from '@playwright/test'

test('has title', async ({ page }) => {
	await page.goto('https://fcccanada.ca')
	await expect(page).toHaveTitle('Freedom in Christ Church.')
})
