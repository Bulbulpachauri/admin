# Repository Overview

- **Name**: my-project
- **Tooling**: Vite + React 18, TailwindCSS
- **Package Manager**: npm
- **Runtime**: Browser (SPA)

## Key Scripts
- **dev**: `vite`
- **build**: `vite build`
- **preview**: `vite preview`

## App Entry Points
- **index.html**: Vite root HTML
- **src/main.jsx**: React entry
- **src/App.jsx**: Main App component, Router + Context provider

## Routing
Defined in `src/App.jsx` using `react-router-dom`:
- `/` → `Pages/Home`
- `/productListing` → `Pages/ProductListing`
- `/product/:id` → `Pages/ProductDetails`
- `/login` → `Pages/Login`
- `/register` → `Pages/Register`
- `/cart` → `Pages/Cart`
- `/verify` → `Pages/Verify`

## Global Context
Declared in `src/App.jsx` as `MyContext`. Provides:
- `setOpenProductDetailsModal`
- `setOpenCartPanel`
- `toggleCartPanel`
- `openCartPanel`
- `openAlertBox` (uses `react-hot-toast`)

## UI/Libs Used
- **React**: ^18.2.0
- **react-router-dom**: ^7.6.2
- **Material UI (MUI)**: imports seen (Button, Dialog, etc.)
- **Swiper**: ^11.2.10
- **Image zoom libs**: `react-image-magnify`, `react-inner-image-zoom`
- **TailwindCSS**: configured via `tailwind.config.js`

## Notable Components
- `components/Header`, `components/Footer`
- Product detail modal (`Dialog` with `ProductZoom` and `components/ProductDetails`)
- Various sliders and UI components under `src/components`

## Known Issues / TODOs
- Missing dependency: `react-hot-toast` required by `src/App.jsx`. Install with:
  - `npm install react-hot-toast`
- Login page (`src/Pages/Login/index.jsx`) typos:
  - `histoty` → use `const navigate = useNavigate()` then `navigate("/verify")`
  - `context.openAlertBox` used without `useContext(MyContext)`
  - TextField props typos: `lable` → `label`, `type="emai"` → `type="email"`, `name="name"` → `name="email"`

## Build/Run
1. Install deps: `npm install`
2. Dev: `npm run dev`
3. Build: `npm run build`
4. Preview: `npm run preview`

## Folder Structure (partial)
- `public/` assets
- `src/`
  - `Pages/` (Home, ProductListing, ProductDetails, Login, Register, Cart, Verify)
  - `components/` (Header, Footer, sliders, product UI, etc.)
  - `assets/` images
  - `App.jsx`, `main.jsx`, styles

## Notes
- Vite config in `vite.config.js`
- Tailwind configured via PostCSS
- Ensure `react-hot-toast` is installed for toast usage in context.