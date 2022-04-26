/* Controlling /api/blogs and all that happens there. */

/* Import necessary modules. */
const express = require("express")
const jwt = require("jsonwebtoken")
const Blog = require("../models/blog")
const User = require("../models/user")

/* Create a new router object from express application. */
const blogsRouter = express.Router()

/* Get all blog posts. */
blogsRouter.get("/", async (request, response) => {
  /* Find all and populate key "user". */
  const blogs = await Blog.find({}).populate("user", { username: true, name: true })

  response.status(200).json(blogs)
})

/* Function to get token. Used in POST-requests below. */
const getTokenFrom = (request) => {
  /* Get key "authorization" from request header. */
  const authorization = request.get("authorization")

  /* If both conditions are true, return token. */
  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    const token = authorization.split(" ")
    return token[1]
  }
  /* If either condition is false, return null. */
  return null
}

/* Create new blog post. */
blogsRouter.post("/", async (request, response) => {
  /* Destructure request.body. */
  const { title, author, url, likes } = request.body

  /* Use function to get token from header. */
  const token = getTokenFrom(request)
  const verifiedToken = jwt.verify(token, process.env.SECRET_KEY)

  /* If token or verifiedToken is missing, return error. */
  if (!token && !verifiedToken) {
    return response.status(401).json({ error: "Missing or invalid token." })
  }

  /* Find user with help of verifiedToken.id. */
  const user = await User.findById(verifiedToken.id)

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
