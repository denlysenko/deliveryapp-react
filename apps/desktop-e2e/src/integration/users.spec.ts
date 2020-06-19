import { ERRORS, MESSAGES } from '@deliveryapp/common';

describe('Users page', () => {
  beforeEach(() => {
    cy.exec('npm run seed:db');
    cy.login('admin@test.com', 'password');
    cy.server().route('GET', '/users**').as('users');
    cy.visit('/users');
  });

  afterEach(() => {
    cy.exec('npm run clear:db');
  });

  describe('Filtering', () => {
    it('should filter by id', () => {
      cy.wait('@users');
      cy.get('[data-testid=searchTerm]').type('10');
    });

    it('should filter by email', () => {
      cy.wait('@users');
      cy.get('.p-dropdown-item:contains("Email")').click({ force: true });
      cy.get('[data-testid=searchTerm]').type('adm');
    });

    it('should filter by firstName', () => {
      cy.wait('@users');
      cy.get('.p-dropdown-item:contains("First Name")').click({ force: true });
      cy.get('[data-testid=searchTerm]').type('joe');
    });

    it('should filter by lastName', () => {
      cy.wait('@users');
      cy.get('.p-dropdown-item:contains("Last Name")').click({ force: true });
      cy.get('[data-testid=searchTerm]').type('sch');
    });
  });

  describe('Sorting', () => {
    it('should sort by id', () => {
      cy.wait('@users');
      cy.get('.id').click();
    });

    it('should sort by email', () => {
      cy.wait('@users');
      cy.get('.email').click();
      cy.get('.email').click();
    });

    it('should sort by firstName', () => {
      cy.wait('@users');
      cy.get('.firstName').click();
      cy.get('.firstName').click();
    });

    it('should sort by lastName', () => {
      cy.wait('@users');
      cy.get('.lastName').click();
      cy.get('.lastName').click();
    });

    it('should sort by createdAt', () => {
      cy.wait('@users');
      cy.get('.createdAt').click();
      cy.get('.createdAt').click();
    });
  });

  describe('Paging', () => {
    it('should paginate to next page', () => {
      cy.wait('@users');
      cy.get('.p-paginator-next').click();
    });

    it('should paginate to last page', () => {
      cy.wait('@users');
      cy.get('.p-paginator-last').click();
    });

    it('should paginate', () => {
      cy.wait('@users');
      cy.get('.p-paginator-page:contains("2")').click();
    });
  });

  describe('User Form', () => {
    it('should show required errors', () => {
      cy.get('[data-testid=save]').click();
      cy.get('#email-error')
        .should('have.length', 1)
        .and('contain', ERRORS.REQUIRED_FIELD);
      cy.get('#password-error')
        .should('have.length', 1)
        .and('contain', ERRORS.REQUIRED_FIELD);
    });

    it('should show email error', () => {
      cy.get('[data-testid=email]').type('test');
      cy.get('[data-testid=save]').click();
      cy.get('#email-error')
        .should('have.length', 1)
        .and('contain', ERRORS.INVALID_EMAIL);
    });

    it('should show unique email error', () => {
      cy.get('[data-testid=email]').type('manager@test.com');
      cy.get('[data-testid=password]').type('password');
      cy.get('[data-testid=save]').click();
      cy.get('#email-error')
        .should('have.length', 1)
        .and('contain', 'UNIQUE_EMAIL_ERR');
    });

    it('should fill form and create user', () => {
      cy.get('[data-testid=email]').type('test@test.com');
      cy.get('[data-testid=firstName]').type('First Name');
      cy.get('[data-testid=lastName]').type('Last Name');
      cy.get('[data-testid=password]').type('password');
      cy.get('[data-testid=save]').click();
      cy.wait('@users');
      cy.get('#id').should('not.have.value', '');
      cy.get('.p-growl').should('contain', MESSAGES.CREATE_USER_SUCCESS);
    });

    it('should update user', () => {
      cy.get('.p-datatable-row').first().click();
      cy.get('#id').should('have.value', '13');
      cy.get('[data-testid=firstName]').clear().type('New First Name');
      cy.get('[data-testid=save]').click();
      cy.wait('@users');
      cy.get('#id').should('have.value', '13');
      cy.get('.p-growl').should('contain', MESSAGES.UPDATE_USER_SUCCESS);
    });

    it('should reset current user form', () => {
      cy.get('.p-datatable-row').first().click();
      cy.get('#id').should('have.value', '13');
      cy.get('[data-testid=create-user]').click();
      cy.get('#id').should('have.value', '');
    });
  });
});
