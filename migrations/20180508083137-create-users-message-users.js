'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Users_Message_Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            users_send: {
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
            message: {
                allowNull: false,
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
        return queryInterface.dropTable('users_message_users');
    }
};
