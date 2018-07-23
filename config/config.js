require("dotenv").config()

module.exports = {
  "development": {
    "username": "root",
    "password": "Noelrr01",
    "database": "parkenthusiast_db",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "dialect": "mysql",
    "use_env_variable": "JAWSDB.URL"
  }
}
