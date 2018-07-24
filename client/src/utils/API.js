import axios from "axios";
console.log("in API.js")
export default {
  // Gets the user with a given email
  getUser: function(userData) {
    console.log("in API.js, axios.getUser")
    console.log(userData)
    return axios.get("/api/user/" + userData.email + userData.userpassword );
  },
  // Saves a user to the database
  saveUser: function(userData) {
    console.log("in API.js, axios.saveUser")
    console.log(userData)
    return axios.post("/api/user", userData);
  },

  // Get park data based on State code
  getParksbyState: function(userData) {
    console.log("in API.js, axios.getParks by state")
    console.log(userData)
    return axios.get("/api/parks/state");
  },

  // Get park data based on id
  getPark: function(userData) {
    console.log("in API.js, axios.getPark")
    console.log(userData)
    return axios.get("/api/parks/park" , userData);
  },

  // Get park hours based on id
  getHours: function(userData) {
    console.log("in API.js, axios.gethours")
    console.log(userData)
    return axios.get("/api/parks/hours/:id", userData);
  },

  // Get park hours based on id
  getTickets: function(userData) {
    console.log("in API.js, axios.gettickets")
    console.log(userData)
    return axios.get("/api/parks/tickets/:id", userData);
  },

  // Get ride data based on Park code
  getAllrides: function(userData) {
    console.log("in API.js, axios.getAllRides")
    console.log(userData)
    return axios.get("/api/parks/allrides", userData);
  },

  // Get ride data based on Park code
  getRides: function(userData) {
    console.log("in API.js, axios.getParkRides")
    console.log(userData)
    return axios.get("/api/parks/rideinfo/:id", userData);
  },
  // Get ride data based on Park code
  getComments: function(userData) {
    console.log("in API.js, axios.getComments")
    console.log(userData)
    return axios.get("/api/parks/comments", userData);
  },
  // Get ride data based on Park code
  getavgWait: function(userData) {
    console.log("in API.js, axios.get avg wait")
    console.log(userData)
    return axios.get("/api/parks/avgwait", userData);
  },
  // Get ride data based on Park code
  getavgRating: function(userData) {
    console.log("in API.js, axios.get avg rating")
    console.log(userData)
    return axios.get("/api/parks/avgrating", userData);
  },
  // Get ride data based on Park code
  getmaxWait: function(userData) {
    console.log("in API.js, axios.get max wait")
    console.log(userData)
    return axios.get("/api/parks/maxwait", userData);
  },
  // Get ride data based on Park code
  getminWait: function(userData) {
    console.log("in API.js, axios.get min wait")
    console.log(userData)
    return axios.get("/api/parks/minwait", userData);
  },
  // Get ride data based on Park code
  gettotalCount: function(userData) {
    console.log("in API.js, axios.get total count")
    console.log(userData)
    return axios.get("/api/parks/totalcount", userData);
  },
  // Get ride data based on Park code
  getdupCount: function(userData) {
    console.log("in API.js, axios.get dup count")
    console.log(userData)
    return axios.get("/api/parks/dupcount", userData);
  },
  saveRideuserinfo: function(userData) {
    console.log("in API.js, axios.saveRideuerinfo")
    console.log(userData)
    return axios.post("/api/parks/saveriderinfo", userData);
  },
  saveRideusercmt: function(userData) {
    console.log("in API.js, axios.saveRideusercmt")
    console.log(userData)
    return axios.post("/api/parks/saveridercmt", userData);
  },
  getUserdata: function(userData) {
    console.log("in API.js, axios.getUserdata")
    console.log(userData)
    return axios.get("/api/parks/getuserdata", userData);
  }
};
