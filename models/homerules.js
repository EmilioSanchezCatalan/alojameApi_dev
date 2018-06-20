'use strict';
module.exports = (sequelize, DataTypes) => {
  var HomeRules = sequelize.define('HomeRules', {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0, 100],
        notEmpty: true,
      }
    },
    type: DataTypes.INTEGER,
    homes_id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        max: 2147483647,
        min: 1,
      }
    }
  }, {});
  HomeRules.associate = function(models) {

    models.HomeRules.belongsTo(models.Homes, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'homes_id'
      }
    });

  };
  return HomeRules;
};
