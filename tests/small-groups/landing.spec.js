import { test, expect } from '@playwright/test'

test('has title', async ({ page }) => {
	await page.goto('https://fcccanada.ca/small-groups')
	await expect(page).toHaveTitle(
		'Small Groups | Bible Study & Fellowship at Freedom in Christ Church'
	)
})
