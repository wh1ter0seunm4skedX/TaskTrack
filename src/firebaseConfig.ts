import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBc3RBtqk0jRKvrAuIHNfguDBZasEreRgQ",
    authDomain: "tasktrack-4d529.firebaseapp.com",
    projectId: "tasktrack-4d529",
    storageBucket: "tasktrack-4d529.appspot.com",
    messagingSenderId: "688660059828",
    appId: "1:688660059828:web:be1e5de089bc3bd9c4a9e1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
