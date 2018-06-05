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
    type: DataTypes.INTEGER
  }, {});
  HomeRules.associate = function(models) {

    models.HomeRules.belongsToMany(models.Homes, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'homerules_id'
      },
      through: 'Homerules_Has_Homes'
    });

  };
  return HomeRules;
};
