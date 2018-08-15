const router = require("express").Router();

// Matches with "/api/contact"
router.route('/contact', (req, res) => {
   console.log("body " + req.body)

})

module.exports = router;
