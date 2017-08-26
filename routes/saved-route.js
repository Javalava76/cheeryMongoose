const express = require('express');
// const flash = require('connect-flash');

const router = express.Router();
const News = require("../models/News.js");
const Comment = require("../models/Comment.js");


//saved page
router.get('/saved', (req, res, next) => {
  res.render('saved');
});

// This GET route let's us see the comments we have SAVED
router.get("/comments", function(req, res) {
    // Using our Comment model, "find" every comment in our db
    Comment.find({}, function(error, doc) {
      // Send any errors to the browser
      if (error) {
        res.send(error);
      }
      // Or send the doc to the browser
      else {
        res.send(doc);
      }
    });
  });

  // // POST A NEW COMMENT
router.post("/submit", function(req, res) {
  
  const newComment = new Comment(req.body);
  
  // Save the new comment in the saved comments
    newComment.save(function(err, doc) {
      // Send an error to the browser if there's something wrong
      if (err) {
        res.send(err);
      }
      // Otherwise...
      else {
      // Find one News in our News collection (there's only one, so that's fine),
      // then update it by pushing the object id of the comment we just saved
      //
      // REMEMBER: doc is a variable containing the document of the comment we just saved,
      // so calling doc._id will grab the id of the doc, in this case, our new comment
  
      // ALSO: We need "{new: true}" in our call,
      // or else our query will return the object as it was before it was updated
        News.findOneAndUpdate({}, { $push: { "comments": doc._id } }, { new: true }, function(error, doc) {
          // Send any errors to the browser
          if (error) {
            res.send(error);
          }
          // Or send the doc to the browser
          else {
            res.send(doc);
          }
        });
      }
    });
  });








module.exports = router;