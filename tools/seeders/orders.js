'use strict';

module.exports = {
  up: function(queryInterface) {
    return Promise.resolve();
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
