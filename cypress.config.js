const { defineConfig } = require('cypress')

module.exports = defineConfig({
  defaultCommandTimeout: 10000,
  e2e: {
    baseUrl: 'https://notes-serverless-app.com',
    env: {
      defaultCommandTimeout: 10000,
      hideCredentials: true,
      requestMode: true,
      viewportWidthBreakpoint: 768,
    },
    experimentalRunAllSpecs: true,
  },
  video: false,
  chromeWebSecurity: false
})