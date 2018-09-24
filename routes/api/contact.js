const router = require("express").Router();
const contactController = require("../../controllers/contactController");

// Matches with "/api/contact"
router.route("/")
  .post(contactController.mail);

  // Matches with "/api/contact"
router.route("/forgot")
.post(contactController.forgot);

module.exports = router;
