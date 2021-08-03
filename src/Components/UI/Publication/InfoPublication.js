import React, { useState, useEffect, useContext } from "react"
import { Dimensions, StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from "react-native";
import { Divider, Button, Overlay } from "react-native-elements";
import Publisher from "../../Shared/Publisher";
import { Icon } from "react-native-elements";
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";
import { Context as AuthContext } from "../../../Providers/AuthProvider";
import { Context as likeContext } from "../../../Providers/likeProviders";
import { Context as PublicationContext } from "../../../Providers/InformationProviders";
import { format } from "date-fns";
import * as Font from 'expo-font';
import AnimatedScrollView from "../BottonNav/TabNav/AnimatedScrollView";

const { width, height } = Dimensions.get("screen");

const InfoPublication = ({
    title,
    city,
    date,
    price,
    description,
    inspiration,
    userName,
    userId,
    image,
    genre,
    publicationId,
    navigation
}) => {

    const [fonstLoaded, setFonstLoaded] = useState(false);
    const { state, signout } = useContext(AuthContext);
    const { state: likeState, clearMessage, createLike, deleteLike } = useContext(likeContext);
    const { deletePublication } = useContext(PublicationContext);
    const [showConfirmOverlay, setShowConfirmOverlay] = useState(false);

    const loadFonts = async () => {
        await Font.loadAsync({
            Aktiv_Normal: require("../../../Assets/Fonts/AktivGroteskCorp-Regular.ttf"),
            Aktiv_Medium: require("../../../Assets/Fonts/AktivGroteskCorp-Medium.ttf"),
            Aktiv_Bold: require("../../../Assets/Fonts/AktivGroteskCorp-Bold.ttf")
        });
        setFonstLoaded(true);
    }

    useEffect(() => {
        loadFonts()
        // console.log("imagen que viene: ", image);
        console.log(publicationId);
    }, [])

    if (!fonstLoaded) {
        return null;
    }

    const likeDelete = () => {
        deleteLike(
            publicationId
        )
    }

    const postDelete = () => {
        deleteLike(publicationId);
        deletePublication(publicationId);
        showOverlay()
        navigation.goBack();
    };

    const showOverlay = () => {
        setShowConfirmOverlay(!showConfirmOverlay);
    };

    return (
        <SafeAreaView style={styles.container}>
            <AnimatedScrollView>
                <Image
                    source={{ uri: `data:image/jpg;base64,${image.base64}` }}
                    style={{
                        height: (image.width > width) ? width : image.height,
                        width: (image.width > width) ? width : image.width
                    }}
                    resizeMode="contain"
                />
                <TouchableOpacity style={{ marginTop: 30, marginLeft: 280 }}
                    onPress={() => {

                        likeDelete()
                    }}>
                    <Icon
                        name="heart"
                        type="font-awesome"
                        color={"#ff0000"}
                        size={30}
                    />
                </TouchableOpacity>
                <LinearGradient
                    colors={["white", "white", "#f0f0f0"]}
                    style={styles.postInformation}
                >

                    <Text style={styles.title}>
                        {title}
                    </Text>
                    <Text style={styles.genre}>{genre}</Text>
                    <View style={styles.dateAndPlace} >
                        <Text style={styles.city}>{city}</Text>
                        <Text style={styles.date}>{`${format(date, "eee H:m")}`}</Text>
                    </View>
                    <Divider style={styles.divider} />
                    <Text style={styles.titleValue}>Hecho por:</Text>
                    <Publisher userName={userName} style={{ marginBottom: 20 }} />
        
                    <Text style={styles.titleValue}>Descripción:</Text>
                    <Text style={styles.valueText}>{description}</Text>
                    <Text style={styles.titleValue}>Inspirado por:</Text>
                    <Text style={styles.valueText}>{inspiration}</Text>
                    {
                        state.user.id == userId ?
                            (
                                <>
                                    <Divider style={styles.dividerOptions} />
                                    <Text style={styles.titleValue}>Opciones</Text>
                                    <Button
                                        title="Eliminar publicación"
                                        containerStyle={styles.buttonContainer}
                                        buttonStyle={styles.deleteButton}
                                        onPress={showOverlay}
                                    />
                                    <Overlay
                                        isVisible={showConfirmOverlay}
                                        onBackdropPress={showOverlay}
                                        overlayStyle={styles.overlayDeleteConfirmation}
                                        backdropStyle={styles.backdrop}
                                    >
                                        <AntDesign name="warning" size={50} color="red" style={styles.iconWarning} />
                                        <Text
                                            style={styles.titleConfirmDelete}
                                        >{`¿Seguro que deseás eliminar tu obra "${(title) ? title.trim() : title}"?, esta acción es irreversible.`}</Text>
                                        <Button
                                            title="Sí, eliminar"
                                            containerStyle={styles.confirmDeleteButtonContainer}
                                            buttonStyle={styles.confirmDeleteButton}
                                            onPress={postDelete}
                                        />
                                        <Button
                                            title="Cancelar"
                                            buttonStyle={styles.confirmCancelButton}
                                            onPress={showOverlay}
                                            titleStyle={{ color: "#2f3640" }}
                                        />
                                    </Overlay>
                                </>
                            ) : (
                                <View
                                    style={{ marginBottom: 69 }}
                                ></View>
                            )
                    }
                </LinearGradient>
            </AnimatedScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 34,
        marginBottom: 5,
        flex: 1,
        fontFamily: "Aktiv_Bold",
        color: "#2f3640",
    },
    postInformation: {
        paddingLeft: 40,
        paddingRight: 40,
        paddingTop: 20,
    },
    city: {
        color: "#a0a0a0",
        fontSize: 14,
    },
    genre: {
        color: "#a0a0a0",
        fontSize: 14,
        marginBottom: 25,
        textDecorationLine: "underline"
    },
    date: {
        color: "#a0a0a0",
        fontSize: 14,
    },
    dateAndPlace: {
        flexDirection: "row",
        flexWrap: "nowrap",
        justifyContent: "space-between",
    },
    divider: {
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: "#a0a0a0",
    },
    dividerOptions: {
        marginBottom: 20,
        backgroundColor: "#a0a0a0",
    },
    titleValue: {
        color: "#a0a0a0",
        marginBottom: 10,
        fontSize: 14,
    },
    value: {
        fontFamily: "Aktiv_Bold",
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 25,
        color: "#2f3640",
    },
    valueText: {
        fontFamily: "Aktiv_Normal",
        fontSize: 16,
        marginBottom: 25,
        color: "#2f3640",
    },
    descrip: {
        fontFamily: "Aktiv_Normal",
        fontSize: 16,
        marginBottom: 25,
        color: "#2f3640",
    },
    container: {
        flex: 1,
        backgroundColor: "#fcfcfc",
    },
    line: {
        marginTop: 20,
        alignSelf: "center",
        width: 90,
        borderWidth: 1,
        borderColor: "#a0a0a0"
    },
    buttonContainer: {
        marginBottom: 20,
    },
    editButton: {
        height: 60,
        backgroundColor: "#2f3640",
        color: "#f0f0f0",
        borderRadius: 10,
    },
    deleteButton: {
        height: 60,
        backgroundColor: "rgba(255, 0, 0, 1)",
        color: "white",
        borderRadius: 10,
    },
    overlayDeleteConfirmation: {
        marginLeft: 40,
        marginRight: 40,
        borderRadius: 10,
        padding: 30,
    },
    backdrop: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    titleConfirmDelete: {
        fontSize: 16,
        fontFamily: "Aktiv_Bold",
        marginBottom: 20,
        letterSpacing: 0.5
    },
    confirmDeleteButtonContainer: {
        marginBottom: 15,
    },
    confirmDeleteButton: {
        borderRadius: 10,
        height: 50,
        backgroundColor: "red",
    },
    confirmCancelButton: {
        borderRadius: 10,
        height: 50,
        backgroundColor: "#f0f0f0",
    },
    iconWarning: {
        alignSelf: "center",
        marginBottom: 15,
    }
});

export default InfoPublication