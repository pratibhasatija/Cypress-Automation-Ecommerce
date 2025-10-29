class LoginPage {
    
    VisitURL() {
        cy.visit('/');
    }
    
    ClickLoginLink() {
        cy.get('#login2').click();
        cy.get('#logInModal').should('be.visible');
        cy.get('#loginusername').should('be.visible');
        cy.get('#loginpassword').should('be.visible');
    }
    
    InputUserName(username) {
        cy.get('#loginusername').should('be.visible').clear().type(username, { delay: 50, force: true });
        cy.log(username)
    }
    
    InputPassword(password) {
        cy.get('#loginpassword').clear().type(password, { delay: 50, force: true });
    }
    
    ClickSubmit() {
        // cy.wait(2000); //Update -> wait condition removed
        cy.get('button[onclick="logIn()"]').should('be.visible').click(); //Update -> added should assertion
    }
    
    Login(username = Cypress.env('username'), password=Cypress.env('password')) {
        this.VisitURL();
        this.ClickLoginLink();
        this.InputUserName(username);
        this.InputPassword(password);
        this.ClickSubmit();
    }
    
    VerifyValidLogin(username) {
        cy.get('#nameofuser').should('be.visible').and('contain', `Welcome ${username}`);
    }

    VerifyInvalidLogin(messagetext) {
        cy.on('window:alert', (varmessage) => {
            expect(varmessage).to.be.eq(messagetext);
        });
    }

    Logout() {
        cy.get('#logout2').should('be.visible').click();
        cy.get('#login2').should('be.visible');
    }

    CloseLoginModal() {
        cy.get('#logInModal .btn-secondary').click(); // Close button in modal
}
}

export default LoginPage;
