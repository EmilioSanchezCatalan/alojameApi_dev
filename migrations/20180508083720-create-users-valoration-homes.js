'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users_Valoration_Homes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      users_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      home_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        allowNull: false,
        references: {
          model: 'Homes',
          key: 'id'
        }
      },
      modern: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      appliances: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      location: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      comfortable: {
        allowNull: false,
        type: Sequelize.INTEGER
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users_valoration_homes');
  }
};
