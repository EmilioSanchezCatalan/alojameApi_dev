'use strict';
module.exports = (sequelize, DataTypes) => {
  var HomeBill = sequelize.define('HomeBill', {
    name: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 100],
        notEmpty: true,
        notNull: true
      }
    }
  }, {});
  HomeBill.associate = function(models) {
    // associations can be defined here
  };
  return HomeBill;
};
