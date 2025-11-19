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

// Remove upload for now (you haven't created the file)
const imageUpload = require('../middleware/imageUpload'); 
// ❗ If this file does NOT exist, remove this line entirely.


// --- Correct Routes ---
router.get('/', getAllItems);
router.get('/:id', getItemById);

router.post('/', imageUpload.single('image'), createItem);

router.put('/:id', updateItem);

router.delete('/:id', deleteItem);

router.patch('/:id/quantity', updateQuantity);

module.exports = router;
