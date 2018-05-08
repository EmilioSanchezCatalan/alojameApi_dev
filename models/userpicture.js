'use strict';
module.exports = (sequelize, DataTypes) => {
  var UserPicture = sequelize.define('UserPicture', {
    url: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 255],
        isUrl: true,
        notNull: true,
        notEmpty: true
      }
    },
    filename: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 255],
        notNull: true,
        notEmpty: true
      }
    },
    temp: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 255],
        notNull: true,
        notEmpty: true
      }
    },
    urltemp: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 255],
        notNull: true,
        notEmpty: true
      }
    }
  }, {});
  UserPicture.associate = function(models) {
    // associations can be defined here
  };
  return UserPicture;
};
