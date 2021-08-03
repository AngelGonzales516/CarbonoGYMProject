import React, { useState,useContext,useEffect } from "react";
import { StyleSheet, View, TouchableOpacity,Dimensions } from "react-native";
import { Icon } from "react-native-elements";
import { firebase } from "../../Firebase/index";
import { Context as likeContext } from "../../Providers/likeProviders";
import { Context as AuthContext } from "../../Providers/AuthProvider";
import createDataContext from "../../Providers/createDataContext";

// import Icon from "react-native-vector-icons/FontAwesome";

const { width, height } = Dimensions.get("window");


const PostInteractionButton = ({
    userName,
    artworkGenre,
    artWorkInspiration,
    artWorkMeaning,
    image,
    publicationId,
}) => {
    
    const { state, signout } = useContext(AuthContext);
    const { state:likeState, clearMessage,createLike,deleteLike } = useContext(likeContext);
    const [showingLikeButton, setShowingLikeButton] = useState(true);
    const [showingDeleteButton, setShowingDeleteButton] = useState(false);

    useEffect(()=>{
        setShowingDeleteButton(showingLikeButton)
    }, [showingLikeButton])
    
    const post = () => {
        const userId = state.user.id;
        createLike(
            userName,
            artworkGenre,
            artWorkInspiration,
            artWorkMeaning,
            image,
            userId,
            Date.now(),
            publicationId
        )
        
    }
    const postDelete = () => {
        deleteLike(
            publicationId
        )
    }
   // console.log(likeState.likes[0].id)
    const exist = publicationId
    return (
        <View style={styles.container}>
            <TouchableOpacity style={(showingLikeButton) ? {display: "flex"}:{display: "none"}}
                onPress={()=> {
                setShowingLikeButton(!showingLikeButton)
                post()
            }}>
                <Icon
                    name="heart"
                    type="font-awesome"
                    color={"#fcfcfc"}
                    
                    // color={!Toggle? "#fcfcfc" : "#ff0000"}
                />
                
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        width: 30,
        height: 30,
        justifyContent: "center",
        marginTop:height * 0.45

    },
    IconColorLike:{
        color:'#fcfcfc'
    },
    IconColorNotLike:{
        color:"#ff0000"
    }
});

export default PostInteractionButton
