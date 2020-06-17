'use strict';

const hashedPassword =
  'dhROFgcIx/ajQJNKGA3wkh+BJx5l8G47oiGHbVl3NFYMU0QcjkwcHao6pOq04m/+XzhmiOxyJR8vYLIAAnTQcA==';

const salt = 'IuQqGl5DgFbLhK5mPNzL9g==';

function generateUsers() {
  const users = [
    {
      id: 1,
      email: 'client@test.com',
      firstName: 'John',
      lastName: 'Doe',
      role: 1,
      hashedPassword,
      salt,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      email: 'manager@test.com',
      firstName: 'Joe',
      lastName: 'Schmoe',
      role: 2,
      hashedPassword,
      salt,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 3,
      email: 'admin@test.com',
      firstName: 'Jane',
      lastName: 'Dane',
      role: 3,
      hashedPassword,
      salt,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  const isManager = Boolean(Math.floor(Math.random() * 2));

  for (let i = 3; i < 13; i++) {
    const user = {
      id: i + 1,
      email: `${isManager ? 'manager' : 'admin'}_${i + 1}@test.com`,
      firstName: '',
      lastName: '',
      role: isManager ? 2 : 3,
      hashedPassword,
      salt,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    users.push(user);
  }

  return users;
}

module.exports = {
  up: function (queryInterface) {
    return queryInterface.bulkInsert('users', generateUsers(), {});
  },

  down: function (queryInterface) {
    return queryInterface.bulkDelete('users', {}, {});
  }
};
