// src/app/routes/EditItemPage.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useItems } from '../../hooks/useItems';
import { getItemById } from '../../features/inventory/api/itemsApi';

export default function EditItemPage() {
  const { id } = useParams();
  const { updateItem, deleteItem } = useItems();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetching, setFetching] = useState(true);

  const [form, setForm] = useState({
    name: '',
    SKU: '',
    quantity: 0,
    unit: 'pcs',
    cost: 0,
    barcode: '',
    lowStockThreshold: 5,
  });

  useEffect(() => {
    async function fetchItem() {
      try {
        const response = await getItemById(id);
        const item = response.data || response;
        setForm(item);
      } catch (err) {
        setError('Failed to load item: ' + err.message);
      } finally {
        setFetching(false);
      }
    }

    fetchItem();
  }, [id]);

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
      await updateItem(id, form);
      navigate('/inventory');
    } catch (err) {
      setError(err.message || 'Failed to update item');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    setLoading(true);

    try {
      await deleteItem(id);
      navigate('/inventory');
    } catch (err) {
      setError(err.message || 'Failed to delete item');
      setLoading(false);
    }
  }

  if (fetching) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Edit Item</h1>

      {error && <div className="mb-4 p-3 bg-red-50 text-red-600 rounded">{error}</div>}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium mb-1">Item Name *</label>
          <input
            type="text"
            name="name"
            value={form.name}
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
            className="w-full border p-2 rounded"
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white px-4 py-2 rounded font-medium hover:bg-green-700 disabled:bg-gray-400"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>

      <button
        onClick={handleDelete}
        disabled={loading}
        className="w-full mt-4 bg-red-600 text-white px-4 py-2 rounded font-medium hover:bg-red-700 disabled:bg-gray-400"
      >
        Delete Item
      </button>
    </div>
  );
}
