import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyAuCRZTuKpTS_wu6xyTLLnlArMfjh7u89Q",
    authDomain: "netflix-clone-2022-34bdb.firebaseapp.com",
    projectId: "netflix-clone-2022-34bdb",
    storageBucket: "netflix-clone-2022-34bdb.appspot.com",
    messagingSenderId: "383027494819",
    appId: "1:383027494819:web:3b0b548e0cf9f7591be416",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { auth };
export default db;
