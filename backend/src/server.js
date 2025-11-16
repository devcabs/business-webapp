// backend/server.js

require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/db');

// Load PORT
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
