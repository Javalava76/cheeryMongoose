// Require mongoose
var mongoose = require("mongoose");
// Create Schema class
var Schema = mongoose.Schema;

// Create news schema
var NewsSchema = new Schema({
  // title is a required string
  title: {
    type: String,
    required: true
  },
  // link is a required string
  link: {
    type: String,
    required: true
  },
  // This only saves one comment's ObjectId, ref refers to the Comment model
  comment: {
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }
});

// Create the News model with the NewsSchema
var News = mongoose.model("News", NewsSchema);

// Export the model
module.exports = News;
