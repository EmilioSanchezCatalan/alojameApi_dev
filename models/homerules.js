'use strict';
module.exports = (sequelize, DataTypes) => {
  var HomeRules = sequelize.define('HomeRules', {
    text: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 100],
        notEmpty: true,
        notNull: true
      }
    },
    type: DataTypes.INTEGER,
    homes_id:{
      type: DataTypes.INTEGER,
      validate: {
        max: 2147483647,
        min: 1,
        notNull: true
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
