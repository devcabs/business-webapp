// src/app/routes/AddItemPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useItems } from '../../hooks/useItems';

export default function AddItemPage() {
  const { addItem } = useItems();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    name: '',
    SKU: '',
    quantity: 0,
    unit: 'pcs',
    cost: 0,
    barcode: '',
    lowStockThreshold: 5,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'quantity' || name === 'cost' || name === 'lowStockThreshold' 
        ? Number(value) 
        : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await addItem(form);
      navigate('/inventory');
    } catch (err) {
      setError(err.message || 'Failed to create item');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Add Item</h1>

      {error && <div className="mb-4 p-3 bg-red-50 text-red-600 rounded">{error}</div>}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium mb-1">Item Name *</label>
          <input
            type="text"
            name="name"
            value={form.name}
            placeholder="e.g., Widget Pro"
            className="w-full border p-2 rounded"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">SKU *</label>
          <input
            type="text"
            name="SKU"
            value={form.SKU}
            placeholder="e.g., SKU-001"
            className="w-full border p-2 rounded"
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={form.quantity}
              className="w-full border p-2 rounded"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Unit</label>
            <input
              type="text"
              name="unit"
              value={form.unit}
              placeholder="pcs, kg, box"
              className="w-full border p-2 rounded"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Cost</label>
            <input
              type="number"
              name="cost"
              value={form.cost}
              step="0.01"
              className="w-full border p-2 rounded"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Low Stock Threshold</label>
            <input
              type="number"
              name="lowStockThreshold"
              value={form.lowStockThreshold}
              className="w-full border p-2 rounded"
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Barcode</label>
          <input
            type="text"
            name="barcode"
            value={form.barcode}
            placeholder="Optional"
            className="w-full border p-2 rounded"
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white px-4 py-2 rounded font-medium hover:bg-green-700 disabled:bg-gray-400"
        >
          {loading ? 'Saving...' : 'Save Item'}
        </button>
      </form>
    </div>
  );
}
