import { initializeApp } from "firebase/app";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDE0e5zgs-Sh1j7u8NDWNquDOMyC5SGb2M",
  authDomain: "react-native-for-designers.firebaseapp.com",
  databaseURL: "https://react-native-for-designers.firebaseapp.com",
  storageBucket: "react-native-for-designers.appspot.com",
};

const firebase = initializeApp(firebaseConfig);

export default firebase;
