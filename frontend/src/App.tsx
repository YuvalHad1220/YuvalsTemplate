import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { Box } from "@mui/material";
import Sidebar, { MenuSection } from "./Sidebar";
import { Outlet, useLocation, useRouter } from "@tanstack/react-router";

import {
  Home,
  Settings,
  Assignment,
  VideoCameraFront,
  Book,
  CarCrash,
} from "@mui/icons-material";
import { useThemeSwitcher } from "./hooks/useThemeSwitcher";
import { useEffect } from "react";
// Menu data remains the same

const menuData: MenuSection[] = [
  {
    title: "כללי",
    items: [
      { icon: <Home />, text: "דף הבית", id: "/" },
      { icon: <VideoCameraFront />, text: "סרטונים", id: "/videos" },
      { icon: <Book />, text: "ספרות טכנית", id: "/literature" },
      { icon: <CarCrash />, text: "תאונות עבודה וחקר טכני", id: "/accidents" },
    ],
  },
  {
    title: "תוכן",
    items: [{ icon: <Assignment />, text: "תסקירים", id: "/reports" }],
  },
  // {
  //   title: "ניהול",
  //   items: [{ icon: <Settings />, text: "הגדרות", id: "/settings" }],
  // },
];

function App(): JSX.Element {
  const router = useRouter();
  const location = useLocation();
  return (
    <Box sx={{ display: "flex", height: "100vh", width: "100vw" }}>
      <Sidebar
      selectedIndex={location.pathname}
        callbackOnClick={(index) => router.navigate({ to: index })}
        menuData={menuData}
        mainLogoSrc="https://robohash.org/%7Brandom-string%7D?size=120x120"
        mainLogoText='מדור צהר"ם'
        altLogoSrc="https://robohash.org/%7Brandom-string%7D?size=120x120"
        altLogoText="פותח על ידי יובל הדר"
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100%",
          overflow: "auto",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default App;
