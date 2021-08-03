import React,{useState,useEffect, useContext} from "react";
import { StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";
import { Text, Image } from "react-native-elements";
import { useFonts } from "expo-font";
import * as Font from 'expo-font'
import {Context as PerfileContext} from "../../Providers/perfileProviders"

const { width, height } = Dimensions.get("screen");

const Publisher = ({
    userName,
    userId,
    callback,
    style
}) => {
    const {setCurrentIdPerfil} = useContext(PerfileContext)
    const [fonstLoaded,setFonstLoaded] = useState (false)
    
    const loadFonts = async () => {

        await Font.loadAsync({
            Aktiv_Normal: require("../../Assets/Fonts/AktivGroteskCorp-Regular.ttf"),
            Aktiv_Medium: require("../../Assets/Fonts/AktivGroteskCorp-Medium.ttf"),
            Aktiv_Bold: require("../../Assets/Fonts/AktivGroteskCorp-Bold.ttf")
        });

        setFonstLoaded(true)

    }

    const verifydata = () =>{

        setCurrentIdPerfil(userId)
        callback()

    }

    useEffect (()=>{
        loadFonts()
    },[])

    if (!fonstLoaded){
        return null
    }

    return (
        <TouchableOpacity
            style={[post.container, style]}
            onPress={verifydata}
        >
            <Image
                source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
                style={post.profilePicture} />
            <Text style={post.profileUserName}>{userName}</Text>
        </TouchableOpacity>
    );
}

const post = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
    },
    profilePicture: {
        width: 35,
        height: 35,
        borderRadius: 6,
        resizeMode: "cover",
        marginRight: 7
    },
    profileUserName: {
        fontFamily: "Aktiv_Medium",
        color: "#2F3640",
        fontSize: 17,
    },
});

const openPost = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: width * 0.1,
        flexDirection: "row"
    },
    profilePicture: {
        width: 50,
        height: 50,
        marginRight: 7,
    },
})

export default Publisher;

/* <Image
                source={{ uri: require("../Assets/img/artista-fem.png") }}
                style={post.profilePicture}
            /> */