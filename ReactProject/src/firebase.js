import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBaoXsNCsK-wkhY9mdakEdGbFLZrsWgI6k",
  authDomain: "radiokvit-bde2d.firebaseapp.com",
  databaseURL: "https://radiokvit-bde2d-default-rtdb.firebaseio.com/",
  projectId: "radiokvit-bde2d",
  storageBucket: "radiokvit-bde2d.firebasestorage.app",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const storage = getStorage(app);
