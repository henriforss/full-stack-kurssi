/* Controlling /api/users. */

/* Import necessary modules. */
const usersRouter = require("express").Router()
const bcrypt = require("bcrypt")
const User = require("../models/user")

/* Handle GET request for all users. */
usersRouter.get("/", async (request, response) => {
  const users = await User.find({})
  response.status(200).json(users)
})

/* Create new user. */
usersRouter.post("/", async (request, response) => {
  /* Destructure request.body. */
  const { username, name, password } = request.body

  /* Make sure there is a username and a password. */
  if (!(username && password)) {
    return response.status(400).json({ error: "Missing username of password." })
  }

  /* Search for username. If username is taken, respond vid error. */
  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({ error: "Username taken." })
  }

  /* Check that password is at least 3 characters. */
  if (password.length < 3) {
    return response.status(400).json({ error: "Password must be at least 3 characters." })
  }

  /* Define salt and hash password. */
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  /* Define newUser as an instance of Mongoose model User. */
  const newUser = new User({
    username,
    name,
    passwordHash,
  })

  /* Save newUser and respond to client. */
  await newUser.save()
  response.status(201).json(newUser)
})

/* Export router. */
module.exports = usersRouter
