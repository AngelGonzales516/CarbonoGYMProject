import React from "react";
import { StyleSheet, View, Dimensions, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native-elements";
import { useFonts } from "expo-font";
import Post from "../Shared/Post";
import SearchBar from "../../Components/UI/SearchBar/SearchBar"
import AnimatedScrollView from "../UI/BottonNav/TabNav/AnimatedScrollView"

const { width, heigth } = Dimensions.get("window");

const SearchPublication = () => {

    const [fonts] = useFonts({
        "PlayFair": require("../../Assets/Fonts/PlayfairDisplay-Regular.ttf")
    });

    return (
        <SafeAreaView style={styles.container}>
            <View
                intensity={25}
                style={styles.header}
            >

                <SearchBar />
            </View>

            <AnimatedScrollView style={styles.scrollView}>
                <Post
                    userName="Rius"
                    artWorkName="Retrato de lo inefable"
                    artWorkPrice="L. 900"
                    artWorkUbication="Choluteca, Choluteca"
                />
                <Post
                    userName="Rius"
                    artWorkName="Retrato de lo inefable"
                    artWorkPrice="L. 900"
                    artWorkUbication="Choluteca, Choluteca"
                />
                <Post
                    userName="Rius"
                    artWorkName="Retrato de lo inefable"
                    artWorkPrice="L. 900"
                    artWorkUbication="Choluteca, Choluteca"
                />
                <Post
                    userName="Rius"
                    artWorkName="Retrato de lo inefable"
                    artWorkPrice="L. 900"
                    artWorkUbication="Choluteca, Choluteca"
                />
            </AnimatedScrollView>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",

    },
    container2: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        flex: 1,
        width: width * 1,
        color: "#fcfcfc"
    },
    scrollView: {
        flex: 1,
        width: width * 1,
        marginTop: 108
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: width,
        paddingLeft: 40,
        paddingRight: 40,
        paddingTop: 12,
        paddingBottom: 12,
        marginBottom: 0,
        position: "absolute",
        top: 0,
        zIndex: 10,
    },
});

export default SearchPublication;