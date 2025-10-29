import LoginPage from "../PageObjectModel/LoginFlow_POM"
const loginpage = new LoginPage();
const username = Cypress.env('username');
const password = Cypress.env('password');
let NegativeData;

describe('Demoblaze Login Flow Checks', () => {
  beforeEach( () => {
    cy.clearCookies();
    // cy.visit('/');
  });

  //save fixture data in a variable to use later for negative checks
  before(() =>{
    cy.fixture('LoginNegativeData').then((data) => {
      NegativeData = data;
    });
  });

  //Positive login flow
  it('Verify Login and Logout for Valid Credentials', () => {
    loginpage.Login();
    // cy.wait(3000);
    loginpage.VerifyValidLogin(username);
    loginpage.Logout();
  });

  //Negative login flow - Invalid user
  it("Verify Login for Invalid Username", () => {
    const wronguser = NegativeData[0];
    loginpage.Login(wronguser.username, wronguser.password);
    // cy.wait(3000); 
    loginpage.VerifyInvalidLogin(wronguser.messagetext);
  });

  //Negative login flow - Invalid password
  it("Verify Login for Invalid Password", () => {
    const wronguser = NegativeData[1];
    loginpage.Login(wronguser.username, wronguser.password);
    // cy.wait(3000); 
    loginpage.VerifyInvalidLogin(wronguser.messagetext);
  });

  it('Verify user stays on same page when login modal is closed without logging in', () => {
    loginpage.VisitURL();
    loginpage.ClickLoginLink();
    loginpage.InputUserName(username);
    loginpage.InputPassword(password);
    loginpage.CloseLoginModal();
    cy.get('#nameofuser').should('not.be.visible');
});


});
