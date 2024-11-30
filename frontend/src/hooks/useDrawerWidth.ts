import { useMediaQuery, useTheme } from "@mui/material";

const useDrawerWidth = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
    const drawerWidth = isSmallScreen ? 80 : 260;

    return {drawerWidth, isSmallScreen};
}

export default useDrawerWidth;