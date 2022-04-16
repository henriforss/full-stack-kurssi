/* Create Mongoose Schema. */

/* Import necessary modules. */
const mongoose = require("mongoose")

/* Create Mongoose Schema. */
const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

/* Export module. */
module.exports = mongoose.model("Blog", blogSchema)