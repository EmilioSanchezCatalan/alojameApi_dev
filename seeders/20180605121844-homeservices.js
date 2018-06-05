'use strict';

module.exports = {
  up: (queryInterface) => {

    return queryInterface.bulkInsert('HomeServices', [
      {
        name: 'Wifi'
      },
      {
        name: 'Tv por cable'
      },
      {
        name: 'Calefacción central'
      },
      {
        name: 'Aire acondicionado'
      },
      {
        name: 'Piscina'
      },
      {
        name: 'Zona exterior'
      },
      {
        name: 'Lavadora'
      },
      {
        name: 'Secadora'
      },
      {
        name: 'Lavavajillas'
      },
      {
        name: 'Accesibilidad'
      },
      {
        name: 'Ascensor'
      },
      {
        name: 'Sabanas y toallas'
      },
      {
        name: 'Baño privado'
      }
    ], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('HomeServices', null, {});
  }
};
