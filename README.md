# Cypress Installation and Test Running Documentation

## Cypress Installation and first steps

1. In order to set up Cypress, we will use Node.js. If you don’t have Node.js installed already, please visit [this link](https://nodejs.org/en/download/) and download the latest version.

2. Currently, Cypress supports Node.js version 14.x/16.x/18.x and above. Please make sure to have one of the mentioned versions. In order to verify this, you can open the terminal and type `node --v`.

3. Once Node.js is installed, we are ready to start installing Cypress in our project path. Using an IDE or text editor, from the terminal, type `cd /your/project/path` (example: `cd Documents/Cypress_Project)`. Here run the following command:`npm install cypress --save-dev`.

   **Note:** Ideally, we are using an IDE or a rich text editor like VS Code.

4. After the installation, run the following command: `./node_modules/.bin/cypress open` to open the Cypress Test Runner or alternatively the short command `npx cypress open`.

5. The Cypress launchpad will open, and you will need to select E2E Testing. From here, make sure all config options are ticked and click Continue.

6. Cypress will give you the option to select from different supported browsers, and for this scenario, select Chrome and click on the Start E2E Testing in Chrome button.

7. Congratulations! Cypress is now installed and the Cypress Test Runner is ready to be used.

## Running the tests

Navigate to the root directory of your Cypress project and follow the steps below:

To run all tests for the Login page with a desktop viewport in Chrome:

```npx cypress run --browser chrome --headed --config viewportWidth=1280,viewportHeight=800 --spec "cypress/e2e/Login page/Login.cy.js"```

To run all tests for the Login page with a mobile simulator viewport in Chrome:

```npx cypress run --browser chrome --headed --config viewportWidth=375,viewportHeight=667 --spec "cypress/e2e/Login page/Login.cy.js"```

To run all tests for the Settings page with a desktop viewport in Chrome:

```npx cypress run --browser chrome --headed --config viewportWidth=1280,viewportHeight=800 --spec "cypress/e2e/Settings page/Settings.cy.js"```

To run all tests for the Settings page with a mobile simulator viewport in Chrome:

```npx cypress run --browser chrome --headed --config viewportWidth=375,viewportHeight=667 --spec "cypress/e2e/Settings page/Settings.cy.js"```

Addtional steps:

To run the commands headless amend the command with ```--headless``` instead of ```--headed```

To run both spec files simultaneously, remove the  ```--spec``` from the command

Desktop:

```npx cypress run --browser chrome --headed --config viewportWidth=1280,viewportHeight=800```

Mobile:

```npx cypress run --browser chrome --headed --config viewportWidth=375,viewportHeight=667```





