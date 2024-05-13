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

//---------------------------------------------------------Get Stations--------------------------------------------------------------------------------//

app.get("/stations", (req, res) => {
	async function getStations() {
		await connection.query(
			"SELECT station_code, station_name from stations",
			(error, result, fields) => {
				if (error) {
					res.status(200).json({
						message: "error",
						stations: {},
					});
				} else {
					res.status(200).json({
						message: "success",
						stations: result,
					});
				}
			}
		);
	}
	getStations();
});

//---------------------------------------------------------Searching Train---------------------------------------------------------//

app.post("/searchtrain", (req, res) => {
	const { startStn, endStn, date } = req.body.data;
	console.log(req.body.data);
	connection.query(
		`select dttt.*, r.route_name, r.time_taken, r.total_dist_km from routes r, (select dtt.*, t.train_name from trains t, (select ts.route_no, ts.train_no, dt.station_code as strtStn, ts.station_code as destStn, dt.EDT, ts.EAT from train_schedule ts,(select * from train_schedule where station_code = ? and EAT is null) dt where dt.train_no=ts.train_no and ts.EDT is null) dtt where dtt.train_no = t.train_no) dttt where dttt.route_no = r.route_no;`,
		[startStn],
		(error, result, fields) => {
			if (error) {
				console.log(error);
				res.status(200).json({
					message: "Database Error!!",
					trainData: {},
				});
			} else if (result.length == 0) {
				res.status(200).json({
					message: "No Trains Found!!",
					trainData: {},
				});
			} else if (result.length > 0) {
				console.log(result);
				res.status(200).json({
					message: "Success",
					trainData: result,
				});
			}
		}
	);
});

//-----------------------------------------------Login Route------------------------------------------------------------------//

app.post("/login", (req, res, next) => {
	let passwordHash;
	// console.log(req.body.data);
	const { email, password, userType } = req.body.data;

	connection.query(
		`SELECT id,name,password from ${userType} WHERE email_id = ?`,
		[email],
		(error, result, fields) => {
			if (result.length != 0) {
				passwordHash = result[0].password;
				userName = result[0].name;
				id = result[0].id;
				checkUser(userName, id, email, userType, password, passwordHash);
			} else if (result.length == 0) {
				res.status(200).json({ message: "usernotfound" });
			} else if (error) {
				res.status(200).json({ message: "errorcheckinguser" });
			}
		}
	);

	async function checkUser(
		userName,
		userId,
		userEmail,
		userType,
		plainpassword,
		passwordHash
	) {
		//... fetch user from a db etc.
		const user = {
			name: userName,
			email: userEmail,
			userType: userType,
			id: userId,
		};

		const match = await bcrypt.compare(plainpassword, passwordHash);

		if (match) {
			res.status(200).json({
				message: "success",
				userData: user,
			});
		} else {
			res.status(200).json({ message: "passwordmismatch" });
		}
	}
});

//---------------------------------------------------------signup Route------------------------------------------------------------------------------------//

app.post("/signup", (req, res, next) => {
	let msg;
	// console.log(req.body);

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
				// console.log(hash);
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
					// console.log(result);
					res.status(200).json("success");
				}
			}
		);
	}
});

//--------------------------------------------------------------------Listen function-----------------------------------------------------------------------------------------//

app.listen(5000, () => {
	console.log("Server Live on port 5000");
});
