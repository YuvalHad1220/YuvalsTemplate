import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import router from "./router";

// Import Grid and Resizable styles
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { SidebarProvider } from "./contexts/SidebarContext";
import Sidebar from "./Components/Sidebar";
import { ThemeProvider } from "./hooks/useThemeSwitcher";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <SidebarProvider>
        <Sidebar />
        <RouterProvider router={router} />
      </SidebarProvider>
    </ThemeProvider>
  </StrictMode>
);
