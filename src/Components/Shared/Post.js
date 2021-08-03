import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import Publisher from "./Publisher";
import PostCard from "./PostCard";

const { width, height } = Dimensions.get("window");
// falta validar cuando el post lleve más de una imagen

const Post = ({
    userName,
    openPublication,
    image,
    userId,
    publicationTime,
    publicationId,
    navigation,
    genre,
    inspiration,
    meaning
}) => {
    return (
        <View style={styles.container}>
            <Publisher userId={userId} userName={userName} callback={()=>{navigation.navigate("userPerfil")}} style={{ marginLeft: 30 }} />
            <PostCard
                openPublication={openPublication}
                image={image}
                genre={genre}
                userName={userName}
                userId={userId}
                publicationTime={publicationTime}
                publicationId={publicationId}
                navigation={navigation}
                inspiration={inspiration}
                meaning={meaning}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Post;


