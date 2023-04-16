const { faker } = require('@faker-js/faker'); // is used in order to generate test data for account creation

Cypress.Commands.add('generateUser', () => {
  const email = Date.now() + faker.internet.email();
  const password = faker.internet.password();
  const username = faker.internet.userName() + Date.now();

  cy.request('POST', 'https://conduit.productionready.io/api/users', {
    user: {
      username: username,
      email: email,
      password: password
    }
  }).then((response) => {
    const user = response.body.user;
    user.password = password;
    return user;
  });
});

Cypress.Commands.add('loginNewUser', () => {
  cy.generateUser().then((user) => {
    cy.request('POST', 'https://conduit.productionready.io/api/users/login', {
      user: {
        email: user.email,
        password: user.password
      }
    }).then((response) => {
      const token = response.body.user.token;
      cy.visit('/', {
        onBeforeLoad: (win) => {
          win.localStorage.setItem('jwtToken', token);
        }
      });
      cy.wrap(user); 
    });
  });
});
