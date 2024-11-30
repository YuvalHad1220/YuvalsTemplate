import { Box, List, Paper, TextField, alpha } from "@mui/material";
import { FileFolder, useFileFolder } from "../../hooks/useFileFolder";
import { FileFolderProvider } from "../../contexts/FileFolderContext";
import { FileFolderItemComponent } from "./FileFolderItem";

interface MuiFileFolderProps {
  fileFolder: FileFolder;
}

const MuiFileFolder = ({ fileFolder }: MuiFileFolderProps) => {
  const { searchQuery, setSearchQuery, filteredData } = useFileFolder(fileFolder);

  return (
    <FileFolderProvider>
      <Box>
        <Paper
          elevation={4}
          sx={{
            margin: 3,
            padding: 2,
            borderRadius: 3,
          }}
        >
          <Box
            sx={{
              backgroundColor: theme => alpha(theme.palette.background.default, 0.22),
              padding: 2,
              borderRadius: 3,
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              label="חפש תוכן"
              value={searchQuery}
              size="small"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Box>
          <List>
            {filteredData.items.map((item) => (
              <FileFolderItemComponent key={item.id} item={item} level={0} />
            ))}
          </List>
        </Paper>
      </Box>
    </FileFolderProvider>
  );
};

export default MuiFileFolder;