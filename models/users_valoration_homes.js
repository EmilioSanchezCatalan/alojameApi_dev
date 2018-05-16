'use strict';
module.exports = (sequelize, DataTypes) => {
    var Users_Valoration_Homes = sequelize.define('Users_Valoration_Homes', {
        users_id: {
            type: DataTypes.INTEGER,
            validate: {
                max: 2147483647,
                min: 1,
                notNull: true
            }
        },
        home_id: {
            type: DataTypes.INTEGER,
            validate: {
                max: 2147483647,
                min: 1,
                notNull: true
            }
        },
        modern: {
            type: DataTypes.INTEGER,
            validate: {
                max: 10,
                min: 1,
                notNull: true
            }
        },
        appliances: {
            type: DataTypes.INTEGER,
            validate: {
                max: 10,
                min: 1,
                notNull: true
            }
        },
        location: {
            type: DataTypes.INTEGER,
            validate: {
                max: 10,
                min: 1,
                notNull: true
            }
        },
        comfortable: {
            type: DataTypes.INTEGER,
            validate: {
                max: 10,
                min: 1,
                notNull: true
            }
        }
    }, {});
    Users_Valoration_Homes.associate = function() {
    // associations can be defined here
    };
    return Users_Valoration_Homes;
};
