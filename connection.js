const mysql = require("mysql")
// route to server
var hostname = "ru1.h.filess.io";
var database = "say2me_sticklife";
var port = "3306";
var username = "say2me_sticklife";
var password = "fd60b6cb436e8be5bcba5c3e29251c5932cc9807";

const db = mysql.createConnection({
	host: hostname,
  user: username,
  password: password,
  database: database,
  port: port,
});
module.exports = db;
