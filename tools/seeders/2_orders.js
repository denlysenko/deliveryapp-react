'use strict';

module.exports = {
  up: function(queryInterface) {
    return queryInterface.bulkInsert(
      'orders',
      [
        {
          id: 1,
          cityFrom: 'Kyiv',
          cityTo: 'Dnipro',
          addressFrom: 'From, 12',
          addressTo: 'To, 1',
          cargoName: 'Computers',
          additionalData: '',
          comment: '',
          cargoWeight: 12,
          senderName: '',
          senderCompany: '',
          senderEmail: 'cy.sender@email.com',
          senderPhone: '(123) 121-1212',
          status: 0,
          paid: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          creatorId: 1,
          clientId: 1
        }
      ],
      {}
    );
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete(
      'orders',
      {
        senderEmail: {
          [Sequelize.Op.in]: ['cy.sender@email.com']
        }
      },
      {}
    );
  }
};
