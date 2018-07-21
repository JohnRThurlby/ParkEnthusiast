const db = require("../models");
console.log("made it in here, userController")
// Defining methods for the userController

module.exports = {
  findById: function(req, res) {
    console.log("in findById")
    console.log("req body " + req.params.id)
    let useremail = 'johnrthurlby@gmail.com'
    let userpass = 'Robt01'
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
  },

  update: function(req, res) {
    db.User
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  remove: function(req, res) {
    db.User
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }

};
