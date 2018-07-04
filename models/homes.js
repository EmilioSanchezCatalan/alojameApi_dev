'use strict';
module.exports = (sequelize, DataTypes) => {
  var Homes = sequelize.define('Homes', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0, 70],
        notEmpty: true,
      }
    },
    metres: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        max: 2147483647,
        min: 1
      }
    },
    num_roomers_total: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        max: 2147483647,
        min: 1,
      }
    },
    typehomes_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        max: 2147483647,
        min: 1,
      }
    },
    typerent: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        max: 3,
        min: 1,
      }
    },
    num_bedroom: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        max: 2147483647,
        min: 1,
      }
    },
    num_bathroom: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        max: 2147483647,
        min: 1,
      }
    },
    num_livingroom: {
      type: DataTypes.INTEGER,
      validate: {
        max: 2147483647,
        min: 0
      }
    },
    num_kitchen: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        max: 2147483647,
        min: 1,
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0, 255],
        notEmpty: true
      }
    },
    num_door: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [0, 255]
      }
    },
    zip: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        max: 2147483647,
        min: 1,
      }
    },
    smokers: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    pets: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
        max: 2147483647
      }
    },
    min_stance: {
      type: DataTypes.INTEGER,
      validate: {
        max: 2147483647,
        min: 1,
      }
    },
    fiance: {
      type: DataTypes.FLOAT,
      validate: {
        min: 0,
        max: 2147483647
      }
    },
    delete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 400],
        notEmpty: true
      }
    },
    num_roomers_actual: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        max: 2147483647,
        min: 0,
      }
    },
    cities_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        max: 2147483647,
        min: 1,
      }
    },
    num_home: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        max: 2147483647,
        min: 0,
      }
    },
    users_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        max: 2147483647,
        min: 1,
      }
    },
    num_floor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        max: 2147483647,
        min: 0,
      }
    },
    available_date: DataTypes.DATE
  }, {});
  Homes.associate = function(models) {

    models.Homes.belongsToMany(models.HomeBill, {
      onDelete: 'CASCADE',
      foreignKey: 'homes_id',
      through: 'HomeBill_Has_Homes'
    });

    models.Homes.belongsToMany(models.HomePictures, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'homes_id'
      },
      through: 'HomePictures_Has_Homes'
    });

    models.Homes.belongsToMany(models.HomeRules, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'homes_id'
      },
      as: 'Homerules_Hass_Homes',
      through: 'Homerules_Has_Homes'
    });

    models.Homes.belongsToMany(models.HomeServices, {
      onDelete: 'CASCADE',
      foreignKey:'homes_id',
      through: 'Homeservices_Has_Homes'
    });

    models.Homes.belongsTo(models.HomeType, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'typehomes_id'
      }
    });

    models.Homes.belongsTo(models.Users, {
      onDelete: 'CASCADE',
      foreignKey: 'users_id'
    });

    models.Homes.belongsToMany(models.Users, {
      as: 'roomers',
      onDelete: 'CASCADE',
      foreignKey: 'homes_id',
      through: 'Users_In_Homes'
    });

    models.Homes.hasMany(models.HomeRules, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'homes_id'
      }
    });

    models.Homes.belongsTo(models.Cities, {
      onDelete: 'CASCADE',
      foreignKey: 'cities_id'
    });
  };
  return Homes;
};
