import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, View, ImageBackground, Dimensions, Image, StatusBar, TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";
import InfoPublication from "./InfoPublication";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from '@expo/vector-icons';
import { ScrollView } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("screen");

const OpenPublication = ({
    route,
    navigation
}) => {

    const {
        title,
        city,
        date,
        artworkPrice,
        description,
        inspiration,
        userName,
        genre,
        userId,
        publicationId,
        image,
    } = route.params;

    let [fonts] = useFonts({
        "Aktiv-Normal": require("../../../Assets/Fonts/AktivGroteskCorp-Regular.ttf"),
        "Aktiv-Medium": require("../../../Assets/Fonts/AktivGroteskCorp-Medium.ttf"),
        "Aktiv-Bold": require("../../../Assets/Fonts/AktivGroteskCorp-Bold.ttf"),
        "PlayFair": require("../../../Assets/Fonts/PlayfairDisplay-Regular.ttf")
    });

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.exitButton}
                onPress={() => navigation.goBack()}
            >
                <AntDesign name="close" size={30} color="white" onPress={() => navigation.goBack()} />
            </TouchableOpacity>
            <InfoPublication
                title={title}
                city={city}
                date={date}
                price={artworkPrice}
                description={description}
                inspiration={inspiration}
                userName={userName}
                userId={userId}
                publicationId={publicationId}
                genre={genre}
                image={image}
                navigation={navigation}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        overflow: "hidden",
    },
    exitButton: {
        position: "absolute",
        left: 10,
        zIndex: 10,
        padding: 10,
        borderRadius: 50,
        marginTop: StatusBar.currentHeight + 5,
        backgroundColor: "rgba(0, 0, 0, 0.5)"
    }
});

export default OpenPublication;