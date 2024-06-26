const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: '95bkg6',
  requestTimeout: 10000,
  defaultCommandTimeout: 10000,
  e2e: {
    baseUrl: 'https://notes-serverless-app.com',
    env: {
      hideCredentials: true,
      requestMode: true,
      viewportWidthBreakpoint: 768,
    },
    setupNodeEvents(on, config) {
      require('@cypress/grep/src/plugin')(config)
      return config
    },
    experimentalRunAllSpecs: true,
  },
  video: false,
  chromeWebSecurity: false
})