'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Homes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING(70)
      },
      metres: {
        type: Sequelize.INTEGER
      },
      num_roomers_total: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      typehomes_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      typerent: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      num_bedroom: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      num_bathroom: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      num_livingroom: {
        type: Sequelize.INTEGER
      },
      num_kitchen: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING
      },
      num_door: {
        allowNull: false,
        type: Sequelize.STRING
      },
      zip: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      smokers: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      pets: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      price: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      min_stance: {
        type: Sequelize.INTEGER
      },
      fiance: {
        type: Sequelize.FLOAT
      },
      delete: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      description: {
        type: Sequelize.STRING(400)
      },
      num_roomers_actual: {
        type: Sequelize.INTEGER
      },
      cities_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        allowNull: false,
        references: {
          model: 'Cities',
          key: 'id'
        }
      },
      available_date: {
        type: Sequelize.DATE
      },
      num_home: {
        allowNull: false,
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
      num_floor: {
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
  down: (queryInterface) => {
    return queryInterface.dropTable('Homes');
  }
};
