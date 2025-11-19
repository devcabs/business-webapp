// backend/src/utils/helper.js

const fs = require("fs");
const path = require("path");

/**
 * Generate a clean SKU:
 * - Prefix: category or user-defined
 * - ID: timestamp or random hash
 * - Ensures uppercase + no spaces
 */
function formatSKU(prefix = "ITEM") {
  const clean = String(prefix).replace(/\s+/g, "").toUpperCase();
  const id = Date.now().toString(36).toUpperCase();
  return `${clean}-${id}`;
}

/**
 * Convert any input into a safe number.
 * Prevents:
 * - NaN errors
 * - Breaking quantity updates
 */
function toNumber(value, defaultValue = 0) {
  if (value === null || value === undefined || value === "") return defaultValue;
  const n = Number(value);
  return isNaN(n) ? defaultValue : n;
}

/**
 * Convert empty strings from forms into null.
 * Very important because form-data sends "" not undefined.
 */
function emptyToNull(obj = {}) {
  const clean = {};
  for (const key in obj) {
    if (obj[key] === "") clean[key] = null;
    else clean[key] = obj[key];
  }
  return clean;
}

/**
 * Safely parse JSON from user input.
 * Avoids crashes when updating attributes or variants.
 */
function safeJSON(value) {
  try {
    if (typeof value === "string") return JSON.parse(value);
    return value; // already an object
  } catch (err) {
    return null;
  }
}

/**
 * Build correct file path from multer.
 * Prevents "cannot find image" or broken URL issues.
 */
function buildFilePath(file) {
  if (!file) return null;
  const relative = `uploads/${file.filename}`;
  return relative.replace(/\\/g, "/");
}

/**
 * Remove an image file if it exists.
 * Used when:
 * - Updating item image
 * - Deleting item
 * Prevents "orphan files" building up.
 */
function removeImage(filePath) {
  if (!filePath) return;

  const full = path.join(__dirname, "../../", filePath);

  fs.unlink(full, (err) => {
    // silent fail — do not crash API if delete fails
    if (err) {
      console.log("Image cleanup skipped:", err.message);
    }
  });
}

/**
 * Remove multiple images (for items with gallery or multiple variants)
 */
function removeImages(filePaths = []) {
  filePaths.forEach((p) => removeImage(p));
}

/**
 * Filter and sanitize update objects:
 * Removes undefined, null, and empty strings.
 * Prevents overwriting fields with blank data.
 */
function sanitizeUpdateObject(obj = {}) {
  const clean = {};
  for (const key in obj) {
    const val = obj[key];
    if (val === undefined || val === null || val === "") continue;
    clean[key] = val;
  }
  return clean;
}

/**
 * Standard API response wrapper.
 * Helps maintain consistent JSON structure.
 */
function apiResponse(success, data = null, message = "") {
  return { success, data, message };
}

module.exports = {
  formatSKU,
  toNumber,
  emptyToNull,
  safeJSON,
  buildFilePath,
  removeImage,
  removeImages,
  sanitizeUpdateObject,
  apiResponse,
};
