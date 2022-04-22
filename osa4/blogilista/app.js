/* The app itself. */

/* Import necessary modules. */
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const config = require("./utils/config")
const middleware = require("./utils/middleware")
const logger = require("./utils/logger")
const blogRouter = require("./controllers/routes")
require("express-async-errors")

/* Create express app. */
const app = express()

/* Connect to Mongo DB. */
mongoose.connect(config.MONGODB_URL)
  .then(() => {
    logger.info("Connected to MongoDB.")
  })
  .catch((error) => {
    logger.error("Error connecting to MongoDB:", error.message)
  })

/* Enable middleware in the right order.
Otherwise it won't work. */
app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

/* This is the middleware that takes care of all the routing.
Very important. */
app.use("/api/blogs", blogRouter)

/* This middleware must be enabled last. */
app.use(middleware.errorHandler)

/* Export module. */
module.exports = app
