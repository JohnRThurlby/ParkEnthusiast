module.exports =  function (sequelize, DataTypes) {
  var User = sequelize.define("User", {
    nickname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    statecode: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userpassword: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })

  return User
}
