require("dotenv").config();
const express = require("express");
const cors = require("cors");
const AuthRoute = require("./routes/Auth");
const infoRoute = require("./routes/Info");
const mySqlPool = require("./config/db");

const app = express();

app.use(cors({}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mySqlPool
	.query("SELECT 1")
	.then(() => {
		console.log("MYSQL SERVER CONNECTED");
		app.listen(5000, () => {
			console.log("Server Running on Port 5000");
		});
	})
	.catch((err) => {
		console.error(err);
	});

app.use("/auth", AuthRoute);
app.use("/info", infoRoute);
