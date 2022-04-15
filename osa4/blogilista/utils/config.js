/* Configuration file. */

/* Require dotenv. */
require("dotenv").config()

/* Define environment variables. */
const PORT = process.env.PORT
const MONGODB_URL = process.env.MONGODB_URL

module.exports = {
  PORT, MONGODB_URL
}