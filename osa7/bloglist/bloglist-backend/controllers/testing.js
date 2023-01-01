/* Router for running Cypress tests. Only enabled in
test environment (see app.js). */

/* Import necessary modules. */
const router = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")

/* POST request to "/reset" delestes all blog posts
and all users. */
router.post("/reset", async (request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

module.exports = router
