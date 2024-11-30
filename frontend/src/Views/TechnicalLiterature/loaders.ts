import { FileFolder } from "../../hooks/useFileFolder";

const fileData: FileFolder = {
    id: "root",
    name: "מגפות פקטיביות שמאיימות על האנושות",
    items: [
      {
        id: "1",
        name: "המגפה השחורה החדשה",
        items: [
          {
            id: "1-1",
            title: "סקירה על המגפה השחורה החדשה",
            duration: "12:45",
            viewUrl: "#",
            downloadUrl: "#",
            type: "VIDEO",
            date: new Date(2022, 5, 10, 14, 20),
          },
          {
            id: "1-2",
            title: "התפשטות המגפה: ניתוח מפורט",
            duration: "22:30",
            viewUrl: "#",
            downloadUrl: "#",
            type: "VIDEO",
            date: new Date(2023, 8, 15, 16, 45),
          },
          {
            id: "1-3",
            title: "מדריך הישרדות במגפות גלובליות",
            downloadUrl: "#",
            type: "DOCUMENT",
            date: new Date(2022, 9, 22, 10, 0),
          },
          {
            id: "1-4",
            title: "תמונה של ההשפעות הפיזיולוגיות",
            downloadUrl: "#",
            type: "PICTURE",
            date: new Date(2023, 3, 12, 9, 30),
          },
        ],
      },
      {
        id: "2",
        name: "וירוס ה'כפור הכחול'",
        items: [
          {
            id: "2-1",
            title: "מהו הכפור הכחול?",
            duration: "18:20",
            viewUrl: "#",
            downloadUrl: "#",
            type: "VIDEO",
            date: new Date(2023, 2, 25, 11, 15),
          },
          {
            id: "2-2",
            title: "סימפטומים מוקדמים של הווירוס",
            duration: "25:50",
            viewUrl: "#",
            downloadUrl: "#",
            type: "VIDEO",
            date: new Date(2022, 10, 5, 14, 40),
          },
          {
            id: "2-3",
            title: "דוח מחקר: השפעות ביולוגיות",
            downloadUrl: "#",
            type: "DOCUMENT",
            date: new Date(2023, 5, 8, 13, 30),
          },
          {
            id: "2-4",
            title: "תמונת הקפאת התאים",
            downloadUrl: "#",
            type: "PICTURE",
            date: new Date(2022, 6, 20, 15, 20),
          },
        ],
      },
      {
        id: "3",
        name: "וירוס ה'צחוק הקטלני'",
        items: [
          {
            id: "3-1",
            title: "ההיסטוריה של הצחוק הקטלני",
            duration: "30:10",
            viewUrl: "#",
            downloadUrl: "#",
            type: "VIDEO",
            date: new Date(2024, 0, 5, 17, 15),
          },
          {
            id: "3-2",
            title: "דוח עדכני: מקרי התפרצות אחרונים",
            downloadUrl: "#",
            type: "DOCUMENT",
            date: new Date(2023, 7, 18, 8, 30),
          },
          {
            id: "3-3",
            title: "תמונה: השפעות פיזיולוגיות של הווירוס",
            downloadUrl: "#",
            type: "PICTURE",
            date: new Date(2022, 11, 12, 10, 50),
          },
        ],
      },
      {
        id: "4",
        name: "מחלות בלתי מוסברות",
        items: [
          {
            id: "4-1",
            title: "תסמונת החלום הבלתי נגמר",
            duration: "40:00",
            viewUrl: "#",
            downloadUrl: "#",
            type: "VIDEO",
            date: new Date(2023, 4, 10, 12, 15),
          },
          {
            id: "4-2",
            title: "המחלה שמשבשת את המציאות",
            duration: "15:45",
            viewUrl: "#",
            downloadUrl: "#",
            type: "VIDEO",
            date: new Date(2023, 1, 27, 14, 30),
          },
          {
            id: "4-3",
            title: "דוח מדעי: מחלות עם השפעות קוונטיות",
            downloadUrl: "#",
            type: "DOCUMENT",
            date: new Date(2023, 6, 22, 11, 0),
          },
          {
            id: "4-4",
            title: "תמונה: סדקים במבנה המולקולרי",
            downloadUrl: "#",
            type: "PICTURE",
            date: new Date(2022, 8, 5, 16, 40),
          },
        ],
      },
      {
        id: "5",
        name: "אפוקליפסה של מחלות",
        items: [
          {
            id: "5-1",
            title: "הווירוס המוחי: סוף החשיבה האנושית",
            duration: "28:35",
            viewUrl: "#",
            downloadUrl: "#",
            type: "VIDEO",
            date: new Date(2024, 3, 8, 14, 15),
          },
          {
            id: "5-2",
            title: "תסמונת הזמן המהופך: חזרה אחורה בזמן",
            duration: "19:15",
            viewUrl: "#",
            downloadUrl: "#",
            type: "VIDEO",
            date: new Date(2023, 9, 18, 10, 30),
          },
          {
            id: "5-3",
            title: "מדריך: הישרדות מול מחלות לא מוכרות",
            downloadUrl: "#",
            type: "DOCUMENT",
            date: new Date(2022, 11, 25, 18, 20),
          },
          {
            id: "5-4",
            title: "תמונה: עולמות שקרסו ממחלות",
            downloadUrl: "#",
            type: "PICTURE",
            date: new Date(2022, 4, 14, 9, 10),
          },
        ],
      },
    ],
  };
  

export const techincalLiteratureLoader = async () => {
  return fileData;
}