// Written by John R. Thurlby July 2018

module.exports = function(sequelize, DataTypes) {
  var Parks = sequelize.define("Parks", {
  parkname:     DataTypes.STRING,
  parkphone:    DataTypes.STRING,
  parkaddress1: DataTypes.STRING,
  parkcity:     DataTypes.STRING,
  parkstate:    DataTypes.STRING,
  parkzip:      DataTypes.STRING,
  parkwikilink: DataTypes.STRING,
  parkurl:      DataTypes.STRING,
  parklat:      DataTypes.STRING,
  parklon:      DataTypes.STRING
  });
  return Parks;
};

