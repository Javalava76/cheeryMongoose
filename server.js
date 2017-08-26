// Dependencies
const express = require("express");
const exphbs  = require('express-handlebars');
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

// // Requiring our News and Comment models
// const News = require("./models/News.js");
// const Comment = require("./models/Comment.js");

// Our scraping tools
const request = require("request");
const cheerio = require("cheerio");

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;


// Initialize Express
const app = express();

// Sets up the Express app to handle data parsing
// =============================================================
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));


// Set Handlebars as the default templating engine.
// =============================================================
let hbs = exphbs.create({
  defaultLayout:'main',
  helpers: {
    // section: function(name, options){
    //     if(!this._sections) this._sections = {};
    //     this._sections[name] = options.fn(this);
    //     return null;
    // },
    // plantImg: function(img){
    //     return "/plant/" + img;
    // }, 
    // plantSearch: function(name){
    //   let formattedName = name.replace(/\s/, '+');
    //   return "/search?plantName=" + formattedName;
    // }
  }
})

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");



// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

// Make public a static dir
app.use(express.static("public"));

// Database configuration with mongoose
mongoose.connect("mongodb://localhost/pitchforkNews");
const db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});


// Routes
// ======

let indexRoute = require('./routes/index-route.js');
let savedRoute = require('./routes/saved-route.js');


app.use('/', indexRoute);
app.use('/', savedRoute);



// Listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});