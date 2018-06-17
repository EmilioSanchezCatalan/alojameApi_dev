'use strict';
module.exports = (sequelize, DataTypes) => {
  var Cities = sequelize.define('Cities', {
    name: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 50],
        notEmpty: true,
        notNull: true
      }
    },
    provinces_id: {
      type: DataTypes.INTEGER,
      validate: {
        notNull: true
      }
    },
    countries_id: {
      type: DataTypes.INTEGER,
      validate: {
        notNull: true
      }
    }
  }, {});
  Cities.associate = function(models) {

    models.Cities.belongsTo(models.Provinces, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'provinces_id'
      }
    });

    models.Cities.belongsTo(models.Countries, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'countries_id'
      }
    });
  };
  return Cities;
};
