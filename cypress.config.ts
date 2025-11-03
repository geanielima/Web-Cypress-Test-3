import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'https://the-internet.herokuapp.com',
    specPattern: 'cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}',
    fixturesFolder: 'cypress/fixtures',
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',
    downloadsFolder: 'cypress/downloads',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    pageLoadTimeout: 30000,
    video: true,
    screenshotOnRunFailure: true,
    chromeWebSecurity: false,
    experimentalStudio: true,
    setupNodeEvents(on, config) {
      on('task', {
        log(message) {
          console.log(message)
          return null
        },
      })
      return config
    },
  },
  component: {
    specPattern: 'src/**/*.{cy,spec}.{js,jsx,ts,tsx}',
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
  },
  retries: {
    runMode: 2,
    openMode: 0,
  },
  env: {},
})