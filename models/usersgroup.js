'use strict';
module.exports = (sequelize, DataTypes) => {
  var UsersGroup = sequelize.define('UsersGroup', {
    name: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
        notEmpty: true,
        len: [0, 255]
      }
    }
  }, {});
  UsersGroup.associate = function(models) {

    models.UsersGroup.hasMany(models.Users, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false,
        name: 'usergroups_id'
      }
    });

  };
  return UsersGroup;
};
