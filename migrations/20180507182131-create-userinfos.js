'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Userinfos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(50)
      },
      surname: {
        type: Sequelize.STRING(50)
      },
      birthdate: {
        type: Sequelize.DATE
      },
      gender: {
        type: Sequelize.STRING(20)
      },
      dni: {
        type: Sequelize.STRING(50)
      },
      homeaddress: {
        type: Sequelize.STRING
      },
      feature_partying: {
        type: Sequelize.INTEGER
      },
      feature_geek: {
        type: Sequelize.INTEGER
      },
      feature_organized: {
        type: Sequelize.INTEGER
      },
      feature_athlete: {
        type: Sequelize.INTEGER
      },
      feature_sociable: {
        type: Sequelize.INTEGER
      },
      feature_active: {
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
      userpicture_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        allowNull: true,
        references: {
          model: 'UserPictures',
          key: 'id'
        }
      },
      description: {
        type: Sequelize.STRING(400)
      },
      name_private: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      surname_private: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      birthdate_private: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      phone_private: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      homeaddress_private: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      email_private: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      countries_id: {
        type: Sequelize.STRING,
        onDelete: 'CASCADE',
        allowNull: true,
        references: {
          model: 'Countries',
          key: 'id'
        }
      },
      country_private: {
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
  down: (queryInterface) => {
    return queryInterface.dropTable('Userinfos');
  }
};
