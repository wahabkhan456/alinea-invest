import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAcFSa5Xt7efEhQuGz2MHqjxFqYo5rQHnw",
    authDomain: "stock-api-9666b.firebaseapp.com",
    projectId: "stock-api-9666b",
    storageBucket: "stock-api-9666b.appspot.com",
    messagingSenderId: "814020917428",
    appId: "1:814020917428:web:6da4896372eff25b9c7fe1"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider(); 

const googleSignin = async _ => {
    try {
        await firebase.auth().signInWithPopup(provider);

    } catch(err) {
        console.log(err);
    }
}

export { googleSignin, auth }