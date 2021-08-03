import React, { useState, useEffect, useContext } from "react";
import { FlatList, StyleSheet, View, Dimensions, ScrollView } from "react-native";
import { useTabBar } from '../UI/BottonNav/context/TabBarProvider'
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native-elements";
import { BlurView } from "expo-blur";
import { useFonts } from "expo-font";
import PostCard from "../Shared/PostCard";
import Post from "../Shared/Post";
import SearchButton from "../Shared/SearchButton";
import AnimatedScrollView from "../UI/BottonNav/TabNav/AnimatedScrollView"
import * as Font from "expo-font";
import { getThemeColor } from '../UI/Theme/Theme'
import { ValueTheme } from '../UI/Theme/Themevalue'
import { Context as ThemeContext } from '../../Providers/ThemeProvider'
import { Context as informationContext } from "../../Providers/InformationProviders";
import { Context as AuthContext } from "../../Providers/AuthProvider";
import PostList from "../Shared/PostList";

const { width, heigth } = Dimensions.get("window");
let offsetY = 0;

const Feed = ({
    navigation
}) => {

    const [fonstLoaded, setFonstLoaded] = useState(false);
    const [stateLoaded,setStateLoaded] = useState(false);
    const { state: ThemeState } = useContext(ThemeContext)
    const { state: informationState, morePublication, clearMessage,getReportPublication } = useContext(informationContext)
    const { state, signout } = useContext(AuthContext);
    const { setShowTabBar } = useTabBar();

    const loadFonts = async () => {

        await Font.loadAsync({
            "PlayFair": require("../../Assets/Fonts/PlayfairDisplay-Regular.ttf")
        });
        setFonstLoaded(true);
    }

    const getData = () => {
      
        morePublication();
        getReportPublication();
    }

    useEffect(() => {

        
      loadFonts(),
        getData()

      
    }, [])

    if (!fonstLoaded ) {
        return null
    }

    return (
        <SafeAreaView style={styles.container}>
            <View
                intensity={25}
                style={styles.header}
            >
                <Text style={styles.headerTitle}>Carbono GYM</Text>
                <SearchButton />
            </View>
           
            <PostList
                posts={informationState.morePublications}
                navigation={navigation}

            />
        </SafeAreaView >
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: getThemeColor("white", ValueTheme),
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
        fontFamily: "PlayFair",
        fontSize: 30,
        color: "#F56700",
    },
});

export default Feed;