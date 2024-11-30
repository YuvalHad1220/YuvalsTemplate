import { Box, Button, Drawer, Typography, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useSidebar } from "../contexts/SidebarContext";
import { useState } from "react";
import { useThemeSwitcher } from "../hooks/useThemeSwitcher";
import { useTheme } from "@mui/material/styles";

const Sidebar: React.FC = () => {
  const { isSidebarOpen, closeSidebar } = useSidebar();
  const { toggleTheme, mode } = useThemeSwitcher();
  const theme = useTheme(); // Access the current MUI theme

  const handleThemeChange = (_: React.MouseEvent<HTMLElement>, newTheme: string | null) => {
    if (newTheme && newTheme !== mode) {
      toggleTheme();
    }
  };

  const sidebarStyles = {
    dark: {
      backgroundColor: "#2C2C2C",
      color: "#E0E0E0",
    },
    light: {
      backgroundColor: "#F5F5F5",
      color: "#333333",
    },
  };

  const buttonGroupStyles = {
    dark: {
      backgroundColor: "#444444",
      borderColor: "#666666",
    },
    light: {
      backgroundColor: "#FFFFFF",
      borderColor: "#CCCCCC",
    },
  };

  return (
    <Drawer
      anchor="right"
      open={isSidebarOpen}
      onClose={closeSidebar}
      PaperProps={{
        sx: {
          ...sidebarStyles[mode],
          transition: "background-color 0.3s ease, color 0.3s ease", // Smooth animation for theme switch
          backdropFilter: "blur(8px)",
          boxShadow: "0 6px 10px rgba(0,0,0,0.2)",
          borderLeft: "1px solid rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <Box
        sx={{
          width: 280,
          padding: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          transition: "all 0.3s ease", // Smooth animation for child elements
        }}
      >
        {/* Top Section */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {/* ToggleButtonGroup for Light / Dark Mode */}
          <ToggleButtonGroup
            value={mode}
            exclusive
            onChange={handleThemeChange}
            fullWidth
            sx={{
              mt: 3,
              backgroundColor: buttonGroupStyles[mode].backgroundColor,
              borderColor: buttonGroupStyles[mode].borderColor,
              borderRadius: "4px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              transition: "background-color 0.3s ease, border-color 0.3s ease", // Smooth button group transition
            }}
          >
            <ToggleButton
              value="dark"
              sx={{
                transition: "background-color 0.3s ease, color 0.3s ease", // Smooth text and background animation
                "&:hover": {
                  backgroundColor: mode === "dark" ? "#444444" : "#CCCCCC",
                },
              }}
            >
              מצב חשוך
            </ToggleButton>
            <ToggleButton
              value="light"
              sx={{
                transition: "background-color 0.3s ease, color 0.3s ease", // Smooth text and background animation
                "&:hover": {
                  backgroundColor: mode === "light" ? "#444444" : "#CCCCCC",
                },
              }}
            >
              מצב בהיר
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Box>
          <Button
            fullWidth
            variant="outlined"
            sx={{
              mb: 3,
              backgroundColor: mode === "dark" ? "#555555" : "#F0F0F0",
              borderColor: mode === "dark" ? "#777777" : "#BBBBBB",
              color: mode === "dark" ? "#E0E0E0" : "#333333",
              fontWeight: 600,
              textTransform: "none",
              transition: "background-color 0.3s ease, color 0.3s ease", // Smooth animation for buttons
              "&:hover": {
                backgroundColor: mode === "dark" ? "#666666" : "#E0E0E0",
              },
            }}
          >
            עדכוני מערכת
          </Button>
          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
              color: mode === "dark" ? "#E0E0E0" : "#333333",
              mt: 2,
              transition: "color 0.3s ease", // Smooth text color transition
            }}
          >
            פותח על ידי צוות מאה ביחידת מקטנא"ר בשיתוף פעולה עם מדור צהר"ם, לפרטים נוספים:
          </Typography>
          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
              color: mode === "dark" ? "#E0E0E0" : "#333333",
              mt: 1,
              transition: "color 0.3s ease", // Smooth text color transition
            }}
          >
            054-9874938
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
