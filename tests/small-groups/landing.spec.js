import { test, expect } from '@playwright/test'

test('has title', async ({ page }) => {
	await page.goto('/small-groups')
	await expect(page).toHaveTitle(
		'Small Groups & Bible Studies in Mississauga | FCC'
	)
})
