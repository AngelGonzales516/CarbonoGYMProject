import createDataContext from "./createDataContext";
import { firebase } from "../Firebase/index";

const perfileReducers = (state, action) => {
    switch (action.type) {
        case "errorMessage":
            return { ...state, errorMessage: action.payload };
        case "createPerfil":
            return { ...state, perfiles: [...perfiles, action.payload] };
        case "otherGetPerfile":
            return {...state,  otherPerfiles: action.payload}
        case "getPerfile":
            return { ...state, perfiles: action.payload }
        case "currentPerfile":
        return {...state,currentPerfile:action.payload}
        case "currentIdPerfile":
        return {...state,currentIdPerfile:action.payload}
        case "updatePerfile":
        return {...state, perfiles: state.perfiles.map((perfile)=>{
            if (perfile.id === action.payload.perfil.id){
                return {
                    ...perfile,
                    userId : action.payload.perfil.userId,
                    userName : action.payload.perfil.userName,
                    aboutme : action.payload.perfil.aboutme,
                    mystate: action.payload.perfil.mystate,
                    edad : action.payload.perfil.edad
                }
            }
        })}
    }
}
const perfileRef = firebase.firestore().collection("perfile")
const createPerfile = (dispatch) => (userId, userName,perfileTime, image, aboutme, mystate, edad) => {
    const data = {
        userId,
        userName,
        perfileTime,
        image,
        aboutme,
        mystate,
        edad
    }

    perfileRef
        .add(data)
        .then((docRef) => {
            dispatch({ type: "errorMessage", payload: " added!" });
        })
        .catch((error) => {
            dispatch({ type: "errorMessage", payload: error.message });
        });

}

const otherGetPerfile = (dispatch) => (userId) => {
    perfileRef
        .where("userId", "==", userId)
        .orderBy("perfileTime","desc")
        .onSnapshot((querySnapshot) => {
            const perfiles = []

            querySnapshot.forEach((doc) => {
                let perfile = doc.data()
                perfile.id = doc.id
                perfiles.push(perfile)
            })
            dispatch({ type: "otherGetPerfile", payload: perfiles })
            dispatch({ type: "errorMessage", payload: "Your pubication is save!" });
        },
            (error) => {
                dispatch({ type: "errorMessage", payload: error.message });
            })

}


const getPerfile = (dispatch) => (userId) => {
    perfileRef
        .where("userId", "==", userId)
        .orderBy("perfileTime","desc")
        .onSnapshot((querySnapshot) => {
            const perfiles = []

            querySnapshot.forEach((doc) => {
                let perfile = doc.data()
                perfile.id = doc.id
                perfiles.push(perfile)
            })
            dispatch({ type: "getPerfile", payload: perfiles })
            dispatch({ type: "errorMessage", payload: "datos de perfil traidos exitosamente" });
        },
            (error) => {
                dispatch({ type: "errorMessage", payload: error.message });
            })

}

const updatePerfile = (dispatch) =>(userId ,userName, perfileTime, image ,aboutme, mystate, edad) =>{

    perfileRef
    .where("userId", "==", userId)
    .orderBy("perfileTime","desc")
    .onSnapshot((querySnapshot) => {
       

        querySnapshot.forEach((doc) => {
            const id =  doc.id
          perfileRef
          .doc(doc.id)
          .update ({userName , perfileTime, image,aboutme, mystate, edad}).then (()=>{
            dispatch({ type: "updatePerfile", 
            payload:{ perfil: { id , userId , userName , perfileTime,image , aboutme, mystate, edad}}  })
            dispatch({ type: "errorMessage", payload: "Your perfile is save!" });
          })
        })
       
    },
        (error) => {
            dispatch({ type: "errorMessage", payload: error.message });
        })

}

    const setCurrentPerfil = (dispatch) =>(perfil) =>{
        dispatch({type:"currentPerfile", payload:perfil})
    }
    const setCurrentIdPerfil = (dispatch) =>(idPerfil) =>{
        dispatch({type:"currentIdPerfile", payload:idPerfil})
    }

export const { Provider, Context } = createDataContext(
    perfileReducers, {
    createPerfile,
    otherGetPerfile,
    getPerfile,
    updatePerfile,
    setCurrentPerfil,
    setCurrentIdPerfil  
}, {
    perfiles:[],
    otherPerfiles:[],
    errorMessage: "",
    currentPerfile :{ id: "" ,userId:"",userName:"" ,  mystate:"",perfileTime:"",image:"", aboutme:"", edad:""},
    currentIdPerfile : ""
}
)