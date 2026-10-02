import { test, expect } from '@playwright/test'

test('has title', async ({ page }) => {
	await page.goto('https://fcccanada.ca/events')
	await expect(page).toHaveTitle(
		'Church Events | Freedom in Christ Church Calendar'
	)
})
