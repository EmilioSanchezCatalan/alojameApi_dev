'use strict';
module.exports = (sequelize, DataTypes) => {
  var HomePictures_Has_Homes = sequelize.define('HomePictures_Has_Homes', {
    homepictures_id: DataTypes.INTEGER,
    homes_id: DataTypes.INTEGER
  }, {});
  HomePictures_Has_Homes.associate = function(models) {
  };
  return HomePictures_Has_Homes;
};
