import { MESSAGES } from '@deliveryapp/common';

describe('Settings Page', () => {
  beforeEach(() => {
    cy.exec('npm run seed:db');
    cy.login('admin@test.com', 'password');
    cy.server().route('GET', '/settings/address').as('address');
    cy.server().route('GET', '/settings/bank-details').as('bankDetails');
    cy.visit('/settings');
  });

  afterEach(() => {
    cy.exec('npm run clear:db');
  });

  describe('Address Form', () => {
    it('should create/update address', () => {
      cy.server().route('POST', '/settings/address').as('createAddress');
      cy.server().route('PATCH', '/settings/address/**').as('updateAddress');

      cy.wait('@address');
      cy.wait('@bankDetails');

      cy.get('[data-testid=country]').type('Country');
      cy.get('[data-testid=city]').type('City');
      cy.get('[data-testid=street]').type('Street');
      cy.get('[data-testid=house]').type('12');

      cy.get('[data-testid=save]').click();

      cy.wait('@createAddress');

      cy.get('.p-growl').should('contain', MESSAGES.CREATE_ADDRESS_SUCCESS);

      cy.get('[data-testid=country]').clear().type('Updated Country');

      cy.get('[data-testid=save]').click();

      cy.wait('@updateAddress');

      cy.get('.p-growl').should('contain', MESSAGES.UPDATE_ADDRESS_SUCCESS);
    });
  });

  describe('BankDetails Form', () => {
    it('should create/update bank details', () => {
      cy.server()
        .route('POST', '/settings/bank-details')
        .as('createBankDetails');
      cy.server()
        .route('PATCH', '/settings/bank-details/**')
        .as('updateBankDetails');

      cy.wait('@address');
      cy.wait('@bankDetails');

      cy.get('.p-tabview-title:contains("Bank Details")').click();

      cy.get('[data-testid=name]').type('Bank Name');
      cy.get('#accountNumber').type('1231231231231231');
      cy.get('#bin').type('1234445');
      cy.get('#swift').type('12312312');

      cy.get('[data-testid=save]').click();

      cy.wait('@createBankDetails');

      cy.get('.p-growl').should(
        'contain',
        MESSAGES.CREATE_BANK_DETAILS_SUCCESS
      );

      cy.get('[data-testid=name]').clear().type('Updated');

      cy.get('[data-testid=save]').click();

      cy.wait('@updateBankDetails');

      cy.get('.p-growl').should(
        'contain',
        MESSAGES.UPDATE_BANK_DETAILS_SUCCESS
      );
    });
  });
});
