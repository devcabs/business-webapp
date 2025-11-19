import { useState, useContext } from "react";
import { ItemsProvider } from "../context/ItemsContext";
import { useNavigate } from "react-router-dom";

export default function AddItem() {
  const { addItem } = useContext(ItemsProvider);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    sku: "",
    quantity: "",
    unit: "",
    price: ""
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    }
    
  async function handleSubmit(e) {
    e.preventDefault();
    await addItem(form);
    navigate("/items");
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Add Item</h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Item name"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          required
        />
        <input
          name="sku"
          placeholder="SKU"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          required
        />
        <input
          name="quantity"
          type="number"
          placeholder="Quantity"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          required
        />
        <input
          name="unit"
          placeholder="Unit (pcs, kg, box)"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          required
        />
        <input
          name="price"
          type="number"
          step="0.01"
          placeholder="Price"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          required
        />

        <button className="bg-green-600 text-white px-4 py-2 rounded w-full">
          Save
        </button>
      </form>
    </div>
  );
}
