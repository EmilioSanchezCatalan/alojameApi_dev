'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('UsersGroups', [
      {
        id: 1,
        name: 'admin'
      },
      {
        id: 2,
        name: 'owner'
      },
      {
        id: 3,
        name: 'student'
      }
    ], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('UsersGroups', null, {});
  }
};
