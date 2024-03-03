require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connection = mysql.createConnection({
	host: process.env.MYSQL_HOST,
	port: process.env.MYSQL_PORT,
	database: process.env.MYSQL_DATABASE,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
});

connection.connect((err) => {
	if (err) {
		console.log("Error Ocurred while connecting mysql");
	} else {
		console.log("connected mysql sucessfully");
	}
});

let allData;
connection.query("SELECT * FROM `trains`", (errors, results, fields) => {
	if (errors) {
		console.log("Error occured during query");
	} else {
		allData = results;
	}
});

app.get("/", (req, res, next) => {
	console.log("request received");
	res.json(allData);
});

// app.post("/login", (req, res, next) => {
// 	console.log(req.body);
// 	res.send(1);
// 	// const { email, password, userType } = req.body;
// 	// connection.query("SELECT password from"+userType+"WHERE emailid="+email, (errors, results, fields) => {
// 	// 	if (errors) {
// 	// 		console.log("Error occured during query");
// 	// 	} else {
// 	// 		console.log(results);
// 	// 	}
// 	// });
// });

app.listen(5000, () => {
	console.log("Server Live on port 5000");
});
