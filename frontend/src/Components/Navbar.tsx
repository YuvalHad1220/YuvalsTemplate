import React, { ReactNode } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { Settings } from "@mui/icons-material";
import { useSidebar } from "../contexts/SidebarContext";

// Define the types for the props
interface NavbarProps {
  children?: ReactNode; // 'children' is optional and can be any valid JSX element
}

const Navbar: React.FC<NavbarProps> = ({ children }) => {
  const { openSidebar } = useSidebar();

  return (
    <Box
      height="64px"
      component="nav"
      sx={{
        p: 2,
        borderBottom: 1,
        borderColor: "divider",
        display: "flex",
        alignItems: "center",
        background: (theme) => theme.palette.background.paper, // Correct way to access theme
      }}
    >
      {/* Dynamic Content */}
      {children}

      {/* Constant Content */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, marginLeft: "auto" }}>
        <Typography component="span">שלום, אורח!</Typography>
        <IconButton color="primary" onClick={openSidebar}>
          <Settings />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Navbar;
