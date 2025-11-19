// src/features/inventory/api/itemsApi.js
/**
 * Lightweight items API wrapper for the Inventory app.
 * Exports: getItems, createItem, updateItem, deleteItem
 *
 * Uses fetch + JSON. Base URL comes from Vite env var VITE_API_BASE (fallback to http://localhost:5000).
 *
 * In dev mode (import.meta.env.DEV) this file logs simple tests to console so you can confirm connectivity.
 */

/* eslint-disable no-console */

const API_BASE = import.meta.env.VITE_API_BASE ?? 'http://localhost:5000';
const DEFAULT_TIMEOUT_MS = 10000; // 10s

function timeoutFetch(resource, options = {}, timeout = DEFAULT_TIMEOUT_MS) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  const merged = { ...options, signal: controller.signal };
  return fetch(resource, merged).finally(() => clearTimeout(id));
}

async function handleResponse(response) {
  const text = await response.text().catch(() => '');
  const contentType = response.headers.get('content-type') || '';

  let data = null;
  try {
    if (contentType.includes('application/json')) data = JSON.parse(text || '{}');
    else data = text;
  } catch (e) {
    // fallback if JSON.parse fails
    data = text;
  }

  if (!response.ok) {
    const err = new Error(data?.message ?? `HTTP ${response.status}`);
    err.status = response.status;
    err.payload = data;
    throw err;
  }

  return data;
}

/**
 * GET /api/items
 * @returns {Promise<any>} resolved response data (usually an array of items)
 */
export async function getItems() {
  const url = `${API_BASE}/api/items`;
  try {
    console.log('[itemsApi] getItems -> requesting', url);
    const res = await timeoutFetch(url, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
    });
    const data = await handleResponse(res);
    console.log('[itemsApi] getItems -> success', data);
    return data;
  } catch (err) {
    console.error('[itemsApi] getItems -> error', err);
    throw err;
  }
}

/**
 * POST /api/items
 * @param {Object} itemData - JSON body for the new item
 * @returns {Promise<any>} created item
 */
export async function createItem(itemData) {
  const url = `${API_BASE}/api/items`;
  try {
    console.log('[itemsApi] createItem -> posting to', url, 'payload:', itemData);
    const res = await timeoutFetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(itemData),
    });
    const data = await handleResponse(res);
    console.log('[itemsApi] createItem -> success', data);
    return data;
  } catch (err) {
    console.error('[itemsApi] createItem -> error', err);
    throw err;
  }
}

/**
 * PUT /api/items/:id or PATCH depending on your backend
 * @param {string} id
 * @param {Object} updates
 * @returns {Promise<any>} updated item
 */
export async function updateItem(id, updates) {
  if (!id) throw new Error('updateItem requires an id');
  const url = `${API_BASE}/api/items/${encodeURIComponent(id)}`;
  try {
    console.log('[itemsApi] updateItem -> patching', url, 'payload:', updates);
    const res = await timeoutFetch(url, {
      method: 'PUT', // change to 'PATCH' if your backend expects patch
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(updates),
    });
    const data = await handleResponse(res);
    console.log('[itemsApi] updateItem -> success', data);
    return data;
  } catch (err) {
    console.error('[itemsApi] updateItem -> error', err);
    throw err;
  }
}

/**
 * DELETE /api/items/:id
 * @param {string} id
 * @returns {Promise<any>} delete response
 */
export async function deleteItem(id) {
  if (!id) throw new Error('deleteItem requires an id');
  const url = `${API_BASE}/api/items/${encodeURIComponent(id)}`;
  try {
    console.log('[itemsApi] deleteItem -> deleting', url);
    const res = await timeoutFetch(url, {
      method: 'DELETE',
      headers: { 'Accept': 'application/json' },
    });
    const data = await handleResponse(res);
    console.log('[itemsApi] deleteItem -> success', data);
    return data;
  } catch (err) {
    console.error('[itemsApi] deleteItem -> error', err);
    throw err;
  }
}

/* ------------------------------
   Quick console tests (DEV only)
   ------------------------------
   These run automatically only when Vite is in dev mode.
   They exercise each function with console logs so you can see connectivity.
*/
if (import.meta.env.DEV) {
  (async function runSanityChecks() {
    console.log('[itemsApi][DEV] Running sanity checks for Items API...');

    try {
      // 1) fetch items
      await getItems();
    } catch (e) {
      console.warn('[itemsApi][DEV] getItems failed (this might be normal if backend is down)', e.message);
    }

    try {
      // 2) create a tiny test item (change shape to match your backend schema)
      const testPayload = { name: 'TEST_ITEM', SKU: "TEST SKU", quantity: 1 };
      const created = await createItem(testPayload);
      console.log('[itemsApi][DEV] createItem response (if created):', created);

      // 3) update the created item (only if created returned an id)
      const id = created.data._id;
      if (id) {
        await updateItem(id, { name: 'TEST_ITEM_UPDATED' });
        // 4) delete it
        await deleteItem(id);
      } else {
        console.warn('[itemsApi][DEV] createItem did not return an id — skipping update/delete tests');
      }
    } catch (e) {
      console.warn('[itemsApi][DEV] create/update/delete tests failed (this might be normal)', e.message);
    }

    console.log('[itemsApi][DEV] Sanity checks finished.');
  })();
}
