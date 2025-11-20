# Business Web App - Complete Project Map

**Project Structure**: Full-stack MERN (MongoDB, Express, React, Node.js)  
**Status**: Inventory management system with item CRUD operations  
**Current Port**: Frontend (Vite): 5173 | Backend (Node): 5000

---

## 📊 Architecture Overview

```
Frontend (React + Vite + TailwindCSS)
    ↓
API Client (itemsApi.js with fetch)
    ↓
Backend (Express + Mongoose)
    ↓
MongoDB Database
```

---

## 🔧 BACKEND (`/backend/src`)

### **1. Database Layer**

#### `config/db.js`
```
connectDB()  → async, connects to MongoDB via Mongoose, logs connection status
disconnectDB() → async, cleanly disconnects from MongoDB
```

**Key Variables:**
- `MONGO_URI` - MongoDB connection string from env (required)
- `mongooseOptions` - Connection options object
- Mongoose event listeners: `connected`, `error`, `disconnected`

---

#### `models/itemModel.js`
```
Item Schema (MongoDB Document):
{
  SKU: String (required, unique),
  name: String (required),
  quantity: Number (default: 0),
  unit: String (default: "pcs", required),
  cost: Number (default: 0),
  barcode: String (default: ""),
  imageUrl: String (default: ""),
  lowStockThreshold: Number (default: 0),
  attributes: [{key: String, value: String}],
  timestamps: true  // adds createdAt, updatedAt
}
```

**Export:** `Item` - Mongoose model for database operations

---

### **2. API Layer (Controllers)**

#### `controllers/itemsController.js`

| Function | HTTP Method | Route | Parameters | Returns |
|----------|-------------|-------|-----------|---------|
| `getAllItems()` | GET | `/api/items` | None | `{success, data: [items]}` |
| `getItemById()` | GET | `/api/items/:id` | `req.params.id` | `{success, data: item}` |
| `createItem()` | POST | `/api/items` | `req.body` (JSON) + optional `req.file` (image) | `{success, message, data: newItem}` |
| `updateItem()` | PUT | `/api/items/:id` | `req.params.id`, `req.body` | `{success, message, data: updatedItem}` |
| `deleteItem()` | DELETE | `/api/items/:id` | `req.params.id` | `{success, message}` |
| `updateQuantity()` | PATCH | `/api/items/:id/quantity` | `req.params.id`, `req.body.quantity` | `{success, message, data: item}` |
| `lowStockCheck()` | GET | `/api/items/low-stock` | None | `{success, count, data: [lowItems]}` |

**Key Logic:**
- All endpoints use async/await with try-catch error handling
- `req.body` parsed as JSON
- Image uploads via multer middleware (optional in POST/PUT)
- Dynamic attributes/variants parsed from JSON strings
- All errors passed to centralized error handler

---

### **3. Routes**

#### `routes/itemsRoutes.js`
```
router.get('/', getAllItems)
router.get('/:id', getItemById)
router.post('/', imageUpload.single('image'), createItem)
router.put('/:id', updateItem)
router.delete('/:id', deleteItem)
router.patch('/:id/quantity', updateQuantity)
```

**Base Path:** `/api/items`  
**Middleware on POST:** `imageUpload.single('image')`

---

### **4. Middleware**

#### `middleware/imageUpload.js`
```
multer.diskStorage config:
- destination: './uploads/' 
- filename: 'timestamp_originalext'
- fileFilter: Only accepts JPEG, PNG, WebP
- Export: upload (multer instance)
```

#### `middleware/errorHandler.js`
```
errorHandler(err, req, res, next)
- Logs error message
- Returns: {success: false, message, stack (dev only)}
- Status code: err.statusCode or 500
```

#### `middleware/logger.js`
```
morgan('dev') - HTTP request logger
- Logs: METHOD /path STATUS responsetime
```

---

### **5. Utilities**

#### `utils/helper.js`

| Function | Input | Output | Purpose |
|----------|-------|--------|---------|
| `formatSKU(prefix)` | prefix (String) | SKU string | Generate unique SKU: `{PREFIX}-{TIMESTAMP_HEX}` |
| `toNumber(value, default)` | value, default | Number | Safe number conversion, prevents NaN |
| `emptyToNull(obj)` | object | object | Convert empty strings to null |
| `safeJSON(value)` | string or object | parsed object or null | Safely parse JSON from input |
| `buildFilePath(file)` | multer file object | file path string | Convert multer file to safe URL path |
| `removeImage(filePath)` | file path | void | Delete image file from `./uploads/` |
| `removeImages(filePaths)` | array of paths | void | Delete multiple image files |
| `sanitizeUpdateObject(obj)` | object | object | Remove undefined/null/empty from object |
| `apiResponse(success, data, msg)` | boolean, any, string | {success, data, message} | Standard API response wrapper |

