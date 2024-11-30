import React from "react";
import { IconButton, Box, useTheme } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PrintIcon from "@mui/icons-material/Print";

type ActionColumnProps = {
  rowId: string;
  onEdit?: (id: string) => void;
  onPrint?: (id: string) => void;
  onDelete?: (id: string) => void;
  onView?: (id: string) => void;
};

const ActionColumn: React.FC<ActionColumnProps> = ({
  rowId,
  onEdit,
  onDelete,
  onPrint,
  onView,
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      {onView && (
        <IconButton
          size="small"
          color="primary"
          sx={{
            background: theme.palette.primary.light,
            "&:hover": {
              background: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
            },
          }}
          onClick={() => onView(rowId)}
        >
          <VisibilityIcon fontSize="small" />
        </IconButton>
      )}
      {onEdit && (
        <IconButton
          size="small"
          color="primary"
          sx={{
            background: theme.palette.primary.light,
            "&:hover": {
              background: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
            },
          }}
          onClick={() => onEdit(rowId)}
        >
          <EditIcon fontSize="small" />
        </IconButton>
      )}
      {onDelete && (
        <IconButton
          size="small"
          color="primary"
          sx={{
            background: theme.palette.primary.light,
            "&:hover": {
              background: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
            },
          }}
          onClick={() => onDelete(rowId)}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      )}
      {onPrint && (
        <IconButton
          size="small"
          color="primary"
          sx={{
            background: theme.palette.primary.light,
            "&:hover": {
              background: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
            },
          }}
          onClick={() => onPrint(rowId)}
        >
          <PrintIcon fontSize="small" />
        </IconButton>
      )}
    </Box>
  );
};

export default ActionColumn;
