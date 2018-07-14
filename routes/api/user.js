const router = require("express").Router();
const userController = require("../../controllers/userController");
console.log("in usercontrollere")
// Matches with "/api/user"
router.route("/")
  .get(userController.findAll)
  .post(userController.create);

// Matches with "/api/users/:id"
router
  .route("/:id")
  .get(userController.findById)
  .put(userController.update)
  .delete(userController.remove);

module.exports = router;
