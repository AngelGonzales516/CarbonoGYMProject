import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, ImageBackground, View, Dimensions } from "react-native";
import { Input, Text, Button } from "react-native-elements";
import ButtonActions from "../../UI/Button/Button";
import { ScrollView } from "react-native-gesture-handler";
import { validate } from "email-validator";
import Alert from "../../Shared/Alert";
import * as Font from 'expo-font'
import { Context as AuthContext } from '../../../Providers/AuthProvider'
import Icon from "react-native-vector-icons/FontAwesome";
import { Feather, Ionicons } from '@expo/vector-icons';
import * as ImagePicker from "expo-image-picker";

const { width, height } = Dimensions.get("window");

const FormSignup = ({ back }) => {
    const { state, signup } = useContext(AuthContext);
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [fullnameError, setFullnameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [error, setError] = useState(null);
    const [showAlert, setShowAlert] = useState(true);
    const [fonstLoaded, setFonstLoaded] = useState(false);


    const [imageArtWorkDimensions, setImageArtworkDimension] = useState([]);
    const [completeImage, setCompleteImage] = useState(null);

    const [imageArtWork, setImageArtwork] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [perfileTime, setPerfileTime] = useState(Date.now())
    const [imageError, setImateError] = useState(null)

    // STATES DE PRUEBA PARA CUANDO EL USUARIO DA CLICK EN UN INPUT
    const [fullNameInputTitle, setFullNameInputTitle] = useState("Nombre completo");
    const [clickOnFullNameInputTitle, setClickOnFullNameInputTitle] = useState(false);

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

        //console.log("resultado: ", result.height, result.width);

        if (!result.cancelled) {
            if (!result.cancelled) {
                setCompleteImage(result);
                setImageArtwork(`data:image/jpg;base64,${result.base64}`);
                setImageArtworkDimension([result.height, result.width])
            }
        }
    };

    // funcion para cargar las fuentes con mayor eficacia
    const loadFonts = async () => {

        await Font.loadAsync({
            Aktiv_Light: require("../../../Assets/Fonts/AktivGroteskCorp-Light.ttf"),
            Aktiv_Normal: require("../../../Assets/Fonts/AktivGroteskCorp-Regular.ttf"),
            Aktiv_Medium: require("../../../Assets/Fonts/AktivGroteskCorp-Medium.ttf"),
            Aktiv_Bold: require("../../../Assets/Fonts/AktivGroteskCorp-Bold.ttf"),
            PlayFair: require("../../../Assets/Fonts/PlayfairDisplay-Regular.ttf")
        });

        setFonstLoaded(true);
    }

    useEffect(() => {
        loadFonts()
    }, [])

    useEffect(() => {
        if (state.errorMessage) setError(state.errorMessage);
    }, [state.errorMessage]);

    useEffect(() => {
        if (state.registered);
    }, [state]);

    //verifica que los datos ingresados son correctos
    const handlerVerify = (input) => {

        //verificar imagen
        if (input === "image") {
            if (!imageArtWork) {
                setImateError(true)
            } else
                setImateError(false)
        } else

            if (input === "fullname") {

                //Verificar el nombre del usuario
                if (!fullname) {
                    setClickOnFullNameInputTitle(false);
                    setFullnameError(true)
                }
                else
                    setFullnameError(false);
            } else if (input === "email") {
                //Verificar el correo electronico
                if (!email)
                    setEmailError(true);
                else if (!validate(email))
                    setEmailError(true);
                else setEmailError(false);
            } else if (input === "password") {
                //Verificar la contraseña
                if (!password)
                    setPasswordError(true);
                else if (password.length < 6)
                    setPasswordError(true);
                else setPasswordError(false);
            } else if (input === "confirmPassword") {
                //Verificar la confirmacion de la contraseña
                if (!confirmPassword)
                    setConfirmPasswordError(true);
                else if (confirmPassword !== password)
                    setConfirmPasswordError(true);
                else setConfirmPasswordError(false);
            }
            else if (input === "signup") {
                if (

                    !fullnameError &&
                    !emailError &&
                    !passwordError &&
                    !confirmPasswordError &&


                    fullname &&
                    email &&
                    password &&
                    confirmPassword
                ) {
                    signup(
                        fullname,
                        email,
                        password,
                        completeImage ? completeImage: 'https://reactnative.dev/img/tiny_logo.png',
                        perfileTime
                    );
                    // back()
                }

                else setError("All fields are required!");
            }

    }

    if (!fonstLoaded) {
        return null
    }
    return (<View style={styles.formLoginContainer}>
        {
            showAlert
            && error
            && <Alert
                type="error"
                title={error}
            />
        }
        <ScrollView>
            <Text style={styles.title}>Dile al mundo quien eres</Text>
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
                    onBlur={() => {
                        handlerVerify("image")
                    }}

                />
            </ImageBackground>
            <Input
                label="Nombre completo"
                leftIcon={<Feather
                    name="user"
                    color="#606B7A"
                    size={25}
                />}
                textContentType="name"
                keyboardType="default"
                autoCapitalize="words"
                leftIconContainerStyle={styles.inputLeftIcon}
                value={fullname}
                labelStyle={styles.label}
                inputStyle={styles.input}
                inputContainerStyle={styles.inputContainer}
                secureTextEntry={false}
                containerStyle={styles.containterAllInput}
                onChangeText={setFullname} onBlur={() => {
                    handlerVerify("fullname");
                }}
                errorStyle={(fullnameError) ? styles.errorMessages : { display: "none" }}
                errorMessage="Ups, ¡al parecer no pusiste un nombre correcto! *"
            />

            <Input
                label="Email"
                leftIcon={<Feather
                    name="mail"
                    color="#606B7A"
                    size={25}
                />}
                keyboardType="email-address"
                autoCapitalize="none"
                leftIconContainerStyle={styles.inputLeftIcon}
                labelStyle={styles.label}
                inputStyle={styles.input}
                inputContainerStyle={styles.inputContainer}
                secureTextEntry={false}
                containerStyle={styles.containterAllInput}
                value={email}
                onChangeText={setEmail} onBlur={() => {
                    handlerVerify("email");
                }}
                errorStyle={(emailError) ? styles.errorMessages : { display: "none" }}
                errorMessage="Por favor ingresa tu nombre email. *"
            />
            <Input
                label="Contraseña"
                leftIcon={<Feather
                    name="lock"
                    color="#606B7A"
                    size={25}
                />}
                leftIconContainerStyle={styles.inputLeftIcon}
                rightIcon={
                    <Feather
                        name={(showPassword) ? "eye-off" : "eye"}
                        color="#606B7A"
                        size={25}
                        onPress={() => setShowPassword(!showPassword)}
                    />
                }
                autoCorrect={false}
                keyboardType="default"
                textContentType="password"
                labelStyle={styles.label}
                inputStyle={styles.input}
                inputContainerStyle={styles.inputContainer}
                secureTextEntry={!showPassword}
                containerStyle={styles.containterAllInput}
                value={password}
                onChangeText={setPassword}
                onBlur={() => {
                    handlerVerify("password");
                }}
                errorStyle={(passwordError) ? styles.errorMessages : { display: "none" }}
                errorMessage="Por favor ingresá una contraseña. *"
            />
            <Input
                label="Confirmar contraseña"
                leftIcon={<Feather
                    name="lock"
                    color="#606B7A"
                    size={25}
                />}
                rightIcon={
                    <Feather
                        name={(showPasswordConfirm) ? "eye-off" : "eye"}
                        color="#606B7A"
                        size={25}
                        onPress={() => setShowPasswordConfirm(!showPasswordConfirm)}
                    />
                }
                autoCorrect={false}
                textContentType="password"
                keyboardType="default"
                leftIconContainerStyle={styles.inputLeftIcon}
                labelStyle={styles.label}
                inputStyle={styles.input}
                inputContainerStyle={styles.inputContainer}
                secureTextEntry={!showPasswordConfirm}
                containerStyle={styles.containterAllInput}
                value={confirmPassword}
                onChangeText={setConfirmPassword} onBlur={() => {
                    handlerVerify("confirmPassword");
                }}
                errorStyle={(confirmPasswordError) ? styles.errorMessages : { display: "none" }}
                errorMessage="Por favor, volvé a ingresar su contraseña. *"
            />

            <ButtonActions style={styles.bottons} title1="Crear cuenta" press={() => { handlerVerify("signup") }} />
            <ButtonActions style={styles.bottons2} style2={{ color: "#2f3640" }} title1="Cancelar" press={back} />

        </ScrollView>
    </View>);
}

