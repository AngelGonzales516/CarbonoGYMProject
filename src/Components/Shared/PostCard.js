import React, { useEffect, useState } from "react";
import { StyleSheet, View, Dimensions, TouchableOpacity, ImageBackground } from "react-native";
import { Button, Text, Image, ListItem } from "react-native-elements";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import PostInteractionButton from "./PostInteractionButton"
import Follow from '../UI/Follow/Follow'
import * as Font from 'expo-font'

const { width, height } = Dimensions.get("screen");

const PublicationCard = ({
    image,
    inspiration,
    meaning,
    genre,
    userName,
    userId,
    publicationTime,
    publicationId,
    navigation
}) => {
    const [fonstLoaded, setFonstLoaded] = useState(false)

    const loadFonts = async () => {

        await Font.loadAsync({
            Aktiv_Normal: require("../../Assets/Fonts/AktivGroteskCorp-Regular.ttf"),
            Aktiv_Medium: require("../../Assets/Fonts/AktivGroteskCorp-Medium.ttf"),
            Aktiv_Bold: require("../../Assets/Fonts/AktivGroteskCorp-Bold.ttf")
        });

        setFonstLoaded(true)

    }

    useEffect(() => {
        loadFonts()
        // console.log("imagen que viene: ", image);
    }, [])

    if (!fonstLoaded) {
        return null
    }

    return (
        <TouchableOpacity
            style={[styles.container, {
                height: (image.height * 0.5 > 500)
                    ? 400
                    : image.height * 0.7,
            }]}
            onPress={() => navigation.navigate("OpenPublication", {
               
                date: publicationTime,
                description: meaning,
                inspiration: inspiration,
                userName: userName,
                genre: genre,
                userId: userId,
                publicationId,
                image: image,
            })}
        >
            <ImageBackground
                style={[styles.image, {
                    height: (image.height * 0.5 > 500)
                        ? 400
                        : image.height * 0.7,
                }]}
                source={{ uri: `data:image/jpg;base64,${image.base64}` }}
                resizeMode="cover"
            >
               
                    
                    
                    <View style={styles.buttonContainer}>
                        <PostInteractionButton 
                            artWorkMeaning={meaning}
                            artworkGenre={genre}
                            artWorkInspiration={inspiration}
                            userName={userName}
                            image={image}
                            userId={userId}
                            publicationTime={publicationTime}
                            publicationId={publicationId}
                        />
                        <View style={styles.buttonFolloSeeMore}>
                            <Follow NotFolloAnswer={styles.NotFolloAnswer} FollowAnswer={styles.FollowAnswer} TextColorNotFollow={styles.TextColorNotFollow} TextColorFollow={styles.TextColorFollow} />
                            <Button
                                title="Ver más"
                                buttonStyle={styles.seeMoreButton}
                                titleStyle={styles.seeMoreTitle}
                                onPress={() => navigation.navigate("OpenPublication", {
                                    
                                    date: publicationTime,
                                    description: meaning,
                                    inspiration,
                                    userName,
                                    genre,
                                    userId,
                                    publicationId,
                                    image,
                                })}
                            />
                        </View>
                    </View>
               

            </ImageBackground>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: width - 60,
        borderColor: "#000",
        borderWidth: 0,
        marginTop: 15,
        borderRadius: 10,
        alignItems: "flex-start",
        overflow: "hidden",
        marginBottom: 40,
        alignSelf: "center",
        backgroundColor: "white",
        paddingLeft: 30,
        paddingRight: 30,

        // modificamos las sombras del componente
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
    priceTag: {
        alignSelf: "flex-end",
        borderRadius: 6,
        flexDirection: "row",
        flexWrap: "nowrap",
        padding: 10,
        marginTop: 20,
        marginRight: 20,
    },
    priceText: {
        textAlign: "center",
        justifyContent: "center",
        color: "#fafafa",
        fontSize: 15,
        fontWeight: "bold",
        fontFamily: "Aktiv_Normal",
    },
    image: {
        width: width - 60,
        height: 400,
        resizeMode: "cover",
        alignSelf: "center",
    },
    publicationDetails: {
        alignItems: "flex-start",
        paddingTop: 15,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 5,
        width: width - 60,
        position: "absolute",
        bottom: 0,
        alignSelf: "center"
    },
    artWorkName: {
        fontSize: 20,
        color: "#fcfcfc",
        fontWeight: "bold",
        fontFamily: "Aktiv_Medium",
    },
    artWorkUbication: {
        fontSize: 13,
        color: "#fafafa",
        marginTop: 10,
        marginBottom: 10,
        fontFamily: "Aktiv_Normal"
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        flex: 1,
        marginBottom: 10,
        width: width - 100,
    },
    seeMoreButton: {
        // width: 80,
        // height: 40,
        alignItems: "center",
        justifyContent: "flex-end",
        backgroundColor: "transparent"
    },
    seeMoreTitle: {
        fontSize: 14,
        color: "white",
        fontWeight: "bold",
        fontFamily: "Aktiv_Medium"
    },

    buttonFolloSeeMore: {
        alignSelf: "flex-end",
        flexDirection: "row",
        alignItems: "center"
    },

    FollowAnswer: {
        borderColor: "#0000ff",
        borderWidth: 2,
        backgroundColor: "#0000ff",
        width: 90,
        alignItems: 'center',
        padding: 5,
        // marginLeft: 95,
        borderRadius: 15,

    },
    NotFolloAnswer: {

        width: 80,
        alignItems: 'center',
        padding: 5,
        // marginLeft: 100,

        borderRadius: 15,

    },
    TextColorFollow: {
        color: '#FDFDFD',
        fontSize: 15,
        fontFamily: "Aktiv_Bold",
    }
    ,
    TextColorNotFollow: {
        color: '#FDFDFD',
        fontSize: 15,
        fontFamily: "Aktiv_Bold",
    }
});

export default PublicationCard;
/* <Image
       borderColor: "#0000ff",         backgroundColor: '#FDFDFD' ,     color:"#0000ff",   style={styles.image}
                    source={{ uri: require("../Assets/img/pintura1.png") }}
                /> */