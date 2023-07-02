require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const chalk = require("chalk");
const bodyParser = require("body-parser");
const expressSession = require("express-session");
const User = require("./models/User");


const app = express();
app.set('view engine', 'ejs');


const homeController = require("./controllers/home")
const dogsController = require("./controllers/dogs")
const canadaController = require("./controllers/canada")
const chinaController = require("./controllers/china")
const englandController = require("./controllers/england")
const germanyController = require("./controllers/germany")
const dogsApiController = require("./controllers/api/searched-dogs")
const userController = require("./controllers/user")






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

//Middleware//
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(expressSession({ secret: 'foo bar', cookie: { expires: new Date(253402300000000) } }))


app.use("*", async (req, res, next) => {
  global.user = false;
  if (req.session.userID && !global.user) {
    const user = await User.findById(req.session.userID);
    global.user = user;
  }
  next();
})

const authMiddleware = async (req, res, next) => {
  const user = await User.findById(req.session.userID);
  if (!user) {
    return res.redirect('/');
  }
  next()
}

app.get("/", homeController.list);

app.get("/alldogs", dogsController.list);
app.get("/alldogs/delete/:id", dogsController.delete);
app.get("/alldogs/edit/:id", dogsController.edit);
app.post("/alldogs/update/:id", dogsController.update);

app.get("/canada", canadaController.list);
app.get("/canada/delete/:id", canadaController.delete);
app.post("/canada/update/:id", canadaController.update)
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

app.get("/search-dogs",(req,res) => {
    res.render('search-dogs', dogsApiController);
  });
  app.get("/api/searched-dogs", dogsApiController.list);


  app.get("/login", (req, res) => {
    res.render('login', { errors: {} })
  });
  app.post("/login", userController.login);
  
  app.get("/register", (req, res) => {
    res.render('register', { errors: {} })
  });
  app.post("/register", userController.create);
  
  app.get("/logout", async (req, res) => {
    req.session.destroy();
    global.user = false;
    res.redirect('/');
  })
  
  app.get("/create-dogs", authMiddleware, (req, res) => {
    res.render("create-dogs", { errors: {} });
  });
  app.post("/create-dogs", dogsController.create);
  
  
  


app.listen(PORT, () => {
    console.log(
    `Example app listening at http://localhost:${PORT}}`,
    chalk.green("✓")
    );
    });