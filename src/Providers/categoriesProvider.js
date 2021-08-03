import createDataContext from "./createDataContext";
import { firebase } from "../Firebase/index";

const categoriesReducer = (state, action) => {
    switch (action.type) {
        case "searchUser":
            return { ...state, errorMessage: action.payload };
            break;
        default:
            break;
    }
};

const categoriesRef = firebase.firestore().collection("artGenres");

const getAllCategories = (dispatch) => () => {
    categoriesRef
        .orderBy("artGenres", "asc")
        .onSnapshot(
            (querySnapshot) => {
                console.log(querySnapshot);
                dispatch({ type: "getAllCategories", payload: querySnapshot });
                dispatch({ type: "errorMessage", payload: "Here all your categories" })
            },
            (error) => {
                dispatch({ type: "errorMessage", payload: error.message });
            }
        );
};

export const { Provider, Context } = createDataContext(
    categoriesReducer,
    {
        getAllCategories,
    },
    {
        categories: [],
        errorMessage: "",
    }
);