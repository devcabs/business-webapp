// src/app/provider.tsx
import { ItemsProvider } from '../stores/ItemsContext';

export function AppProvider({ children }) {
  return <ItemsProvider>{children}</ItemsProvider>;
}
