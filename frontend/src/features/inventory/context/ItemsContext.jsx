import { createContext, useContext, useState, useEffect } from "react";
import {
  getItems,
  createItem,
  updateItem as apiUpdateItem,
  deleteItem as apiDeleteItem,
} from "../../itemsApi";

const ItemsContext = createContext();

export function ItemsProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ----------------------------
  // 📌 Load all items
  // ----------------------------
  const loadItems = async () => {
    try {
      setLoading(true);
      const data = await getItems();
      setItems(data);
    } catch (err) {
      setError(err.message || "Failed to load items");
    } finally {
      setLoading(false);
    }
  };

  // Load on mount
  useEffect(() => {
    loadItems();
  }, []);

  // ----------------------------
  // 📌 Create new item
  // ----------------------------
  const addItem = async (newItem) => {
    try {
      const saved = await createItem(newItem);
      setItems((prev) => [...prev, saved]);
      return saved;
    } catch (err) {
      setError(err.message || "Failed to create item");
    }
  };

  // ----------------------------
  // 📌 Update item
  // ----------------------------
  const updateItem = async (id, updates) => {
    try {
      const updated = await apiUpdateItem(id, updates);

      setItems((prev) =>
        prev.map((item) => (item._id === id ? updated : item))
      );

      return updated;
    } catch (err) {
      setError(err.message || "Failed to update item");
    }
  };

  // ----------------------------
  // 📌 Delete item
  // ----------------------------
  const deleteItem = async (id) => {
    try {
      await apiDeleteItem(id);
      setItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      setError(err.message || "Failed to delete item");
    }
  };

  return (
    <ItemsContext.Provider
      value={{
        items,
        loading,
        error,
        loadItems,
        addItem,
        updateItem,
        deleteItem,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
}

export const useItems = () => useContext(ItemsContext);
