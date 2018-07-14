import axios from "axios";
console.log("in API.js")
export default {
  // Gets the user with a given email
    getUser: function(id) {
    return axios.get("/api/user/" + id);
  },
  // Saves a user to the database
  saveUser: function(userData) {
    console.log("in API.js, axios.post")
    console.log(userData)
    return axios.post("/api/user", userData);
  }
};
