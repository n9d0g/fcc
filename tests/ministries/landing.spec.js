import { test, expect } from '@playwright/test'

test('has title', async ({ page }) => {
	await page.goto('https://fcccanada.ca/ministries')
	await expect(page).toHaveTitle(
		'Church Ministries | Get Involved at Freedom in Christ Church'
	)
})
