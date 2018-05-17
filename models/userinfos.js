'use strict';
module.exports = (sequelize, DataTypes) => {
    var Userinfos = sequelize.define('Userinfos', {
        name: {
            type: DataTypes.STRING,
            validate: {
                len: [0, 50],
                notEmpty: true
            }
        },
        surname: {
            type: DataTypes.STRING,
            validate: {
                len: [0, 50],
                notEmpty: true
            }
        },
        birthdate: DataTypes.DATE,
        gender: {
            type: DataTypes.STRING,
            validate: {
                len: [0, 20],
                notEmpty: true
            }
        },
        dni: {
            type: DataTypes.STRING,
            validate: {
                len: [0, 50],
                notEmpty: true
            }
        },
        homeaddress: {
            type: DataTypes.STRING,
            validate: {
                len: [0, 255],
                notEmpty: true
            }
        },
        feature_partying: {
            type: DataTypes.INTEGER,
            validate: {
                min: 0,
                max: 100
            }
        },
        feature_geek: {
            type: DataTypes.INTEGER,
            validate: {
                min: 0,
                max: 100
            }
        },
        feature_organized: {
            type: DataTypes.INTEGER,
            validate: {
                min: 0,
                max: 100
            }
        },
        feature_athlete: {
            type: DataTypes.INTEGER,
            validate: {
                min: 0,
                max: 100
            }
        },
        feature_sociable: {
            type: DataTypes.INTEGER,
            validate: {
                min: 0,
                max: 100
            }
        },
        feature_active: {
            type: DataTypes.INTEGER,
            validate: {
                min: 0,
                max: 100
            }
        },
        users_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 0,
                max: 2147483647,
            }
        },
        userpicture_id: {
            type: DataTypes.INTEGER,
            validate: {
                min: 0,
                max: 2147483647,
            }
        },
        description: {
            type: DataTypes.STRING,
            validate: {
                len: [0, 400],
                notEmpty: true
            }
        },
        name_private: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        surname_private: {
            type: DataTypes.BOOLEAN,
            allowNull: false

        },
        birthdate_private: {
            type: DataTypes.BOOLEAN,
            allowNull: false

        },
        phone_private: {
            type: DataTypes.BOOLEAN,
            allowNull: false

        },
        homeaddress_private: {
            type: DataTypes.BOOLEAN,
            allowNull: false

        },
        email_private: {
            type: DataTypes.BOOLEAN,
            allowNull: false

        },
        countries_id: {
            type: DataTypes.INTEGER,
            validate: {
                max: 2147483647,
                min: 1
            }
        },
        country_private: {
            type: DataTypes.BOOLEAN,
            allowNull: false

        }
    }, {});
    Userinfos.associate = function(models) {

        models.Userinfos.belongsTo(models.Users, {
            onDelete: 'CASCADE',
            foreignKey: {
                name: 'users_id'
            }
        });

        models.Userinfos.belongsTo(models.UserPicture, {
            onDelete: 'CASCADE',
            foreignKey: {
                name: 'userpicture_id'
            }
            
        });
    };
    return Userinfos;
};
