const bcrypt = require("bcrypt");
const db = require("../config/db");

const loginUser = async (req, res) => {
	try {
		const { email, password, userType } = req.body;
		const getUserQuery = `SELECT id, name, password from ${userType} WHERE email = '${email}'`;

		const data = await db.query(getUserQuery);
		if (data[0][0].length == 0) {
			console.log("User doesn't exist!!");
			res.status(400).send({
				success: false,
				message: "You are not registered!!",
			});
		} else {
			console.log(data[0][0].id.toString("hex"));
			try {
				const match = await bcrypt.compare(password, data[0][0].password);
				if (match) {
					res.status(200).send({
						success: true,
						message: "Successful Login",
						userData: [
							data[0][0].name,
							email,
							userType,
							data[0][0].id.toString("hex"),
						],
					});
				} else {
					res.status(400).send({
						success: false,
						message: "Please Check Email or Password!",
					});
				}
			} catch (error) {
				console.log(error);
				res.status(500).send({
					success: false,
					message: "Error Hash Comparison!!",
				});
			}
		}
	} catch (error) {
		console.log("try catch error");
		res.status(500).send({
			success: false,
			message: error.message,
		});
	}
};

const registerUser = async (req, res) => {
	try {
		const {
			name,
			email,
			password,
			userType,
			gender,
			age,
			contact_no,
			residence_city,
		} = req.body;

		const chkExisting = await db.query(
			`SELECT * FROM ${userType} WHERE email = '${email}'`
		);
		if (chkExisting[0].length > 0) {
			//user exists
			res.status(400).send({
				success: false,
				messsage: "User already Exists!",
			});
		} else {
			//user doesn't exists
			let hashedPassword = null;
			try {
				hashedPassword = await bcrypt.hash(password, 10);
			} catch (error) {
				res.status(500).send({
					success: false,
					message: "Error Hashing Password!!",
				});
			}

			if (hashedPassword) {
				const userRegisterQuery = `INSERT INTO ${userType} values (UNHEX(REPLACE(UUID(),"-","")), '${name}', ${age}, '${email}','${gender}', '${hashedPassword}', '${contact_no}', '${residence_city}')`;

				try {
					const result = await db.execute(userRegisterQuery);
					console.log(result);
					res.status(200).send({
						success: true,
						message: "success",
					});
				} catch (error) {
					console.log(error);
					res.status(500).send({
						success: false,
						message: "Registration Failed!!",
					});
				}
			}
		}
	} catch (error) {
		console.log(error);
		res.status(500).send({
			success: false,
			message: error.message,
		});
	}
};

module.exports = { loginUser, registerUser };
