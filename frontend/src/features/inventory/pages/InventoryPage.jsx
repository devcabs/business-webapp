import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { ItemsProvider } from "../context/ItemsContext";

export default function InventoryPage() {
  const { items, loadItems } = useContext(ItemsProvider);

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <div className="p-4">

      {/* Page Header */}
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-semibold">Inventory</h1>

        <Link
          to="/items/add"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Item
        </Link>
      </div>

      {/* Items List */}
      {items.length === 0 ? (
        <p classend="text-gray-500">No items yet.</p>
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <Link
              key={item._id}
              to={`/items/edit/${item._id}`}
              className="block p-3 border rounded hover:bg-gray-50"
            >
              <div className="font-medium">{item.name}</div>
              <div className="text-sm text-gray-600">
                SKU: {item.sku} • Qty: {item.quantity} {item.unit}
              </div>
              <div className="text-sm text-gray-800 font-semibold">
                ₱{item.price}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
