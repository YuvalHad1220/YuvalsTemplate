import React from "react";
import ActionColumn from "../../Components/Table/helpers/ActionColumn";

// Define the type for the action callback functions
type ActionCallback = (id: string) => void;

// Define the type for the actions column props
interface ActionsColumnProps {
  onEdit?: ActionCallback;
  onView?: ActionCallback;
  onDelete?: ActionCallback;
  onPrint?: ActionCallback;
  rowId: string;
}

// Implement the renderActionsColumn function with proper typing
const renderActionsColumn = ({
  onEdit,
  onView,
  onDelete,
  onPrint,
  rowId
}: ActionsColumnProps): React.ReactNode => {
  return (
    <ActionColumn
      rowId={rowId}
      onEdit={onEdit}
      onView={onView}
      onDelete={onDelete}
      onPrint={onPrint}
    />
  );
};

export default renderActionsColumn;