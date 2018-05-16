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
            validate: {
                min: 0,
                max: 2147483647,
                notNull: true,
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
            validate: {
                notNull: true
            }
        },
        surname_private: {
            type: DataTypes.BOOLEAN,
            validate: {
                notNull: true
            }
        },
        birthdate_private: {
            type: DataTypes.BOOLEAN,
            validate: {
                notNull: true
            }
        },
        phone_private: {
            type: DataTypes.BOOLEAN,
            validate: {
                notNull: true
            }
        },
        homeaddress_private: {
            type: DataTypes.BOOLEAN,
            validate: {
                notNull: true
            }
        },
        email_private: {
            type: DataTypes.BOOLEAN,
            validate: {
                notNull: true
            }
        },
        countries_id: {
            type: DataTypes.INTEGER,
            validate: {
                notNull: true,
                max: 2147483647,
                min: 1
            }
        },
        country_private: {
            type: DataTypes.BOOLEAN,
            validate: {
                notNull: true
            }
        }
    }, {});
    Userinfos.associate = function(models) {

        models.Userinfos.belongsTo(models.Users, {
            onDelete: 'CASCADE',
            foreignKey: {
                allowNull: false
            }
        });

        models.Userinfos.belongsTo(models.UserPicture, {
            onDelete: 'CASCADE',
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Userinfos;
};
