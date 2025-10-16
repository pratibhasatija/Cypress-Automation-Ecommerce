# Demoblaze Ecommerce - Cypress Automation
This repo contains end to end automated tests using cypress with javascript.
* Website - [Demoblaze](https://www.demoblaze.com/)
* Features Automated - Login Flow, Purchase Flow (laptop by default, can be modified)
* Smoke checks - Included


### Pre-requisites
* Node.js and NPM installation
* Visual Studio Code installation
* Install Cypress via Terminal on Visual Studio Code: npm install cypress --save -dev
* Login to Gitbash and clone this project from repo : git clone https://github.com/pratibhasatija/Cypress-Automation-Ecommerce.git
* Sign up on [Demoblaze](https://www.demoblaze.com/)

### Instruction On How To Run The Tests From Terminal
* Open the project folder downloaded from git in Visual Studio Code. View Terminal to run the commands provided in below steps.
* For headless mode : npx cypress run
* For Testrunner : npx cypress open
* To override default login credentials stored in cypress.congig.js, Run: npx cypress run --env username=yourUser,password=yourPass

### Test Approach and Test Design Process
1. Regression Checks for Login flow and Purchase flow have been prioritized for this release.
2. Customer Focused Checks - The critical paths that could be frequently used by the end users have been covered for this release.
3. Good combination of positive and negative tests have been automated.
4. Page object model has been clearly defined using the classes. Methods have been created and reused across the automation suite to reduce redundancy. 
5. Static data has been stored in fixtures to better handle parameters.

### Important Automation Checks For Release v1.0 (Created)
1. Login Flow
    * Verify Login and Logout for Valid Credentials
    * Verify Login for Invalid Username
    * Verify Login for Invalid Password
    * Verify user stays on same page when login modal is closed without logging in
2. Purchase Flow
    * Verify pagination by Next and Previous buttons is working
    * Verify Product selected, added to cart and Purchase is completed
    * Verify Delete from Cart removes the product
    * Verify that purchase is not completed if User closes the Place order modal instead of Purchase btn
3. Smoke Checks
    * Verify categories are present
    * Verify navbar tabs are present
    * Verify top image exists
    * Verify Contact modal Submit success scenario

### Important Automation Checks For Release v2.0 (Not Automated)
* Cost checks to make sure product cost is consistent across all pages.
* More flexibility in searching a product on different pages within each category.
* About us modal.
* Out of stock products handling.

### Project Folders and Structure
* cypress/
  * e2e/
    * LoginFlow.cy.js             - Login test cases
    * PurchaseFlow.cy.js          - Product add/delete/place order flow
    * SmokeChecks.cy.js           - Smoke tests (no POM, no login)
  * fixtures/
    * LoginNegativeData.json      - Sample test data (e.g. Invalid credentials)
    * PurchaseData.json           - Sample test data (e.g. product name, Order details)
  * PageObjectModel/
    * LoginFlow_POM.js            - Login-related functions
    * PurchaseFlow_POM.js         - Product interaction functions
  * support/
    * commands.js                 - Custom Cypress commands (optional)
    * e2e.js                      - Test setup
* cypress.config.js               - Project configuration, Default username password, Baseurl
* package.json                    - Project dependencies and test scripts
* package-lock.json               - Exact versions of installed packages
* README.md                       - Project documentation

### AI Usage
1.  Help in finding out how to run cypress scripts with username and password to overwrite fixture values (npx cypress run --env username=yourUser,password=yourPass).
1.  Needed help in finding out css locator of categories as there is some inconsistency on the website in category UI name and category in html elements.
1. Used for debugging as the username value was getting cut off every now and then. So used { delay: 50, force: true } in the code.
1. General error debugging a few times.
