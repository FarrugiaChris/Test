import login from '../../support/pageObjects/loginPage/login.js';

describe('User Login functionality', () => {
  let user;

  beforeEach(() => {
    cy.generateUser().then((generatedUser) => {
      user = generatedUser;
      cy.visit('/');
      cy.get(login.SignInButton).click();
    });
  });

  it('user logs in successfully with valid credentials', () => {
    cy.get(login.loginEmail).type(user.email);
    cy.get(login.loginPassword).type(user.password);
    cy.get(login.submitLoginButton).click();
    cy.get(login.navBarUserName).should('include.text', user.username);
  });

  it('displays an error message when the user enters an incorrect email during login', () => {
    cy.get(login.loginEmail).type('invalidemail@test.com');
    cy.get(login.loginPassword).type(user.password);
    cy.get(login.submitLoginButton).click();
    cy.get(login.loginError).should('include.text', 'email or password is invalid');
  });

  it('displays an error message when the user enters an incorrect password during login', () => {
    cy.get(login.loginEmail).type(user.email);
    cy.get(login.loginPassword).type('invalidpassword');
    cy.get(login.submitLoginButton).click();
    cy.get(login.loginError).should('include.text', 'email or password is invalid');
  });

  it('is case-sensitive for the password field during login', () => {
    cy.get(login.loginEmail).type(user.email);
    cy.get(login.loginPassword).type(user.password.toUpperCase());
    cy.get(login.submitLoginButton).click();
    cy.get(login.loginError).should('include.text', 'email or password is invalid');
  });

  it('requires a non-blank email field during login', () => {
    cy.get(login.loginPassword).type(user.password);
    cy.get(login.submitLoginButton).click();
    cy.get(login.loginError).should('include.text', "email can't be blank");
  });

  it('requires a non-blank password field during login', () => {
    cy.get(login.loginEmail).type(user.email);
    cy.get(login.submitLoginButton).click();
    cy.get(login.loginError).should('include.text', "password can't be blank");
  });
});