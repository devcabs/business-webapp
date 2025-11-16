require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const itemsRoutes = require("./src/routes/itemsRoutes");

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/items", itemsRoutes);

module.exports = app;