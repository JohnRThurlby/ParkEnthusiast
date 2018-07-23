// Written by John R. Thurlby July 2018

module.exports = function(sequelize, DataTypes) {
  var Rideuserinfo = sequelize.define("Rideuserinfo", {
  userid:        DataTypes.STRING,
  parkidid:      DataTypes.STRING,
  rideid:        DataTypes.STRING,
  daterode:      DataTypes.DATE,
  rating:        DataTypes.STRING,
  waittime:      DataTypes.STRING
  
  });
  return Rideuserinfo;
};

