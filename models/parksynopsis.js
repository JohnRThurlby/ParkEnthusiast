// Written by John R. Thurlby July 2018

module.exports = function(sequelize, DataTypes) {
  var ParksSynopsis = sequelize.define("ParksSynopsis", {
  parkname:     DataTypes.STRING,
  parksynopsis: DataTypes.STRING,
      
  });
  return ParksSynopsis;
};

