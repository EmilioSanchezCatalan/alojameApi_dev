'use strict';
module.exports = (sequelize, DataTypes) => {
  var Provinces = sequelize.define('Provinces', {
    name: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
        notEmpty: true,
        len: [0, 50]
      }
    },
    countries_id: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 2147483647,
        notNull: true
      }
    }
  }, {});
  Provinces.associate = function(models) {

    models.Provinces.hasMany(models.Cities, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'provinces_id'
      }
    });

    models.Provinces.belongsTo(models.Countries, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'countries_id'
      }
    });

  };
  return Provinces;
};
