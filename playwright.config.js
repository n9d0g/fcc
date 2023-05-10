/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  testDir: 'tests',
  fullyParallel: true,
  webServer: {
    command: 'npm run build && npm run preview',
    port: 4173,
  },
  reporter: [['html', { open: 'always' }]],
}

export default config
