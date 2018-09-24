const router = require("express").Router();

const parkRoutes = require("./parks");
const userRoutes = require("./user");
const contactRoutes = require("./contact");

// parks routes
router.use("/contact", contactRoutes);
router.use("/parks", parkRoutes);
router.use("/user", userRoutes);


module.exports = router;
