import React, { useState, useEffect } from "react";
import GridLayout from "react-grid-layout";
import { Paper, useTheme } from "@mui/material";
import CustomEditor from "./CustomEditor";
import SouthEastIcon from "@mui/icons-material/SouthEastRounded"; // Import custom icon
import useDrawerWidth from "../../hooks/useDrawerWidth";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "./editorCss.css"
interface EditorLayoutProps {
  isEditMode?: boolean;
  gridEditor: {
    editors: any[];
    layout: any[];
    onEditorChange: (index: number, newState: any) => void;
    onLayoutChange: (layout: any[]) => void;
    onDelete: (index: number) => void;
  };
}

const EditorLayout: React.FC<EditorLayoutProps> = ({
  isEditMode = false,
  gridEditor,
}) => {
  const [containerWidth, setContainerWidth] = useState<number>(
    window.innerWidth
  );
  const { drawerWidth } = useDrawerWidth();
  const { editors, layout, onEditorChange, onLayoutChange, onDelete } =
    gridEditor;

  const theme = useTheme();

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
      <style>
        {`.react-grid-item.react-grid-placeholder {
          background: ${theme.palette.secondary.dark};
          border-radius: ${theme.shape.borderRadius}px;
        }

        `}
      </style>
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={30.5}
        width={containerWidth - 32 - drawerWidth} // Subtract the padding (16px * 2 = 32px)
        containerPadding={[0, 0]} // Since we're using Box padding, set this to 0
        margin={[16, 16]} // Sets horizontal and vertical spacing between items
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
              position: "relative",
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
            {/* Custom Resize Handle */}
            {isEditMode && (
              <div
                className="react-resizable-handle"
                style={{
                  position: "absolute",
                  bottom: 2,
                  right: 2,
                }}
              >
                <SouthEastIcon sx={{fontSize: "18px"}}/>
              </div>
            )}
          </Paper>
        ))}
      </GridLayout>
    </div>
  );
};

export default EditorLayout;
