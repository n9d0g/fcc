import { test, expect } from '@playwright/test'

test('has title', async ({ page }) => {
	await page.goto('/ministries')
	await expect(page).toHaveTitle(
		'Church Ministries in Mississauga | Freedom in Christ Church'
	)
})
