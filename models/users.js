'use strict';

const MESSAGE = require('../class/messages-response');

module.exports = (sequelize, DataTypes) => {
  var Users = sequelize.define('Users', {
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: MESSAGE.empty('username')
        },
        isUnique(value, next) {
          var User = sequelize.import('./users');
          User.find({
            where: { username: value },
          }).done((user) => {
            if (user)
              return next(MESSAGE.USERNAME_UNIQUE);
            next();
          });
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: MESSAGE.EMAIL_BAD_FORMAT
        },
        isUnique(value, next) {
          var User = sequelize.import('./users');
          User.find({
            where: { email: value },
          }).done((user) => {
            if (user)
              return next(MESSAGE.EMAIL_UNIQUE);
            next();
          });
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate : {
        notEmpty: {
          msg: MESSAGE.empty('password')
        }
      }
    },
    usergroups_id: DataTypes.INTEGER,
    last_login: DataTypes.DATE,
    authtoken: DataTypes.STRING
  }, {});
  Users.associate = function(models) {

    models.Users.hasOne(models.Userinfos, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'users_id'
      }
    });

    models.Users.belongsTo(models.UsersGroup, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'usergroups_id'
      }
    });

    models.Users.belongsToMany(models.Homes, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'users_id'
      },
      as: 'Users_Hass_Homes',
      through: 'Users_Has_Homes'
    });

    models.Users.belongsToMany(models.Homes, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'users_id'
      },
      as: 'Users_Inn_Homes',
      through: 'Users_In_Homes'
    });

    models.Users.belongsToMany(models.Homes, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'users_id'
      },
      as: 'Users_Valorations_Homes',
      through: 'Users_Valoration_Homes'
    });

    models.Users.belongsToMany(models.Users, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'users_send'
      },
      as: 'Users_Messages_Users1',
      through: 'Users_Message_Users'
    });

    models.Users.belongsToMany(models.Users, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'users_recv'
      },
      as: 'Users_Messages_Users2',
      through: 'Users_Message_Users'
    });

    models.Users.belongsToMany(models.Users, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'users_make'
      },
      as: 'Users_Valorations_Users1',
      through: 'Users_Valoration_Users'
    });

    models.Users.belongsToMany(models.Users, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'users_recv'
      },
      as: 'Users_Valorations_Users2',
      through: 'Users_Valoration_Users'
    });

  };
  return Users;
};
