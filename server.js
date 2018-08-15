// Written by John R. Thurlby July 2018

const express = require("express"),
      bodyParser = require("body-parser"),
      routes = require('./routes'),
      cookieParser = require('cookie-parser'),
      // bcrypt = require('bcrypt'),
      jwt = require('jsonwebtoken');
      exjwt = require('express-jwt');

const app = express();

const PORT = process.env.PORT || 3001;

/*========= Here we want to let the server know that we should expect and allow a header with the content-type of 'Authorization' ============*/
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
  next();
});

app.use(express.static('public'))

// Requiring our models for syncing
var db = require("./models")

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

/*========= Here we will set up an express jsonwebtoken middleware(simply required for express to properly utilize the token for requests) You MUST instantiate this with the same secret that will be sent to the client ============*/
const jwtMW = exjwt({
  secret: 'keyboard cat 4 ever'
})

// Static directory
app.use(express.static("./public"));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);

db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
  })
}) 

