// backend/server.js

const path = require('path');

// Explicitly configure dotenv to find the .env file in the project root
require('dotenv').config({
  path: path.resolve(__dirname, '../../.env') 
});

const app = require('./app');
const { connectDB } = require('./config/db');

// Load PORT
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
