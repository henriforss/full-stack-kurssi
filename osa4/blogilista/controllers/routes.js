/* Controlling routes and all that happens in routing. */

/* Import necessary modules. */
const Blog = require("../models/blog")
const express = require("express")

/* Create a new router object from express application. */
const blogRouter = express.Router()

/* Get all blog posts. */
blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({})
  response.status(200).json(blogs)
})

/* Create new blog post. */
blogRouter.post("/", async (request, response, next) => {

  /* Create a new mongoose Blog from request.body and 
  save in variable. */
  const blog = new Blog(request.body)

  /* Use variable to save blog asynchronously.
  Then respond to original request with status code
  and saved blog. Errors are handled by express-async-errors
  and /utils/middleware.errorHandler. */
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)



})

/* Export module. */
module.exports = blogRouter
