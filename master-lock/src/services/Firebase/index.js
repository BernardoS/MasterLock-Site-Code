// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

export const logarUsuario = async (email,senha) =>{

    const auth = getAuth(firebaseApp);

    try {
        const response  = await signInWithEmailAndPassword(auth, email, senha);
        const user = response.user;
        return user;
    } catch (error) {
        //const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        return null;
    }
}


