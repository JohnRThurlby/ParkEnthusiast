const db = require("../models");

// Defining methods for the userController

module.exports = {

  findUsernick: function(req, res) {
    db.User
      .findAll({ where: {id: req.params.id}} )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }, 

  findById: function(req, res) {
    let i = req.params.id.indexOf(".com")
    let useremail = req.params.id.substr(0, i + 4)
    let userpass = req.params.id.substr(i + 4)
    db.User
      .findOne({ where: {email: useremail, userpassword: userpass}} )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }, 

  create: function(req, res) {
    db.User
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};