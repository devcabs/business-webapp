// backend/src/config/db.js
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGODB_URI || '';

// Optional: tune options (Mongoose v6+ uses sensible defaults, but shown for clarity)
const mongooseOptions = {
  // useNewUrlParser: true, // not necessary in Mongoose v6+
  // useUnifiedTopology: true,
  // connectTimeoutMS: 10000,
  // socketTimeoutMS: 45000,
};

async function connectDB() {
  if (!MONGO_URI) {
    throw new Error('MONGODB_URI is not defined in environment variables');
  }

  try {
    // Connect
    await mongoose.connect(MONGO_URI, mongooseOptions);
    console.log('MongoDB connected:', mongoose.connection.host, mongoose.connection.name);
  } catch (err) {
    console.error('MongoDB connection error:', err);
    // rethrow so callers (server startup) can decide what to do
    throw err;
  }

  // Optional: attach event listeners
  mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to', mongoose.connection.host);
  });

  mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('Mongoose disconnected');
  });

  return mongoose.connection;
}

async function disconnectDB() {
  try {
    await mongoose.disconnect();
    console.log('MongoDB disconnected (clean)');
  } catch (err) {
    console.error('Error during MongoDB disconnect:', err);
  }
}

// Graceful shutdown example for signals (optional but recommended)
function setupGracefulShutdown() {
  const exitHandler = async (signal) => {
    try {
      console.log(`Received ${signal}. Closing MongoDB connection...`);
      await disconnectDB();
      process.exit(0);
    } catch (err) {
      console.error('Error in shutdown handler:', err);
      process.exit(1);
    }
  };

  process.on('SIGINT', () => exitHandler('SIGINT'));
  process.on('SIGTERM', () => exitHandler('SIGTERM'));
}

// Export what callers need
module.exports = {
  connectDB,
  disconnectDB,
  setupGracefulShutdown,
  mongoose, // useful for creating models elsewhere: require('.../db').mongoose
};
