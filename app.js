require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const chalk = require("chalk");
const bodyParser = require("body-parser");
const expressSession = require("express-session");


const app = express();
app.set('view engine', 'ejs');


const homeController = require("./controllers/home")
const dogsController = require("./controllers/dogs")
const canadaController = require("./controllers/canada")
const chinaController = require("./controllers/china")
const englandController = require("./controllers/england")
const germanyController = require("./controllers/germany")
const dogsSearchController = require("./controllers/api/searched_dogs")






const { PORT, MONGODB_URI } = process.env;


//database conn//
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
mongoose.connection.on("error", (err) => {
console.error(err);
console.log(
"MongoDB connection error. Please make sure MongoDB is running.",
 chalk.red("✗")
 );
 process.exit();
});

app.get("/", homeController.list);

app.get("/alldogs", dogsController.list);
app.get("/alldogs/delete/:id", dogsController.delete);
app.post("/alldogs/update/:id", dogsController.update);
app.get("/alldogs/edit/:id", dogsController.edit);

app.get("/canada", canadaController.list);
app.get("/canada/delete/:id", canadaController.delete);
app.post("/canad/update/:ida", canadaController.update)
app.get("/canada/edit/:id", canadaController.edit);

app.get("/china", chinaController.list);
app.get("/china/delete/:id", chinaController.delete);
app.post("/china/update/:id", chinaController.update)
app.get("/china/edit/:id", chinaController.edit);

app.get("/england", englandController.list);
app.get("/england/delete/:id", englandController.delete);
app.post("/england/update/:id", englandController.update)
app.get("/england/edit/:id", englandController.edit);

app.get("/germany", germanyController.list);
app.get("/germany/delete/:id", germanyController.delete);
app.post("/germany/update/:id", germanyController.update)
app.get("/germany/edit/:id", germanyController.edit);



app.listen(PORT, () => {
    console.log(
    `Example app listening at http://localhost:${PORT}}`,
    chalk.green("✓")
    );
    });