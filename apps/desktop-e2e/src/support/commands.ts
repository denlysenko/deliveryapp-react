// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  interface Chainable {
    login(email: string, password: string): void;
  }
}

Cypress.Commands.add('login', (email, password) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3000/auth/login',
    body: {
      email,
      password
    }
  }).then(response => {
    window.localStorage.setItem('daAccessToken', response.body.token);
  });
});
