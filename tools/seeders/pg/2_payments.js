'use strict';

function generateRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generatePayments() {
  const payments = [];

  for (let i = 0; i < 13; i++) {
    const payment = {
      id: i + 1,
      method: Math.floor(Math.random() * 2) + 1,
      status: Boolean(Math.floor(Math.random() * 2)),
      total: generateRandomInt(1, 30),
      dueDate: new Date(),
      clientId: 1,
      paymentAmount: null,
      paymentDate: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      creatorId: 2
    };

    payments.push(payment);
  }

  return payments;
}

module.exports = {
  up: function (queryInterface) {
    return queryInterface.bulkInsert('payments', generatePayments(), {});
  },

  down: function (queryInterface) {
    return queryInterface.bulkDelete('payments', {}, {});
  }
};
