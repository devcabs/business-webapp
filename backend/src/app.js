// backend/src/app.js

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Middleware
const errorHandler = require('./middleware/errorHandler');
const logger = require('./middleware/logger');

// Routes
const itemsRoutes = require('./routes/itemsRoutes');

const app = express();

// --- Global Middlewares ---
app.use(cors());               // Enable CORS for frontend access
app.use(express.json());       // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // For form-data if needed

app.use(morgan('dev'));        // Use morgan logger (you decided this earlier)
app.use(logger);               // Optional custom logger if you add extra logs

// --- Routes ---
app.use('/api/items', itemsRoutes);  // All item routes start with /api/items

// --- Error Handler (must be last) ---
app.use(errorHandler);

module.exports = app;
