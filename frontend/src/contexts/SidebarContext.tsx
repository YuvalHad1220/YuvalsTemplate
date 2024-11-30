import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the types for the context value
interface SidebarContextType {
  openSidebar: () => void;
  closeSidebar: () => void;
  isSidebarOpen: boolean;
}

// Create the context with the appropriate types
const SidebarContext = createContext<SidebarContextType>({
  openSidebar: () => {},
  closeSidebar: () => {},
  isSidebarOpen: false,
});

// Define the SidebarProvider props
interface SidebarProviderProps {
  children: ReactNode;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({
  children,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <SidebarContext.Provider
      value={{ openSidebar, closeSidebar, isSidebarOpen }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

// Custom hook to use the sidebar context
export const useSidebar = () => useContext(SidebarContext);
