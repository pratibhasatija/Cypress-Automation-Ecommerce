import LoginPage from "../PageObjectModel/LoginFlow_POM";
import PurchaseFlow from "../PageObjectModel/PurchaseFlow_POM";

const username = Cypress.env('username');
const password = Cypress.env('password');

const loginpage = new LoginPage();
const purchaseflow = new PurchaseFlow();

let orderdetail

describe('Demoblaze Purchase Flow Checks', () => {
    
    beforeEach(() => {
        cy.clearCookies();
        loginpage.Login();
        cy.wait(3000);
        loginpage.VerifyValidLogin(username);
    })

    beforeEach(() => {
        cy.fixture('PurchaseData.json').then((data) => {
            orderdetail = data
        });
    })

    it('Verify pagination by Next and Previous buttons is working', () => {
        purchaseflow.selectCategory(orderdetail.categoryname);
        cy.wait(1000);
        cy.get('.card-title>a').first().invoke('text').then((PageOneTitleOne) => {            
            cy.get('#next2').click();
            cy.wait(1000);
            cy.get('.card-title>a').first().invoke('text').then((PageTwoTitleOne) => {
                expect(PageOneTitleOne.trim()).not.to.equal(PageTwoTitleOne.trim());
            })

        })
    })

    it('Verify Product selected, added to cart and Purchase is completed', () => {
        purchaseflow.selectCategory(orderdetail.categoryname);
        purchaseflow.selectProduct(orderdetail.productname);
        purchaseflow.BtnAddToCart();
        purchaseflow.GoToCart();
        purchaseflow.placeOrderPurchase(orderdetail.orderDetails);
        cy.wait(3000);
        loginpage.Logout();

    })

    it ('Verify Delete from Cart removes the product', () => {
        purchaseflow.selectCategory(orderdetail.categoryname);
        purchaseflow.selectProduct(orderdetail.productname);
        purchaseflow.BtnAddToCart();
        purchaseflow.GoToCart();
        cy.contains('td', orderdetail.productname).should('exist');
        cy.contains('td a', 'Delete').click();
        cy.wait(1000);
        cy.contains('td', orderdetail.productname).should('not.exist');
    })

    it ('Verify that purchase is not completed if User closes the Place order modal instead of Purchase btn', () => {
        purchaseflow.selectCategory(orderdetail.categoryname);
        purchaseflow.selectProduct(orderdetail.productname);
        purchaseflow.BtnAddToCart();
        purchaseflow.GoToCart();
        cy.contains('td', orderdetail.productname).should('exist');
        purchaseflow.placeOrderClose();
        cy.contains('td', orderdetail.productname).should('exist');

    })
})