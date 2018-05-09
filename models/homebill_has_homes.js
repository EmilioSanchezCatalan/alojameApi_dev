'use strict';
module.exports = (sequelize, DataTypes) => {
  var HomeBill_Has_Homes = sequelize.define('HomeBill_Has_Homes', {
    homebill_id: DataTypes.INTEGER,
    homes_id: DataTypes.INTEGER
  }, {});
  HomeBill_Has_Homes.associate = function(models) {
    // associations can be defined here
  };
  return HomeBill_Has_Homes;
};