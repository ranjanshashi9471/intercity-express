require('dotenv').config();
const express = require("express");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD
});

connection.connect((err) => {
  if (err) {
    console.log("Error Ocurred while connecting mysql");
  } else {
    console.log("connected mysql sucessfully");
  }
});

connection.query("SELECT * FROM `trains`", (errors, results, fields) => {
  if (errors) {
    console.log("Error occured during query");
  } else {
    console.log(results);
  }
});

let app = express();

app.get("/", (req, res, next) => {
  res.send("Request Received");
  console.log(req);
});

app.listen(5000, () => {
  console.log("Server Live on port 5000");
});
