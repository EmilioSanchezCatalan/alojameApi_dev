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

    models.HomePictures.belongsToMany(models.Homes, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'homepictures_id'
      },
      through: 'HomePictures_Has_Homes'
    });

  };
  return HomePictures;
};
