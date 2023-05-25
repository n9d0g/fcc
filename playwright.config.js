/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  testDir: 'tests',
  fullyParallel: true,
  webServer: {
    command: 'pnpm build && pnpm preview',
    port: 4173,
  },
  reporter: [['html', { open: 'always' }]],
}

export default config
