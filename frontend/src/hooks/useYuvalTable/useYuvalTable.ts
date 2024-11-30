import { useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Table,
  getFilteredRowModel,
  createColumnHelper,
  FilterFn,
  FilterFnOption,
  SortingFnOption,
} from "@tanstack/react-table";
import { UseFormReturn, useForm, useWatch } from "react-hook-form";
import { ColumnDef } from "@tanstack/react-table";
import renderActionsColumn from "./renderActionsColumn";

export const formatDate = (date: Date): string =>
  date.toLocaleDateString("he-IL");

export const parseHebrewDate = (dateStr?: string): Date | null => {
  if (!dateStr) return null;

  // Handle format DD.MM.YY
  const parts = dateStr.split(".").map(Number);

  // If we do not get exactly 3 parts or any part is NaN, return null
  if (parts.length !== 3 || parts.some((part) => isNaN(part))) {
    return null;
  }

  const [day, month, year] = parts;
  // Check if day, month, and year are in valid ranges
  if (
    day < 1 ||
    day > 31 ||
    month < 1 ||
    month > 12 ||
    year < 0 ||
    year > 2099
  ) {
    return null;
  }
  // Assume 20xx for two-digit years
  const fullYear = year < 100 ? 2000 + year : year;
  // Try creating the Date and check if it is valid
  const parsedDate = new Date(fullYear, month - 1, day);

  if (isNaN(parsedDate.getTime())) {
    return null;
  }

  return parsedDate;
};

function generateDateFilterFn<TData>(
  oldFilterFn: FilterFnOption<TData> | undefined
) {
  if (typeof oldFilterFn === "string") return oldFilterFn;

  const newFilterFn: FilterFn<TData> = (
    row,
    columnId,
    filterValue,
    addMeta
  ) => {
    const newRowGetValue: typeof row.getValue = function <TValue>(
      columnId: string
    ): TValue {
      const data = row.getValue(columnId) as undefined | string;
      return (parseHebrewDate(data) ?? data) as TValue;
    };

    const modifedRow = {
      ...row,
      getValue: newRowGetValue,
    };

    if (!oldFilterFn) {
      const date = modifedRow.getValue(columnId) as Date;
      return date.getDate() === (filterValue as Date).getDate();
    }
    return oldFilterFn(modifedRow, columnId, filterValue, addMeta);
  };

  return newFilterFn;
}

function generateDateSortFn<TData>(
  oldSortFn: SortingFnOption<TData> | undefined
): SortingFnOption<TData> {
  if (typeof oldSortFn === "string") return oldSortFn;

  if (!oldSortFn) {
    return (rowA, rowB, columnId) => {
      const valueA = parseHebrewDate(rowA.getValue(columnId)) ?? new Date(0);
      const valueB = parseHebrewDate(rowB.getValue(columnId)) ?? new Date(0);

      if (valueA < valueB) return -1;
      if (valueA > valueB) return 1;
      return 0;
    };
  }

  return (rowA, rowB, columnId) => {
    const newRowAGetValue: typeof rowA.getValue = function <TValue>(
      columnId: string
    ): TValue {
      const data = rowA.getValue(columnId) as undefined | string;
      return (parseHebrewDate(data) ?? data) as TValue;
    };

    const newRowBGetValue: typeof rowB.getValue = function <TValue>(
      columnId: string
    ): TValue {
      const data = rowB.getValue(columnId) as undefined | string;
      return (parseHebrewDate(data) ?? data) as TValue;
    };

    const modifiedRowA = { ...rowA, getValue: newRowAGetValue };
    const modifiedRowB = { ...rowB, getValue: newRowBGetValue };

    return oldSortFn(modifiedRowA, modifiedRowB, columnId);
  };
}

export const createYuvalColumnHelper = <TData extends object>() => {
  const columnHelper = createColumnHelper<TData>();

  const dateAccessor = (
    dateKey: Parameters<typeof columnHelper.accessor>[0],
    column: Parameters<typeof columnHelper.accessor>[1]
  ) => {
    const dateKeyFn = (row: TData) =>
      formatDate(row[dateKey as keyof TData] as Date);
    const clonedColumnData = { ...column, id: dateKey as string };

    clonedColumnData.filterFn = generateDateFilterFn(clonedColumnData.filterFn);
    clonedColumnData.sortingFn = generateDateSortFn(clonedColumnData.sortingFn);

    if (clonedColumnData.cell) {
      if (typeof clonedColumnData.cell === "function") {
        const oldCell = clonedColumnData.cell;
        const newCell: typeof clonedColumnData.cell = (props) => {
          const newProps = {
            ...props,
            getValue: function getValue(): any {
              const data = props.getValue() as string | undefined;
              return parseHebrewDate(data) ?? data;
            },
          };
          return oldCell(newProps);
        };

        clonedColumnData.cell = newCell;
      }
    }
    return columnHelper.accessor(dateKeyFn, clonedColumnData);
  };

  return {
    ...columnHelper,
    dateAccessor,
  };
};

// Define the props type
interface UseYuvalTableProps<TData> {
  columns: ColumnDef<TData, any>[];
  data: TData[];
  rowId: string;
  onEdit?: (id: string) => void;
  onView?: (id: string) => void;
  onDelete?: (id: string) => void;
  onPrint?: (id: string) => void;
  defaultColumnFilters?: Record<string, any>;
}

// Hook: useYuvalTable with correct generic type syntax
function useYuvalTable<TData>(props: UseYuvalTableProps<TData>): {
  form: UseFormReturn;
  table: Table<TData>;
} {
  const {
    columns,
    data,
    rowId,
    onEdit,
    onDelete,
    onView,
    onPrint,
    defaultColumnFilters,
  } = props;

  const form = useForm({ defaultValues: defaultColumnFilters });
  const filterData = useWatch({ control: form.control });
  const columnFilters = useMemo(
    () =>
      Object.entries(filterData)
        .map(([key, value]) => ({
          id: key,
          value: value,
        }))
        .filter((item) => !!item.value),
    [filterData]
  );

  // Augment columns to handle date formatting automatically and include action buttons
  const processedColumns = useMemo(() => {
    const baseColumns = [...columns];
    if (onEdit || onDelete || onView || onPrint) {
      const actionsColumn = createColumnHelper<TData>().display({
        id: "actions",
        header: "פעולות",
        cell: (props) =>
          renderActionsColumn({
            onEdit,
            onView,
            onDelete,
            onPrint,
            rowId: props.row.id,
          }),
      });

      baseColumns.push(actionsColumn);
    }

    return baseColumns;
  }, [columns, onDelete, onView, onEdit, onPrint]);

  // Create table instance using react-table
  const table = useReactTable({
    data,
    columns: processedColumns,
    getRowId: (row) => row[rowId as keyof TData] as string,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  return { table, form };
}

export default useYuvalTable;
