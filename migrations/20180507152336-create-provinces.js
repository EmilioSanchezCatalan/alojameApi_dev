'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Provinces', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING(50)
            },
            countries_id: {
                type: Sequelize.INTEGER,
                onDelete: 'CASCADE',
                allowNull: false,
                references: {
                    model: 'Countries',
                    key: 'id'
                }
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
        return queryInterface.dropTable('Provinces');
    }
};
