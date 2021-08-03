import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, Text, Dimensions } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import { useTabBar } from '../UI/BottonNav/context/TabBarProvider'
import { Context as likeContext } from "../../Providers/likeProviders";
import { Context as AuthContext } from "../../Providers/AuthProvider";
import { useFonts } from "expo-font";
import * as Font from "expo-font";
import SearchButton from "../Shared/SearchButton";
import AnimatedScrollView from '../UI/BottonNav/TabNav/AnimatedScrollView'
import Post from '../Shared/Post'
import PostList from "../Shared/PostList";

const { width, heigth } = Dimensions.get("window");
let offsetY = 0;

const SavedPost = ({
    navigation
}) => {

    const [fonstLoaded, setFonstLoaded] = useState(false);
    const { state: likeState, getlike, clearMessage } = useContext(likeContext)
    const { state, signout } = useContext(AuthContext);
    const { setShowTabBar } = useTabBar();

    const loadFonts = async () => {

        await Font.loadAsync({
            "PlayFair": require("../../Assets/Fonts/PlayfairDisplay-Regular.ttf")
        });

        setFonstLoaded(true);
    }

    const getData = () => {
        getlike(state.user.id);
        console.log(getlike(state.user.id));
    }

    useEffect(() => {
        loadFonts();
        getData();
    }, [])

    if (!fonstLoaded) {
        return null
    }


    return (
        <SafeAreaView style={styles.container}>
            <View
                intensity={25}
                style={styles.header}
            >
                <Text style={styles.headerTitle}>Publicaciones guardadas</Text>
            </View>
            {/* Solo tenes que pasar los state del context a través del atributo posts */}
            <PostList
                posts={likeState.likes}
                navigation={navigation}
            />
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
        flex: 1,
        width: width * 1,
        color: "#fafafa"
    },
    scrollView: {
        flex: 1,
        width: width * 1,
        marginTop: 68
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        alignContent: "center",
        width: width,
        paddingLeft: 30,
        paddingRight: 30,
        marginBottom: 0,
        paddingTop: 20,
        position: "absolute",
        top: 10,
        zIndex: 10,
    },
    headerTitle: {
        fontFamily: "Aktiv_Medium",
        fontSize: 20,
        color: "#2f3640",
        marginTop: 15,
    },
});

export default SavedPost;