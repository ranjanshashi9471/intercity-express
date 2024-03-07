require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const saltRounds = 10;

//-------------------------------------------------------MYSQL Section--------------------------------------------------------------//

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
//-----------------------------------------------Login Route------------------------------------------------------------------//

app.post("/login", (req, res, next) => {
	const { email, password, userType } = req.body.data;
	reqQuery = "SELECT password from " + userType + " WHERE email_id = " + email;
	console.log(reqQuery);
	// queryFunction(reqQuery);
	console.log(req.body);
	res.status(200).json("success");
});

//---------------------------------------------------------signup Route--------------------------------------------------------//

app.post("/signup", (req, res, next) => {
	console.log(req.body);

	const {
		name,
		email,
		password,
		userType,
		gender,
		age,
		contact_no,
		residence_city,
	} = req.body.data;

	hashingPassword();
	async function hashingPassword() {
		await bcrypt.hash(password, saltRounds, function (err, hash) {
			if (err) {
				console.log(err);
			} else {
				console.log(hash);
				queryFunction(hash);
			}
			// Store hash in your password DB.
		});
	}

	async function queryFunction(hashedPassword) {
		await connection.query(
			`INSERT INTO ${userType} values (UUID(), ?,?,?,?,?,?,?)`,
			[name, age, email, gender, hashedPassword, contact_no, residence_city],
			(error, result, field) => {
				if (error) {
					console.log(error);
					res.json("failure");
				} else {
					console.log(result);
					// console.log(field);
					res.status(200).json("success");
				}
			}
		);
	}
	// queryFunction();
});

//--------------------------------------------------------------------Listen Function-------------------------------------------------//

app.listen(5000, () => {
	console.log("Server Live on port 5000");
});
