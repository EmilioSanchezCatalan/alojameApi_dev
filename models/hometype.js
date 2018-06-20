'use strict';
module.exports = (sequelize, DataTypes) => {
  var HomeType = sequelize.define('HomeType', {
    name: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
        notEmpty: true,
        len: [0, 100]
      }
    }
  }, {});
  HomeType.associate = function(models) {

    models.HomeType.hasMany(models.Homes, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'typehomes_id'
      }
    });
  };
  return HomeType;
};
