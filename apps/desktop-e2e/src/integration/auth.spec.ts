import { ERRORS } from '@deliveryapp/common';

describe('Auth page', () => {
  const emailField = '[data-testid=email]';
  const passwordField = '[data-testid=password]';

  beforeEach(() => {
    cy.visit('/auth');
  });

  describe('Login', () => {
    it('should display login title', () => {
      cy.get('[data-testid=title]').should('contain', 'Login');
    });

    context('not valid form', () => {
      it('should display required errors', () => {
        cy.get('[data-testid=submit]').click();
        cy.get('#email-error')
          .should('have.length', 1)
          .and('contain', ERRORS.REQUIRED_FIELD);

        cy.get('#password-error')
          .should('have.length', 1)
          .and('contain', ERRORS.REQUIRED_FIELD);
      });

      it('should display incorrect email error', () => {
        cy.get(emailField).type('incorrect-email{enter}');
        cy.get('#email-error')
          .should('have.length', 1)
          .and('contain', ERRORS.INVALID_EMAIL);
      });
    });

    context('valid form', () => {
      beforeEach(() => {
        cy.exec('npm run seed:db');
      });

      afterEach(() => {
        cy.exec('npm run clear:db');
      });

      it('should show server error', () => {
        const logins = [
          {
            email: 'user2@test.com',
            password: 'password{enter}',
            expectedError: 'INCORRECT_EMAIL_ERR'
          },
          {
            email: 'client@test.com',
            password: 'password2{enter}',
            expectedError: 'INCORRECT_PASSWORD_ERR'
          }
        ];

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        cy.wrap(logins).each((login: any) => {
          cy.get(emailField)
            .clear()
            .type(login.email);
          cy.get(passwordField)
            .clear()
            .type(login.password);

          cy.get('#error-message')
            .should('be.visible')
            .and('contain', login.expectedError);
        });
      });

      it('should login and redirect', () => {
        cy.get(emailField).type('client@test.com');
        cy.get(passwordField).type('password{enter}');
        cy.url().should('include', '/');
      });
    });
  });

  describe('Register', () => {
    beforeEach(() => {
      cy.get('[data-testid=mode-toggler]').click();
    });

    it('should have register title', () => {
      cy.get('[data-testid=title]').should('contain', 'Register');
    });

    context('not valid form', () => {
      it('should display required errors', () => {
        cy.get('[data-testid=submit]').click();
        cy.get('#email-error')
          .should('have.length', 1)
          .and('contain', ERRORS.REQUIRED_FIELD);
      });

      it('should display incorrect email error', () => {
        cy.get(emailField).type('incorrect-email{enter}');
        cy.get('#email-error')
          .should('have.length', 1)
          .and('contain', ERRORS.INVALID_EMAIL);
      });
    });

    context('valid form', () => {
      beforeEach(() => {
        cy.exec('npm run seed:db');
      });

      afterEach(() => {
        cy.exec('npm run clear:db');
      });

      it('should show server error', () => {
        cy.get(emailField).type('client@test.com');
        cy.get(passwordField).type('password{enter}');

        cy.get('#email-error')
          .should('have.length', 1)
          .and('contain', 'UNIQUE_EMAIL_ERR');
      });

      it('should register and redirect', () => {
        cy.get('[data-testid=firstName]').type('Jack');
        cy.get('[data-testid=lastName]').type('Slack');
        cy.get('[data-testid=company]').type('Company');
        cy.get('#phone').type('1231231212');
        cy.get(emailField).type('jack.slack@test.com');
        cy.get(passwordField).type('password{enter}');

        cy.url().should('include', '/');
      });
    });
  });
});
