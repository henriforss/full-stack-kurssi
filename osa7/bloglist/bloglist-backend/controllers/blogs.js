/* Controlling /api/blogs and all that happens there. */

/* Import necessary modules. */
const express = require("express");
const { response } = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");
const middleware = require("../utils/middleware");

/* Create a new router object from express application. */
const blogsRouter = express.Router();

/* Get all blog posts. */
blogsRouter.get("/", async (request, response) => {
  /* Find all and populate key "user". */
  const blogs = await Blog.find({}).populate("user", {
    username: true,
    name: true,
  });

  response.status(200).json(blogs);
});

/* Create new blog post. */
blogsRouter.post("/", middleware.userExtractor, async (request, response) => {
  /* Destructure request.body. */
  const { title, author, url, likes } = request.body;

  /* Get userId (verifiedToken.id from middleware). */
  const { userId } = request;

  /* If no userId, return error. */
  if (!userId) {
    return response.status(401).json({ error: "Missing or invalid token." });
  }

  /* Find user with help of userId. */
  const user = await User.findById(userId);

  /* Create new Blog item. */
  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user,
  });

  /* Save blog in db. */
  const savedBlog = await blog.save();

  /* Save reference to blog in user.blogs. Note: Need to find user
  in database again, otherwise it will not work. */
  const user2 = await User.findById(userId);
  user2.blogs = user2.blogs.concat(savedBlog);
  await user2.save();

  return response.status(201).json(savedBlog);
});

/* Delete blog post. */
blogsRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    const { id } = request.params;

    /* Get userId (verifiedToken.id from middleware). */
    const { userId } = request;

    /* Get blog from database and user from blog. */
    const blog = await Blog.findById(id);
    const { user } = blog;

    /* Compare userId with user.id, and delete. */
    if (user.toString() === userId) {
      const deletedBlog = await Blog.findByIdAndRemove(id);
      return response.status(200).json(deletedBlog);
    }

    return response.status(400).json({ error: "Invalid user." });
  }
);

/* Modify blog post. */
blogsRouter.put("/:id", async (request, response) => {
  const { id } = request.params;
  const { body } = request;

  /* Note: it's important to populate user field, otherwise the information there is lost, which means the field "added by" in the frontend will be empty after every like. */
  const updatedBlog = await Blog.findByIdAndUpdate(id, body, {
    new: true,
  }).populate("user", {
    name: 1,
    token: 1,
    username: 1,
  });

  response.status(200).json(updatedBlog);
});

/* Add comment to blog post. */
blogsRouter.post(
  "/:id/comments",
  middleware.userExtractor,
  async (request, response) => {
    const { headers, body, params, token, userId } = request;

    /* If the userExtractor does not return a verified token, respond with error. Comments are only allowed from verified users. Even though they are anonymous. */
    if (!userId) {
      return response.status(401).json({ error: "Missing or invalid token." });
    }

    /* Find the correct blog. */
    const blogId = params.id;
    const correctBlog = await Blog.findById(blogId);

    /* Add comment. */
    const comment = body.comment;
    correctBlog.comments = correctBlog.comments.concat(comment);

    /* Save. */
    await correctBlog.save();

    /* Return. */
    return response.status(200).json(correctBlog);
  }
);

/* Export module. */
module.exports = blogsRouter;
