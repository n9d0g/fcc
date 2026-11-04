import { test, expect } from '@playwright/test'

test('has title', async ({ page }) => {
	await page.goto('/sermons')
	await expect(page).toHaveTitle(
		'Sermons & Messages | Freedom in Christ Church'
	)
})
