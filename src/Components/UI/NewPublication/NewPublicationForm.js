import React, { useEffect, useState, useContext } from "react";
import { Dimensions, ImageBackground, PlatForm, StyleSheet, ScrollView, View } from "react-native";
import { Button, CheckBox, Image, Text, Input } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import * as Font from "expo-font";
import Icon from "react-native-vector-icons/FontAwesome";
import { Platform } from "react-native";
import { Context as InformationContext } from "../../../Providers/InformationProviders";
import { Context as AuthContext } from "../../../Providers/AuthProvider";
import AnimatedScrollView from "../BottonNav/TabNav/AnimatedScrollView";
import artGenres from "../../../utils/artGenres";

const { width, height } = Dimensions.get("window");

const NewPublicationForm = ({
    navigation
}) => {
    const [fonstLoaded, setFonstLoaded] = useState(false);

    // STATES DE LAS PUBLICACIONES ------------------------------------------------
    // state para el nombre del usuario

    // state para la ubicacion del usuario
   // const [ubication, setUbication] = useState("Choluteca");

    // state para obtener el nombre de la obra de arte
    const [artworkName, setArtWorkName] = useState("");
    const [errorArtworkName, setErrorArtorkName] = useState(false);

    // state para los elementos del picker seleccionado
    const [selectedPickerValue, setSelectedPickerValue] = useState("");
    const [errorSelectedPickerValue, setErrorSelectedPickerValue] = useState(false);

    // state donde va el significado de la obra de arte
    const [meaningOfArtwork, setMeaningOfArtwork] = useState("");

    // state que obtiene si se quiere vender la obra de arte o no
    const [sellCheck, setSellCheck] = useState(true);
    const [errorSellCheck, setErrorSellCheck] = useState(false);

    // state donde va la imágen
    const [imageArtWork, setImageArtwork] = useState(null);
    const [imageArtWorkDimensions, setImageArtworkDimension] = useState([]);
    const [completeImage, setCompleteImage] = useState(null);
    const [errorImageArtWork, setErrorImageArtwork] = useState(false);

    // state para la inspiración que tomó el usuario
    const [inspirationOfArtwork, setInspirationOfArtwork] = useState("");
    const [errorInspirationOfArtwork, setErrorInspirationOfArtwork] = useState(false);

    // state para el precio de la obra del usuario
    const [price, setPrice] = useState("");
    const [errorPrice, setErrorPrice] = useState(false);

    // obtenemos el momento en que se realizó la publicación
    const [publicationTimestamp, setPublicationTimestamp] = useState(Date.now());

    // state para obtener el id del usuario
    const { state, signout } = useContext(AuthContext);

    // state para crear publicaciones
    const { state: informationState, createPublication,getReportPublication,clearMessage } = useContext(InformationContext);
    // STATES DE LAS PUBLICACIONES ------------------------------------------------

    const [showPriceInput, setShowPriceInput] = useState(false);

    // useEffect para ocultar el input de precio cuando el usuario no quiera vender la obra
    useEffect(() => {
        if (!sellCheck) {
            setPrice("");
        }
        setShowPriceInput(sellCheck);
    }, [sellCheck]);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== "web") {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== "granted") {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            base64: true,
            aspect: [1, 1],
            quality: 1,
        })

        if (!result.cancelled) {
            setCompleteImage(result);
            setImageArtwork(`data:image/jpg;base64,${result.base64}`);
            setImageArtworkDimension([result.height, result.width])
        }
    };

    const loadFonts = async () => {
        await Font.loadAsync({
            Aktiv_Light: require("../../../Assets/Fonts/AktivGroteskCorp-Light.ttf"),
            Aktiv_Normal: require("../../../Assets/Fonts/AktivGroteskCorp-Regular.ttf"),
            AktivMedium: require("../../../Assets/Fonts/AktivGroteskCorp-Medium.ttf"),
            Aktiv_Bold: require("../../../Assets/Fonts/AktivGroteskCorp-Bold.ttf"),
            PlayFair: require("../../../Assets/Fonts/PlayfairDisplay-Regular.ttf"),
        });

        setFonstLoaded(true);
    };

    useEffect(() => {
        
        loadFonts();
        getReportPublication();
       
    }, []);

    if (!fonstLoaded) {
        return null;
    }

    // functions ------------------------------------------------------

    const post = () => {
        const userId = state.user.id;
        const userName = state.user.fullname;
      
        createPublication(
            userName,
            userId,
            inspirationOfArtwork,
            meaningOfArtwork,
            selectedPickerValue,
            publicationTimestamp,
            completeImage
        );
      //  navigation.navigate("Home");
     
    }
    console.log("los datos del estado son: "+informationState.reportData[0])
    const handlerVerify = (type) => {
        switch (type) {
            case "inspiration":
                setErrorInspirationOfArtwork((inspirationOfArtwork.trim() === ""));
                break;
            case "form":
                        
                    post();
                    navigation.navigate("Home");
                    
                break;
            default:
                break;
        }
    };

    // functions ------------------------------------------------------


    return (
        <SafeAreaView style={styles.container}>
            <AnimatedScrollView style={styles.scrollContainer}>
                <LinearGradient
                    style={styles.linearGradientContainer}
                    colors={["white", "white", "#f0f0f0"]}
                >
                    <Text style={styles.title}>Nueva publicación</Text>

                    <Text style={styles.recomendations}>
                        Brindanos toda la información que se solicita a continuación para
                        que asi puedas mostrar tus resultados a los demas
                    </Text>

                    <Text style={styles.titleComponent}>Elegí tu imagen</Text>

                    <ImageBackground
                        source={(imageArtWork && { uri: imageArtWork })}
                        imageStyle={{ borderRadius: 10 }}
                        style={[
                            styles.imageSelector, (imageArtWorkDimensions.length > 0)
                                ? {
                                    height: (imageArtWorkDimensions[0] * 0.5 > 300)
                                        ? height * 0.5
                                        : imageArtWorkDimensions[0] * 0.5,
                                    width: width - 60
                                }
                                : { height: height * 0.2 }
                        ]}
                        resizeMode="cover"
                    >
                        <Button
                            icon={<Icon name="image" style={styles.imageSelectorIcon} />}
                            buttonStyle={styles.imageSelectorButton}
                            iconContainerStyle={styles.imageSelectorIconContainer}
                            onPress={pickImage}
                        />
                    </ImageBackground>
                    <Text
                        style={styles.titleComponent}
                    >Musculos trabajados</Text>
                    <Picker
                        selectedValue={selectedPickerValue}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedPickerValue(itemValue)
                        }
                        style={styles.picker}
                        itemStyle={styles.pickerItem}
                        prompt="Selecciona la parte trabajada"
                    >
                        <Picker.Item label="Elegi Musculos Trabajados" value="" />
                        {artGenres.map((value, index) => (
                            <Picker.Item key={index} label={value} value={value} />

                        ))}
                    </Picker>
                    <Text
                        style={styles.titleComponent}
                    >Describí que significa para tí</Text>
                    <Input
                        containerStyle={styles.meaningContainer}
                        inputContainerStyle={styles.meaningInputContainer}
                        value={meaningOfArtwork}
                        onChangeText={setMeaningOfArtwork}
                        inputStyle={{ height: (height * 0.2) - 20 }}
                        errorStyle={{ display: "none" }}
                        textContentType={"fullStreetAddress"}
                        multiline={true}
                        textAlignVertical="top"
                    />
                    <Text
                        style={styles.titleComponent}
                    >¿En qué te inspiraste?</Text>
                    <Input
                        containerStyle={styles.inspirationContainer}
                        inputContainerStyle={styles.inspirationInputContainer}
                        errorStyle={{ display: "none" }}
                        textContentType={"fullStreetAddress"}
                        value={inspirationOfArtwork}
                        onChangeText={setInspirationOfArtwork}
                        onBlur={() => handlerVerify("inspiration")}
                        errorStyle={(errorInspirationOfArtwork) ? styles.errorMessage : { display: "none" }}
                        errorMessage="¿De verdad no te inspiraste en nada?, no seas tímido y dile a las personas."
                    />
                 
                  
                    <Button
                        containerStyle={styles.postButtonContainer}
                        buttonStyle={styles.postButton}
                        titleStyle={styles.postButtonTitle}
                        title="Publicar"
                        onPress={() => handlerVerify("form")}
                    />
                </LinearGradient>
            </AnimatedScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        flex: 1,
    },
    linearGradientContainer: {
        flex: 1,
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 10,
    },
    title: {
        fontFamily: "Aktiv_Bold",
        fontSize: 30,
        color: "#F56700",
        marginTop: 20,
        marginBottom: 10,
    },
    recomendations: {
        fontFamily: "Aktiv_Normal",
        fontSize: 12,
        color: "#b0b0b0",
        marginBottom: 20,
    },
    imageSelector: {
        backgroundColor: "#f0f0f0",
        borderRadius: 10,
        marginBottom: 25,
        position: "relative",
        overflow: "visible",
        alignItems: "center",
        justifyContent: "center",
    },
    imageSelectorButton: {
        height: height * 0.2,
        alignSelf: "center",
        backgroundColor: "transparent",
        // position: "absolute",
        zIndex: 50,
        top: 0,
        left: 0,
        overflow: "visible",
    },
    imageSelectorIcon: {
        fontSize: 40,
        color: "#2F3640",
        backgroundColor: "#ffffff90",
        padding: 15,
        borderRadius: 10,
        overflow: "visible",
        // zIndex: -1,
    },
    imageArtWorkSelected: {
        // position: "absolute",
        height: height * 0.2,
        width: width * 0.4,
        top: 0,
        left: 0,
        zIndex: 10,
    },
    artworkNameInputContainer: {
        borderWidth: 1,
        borderColor: "#dfdfdf",
        borderRadius: 6,
        marginBottom: 25,
        fontFamily: "Aktiv_Normal",
        fontSize: 17,
        color: "black",
        backgroundColor: "white",
        paddingTop: 10,
        paddingBottom: 10,
    },
    inputContainer: {
        borderBottomWidth: 0,
    },
    titleComponent: {
        marginBottom: 10,
        fontFamily: "AktivMedium",
        fontSize: 16,
        color: "#192A56",
    },
    picker: {
        borderRadius: 6,
        borderColor: "#d0d0d0",
        backgroundColor: "white",
        borderWidth: 2,
        padding: 10,
        marginBottom: 25,
    },
    pickerItem: {
        fontFamily: "Aktiv_Normal",
    },
    meaningContainer: {
        borderWidth: 1,
        borderColor: "#dfdfdf",
        borderRadius: 6,
        marginBottom: 25,
        fontFamily: "Aktiv_Normal",
        fontSize: 17,
        color: "black",
        backgroundColor: "white",
        paddingTop: 10,
        paddingBottom: 10,
        height: height * 0.2,
    },
    errorMessage: {
        display: "flex",
        color: "red",
        fontFamily: "Aktiv_Normal",
    },
    meaningInputContainer: {
        borderBottomWidth: 0,
    },
    inspirationContainer: {
        borderWidth: 1,
        borderColor: "#dfdfdf",
        borderRadius: 6,
        marginBottom: 25,
        fontFamily: "Aktiv_Normal",
        fontSize: 17,
        color: "black",
        backgroundColor: "white",
        paddingTop: 10,
        paddingBottom: 10,
    },
    inspirationInputContainer: {
        borderBottomWidth: 0,
    },
    chbxSellContainer: {
        backgroundColor: "transparent",
        borderWidth: 0,
        paddingLeft: 0,
        marginLeft: 0,
        marginBottom: 25,
        marginTop: 0
    },
    priceContainer: {
        borderWidth: 1,
        borderColor: "#dfdfdf",
        borderRadius: 6,
        marginBottom: 25,
        fontFamily: "Aktiv_Normal",
        fontSize: 17,
        color: "black",
        backgroundColor: "white",
        paddingTop: 10,
        paddingBottom: 10,
    },
    priceInputContainer: {
        borderBottomWidth: 0,
    },
    postButton: {
        backgroundColor: "#2F363F",
        height: 60,
        borderRadius: 15,
    },
    postButtonContainer: {
        marginBottom: 25,
    },
    postButtonTitle: {
        fontFamily: "Aktiv_Bold",
        fontSize: 17,
        color: "white",
    }
});

export default NewPublicationForm;
