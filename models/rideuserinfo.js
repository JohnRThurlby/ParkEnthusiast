// Written by John R. Thurlby July 2018

module.exports = function(sequelize, DataTypes) {
  var Rideuserinfos = sequelize.define("Rideuserinfos", {
  userid:        DataTypes.STRING,
  parkid:        DataTypes.STRING,
  rideid:        DataTypes.STRING,
  daterode:      DataTypes.DATE,
  rating:        DataTypes.STRING,
  waittime:      DataTypes.STRING
  
  });
  return Rideuserinfos;
};

