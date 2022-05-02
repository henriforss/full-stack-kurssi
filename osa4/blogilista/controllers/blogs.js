/* Controlling /api/blogs and all that happens there. */

/* Import necessary modules. */
const express = require("express")
const jwt = require("jsonwebtoken")
const Blog = require("../models/blog")
const User = require("../models/user")
const middleware = require("../utils/middleware")

/* Create a new router object from express application. */
const blogsRouter = express.Router()

/* Get all blog posts. */
blogsRouter.get("/", async (request, response) => {
  /* Find all and populate key "user". */
  const blogs = await Blog.find({}).populate("user", { username: true, name: true })

  response.status(200).json(blogs)
})

/* Create new blog post. */
blogsRouter.post("/", middleware.userExtractor, async (request, response) => {
  /* Destructure request.body. */
  const { title, author, url, likes } = request.body

  /* Get userId (verifiedToken.id from middleware). */
  const { userId } = request

  /* If no userId, return error. */
  if (!userId) {
    return response.status(401).json({ error: "Missing or invalid token." })
  }

  /* Find user with help of userId. */
  const user = await User.findById(userId)

  /* Create new Blog item. */
  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user,
  })

  /* Save blog in db. */
  const savedBlog = await blog.save()

  /* Save reference to blog in user.blogs. */
  user.blogs = user.blogs.concat(savedBlog)
  await user.save()

  return response.status(201).json(savedBlog)
})

/* Delete blog post. */
blogsRouter.delete("/:id", middleware.userExtractor, async (request, response) => {
  const { id } = request.params

  /* Get userId (verifiedToken.id from middleware). */
  const { userId } = request

  /* Get blog from database and user from blog. */
  const blog = await Blog.findById(id)
  const { user } = blog

  /* Compare userId with user.id, and delete */
  if (user.toString() === userId) {
    const deletedBlog = await Blog.findByIdAndRemove(id)
    response.status(200).json(deletedBlog)
  } else {
    return response.status(400).json({ error: "Invalid user." })
  }
})

/* Modify blog post. */
blogsRouter.put("/:id", async (request, response) => {
  const { id } = request.params

  const updatedBlog = await Blog.findByIdAndUpdate(id, { likes: 5 }, { new: true })
  response.status(200).json(updatedBlog)
})

/* Export module. */
module.exports = blogsRouter
