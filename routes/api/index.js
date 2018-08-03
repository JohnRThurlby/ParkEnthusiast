const router = require("express").Router();
const parkRoutes = require("./parks");
const userRoutes = require("./user");

// parks routes

router.use("/parks", parkRoutes);
router.use("/user", userRoutes);

module.exports = router;
