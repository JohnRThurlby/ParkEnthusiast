import axios from "axios";
export default {
  // Gets the user with a given id
  getUsernick: function(userData) {
    return axios.get("/api/user/find/" + userData.id );
  },

  // Gets the user with a given email
  getUser: function(userData) {
    return axios.get("/api/user/" + userData.email);
  },
  // Saves a user to the database
  saveUser: function(userData) {
    return axios.post("/api/user", userData);
  },

  // Get park data based on State code
  getParksbyState: function(userData) {
    return axios.get("/api/parks/state/" + userData.id);
  },

  // Get park data based on id
  getPark: function(userData) {
    return axios.get("/api/parks/park/" + userData.id);
  },

  // Get park hours based on id
  getHours: function(userData) {
    return axios.get("/api/parks/hours/" + userData.parkid);
  },

  // Get park hours based on id
  getTickets: function(userData) {
    return axios.get("/api/parks/tickets/" + userData.parkid);
  },

  // Get ride data based on Park code
  getAllrides: function(userData) {
    return axios.get("/api/parks/allrides/" + userData.parkid);
  },

  // Get ride data based on Park code
  getRides: function(userData) {
    return axios.get("/api/parks/rideinfo/" + userData.parkid + userData.rideid);
  },
  // Get ride data based on Park code
  getComments: function(userData) {
    return axios.get("/api/parks/comments/" + userData.parkid + userData.rideid);
  },
  // Get ride data based on Park code
  getCommentsuser: function(userData) {
    return axios.get("/api/parks/commentsuser/" + userData.userid + userData.parkid + userData.rideid);
  },
  // Get ride data based on Park code
  getavgWait: function(userData) {
    return axios.get("/api/parks/avgwait", userData);
  },
  // Get ride data based on Park code
  getavgRating: function(userData) {
    return axios.get("/api/parks/avgrating", userData);
  },
  // Get ride data based on Park code
  getmaxWait: function(userData) {
    return axios.get("/api/parks/maxwait", userData);
  },
  // Get ride data based on Park code
  getminWait: function(userData) {
    return axios.get("/api/parks/minwait", userData);
  },
  // Get ride data based on Park code
  gettotalCount: function(userData) {
    return axios.get("/api/parks/totalcount/" + userData.parkid + userData.rideid);
  },
  // Get ride data based on Park code
  getdupCount: function(userData) {
    return axios.get("/api/parks/dupcount/" + userData.parkid + userData.rideid);
  },
  saveRideuserinfo: function(userData) {
    return axios.post("/api/parks/saveriderinfo", userData);
  },
  saveRideusercmt: function(userData) {
    return axios.post("/api/parks/saveridercmt", userData);
  },
  getUserdata: function(userData) {
    return axios.get("/api/parks/getuserdata/" + userData.parkid + userData.rideid);
  },
  getUserbyiddata: function(userData) {
    return axios.get("/api/parks/getuserbyiddata/" + userData.userid + userData.parkid + userData.rideid);
  },
  getUserdatabyuser: function(userData) {
    return axios.get("/api/parks/getuserdatabyuser/");
  },
  getUserdatabypark: function(userData) {
    return axios.get("/api/parks/getuserdatabypark/" + userData.userid + userData.parkid);
  },
  getUserdatabyride: function(userData) {
    return axios.get("/api/parks/getuserdatabyride/" + userData.userid + userData.parkid + userData.rideid);
  },
  updatePark: function(userData) {
    return axios.post("/api/parks/updatepark", userData);
  },
  addRide: function(userData) {
    return axios.post("/api/parks/addride", userData);
  }
};
