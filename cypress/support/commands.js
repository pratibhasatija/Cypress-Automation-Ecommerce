// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import PurchaseFlow from "../PageObjectModel/PurchaseFlow_POM";

Cypress.Commands.add('searchAndAddProduct', (product, addedProducts) => {
  const purchaseflow = new PurchaseFlow();

  function extractPrice(text) {
    return Number(text.replace(/\D/g, '')); // 360
  }

  function findProduct() {
    cy.get('.card-title').then(($titles) => {
      const found = [...$titles].find(el => el.innerText.trim() === product.name);

      if (found) {
        cy.wrap(found).contains(product.name).click();
        cy.get('.price-container')
          .should('be.visible')
          .invoke('text')
          .then((priceText) => {
            const price = extractPrice(priceText); //"$360 *includes tax"
            addedProducts.push({ name: product.name, price });

            purchaseflow.BtnAddToCart();
            cy.get('#nava').click(); // back to home
          });
      } 
      else {
        cy.get('#next2').then(($next) => {
          if ($next.is(':visible')) {
            cy.get('.card-title').first().invoke('text').then((firstText) => {
              cy.wrap($next).click();

              // Conditional wait
              cy.get('.card-title').first().should(($el) => {
                expect($el.text().trim()).not.to.eq(firstText.trim());
              });

              // Recurse to search the next page
              findProduct();
            });
          } else {
            // No more pages → log not found
            Cypress.log({
              name: `${product.name}`,
              message: "Product not found! Negative Test Case Successful",
            });
            cy.log(`Product "${product.name}" not found after scanning all pages. Negative Test Case Successful`);
          }
        });
      }
    });
  }

  // Start the recursive search
  findProduct();
});