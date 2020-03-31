import { ERRORS, MESSAGES } from '@deliveryapp/common';

describe('Update order page', () => {
  beforeEach(() => {
    cy.exec('npm run seed:db');
  });

  afterEach(() => {
    cy.exec('npm run clear:db');
  });

  describe('Validation', () => {
    beforeEach(() => {
      cy.login('client@test.com', 'password');
      cy.visit('/orders/1');
    });

    it('should show required errors', () => {
      cy.get('[data-testid=cargoName]').clear();
      cy.get('[name=cargoWeight]').clear();
      cy.get('[data-testid=cityFrom]').clear();
      cy.get('[data-testid=cityTo]').clear();
      cy.get('[data-testid=addressFrom]').clear();
      cy.get('[data-testid=addressTo]').clear();
      cy.get('[data-testid=senderEmail]').clear();
      cy.get('#senderPhone').clear();

      cy.get('[data-testid=save]').click();

      cy.get('#cityFrom-error')
        .should('have.length', 1)
        .and('contain', ERRORS.REQUIRED_FIELD);
      cy.get('#cityTo-error')
        .should('have.length', 1)
        .and('contain', ERRORS.REQUIRED_FIELD);
      cy.get('#addressFrom-error')
        .should('have.length', 1)
        .and('contain', ERRORS.REQUIRED_FIELD);
      cy.get('#addressTo-error')
        .should('have.length', 1)
        .and('contain', ERRORS.REQUIRED_FIELD);
      cy.get('#cargoName-error')
        .should('have.length', 1)
        .and('contain', ERRORS.REQUIRED_FIELD);
      cy.get('#cargoWeight-error')
        .should('have.length', 1)
        .and('contain', ERRORS.NUMBER_FIELD);
      cy.get('#senderPhone-error')
        .should('have.length', 1)
        .and('contain', ERRORS.REQUIRED_FIELD);
      cy.get('#senderEmail-error')
        .should('have.length', 1)
        .and('contain', ERRORS.REQUIRED_FIELD);
    });

    it('should show email error', () => {
      cy.get('[data-testid=senderEmail]')
        .clear()
        .type('invalid');
      cy.get('[data-testid=save]').click();
      cy.get('#senderEmail-error')
        .should('have.length', 1)
        .and('contain', ERRORS.INVALID_EMAIL);
    });
  });

  describe('Role CLIENT', () => {
    beforeEach(() => {
      cy.login('client@test.com', 'password');
      cy.visit('/orders/1');
    });

    it('should disable unallowed fields', () => {
      cy.get('[name=deliveryCosts]').should('be.disabled');
      cy.get('#paid input').should('be.disabled');
      cy.get('[name=paymentDate]').should('be.disabled');
      cy.get('[name=invoiceId]').should('be.disabled');
      cy.get('#status input').should('be.disabled');
      cy.get('[name=deliveryDate]').should('be.disabled');
    });
  });

  describe('Submitting', () => {
    beforeEach(() => {
      cy.login('client@test.com', 'password');
      cy.visit('/orders/1');
    });

    it('should submit updated order', () => {
      cy.get('[data-testid=senderCompany]').type('Sender Company');
      cy.get('[data-testid=senderName]').type('Sender Name');
      cy.get('[data-testid=additionalData]').type('Additional Data');

      cy.get('[data-testid=save]').click();

      cy.get('.p-growl').should('contain', MESSAGES.UPDATE_ORDER_SUCCESS);
    });
  });

  describe('Back', () => {
    beforeEach(() => {
      cy.login('client@test.com', 'password');
      cy.visit('/orders/1');
    });

    it('should navigate back', () => {
      cy.get('[data-testid=back]').click();
      cy.url().should('contain', 'about:blank');
    });
  });
});
