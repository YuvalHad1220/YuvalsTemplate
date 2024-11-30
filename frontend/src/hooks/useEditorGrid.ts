import { useState, useCallback, useEffect } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Layout } from 'react-grid-layout';

export interface LayoutItem extends Layout {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
}
export interface EditorChange {
  editorId: string;
  content: string; // serialized editor content
}
interface UseEditorGridProps {
  initialEditors?: EditorState[];
  initialLayout?: LayoutItem[];
  onEditorChange?: (index: number, newState: EditorState) => void;
  onLayoutChange?: (newLayout: Layout[]) => void;
  onSave?: (changes: {
    updatedEditorsContent: EditorChange[];
    updatedGrid: LayoutItem[];
  }) => void;
}

export interface UseEditorGridReturn {
  editors: EditorState[];
  layout: LayoutItem[];
  onEditorChange: (index: number, newState: EditorState) => void;
  onLayoutChange: (newLayout: Layout[]) => void;
  addNewEditor: () => void;
  handleSave: () => void
  onDelete: (index: number) => void
}


export const useEditorGrid = ({
  initialEditors = [EditorState.createEmpty()],
  initialLayout = [{ i: "editor1", x: 0, y: 0, w: 4, h: 8 }],
  onSave,
}: UseEditorGridProps = {}): UseEditorGridReturn => {
  const [editors, setEditors] = useState<EditorState[]>(initialEditors);
  const [layout, setLayout] = useState<LayoutItem[]>(initialLayout);

  const onEditorChange = useCallback((index: number, newState: EditorState): void => {
    setEditors(prev => prev.map((state, i) => (i === index ? newState : state)));
  }, []);

  const onLayoutChange = useCallback((newLayout: Layout[]): void => {
    setLayout(newLayout as LayoutItem[]);
  }, []);

  // Add delete handler
  const onDelete = useCallback((index: number): void => {
    // Remove editor
    setEditors(prev => prev.filter((_, i) => i !== index));
    
    // Remove from layout and update remaining indices
    setLayout(prev => {
      const newLayout = prev.filter((_, i) => i !== index);
      // Update the remaining items' 'i' property to match new indices
      return newLayout.map((item, i) => ({
        ...item,
        i: `editor${i + 1}`
      }));
    });
  }, []);

  const addNewEditor = useCallback((): void => {
    setEditors(prev => [...prev, EditorState.createEmpty()]);
    
    const newIndex = layout.length + 1;
    const newLayoutItem: LayoutItem = {
      i: `editor${newIndex}`,
      x: (layout.length * 4) % 12,
      y: Math.floor((layout.length * 4) / 12) * 8,
      w: 4,
      h: 8
    };
    
    setLayout(prev => [...prev, newLayoutItem]);
  }, [layout.length]);

  const handleSave = useCallback(() => {
    if (!onSave) return;

    const changes: EditorChange[] = editors.map((editor, index) => ({
      editorId: `editor${index + 1}`,
      content: JSON.stringify(convertToRaw(editor.getCurrentContent())),
    }));

    onSave({
      updatedEditorsContent: changes,
      updatedGrid: layout,
    });
  }, [editors, layout, onSave]);

  return {
    editors,
    layout,
    onEditorChange,
    onLayoutChange,
    onDelete, // Add this to the return object
    addNewEditor,
    handleSave,
  };
};