import { expect, test } from '@playwright/test'

const aboutPage: string = 'https://fcccanada.ca/about'

test('about: has title', async ({ page }) => {
  await page.goto(aboutPage)
  await expect(page).toHaveTitle('FCC | About')
})

test('about: has main header', async ({ page }) => {
  await page.goto(aboutPage)
  await expect(page.getByRole('heading', { name: 'About FCC.' })).toBeVisible()
})

test('about: beliefs button visible', async ({ page }) => {
  await page.goto(aboutPage)
  await expect(page.getByText('Beliefs')).toBeVisible()
})

test('about: mission/vision button visible', async ({ page }) => {
  await page.goto(aboutPage)
  await expect(page.getByText('Mission & Vision')).toBeVisible()
})

test('about: leadership button visible', async ({ page }) => {
  await page.goto(aboutPage)
  await expect(page.getByText('Leadership')).toBeVisible()
})

test('about: beliefs button working', async ({ page }) => {
  await page.goto(aboutPage)
  await page.getByText('Beliefs').click()
  await expect(page).toHaveURL(/.*beliefs/)
})

test('about: mission/vision button working', async ({ page }) => {
  await page.goto(aboutPage)
  await page.getByText('Mission & Vision').click()
  await expect(page).toHaveURL(/.*mission-vision/)
})

test('about: leadership button working', async ({ page }) => {
  await page.goto(aboutPage)
  await page.getByText('Leadership').click()
  await expect(page).toHaveURL(/.*leadership/)
})
