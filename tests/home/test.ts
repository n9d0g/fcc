import { expect, test } from '@playwright/test'

test('home: has title', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle('Freedom in Christ Church.')
})

test('home: hero has h1', async ({ page }) => {
  await page.goto('/')
  await expect(
    page.getByRole('heading', { name: 'Welcome to Freedom in Christ Church.' })
  ).toBeVisible()
})

test('home: hero has h3', async ({ page }) => {
  await page.goto('/')
  await expect(
    page.getByRole('heading', {
      name: 'A Christ-centred, Holy Spirit-led community committed to the building of strong relationships and planting of healthy reproducing churches.',
    })
  ).toBeVisible()
})

// test("home: i'm new button", async ({ page }) => {
//   await page.goto('/')
//   await page.getByText("i'm new").click()
//   await expect(page).toHaveURL('/about')
// })
