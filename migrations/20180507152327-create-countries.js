'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Countries', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('Countries');
  }
};
