import { ERRORS } from '@deliveryapp/common';

const fillDestinationForm = () => {
  cy.get('[data-testid=cityFrom]').type('City From');
  cy.get('[data-testid=cityTo]').type('City To');
  cy.get('[data-testid=addressFrom]').type('Address From');
  cy.get('[data-testid=addressTo]').type('Address From');
};

const fillCargoForm = () => {
  cy.get('[data-testid=cargoName]').type('Cargo Name');
  cy.get('#cargoWeight').type('8');
};

const fillSenderForm = () => {
  cy.get('[data-testid=senderEmail]').type('cy.sender@email.com');
  cy.get('#senderPhone').type('1231231212');
};

describe('Create order page', () => {
  beforeEach(() => {
    cy.exec('npm run seed:db');
    cy.login('client@test.com', 'password');
    cy.visit('/orders/create');
  });

  afterEach(() => {
    cy.exec('npm run clear:db');
  });

  describe('Destination', () => {
    it('should show required errors', () => {
      cy.get('[data-testid=next]').click();
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
    });

    it('should go to Cargo', () => {
      fillDestinationForm();
      cy.get('[data-testid=next]').click();
      cy.get('.p-steps-current').should('contain.html', 'Cargo');
    });

    describe('client field', () => {
      beforeEach(() => {
        cy.login('manager@test.com', 'password');
        cy.visit('/orders/create');
      });

      it('should show required errors', () => {
        cy.get('[data-testid=next]').click();
        cy.get('#clientId-error')
          .should('have.length', 1)
          .and('contain', ERRORS.REQUIRED_FIELD);
      });

      it('should request client by email and fill the field', () => {
        cy.server().route('GET', '/users**').as('users');
        cy.get('[data-testid=next]').click();
        cy.get('#clientId-error')
          .should('have.length', 1)
          .and('contain', ERRORS.REQUIRED_FIELD);
        cy.get('.p-autocomplete > input').type('cli');
        cy.wait('@users');
        cy.get('li[role=option]').click();
        cy.get('#clientId-error').should('have.length', 0);
      });
    });
  });

  describe('Cargo', () => {
    beforeEach(() => {
      fillDestinationForm();
      cy.get('[data-testid=next]').click();
    });

    it('should show required errors', () => {
      cy.get('[data-testid=next]').click();
      cy.get('#cargoName-error')
        .should('have.length', 1)
        .and('contain', ERRORS.REQUIRED_FIELD);
      cy.get('#cargoWeight-error')
        .should('have.length', 1)
        .and('contain', ERRORS.NUMBER_FIELD);
    });

    it('should go to Destination', () => {
      cy.get('[data-testid=back]').click();
      cy.get('.p-steps-current').should('contain.html', 'Destination');
    });

    it('should go to Cargo', () => {
      fillCargoForm();
      cy.get('[data-testid=next]').click();
      cy.get('.p-steps-current').should('contain.html', 'Sender');
    });
  });

  describe('Sender', () => {
    beforeEach(() => {
      fillDestinationForm();
      cy.get('[data-testid=next]').click();
      fillCargoForm();
      cy.get('[data-testid=next]').click();
    });

    it('should show required errors', () => {
      cy.get('[data-testid=create]').click();
      cy.get('#senderPhone-error')
        .should('have.length', 1)
        .and('contain', ERRORS.REQUIRED_FIELD);
      cy.get('#senderEmail-error')
        .should('have.length', 1)
        .and('contain', ERRORS.REQUIRED_FIELD);
    });

    it('should show invalid email error', () => {
      cy.get('[data-testid=senderEmail]').type('invalid');
      cy.get('[data-testid=create]').click();
      cy.get('#senderEmail-error')
        .should('have.length', 1)
        .and('contain', ERRORS.INVALID_EMAIL);
    });

    it('should go to Cargo', () => {
      cy.get('[data-testid=back]').click();
      cy.get('.p-steps-current').should('contain.html', 'Cargo');
    });

    it('should create order', () => {
      fillSenderForm();
      cy.get('[data-testid=create]').click();
      cy.url().should('include', '/orders');
    });

    it('should go to Destination and show error', () => {
      cy.server().route({
        method: 'POST',
        url: 'http://localhost:3000/orders',
        status: 422,
        response: {}
      });

      fillSenderForm();
      cy.get('[data-testid=create]').click();

      cy.get('.p-steps-current').should('contain.html', 'Destination');
      cy.get('.p-growl').should('contain.html', ERRORS.CREATE_ORDER_FAILED);
    });
  });
});
