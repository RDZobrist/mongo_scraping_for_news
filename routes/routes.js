const Article = require('../models/Article');
const Note = require('../models/Note');
const express = require('express');
const router = express.Router();
const bizScraper = require('../controllers/businessController');
const econScraper = require('../controllers/econController');
const sportsScraper = require('../controllers/sportsController');
const nationalScraper = require('../controllers/nationalController');
const worldScraper = require('../controllers/worldController');

const successMessage = (docs) => {
  console.log(`
  Here are your articles: ${docs}
  `)
};

const errorMessage = (err) => {
  console.log(`
  Uh-oh, we ran into an ${err}
  `)
};

// ============ Routes =========
router.get("/", (req, res) => {
  res.send(index.html);
});

// Scrape data from wallstreetjournal.com and place it into the mongodb db
router.get('/sports/scrape', (req, res) => {

  sportsScraper.scrapeTheSports((err, docs) => {
    if (err) {
      errorMessage(err)
    } else {
      successMessage(docs)
    }

  })

  res.redirect('/sports')
});
// get sports page, populate with sports articles
router.get('/sports', (req, res) => {
  res.send('SPORTS')
})

// Scrape data from wallstreetjournal.com and place it into the mongodb db
router.get('/economics/scrape', (req, res) => {
  econScraper.scrapeEconNews((err, docs) => {
    if (err) {
      errorMessage(err)
    } else {
      successMessage(docs)
    }
  })
  res.redirect('/economics');

});
// gwt econ page, populate with economics artices
router.get('/economics', (req, res) => {
  res.send('ECONOMICS')

});

// / Scrape data from wallstreetjournal.com and place it into the mongodb db
router.get('/united-states/scrape', (req, res) => {
console.log('1')
  nationalScraper.scrapeNational((err, docs) => {
    console.log('2')
    
    if (err) {
      errorMessage(err);
    } else {
      successMessage(docs);
    }
  })

  res.redirect('/united-states')

});
// get the united-states news page, populate it with articles from db
router.get('/united-states', (req, res) => {

  res.send('NATIONAL NEWS')

});

// / Scrape data from wallstreetjournal.com and place it into the mongodb db
router.get('/world/scrape', (req, res) => {
  worldScraper.scrapeTheWorldNews((err, docs) => {
    if (err) {
      errorMessage(err);
    } else {
      successMessage(docs);
    }
  })
  res.redirect('/world');
});
// /get the world news page, pouplate it with articles from the db
router.get('/world', (req, res) => {
  res.send('hello')

});

// / Scrape data from wallstreetjournal.com and place it into the mongodb db
router.get('/business/scrape', (req, res) => {
  bizScraper.scrapeBizNews((err, docs) => {
    if (err) {
      errorMessage(err);
    } else {
      successMessage(docs);
    }
  })
res.redirect('/business')
});
//get buisness page, populate it with articles from db
router.get('/business', (req, res) => {
  res.send('hello')

});

module.exports = router;