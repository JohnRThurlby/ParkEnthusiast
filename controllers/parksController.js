const db = require("../models");
console.log("made it in here, parksController")
// Defining methods for the parksController
module.exports = {
  findAll: function(req, res) {
    console.log("in findAll")
    console.log(req.query)
    db.Parks
      .findAll({ where: {parkstate: "FL"}})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findState: function(req, res) {
    console.log("in findState")
    db.Parks
      .findAll({ where: {parkstate: "FL"}})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findOne: function(req, res) {
    console.log("in findOne")
    console.log(req.body)
    db.Parks
      .findOne({ where: {id: "75"}})
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
    console.log("in findAllrides ")

    db.Parkrides
      .findAll({ where: {parkid: "75"}})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findRides: function(req, res) {
    console.log("in findRides " + req.params.id )

    db.Parkrides
      .findOne({ where: {parkid: "75", id: "10"}})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findComments: function(req, res) {
    console.log("in findComments ")
    db.Ridercomments
      .findAll()
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findAvgwait: function(req, res) {
    console.log("in findAvgwait ")
    db.Rideuserinfos
     .findOne({ where: {userid: "1", parkid: "75", id: "10"}}
    
    )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findAvgrating: function(req, res) {
    console.log("in findAvgrating ")
    db.Rideuserinfos
      .findOne({ where: {parkid: "75", id: "10"}}
    )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findMaxwait: function(req, res) {
    console.log("in findMaxwait ")
    db.Rideuserinfos
      .max("waittime", { where: {parkid: "75", id: "10"}}
    
    )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findMinwait: function(req, res) {
    console.log("in findMinxwait ")
    db.Rideuserinfos
      .min("waittime", { where: {parkid: "75", id: "10"}}
    
    )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findTotalcount: function(req, res) {
    console.log("in findTotalcount ")
    db.Rideuserinfos
      .count({ where: {parkid: "75", rideid: "10"}}
    
    )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findDupcount: function(req, res) {
    console.log("in findDupcount ")
    db.Rideuserinfos
      .count({ where: {parkid: "75", rideid: "10"}, distinct: true, col: 'userid'}
    
    )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  createRiderinfo: function(req, res) {
    console.log("made it in here, db.Rideuserinfos, create")
    console.log("req body " + req.body.date)
    db.Rideuserinfos
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  createRidercmt: function(req, res) {
    console.log("made it in here, db.Rideusercmt, create")
    console.log("req body " + req.body.date)
    db.Ridercomments
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  getUserdata: function(req, res) {
    console.log("in getUserdata")
    db.Rideuserinfos
      .findAll({ where: {userid: "1", parkid: "75", rideid: "10"}})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    console.log("in findbyid " + req.params.id )
    db.Parks
      .findById("75")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
