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
    // associations can be defined here
  };
  return Homes;
};
