import firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";
import getEnvVars from "../../enviroment";

const {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
} = getEnvVars();

const firebaseConfig = {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
};

//verificar si se inicializa una app con firebase
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

export { firebase };