---

### **6. Entry Points**

#### `app.js`
```javascript
Middleware Stack:
1. cors() - Enable cross-origin requests
2. express.json() - Parse JSON bodies
3. express.urlencoded() - Parse form data
4. morgan('dev') - HTTP logging
5. logger (custom)
6. Routes: /api/items
7. errorHandler (catches all errors)
```

#### `server.js`
```javascript
1. Load .env from parent directory
2. Import app and connectDB
3. connectDB() - Connect to MongoDB
4. app.listen(PORT) - Start server (default 5000)
```

---

## 🎨 FRONTEND (`/frontend/src`)

### **1. Entry Points**

#### `main.jsx`
```javascript
ReactDOM.createRoot('#root').render(<App />)
```

#### `App.jsx`
```jsx
Routes:
/ → <LandingPage/>
/items → <ItemsList />
/items/add → <AddItem />
/items/edit/:id → <EditItem />
```

---

### **2. API Layer**

#### `features/itemsApi.js`

```javascript
Constants:
- API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000'
- DEFAULT_TIMEOUT_MS = 10000

Functions:
```

| Function | HTTP Method | Endpoint | Returns |
|----------|-------------|----------|---------|
| `getItems()` | GET | `/api/items` | Promise with items array |
| `createItem(itemData)` | POST | `/api/items` | Promise with created item |
| `updateItem(id, updates)` | PUT | `/api/items/:id` | Promise with updated item |
| `deleteItem(id)` | DELETE | `/api/items/:id` | Promise (empty on success) |
| `getItemById(id)` | GET | `/api/items/:id` | Promise with single item |

**Key Features:**
- `timeoutFetch()` - Fetch with AbortController (10s default timeout)
- `handleResponse()` - Parse JSON and throw custom errors
- Console logging in dev mode for debugging
- Proper error handling with status codes

---

### **3. State Management**

#### `features/inventory/context/ItemsContext.jsx`

```jsx
Context: ItemsContext

Provider: <ItemsProvider>
  Props: {children}

State Variables:
- items: Array - All items from backend
- loading: Boolean - Loading state
- error: String - Error message if any

Context Value (API):
{
  items,
  loading,
  error,
  loadItems(),        // async - fetch all items
  createItem(newItem),   // async - create item
  updateItem(id, updates),  // async - update item
  deleteItem(id)      // async - delete item
}

Custom Hook:
- useItems() → returns ItemsContext value
```

**Lifecycle:**
- `useEffect` on mount → `loadItems()`
- All operations update state automatically
- Error caught and stored in context

---

### **4. Pages**

#### `features/inventory/pages/ItemsList.jsx`
```jsx
Hook: useItems() from ItemsProvider (context)

Renders:
- Header: "Inventory Items" + "Add Item" button
- List of items with Links to edit page
- Shows: name, SKU, quantity
- No items message if empty

On Mount:
- Calls loadItems() to fetch items
```

#### `features/inventory/pages/AddItem.jsx`
```jsx
Hook: useItems() from ItemsProvider

Form State:
{
  name: "",
  SKU: "",
  quantity: "",
  unit: "",
  price: ""
}

Functions:
- handleChange(e) - Update form state on input
- handleSubmit(e) - Call createItem(), navigate to /items

Renders:
- 5 input fields (name, SKU, qty, unit, price)
- "Save" button (full width, green)
```

#### `features/inventory/pages/EditItem.jsx`
```jsx
Appears identical to AddItem.jsx in current state
- Could be used to edit existing items
- Currently uses addItem instead of updateItem (may need fixing)
```

#### `features/landingpage/pages/LandingPage.jsx`
```jsx
Status: Exists in workspace, not yet reviewed in detail
Purpose: Landing/home page for the application
```

---

### **5. Directory Structure (Refactored)**

