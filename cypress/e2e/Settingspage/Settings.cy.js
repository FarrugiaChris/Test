const { faker } = require('@faker-js/faker');
import login from '../../support/pageObjects/loginPage/login.js';
import settings from '../../support/pageObjects/settingsPage/settings.js';

describe('User Settings functionality', () => {
  let user;

  beforeEach(() => {
    cy.loginNewUser().then((loggedInUser) => {
      user = loggedInUser;
      cy.get(settings.navSettingsButton).click();
    });
  });

  it('user updates their profile picture', () => {
    const imageUrl = faker.image.imageUrl();
    cy.get(settings.profileImg).clear().type(imageUrl);
    cy.get(settings.updatebutton).click();
    cy.get(settings.profileNavImg).should('have.attr', 'src', imageUrl);
  });

  it('user retains default profile picture when profile picture field is cleared', () => {
    cy.get(settings.profileImg).clear();
    cy.get(settings.updatebutton).click();
    const defaultImageUrl = "https://api.realworld.io/images/smiley-cyrus.jpeg";
    cy.get(settings.profileNavImg).should('have.attr', 'src', defaultImageUrl);
  });

  it('user updates their username', () => {
    const newusername = faker.internet.userName() + Date.now();
    cy.get(settings.settingsUserName).clear().type(newusername);
    cy.get(settings.updatebutton).click();
    cy.get(settings.profileUserName).should('include.text', newusername);
  });

  it('user retains username when username field is cleared', () => {
    cy.get(settings.settingsUserName).clear();
    cy.get(settings.updatebutton).click();
    cy.get(settings.profileUserName).should('include.text', user.username);
  });

  it('user adds and amends bio', () => {
    const randomBio1 = faker.lorem.paragraph();
    cy.get(settings.bioTextArea).type(randomBio1);
    cy.get(settings.updatebutton).click();
    cy.get(settings.profileBio).should('include.text', randomBio1);
    const randomBio2 = faker.lorem.paragraph();
    cy.get(settings.navSettingsButton).eq(1).click();
    cy.get(settings.bioTextArea).type(randomBio2);
    cy.get(settings.updatebutton).click();
    cy.get(settings.profileBio).should('include.text', randomBio2);
  });

  it('user updates their email', () => {
    const newEmail = faker.internet.email();
    cy.get(settings.email).clear().type(newEmail);
    cy.get(settings.updatebutton).click();
    cy.get(settings.navSettingsButton).eq(1).click();
    cy.get(settings.email).should('have.value', newEmail);
  });

  it('user retains email when email field is cleared', () => {
    cy.get(settings.email).clear();
    cy.get(settings.updatebutton).click();
    cy.get(settings.navSettingsButton).eq(1).click();
    cy.get(settings.email).should('have.value', user.email);
  });

  it('user updates their password', () => {
    const newPassword = faker.internet.password();
    cy.get(settings.password).type(newPassword);
    cy.get(settings.updatebutton).click();
    cy.get(settings.navSettingsButton).eq(1).click();
    cy.get(settings.logoutButton).click();
    cy.get(login.SignInButton).click();
    cy.get(login.loginEmail).type(user.email);
    cy.get(login.loginPassword).type(newPassword);
    cy.get(login.submitLoginButton).click();
    cy.get(login.navBarUserName).should('include.text', user.username);
  });

  it('user logs out', () => {
    cy.get(settings.logoutButton).click();
    cy.url().should('contain', 'http://angularjs.realworld')
  });

});
  


  
