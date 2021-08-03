import React, { useState, useEffect,useContext } from "react";
import { StyleSheet, View, Dimensions, ScrollView } from "react-native";
import { Input, Text, Button } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { validate } from "email-validator";
import Alert from "../../Shared/Alert";
import { firebase } from "../../../Firebase";
import { NavigationHelpersContext } from "@react-navigation/core";
import * as Font from 'expo-font'
import {Context as AuthContext} from '../../../Providers/AuthProvider'

const { width, height } = Dimensions.get("window");

const FormRecover = ({back}) => {
    const { state,  forggotPassword, clearErrorMessage } = useContext(AuthContext);
    const [showAlert, setShowAlert] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [error, setError] = useState(undefined);
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
        back()
    }

   if  (!fonstLoaded) {
       return null
   } else {

    return (
        <View style={styles.formRecoverContainer}>

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
                    onPress={back}
                />
            </ScrollView>
        </View>
    )}
}



const styles = StyleSheet.create({
    formRecoverContainer: {
        position: "absolute",
        backgroundColor: "#F56700",
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
        color:"#ffffff",
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
})

export default FormRecover;