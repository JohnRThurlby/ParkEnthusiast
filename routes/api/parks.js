const router = require("express").Router()
const parksController = require("../../controllers/parksController")

  // Matches with "/api/parks/hours/:id"
router.route("/hours/:id")
.get(parksController.findHoursbyid)

// Matches with "/api/parks/tickets/:id"
router.route("/tickets/:id")
  .get(parksController.findTicketsbyid)

  // Matches with "/api/parks/allrides"
router.route("/allrides/:id")
  .get(parksController.findAllrides)

  // Matches with "/api/parks/rides"
router.route("/rideinfo/:id")
  .get(parksController.findRides)

  // Matches with "/api/parks/rides"
router.route("/comments/:id")
.get(parksController.findComments)

// Matches with "/api/parks/avgwait"
router.route("/avgwait")
.get(parksController.findAvgwait)

// Matches with "/api/parks/avgrating"
router.route("/avgrating")
.get(parksController.findAvgrating)

// Matches with "/api/parks/maxnwait"
router.route("/maxwait")
.get(parksController.findMaxwait)

// Matches with "/api/parks/minwait"
router.route("/minwait")
.get(parksController.findMinwait)

// Matches with "/api/parks/totalcount"
router.route("/totalcount/:id")
.get(parksController.findTotalcount)

// Matches with "/api/parks/dupcount"
router.route("/dupcount/:id")
.get(parksController.findDupcount)

// Matches with "/api/parks/dupcount"
router.route("/state/:id")
.get(parksController.findState)

  // Matches with "/api/parks/park"
router.route("/park/:id")
.get(parksController.findOne)

// Matches with "/api/parks/:id"
router.route("/saveriderinfo")
  .post(parksController.createRiderinfo);

  // Matches with "/api/parks/:id"
router.route("/saveridercmt")
.post(parksController.createRidercmt);

// Matches with "/api/parks/:id"
router.route("/getuserdata/:id")
.get(parksController.getUserdata);

// Matches with "/api/parks/:id"
router.route("/getuserbyiddata/:id")
.get(parksController.getUserbyiddata);

// Matches with "/api/parks/:id"
router.route("/getuserdatabyuser")
.get(parksController.getUserdatabyuser);

// Matches with "/api/parks/:id"
router.route("/getuserdatabypark/:id")
.get(parksController.getUserdatabypark);

// Matches with "/api/parks/:id"
router.route("/getuserdatabyride/:id")
.get(parksController.getUserdatabyride);

  // Matches with "/api/parks"
router.route("/")
.get(parksController.findAll)

// Matches with "/api/parks/:id"
router.route("/:id")
  .get(parksController.findById)


module.exports = router
