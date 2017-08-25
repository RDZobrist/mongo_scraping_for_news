const Article = require('../models/Article');
const Note = require('../models/Note');
const express = require('express');
const router = express.Router();
const bizScraper = require('../controllers/businessController');
const econScraper = require('../controllers/econController');
const sportsScraper = require('../controllers/sportsController');
const nationalScraper = require('../controllers/nationalController');
const worldScraper = require('../controllers/worldController');


// ============ Routes =========
router.get("/", (req, res) => {
    res.send(index.html);
  });
  
  // Scrape data from wallstreetjournal.com and place it into the mongodb db
  router.get('/sports', (req, res) => {
  
        res.send('hello');
    
    
  });
  
  
  
  // Scrape data from wallstreetjournal.com and place it into the mongodb db
  router.get('/economics', (req, res) => {
    
    res.send('hello')
    
    
    });
  
    // / Scrape data from wallstreetjournal.com and place it into the mongodb db
    router.get('/united-states', (req, res) => {
      
        res.send('hello')
        
      
      });
    
      // / Scrape data from wallstreetjournal.com and place it into the mongodb db
    router.get('/world', (req, res) => {
        res.send('hello')
        
        
      });
  
        // / Scrape data from wallstreetjournal.com and place it into the mongodb db
    router.get('/business', (req, res) => {
      res.send('hello')
        
      });
    
  
    
  module.exports = router;