import { expect, test } from '@playwright/test'

const sgPage: string = 'https://fcccanada.ca/small-groups'
const YAPage: string = 'https://fcccanada.ca/small-groups/young-adults'

test('smallgroups: has title', async ({ page }) => {
  await page.goto(sgPage)
  await expect(page).toHaveTitle('FCC | Small Groups')
})

test('smallgroups: has main header', async ({ page }) => {
  await page.goto(sgPage)
  await expect(
    page.getByRole('heading', { name: 'Our Small Groups.' })
  ).toBeVisible()
})

test('smallgroups: YA button visible', async ({ page }) => {
  await page.goto(sgPage)
  await expect(page.getByText('Young Adults')).toBeVisible()
})

test('smallgroups: WCG button visible', async ({ page }) => {
  await page.goto(sgPage)
  await expect(page.getByText('Women Chasing God')).toBeVisible()
})

test('smallgroups: UBS button visible', async ({ page }) => {
  await page.goto(sgPage)
  await expect(page.getByText('University Bible Study')).toBeVisible()
})

test('smallgroups: south mississauga button visible', async ({ page }) => {
  await page.goto(sgPage)
  await expect(page.getByText('South Mississauga')).toBeVisible()
})

test('smallgroups: yumul bs button visible', async ({ page }) => {
  await page.goto(sgPage)
  await expect(page.getByText('Yumul Bible Study')).toBeVisible()
})

test('smallgroups: macasaquit bs button visible', async ({ page }) => {
  await page.goto(sgPage)
  await expect(page.getByText('Macasaquit Bible Study')).toBeVisible()
})

test('smallgroups: YA button working', async ({ page }) => {
  await page.goto(sgPage)
  await page.getByText('Young Adults').click()
  await expect(page).toHaveURL(/.*young-adults/)
})

test('smallgroups: WCG button working', async ({ page }) => {
  await page.goto(sgPage)
  await page.getByText('Women Chasing God').click()
  await expect(page).toHaveURL(/.*women-chasing-god/)
})

test('smallgroups: UBS button working', async ({ page }) => {
  await page.goto(sgPage)
  await page.getByText('University Bible Study').click()
  await expect(page).toHaveURL(/.*university-bible-study/)
})

test('smallgroups: south mississauga button working', async ({ page }) => {
  await page.goto(sgPage)
  await page.getByText('South Mississauga').click()
  await expect(page).toHaveURL(/.*south-mississauga/)
})

test('smallgroups: yumul button working', async ({ page }) => {
  await page.goto(sgPage)
  await page.getByText('Yumul Bible Study').click()
  await expect(page).toHaveURL(/.*yumul-bible-study/)
})

test('smallgroups: macasaquit button working', async ({ page }) => {
  await page.goto(sgPage)
  await page.getByText('Macasaquit Bible Study').click()
  await expect(page).toHaveURL(/.*macasaquit-bible-study/)
})

// YA page
test('smallgroups/YA: has title', async ({ page }) => {
  await page.goto(YAPage)
  await expect(page).toHaveTitle('FCC | Young Adults SG')
})

test('smallgroups/YA: header visible', async ({ page }) => {
  await page.goto(YAPage)
  await expect(page.getByText('FCC Young Adults Small Group.')).toBeVisible()
})

test('smallgroups/YA: YA men button visible', async ({ page }) => {
  await page.goto(YAPage)
  await expect(
    page.getByRole('link', { name: 'YA Men', exact: true })
  ).toBeVisible()
})

test('smallgroups/YA: YA women button visible', async ({ page }) => {
  await page.goto(YAPage)
  await expect(page.getByText('YA Women')).toBeVisible()
})

test('smallgroups/YA: YA men button working', async ({ page }) => {
  await page.goto(YAPage)
  await page.getByRole('link', { name: 'YA Men', exact: true }).click()
  await expect(page).toHaveURL(/.*men/)
})

test('smallgroups/YA: YA women button working', async ({ page }) => {
  await page.goto(YAPage)
  await page.getByRole('link', { name: 'YA Women', exact: true }).click()
  await expect(page).toHaveURL(/.*women/)
})
