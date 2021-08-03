// componente para ver la lista de los post
import React, { useState, useEffect, useContext } from "react";
import { FlatList, Dimensions, StyleSheet, View, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { Text } from "react-native-elements";
import { Context as informationContext } from "../../Providers/InformationProviders";
import { Context as AuthContext } from "../../Providers/AuthProvider";
import { useTabBar } from '../UI/BottonNav/context/TabBarProvider';
import Post from "../Shared/Post";
import * as Font from "expo-font";

const { width, heigth } = Dimensions.get("window");
let offsetY = 0;

const PostList = ({
    navigation,
    
    posts,
}) => {
    const [fonstLoaded, setFonstLoaded] = useState(false);
    const { setShowTabBar } = useTabBar();

    const loadFonts = async () => {

        await Font.loadAsync({
            "PlayFair": require("../../Assets/Fonts/PlayfairDisplay-Regular.ttf"),
            "AktivBold": require("../../Assets/Fonts/AktivGroteskCorp-Bold.ttf"),
        });

        setFonstLoaded(true);
    }

    const [Toggle, setToggle] = useState(false)
    const estado = Toggle ? 'Like' : 'Dislike'
    const desicion = () => {
        const NewToggle = !Toggle
        setToggle(NewToggle)
    }

    useEffect(() => {
        loadFonts();
       // console.log("Publicaciones cargadas en el feed: ", posts);
    }, [])

    if (!fonstLoaded)
    {
        return null
    }

    return (
        <FlatList
            style={styles.scrollView}
            data={posts}
            ListEmptyComponent={
                <View
                    style={styles.emptyTitle}
                >
                    <Text
                        style={styles.emptyText}
                    >El contenido está llegando...</Text>
                </View>
            }
            onScroll={({ nativeEvent }) => {
                const newOffset = nativeEvent.contentOffset.y;
                if (newOffset <= 0) return setShowTabBar(true);
                offsetY < newOffset ? setShowTabBar(false) : setShowTabBar(true);
                offsetY = newOffset;
            }}

            renderItem={({ item }) => (
                <Post
                    // este primer post abre la publicación
                    navigation={navigation}
                    key={item.id}
                    userName={item.userName}
                    inspiration={item.artworkInspiration}
                    meaning={item.artworkMeaning}
                    genre={item.artworkGenre}
                    publicationTime={item.publicationTime}
                    image={item.image}
                    userId={item.userId}
                    publicationId={item.id}
                />

            )}
        />
    );
};

export default PostList;

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        width: width * 1,
        marginTop: 68
    },
    emptyTitle: {
        flex: 1,
        width: width,
        marginTop: 68,
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
        padding: 50,
    },
    emptyText: {
        color: "#d0d0d0",
        fontSize: 25,
        fontFamily: "AktivBold",
    }
});