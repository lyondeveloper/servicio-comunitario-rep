require("./config/config");
require("colors");
const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const hbs = require("hbs");
const passport = require("passport");
const session = require("express-session");

//Middlewares
app.use(express.static(path.resolve(__dirname, "../views")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));
app.use(require("./routes/routes"));
hbs.registerPartials(path.resolve(__dirname, "../views/partials"));
app.set("view engine", "hbs");

const server = http.createServer(app);

//Passport configuration
app.use(passport.initialize());
require("./config/passport")(passport);

mongoose.connect(
  process.env.MONGOURI,
  err => {
    if (err) {
      throw new Error("Unable to connect to MongoDB".red);
    }

    console.log("mLab Data base connected".green);
  }
);

server.listen(process.env.PORT, () => {
  console.log(`Server running in port ${process.env.PORT}`.yellow);
});
