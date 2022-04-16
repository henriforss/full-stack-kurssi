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

/* Export module. */
module.exports = {
  requestLogger
}