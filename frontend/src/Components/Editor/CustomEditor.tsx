import React, { useRef } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  KeyBindingUtil,
  AtomicBlockUtils,
} from "draft-js";
import {
  IconButton,
  Tooltip,
  Paper,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import DeleteIcon from "@mui/icons-material/Delete";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import "draft-js/dist/Draft.css";
import { Image, ImageNotSupported } from "@mui/icons-material";

interface CustomEditorProps {
  editorState: EditorState;
  onChange: (editorState: EditorState) => void;
  onDelete: () => void;
  isEditMode: boolean;
}

const CustomEditor: React.FC<CustomEditorProps> = ({
  editorState,
  onChange,
  isEditMode,
  onDelete,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleKeyCommand = (command: string, editorState: EditorState) => {
    if (!isEditMode) return "not-handled";

    if (command === "bold") {
      onChange(RichUtils.toggleInlineStyle(editorState, "BOLD"));
      return "handled";
    }
    return "not-handled";
  };

  const keyBindingFn = (event: React.KeyboardEvent): string | null => {
    if (!isEditMode) return getDefaultKeyBinding(event);

    if (KeyBindingUtil.hasCommandModifier(event) && event.key === "b") {
      return "bold";
    }
    return getDefaultKeyBinding(event);
  };

  const toggleBold = () => {
    if (!isEditMode) return;
    onChange(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  };

  const addImage = (fileUrl: string) => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "IMAGE",
      "IMMUTABLE",
      { src: fileUrl }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = AtomicBlockUtils.insertAtomicBlock(
      EditorState.set(editorState, { currentContent: contentStateWithEntity }),
      entityKey,
      " "
    );
    onChange(newEditorState);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        addImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const background = (() => {
    const block = editorState
      .getCurrentContent()
      .getBlockMap()
      .find((t) => t?.getType() === "atomic");
    if (!block) return "";
    const entityKey = block.getEntityAt(0);
    const contentState = editorState.getCurrentContent();
    const entity = contentState.getEntity(entityKey);
    return `url('${entity.getData().src}') no-repeat center center`;
  })();

  return (
    <Paper
      elevation={12}
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          height: isEditMode ? "auto" : 0,
          overflow: "hidden",
          visibility: isEditMode ? "visible" : "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            px: 1,
            py: 0.5,
            gap: 1,
            background: "transparent",
          }}
        >
          <DragIndicatorIcon className="drag-handle" sx={{ cursor: "move" }} />
          <Tooltip title="מחק">
            <IconButton onClick={onDelete} size="small">
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="בולט">
            <IconButton onClick={toggleBold} size="small">
              <FormatBoldIcon />
            </IconButton>
          </Tooltip>

          {background ? (
            <Tooltip title="מחיקת תמונה">
              <IconButton onClick={triggerFileInput} size="small">
                <ImageNotSupported />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="העלאת תמונה">
              <IconButton onClick={triggerFileInput} size="small">
                <Image />
              </IconButton>
            </Tooltip>
          )}
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleImageUpload}
          />
        </Box>

        <Divider />
      </Box>

      <Box
        sx={{
          flex: 1,
          overflow: "auto",
          px: background ? 0 : 2,
          py: background ? 0 : isEditMode ? 1 : 2,
          "& .DraftEditor-root": {
            height: "100%",
            background,
            backgroundSize: "cover",
          },
          "& .public-DraftEditor-content": {
            cursor: isEditMode ? "text" : "default",
          },
        }}
      >
        <Editor
          editorState={editorState}
          onChange={onChange}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={keyBindingFn}
          readOnly={!isEditMode}
          blockRendererFn={(block) => {
            if (block.getType() === "atomic") {
              return {
                component: () => null,
                editable: false,
              };
            }
            return null;
          }}
        />
      </Box>
    </Paper>
  );
};

export default CustomEditor;
