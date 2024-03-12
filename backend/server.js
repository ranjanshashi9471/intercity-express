require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = express();
app.use(cors());
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
	let passwordHash;
	console.log(req.body.data);
	const { email, password, userType } = req.body.data;

	connection.query(
		`SELECT name,password from ${userType} WHERE email_id = ?`,
		[email],
		(error, result, fields) => {
			if (result.length != 0) {
				passwordHash = result[0].password;
				userName = result[0].name;
				checkUser(userName, password, passwordHash);
			} else if (result.length == 0) {
				res.status(200).json({ message: "usernotfound" });
			} else if (error) {
				res.status(200).json({ message: "errorcheckinguser" });
			}
		}
	);

	async function checkUser(userName, plainpassword, passwordHash) {
		//... fetch user from a db etc.

		const match = await bcrypt.compare(plainpassword, passwordHash);

		if (match) {
			res.status(200).json({
				message: "success",
				userName: userName,
			});
		} else {
			res.status(200).json({ message: "passwordmismatch" });
		}
	}
});

//---------------------------------------------------------signup Route-------------------------------------------------------------------------------------------//

app.post("/signup", (req, res, next) => {
	let msg;
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

	checkExistingUser(userType, email);
	// res.status(200).json(msg);

	async function checkExistingUser(userTypeL, emailL) {
		const checkUserExistsQuery = `SELECT * FROM ${userTypeL} WHERE email_id = ?`;

		await connection.query(
			checkUserExistsQuery,
			[emailL],
			(error, res1, fields) => {
				if (res1.length != 0) {
					console.log("User Exists Listing Down Users :");
					console.log(res1);
					res.status(200).json("userexists!");
				} else {
					hashingPassword();
				}
			}
		);
	}

	async function hashingPassword() {
		await bcrypt.hash(password, saltRounds, function (err, hash) {
			if (err) {
				console.log(err);
			} else {
				console.log(hash);
				insertNewUser(hash);
			}
			// Store hash in your password DB.
		});
	}

	async function insertNewUser(hashedPassword) {
		const insertArgs = [
			name,
			age,
			email,
			gender,
			hashedPassword,
			contact_no,
			residence_city,
		];

		await connection.query(
			`INSERT INTO ${userType} values (REPLACE(UUID(),"-",""), ?,?,?,?,?,?,?)`,
			insertArgs,
			(error, result, field) => {
				if (error) {
					console.log(error);
					res.json("registrationfailed");
				} else {
					console.log(result);
					res.status(200).json("success");
				}
			}
		);
	}
});

//--------------------------------------------------------------------Listen Function-----------------------------------------------------------------------------------------//

app.listen(5000, () => {
	console.log("Server Live on port 5000");
});
