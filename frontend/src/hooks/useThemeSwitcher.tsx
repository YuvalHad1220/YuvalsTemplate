import { CssBaseline, Theme } from "@mui/material";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from "react";
import { darkTheme, lightTheme } from "../themeConfig";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import { prefixer } from "stylis";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";

// Define the shape of the context value
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  mode: "light" | "dark"; // Add mode to the context type
}

// Create RTL Cache
const rtlCache = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

// Create the context with a more specific type and initial undefined value
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Provider component with explicit children prop typing
export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>(lightTheme);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === lightTheme ? darkTheme : lightTheme
    );
  };

  const mode = useMemo(() => theme.palette.mode, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mode }}>
      <CacheProvider value={rtlCache}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </MuiThemeProvider>
      </CacheProvider>
    </ThemeContext.Provider>
  );
};

// Custom hook with proper error handling
export const useThemeSwitcher = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useThemeSwitcher must be used within a ThemeProvider");
  }

  return context;
};
