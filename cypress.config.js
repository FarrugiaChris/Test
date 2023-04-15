const { defineConfig } = require("cypress");

module.exports = defineConfig({

  e2e: {
    "baseUrl": "http://angularjs.realworld.io/#/"
  },
});
