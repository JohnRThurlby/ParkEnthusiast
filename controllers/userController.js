const db = require("../models");
console.log("made it in here, userController")
// Defining methods for the userController

module.exports = {
  findById: function(req, res) {
    console.log("in findById")
    console.log("req body " + req.params.id)
    let i = req.params.id.indexOf(".com")
    let useremail = req.params.id.substr(0, i + 4)
    let userpass = req.params.id.substr(i + 4)
    console.log(useremail)
    console.log(userpass)
    db.User
      .findOne({ where: {email: useremail, userpassword: userpass}} )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }, 

  create: function(req, res) {
    console.log("made it in here, db.User, create")
    console.log("req body " + req.body.nickname)
    db.User
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};