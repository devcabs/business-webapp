// src/stores/ItemsContext.jsx
import { createContext } from 'react';

export const ItemsContext = createContext({});

export function ItemsProvider({ children }) {
  return <ItemsContext.Provider value={{}}>{children}</ItemsContext.Provider>;
}
