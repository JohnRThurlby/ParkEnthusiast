// Written by John R. Thurlby July 2018

module.exports = function(sequelize, DataTypes) {
  var Parktickets = sequelize.define("Parktickets", {
  parkid:     DataTypes.STRING,
  parkline1:  DataTypes.STRING,
  parkline2:  DataTypes.STRING,
  parkline3:  DataTypes.STRING,
  parkline4:  DataTypes.STRING,
  parkline5:  DataTypes.STRING,
  });
  return Parktickets;
};

