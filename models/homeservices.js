'use strict';
module.exports = (sequelize, DataTypes) => {
  var HomeServices = sequelize.define('HomeServices', {
    name: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
        notEmpty: true,
        len: [0, 100]
      }
    }
  }, {});
  HomeServices.associate = function(models) {
    // associations can be defined here
  };
  return HomeServices;
};
