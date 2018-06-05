'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users_Valoration_Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      users_make: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      users_recv: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      convivance: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      study_enviroment: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      clean: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      homework: {
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
    return queryInterface.dropTable('users_valoration_users');
  }
};
