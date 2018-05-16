'use strict';
module.exports = (sequelize, DataTypes) => {
    var Users_Has_Homes = sequelize.define('Users_Has_Homes', {
        users_id: DataTypes.INTEGER,
        homes_id: DataTypes.INTEGER
    }, {});
    Users_Has_Homes.associate = function() {
    };
    return Users_Has_Homes;
};
