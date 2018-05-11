'use strict';
module.exports = (sequelize, DataTypes) => {
  var Homerules_Has_Homes = sequelize.define('Homerules_Has_Homes', {
    homerules_id: DataTypes.INTEGER,
    homes_id: DataTypes.INTEGER
  }, {});
  Homerules_Has_Homes.associate = function(models) {
  };
  return Homerules_Has_Homes;
};
