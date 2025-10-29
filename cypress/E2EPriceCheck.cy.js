import PurchaseFlow from '../PageObjectModel/PurchaseFlow_POM';

const purchaseFlow = new PurchaseFlow();

describe('Verify Price Check and dynamic pagination search', () => {
  let products = [];
  let user = {};
  let addedProducts = [];

  before(() => {
    cy.fixture('E2EPriceCheck.json').then((data) => {
      products = data.order.products;
      user = data.order.user;
    });
  });

  it('searches for products across all pages, adds to cart, validates prices, and completes purchase', () => {
    cy.visit('/');

    // Step 1: Loop through each product and add to cart
    cy.wrap(products).each((product) => {
      // purchaseFlow.selectCategory(product.category);
      cy.searchAndAddProduct(product, addedProducts);
    });

    // Step 2: Go to cart and validate individual product prices
    purchaseFlow.GoToCart();
    let expectedTotal = 0;

    cy.wrap(addedProducts).each(({ name, price }) => {
      cy.contains('tr', name).find('td:nth-child(3)').invoke('text').then((cartPriceText) => {
        const cartPrice = Number(cartPriceText);
        expect(cartPrice).to.equal(price);
        expectedTotal += cartPrice;
      });
    }).then(() => {
      // Step 3: Validate total price in cart
      cy.get('#totalp').should('have.text', `${expectedTotal}`);

      // Step 4: Place the order and confirm total in success message
      cy.get('button').contains('Place Order').click();
      cy.get('#name').type(user.name, { delay: 50, force: true });
      cy.get('#country').type(user.country, { delay: 50, force: true });
      cy.get('#city').type(user.city, { delay: 50, force: true });
      cy.get('#card').type(user.creditcard, { delay: 50, force: true });
      cy.get('#month').type(user.month, { delay: 50, force: true });
      cy.get('#year').type(user.year, { delay: 50, force: true });
      // cy.wait(2000); //update -> Removed wait

      cy.get('button').contains('Purchase').click();
      // cy.wait(2000); //update -> Removed wait

      // Step 5: Validate total amount in confirmation alert
      cy.get('.sweet-alert > p').invoke('text').then((text) => {
        const match = text.match(/Amount:\s*(\d+)/); //Amount: 360 USD 
        expect(match).to.not.be.null;
        const confirmedAmount = Number(match[1]); //360
        expect(confirmedAmount).to.equal(expectedTotal);
        cy.wait(500); //Update -> Needed due to animated UI maybe
        cy.get('.confirm').should('be.visible').should('not.be.disabled').click(); //update -> assertions added
      });

    });

  });
});