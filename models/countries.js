'use strict';
module.exports = (sequelize, DataTypes) => {
  var Countries = sequelize.define('Countries', {
    name: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 50],
        notEmpty: true,
        notNull: true
      }
    }
  }, {});
  Countries.associate = function(models) {

    models.Countries.hasMany(models.Provinces, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });

    models.Countries.hasMany(models.Cities, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });

  };
  return Countries;
};
