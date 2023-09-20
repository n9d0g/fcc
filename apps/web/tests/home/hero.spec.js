import { test, expect } from '@playwright/test'

test('has title', async ({ page }) => {
	await page.goto('https://fcccanada.ca')
	await expect(page).toHaveTitle('Freedom in Christ Church.')
})

test('has h1', async ({ page }) => {
	await page.goto('https://fcccanada.ca')
	await expect(
		page.getByRole('heading', { name: 'Welcome to Freedom in Christ Church.' })
	).toBeVisible()
})

test('has h2', async ({ page }) => {
	await page.goto('https://fcccanada.ca')
	await expect(
		page.getByRole('heading', {
			name: 'A Christ-centred, Holy Spirit-led community committed to the building of strong relationships and planting of healthy reproducing churches.',
		})
	).toBeVisible()
})
