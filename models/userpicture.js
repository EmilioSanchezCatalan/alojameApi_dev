'use strict';
module.exports = (sequelize, DataTypes) => {
  var UserPicture = sequelize.define('UserPicture', {
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0, 255],
        notEmpty: true
      }
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0, 255],
        notEmpty: true
      }
    },
    filetype: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0, 255],
        notEmpty: true
      }
    }
  }, {});
  UserPicture.associate = function(models) {

    models.UserPicture.hasMany(models.Userinfos, {
      onDelete: 'CASCADE',
      foreignKey: 'userpicture_id'
    });

  };
  return UserPicture;
};
