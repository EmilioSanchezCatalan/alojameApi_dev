'use strict';
module.exports = (sequelize, DataTypes) => {
  var Users_Message_Users = sequelize.define('Users_Message_Users', {
    users_send: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        max: 2147483647,
        min: 1,
      }
    },
    users_recv: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        max: 2147483647,
        min: 1,
      }
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [0, 255]
      }
    }
  }, {});
  Users_Message_Users.associate = function(models) {

    models.Users_Message_Users.belongsTo(models.Users, {
      as: 'sender',
      onDelete: 'CASCADE',
      foreignKey: 'users_send'
    });

    models.Users_Message_Users.belongsTo(models.Users, {
      as: 'recived',
      onDelete: 'CASCADE',
      foreignKey: 'users_recv'
    });
  };
  return Users_Message_Users;
};
