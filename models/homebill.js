'use strict';
module.exports = (sequelize, DataTypes) => {
  var HomeBill = sequelize.define('HomeBill', {
    name: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 100],
        notEmpty: true,
        notNull: true
      }
    }
  }, {});
  HomeBill.associate = function(models) {

    models.HomeBill.belongsToMany(models.Homes, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false,
        name: "homebill_id"
      },
      through: "HomeBill_Has_Homes"
    });

  };
  return HomeBill;
};
