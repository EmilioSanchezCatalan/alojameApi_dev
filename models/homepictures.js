'use strict';
module.exports = (sequelize, DataTypes) => {
  var HomePictures = sequelize.define('HomePictures', {
    url: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
        notEmpty: true,
        isUrl: true,
        len: [0, 255]
      }
    },
    filename: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
        notEmpty: true,
        isUrl:true,
        len: [0, 255]
      }
    },
    temp: DataTypes.STRING
  }, {});
  HomePictures.associate = function(models) {
    // associations can be defined here
  };
  return HomePictures;
};
