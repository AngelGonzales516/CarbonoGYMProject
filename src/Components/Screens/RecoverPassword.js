import React, { useState, useEffect,useContext } from "react";
import { StyleSheet, View, ImageBackground, Dimensions, Image, ScrollView, Alert } from "react-native";
import { Input, Text, Button } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { validate } from "email-validator";
//import Alert from '../Shared/Alert'
import {Context as AuthContext} from '../../Providers/AuthProvider'
import FormRecover from '../UI/Forms/FormRecover'
import * as Font from 'expo-font';

const { width, height } = Dimensions.get("screen");

const RecoverPassword = ({ navigation }) => {
   const { state,  forggotPassword, clearErrorMessage } = useContext(AuthContext);
    const [fonstLoaded, setFonstLoaded] = useState(false)
    const [showAlert, setShowAlert] = useState(true);
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [error, setError] = useState(undefined);

    /*   let [fonts] = useFonts({
           "Aktiv-Light": require("../../Assets/Fonts/AktivGroteskCorp-Light.ttf"),
           "Aktiv-Normal": require("../../Assets/Fonts/AktivGroteskCorp-Regular.ttf"),
           "Aktiv-Medium": require("../../Assets/Fonts/AktivGroteskCorp-Medium.ttf"),
           "Aktiv-Bold": require("../../Assets/Fonts/AktivGroteskCorp-Bold.ttf"),
           "PlayFair": require("../../Assets/Fonts/PlayfairDisplay-Regular.ttf")
       });
       */

    const loadFonts = async () => {

        await Font.loadAsync({
            Aktiv_Light: require("../../Assets/Fonts/AktivGroteskCorp-Light.ttf"),
            Aktiv_Normal: require("../../Assets/Fonts/AktivGroteskCorp-Regular.ttf"),
            Aktiv_Medium: require("../../Assets/Fonts/AktivGroteskCorp-Medium.ttf"),
            Aktiv_Bold: require("../../Assets/Fonts/AktivGroteskCorp-Bold.ttf"),
            PlayFair: require("../../Assets/Fonts/PlayfairDisplay-Regular.ttf")
        });

        setFonstLoaded(true)

    }

    useEffect(() => {
        loadFonts()
    }, [])

    useEffect(() => {
        if (state.errorMessage) clearErrorMessage();
      }, []);
    
      useEffect(() => {
        if (state.errorMessage) setError(state.errorMessage);
      }, [state.errorMessage]);


    const handleVerify = (input) => {
        if (input === "email") {
            if (!email) setEmailError(true);
            else if (!validate(email)) setEmailError(true);
            else setEmailError(false);
        }

    };

    const verifyPassword = () => {
       
       forggotPassword(email);

    }


    if (!fonstLoaded) {
        return null
    }
    return (
        <View style={styles.container}>
            <Text style={styles.titleAppName}>GYM || Cuenta</Text>
            <Text
                style={styles.greeting}
            >Restablecer Contraseña</Text>

        <FormRecover back={() => navigation.goBack()}/>

            <Image style={styles.loginImageBackground}
                source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
            />

        </View>
    );
}


// <FormRecover/>
/*  <View style={styles.formRecoverContainer}>

                <ScrollView>
                    <Text style={styles.NoteConteiner}>
                        Nota: Ingrese su correo electronico y presione confirmar,
                        recibira una notificacion en su correo y entre al link para restablecer la contraseña
                    </Text>

                    <Input
                        label="Correo o usuario"
                        labelStyle={styles.label}
                        inputStyle={styles.input}
                        inputContainerStyle={styles.inputContainer}
                        placeholder="DaVinci"
                        containerStyle={styles.containterAllInput}
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                        onBlur={() => {
                            handleVerify("email");
                        }}
                        errorMessage={
                            emailError
                                ? "Te olvidaste de ingresar tu correo"
                                : null
                        }
                    />


                    <Button
                        title="Confirmar"
                        titleStyle={styles.loginButtonTitle}
                        buttonStyle={styles.loginButtonContainer}
                        onPress={verifyPassword}
                    />

                    <Button
                        title="Cancelar"
                        titleStyle={styles.createAccountButtonTitle}
                        buttonStyle={styles.createAccountButtonContainer}
                        onPress={() => navigation.goBack()}
                    />
                </ScrollView>
            </View> */

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        backgroundColor: "#2F3640",
        overflow: "hidden",
    },
    loginImageBackground: {
        height: height * 1,
        width: width * 3,
        resizeMode: "cover",
        paddingLeft: 0,
        position: "absolute",
        left: -70,
    },
    titleAppName: {
        fontFamily: "PlayFair",
        color: "#fafafa",
        textAlign: "center",
        fontSize: 35,
        marginTop: 50,
        zIndex: 10
    },
    greeting: {
        fontFamily: "Aktiv_Bold",
        fontSize: 35,
        width: 250,
        color: "#ffffff",
        zIndex: 10,
        marginLeft: 10,
        marginTop: 20,
        backgroundColor:"#F56700",
        textAlign: 'center',
        opacity: 0.9,
        borderRadius: 12

    },




    formRecoverContainer: {
        position: "absolute",
        backgroundColor: "#fcfcfc",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        bottom: 0,
        height: height * 0.6,
        width: width,
        zIndex: 10,
        paddingRight: 40,
        paddingLeft: 30,
        paddingTop: 40,
        alignItems: "flex-start",
    },
    NoteConteiner:{
        borderWidth:2,
        borderColor:"#000000",
        padding:6,
        marginBottom:15,
        fontFamily: "Aktiv_Medium",
        fontSize:15
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
    inputContainer: {
        borderBottomWidth: 0,
        backgroundColor: "white",
    },
    containterAllInput: {
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#adadad",
        marginBottom: 30,
        backgroundColor: "white",

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    loginButtonTitle: {
        fontFamily: "Aktiv_Medium",
        color: "#fafafa",
        fontSize: 17,
    },
    loginButtonContainer: {
        backgroundColor: "#2f3640",
        borderRadius: 6,
        width: width * 0.8,
        height: 50,
        marginBottom: 30,
        marginTop: 16
    },
    createAccountButtonTitle: {
        fontFamily: "Aktiv_Medium",
        color: "#192A56",
        fontSize: 17,
    },
    createAccountButtonContainer: {
        backgroundColor: "#F0F0F0",
        borderRadius: 6,
        width: width * 0.8,
        height: 50,
        marginBottom: 30,
    },
    
});

export default RecoverPassword;

/*   <ImageBackground
                source={{
                    uri: require("../../assets/fondo-login.gif")
                }}
                style={styles.loginImageBackground}
            > */