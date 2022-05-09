/* Customized middleware.  */

/* Import necessary modules. */
const jwt = require("jsonwebtoken")
const logger = require("./logger")

/* Middleware requestLogger for logging all requests, responses. */
const requestLogger = (req, res, next) => {
  logger.info("Method:", req.method)
  logger.info("Path:", req.path)
  logger.info("Body:", req.body)
  next()
}

/* Middleware to get token from request. */
const tokenExtractor = (req, res, next) => {
  /* Get key "authorization" from request header. */
  const authorization = req.get("authorization")

  /* If both conditions are true, add token to request. */
  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    const token = authorization.split(" ")[1]
    req.token = token
  }

  next()
}

/* Middleware to get user from request.
Note: This must be enabled AFTER tokenExtractor. */
const userExtractor = (req, res, next) => {
  /* Get token from request, and verify. verifiedToken contains
  username and id. */
  const { token } = req
  const verifiedToken = jwt.verify(token, process.env.SECRET_KEY)

  if (verifiedToken) {
    req.userId = verifiedToken.id
  }

  next()
}

/* Middleware errorHandler to handle all errors. Uses module
express-async-errors imported in app.js. Can also use express-function
next(). Must be enabled last in app.js script. */
const errorHandler = (error, request, response, next) => {
  logger.error(error)

  if (error.name === "ValidationError") {
    return response.status(400).end()
  }

  if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "Invalid or missing token." })
  }

  next(error)
}

/* Export module. */
module.exports = {
  requestLogger,
  errorHandler,
  tokenExtractor,
  userExtractor,
}
