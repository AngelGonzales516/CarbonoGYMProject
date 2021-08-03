import React, { useState, useEffect } from "react";
import { StyleSheet, View, ImageBackground, Dimensions,Text } from "react-native";
import { Input, Button,Image } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import FormLogin from "../UI/Forms/FormLogin";
import Gym from "../../../assets/carbono.png"
import * as Font from 'expo-font';


const { width, height } = Dimensions.get("window");

const Login = ({
    navigation
}) => {
 
    const [fonstLoaded, setFonstLoaded] = useState(false)

    /*
       let [fonts] = useFonts({
           "Aktiv-Light": require("../../Assets/Fonts/AktivGroteskCorp-Light.ttf"),
           "Aktiv-Normal": require("../../Assets/Fonts/AktivGroteskCorp-Regular.ttf"),
           "Aktiv-Medium": require("../../Assets/Fonts/AktivGroteskCorp-Medium.ttf"),
           "Aktiv-Bold": require("../../Assets/Fonts/AktivGroteskCorp-Bold.ttf"),
           "PlayFair": require("../../Assets/Fonts/PlayfairDisplay-Regular.ttf")
       });*/


    const loadFonts = async () => {

        await Font.loadAsync({
            Aktiv_Light: require("../../Assets/Fonts/AktivGroteskCorp-Light.ttf"),
            Aktiv_Normal: require("../../Assets/Fonts/AktivGroteskCorp-Regular.ttf"),
            Aktiv_Medium: require("../../Assets/Fonts/AktivGroteskCorp-Medium.ttf"),
            Aktiv_Bold: require("../../Assets/Fonts/AktivGroteskCorp-Bold.ttf"),
            PlayFair: require("../../Assets/Fonts/PlayfairDisplay-Regular.ttf")
        });

        setFonstLoaded(true);
    }

    useEffect(() => {
        loadFonts()
    }, [])

    if (!fonstLoaded) {
        return null
    }

    return (
        <View style={styles.container}>

          
            <FormLogin
                callback={() => {
                    navigation.navigate("CreateUser");
                }}
                moveToFeed={() => {
                    navigation.navigate("Home");
                }}
                moveToRecover={() => {
                    navigation.navigate("Recover")
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        backgroundColor: "#2F3640",
        overflow: "hidden",
    },
    loginImageBackground: {
        height: height * 1,
        width: width * 3,
        resizeMode: "cover",
        paddingLeft: 0,
        position: "absolute",
        left: -70,
    },
    titleAppName: {
        fontFamily: "PlayFair",
        color: "#fafafa",
        textAlign: "center",
        fontSize: 35,
        marginTop: 50,
        zIndex: 10
    },
 
});

export default Login;