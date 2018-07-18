'use strict';
module.exports = (sequelize, DataTypes) => {
  var Users_In_Homes = sequelize.define('Users_In_Homes', {
    users_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        max: 2147483647,
        min: 1,
      }
    },
    homes_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        max: 2147483647,
        min: 1,
      }
    },
    roomer: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {});
  Users_In_Homes.associate = function(models) {
    models.Users_In_Homes.belongsTo(models.Homes, {
      onDelete: 'CASCADE',
      foreignKey: 'users_id'
    });
  };
  return Users_In_Homes;
};
