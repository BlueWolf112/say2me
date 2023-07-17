const mysql = require("mysql")
// route to server
var hostname = "jyi.h.filess.io";
var database = "say2me_bordermore";
var port = "3307";
var username = "say2me_bordermore";
var password = "4f5927e0a4b2c79991fe3b9a97a2b5836e2de607";

const db = mysql.createConnection({
  host: hostname,
  user: username,
  password: password,
  database: database,
  port: port,
});
module.exports = db;
