import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import Save from "@mui/icons-material/Save";
import Add from "@mui/icons-material/Add";
import { Box, Button } from "@mui/material";
import { useEditorGrid } from "../../hooks/useEditorGrid.ts";
import EditorLayout from "../../Components/Editor/EditorLayout.tsx";
import { useLoaderData } from "@tanstack/react-router";
import Navbar from "../../Components/Navbar.tsx";


const Dashboard = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  const data = useLoaderData({ from: "/" });
  useEffect(() => {
    console.log(data);
  }, [data]);
  const editorGrid = useEditorGrid({
    onSave(changes) {
      console.log(changes);
    },
  });

  return (
    <>
      <Navbar>
        <Box sx={{ display: "flex", gap: 2 }}>
          {isEditMode && (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={editorGrid.addNewEditor}
                startIcon={<Add />}
              >
                הוספת עורך
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  editorGrid.handleSave();
                  setIsEditMode(false);
                }}
                startIcon={<Save />}
              >
                שמירה
              </Button>
            </>
          )}

          {!isEditMode && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsEditMode(true)}
              startIcon={<EditIcon />}
            >
              עריכה
            </Button>
          )}
        </Box>
      </Navbar>
      <EditorLayout isEditMode={isEditMode} gridEditor={editorGrid} />
    </>
  );
};

export default Dashboard;
