import { FileFolder } from "../../hooks/useFileFolder";

const fileData: FileFolder = {
    id: "root",
    name: "ספריית וידאו",
    items: [
      {
        id: "1",
        name: "מדריכי React",
        items: [
          {
            id: "1-1",
            title: "מבוא ל-React",
            duration: "10:30",
            viewUrl: "#",
            downloadUrl: "#",
            type: "VIDEO",
            date: new Date(2023, 3, 10, 15, 30),
          },
          {
            id: "1-2",
            title: "צלילה עמוקה ל-Hooks ב-React",
            duration: "15:45",
            viewUrl: "#",
            downloadUrl: "#",
            type: "VIDEO",
            date: new Date(2022, 8, 5, 12, 20),
          },
        ],
      },
      {
        id: "2",
        name: "סדרת TypeScript",
        items: [
          {
            id: "2-1",
            title: "יסודות TypeScript",
            duration: "12:20",
            viewUrl: "#",
            downloadUrl: "#",
            type: "VIDEO",
            date: new Date(2024, 0, 22, 9, 15),
          },
          {
            id: "2-2",
            title: "טכניקות מתקדמות ב-TypeScript",
            duration: "20:15",
            viewUrl: "#",
            downloadUrl: "#",
            type: "VIDEO",
            date: new Date(2023, 5, 14, 17, 45),
          },
        ],
      },
      {
        id: "3",
        title: "קורס מהיר על Next.js",
        duration: "18:50",
        viewUrl: "#",
        downloadUrl: "#",
        type: "VIDEO",
        date: new Date(2023, 2, 10, 14, 0),
      },
      {
        id: "4",
        name: "מדריכי תוכנה נוספים",
        items: [
          {
            id: "4-1",
            title: "מבוא ל-Python",
            duration: "25:00",
            viewUrl: "#",
            downloadUrl: "#",
            type: "VIDEO",
            date: new Date(2022, 11, 20, 10, 45),
          },
          {
            id: "4-2",
            title: "מצגת על Node.js",
            downloadUrl: "#",
            type: "DOCUMENT",
            date: new Date(2023, 6, 5, 11, 30),
          },
        ],
      },
    ],
  };
  
  export const videoLoader = async () => {
    return fileData;
  };