import createDataContext from "./createDataContext";
import { firebase } from "../Firebase/index";

const likeReducers = (state, action) => {
    switch (action.type) {
        case "errorMessage":
            return { ...state, errorMessage: action.payload };
        case "createLike":
            return { ...state, likes: [...likes, action.payload] };
        case "getlike":
            return { ...state, likes: action.payload };
        case "deletelike":
            return { ...state,likes:action.payload};

        /*  case "updatelike":
                  return{
                      ...state,
                      like:state.like.map((publication)=>{
                          if (publication.id=== action.payload.publication.id)
                         return {
                              ...like,
                              
                          }
                      })*/
    }
};

const likeRef = firebase.firestore().collection("likes");
const createLike = (dispatch) => (
    userName,
    artWorkGenre,
    artWorkInspiration,
    artWorkMeaning,
    image,
    userId,
    publicationTime,
    publicationId
) => {
    const data = {
        userName,
        artWorkGenre,
        artWorkInspiration,
        artWorkMeaning,
        image,
        userId,
        publicationTime,
        publicationId,
    };
    likeRef
    .add(data)
    .then((docRef) => {
        dispatch({ type: "errorMessage", payload: " added!" });
    })
    .catch((error) => {
        dispatch({ type: "errorMessage", payload: error.message });
    });
}

const getlike = (dispatch) => (userId) => {
    likeRef
        .where("userId", "==", userId)
        .onSnapshot(
            (querySnapshot) => {
                const likes = [];

                querySnapshot.forEach((doc) => {
                    let like = doc.data();
                    like.id = doc.id;
                    likes.push(like);
                });
                console.log(likes)
                dispatch({ type: "getlike", payload: likes });
                dispatch({ type: "errorMessage", payload: "Your like is save!" });
            },
            (error) => {
                dispatch({ type: "errorMessage", payload: error.message });
            }
        );
};

const deleteLike =(dispatch)=>(publicationId)=>{
    likeRef.doc(publicationId) 
    .delete().then(()=>{
        dispatch({type:"errorMessage",payload:"Like delete"})
    }).catch((error)=>{
        dispatch({type:"errorMessage",payload:error.message})
    })
}

const clearMessage = (dispatch) => () => {
    dispatch({ type: "errorMessage", payload: "" });
};

export const { Provider, Context } = createDataContext(
    likeReducers,
    {
        clearMessage,
        createLike,
        getlike,
        deleteLike,
        // updatePublication,
    },
    {
        likes: [],
        errorMessage: "",
        currentLikes: {
            userName: "",
            artWorkName: "",
            artWorkGenre: "",
            artWorkMeaning: "",
            artWorkInspiration: "",
            publicationTime: "",
            userId: "",
            publicationId: "",
        },
    }
);
