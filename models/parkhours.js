// Written by John R. Thurlby July 2018

module.exports = function(sequelize, DataTypes) {
  var Parkhours = sequelize.define("Parkhours", {
  parkid:     DataTypes.STRING,
  parkmon:    DataTypes.STRING,
  parktue:    DataTypes.STRING,
  parkwed:    DataTypes.STRING,
  parkthu:    DataTypes.STRING,
  parkfri:    DataTypes.STRING,
  parksat:    DataTypes.STRING,
  parksun:    DataTypes.STRING
  });
  return Parkhours;
};