```
frontend/src/
├── app/                       # Application layer
│   ├── routes/               # Page routes
│   │   ├── LandingPage.jsx   (/ route)
│   │   ├── InventoryPage.jsx (/inventory route)
│   │   ├── AddItemPage.jsx   (/inventory/add route)
│   │   └── EditItemPage.jsx  (/inventory/edit/:id route)
│   ├── app.jsx               (Main App component with routing)
│   ├── provider.jsx          (Global providers wrapper)
│   └── router.jsx            (React Router configuration)
│
├── assets/                    (Static files - images, fonts)
│
├── components/               (Shared components)
│   └── landing/
│       ├── Navbar.jsx
│       ├── Hero.jsx
│       └── Footer.jsx
│
├── config/                    (Global config & env variables)
│   └── api.js                (API_BASE, timeout constants)
│
├── features/                 (Feature-based modules)
│   └── inventory/
│       ├── api/
│       │   └── itemsApi.js   (Items API client)
│       └── context/
│           └── ItemsContext.jsx (State - kept for reference)
│
├── hooks/                     (Shared custom hooks)
│   └── useItems.js           (Items context hook)
│
├── lib/                       (Preconfigured libraries)
│   └── fetch.js              (fetch utilities: timeoutFetch, handleResponse)
│
├── stores/                    (Global state management)
│   └── ItemsContext.jsx      (Items context & provider)
│
├── testing/                   (Test utilities & mocks - empty)
│
├── types/                     (Shared TypeScript types - empty)
│
├── utils/                     (Shared utility functions - empty)
│
├── main.jsx                   (React DOM mount point)
├── index.css                  (Global styles)
└── router.jsx                 (Legacy - replaced by app/router.jsx)
```

---

## 🔄 Data Flow

### Create Item Flow:
```
AddItem.jsx (form)
  ↓ handleSubmit
createItem() [ItemsContext]
  ↓ API call
createItem() [itemsApi.js]
  ↓ POST /api/items
createItem() [backend controller]
  ↓ Save to MongoDB
Item saved
  ↓ Response {success, data}
Update context state
  ↓ Add to items array
UI re-renders
  ↓ Navigate to /items
```

### Read Items Flow:
```
ItemsList.jsx
  ↓ useEffect on mount
loadItems() [ItemsContext]
  ↓ API call
getItems() [itemsApi.js]
  ↓ GET /api/items
getAllItems() [backend controller]
  ↓ Query MongoDB
Return items array
  ↓ Response {success, data}
Update context state
  ↓ Set items array
UI re-renders with items
```

---

## 📝 Key Observations & Issues

### ✅ Working:
- Backend routes fully implemented
- Frontend context setup functional
- API client with proper error handling
- Database schema well-structured

### ⚠️ Needs Attention:
1. **EditItem.jsx** - Currently uses `createItem()` instead of `updateItem()` - needs fix
2. **ItemsList.jsx** - Typo: `classend` should be `className` in no-items message
3. **Form field mismatch** - AddItem has `price` field but backend model has `cost`
4. **Frontend ItemsProvider** - Pages use `useContext(ItemsProvider)` but should use `useItems()` hook
5. **Missing route** - `lowStockCheck` endpoint not wired in routes
6. **No image upload** - Frontend doesn't handle image uploads yet
7. **Type validation** - No TypeScript or prop validation (types.js exists but empty?)

### 🚀 Next Steps:
1. Fix context usage in pages (use `useItems()` hook)
2. Implement EditItem with `updateItem()` call
3. Align field names (price ↔ cost)
4. Fix className typo in InventoryPage
5. Add image upload support to form
6. Implement low-stock dashboard
7. Add deletion confirmation UI

---

## 📦 Dependencies

### Backend
- express (5.1.0)
- mongoose (8.19.4)
- cors (2.8.5)
- multer (2.0.2)
- morgan (1.10.1)
- dotenv (17.2.3)
- nodemon (dev)

### Frontend
- react (with react-router-dom)
- vite
- tailwindcss (for styling)

---

## 🌍 Environment Variables

### Backend (.env - project root)
```
MONGODB_URI=mongodb://...
PORT=5000 (optional, defaults to 5000)
NODE_ENV=development
```

### Frontend (.env - frontend folder)
```
VITE_API_BASE=http://localhost:5000 (optional, defaults internally)
```

---

## 🔗 API Response Format

All responses follow:
```javascript
{
  success: Boolean,
  message?: String,
  data?: Object | Array,
  stack?: String (dev mode only)
}
```

---

## 📊 Database Schema

### Item Document
```javascript
{
  _id: ObjectId,
  SKU: String (unique),
  name: String,
  quantity: Number,
  unit: String,
  cost: Number,
  barcode: String,
  imageUrl: String,
  lowStockThreshold: Number,
  attributes: [{key, value}],
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🎯 Current Status

**Complete Features:**
- ✅ CRUD operations for items
- ✅ Database connectivity
- ✅ API client setup
- ✅ Context-based state management
- ✅ Basic routing

**In Progress:**
- 🔄 Landing page integration
- 🔄 Edit item functionality
- 🔄 Low-stock alerts

**TODO:**
- ⏳ Image upload and display
- ⏳ Search/filter functionality
- ⏳ Inventory value calculations
- ⏳ Barcode scanning
- ⏳ User authentication
- ⏳ Dashboard/analytics

