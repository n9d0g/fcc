import { expect, test } from '@playwright/test'

const devHome: string = 'https://dev.fcccanada.ca'

test('home: has title', async ({ page }) => {
  await page.goto(devHome)
  await expect(page).toHaveTitle('Freedom in Christ Church.')
})

test('home: hero has main header', async ({ page }) => {
  await page.goto(devHome)
  await expect(
    page.getByRole('heading', { name: 'Welcome to Freedom in Christ Church.' })
  ).toBeVisible()
})

test('home: hero has subheader', async ({ page }) => {
  await page.goto(devHome)
  await expect(
    page.getByRole('heading', {
      name: 'A Christ-centred, Holy Spirit-led community committed to the building of strong relationships and planting of healthy reproducing churches.',
    })
  ).toBeVisible()
})

test('home: next events has header', async ({ page }) => {
  await page.goto(devHome)
  await expect(
    page.getByRole('heading', {
      name: 'Next Event:',
    })
  ).toBeVisible()
})

test("home: i'm new button", async ({ page }) => {
  await page.goto(devHome)
  await page.getByText("i'm new").click()
  await expect(page).toHaveURL(/.*about/)
})

// test('home: sermons button', async ({ page }) => {
//   await page.goto(devHome)
//   await page.getByRole('link', { name: 'Sermons' }).click()
//   await expect(page).toHaveURL(/.*sermons/)
// })

test('home: invite section has header', async ({ page }) => {
  await page.goto(devHome)
  await expect(
    page.getByRole('heading', {
      name: 'Come join us!',
    })
  ).toBeVisible()
})
