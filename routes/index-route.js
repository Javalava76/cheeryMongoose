// Dependencies
// =============================================================
const express = require('express');
// const flash = require('connect-flash');

const router = express.Router();
const News = require("../models/News.js");
const Comment = require("../models/Comment.js");

// Our scraping tools
const request = require("request");
const cheerio = require("cheerio");


// First, tell the console what route.js is doing
console.log("***********************************\n" +
"Grabbing every thread name and link\n" +
"from pitchfork's latest page:" +
"\n***********************************\n");


//landing page
router.get('/', (req, res, next) => {
  res.render('index');
});


// A GET request to scrape the website
router.get("/scrape", function(req, res) {
  // First, we grab the body of the html with request
  request("http://pitchfork.com/latest/", function(error, response, html) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    const $ = cheerio.load(html);
    // Now, we grab every ***** within a **** tag, and do the following:
    $("div.article-details").each(function(i, element) {

      // Save an empty result object
      const result = {};
    

      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this).find("h2").text();
      result.link = $(this).find("a").attr("href");


      console.log(result.title);
      console.log(result.link);

    //   create a new entry
      // This effectively passes the result object to the entry (and the title and link)
      const entry = new News(result);

      // Now, save it to the db
      entry.save(function(err, doc) {
        // Log any errors
        if (err) {
          console.log(err);
        }
        // Or log the doc
        else {
          console.log(doc);
        }
      });

    });
});
  // Tell the browser that we finished scraping the text
  
  console.log("Scrape Complete");
});

// THIS WILL GET THE NEWS WE SCRAPED
router.get("/news", function(req, res) {
  // Grab every doc in the News array
  News.find({}, function(error, doc) {
    // Log any errors
    if (error) {
      console.log(error);
    }
    // Or send the doc to the browser as a json object
    else {
      res.json(doc);
    }
  });
  });

// Grab a news article by it's ObjectId to add a comment
router.get("/news/:id", function(req, res) {
  // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
  News.findOne({ "_id": req.params.id })
  // ..and populate all of the notes associated with it
  .populate("comment")
  // now, execute our query
  .exec(function(error, doc) {
    // Log any errors
    if (error) {
      console.log(error);
    }
    // Otherwise, send the doc to the browser as a json object
    else {
      res.json(doc);
    }
  });
});



  module.exports = router;