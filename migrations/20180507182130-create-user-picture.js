'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('UserPictures', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            url: {
                allowNull: false,
                type: Sequelize.STRING
            },
            filename: {
                allowNull: false,
                type: Sequelize.STRING
            },
            temp: {
                allowNull: false,
                type: Sequelize.STRING
            },
            urltemp: {
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
        return queryInterface.dropTable('UserPictures');
    }
};
