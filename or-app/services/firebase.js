import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { API_KEY } from "./config";

  const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: "uw-anesthesiology-app.firebaseapp.com",
    projectId: "uw-anesthesiology-app",
    storageBucket: "uw-anesthesiology-app.appspot.com",
    messagingSenderId: "214251480359",
    appId: "1:214251480359:web:c56c4c97bf0f98f23db502",
    measurementId: "G-Y13V44ZWWP"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  export { db };
