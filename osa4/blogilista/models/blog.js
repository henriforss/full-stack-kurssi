/* Create Mongoose Schema. */

/* Import necessary modules. */
const mongoose = require("mongoose")

/* Create Mongoose Schema. If likes is undefined,
assign default value 0.*/
const blogSchema = mongoose.Schema({
  title: {type: String, required: true },
  author: String,
  url: { type: String, required: true },
  likes: { type: Number, default: 0 }
})

/* Export module. */
module.exports = mongoose.model("Blog", blogSchema)