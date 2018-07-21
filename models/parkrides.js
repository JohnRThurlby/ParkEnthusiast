// Written by John R. Thurlby July 2018

module.exports = function(sequelize, DataTypes) {
  var Parkrides = sequelize.define("Parkrides", {
  parkid:        DataTypes.STRING,
  parkridename:  DataTypes.STRING,
  parkarea:      DataTypes.STRING,
  parkhgtreq:    DataTypes.STRING,
  parkduration:  DataTypes.STRING,
  parkmaxhgt:    DataTypes.STRING,
  parkopened:    DataTypes.STRING,
  parkspeed:     DataTypes.STRING,
  parklevel:     DataTypes.STRING,
  parklength:    DataTypes.STRING,
  parktype:      DataTypes.STRING,
  parkurl:       DataTypes.STRING
  });
  return Parkrides;
};

