'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('UsersGroups', [
      {
        name: 'admin'
      },
      {
        name: 'owner'
      },
      {
        name: 'student'
      }
    ], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('UsersGroups', null, {});
  }
};
