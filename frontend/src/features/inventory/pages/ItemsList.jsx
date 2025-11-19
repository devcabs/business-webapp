import { useContext, useEffect } from "react";
import { ItemsProvider } from "../context/ItemsContext";
import { Link } from "react-router-dom";

export default function ItemsList() {
  const { items, loadItems } = useContext(ItemsProvider);

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Inventory Items</h1>
        <Link
          to="/items/add"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Item
        </Link>
      </div>

      <div className="space-y-2">
        {items.length === 0 ? (
          <p className="text-gray-500">No items yet.</p>
        ) : (
          items.map((item) => (
            <Link
              key={item._id}
              to={`/items/edit/${item._id}`}
              className="block p-3 border rounded hover:bg-gray-50"
            >
              <div className="font-medium">{item.name}</div>
              <div className="text-sm text-gray-600">
                SKU: {item.sku} · Qty: {item.quantity}
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
