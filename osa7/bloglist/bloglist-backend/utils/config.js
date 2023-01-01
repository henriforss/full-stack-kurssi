/* Environment configuration file. */

/* Require dotenv. */
require("dotenv").config()

/* Define PORT. */
const PORT = process.env.PORT

/* Define url. */
const MONGODB_URL = process.env.NODE_ENV === "test"
  ? process.env.TEST_MONGODB_URL
  : process.env.MONGODB_URL

module.exports = {
  PORT, MONGODB_URL
}