import React, { useMemo } from "react";
import { Box } from "@mui/material";
import Navbar from "../../Components/Navbar";
import useYuvalTable, {
  createYuvalColumnHelper,
} from "../../hooks/useYuvalTable/useYuvalTable";
import { useLoaderData } from "@tanstack/react-router";
import CustomTable from "../../Components/Table/CustomTable";
import TableFilter from "../../Components/Table/TableFilter";
import { Inspection } from "./loaders";


// Component
const DataGrid: React.FC = () => {
  const data = useLoaderData({ from: "/reports" });

  // Create the column helper with the `Inspection` type
  const columnHelper = createYuvalColumnHelper<Inspection>();

  // Define Columns using columnHelper
  const columns = useMemo(
    () => [
      columnHelper.accessor("investigationNumber", {
        header: "מספר תחקיר",
      }),
      columnHelper.accessor("examinerName", {
        header: "שם הבוחן",
      }),
      columnHelper.accessor("firstName", {
        header: "שם פרטי",
      }),
      columnHelper.accessor("lastName", {
        header: "שם משפחה",
      }),
      columnHelper.accessor("phoneNumber", {
        header: "מספר טלפון",
      }),
      columnHelper.accessor("faxNumber", {
        header: "מספר פקס",
      }),
      columnHelper.accessor("unit", {
        header: "יחידה",
      }),
      columnHelper.accessor("idNumber", {
        header: "צ'",
      }),
      columnHelper.accessor("status", {
        id: "status",
        header: "סטטוס",
        cell: (info) => {
          const statusColors = {
            "פעיל": "green",
            "מושעה": "red",
          };
          const status = info.getValue() as keyof typeof statusColors;
          return (
            <Box
              sx={{
                backgroundColor: statusColors[status] || "grey",
                color: "white",
                borderRadius: 1,
                px: 1,
                py: 0.5,
                display: "inline-block",
                fontWeight: "bold",
              }}
            >
              {status}
            </Box>
          );
        },
      }),
      columnHelper.dateAccessor("inspectionDate", {
        header: "תאריך הבדיקה",
      }),
      columnHelper.dateAccessor("nextInspectionDate", {
        header: "תאריך הבדיקה הבאה",
      }),
    ],
    []
  );


  // Table Configuration
  const { table, form } = useYuvalTable({
    data,
    columns: columns,
    rowId: "investigationNumber", // Updated to match the English key
    onEdit: console.log,
    onPrint: console.log,
  });
  return (
    <Box sx={{ height: "100%" }}>
      <Navbar />
      <TableFilter table={table} />
      <CustomTable table={table} />
    </Box>
  );
};

export default DataGrid;
