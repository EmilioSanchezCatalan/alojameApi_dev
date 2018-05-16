'use strict';
module.exports = (sequelize, DataTypes) => {
    var HomeServices = sequelize.define('HomeServices', {
        name: {
            type: DataTypes.STRING,
            validate: {
                notNull: true,
                notEmpty: true,
                len: [0, 100]
            }
        }
    }, {});
    HomeServices.associate = function(models) {

        models.HomeServices.belongsToMany(models.Homes, {
            onDelete: 'CASCADE',
            foreignKey: {
                allowNull: false,
                name: 'homerules_id'
            },
            through: 'Homeservices_Has_Homes'
        });

    };
    return HomeServices;
};
