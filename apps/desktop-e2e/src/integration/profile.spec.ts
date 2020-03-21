import { ERRORS } from '@deliveryapp/common';

describe('Profile page', () => {
  beforeEach(() => {
    cy.exec('npm run seed:db');
    cy.login('client@test.com', 'password');
    cy.visit('/profile');
  });

  afterEach(() => {
    cy.exec('npm run clear:db');
  });

  describe('Password form', () => {
    it('should show required errors', () => {
      cy.get('[data-testid=change-password]').click();
      cy.get('#oldPassword-error')
        .should('have.length', 1)
        .and('contain', ERRORS.REQUIRED_FIELD);
      cy.get('#newPassword-error')
        .should('have.length', 1)
        .and('contain', ERRORS.REQUIRED_FIELD);
      cy.get('#confirmPassword-error')
        .should('have.length', 1)
        .and('contain', ERRORS.REQUIRED_FIELD);
    });

    it('should show password do not match errors', () => {
      cy.get('[data-testid=oldPassword]').type('test');
      cy.get('[data-testid=newPassword]').type('test');
      cy.get('[data-testid=confirmPassword]').type('test112');
      cy.get('[data-testid=change-password]').click();

      cy.get('#confirmPassword-error')
        .should('have.length', 1)
        .and('contain', ERRORS.PASSWORDS_DO_NOT_MATCH);
    });

    it('should show server error', () => {
      cy.get('[data-testid=oldPassword]').type('test');
      cy.get('[data-testid=newPassword]').type('test');
      cy.get('[data-testid=confirmPassword]').type('test');
      cy.get('[data-testid=change-password]').click();

      cy.get('#oldPassword-error')
        .should('have.length', 1)
        .and('contain', 'INCORRECT_PASSWORD_ERR');
    });

    it('should change password successfully', () => {
      cy.get('[data-testid=oldPassword]').type('password');
      cy.get('[data-testid=newPassword]').type('password1');
      cy.get('[data-testid=confirmPassword]').type('password1');
      cy.get('[data-testid=change-password]').click();
    });
  });

  describe('Profile form', () => {
    it('should show required error', () => {
      cy.get('[data-testid=email]').clear();
      cy.get('[data-testid=save-profile]').click();
      cy.get('#email-error')
        .should('have.length', 1)
        .and('contain', ERRORS.REQUIRED_FIELD);
    });

    it('should show email error', () => {
      cy.get('[data-testid=email]').clear();
      cy.get('[data-testid=email]').type('invalid');
      cy.get('[data-testid=save-profile]').click();
      cy.get('#email-error')
        .should('have.length', 1)
        .and('contain', ERRORS.INVALID_EMAIL);
    });

    it('should show unique email error', () => {
      cy.get('[data-testid=email]').clear();
      cy.get('[data-testid=email]').type('manager@test.com');
      cy.get('[data-testid=save-profile]').click();
      cy.get('#email-error')
        .should('have.length', 1)
        .and('contain', 'UNIQUE_EMAIL_ERR');
    });

    it('should successfully update profile', () => {
      cy.get('[data-testid=firstName]').clear();
      cy.get('[data-testid=firstName]').type('Jack');
      cy.get('[data-testid=company]').type('Company');
      cy.get('#phone').type('123121212');
      cy.get('[data-testid=country]').type('Ukraine');
      cy.get('[data-testid=city]').type('Kyiv');
      cy.get('[data-testid=name]').type('The Bank');
      cy.get('#accountNumber').type('1234123412341234');
      cy.get('[data-testid=save-profile]').click();
      cy.get('[data-testid=menu]')
        .find('.username')
        .should('contain.text', 'JackDoe');
    });
  });
});
