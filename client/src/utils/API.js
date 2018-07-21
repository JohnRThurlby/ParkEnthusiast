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
  getParks: function(userData) {
    console.log("in API.js, axios.getParks")
    console.log(userData)
    return axios.get("/api/parks", userData);
  },

  // Get park data based on id
  getPark: function(userData) {
    console.log("in API.js, axios.getPark")
    console.log(userData)
    return axios.get("/api/parks/" , userData);
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
    return axios.get("/api/parks/rides/:id", userData);
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
  }
};
