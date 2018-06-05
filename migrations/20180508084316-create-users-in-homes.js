'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users_In_Homes', {
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
      homes_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        allowNull: false,
        references: {
          model: 'Homes',
          key: 'id'
        }
      },
      roomer: {
        allowNull: false,
        type: Sequelize.BOOLEAN
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
    return queryInterface.dropTable('users_in_homes');
  }
};
