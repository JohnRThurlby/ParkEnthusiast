const db = require("../models");
console.log("made it in here, parksController")
// Defining methods for the parksController
module.exports = {
  findAll: function(req, res) {
    console.log("in findAll")
    console.log("body " + req.body)

    console.log("query " + req.query)
    db.Parks
      .findAll({ where: {parkstate: "FL"}})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findState: function(req, res) {
    console.log("in findState")
    console.log(req.params.id)
    console.log("body " + req.body)
    console.log("query " + req.query)

    db.Parks
      .findAll({ where: {parkstate: req.params.id}})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findOne: function(req, res) {
    db.Parks
      .findOne({ where: {id: + req.params.id }})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findHoursbyid: function(req, res) {
    db.Parkhours
      .findOne({where: {parkid: req.params.id}})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findTicketsbyid: function(req, res) {
    db.Parktickets
      .findOne({ where: {parkid: req.params.id}})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findAllrides: function(req, res) {
    console.log("in findAllrides " + req.params.id)
    db.Parkrides
      .findAll({ where: {parkid: req.params.id}})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findRides: function(req, res) {
    console.log("in findRides " + req.params.id )
    let parkid = req.params.id.substr(0, 2)
    let rideid = req.params.id.substr(2, 2)
    db.Parkrides
      .findOne({ where: {parkid: parkid, id: rideid}})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findComments: function(req, res) {
    console.log("in findComments ")
    let parkid = req.params.id.substr(0, 2)
    let rideid = req.params.id.substr(2, 2)
    db.Ridercomments
      .findAll({ where: {parkid: parkid, rideid: rideid}})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findAvgwait: function(req, res) {
    console.log("in findAvgwait ")
    db.Rideuserinfos
     .findOne({ where: {userid: "1", parkid: "75", rideid: "10"}}
    
    )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findAvgrating: function(req, res) {
    console.log("in findAvgrating ")
    db.Rideuserinfos
      .findOne({ where: {parkid: "75", rideid: "10"}}
    )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findMaxwait: function(req, res) {
    console.log("in findMaxwait ")
    db.Rideuserinfos
      .max("waittime", { where: {parkid: "75", rideid: "10"}}
    
    )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findMinwait: function(req, res) {
    console.log("in findMinxwait ")
    db.Rideuserinfos
      .min("waittime", { where: {parkid: "75", rideid: "10"}}
    
    )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findTotalcount: function(req, res) {
    console.log("in findTotalcount ")
    let parkid = req.params.id.substr(0, 2)
    let rideid = req.params.id.substr(2, 2)
    db.Rideuserinfos
      .count({where: {parkid: parkid, rideid: rideid}})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findDupcount: function(req, res) {
    console.log("in findDupcount ")
    let parkid = req.params.id.substr(0, 2)
    let rideid = req.params.id.substr(2, 2)
    db.Rideuserinfos
      .count({ where: {parkid: parkid, rideid: rideid}, distinct: true, col: 'userid'}
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
    let parkid = req.params.id.substr(0, 2)
    let rideid = req.params.id.substr(2, 2)
    db.Rideuserinfos
      .findAll({ where: {parkid: parkid, rideid: rideid}})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  getUserbyiddata: function(req, res) {
    console.log("in getUserbyiddata")
    let i      = req.params.id.indexOf("?")
    let userid = req.params.id.substr(0, )
    let parkid = req.params.id.substr(0 + 1, 2)
    let rideid = req.params.id.substr(0 + 3, 2)
    db.Rideuserinfos
      .findAll({ where: {userid: userid, parkid: parkid, rideid: rideid}})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  getUserdatabyuser: function(req, res) {
    console.log("in getUserdatabyuser")
    db.Rideuserinfos
      .findAll()
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  getUserdatabypark: function(req, res) {
    console.log("in getUserdatabypark")
    let userid = "1"
    let parkid = "75"
    db.Rideuserinfos
      .findAll({ where: {userid: userid, parkid: parkid} , distinct: true, col: 'userid'})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  getUserdatabyride: function(req, res) {
    console.log("in getUserdatabyride")
    let i      = req.params.id.indexOf("?")
    let userid = req.params.id.substr(0, 1)
    let parkid = req.params.id.substr(0 + 1, 2)
    let rideid = req.params.id.substr(0 + 3, 2)
    db.Rideuserinfos
      .findAll({ where: {userid: userid, parkid: parkid, rideid: rideid} , distinct: true, col: 'userid'})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    console.log("in findbyid " + req.params.id )
    db.Parks
      .findById("74")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
