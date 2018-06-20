'use strict';
module.exports = (sequelize, DataTypes) => {
  var HomePictures = sequelize.define('HomePictures', {
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [0, 255]
      }
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [0, 255]
      }
    },
    filetype: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [0, 255]
      }
    },
    temp: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {});
  HomePictures.associate = function(models) {

    models.HomePictures.belongsToMany(models.Homes, {
      onDelete: 'CASCADE',
      foreignKey: 'homepictures_id',
      through: 'HomePictures_Has_Homes'
    });

  };
  return HomePictures;
};
