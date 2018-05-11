'use strict';
module.exports = (sequelize, DataTypes) => {
  var Homes = sequelize.define('Homes', {
    title: {
      type: DataTypes.STRING,
      validate: {
          notNull: true,
          len: [0, 70],
          notEmpty: true,
      }
    },
    metres: {
      type: DataTypes.INTEGER,
      validate: {
        max: 2147483647,
        min: 1
      }
    },
    num_roomers_total: {
      type: DataTypes.INTEGER,
      validate: {
        max: 2147483647,
        min: 1,
        notNull: true
      }
    },
    typehomes_id: {
      type: DataTypes.INTEGER,
      validate: {
        max: 2147483647,
        min: 1,
        notNull: true
      }
    },
    typerent: {
      type: DataTypes.INTEGER,
      validate: {
        max: 3,
        min: 1,
        notNull: true
      }
    },
    num_bedroom: {
      type: DataTypes.INTEGER,
      validate: {
        max: 2147483647,
        min: 1,
        notNull: true
      }
    },
    num_bathroom: {
      type: DataTypes.INTEGER,
      validate: {
        max: 2147483647,
        min: 1,
        notNull: true
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
      validate: {
        max: 2147483647,
        min: 1,
        notNull: true
      }
    },
    address: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
        len: [0, 255],
        notEmpty: true
      }
    },
    num_door: {
      type: DataTypes.INTEGER,
      validate: {
        max: 2147483647,
        min: 1,
        notNull: true
      }
    },
    zip: {
      type: DataTypes.INTEGER,
      validate: {
        max: 2147483647,
        min: 1,
        notNull: true
      }
    },
    smokers: {
      type: DataTypes.BOOLEAN,
      validate: {
        notNull: true
      }
    },
    pets: {
      type: DataTypes.BOOLEAN,
      validate: {
        notNull: true
      }
    },
    price: {
      type: DataTypes.FLOAT,
      validate: {
        notNull: true,
        min: 0,
        max: 2147483647
      }
    },
    min_stance: {
      type: DataTypes.INTEGER,
      validate: {
        max: 2147483647,
        min: 1,
        notNull: true
      }
    },
    fiance: {
      type: DataTypes.FLOAT,
      validate: {
        notNull: true,
        min: 0,
        max: 2147483647
      }
    },
    delete: {
      type: DataTypes.BOOLEAN,
      validate: {
        notNull:true
      }
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
      validate: {
        max: 2147483647,
        min: 1,
        notNull: true
      }
    },
    cities_id: {
      type: DataTypes.INTEGER,
      validate: {
        max: 2147483647,
        min: 1,
        notNull: true
      }
    },
    available_date: DataTypes.DATE
  }, {});
  Homes.associate = function(models) {

    models.Homes.belongsToMany(models.HomeBill, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false,
        name: "homes_id"
      },
      as: "HomeBill_Hass_Homes",
      through: "HomeBill_Has_Homes"
    });

    models.Homes.belongsToMany(models.HomePictures, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false,
        name: "homes_id"
      },
      as: "HomePictures_Hass_Homes",
      through: "HomePictures_Has_Homes"
    });

    models.Homes.belongsToMany(models.HomeRules, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false,
        name: "homes_id"
      },
      as: "Homerules_Hass_Homes",
      through: "Homerules_Has_Homes"
    });

    models.Homes.belongsToMany(models.HomeServices, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false,
        name: "homes_id"
      },
      as: "Homeservices_Hass_Homes",
      through: "Homeservices_Has_Homes"
    });

    models.Homes.belongsTo(models.HomeType, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });

    models.Homes.belongsToMany(models.Users, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false,
        name: "homes_id"
      },
      as: "Users_Hass_Homes",
      through: "Users_Has_Homes"
    });

    models.Homes.belongsToMany(models.Users, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false,
        name: "homes_id"
      },
      as: "Users_Inn_Homes",
      through: "Users_In_Homes"
    });
  };
  return Homes;
};
