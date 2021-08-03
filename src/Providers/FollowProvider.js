import createDataContext from "./createDataContext";
import { firebase } from "../Firebase/index";

const FollowReducer = (state, action) => {
    switch (action.type) {
        case "errorMessage": {
            return { ...state, errorMessage: action.payload }
        }
        case "createFollow":
            return { ...state, Follow: [...Follow, action.payload],Toogle: true }

        case "updateFollow": {
            return {
                ...state, Follow: state.Follow.map((Followerss) => {
                    if (Followerss.id === action.payload.Follow.id) {
                        return {
                            ...Followerss,
                            userId: action.payload.Follow.userId,
                            FollowTime: action.payload.Follow.FollowTime,
                            Followers: action.payload.Follow.Followers
                        }
                    }
                }), Toogle: true
            }
        }

        case "deleteFollow": {
            return { ...state, Follow: action.payload, Toogle: false }
        }
        case "getFollow": {
            return {...state,Follow:action.payload,Toogle:action.payload.Toogle}
        }
    }
}

const FollowRef = firebase.firestore().collection("Followers")
const updateFollow = (dispatch) => (userId, FollowTime) => {
    const Followers = [userId]
    const data = {
        userId,
        FollowTime,
        Followers,
    }

    FollowRef
        .where("userId", "==", userId)
        .orderBy("FollowTime", "desc")
        .onSnapshot((querySnapshot) => {

            querySnapshot.forEach((doc) => {
                const id = doc.id
                FollowRef
                    .doc(doc.id)
                    .update({
                        Followers: firebase.firestore.FieldValue.arrayUnion(userId)
                    }).then(() => {

                        FollowRef
                            .where("userId", "==", userId)
                            .orderBy("FollowTime", "desc")
                            .onSnapshot((querySnapshot) => {
                                const Follows = []


                                querySnapshot.forEach((doc) => {
                                    let Follow = doc.data()
                                    Follow.id = doc.id
                                    Follows.push(Follow)
                                })
                                const Followersss = Follows[0].Followers
                                dispatch({
                                    type: "updateFollow",
                                    payload: { Follow: { userId, FollowTime, Followersss } },
                                })
                                dispatch({ type: "errorMessage", payload: "Your perfile is save!" });
                               

                            },
                                
                            )



                    })

            })



        }).catch(() => {
            FollowRef
                .add(data)
                .then(() => {
                    dispatch({
                        type: 'errorMessage', payload: "Guardado exitosamente"
                    })
                    dispatch({
                        type: "updateFollow",
                        payload: { Follow: { userId, FollowTime, Followers } },
                    })
                })
        })



}

const getFollow = (dispatch) => (userId) => {

    FollowRef
        .where("userId", "==", userId)
        .orderBy("FollowTime", "desc")
        .onSnapshot((querySnapshot) => {
            const Follows = []

            querySnapshot.forEach((doc) => {
                let Follow = doc.data()
                Follow.id = doc.id
                Follows.push(Follow)
            })
          const getT = Follows[0].Followers
          const valor = getT.length
            dispatch({
                type: "getFollow",
                payload: Follows,
                Toogle: (valor)? true: false
            })
            dispatch({
                type: "errorMessage",
                payload: "Your pubication is save!"
            });


        },
            (error) => {
                dispatch({ type: "errorMessage", payload: error.message });
            }
        )


}


const deleteFollow = (dispatch) => (userId,FollowTime) => {

    FollowRef
        .where("userId", "==", userId)
        .orderBy("FollowTime", "desc")
        .onSnapshot((querySnapshot) => {
            const Follows = []

            querySnapshot.forEach((doc) => {
                let Follow = doc.data()
                FollowRef
                    .doc(doc.id)
                    .update({
                        Follower: firebase.firestore.FieldValue.arrayRemove(userId)
                    }).then(()=>{

                        FollowRef
                        .where("userId", "==", userId)
                        .orderBy("FollowTime", "desc")
                        .onSnapshot((querySnapshot) => {
                            const Follows = []


                            querySnapshot.forEach((doc) => {
                                let Follow = doc.data()
                                Follow.id = doc.id
                                Follows.push(Follow)
                            })
                            const Followersss = Follows[0].Followers
                            dispatch({
                                type: "deleteFollow",
                                payload: { Follow: { userId, FollowTime, Followersss } },
                            })
                            dispatch({ type: "errorMessage", payload: "Your perfile is save!" });


                        },
                            (error) => {
                                dispatch({ type: "errorMessage", payload: error.message });
                            }
                        )



                
                    })
            })

            dispatch({
                type: "getFollow",
                payload: Follows
            })
            dispatch({
                type: "errorMessage",
                payload: "Your pubication is save!"
            });


        },
            (error) => {
                dispatch({ type: "errorMessage", payload: error.message });
            }
        )





}


export const { Provider, Context } = createDataContext(
    FollowReducer, {
    updateFollow,
    deleteFollow,
    getFollow,
}, {
    Follow: [],
    errorMessage: "",
    Toogle: false
}


)
