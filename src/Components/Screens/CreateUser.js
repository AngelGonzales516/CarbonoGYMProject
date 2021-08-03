import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Text } from "react-native-elements";
import * as Font from 'expo-font'
import FormSignup from '../UI/Forms/FormSignup'

const { width, height } = Dimensions.get("window");

const CreateUser = ({
    navigation
}) => {
    const [fonstLoaded, setFonstLoaded] = useState(false);

    // funcion para cargar las fuentes con mayor eficacia
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
            <Text style={styles.greeting}>
                Crear cuenta
            </Text>
            <FormSignup back={() => { navigation.goBack() }} />
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
        height: height * 0.14,
        width: width * 0.3,
        alignSelf: "center",
        resizeMode: "cover",
        paddingLeft: 0,
    },
    titleAppName: {
        fontFamily: "PlayFair",
        color: "#fafafa",
        textAlign: "center",
        fontSize: 35,
        marginTop: 50,
        zIndex: 10
    },
    greeting: {
        fontFamily: "Aktiv_Bold",
        fontSize: 34,
        color: "#fcfcfc",
        zIndex: 10,
        marginTop: 40,
    },
    formLoginContainer: {
        position: "absolute",
        backgroundColor: "#fcfcfc",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        bottom: 0,
        height: height * 0.75,
        width: width,
        zIndex: 10,
        padding: 40,
        alignItems: "flex-start",
    },
    text: {
        marginTop: 65,
    },
    bottons: {
        marginTop: 50,
        width: width * 0.8,
        height: height * 0.07,
        borderRadius: 15,
        backgroundColor: "#2f3640"
    },
    bottons2: {
        marginTop: 15,
        width: width * 0.8,
        height: height * 0.07,
        borderRadius: 15,
        backgroundColor: "#a0a0a0"
    },
    title: {
        fontSize: 20
    },
    styleImagePiker: {
        alignSelf: "center",
        marginTop: 10,
        marginBottom: 10,
    },
    return: {
        fontFamily: "Aktiv_Bold",
        fontSize: 15,
        color: "#fcfcfc",
        zIndex: 10,
        marginRight: 290,
        marginTop: 20,
    }
});

export default CreateUser;