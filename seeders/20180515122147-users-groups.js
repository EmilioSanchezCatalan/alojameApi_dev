'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
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

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('UsersGroups', null, {});
  }
};
