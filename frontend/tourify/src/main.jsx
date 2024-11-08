import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import SupabaseProvider from "./context/supabase-context";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <SupabaseProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </SupabaseProvider>
    </BrowserRouter>
  </StrictMode>
);
