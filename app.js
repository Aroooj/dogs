require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const chalk = require("chalk");
const bodyParser = require("body-parser");
const expressSession = require("express-session");


const app = express();


const { PORT, MONGODB_URI } = process.env;


/**
* connect to database
*/
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
mongoose.connection.on("error", (err) => {
console.error(err);
console.log(
"MongoDB connection error. Please make sure MongoDB is running.",
 chalk.red("✗")
 );
 process.exit();
});


app.listen(PORT, () => {
    console.log(
    `Example app listening at http://localhost:2020}`,
    chalk.green("✓")
    );
    });