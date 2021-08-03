import React from "react";
import { StyleSheet, View, Dimensions, ScrollView, Image, StatusBar } from "react-native";
import { Button, Text } from "react-native-elements";
import { useFonts } from "expo-font";
import Publisher from "../Shared/Publisher";
import Options from "../UI/Options/Options";

const {
    width,
    height
} = Dimensions.get("window");

const UserOptions = ({
    navigation
}) => {

    let [fonts] = useFonts({
        "Aktiv-Normal": require("../../Assets/Fonts/AktivGroteskCorp-Regular.ttf"),
        "Aktiv-Medium": require("../../Assets/Fonts/AktivGroteskCorp-Medium.ttf"),
        "Aktiv-Bold": require("../../Assets/Fonts/AktivGroteskCorp-Bold.ttf"),
        "PlayFair": require("../../Assets/Fonts/PlayfairDisplay-Regular.ttf")
    });
    return (

        <View
            style={styles.container}
        >
           <View style={styles.conteinerOptions}>
            <Options
                Back={
                    () => { navigation.navigate("Profile"); }
                }
                editarNav={() => { navigation.navigate("editar") }}
            />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems: "center",
        backgroundColor: "#f0f0f0"
    },
    Profile: {
        width: width * 0.85,
        marginTop: 10,
        marginBottom: 20,
    },
    conteinerOptions:{
        marginTop:height * 0.1
    }
});

export default UserOptions;