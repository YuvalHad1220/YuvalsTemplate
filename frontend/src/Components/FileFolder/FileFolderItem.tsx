import { Box, List, ListItem, ListItemIcon, ListItemText, IconButton, Collapse, Typography } from "@mui/material";
import {
  ChevronLeft,
  ExpandMore,
  OndemandVideoRounded,
  Download,
  PlayArrow,
  InsertDriveFile,
  Image,
} from "@mui/icons-material";
import { FileFolder, FileItem } from "../../hooks/useFileFolder";
import { useFileFolderContext } from "../../contexts/FileFolderContext";

interface FileFolderItemProps {
  item: FileFolder | FileItem;
  level: number;
}

const formatDate = (date?: Date) => {
  const d = date ?? new Date(0); // Default to Unix epoch if no date is provided
  return d.toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

export const FileFolderItemComponent = ({ item, level }: FileFolderItemProps) => {
  const { closedItems, setClosedItems } = useFileFolderContext();
  const isFolder = "items" in item;
  const isOpen = !closedItems.includes(item.id);

  const handleToggle = () => {
    if (isFolder) {
      setClosedItems((prev) =>
        isOpen ? [...prev, item.id] : prev.filter((id) => id !== item.id)
      );
    }
  };

  const getIcon = () => {
    if (isFolder) return isOpen ? <ExpandMore color="primary" /> : <ChevronLeft color="primary" />;
    if (item.type === "VIDEO") return <OndemandVideoRounded color="success" />;
    if (item.type === "DOCUMENT") return <InsertDriveFile color="action" />;
    if (item.type === "PICTURE") return <Image color="secondary" />;
  };

  const renderDate = () => (
    <Typography variant="caption" sx={{ mx: 2 }} color="text.secondary">
      {formatDate((item as FileItem).date)}
    </Typography>
  );

  return (
    <>
      <ListItem
        onClick={handleToggle}
        sx={{
          cursor: isFolder ? "pointer" : "inherit",
          py: 1,
          pl: (level + 1) * 3,
          borderRadius: 2,
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.04)",
          },
        }}
      >
        <ListItemIcon>{getIcon()}</ListItemIcon>
        <ListItemText
          primary={isFolder ? item.name : item.title}
          secondary={!isFolder && item.duration}
          primaryTypographyProps={{ fontWeight: isFolder ? "bold" : "normal" }}
        />
        {!isFolder && item.type === "VIDEO" && (
          <Box display="flex" alignItems="center">
            <IconButton
              component="a"
              size="small"
              href={item.viewUrl}
              aria-label="View video"
            >
              <PlayArrow />
            </IconButton>
            <IconButton
              component="a"
              size="small"
              href={item.downloadUrl}
              download
              aria-label="Download video"
            >
              <Download fontSize="small" />
            </IconButton>
            {renderDate()}

          </Box>
        )}
        {!isFolder && (item.type === "DOCUMENT" || item.type === "PICTURE") && (
          <Box display="flex" alignItems="center">
            <IconButton
              component="a"
              href={item.downloadUrl}
              download
              aria-label="Download document"
            >
              <Download fontSize="small" />
            </IconButton>
            {renderDate()}

          </Box>
        )}
      </ListItem>
      {isFolder && (
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.items.map((subItem) => (
              <FileFolderItemComponent key={subItem.id} item={subItem} level={level + 1} />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};
