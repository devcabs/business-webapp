// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ItemsList from "./features/inventory/pages/ItemsList";
import AddItem from "./features/inventory/pages/AddItem";
import EditItem from "./features/inventory/pages/EditItem.jsx";
import LandingPage from "./features/landingpage/pages/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/items" element={<ItemsList />} />
        <Route path="/items/add" element={<AddItem />} />
        <Route path="/items/edit/:id" element={<EditItem />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;