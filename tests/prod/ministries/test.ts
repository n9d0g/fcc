import { expect, test } from '@playwright/test'

const ministriesPage: string = 'https://fcccanada.ca/ministries'
const praisePage: string = 'https://fcccanada.ca/ministries/praise'
const schedulePage: string = 'https://fcccanada.ca/ministries/praise/schedule'

test('ministries: has title', async ({ page }) => {
	await page.goto(ministriesPage)
	await expect(page).toHaveTitle('FCC | Ministries')
})

test('ministries: has main header', async ({ page }) => {
	await page.goto(ministriesPage)
	await expect(page.getByRole('heading', { name: 'Ministries.' })).toBeVisible()
})

test('ministries: praise button visible', async ({ page }) => {
	await page.goto(ministriesPage)
	await expect(page.getByText('Praise & Worship')).toBeVisible()
})

test('ministries: men button visible', async ({ page }) => {
	await page.goto(ministriesPage)
	await expect(page.getByRole('link', { name: 'Men', exact: true })).toBeVisible()
})

test('ministries: women button visible', async ({ page }) => {
	await page.goto(ministriesPage)
	await expect(page.getByText('Women')).toBeVisible()
})

test('ministries: preteens button visible', async ({ page }) => {
	await page.goto(ministriesPage)
	await expect(page.getByText('Pre-teens')).toBeVisible()
})

test('ministries: youth button visible', async ({ page }) => {
	await page.goto(ministriesPage)
	await expect(page.getByText('Youth')).toBeVisible()
})

test('ministries: YA button visible', async ({ page }) => {
	await page.goto(ministriesPage)
	await expect(page.getByText('Young Adults')).toBeVisible()
})

test('ministries: p&w button working', async ({ page }) => {
	await page.goto(ministriesPage)
	await page.getByText('Praise & Worship').click()
	await expect(page).toHaveURL(/.*praise/)
})

test('ministries: men button working', async ({ page }) => {
	await page.goto(ministriesPage)
	await page.getByRole('link', { name: 'Men', exact: true }).click()
	await expect(page).toHaveURL(/.*men/)
})

test('ministries: women button working', async ({ page }) => {
	await page.goto(ministriesPage)
	await page.getByText('Women').click()
	await expect(page).toHaveURL(/.*women/)
})

test('ministries: preteens button working', async ({ page }) => {
	await page.goto(ministriesPage)
	await page.getByText('Pre-teens').click()
	await expect(page).toHaveURL(/.*preteens/)
})

test('ministries: youth button working', async ({ page }) => {
	await page.goto(ministriesPage)
	await page.getByText('Youth').click()
	await expect(page).toHaveURL(/.*youth/)
})

test('ministries: YA button working', async ({ page }) => {
	await page.goto(ministriesPage)
	await page.getByText('Young Adults').click()
	await expect(page).toHaveURL(/.*young-adults/)
})

// praise page
test('ministries/praise: has title', async ({ page }) => {
	await page.goto(praisePage)
	await expect(page).toHaveTitle('FCC | Praise')
})

test('ministries/praise: header visible', async ({ page }) => {
	await page.goto(praisePage)
	await expect(page.getByText('Praise & Worship Ministry.')).toBeVisible()
})

test('ministries/praise: schedule button visible', async ({ page }) => {
	await page.goto(praisePage)
	await expect(page.getByText('Schedule')).toBeVisible()
})

test('ministries/praise: schedule button working', async ({ page }) => {
	await page.goto(praisePage)
	await page.getByText('Schedule').click()
	await expect(page).toHaveURL(/.*schedule/)
})

// schedule
test('ministries/praise/schedule: has title', async ({ page }) => {
	await page.goto(schedulePage)
	await expect(page).toHaveTitle('FCC | Praise Schedule')
})

test('ministries/praise/schedule: header visible', async ({ page }) => {
	await page.goto(schedulePage)
	await expect(page.getByText('Praise Schedule.')).toBeVisible()
})

test('ministries/praise/schedule: filter input visible', async ({ page }) => {
	await page.goto(schedulePage)
	await expect(page.getByTestId('schedule-search')).toBeVisible()
})

test('ministries/praise/schedule: table visible', async ({ page }) => {
	await page.goto(schedulePage)
	await expect(page.getByTestId('schedule-table')).toBeVisible()
})
