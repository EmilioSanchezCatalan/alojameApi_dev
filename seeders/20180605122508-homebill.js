'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('HomeBills', [
      {
        name: 'Agua'
      },
      {
        name: 'Luz'
      },
      {
        name: 'Internet'
      },
      {
        name: 'Calefacción'
      },
      {
        name: 'Butano'
      }
    ], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('HomeBills', null, {});
  }
};
