export default function InventoryPage() {
  return (
    <div className="p-8">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">
          Inventory List
        </h1>

        <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
          + Add Item
        </button>
      </div>

      {/* Table Container */}
      <div className="border rounded-xl shadow-sm overflow-hidden bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Item</th>
              <th className="px-4 py-3 text-left font-medium">Category</th>
              <th className="px-4 py-3 text-left font-medium">Stock</th>
              <th className="px-4 py-3 text-left font-medium">Price</th>
              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>

          {/* Empty State (for now) */}
          <tbody>
            <tr>
              <td colSpan="5" className="text-center py-10 text-gray-500">
                No items yet. Add your first product!
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
