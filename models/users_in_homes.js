'use strict';
module.exports = (sequelize, DataTypes) => {
  var Users_In_Homes = sequelize.define('Users_In_Homes', {
    users_id: {
      type: DataTypes.INTEGER,
      validate: {
        max: 2147483647,
        min: 1,
        notNull: true
      }
    },
    homes_id: {
      type: DataTypes.INTEGER,
      validate: {
        max: 2147483647,
        min: 1,
        notNull: true
      }
    },
    roomer: {
      type: DataTypes.BOOLEAN,
      validate: {
        notNull: true
      }
    }
  }, {});
  Users_In_Homes.associate = function() {
    // associations can be defined here
  };
  return Users_In_Homes;
};
