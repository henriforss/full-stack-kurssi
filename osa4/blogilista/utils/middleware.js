/* Customized middleware.  */

/* Import necessary modules. */
const logger = require("./logger")

/* Middleware requestLogger for logging all requests, responses. */
const requestLogger = (req, res, next) => {
  logger.info("Method:", req.method)
  logger.info("Path:", req.path)
  logger.info("Body:", req.body)
  next()
}

/* Middleware errorHandler to handle all errors. Uses module
express-async-errors imported in app.js. Can also use express-function
next(). Must be enabled last in app.js script. */
const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === "ValidationError") {
    return response.status(400).end()
  }

  next(error)
}

/* Export module. */
module.exports = { requestLogger, errorHandler }
