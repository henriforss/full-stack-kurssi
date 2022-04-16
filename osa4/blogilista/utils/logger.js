/* Logger for logging info and errors. Also needed
for middleware requestLogger. */

/* Log info. */
const info = (...params) => {
  console.log(...params)
}

/* Log errors */
const error = (...params) => {
  console.error(...params)
}

/* Export module. */
module.exports = {
  info, error
}