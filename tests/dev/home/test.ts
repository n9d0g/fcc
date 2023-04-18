import { expect, test } from '@playwright/test'

const devHome: string = 'https://dev.fcccanada.ca'

test('home: has title', async ({ page }) => {
	await page.goto(devHome)
	await expect(page).toHaveTitle('Freedom in Christ Church.')
})

test('home: hero has main header', async ({ page }) => {
	await page.goto(devHome)
	await expect(page.getByRole('heading', { name: 'Welcome to Freedom in Christ Church.' })).toBeVisible()
})

test('home: hero has subheader', async ({ page }) => {
	await page.goto(devHome)
	await expect(
		page.getByRole('heading', {
			name: 'A Christ-centred, Holy Spirit-led community committed to the building of strong relationships and planting of healthy reproducing churches.',
		})
	).toBeVisible()
})

test('home: hero im new button visible', async ({ page }) => {
	await page.goto(devHome)
	await expect(page.getByTestId('hero-im-new')).toBeVisible()
})

test('home: hero sermons button visible', async ({ page }) => {
	await page.goto(devHome)
	await expect(page.getByTestId('hero-sermons')).toBeVisible()
})

test('home: hero im new button working', async ({ page }) => {
	await page.goto(devHome)
	await page.getByTestId('hero-im-new').click()
	await expect(page).toHaveURL(/.*about/)
})

test('home: hero sermons button working', async ({ page }) => {
	await page.goto(devHome)
	await page.getByTestId('hero-sermons').click()
	await expect(page).toHaveURL(/.*sermons/)
})

test('home: welcome has header', async ({ page }) => {
	await page.goto(devHome)
	await expect(page.getByTestId('welcome-header')).toBeVisible()
})

test('home: welcome has subheader', async ({ page }) => {
	await page.goto(devHome)
	await expect(page.getByTestId('welcome-subheader')).toBeVisible()
})

test('home: welcome has zoom button', async ({ page }) => {
	await page.goto(devHome)
	await expect(page.getByTestId('welcome-zoom')).toBeVisible()
})

test('home: next events has header', async ({ page }) => {
	await page.goto(devHome)
	await expect(page.getByTestId('nextevent-header')).toBeVisible()
})

test('home: sermons has header', async ({ page }) => {
	await page.goto(devHome)
	await expect(page.getByText('recent sermons')).toBeVisible()
})

test('home: sermons has view all sermons btn', async ({ page }) => {
	await page.goto(devHome)
	await expect(page.getByText('view all sermons')).toBeVisible()
})

test('home: sermons view all button working', async ({ page }) => {
	await page.goto(devHome)
	await page.getByTestId('sermons-view-all').click()
	await expect(page).toHaveURL(/.*sermons/)
})
