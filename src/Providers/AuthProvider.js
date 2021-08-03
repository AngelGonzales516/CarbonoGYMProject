import React from 'react'
import createDataContext from "./createDataContext";
import { firebase } from "../Firebase/index";

const authReducer = (state, action) => {
  switch (action.type) {
    case "errorMessage":
      return { ...state, errorMessage: action.payload };
    case "signin":
      return { ...state, user: action.payload, loggedIn: true };
    case "signout":
      return { ...state, user: action.payload, loggedIn: false };
    case "persistLogin":
      return {
        ...state,
        user: action.payload.user,
        loggedIn: action.payload.loggedIn,
        loading: false,
      };
    case "signup":
      return {
        ...state,
        user: action.payload.user,
        registered: true,
      };
    case "recoverpassword":
      return { ...state, user: action.payload, recover: true }
    default:
      return state;
  }
}

const signin = (dispatch) => (email, password) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(((response) => {
      // Obtener el Unique Identifier generado para cada usuario
      // Firebase -> Authentication
      const uid = response.user.uid;

      // Obtener la colección desde Firebase
      const usersRef = firebase.firestore().collection("users");

      // Verificar que el usuario existe en Firebase authentication
      // y también está almacenado en la colección de usuarios.
      usersRef
        .doc(uid)
        .get()
        .then((firestoreDocument) => {
          if (!firestoreDocument.exists) {
            dispatch({
              type: "errorMessage",
              payload: "User does not exist in the database!",
            });
          } else {
            // Llamar el reducer y enviarle los valores del usuario al estado
            dispatch({ type: "errorMessage", payload: "" });
            dispatch({ type: "signin", payload: firestoreDocument.data() });
          }
        });
      console.log("se logueo correctamente")

    }))
    .catch((error) => {
      dispatch({ type: "errorMessage", payload: error.message });
    });
}

const persistLogin = (dispatch) => () => {
  const userRef = firebase.firestore().collection("users");

  // Si el usuario ya se ha autenticado previamente, retornar
  // la información del usuario, caso contrario,retonar un objeto vacío.
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      userRef
        .doc(user.uid)
        .get()
        .then((document) => {
          dispatch({
            type: "persistLogin",
            payload: { user: document.data(), loggedIn: true },
          });
        })
        .catch((error) => {
          dispatch({ type: "errorMessage", payload: error.message });
        });
    } else {
      dispatch({
        type: "persistLogin",
        payload: { user: {}, loggedIn: false },
      });
    }
  });
};

const signout = (dispatch) => () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      dispatch({ type: "signout", payload: {} });
    })
    .catch((error) => {
      dispatch({ type: "errorMessage", payload: error.message });
    });
};


const signup = (dispatch) => (
  fullname,
  email,
  password,
  profilePicture,
  perfileTime
) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((response) => {
      // Obtener el Unique Identifier generado para cada usuario
      // Firebase -> Authentication
      const uid = response.user.uid;

      // Construir el objeto que le enviaremos a la collección de "users"
      const data = {
        id: uid,
        email,
        fullname,
        image:profilePicture,
      };

      const dataPerfil = {
        userId: uid,
        userName:fullname,
        perfileTime,
        image:profilePicture,
        mystate:"Bienvenido",
        aboutme:"Bienvenido",
        edad:"20"
      }

      // Obtener la colección desde Firebase
      const usersRef = firebase.firestore().collection("users");
      const perfileRef = firebase.firestore().collection("perfile")
      // Almacenar la información del usuario que se registra en Firestore
      usersRef
        .doc(uid)
        .set(data)
        .then(() => {
          dispatch({
            type: "signup",
            payload: { user: data, registered: true },
          });
        })
        .catch(()=>{dispatch({ type: "errorMessage", payload: "Error en la creacion de cuenta" });}) 
       

        perfileRef
        .add(dataPerfil)
        .then((docRef) => {
            //dispatch({ type: "errorMessage", payload: " added!" });
            console.log("creada")
        })
        .catch(() => {
            dispatch({ type: "errorMessage", payload: "Error en crear perfil" });
        });

    }).catch ((error)=>{dispatch({ type: "errorMessage", payload: error.message });})
      
};


const forggotPassword = (dispatch) => (email) => {
  // const user = firebase.firestore("users")
  let auth = firebase.auth();
  let emailAddress = email;

  auth.sendPasswordResetEmail(emailAddress).then(() => {
    dispatch({
      type: 'recoverpassword', payload: {}
    })
  }).catch((error) => {
    dispatch({ type: "errorMessage", payload: error.message });
  });

}



const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "errorMessage", payload: "" });
};

export const { Provider, Context } = createDataContext(
  authReducer,
  {
    signin,
    signout,
    persistLogin,
    signup,
    clearErrorMessage,
    forggotPassword,
  },
  {
    user: {},
    errorMessage: "",
    loggedIn: false,
    loading: true,
    registered: false,
  }
);