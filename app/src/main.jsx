import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home.jsx";
import { Layout } from "./pages/Layout.jsx";
import { NoPage } from "./pages/NoPage.jsx";
import { AuthProvider } from "./components/AuthProvider.jsx";
import { Product } from "./pages/Product.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<NoPage />} />
          <Route path="product/:id" element={<Product />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <App />
    </AuthProvider>
  </StrictMode>
);
