// Written by John R. Thurlby July 2018

module.exports = function(sequelize, DataTypes) {
  var Ridercomments = sequelize.define("Ridercomments", {
  userid:     DataTypes.STRING,
  parkid:     DataTypes.STRING,
  rideid:     DataTypes.STRING,
  comment:    DataTypes.STRING,
  dateadded:  DataTypes.DATE
  });
  return Ridercomments;
};

