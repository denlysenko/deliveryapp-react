'use strict';

const cities = [
  'Kyiv',
  'Minsk',
  'London',
  'Prague',
  'Madrid',
  'Rome',
  'Berlin',
  'Paris'
];
const cargos = [
  'Computers',
  'Sofa',
  'TV',
  'Phone',
  'Chair',
  'Piano',
  'Oven',
  'Monitor',
  'Books'
];

function generateOrders() {
  const orders = [];

  for (let i = 0; i < 13; i++) {
    const cityFrom = cities[Math.floor(Math.random() * cities.length)];
    const cityTo = cities[Math.floor(Math.random() * cities.length)];
    const cargoName = cargos[Math.floor(Math.random() * cargos.length)];

    const order = {
      id: i + 1,
      cityFrom,
      cityTo,
      addressFrom: `From ${cityFrom}, 12`,
      addressTo: `To ${cityTo}, 1`,
      cargoName,
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
      clientId: 1,
      invoiceId: i + 1
    };

    orders.push(order);
  }

  return orders;
}

module.exports = {
  up: function (queryInterface) {
    return queryInterface.bulkInsert('orders', generateOrders(), {});
  },

  down: function (queryInterface) {
    return queryInterface.bulkDelete('orders', {}, {});
  }
};
