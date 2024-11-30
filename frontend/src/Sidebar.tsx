import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  styled,
  Theme,
  ListItemButton,
  useTheme,
  useMediaQuery,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import useDrawerWidth from "./hooks/useDrawerWidth";

// Previous interfaces remain the same
export interface MenuItem {
  icon: React.ReactElement;
  text: string;
  id: string;
}

export interface MenuSection {
  title: string;
  items: MenuItem[];
}

const StyledListItemButton = styled(ListItemButton)(
  ({ theme }: { theme: Theme }) => ({
    "&.Mui-selected": {
      backgroundColor: theme.palette.primary.light,
      "& .MuiListItemIcon-root": {
        color: theme.palette.primary.main,
      },
      "& .MuiListItemText-primary": {
        color: theme.palette.primary.main,
        fontWeight: 600,
      },
    },
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
      "& .MuiListItemIcon-root": {
        color: theme.palette.primary.main,
      },
      "& .MuiListItemText-primary": {
        color: theme.palette.primary.main,
      },
    },
    marginBottom: theme.spacing(0.5),
    borderRadius: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
  })
);

const StyledSubheader = styled(ListSubheader)(
  ({ theme }: { theme: Theme }) => ({
    color: theme.palette.text.secondary,
    fontWeight: 600,
    lineHeight: "3em",
    paddingLeft: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      fontSize: "0.8rem",
      paddingLeft: theme.spacing(1),
      textAlign: "center",
    },
  })
);

const LogoContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2),
  gap: theme.spacing(2),
}));

const LogoImage = styled("img")(({ theme }) => ({
  width: 40,
  height: 40,
  borderRadius: theme.shape.borderRadius,
}));

export type SidebarProps = {
  menuData: MenuSection[];
  mainLogoText: string;
  mainLogoSrc: string;
  altLogoText: string;
  altLogoSrc: string;
  callbackOnClick: (id: string) => void
  selectedIndex: string
};
const Sidebar: React.FC<SidebarProps> = ({
  menuData,
  mainLogoSrc,
  mainLogoText,
  altLogoSrc,
  altLogoText,
  callbackOnClick,
  selectedIndex
}) => {
  const theme = useTheme();
  const {isSmallScreen, drawerWidth} = useDrawerWidth();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          border: "none",
          boxShadow: 1,
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
      }}
      anchor="left"
    >
      {/* Top Logo Section */}
      <LogoContainer
        height="64px"
        sx={{
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <LogoImage
          src={mainLogoSrc}
          alt="Top Logo"
        />
        {!isSmallScreen && (
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: theme.palette.primary.main,
            }}
          >
            {mainLogoText}
          </Typography>
        )}
      </LogoContainer>

      {/* Main Menu */}
      <Box sx={{ flexGrow: 1, overflow: "auto" }}>
        <List sx={{ width: "100%" }}>
          {menuData.map((section, sectionIndex) => (
            <React.Fragment key={section.title}>
              <StyledSubheader disableGutters>{section.title}</StyledSubheader>
              {section.items.map((item, itemIndex) => (
                <ListItem key={item.id} disablePadding>
                  <StyledListItemButton
                  onClick={() => callbackOnClick(item.id)}
                    selected={selectedIndex === item.id}
                    sx={
                      isSmallScreen
                        ? {
                            justifyContent: "center",
                            px: 1,
                          }
                        : {}
                    }
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: isSmallScreen ? "auto" : 40,
                        mr: isSmallScreen ? 0 : "auto",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    {!isSmallScreen && <ListItemText primary={item.text} />}
                  </StyledListItemButton>
                </ListItem>
              ))}
            </React.Fragment>
          ))}
        </List>
      </Box>

      {/* Bottom Logo Section */}
      <Divider sx={{ mt: 2 }} />
      <LogoContainer>
        <LogoImage
          src={altLogoSrc}
          alt="Bottom Logo"
        />
        {!isSmallScreen && (
          <Typography
            variant="subtitle2"
            sx={{
              color: theme.palette.text.secondary,
              fontWeight: 500,
            }}
          >
            {altLogoText}
          </Typography>
        )}
      </LogoContainer>
    </Drawer>
  );
};

export default Sidebar;
