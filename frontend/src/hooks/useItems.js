// src/hooks/useItems.js
import { useContext } from 'react';
import { ItemsContext } from '../stores/ItemsContext';

export function useItems() {
  return useContext(ItemsContext);
}
