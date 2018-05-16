'use strict';
module.exports = (sequelize, DataTypes) => {
    var Homeservices_Has_Homes = sequelize.define('Homeservices_Has_Homes', {
        homeservices_id: DataTypes.INTEGER,
        homes_id: DataTypes.INTEGER
    }, {});
    Homeservices_Has_Homes.associate = function() {
    };
    return Homeservices_Has_Homes;
};
