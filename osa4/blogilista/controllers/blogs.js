/* Controlling /api/blogs and all that happens there. */

/* Import necessary modules. */
const express = require("express")
const Blog = require("../models/blog")

/* Create a new router object from express application. */
const blogsRouter = express.Router()

/* Get all blog posts. */
blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({})
  response.status(200).json(blogs)
})

/* Create new blog post. */
blogsRouter.post("/", async (request, response) => {
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

/* Delete blog post. */
blogsRouter.delete("/:id", async (request, response) => {
  const { id } = request.params

  const deletedBlog = await Blog.findByIdAndRemove(id)
  response.status(204).json(deletedBlog)
})

/* Modify blog post. */
blogsRouter.put("/:id", async (request, response) => {
  const { id } = request.params

  const updatedBlog = await Blog.findByIdAndUpdate(id, { likes: 5 }, { new: true })
  response.status(200).json(updatedBlog)
})

/* Export module. */
module.exports = blogsRouter
