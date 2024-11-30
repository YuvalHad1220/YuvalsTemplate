import React, { useMemo } from "react";
import { Box } from "@mui/material";
import Navbar from "../../Components/Navbar";
import useYuvalTable, {
  createYuvalColumnHelper,
} from "../../hooks/useYuvalTable/useYuvalTable";
import { useLoaderData } from "@tanstack/react-router";
import CustomTable from "../../Components/Table/CustomTable";
import TableFilter from "../../Components/Table/TableFilter";

// Loader function
export const reportsLoader = async () => {
  const data: Inspection[] = [
    {
      investigationNumber: 1001,
      examinerName: "אחמד חסן",
      firstName: "אחמד",
      lastName: "חסן",
      phoneNumber: "050-1234567",
      faxNumber: "03-9876543",
      unit: "יחידת בקרה",
      idNumber: "צ-123456",
      status: "פעיל",
      inspectionDate: new Date("2024-01-15"),
      nextInspectionDate: new Date("2024-07-15"),
    },
    {
      investigationNumber: 1002,
      examinerName: "שרה לוי",
      firstName: "שרה",
      lastName: "לוי",
      phoneNumber: "052-7654321",
      faxNumber: "02-5432167",
      unit: "יחידת איכות",
      idNumber: "צ-654321",
      status: "מושעה",
      inspectionDate: new Date("2024-02-20"),
      nextInspectionDate: new Date("2024-08-20"),
    },
    {
      investigationNumber: 1003,
      examinerName: "מוחמד אבו",
      firstName: "מוחמד",
      lastName: "אבו",
      phoneNumber: "054-9876543",
      faxNumber: "04-1234567",
      unit: "יחידת פיקוח",
      idNumber: "צ-789012",
      status: "פעיל",
      inspectionDate: new Date("2024-03-10"),
      nextInspectionDate: new Date("2024-09-10"),
    },
    // Add more records as needed...
  ];

  return data;
};

// Data Type
type Inspection = {
  investigationNumber: number;
  examinerName: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  faxNumber: string;
  unit: string;
  idNumber: string;
  status: string;
  inspectionDate: Date;
  nextInspectionDate: Date;
};

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
