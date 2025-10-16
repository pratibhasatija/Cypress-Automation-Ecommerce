class PurchaseFlow {
    selectCategory(categoryname) {
        cy.contains('a', categoryname).click();
    }

    selectProduct(productname) {
        cy.contains('.card-title', productname).click();
    }

    BtnAddToCart() {
        cy.get('.btn-success').contains('Add to cart').click();
        cy.on('window:alert', (t) => {
            expect(t).to.include('Product added');
        });
    }

    GoToCart() {
        cy.get('#cartur').click();
    }

    placeOrderPurchase(orderDetails) {
        cy.get('button').contains('Place Order').click();
        cy.get('#name').type(orderDetails.name, { delay: 50, force: true });
        cy.get('#country').type(orderDetails.country, { delay: 50, force: true });
        cy.get('#city').type(orderDetails.city, { delay: 50, force: true });
        cy.get('#card').type(orderDetails.creditcard, { delay: 50, force: true });
        cy.get('#month').type(orderDetails.month, { delay: 50, force: true });
        cy.get('#year').type(orderDetails.year, { delay: 50, force: true });
        cy.wait(2000);

        cy.get('button').contains('Purchase').click();
        cy.wait(2000);

        cy.get('.sweet-alert').should('be.visible');
        cy.get('.sweet-alert h2').should('contain.text', 'Thank you for your purchase!');
        cy.wait(2000);
        cy.get('.confirm').click();
    }

    placeOrderClose() {
        cy.wait(1000);
        cy.get('button').contains('Place Order').click();
        cy.wait(2000);
        cy.get('#orderModal .modal-footer button').contains('Close').click();
        cy.wait(1000);
    }
}

export default PurchaseFlow;