import { test, expect } from '@playwright/test'

test('has title', async ({ page }) => {
	await page.goto('/events')
	await expect(page).toHaveTitle(
		'Church Events in Mississauga | Freedom in Christ Church'
	)
})
