// Written by John R. Thurlby July 2018

const express = require("express"),
      bodyParser = require("body-parser")
      

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.static('public'))

// Requiring our models for syncing
var db = require("./models")

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Static directory
app.use(express.static("./public"));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
//app.use(routes);

//db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
  })
//}) 

