// backend/src/routes/itemsRoutes.js

const express = require('express');
const router = express.Router();

const {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  updateQuantity,
} = require('../controllers/itemsController');

// multer middleware for image upload
const upload = require('../middleware/upload');

// Routes
router.get('/items', getAllItems);
router.get('/items/:id', getItemById);

router.post('/items', upload.single('image'), createItem);

router.put('/items/:id', updateItem);

router.delete('/items/:id', deleteItem);

router.patch('/items/:id/quantity', updateQuantity);

module.exports = router;
