/* Index.js, the starting point in this npm-project. */

/* Import necessary modules. */
const http = require("http")
const config = require("./utils/config")
const logger = require("./utils/logger")
const app = require("./app")

/* Create http-server that takes app as a parameter. */
const server = http.createServer(app)

/* Launch server. */
server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})