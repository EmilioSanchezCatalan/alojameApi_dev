'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Provinces', [
      { id: 1, countries_id: 'ES', name: 'Álava'},
      { id: 2, countries_id: 'ES', name: 'Albacete'},
      { id: 3, countries_id: 'ES', name: 'Alicante'},
      { id: 4, countries_id: 'ES', name: 'Almería'},
      { id: 5, countries_id: 'ES', name: 'Ávila'},
      { id: 6, countries_id: 'ES', name: 'Badajoz'},
      { id: 7, countries_id: 'ES', name: 'Baleares { id: Illes}'},
      { id: 8, countries_id: 'ES', name: 'Barcelona'},
      { id: 9, countries_id: 'ES', name: 'Burgos'},
      { id: 10, countries_id: 'ES', name: 'Cáceres'},
      { id: 11, countries_id: 'ES', name: 'Cádiz'},
      { id: 12, countries_id: 'ES', name: 'Castellón'},
      { id: 13, countries_id: 'ES', name: 'Ciudad Real'},
      { id: 14, countries_id: 'ES', name: 'Córdoba'},
      { id: 15, countries_id: 'ES', name: 'A Coruña'},
      { id: 16, countries_id: 'ES', name: 'Cuenca'},
      { id: 17, countries_id: 'ES', name: 'Girona'},
      { id: 18, countries_id: 'ES', name: 'Granada'},
      { id: 19, countries_id: 'ES', name: 'Guadalajara'},
      { id: 20, countries_id: 'ES', name: 'Guipúzcoa'},
      { id: 21, countries_id: 'ES', name: 'Huelva'},
      { id: 22, countries_id: 'ES', name: 'Huesca'},
      { id: 23, countries_id: 'ES', name: 'Jaén'},
      { id: 24, countries_id: 'ES', name: 'León'},
      { id: 25, countries_id: 'ES', name: 'Lleida'},
      { id: 26, countries_id: 'ES', name: 'La Rioja'},
      { id: 27, countries_id: 'ES', name: 'Lugo'},
      { id: 28, countries_id: 'ES', name: 'Madrid'},
      { id: 29, countries_id: 'ES', name: 'Málaga'},
      { id: 30, countries_id: 'ES', name: 'Murcia'},
      { id: 31, countries_id: 'ES', name: 'Navarra'},
      { id: 32, countries_id: 'ES', name: 'Ourense'},
      { id: 33, countries_id: 'ES', name: 'Asturias'},
      { id: 34, countries_id: 'ES', name: 'Palencia'},
      { id: 35, countries_id: 'ES', name: 'Las Palmas'},
      { id: 36, countries_id: 'ES', name: 'Pontevedra'},
      { id: 37, countries_id: 'ES', name: 'Salamanca'},
      { id: 38, countries_id: 'ES', name: 'Santa Cruz de Tenerife'},
      { id: 39, countries_id: 'ES', name: 'Cantabria'},
      { id: 40, countries_id: 'ES', name: 'Segovia'},
      { id: 41, countries_id: 'ES', name: 'Sevilla'},
      { id: 42, countries_id: 'ES', name: 'Soria'},
      { id: 43, countries_id: 'ES', name: 'Tarragona'},
      { id: 44, countries_id: 'ES', name: 'Teruel'},
      { id: 45, countries_id: 'ES', name: 'Toledo'},
      { id: 46, countries_id: 'ES', name: 'Valencia'},
      { id: 47, countries_id: 'ES', name: 'Valladolid'},
      { id: 48, countries_id: 'ES', name: 'Vizcaya'},
      { id: 49, countries_id: 'ES', name: 'Zamora'},
      { id: 50, countries_id: 'ES', name: 'Zaragoza'},
      { id: 51, countries_id: 'ES', name: 'Ceuta'},
      { id: 52, countries_id: 'ES', name: 'Melilla'}
    ], {});

  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Provinces', null, {});
  }
};
