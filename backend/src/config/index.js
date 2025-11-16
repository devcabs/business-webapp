// backend/src/config/index.js

// Load environment variables early if not already loaded by the app entry point
require('dotenv').config();

const db = require('./db');
// const logger = require('./logger'); // future
// const otherConfig = require('./otherConfig');

module.exports = {
  // DB helpers
  connectDB: db.connectDB,
  disconnectDB: db.disconnectDB,
  setupGracefulShutdown: db.setupGracefulShutdown,
  mongoose: db.mongoose,
  // logger,
  // otherConfig,
};