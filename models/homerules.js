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
    // associations can be defined here
  };
  return HomeRules;
};
