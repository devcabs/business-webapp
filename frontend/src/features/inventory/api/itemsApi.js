// src/features/inventory/api/itemsApi.js
/**
 * Items API wrapper for the Inventory feature.
 * Exports: getItems, createItem, updateItem, deleteItem, getItemById
 *
 * Uses fetch + JSON. Base URL comes from config.
 */

/* eslint-disable no-console */

import { API_BASE } from '../../../config/api';

// Minimal API client: basic fetch wrappers (no logs)

/**
 * GET /api/items
 * @returns {Promise<any>} resolved response data (usually an array of items)
 */
export async function getItems() {
  const res = await fetch(`${API_BASE}/api/items`, { headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error('Failed to fetch items');
  return res.json();
}

/**
 * GET /api/items/:id
 * @param {string} id
 * @returns {Promise<any>} single item
 */
export async function getItemById(id) {
  if (!id) throw new Error('id required');
  const res = await fetch(`${API_BASE}/api/items/${encodeURIComponent(id)}`);
  if (!res.ok) throw new Error('Failed to fetch item');
  return res.json();
}

/**
 * POST /api/items
 * @param {Object} itemData - JSON body for the new item
 * @returns {Promise<any>} created item
 */
export async function createItem(itemData) {
  const res = await fetch(`${API_BASE}/api/items`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(itemData),
  });
  if (!res.ok) throw new Error('Failed to create item');
  return res.json();
}

/**
 * PUT /api/items/:id
 * @param {string} id
 * @param {Object} updates
 * @returns {Promise<any>} updated item
 */
export async function updateItem(id, updates) {
  if (!id) throw new Error('id required');
  const res = await fetch(`${API_BASE}/api/items/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error('Failed to update item');
  return res.json();
}

/**
 * DELETE /api/items/:id
 * @param {string} id
 * @returns {Promise<any>} delete response
 */
export async function deleteItem(id) {
  if (!id) throw new Error('id required');
  const res = await fetch(`${API_BASE}/api/items/${encodeURIComponent(id)}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete item');
  return res.json();
}

/* DEV sanity checks */
// minimal: no automatic sanity checks
