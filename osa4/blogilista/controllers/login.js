/* Controlling /api/login. */

/* Import necessary modules and create loginRouter. */
const loginRouter = require("express").Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("../models/user")

/* Authenticate user with Json Web Token. */
loginRouter.post("/", async (request, response) => {
  /* Destructure request. */
  const { username, password } = request.body

  /* Find user in db. */
  const user = await User.findOne({ username })

  /* Make sure there is a user. Otherwise return with error. */
  if (!user) {
    return response.status(400).json({ error: "No such user." })
  }

  /* Compare request.password with user.passwordHash using bcrypt. */
  const correctPassword = await bcrypt.compare(password, user.passwordHash)

  /* If correctPassword is "false", return with error. */
  if (!correctPassword) {
    return response.status(400).json({ error: "Invalid username or password." })
  }

  /* If correctPassword is "true", create new object for token. */
  const userForToken = {
    username: user.username,
    id: user.id,
  }

  /* Create token. */
  const token = jwt.sign(userForToken, process.env.SECRET_KEY, { expiresIn: "1h" })

  /* Return token. */
  return response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
