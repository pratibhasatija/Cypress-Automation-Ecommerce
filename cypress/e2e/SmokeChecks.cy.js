
describe('Demoblaze Quick Smoke Checks', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Verify categories are present', () => {
    // Verify left sidebar categories
    cy.get('.list-group').within(() => {
      cy.contains('Phones').should('exist');
      cy.contains('Laptops').should('exist');
      cy.contains('Monitors').should('exist');
    });
})

  it('Verify navbar tabs are present', () => {
    // Verify navbar tabs are present
      cy.get('.navbar-nav').within(() => {
      cy.contains('Home').should('exist');
      cy.contains('Contact').should('exist');
      cy.contains('About us').should('exist');
      cy.contains('Cart').should('exist');
      cy.contains('Log in').should('exist');
      cy.contains('Sign up').should('exist');
    });
})

  it('Verify top image exists', () => {
    cy.get('.carousel-item.active img').should('exist').and('be.visible');
  })

  it('Verify Contact modal Submit success scenario', () => {
    cy.get('a[data-target="#exampleModal"]').click();
    cy.get('#exampleModal').should('be.visible');

    cy.get('#recipient-email').type('test@example.com');
    cy.get('#recipient-name').type('Tester');
    cy.get('#message-text').type('This is a contact test.');

    cy.contains('Send message').click();

    cy.on('window:alert', (t) => {
      expect(t).to.contains('Thanks for the message');
    });
    cy.wait(2000);
  });

});