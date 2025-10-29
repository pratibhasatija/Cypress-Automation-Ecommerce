const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl : 'https://www.demoblaze.com/',
    env: {
      username : 'gandalf01',
      password : 'Test1234'
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    retries: 2,
  },
});
