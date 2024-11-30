import { Table as MuiTable, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, alpha, useTheme } from "@mui/material"
import { Table, flexRender } from "@tanstack/react-table"

type CustomTableProps = {
    table: Table<any>
}
const CustomTable: React.FC<CustomTableProps> = ({table}) => {
    const theme = useTheme();
    return (
        <TableContainer
        sx={{
          width: "80%",
          mx: "auto",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          background: theme.palette.background.paper,
          borderRadius: 2,
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <MuiTable size="small" stickyHeader>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell
                    key={header.id}
                    sx={{
                      fontWeight: 600,
                      textAlign: "center",
                    }}
                  >
                    {header.column.getCanSort() ? (
                      <TableSortLabel
                        active={!!header.column.getIsSorted()}
                        direction={
                          header.column.getIsSorted() === "asc" ? "asc" : "desc"
                        }
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </TableSortLabel>
                    ) : (
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
  
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{
                  "&:hover": {
                    background: alpha(theme.palette.primary.main, 0.06),
                  },
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} sx={{ py: 2}}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
        <TablePagination
          rowsPerPageOptions={[10, 20, 50]}
          component="div"
          count={table.getPrePaginationRowModel().rows.length}
          labelRowsPerPage="מספר שורות לעמוד:"
          labelDisplayedRows={({ from, to, count }) =>
            `מציג ${from}-${to} מתוך ${count !== -1 ? count : `יותר מ-${to}`}`
          }
          rowsPerPage={table.getState().pagination.pageSize}
          page={table.getState().pagination.pageIndex}
          onPageChange={(_, newPage) => table.setPageIndex(newPage)}
          onRowsPerPageChange={(event) =>
            table.setPageSize(Number(event.target.value))
          }
        />
      </TableContainer>
    )
}

export default CustomTable;