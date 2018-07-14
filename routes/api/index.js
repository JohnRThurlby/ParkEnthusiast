const router = require("express").Router();
const parkRoutes = require("./parks");
const userRoutes = require("./user");

// parks routes

console.log("in index.js in api dir")
router.use("/parks", parkRoutes);
router.use("/user", userRoutes);

module.exports = router;
