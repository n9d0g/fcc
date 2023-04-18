import { expect, test } from '@playwright/test'

const givePage: string = 'https://fcccanada.ca/give'

test('give: has title', async ({ page }) => {
	await page.goto(givePage)
	await expect(page).toHaveTitle('FCC | Give')
})

test('give: has main header', async ({ page }) => {
	await page.goto(givePage)
	await expect(page.getByRole('heading', { name: 'Generosity is a form of Worship.' })).toBeVisible()
})

test('give: has description', async ({ page }) => {
	await page.goto(givePage)
	await expect(page.getByTestId('give-description')).toBeVisible()
})

test('give: has etransfer details', async ({ page }) => {
	await page.goto(givePage)
	await expect(page.getByTestId('give-etransfer-details')).toBeVisible()
})
