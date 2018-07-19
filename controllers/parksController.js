const db = require("../models");
console.log("made it in here, parksController")
// Defining methods for the parksController
module.exports = {
  findAll: function(req, res) {
    console.log("in findAll")
    db.Parks
      .findAll({ where: {parkstate: "FL"}})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    console.log("in findbyid " + req.params.id )
    db.Parks
      .findById("59")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findHoursbyid: function(req, res) {
    console.log("in findHoursbyid " + req.params.id )
    db.Parkhours
      .findOne({where: {parkid: "59"}})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findTicketsbyid: function(req, res) {
    console.log("in findTicketsbyid " + req.params.id )
    db.Parktickets
      .findOne({ where: {parkid: "59"}})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findRidebyid: function(req, res) {
    db.Parkrides
      .findById({ where: {parkid: 59, rideid: 1}})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
  
};
