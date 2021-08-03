import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Dimensions, Switch, StatusBar } from "react-native";
import { Button, Text } from "react-native-elements";
import { useFonts } from "expo-font";
import Icon from "react-native-vector-icons/FontAwesome5";
import { firebase } from "../../../Firebase";
import * as Font from 'expo-font';
import { Context as AuthContext } from "../../../Providers/AuthProvider";
import { Context as PerfileContext } from "../../../Providers/perfileProviders"
import { Context as ThemeContext } from "../../../Providers/ThemeProvider"

const {
    width,
    height
} = Dimensions.get("window");

const Options = ({
    signOut,
    editarNav,
    regresar,
    Back
}) => {
    const { state: ThemeState, getTheme } = useContext(ThemeContext)

    const { state, setCurrentPerfil } = useContext(PerfileContext)
    const { signout } = useContext(AuthContext);
    const [error, setError] = useState(undefined);
    const [fonstLoaded, setFonstLoaded] = useState(false)
    const [isEnabled, setIsEnabled] = useState(ThemeState.Theme);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    /*
    let [fonts] = useFonts({
        "Aktiv-Normal": require("../../../Assets/Fonts/AktivGroteskCorp-Regular.ttf"),
        "Aktiv-Medium": require("../../../Assets/Fonts/AktivGroteskCorp-Medium.ttf"),
        "Aktiv-Bold": require("../../../Assets/Fonts/AktivGroteskCorp-Bold.ttf"),
        "PlayFair": require("../../../Assets/Fonts/PlayfairDisplay-Regular.ttf")
    });*/

    const loadFonts = async () => {

        await Font.loadAsync({
            Aktiv_Normal: require("../../../Assets/Fonts/AktivGroteskCorp-Regular.ttf"),
            Aktiv_Medium: require("../../../Assets/Fonts/AktivGroteskCorp-Medium.ttf"),
            Aktiv_Bold: require("../../../Assets/Fonts/AktivGroteskCorp-Bold.ttf"),
            PlayFair: require("../../../Assets/Fonts/PlayfairDisplay-Regular.ttf")
        });

        setFonstLoaded(true)
    }

    useEffect(() => {
        loadFonts()
    }, [])

    const handleCheckout = () => {

        setCurrentPerfil(state.perfiles)

        editarNav()
        console.log(state.currentPerfile)

    }

    //

    const getingTheme = () => {
        (!isEnabled) ?
            getTheme("dark") :
            getTheme("default")


        console.log(ThemeState.Theme)
    }

    useEffect(() => {
        getingTheme()
    }, [isEnabled])

    if (!fonstLoaded) {
        return null
    }
    return (
        <View
            style={styles.container}
        >
            <Text
                style={styles.label}
            >Ajustes de Usuario</Text>
            <Button
                title="Mi Cuenta"
                buttonStyle={styles.optionButton}
                titleStyle={styles.optionButtonTitle}
                icon={
                    <Icon
                        name="user-circle"
                        style={styles.optionButtonIcon}
                    />

                }
                onPress={handleCheckout}
            />
         
            <Button
                title="Cerrar sesión"
                buttonStyle={styles.logoutButton}
                onPress={signout}
            />
            <Button
                title="Cancelar"
                buttonStyle={styles.logoutButton2}
                titleStyle={{ color: "#2F3640" }}
                onPress={() => { Back() }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
        paddingTop: 5,
        backgroundColor: "white",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    label: {
        fontFamily: "Aktiv_Bold",
        fontSize: 17,
        marginLeft: width * 0.07,
        marginBottom: 15,
        marginTop: 15,
    },
    optionButton: {
        justifyContent: "flex-start",
        paddingLeft: width * 0.07,
        backgroundColor: "transparent"
    },
    optionButtonTitle: {
        color: "#2F3640",
        fontSize: 17,
        fontFamily: "Aktiv_Normal",
        marginLeft: 15,
    },
    optionButtonIcon: {
        fontSize: 20,
    },
    logoutButton: {
        width: width * 0.8,
        alignSelf: "center",
        backgroundColor: "#e84118",
        marginTop: 150,
        borderRadius: 10,
        height: 50,
        marginBottom: 15,
    },
    logoutButton2: {
        width: width * 0.8,
        alignSelf: "center",
        backgroundColor: "#f0f0f0",
        marginTop: 13,
        height: 50,
        borderRadius: 10,
    },
    switchv: {
        marginTop: 150,
        marginLeft: width * 0.85,
        position: "absolute"
    }
});

export default Options;