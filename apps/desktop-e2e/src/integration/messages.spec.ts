describe('Messages', () => {
  beforeEach(() => {
    cy.exec('npm run seed:db');
    cy.login('admin@test.com', 'password');
    cy.server().route('GET', '/messages**').as('messages');
    cy.visit('/orders');
  });

  afterEach(() => {
    cy.exec('npm run clear:db');
  });

  it('should display unread messages count', () => {
    cy.wait('@messages');
    cy.get('[data-testid=unread]').should('contain.html', '2');
  });

  it('should load more messages', () => {
    cy.wait('@messages');
    cy.get('[data-testid=menu]').click();
    cy.contains('Messages').click();
    cy.get('.p-message').should('have.length', 10);
    cy.get('[data-testid=messages-list]').scrollTo('bottom');
    cy.wait('@messages');
    cy.get('.p-message').should('have.length', 12);
    cy.get('[data-testid=unread]').should('contain.html', '3');
  });

  it('should mark message as read', () => {
    cy.server().route('PATCH', '/messages/**').as('updateMessage');
    cy.wait('@messages');
    cy.get('[data-testid=menu]').click();
    cy.contains('Messages').click();
    cy.get('[data-testid=messages-list]').scrollTo('bottom');
    cy.wait('@messages');
    cy.get('[data-testid=unread]').should('contain.html', '3');
    cy.get('.status-icon:visible').first().click();
    cy.wait('@updateMessage');
    cy.get('[data-testid=unread]').should('contain.html', '2');
  });
});
