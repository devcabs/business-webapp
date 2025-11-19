// backend/src/controllers/itemsController.js

const Item = require("../models/itemModel");

// ==============================
// GET ALL ITEMS
// ==============================
exports.getAllItems = async (req, res, next) => {
  try {
    const items = await Item.find();
    res.status(200).json({ success: true, data: items });
  } catch (error) {
    next(error);
  }
};

// ==============================
// GET ITEM BY ID
// ==============================
exports.getItemById = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }

    res.status(200).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

// ==============================
// CREATE ITEM (with file upload)
// ==============================
exports.createItem = async (req, res, next) => {
  try {
    const body = req.body;

    const newItem = new Item({
      SKU: body.SKU,   // ← REQUIRED FIX ✔

      name: body.name,
      description: body.description || "",
      unit: body.unit || "pcs",
      quantity: body.quantity || 0,
      lowStockThreshold: body.lowStockThreshold || 5,

      imageUrl: req.file ? req.file.path : body.imageUrl || "",

      attributes: body.attributes ? JSON.parse(body.attributes) : [],
      variants: body.variants ? JSON.parse(body.variants) : []
    });

    const savedItem = await newItem.save();

    res.status(201).json({
      success: true,
      message: "Item created successfully",
      data: savedItem
    });

  } catch (error) {
    next(error);
  }
};

// ==============================
// UPDATE ITEM
// ==============================
exports.updateItem = async (req, res, next) => {
  try {
    const updateData = { ...req.body };

    if (req.file) {
      updateData.image = req.file.path;
    }

    // Parse arrays if sent as JSON strings
    if (updateData.attributes && typeof updateData.attributes === "string") {
      updateData.attributes = JSON.parse(updateData.attributes);
    }
    if (updateData.variants && typeof updateData.variants === "string") {
      updateData.variants = JSON.parse(updateData.variants);
    }

    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Item updated successfully",
      data: updatedItem
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// DELETE ITEM
// ==============================
exports.deleteItem = async (req, res, next) => {
  try {
    const deleted = await Item.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }

    res.status(200).json({
      success: true,
      message: "Item deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// UPDATE QUANTITY ONLY
// ==============================
exports.updateQuantity = async (req, res, next) => {
  try {
    const { quantity } = req.body;

    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }

    item.quantity = quantity;
    await item.save();

    res.status(200).json({
      success: true,
      message: "Quantity updated",
      data: item
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// LOW STOCK CHECK
// ==============================
exports.lowStockCheck = async (req, res, next) => {
  try {
    const lowItems = await Item.find({
      $expr: { $lte: ["$quantity", "$lowStockThreshold"] }
    });

    res.status(200).json({
      success: true,
      count: lowItems.length,
      data: lowItems
    });
  } catch (error) {
    next(error);
  }
};
