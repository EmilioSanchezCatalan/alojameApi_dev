'use strict';
module.exports = (sequelize, DataTypes) => {
  var Users_Valoration_Users = sequelize.define('Users_Valoration_Users', {
    users_make: {
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
    convivance: {
      type: DataTypes.INTEGER,
      validate: {
        max: 10,
        min: 1,
        notNull: true
      }
    },
    study_enviroment: {
      type: DataTypes.INTEGER,
      validate: {
        max: 10,
        min: 1,
        notNull: true
      }
    },
    clean: {
      type: DataTypes.INTEGER,
      validate: {
        max: 10,
        min: 1,
        notNull: true
      }
    },
    homework: {
      type: DataTypes.INTEGER,
      validate: {
        max: 10,
        min: 1,
        notNull: true
      }
    }
  }, {});
  Users_Valoration_Users.associate = function() {
    // associations can be defined here
  };
  return Users_Valoration_Users;
};
