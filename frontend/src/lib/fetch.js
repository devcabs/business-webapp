// src/lib/fetch.js
/**
 * Utility function to handle fetch with timeout
 */
export async function timeoutFetch(resource, options = {}, timeout = 10000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  const merged = { ...options, signal: controller.signal };
  return fetch(resource, merged).finally(() => clearTimeout(id));
}

export async function handleResponse(response) {
  const text = await response.text().catch(() => '');
  const contentType = response.headers.get('content-type') || '';

  let data = null;
  try {
    if (contentType.includes('application/json')) data = JSON.parse(text || '{}');
    else data = text;
  } catch (e) {
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
