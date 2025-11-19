// backend/src/middleware/logger.js
const morgan = require("morgan");

const logger = morgan("dev"); // logs: GET /items 200 20ms

module.exports = logger;