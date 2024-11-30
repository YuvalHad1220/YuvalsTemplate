import { FileFolder } from "../../hooks/useFileFolder";

const fileData: FileFolder = {
    id: "root",
    name: "מאגר תאונות",
    items: [
      {
        id: "1",
        name: "דו״חות תאונות דרכים",
        items: [
          {
            id: "1-1",
            title: "דו״ח תאונת דרכים 2023",
            downloadUrl: "#",
            type: "DOCUMENT",
          },
          {
            id: "1-2",
            title: "סטטיסטיקות תאונות 2022",
            downloadUrl: "#",
            type: "DOCUMENT",
          },
        ],
      },
      {
        id: "2",
        name: "תמונות מזירות תאונה",
        items: [
          {
            id: "2-1",
            title: "תאונה בכביש החוף",
            downloadUrl: "#",
            type: "PICTURE",
          },
          {
            id: "2-2",
            title: "תאונה בצומת מרכזי",
            downloadUrl: "#",
            type: "PICTURE",
          },
        ],
      },
      {
        id: "3",
        name: "חומרי הדרכה למניעת תאונות",
        items: [
          {
            id: "3-1",
            title: "מדריך בטיחות בדרכים",
            downloadUrl: "#",
            type: "DOCUMENT",
          },
          {
            id: "3-2",
            title: "תמונה: שלטי אזהרה בכבישים",
            downloadUrl: "#",
            type: "PICTURE",
          },
        ],
      },
      {
        id: "4",
        name: "תמונות פיקוח תנועה",
        items: [
          {
            id: "4-1",
            title: "תיעוד ממצלמות כביש",
            downloadUrl: "#",
            type: "PICTURE",
          },
          {
            id: "4-2",
            title: "צילום מזירת תאונה 1",
            downloadUrl: "#",
            type: "PICTURE",
          },
        ],
      },
      {
        id: "5",
        name: "פרויקטים להקטנת תאונות",
        items: [
          {
            id: "5-1",
            title: "מצגת: מיזם נתיבי בטיחות",
            downloadUrl: "#",
            type: "DOCUMENT",
          },
          {
            id: "5-2",
            title: "תמונה: התקנת פסי האטה",
            downloadUrl: "#",
            type: "PICTURE",
          },
        ],
      },
    ],
  };
  
  export const accidentsLoader = async () => {
    return fileData;
  };