const styles = StyleSheet.create({
    formLoginContainer: {
        position: "absolute",
        backgroundColor: "#F56700",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        bottom: 0,
        height: height * 0.75,
        width: width,
        zIndex: 10,
        paddingTop: 40,
        alignItems: "center",
        justifyContent: "center"
    },
    imageSelector: {
        backgroundColor: "#f0f0f0",
        borderRadius: 10,
        marginBottom: 25,
        position: "relative",
        overflow: "visible",
        alignItems: "center",
        justifyContent: "center",
    }
    ,
    errorMessages: {
        display: "flex",
        color: "red",
    },
    title: {
        fontSize: 20,
        fontFamily: "Aktiv_Medium",
        marginBottom: 20,
    },
    label: {
        fontSize: 13,
        fontFamily: "AktivLight",
        color: "#606B7A",
        marginTop: 10
    },
    input: {
        fontFamily: "AktivMedium",
        color: "#2f3640",
        fontSize: 20,
    },
    inputContainer: {
        borderBottomWidth: 0,
        backgroundColor: "white",
        justifyContent: "flex-end",
        paddingBottom: 10,
        paddingTop: 10,
    },
    containterAllInput: {
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#adadad",
        marginBottom: 30,
        backgroundColor: "white",
        justifyContent: "flex-end",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    inputTitle: {
        fontFamily: "Aktiv_Normal",
        fontSize: 16,
        marginBottom: 10,
    },
    inputLeftIcon: {
        marginRight: 5,
    },
    bottons: {
        width: width * 0.8,
        height: height * 0.07,
        borderRadius: 15,
        backgroundColor: "#2f3640",
    },
    bottons2: {
        marginTop: 15,
        width: width * 0.8,
        height: height * 0.07,
        borderRadius: 15,
        backgroundColor: "#F0F0F0",
        color: "#2f3640",
        marginBottom: 50,
    },
    imageSelector: {
        backgroundColor: "#f0f0f0",
        borderRadius: 200,
        marginBottom: 25,
        position: "relative",
        overflow: "visible",
        alignItems: "center",
        justifyContent: "center",
        height: 200,
        width: 200,
        alignSelf: "center",
    },
    imageSelectorButton: {
        height: height * 0.2,
        alignSelf: "center",
        backgroundColor: "transparent",
        borderRadius: 200,
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
        height: 200,
        width: 200,
        borderRadius: 200,
        top: 0,
        left: 0,
        zIndex: 10,
    },
})


export default FormSignup