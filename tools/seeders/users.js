'use strict';

module.exports = {
  up: function(queryInterface) {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          email: 'client@test.com',
          firstName: 'John',
          lastName: 'Doe',
          role: 1,
          hashedPassword:
            'dhROFgcIx/ajQJNKGA3wkh+BJx5l8G47oiGHbVl3NFYMU0QcjkwcHao6pOq04m/+XzhmiOxyJR8vYLIAAnTQcA==',
          salt: 'IuQqGl5DgFbLhK5mPNzL9g==',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email: 'manager@test.com',
          firstName: 'Joe',
          lastName: 'Schmoe',
          role: 2,
          hashedPassword:
            'dhROFgcIx/ajQJNKGA3wkh+BJx5l8G47oiGHbVl3NFYMU0QcjkwcHao6pOq04m/+XzhmiOxyJR8vYLIAAnTQcA==',
          salt: 'IuQqGl5DgFbLhK5mPNzL9g==',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email: 'admin@test.com',
          firstName: 'Jane',
          lastName: 'Dane',
          role: 3,
          hashedPassword:
            'dhROFgcIx/ajQJNKGA3wkh+BJx5l8G47oiGHbVl3NFYMU0QcjkwcHao6pOq04m/+XzhmiOxyJR8vYLIAAnTQcA==',
          salt: 'IuQqGl5DgFbLhK5mPNzL9g==',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete(
      'users',
      {
        email: {
          [Sequelize.Op.in]: [
            'admin@test.com',
            'manager@test.com',
            'client@test.com'
          ]
        }
      },
      {}
    );
  }
};
