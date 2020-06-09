import { ERRORS, MESSAGES } from '@deliveryapp/common';

describe('Payments page', () => {
  beforeEach(() => {
    cy.exec('npm run seed:db');
    cy.login('manager@test.com', 'password');
    cy.server().route('GET', '/payments**').as('payments');
    cy.visit('/payments');
  });

  afterEach(() => {
    cy.exec('npm run clear:db');
  });

  describe('Filtering', () => {
    it('should filter by number', () => {
      cy.wait('@payments');
      cy.get('[data-testid=searchTerm]').type('10');
    });
  });

  describe('Sorting', () => {
    it('should sort by number', () => {
      cy.wait('@payments');
      cy.get('.id').click();
    });

    it('should sort by total', () => {
      cy.wait('@payments');
      cy.get('.total').click();
      cy.get('.total').click();
    });

    it('should sort by createdAt', () => {
      cy.wait('@payments');
      cy.get('.createdAt').click();
      cy.get('.createdAt').click();
    });
  });

  describe('Paging', () => {
    it('should paginate to next page', () => {
      cy.wait('@payments');
      cy.get('.p-paginator-next').click();
    });

    it('should paginate to last page', () => {
      cy.wait('@payments');
      cy.get('.p-paginator-last').click();
    });

    it('should paginate', () => {
      cy.wait('@payments');
      cy.get('.p-paginator-page:contains("2")').click();
    });
  });

  describe('Payment Form', () => {
    it('should show required errors', () => {
      cy.get('[data-testid=save]').click();
      cy.get('#total-error')
        .should('have.length', 1)
        .and('contain', ERRORS.REQUIRED_FIELD);
      cy.get('#dueDate-error')
        .should('have.length', 1)
        .and('contain', ERRORS.REQUIRED_FIELD);
      cy.get('#clientId-error')
        .should('have.length', 1)
        .and('contain', ERRORS.REQUIRED_FIELD);
      cy.get('#orders-error')
        .should('have.length', 1)
        .and('contain', ERRORS.REQUIRED_FIELD);
    });

    it('should fill form and create payment', () => {
      cy.server().route('GET', '/users**').as('users');
      cy.server().route('GET', '/orders**').as('orders');
      cy.get('#total').type('12');
      cy.get('#dueDate').type('12.10.2020', { force: true });
      cy.get('.p-datepicker-calendar span.p-highlight:contains("12")').click();
      cy.get('#orders input').type('4');
      cy.wait('@orders');
      cy.get('li[role=option]:contains("4")').click();
      cy.get('#client input').type('clie');
      cy.wait('@users');
      cy.get('li[role=option]:contains("clie")').click();
      cy.get('[data-testid=save]').click();
      cy.wait('@payments');
      cy.get('#id').should('not.have.value', '');
      cy.get('.p-growl').should('contain', MESSAGES.CREATE_PAYMENT_SUCCESS);
    });

    it('should update payment', () => {
      cy.get('.p-datatable-row').first().click();
      cy.get('#id').should('have.value', '13');
      cy.get('#total').clear().type('15');
      cy.get('[data-testid=save]').click();
      cy.wait('@payments');
      cy.get('#id').should('have.value', '13');
      cy.get('.p-growl').should('contain', MESSAGES.UPDATE_PAYMENT_SUCCESS);
    });

    it('should reset current payment form', () => {
      cy.get('.p-datatable-row').first().click();
      cy.get('#id').should('have.value', '13');
      cy.get('[data-testid=create-payment]').click();
      cy.get('#id').should('have.value', '');
    });
  });
});
