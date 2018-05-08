'use strict';
module.exports = (sequelize, DataTypes) => {
  var UsersGroup = sequelize.define('UsersGroup', {
    name: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
        notEmpty: true,
        len: [0, 255]
      }
    }
  }, {});
  UsersGroup.associate = function(models) {
    // associations can be defined here
  };
  return UsersGroup;
};
