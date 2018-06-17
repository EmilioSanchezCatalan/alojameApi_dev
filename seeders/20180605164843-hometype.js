'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('HomeTypes', [
      {
        name: 'Piso'
      },
      {
        name: 'Casa'
      },
      {
        name: 'Residencia'
      }
    ], {});
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('HomeTypes', null, {});
  }
};
