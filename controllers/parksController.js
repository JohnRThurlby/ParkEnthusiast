const db = require("../models");
console.log("made it in here, parksController")
// Defining methods for the parksController
module.exports = {
  findAll: function(req, res) {
    console.log("in findAll")
    console.log(req.body)
    db.Parks
      .findAll({ where: {parkstate: "FL"}})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    console.log("in findbyid " + req.params.id )
    db.Parks
      .findById("75")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findHoursbyid: function(req, res) {
    console.log("in findHoursbyid " + req.params.id )
    db.Parkhours
      .findOne({where: {parkid: "75"}})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findTicketsbyid: function(req, res) {
    console.log("in findTicketsbyid " + req.params.id )
    db.Parktickets
      .findOne({ where: {parkid: "75"}})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findAllrides: function(req, res) {
    console.log("in findAllrides " + req.params.id )

    db.Parkrides
      .findAll({ where: {parkid: "75"}})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findRides: function(req, res) {
    console.log("in findRides " + req.params.id )

    db.Parkrides
      .findAll({ where: {parkid: "75", id: "10"}})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findComments: function(req, res) {
    console.log("in findComments ")
    db.Ridercomments
      .findAll()
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
  
};