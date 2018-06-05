'use strict';
module.exports = (sequelize, DataTypes) => {
  var Users_Message_Users = sequelize.define('Users_Message_Users', {
    users_send: {
      type: DataTypes.INTEGER,
      validate: {
        max: 2147483647,
        min: 1,
        notNull: true
      }
    },
    users_recv: {
      type: DataTypes.INTEGER,
      validate: {
        max: 2147483647,
        min: 1,
        notNull: true
      }
    },
    message: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
        notEmpty: true,
        len: [0, 255]
      }
    }
  }, {});
  Users_Message_Users.associate = function() {
    // associations can be defined here
  };
  return Users_Message_Users;
};
