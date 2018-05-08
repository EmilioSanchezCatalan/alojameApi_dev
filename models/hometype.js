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
    // associations can be defined here
  };
  return HomeType;
};
