import createDataContext from "./createDataContext";
import { firebase } from "../Firebase/index";
import artGenres from "../utils/artGenres";


const InformationReducers = (state, action) => {
    switch (action.type) {
        case "errorMessage":
            return { ...state, errorMessage: action.payload };
        case "createPublication":
            return { ...state, publications: [...publications, action.payload] };
        case "otherGetPublication":
            return {...state,otherPublications:action.payload}
        case "getPublication":
            return { ...state, publications: action.payload };
        case "morePublication":
            return {...state,morePublications:action.payload}
        case "deletePublication":
            return { ...state, publications: action.payload };
        case "getReportPublication":
        return {...state,  reportData: action.payload }
    }
};

// obtenemos la referencia de la coleccion donde estaran las publicaciones
const publicationsRef = firebase.firestore().collection("posts");

const createPublication = (dispatch) => (
    userNames,
    userIds,
    artworkInspiration,
    artworkMeaning,
    artworkGenre,
    publicationTimes,
    image
) => {
    
    const data = {
        userName:userNames,
        userId:userIds,
        artworkInspiration,
        artworkMeaning,
        artworkGenre,
        publicationTime: publicationTimes,
        image,
    };
     console.log(userNames,userIds,artworkGenre)
    publicationsRef
        .add({
            userName:userNames,
            userId:userIds,
            artworkInspiration,
            artworkMeaning,
            artworkGenre,
            publicationTime: publicationTimes,
            image,
        })
        .then((docRef) => {
            dispatch({ type: "errorMessage", payload: " added!" });
           console.log("se agrego")
        })
        .catch((error) => {
            dispatch({ type: "errorMessage", payload: error.message });
            console.log("Erro "+ error.message)
        });
};



const otherGetPublication = (dispatch) => (userId) => {
    publicationsRef
    .where("userId", "==", userId)
        .orderBy("publicationTime", "asc")
        .onSnapshot(
            (querySnapshot) => {
                const publications = [];

                querySnapshot.forEach((doc) => {
                    let publication = doc.data();
                    publication.id = doc.id;
                    publications.push(publication);
                    
                });
                dispatch({ type: "otherGetPublication", payload: publications });
                dispatch({ type: "errorMessage", payload: "datos obtenidos!" });
            },
            (error) => {
                dispatch({ type: "errorMessage", payload: error.message });
            }
        );
};

const getPublication = (dispatch) => (userId) => {
    publicationsRef
    .where("userId", "==", userId)
        .orderBy("publicationTime", "asc")
        .onSnapshot(
            (querySnapshot) => {
                const publications = [];

                querySnapshot.forEach((doc) => {
                    let publication = doc.data();
                    publication.id = doc.id;
                    publications.push(publication);
                });
                dispatch({ type: "getPublication", payload: publications });
                dispatch({ type: "errorMessage", payload: "Your pubication is save!" });
            },
            (error) => {
                dispatch({ type: "errorMessage", payload: error.message });
            }
        );
};


const getReportPublication = (dispatch) => () => {
    const reportPublicacion =[]
    for (let i; i<=artGenres.length; i++)
    {
    publicationsRef
     .where("artworkGenre","==",artGenres[i])
        .orderBy("publicationTime", "asc")
        .onSnapshot(
            (querySnapshot) => {
                const publications = [];

                querySnapshot.forEach((doc) => {
                    let publication = doc.data();
                    publication.id = doc.id;
                    publications.push(publication);
                });
                
                dispatch({ type: "errorMessage", payload: "datos numericos obtenidos!" });
            },
            (error) => {
                dispatch({ type: "errorMessage", payload: error.message });
            }
        );
    }
    dispatch({ type: "getReportPublication", payload: reportPublicacion });
};

const morePublication = (dispatch) => () => {
    publicationsRef

        .orderBy("publicationTime", "asc")
        .onSnapshot(
            (querySnapshot) => {
                const publications = [];

                querySnapshot.forEach((doc) => {
                    let publication = doc.data();
                    publication.id = doc.id;
                    publications.push(publication);
                });
                dispatch({ type: "morePublication", payload: publications });
                dispatch({ type: "errorMessage", payload: "Your pubication is save!" });
            },
            (error) => {
                dispatch({ type: "errorMessage", payload: error.message });
            }
        );
};



const deletePublication = (dispatch) => (publicationId) => {
    publicationsRef.doc(publicationId).delete().then(() => {
        dispatch({ type: "errorMessage", payload: "publication delete" })
    }).catch((error) => {
        dispatch({ type: "errorMessage", payload: error.message })
    })
}

const clearMessage = (dispatch) => () => {
    dispatch({ type: "errorMessage", payload: "" });
};

export const { Provider, Context } = createDataContext(
    InformationReducers,
    {
        createPublication,
        otherGetPublication,
        getPublication,
        morePublication,
        clearMessage,
        deletePublication,
        getReportPublication,

    },
    {
        publications: [],
        otherPublications:[],
        morePublications:[],
        errorMessage: "",
        currentPublications: {
            userName: "",
            aboutme:"",
            mystate:"",
            publicationTime: "",
            userId: "",
        },
        reportData:[],
    }
);
