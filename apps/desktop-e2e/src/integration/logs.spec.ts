describe('Logs Page', () => {
  beforeEach(() => {
    cy.exec('npm run seed:db');
    cy.login('admin@test.com', 'password');
    cy.server().route('GET', '/logs**').as('logs');
    cy.visit('/logs');
  });

  afterEach(() => {
    cy.exec('npm run clear:db');
  });

  describe('Filtering', () => {
    it('should filter by action', () => {
      cy.wait('@logs');
      cy.contains('Registration').click({ force: true });
    });
  });

  describe('Sorting', () => {
    it('should sort by createdAt', () => {
      cy.wait('@logs');
      cy.get('.createdAt').click();
    });
  });

  describe('Paging', () => {
    it('should paginate to next page', () => {
      cy.wait('@logs');
      cy.get('.p-paginator-next').click();
    });

    it('should paginate to last page', () => {
      cy.wait('@logs');
      cy.get('.p-paginator-last').click();
    });

    it('should paginate', () => {
      cy.wait('@logs');
      cy.get('.p-paginator-page:contains("2")').click();
    });
  });
});
