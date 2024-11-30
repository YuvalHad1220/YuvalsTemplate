import { useState } from "react";
export interface FileItem {
  id: string;
  title: string;
  duration?: string;
  date?: Date;
  viewUrl?: string;
  downloadUrl: string;
  type: "VIDEO" | "DOCUMENT" | "PICTURE";
}

export interface FileFolder {
  id: string;
  name: string;
  items: (FileItem | FileFolder)[];
}

const filterVideoData = (
  folder: FileFolder,
  searchQuery: string
): FileFolder => {
  const query = searchQuery.toLowerCase();

  const filteredItems = folder.items
    .map((item) => {
      if ("items" in item) {
        const filteredSubFolder = filterVideoData(item, searchQuery);
        if (filteredSubFolder.items.length > 0) {
          return filteredSubFolder;
        }
      } else if (
        item.title.toLowerCase().includes(query) ||
        ("name" in folder && folder.name.toLowerCase().includes(query))
      ) {
        return item;
      }
      return null;
    })
    .filter(Boolean);

  return { ...folder, items: filteredItems as (FileItem | FileFolder)[] };
};

export const useFileFolder = (videoFolder: FileFolder) => {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredData = filterVideoData(videoFolder, searchQuery);

  return {
    searchQuery,
    setSearchQuery,
    filteredData,
  };
};
