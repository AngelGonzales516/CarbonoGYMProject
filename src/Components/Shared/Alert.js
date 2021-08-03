import React, { useState, useEffect } from "react";
import { StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";
import { Text } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import * as Font from 'expo-font'

const { width, height } = Dimensions.get("window");

const Alert = ({
    type,
    title,
    callback
}) => {
    const [fonstLoaded, setFonstLoaded] = useState(false);
    const [showingAlert, setShowingAlert] = useState(true);

    const loadFonts = async () => {

        await Font.loadAsync({
            "Aktiv-Bold": require("../../Assets/Fonts/AktivGroteskCorp-Bold.ttf"),
        });
        setFonstLoaded(true)
    }

    useEffect(() => {
        loadFonts()
    }, [])

    let background = "";
    let icon = "";
    let shadowColor = "";

    // evaluamos el tipo de error para así mostrar un mensaje
    switch (type) {
        case "error":
            background = "#ff7979";
            icon = "times-circle";
            shadowColor = "#E20000";
            break;
        case "info":
            background = "#BCE8FF";
            icon = "info-circle";
            shadowColor = "#005F91";
            break;
        case "warning":
            background = "#f6e58d";
            icon = "exclamation-circle";
            shadowColor = "#DCB900";
            break;
        case "success":
            background = "#8ADBB5";
            icon = "check-circle";
            shadowColor = "#00A558";
            break;
        default:
            background = "";
            icon = "minus-circle";
            break;
    }

    if (!fonstLoaded) {
        return null
    }

    return (
        <TouchableOpacity
            style={[
                styles.container,
                {
                    backgroundColor: background,
                    shadowColor: shadowColor,
                },
                (showingAlert)
                    ? { display: "flex" }
                    : { display: "none" }
            ]}
            onPress={() => { setShowingAlert(false) }}
        >
            <Icon
                name={icon}
                style={styles.icon}
            />
            <Text
                style={styles.title}
            >{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: width * 0.8,
        height: 50,
        borderRadius: 6,
        position: "absolute",
        bottom: 30,
        flexDirection: "row",
        flexWrap: "nowrap",
        zIndex: 10,
        alignItems: "center",
        paddingLeft: 20,
        paddingRight: 20,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
    },
    icon: {
        fontSize: 17,
    },
    title: {
        fontSize: 15,
        marginLeft: 10,
        fontFamily: "Aktiv-Bold",
    }
});

export default Alert;