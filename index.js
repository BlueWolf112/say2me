// Require source
const express = require("express")
const bodyParser = require("body-parser")
const db = require('./connection')
const app = express()
const PORT = process.env.PORT || 3515;

//connect to other resouces
app.use('/public', express.static('public'))
app.use('/sent', express.static('sent'))
app.use(bodyParser.urlencoded({ extended: true }))
// set file html
app.set("view engine", "ejs")
app.set("views", "views")

// Connecting to others
db.connect((err) => {
	if (err) throw err
	console.log("Website ready on port " + PORT);
	//menampilkan input (main) page
	app.get("/", (req,res) => {
		res.render("index");
	})

	//untuk insert data di input (main) page
	app.post("/sent", (req, res) => {
		const insertSql = `INSERT INTO users (message) VALUES ('${req.body.pesan}');`
		db.query(insertSql, (err, result) => {
			if (err) throw err
				res.redirect("/sent")
		})
	})

	//menampilkan hasil data
	app.get("/analytic", (req, res) => {
		const sql = "SELECT * FROM `users`"
		db.query(sql, (err, result) => {
			const users = JSON.parse(JSON.stringify(result))
			res.render("analytic/index", {users: users, title: "Hasil Respon User"});
		})
	})

	//menampilkan data spesifik berdasarkan id
	app.get("/analytic/:id", (req, res) => {
		const id = req.params.id;
		//get specific data using querry sql
		const sqlById = "SELECT `message` FROM `users` WHERE `id` = " + id;
		const params = [id];
		db.query(sqlById, params, (err, rows) => {
			if (err) throw err
			users = rows[0];
			const rusak = "Data respon tidak ditemukan.";
			if (users == undefined || null) {
				res.render("analytic/specific", {users:rusak});
			} else {
				res.render("analytic/specific", {users:users});
			}
		})
	})
})
//set listening
app.listen(PORT, () => {
	console.log("Preparing to connect database...");
});
