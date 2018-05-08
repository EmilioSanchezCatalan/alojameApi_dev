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
    // associations can be defined here
  };
  return Countries;
};
