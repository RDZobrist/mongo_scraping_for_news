// Dependencies
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Require the routes and give the server access to them
var routes = require('./routes/routes');


// requiring the news and notes models
const Article = require('./models/Article.js');
const Note = require('./models/Note.js');

// Set the PORT to 3000
const PORT = process.env.PORT || 3000;

// Set Handlebars.
const exphbs = require("express-handlebars");

// initialize express
const app = express();

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");



// Set the app up with body-parser, and a static folder
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static("public"));


// Import routes and give the server access to them.
app.use('/', routes);







// Listen on port 3000
app.listen(8080, () => {
console.log("App running on port 8080!");
})