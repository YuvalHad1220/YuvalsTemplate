import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";

export interface FileFolderContextType {
    closedItems: string[];
    setClosedItems: Dispatch<SetStateAction<string[]>>;
  }
  

const FileFolderContext = createContext<FileFolderContextType | undefined>(undefined);

export const FileFolderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [closedItems, setClosedItems] = useState<string[]>([]);

  return (
    <FileFolderContext.Provider value={{ closedItems, setClosedItems }}>
      {children}
    </FileFolderContext.Provider>
  );
};

export const useFileFolderContext = () => {
  const context = useContext(FileFolderContext);
  if (context === undefined) {
    throw new Error('useFileFolderContext must be used within a FileFolderProvider');
  }
  return context;
};