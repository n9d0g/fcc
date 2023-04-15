/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  webServer: {
    command: 'npm run build && npm run preview',
    port: 4173,
  },
  reporter: [['html', { open: 'always' }]],
}

export default config
