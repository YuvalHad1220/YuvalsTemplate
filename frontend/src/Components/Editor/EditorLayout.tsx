import React, { useState, useEffect } from "react";
import GridLayout from "react-grid-layout";
import { Button, Paper, Box, IconButton, useTheme, useMediaQuery } from "@mui/material";
import CustomEditor from "./CustomEditor";
// import { useEditorGrid, LayoutItem } from './hooks/useEditorGrid';

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import {
  UseEditorGridReturn,
} from "../../hooks/useEditorGrid";
import useDrawerWidth from "../../hooks/useDrawerWidth";

interface EditorLayoutProps {
  isEditMode?: boolean;
  gridEditor: UseEditorGridReturn;
}

const EditorLayout: React.FC<EditorLayoutProps> = ({
  isEditMode = false,
  gridEditor,
}) => {
  const [containerWidth, setContainerWidth] = useState<number>(
    window.innerWidth
  );

  const {drawerWidth} = useDrawerWidth();
  
  const { editors, layout, onEditorChange, onLayoutChange, onDelete } =
    gridEditor;

  // Handle window resize
  useEffect(() => {
    const updateWidth = (): void => {
      setContainerWidth(document.body.clientWidth);
    };

    window.addEventListener("resize", updateWidth);
    updateWidth();

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  return (
      <div dir="ltr" style={{ padding: 16 }}>
        <GridLayout
          className="layout"
          layout={layout}
          cols={12}
          rowHeight={30.5}
          draggableHandle=".drag-handle"
          width={containerWidth - 32 - drawerWidth} // Subtract the padding (16px * 2 = 32px)
          containerPadding={[0, 0]} // Since we're using Box padding, set this to 0
          margin={[16, 16]} // This sets horizontal and vertical spacing between items to 2 (16px)
          onLayoutChange={onLayoutChange}
          isDraggable={isEditMode}
          isResizable={isEditMode}
        >
          {editors.map((editorState, index) => (
            <Paper
              key={`editor${index + 1}`}
              elevation={3}
              sx={{
                height: "100%",
                overflow: "hidden",
                "& .DraftEditor-root": {
                  height: "100%",
                },
              }}
            >
              <CustomEditor
                isEditMode={isEditMode}
                editorState={editorState}
                onDelete={() => onDelete(index)}
                onChange={(newState) => onEditorChange(index, newState)}
              />
            </Paper>
          ))}
        </GridLayout>
      </div>
  );
};

export default EditorLayout;
