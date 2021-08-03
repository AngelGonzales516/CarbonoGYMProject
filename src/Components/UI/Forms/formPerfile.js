import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View,  ImageBackground,Dimensions, ScrollView,Switch } from "react-native";
import { Input, Text, Button } from "react-native-elements";
import { Context as PerfileContext } from '../../../Providers/perfileProviders'
import { Context as AuthContext } from "../../../Providers/AuthProvider"
//import ImagePicker from "../ImagePicker/ImagePicker"
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";
import * as Font from 'expo-font'

const { width, height } = Dimensions.get("window");

const FormPerfile = ({ navigation }) => {
    const { state: perfileState, updatePerfile } = useContext(PerfileContext)
    const { state } = useContext(AuthContext)

     // state para los elementos del picker seleccionado
     const [selectedPickerValue, setSelectedPickerValue] = useState("");
     const [errorSelectedPickerValue, setErrorSelectedPickerValue] = useState(false);

      // state donde va la imágen
      const [imageArtWork, setImageArtwork] = useState(null);
      const [imageArtWorkDimensions, setImageArtworkDimension] = useState([]);
      const [completeImage, setCompleteImage] = useState(null);
      const [errorImageArtWork, setErrorImageArtwork] = useState(false);

    const [userName, setUserName] = useState("")
    const [aboutme, setaboutme] = useState("")
    const [mystate, setmystate] = useState("")
    const [edad, setEdad] = useState("")
    const [perfileTime, setPerfileTime] = useState(Date.now())
    const [userNameError,setUserNameError]= useState (false)
    const [fonstLoaded, setFonstLoaded] = useState(false)

    const loadFonts = async () => {

        await Font.loadAsync({
            AktivLight: require("../../../Assets/Fonts/AktivGroteskCorp-Light.ttf"),
            AktivNormal: require("../../../Assets/Fonts/AktivGroteskCorp-Regular.ttf"),
            AktivMedium: require("../../../Assets/Fonts/AktivGroteskCorp-Medium.ttf"),
            AktivBold: require("../../../Assets/Fonts/AktivGroteskCorp-Bold.ttf"),
            PlayFair: require("../../../Assets/Fonts/PlayfairDisplay-Regular.ttf")
        });

        setFonstLoaded(true)

    }

    useEffect(() => {
        loadFonts()
    }, [])

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
      //  console.log("resultado: ", result.height, result.width);

        if (!result.cancelled) {
            setCompleteImage(result);
            setImageArtwork(`data:image/jpg;base64,${result.base64}`);
            setImageArtworkDimension([result.height, result.width])
        }
    };

    useEffect(() => {
        if (perfileState.currentPerfile.id) {
            setUserName(perfileState.currentPerfile.userName)
            setmystate(perfileState.currentPerfile.aboutme)
            setaboutme(perfileState.currentPerfile.mystate)
            setEdad(perfileState.currentPerfile.edad)
        }
    }, [perfileState.currentPerfiles])
    //console.log( "Current data "+perfileState.currentPerfile[0]);
    const updatePerfiles = () => {

        updatePerfile(state.user.id,
            userName ,
            perfileTime, 
            completeImage ,
            aboutme,
            mystate,
            edad )
            navigation()
    }

    if (!fonstLoaded) {
        return null
    }

    return (
        <View style={style.FormConteiner}>

                    <ImageBackground
                        source={(imageArtWork && { uri: imageArtWork })}
                        imageStyle={{ borderRadius: 10 }}
                        style={[
                            style.imageSelector, (imageArtWorkDimensions.length > 0)
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
                            icon={<Icon name="image" style={style.imageSelectorIcon} />}
                            buttonStyle={style.imageSelectorButton}
                            iconContainerStyle={style.imageSelectorIconContainer}
                            onPress={pickImage}
                        />
                    </ImageBackground>
                     
            <Input
                label="Nombre de Usuario"
                labelStyle={style.label}
                inputStyle={style.input}
                value={userName}
                onChangeText={setUserName}
                secureTextEntry={false}
            />
            <Input label="acerca de mi"
                labelStyle={style.label}
                inputStyle={style.input}
                value={aboutme}
                onChangeText={setaboutme}
            />
            <Input label="My estado"
                labelStyle={style.label}
                inputStyle={style.input}
                value={mystate}
                onChangeText={setmystate}
            />
            <Input label="Edad"
                labelStyle={style.label}
                inputStyle={style.input}
                value={edad}
                onChangeText={setEdad}
            />

            <Button
                title="Listo"
                titleStyle={style.ButtonTitle}
                buttonStyle={style.ButtonContainer}
                onPress={updatePerfiles}
            />
            <Button
                title="regresar"
                titleStyle={style.ButtonTitle}
                buttonStyle={style.logoutButton}
                onPress={() => { navigation() }}
            />
        </View>
    )
}


const style = StyleSheet.create({
    FormConteiner: {
        margin: 20,
        padding: 10,
        backgroundColor: "#fcfcfc",
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
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
    label: {
        fontSize: 13,
        fontFamily: "Aktiv_Light",
        color: "#606B7A",
        marginBottom: 1,
        marginTop: 10
    },
    input: {
        fontFamily: "Aktiv_Medium",
        color: "#2f3640",
        fontSize: 20,
    },
    ButtonTitle: {
        fontFamily: "AktivMedium",
        color: "#fafafa",
        fontSize: 17,
    },
    ButtonContainer: {
        backgroundColor: "#2f3640",
        borderRadius: 6,
        alignSelf: "center",
        width: width * 0.8,
        height: 50,
        marginBottom: 10,
    },
    logoutButton: {
        width: width * 0.8,
        backgroundColor: "#e84118",
        marginTop: 5,
        alignSelf: "center",
        borderRadius: 6,
        marginBottom: 10,
    },
    errorMessages: {
        display: "flex",
        color: "red",
    },
})

export default FormPerfile