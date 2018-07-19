const router = require("express").Router()
const parksController = require("../../controllers/parksController")

console.log("in parkcontroller")

// Matches with "/api/parks"
router.route("/")
  .get(parksController.findAll)

// Matches with "/api/parks/:id"
router.route("/:id")
  .get(parksController.findById)

  // Matches with "/api/parks/hours/:id"
router.route("/hours/:id")
.get(parksController.findHoursbyid)

// Matches with "/api/parks/tickets/:id"
router.route("/tickets/:id")
  .get(parksController.findTicketsbyid)

  // Matches with "/api/parks/rides/:id"
router.route("/rides/:id")
  .get(parksController.findRidebyid)

module.exports = router
