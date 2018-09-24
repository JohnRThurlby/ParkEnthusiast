const db = require("../models");
// Defining methods for the parksController
module.exports = {
  findAll: function(req, res) {

    db.Parks
      .findAll({ where: {parkstate: "FL"}})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findState: function(req, res) {

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
    db.Parkrides
      .findAll({ where: {parkid: req.params.id}})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findRides: function(req, res) {
    let parkid = req.params.id.substr(0, 2)
    let rideid = req.params.id.substr(2, 2)
    db.Parkrides
      .findOne({ where: {parkid: parkid, id: rideid}})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findComments: function(req, res) {
    let parkid = req.params.id.substr(0, 2)
    let rideid = req.params.id.substr(2, 2)
    db.Ridercomments
      .findAll({ where: {parkid: parkid, rideid: rideid}})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findCommentsbyUser: function(req, res) {
    let i      = req.params.id.indexOf(".com")
    let userid = req.params.id.substr(0, i)
    let parkid = req.params.id.substr(i + 4, 2)
    let rideid = req.params.id.substr(i + 6)
    db.Ridercomments
      .findAll({ where: {userid: userid, parkid: parkid, rideid: rideid}})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findAvgwait: function(req, res) {
    db.Rideuserinfos
     .findOne({ where: {userid: "1", parkid: "75", rideid: "10"}}
    
    )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findAvgrating: function(req, res) {
    db.Rideuserinfos
      .findOne({ where: {parkid: "75", rideid: "10"}}
    )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findMaxwait: function(req, res) {
    db.Rideuserinfos
      .max("waittime", { where: {parkid: "75", rideid: "10"}}
    
    )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findMinwait: function(req, res) {
    db.Rideuserinfos
      .min("waittime", { where: {parkid: "75", rideid: "10"}}
    
    )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findTotalcount: function(req, res) {
    let parkid = req.params.id.substr(0, 2)
    let rideid = req.params.id.substr(2, 2)
    db.Rideuserinfos
      .count({where: {parkid: parkid, rideid: rideid}})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findDupcount: function(req, res) {
    let parkid = req.params.id.substr(0, 2)
    let rideid = req.params.id.substr(2, 2)
    db.Rideuserinfos
      .count({ where: {parkid: parkid, rideid: rideid}, distinct: true, col: 'userid'}
    )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  createRiderinfo: function(req, res) {
    db.Rideuserinfos
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  createRidercmt: function(req, res) {
    db.Ridercomments
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  createRide: function(req, res) {
    db.Parkrides
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  updatePark: function(req, res) {
    db.Parks
      .update(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  getUserdata: function(req, res) {
    let parkid = req.params.id.substr(0, 2)
    let rideid = req.params.id.substr(2, 2)
    db.Rideuserinfos
      .findAll({ where: {parkid: parkid, rideid: rideid}})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  getUserbyiddata: function(req, res) {
    let i      = req.params.id.indexOf(".com")
    let userid = req.params.id.substr(0, i)
    let parkid = req.params.id.substr(i + 4, 2)
    let rideid = req.params.id.substr(i + 6)
    db.Rideuserinfos
      .findAll({ where: {userid: userid, parkid: parkid, rideid: rideid}})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  getUserdatabyuser: function(req, res) {
    db.Rideuserinfos
      .findAll({ group: 'userid'})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  getUserdatabypark: function(req, res) {
    let userid = "1"
    let parkid = "75"
    db.Rideuserinfos
      .findAll({ where: {userid: userid, parkid: parkid} , distinct: true, col: 'userid'})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  getUserdatabyride: function(req, res) {
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
    db.Parks
      .findById("74")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
