// require packages needed for scraping data
const cheerio = require('cheerio');
const request = require('request');
// require the article and note models
const Article = require('../models/Article')
const Note = require('../models/Note')


const scrapeTheSports = () =>{
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
      console.log('Scrape Complete!')
    
}

exports.scrapeTheSports = scrapeTheSports;