import { expect, test } from '@playwright/test'

const sermonsPage: string = 'https://fcccanada.ca/sermons'

test('sermons: has title', async ({ page }) => {
  await page.goto(sermonsPage)
  await expect(page).toHaveTitle('FCC | Sermons')
})

test('sermons: has main header', async ({ page }) => {
  await page.goto(sermonsPage)
  await expect(page.getByRole('heading', { name: 'Sermons.' })).toBeVisible()
})
