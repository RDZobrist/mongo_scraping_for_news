// Dependencies
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// require packages needed for scraping data
const cheerio = require('cheerio');
const request = require('request');

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


// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;


// Set the app up with body-parser, and a static folder
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static("public"));

// Database configuration with mongoose
mongoose.connect("mongodb://localhost/scrapednews");
const db = mongoose.connection;


// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// ============ Routes =========
app.get("/", (req, res) => {
  res.send(index.html);
});

// Scrape data from wallstreetjournal.com and place it into the mongodb db
app.get('/sports', (req, res) => {

  // Make a request for the news section of mlb.com
  request("https://www.wsj.com/public/page/news-sports-scores.html", function (error, response, html) {
    const genre = 'sports';
    // Load the html body from request into cheerio
    var $ = cheerio.load(html);
    // For each element with a "title" class
    $("ul.newsItem li").each(function (i, element) {

      // initiate an empty entry object
      var data = {};

      // add the title , url, content and image to the object
      data.headline = $(this).children('h2').children().text();
      data.content =$(this).first('p').text();
      data.link = $(this).children('h2').children('a').attr('href');
      data.image = $(this).children('div.newsImage').children('a').children('img').attr('src')
      data.genre = genre;
      
    
      // Create a new entry using the Article Schema
      var entry = new Article(data);
    
      entry.save(function(error, doc){
        if (error){
          console.log(`Whoops, there's this: ${error}`)
        }
        // or log the doc
        else{
          console.log(`
          Here ya go: ${doc}`)
        }
      });
    });

  });
  res.send('scrape complete')

});



// Scrape data from mlb.com and place it into the mongodb db
app.get('/economics', (req, res) => {
  
    // Make a request for the news section of mlb.com
    request("https://www.wsj.com/news/economy", function (error, response, html) {
      const genre = 'economics';
      // Load the html body from request into cheerio
      var $ = cheerio.load(html);
      // For each article element with a "buckets-bottom" class
      $("div.buckets-bottom article").each(function (i, element) {
  
        // initiate an empty entry object
        var data = {};
  
        // add the title , url, content and image to the object
        data.headline = $(this).children('header.hedgroup').children('h2').children('a').text();
        data.content =$(this).children('div.text-wrapper').children('p').text();
        data.link =  $(this).children('header.hedgroup').children('h2').children('a').attr('href');
        data.image = $(this).children('.media-wrapper').children('.image-wrapper').children('a').children('img').attr('src');
        data.genre = genre;
        
      
        // Create a new entry using the Article Schema
        var entry = new Article(data);
      
        entry.save(function(error, doc){
          if (error){
            console.log(`Whoops, there's this: ${error}`)
          }
          // or log the doc
          else{
            console.log(`
            Here ya go: ${doc}`)
          }
        });
      });
  
    });
    res.send('scrape complete')
  
  });

  // / Scrape data from mlb.com and place it into the mongodb db
  app.get('/united-states', (req, res) => {
    
      // Make a request for the news section of mlb.com
      request("https://www.wsj.com/news/us", function (error, response, html) {
        const genre = 'national';
        // Load the html body from request into cheerio
        var $ = cheerio.load(html);
        // For each article element with a "buckets-bottom" class
        $("div.buckets-bottom article").each(function (i, element) {
    
          // initiate an empty entry object
          var data = {};
    
          // add the title , url, content and image to the object
          data.headline = $(this).children('header.hedgroup').children('h2').children('a').text();
          data.content =$(this).children('div.text-wrapper').children('p').text();
          data.link =  $(this).children('header.hedgroup').children('h2').children('a').attr('href');
          data.image = $(this).children('.media-wrapper').children('.image-wrapper').children('a').children('img').attr('src');
          data.genre = genre;
          
        
          // Create a new entry using the Article Schema
          var entry = new Article(data);
        
          entry.save(function(error, doc){
            if (error){
              console.log(`Whoops, there's this: ${error}`)
            }
            // or log the doc
            else{
              console.log(`
              Here ya go: ${doc}`)
            }
          });
        });
    
      });
      res.send('scrape complete')
    
    });
  
    // / Scrape data from mlb.com and place it into the mongodb db
  app.get('/world', (req, res) => {
    
      // Make a request for the news section of mlb.com
      request("https://www.wsj.com/news/world", function (error, response, html) {
        const genre = 'world';
        // Load the html body from request into cheerio
        var $ = cheerio.load(html);
        // For each article element with a "buckets-bottom" class
        $("div.buckets-bottom article").each(function (i, element) {
    
          // initiate an empty entry object
          var data = {};
    
          // add the title , url, content and image to the object
          data.headline = $(this).children('header.hedgroup').children('h2').children('a').text();
          data.content =$(this).children('div.text-wrapper').children('p').text();
          data.link =  $(this).children('header.hedgroup').children('h2').children('a').attr('href');
          data.image = $(this).children('.media-wrapper').children('.image-wrapper').children('a').children('img').attr('src');
          data.genre = genre;
          
        
          // Create a new entry using the Article Schema
          var entry = new Article(data);
        
          entry.save(function(error, doc){
            if (error){
              console.log(`Whoops, there's this: ${error}`)
            }
            // or log the doc
            else{
              console.log(`
              Here ya go: ${doc}`)
            }
          });
        });
    
      });
      res.send('scrape complete')
    
    });

      // / Scrape data from mlb.com and place it into the mongodb db
  app.get('/business', (req, res) => {
    
      // Make a request for the news section of mlb.com
      request("https://www.wsj.com/news/business", function (error, response, html) {
        const genre = 'buisness';
        // Load the html body from request into cheerio
        var $ = cheerio.load(html);
        // For each article element with a "buckets-bottom" class
        $("div.buckets-bottom article").each(function (i, element) {
    
          // initiate an empty entry object
          var data = {};
    
          // add the title , url, content and image to the object
          data.headline = $(this).children('header.hedgroup').children('h2').children('a').text();
          data.content =$(this).children('div.text-wrapper').children('p').text();
          data.link =  $(this).children('header.hedgroup').children('h2').children('a').attr('href');
          data.image = $(this).children('.media-wrapper').children('.image-wrapper').children('a').children('img').attr('src');
          data.genre = genre;
          
        
          // Create a new entry using the Article Schema
          var entry = new Article(data);
        
          entry.save(function(error, doc){
            if (error){
              console.log(`Whoops, there's this: ${error}`)
            }
            // or log the doc
            else{
              console.log(`
              Here ya go: ${doc}`)
            }
          });
        });
    
      });
      res.send('scrape complete')
    
    });
  

  



// Listen on port 3000
app.listen(8080, () => {
console.log("App running on port 8080!");
})