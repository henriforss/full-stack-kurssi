const http = require("http")
const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const config = require("./utils/config")
const Blog = require("./models/blog")




/* Connect to Mongo DB. */
const mongoUrl = config.MONGODB_URL
mongoose.connect(mongoUrl)



/* Middleware. */
app.use(cors())
app.use(express.json())



/* Routing. */
app.get("/api/blogs", (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post("/api/blogs", (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})



/* Launch server. */
app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})