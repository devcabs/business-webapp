const mongoose = require("mongoose");

// Item Schema
const itemSchema = new mongoose.Schema(
  {
    SKU: {
      type: String,
      required: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    quantity: {
      type: Number,
      default: 0,
    },

    unit: {
      type: String,
      default: "pcs", // or "" if you prefer empty
      required: true,
      trim: true,
    },

    cost: {
      type: Number,
      default: 0,
    },

    barcode: {
      type: String,
      default: "",
    },

    imageUrl: {
      type: String,
      default: "",
    },

    lowStockThreshold: {
      type: Number,
      default: 0,
    },

    // Dynamic Attributes (Option 1)
    attributes: [
      {
        key: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

// Export the model
module.exports = mongoose.model("Item", itemSchema);
