import React, { useState } from "react";
import {
  Box,
  TextField,
  alpha,
  Typography,
  Collapse,
  Button,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { Table } from "@tanstack/react-table";

type TableFilterProps = {
  table: Table<any>;
};

const TableFilter: React.FC<TableFilterProps> = ({ table }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Toggle for expanding/collapsing the filter section
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Box
      sx={{
        background: (theme) => alpha(theme.palette.primary.main, 0.12),
        padding: 1,
        borderRadius: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mx: "10%",
        }}
      >
        {/* Global filter input */}
        <TextField
          size="small"
          placeholder="חפש..."
          value={table.getState().globalFilter ?? ""}
          onChange={(e) => table.setGlobalFilter(e.target.value)}
        />
        <Button
          sx={{
            alignItems: "center",
            marginRight: 2,
            borderRadius: 3,
          }}
          onClick={toggleExpand}
        >
          <Typography
            fontWeight="bold"
            variant="subtitle2"
            sx={{ marginRight: 1 }}
          >
            פילטרים
          </Typography>
          <ExpandMore
            sx={{
              transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.1s ease",
            }}
          />
        </Button>
      </Box>

      {/* Collapsible filters section */}
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <Box
          sx={{
            mt: 2,
            height: 300,
            overflow: "auto",
          }}
        >
          <Typography>תוכן פילטרים</Typography>
          {/* Add additional filter content here */}
        </Box>
      </Collapse>
    </Box>
  );
};

export default TableFilter;
