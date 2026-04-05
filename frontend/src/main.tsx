import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { AppProvider } from "./AppContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import React from "react";
import { router } from "./module/navigation/components/Router";
const queryClient = new QueryClient();

import { AuthProvider } from "./module/Auth/context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppProvider>
          <RouterProvider router={router} />
        </AppProvider>
      </AuthProvider>
    </QueryClientProvider>
  // </React.StrictMode>,
);
