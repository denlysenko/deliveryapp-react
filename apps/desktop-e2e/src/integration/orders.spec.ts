describe('Create order page', () => {
  beforeEach(() => {
    cy.exec('npm run seed:db');
    cy.login('client@test.com', 'password');
    cy.server().route('GET', '/orders**').as('orders');
    cy.visit('/orders');
  });

  afterEach(() => {
    cy.exec('npm run clear:db');
  });

  describe('Filtering', () => {
    it('should filter by number', () => {
      cy.wait('@orders');
      cy.get('[data-testid=searchTerm]').type('10');
    });

    it('should filter by cargo name', () => {
      cy.wait('@orders');
      cy.contains('Cargo Name').click({ force: true });
      cy.get('[data-testid=searchTerm]').type('comp');
    });

    it('should filter by cityFrom', () => {
      cy.wait('@orders');
      cy.contains('From').click({ force: true });
      cy.get('[data-testid=searchTerm]').type('kyi');
    });

    it('should filter by cityTo', () => {
      cy.wait('@orders');
      cy.contains('To').click({ force: true });
      cy.get('[data-testid=searchTerm]').type('berl');
    });
  });

  describe('Sorting', () => {
    it('should sort by number', () => {
      cy.wait('@orders');
      cy.get('.id').click();
    });

    it('should sort by name', () => {
      cy.wait('@orders');
      cy.get('.cargoName').click();
      cy.get('.cargoName').click();
    });

    it('should sort by cityFrom', () => {
      cy.wait('@orders');
      cy.get('.cityFrom').click();
      cy.get('.cityFrom').click();
    });

    it('should sort by cityTo', () => {
      cy.wait('@orders');
      cy.get('.cityTo').click();
      cy.get('.cityTo').click();
    });
  });

  describe('Paging', () => {
    it('should paginate to next page', () => {
      cy.wait('@orders');
      cy.get('.p-paginator-next').click();
    });

    it('should paginate to last page', () => {
      cy.wait('@orders');
      cy.get('.p-paginator-last').click();
    });

    it('should paginate', () => {
      cy.wait('@orders');
      cy.get('.p-paginator-page:contains("2")').click();
    });
  });

  describe('Update order page navigation', () => {
    it('should navigate to order page', () => {
      cy.wait('@orders');
      cy.get('a:contains("12")').click();
      cy.url().should('contain', '/orders/12');
    });
  });

  describe('Create order page navigation', () => {
    it('should navigate to create order page', () => {
      cy.wait('@orders');
      cy.get('button:contains("Create order")').click();
      cy.url().should('contain', '/orders/create');
    });
  });
});
