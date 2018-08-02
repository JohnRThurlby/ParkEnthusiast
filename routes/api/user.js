const router = require("express").Router();
const userController = require("../../controllers/userController");
console.log("in usercontroller")
// Matches with "/api/user"
router.route("/")
  .post(userController.create);

  // Matches with "/api/users/:id"
router.route("/find/:id")
.get(userController.findUsernick);

// Matches with "/api/users/:id"
router.route("/:id")
  .get(userController.findById);

module.exports = router;
