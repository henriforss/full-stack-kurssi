/* Controlling routes and all that happens in routing. */

/* Import necessary modules. */
const Blog = require("../models/blog")
const express = require("express")

/* Create a new router object from express application. */
const blogRouter = express.Router()

/* Get all blog posts. */
blogRouter.get("/", (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

/* Create new blog post. */
blogRouter.post("/", (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

/* Export module. */
module.exports = blogRouter
