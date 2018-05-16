'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            username: {
                allowNull: false,
                type: Sequelize.STRING(50)
            },
            email: {
                allowNull: false,
                type: Sequelize.STRING
            },
            password: {
                allowNull: false,
                type: Sequelize.STRING
            },
            usergroups_id: {
                type: Sequelize.INTEGER,
                onDelete: 'CASCADE',
                allowNull: false,
                references: {
                    model: 'UsersGroups',
                    key: 'id'
                }
            },
            last_login: {
                type: Sequelize.DATE
            },
            authtoken: {
                type: Sequelize.STRING
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
        return queryInterface.dropTable('Users');
    }
};
