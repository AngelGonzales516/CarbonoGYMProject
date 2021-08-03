import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Dimensions, ScrollView } from "react-native";
import { Input, Text, Button } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { validate } from "email-validator";
import Alert from "../../Shared/Alert";
import { firebase } from "../../../Firebase";
import { NavigationHelpersContext } from "@react-navigation/core";
import * as Font from 'expo-font'
import { Context as AuthContext } from '../../../Providers/AuthProvider';
import { Feather, Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get("window");

const FormLogin = ({
    callback,
    moveToFeed,
    moveToRecover,
    navigation
}) => {

    const { state, signin, clearErrorMessage } = useContext(AuthContext);
    const [showAlert, setShowAlert] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [error, setError] = useState(undefined);
    const [fonstLoaded, setFonstLoaded] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [saludo, setSaludo] = useState("Bienvenido A Carbono GYM")

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
        } else if (input === "password") {
            if (!password) setPasswordError(true);
            else setPasswordError(false);
        }
    };

    const handleLogin = () => {

        signin(email, password);

    };

    if (!fonstLoaded) {
        return null
    }

    return (
        <SafeAreaView
            style={styles.formLoginContainer}
        >
            {
                error ? <Alert
                    type="error"
                    title={error}
                    clic

                /> : null
            }

            <View style={styles.TexConteiner}>
                <Text
                    style={styles.greeting}
                >{saludo}</Text>
            </View>

            <ScrollView
                alwaysBounceVertical={true}
                horizontal={false}
                centerContent={true}
                directionalLockEnabled={true}
                alwaysBounceHorizontal={false}
                style={styles.scrollContainer}
            >


                <Input
                    label="Correo o usuario"
                    leftIcon={
                        <Feather
                            name="user"
                            color="#606B7A"
                            size={27}
                        />
                    }
                    leftIconContainerStyle={styles.inputLeftIcon}
                    labelStyle={styles.label}
                    inputStyle={styles.input}
                    inputContainerStyle={styles.inputContainer}
                    containerStyle={styles.containterAllInput}
                    keyboardType="email-address"
                    value={email}
                    textContentType="emailAddress"
                    autoCapitalize="none"
                    onChangeText={setEmail}
                    onBlur={() => {
                        handleVerify("email");
                    }}
                    errorStyle={(emailError) ? styles.errorMessages : { display: "none" }}
                    errorMessage="Te olvidaste de ingresar tu correo"
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
                    labelStyle={styles.label}
                    inputStyle={styles.input}
                    inputContainerStyle={styles.inputContainer}
                    secureTextEntry={false}
                    secureTextEntry={!showPassword}
                    containerStyle={styles.containterAllInputPasswd}
                    keyboardType="default"
                    textContentType="password"
                    autoCorrect={false}
                    value={password}
                    onChangeText={setPassword}
                    onBlur={() => {
                        handleVerify("password");
                    }}
                    errorStyle={(passwordError) ? styles.errorMessages : { display: "none" }}
                    errorMessage="Te olvidaste de ingresar tu contraseña"
                />
                <Button
                    title="Olvidé mi contraseña"
                    type="clear"
                    titleStyle={styles.forgotPasswordTitle}
                    containerStyle={styles.forgotPasswordContainer}
                    onPress={moveToRecover}
                />
                <Button
                    title="Login"
                    titleStyle={styles.loginButtonTitle}
                    buttonStyle={styles.loginButtonContainer}
                    onPress={handleLogin}
                />
                <Text
                    style={styles.questionCreateAccount}
                >
                    ¿No tenés un cuenta en Basquiat?
                </Text>
                <Button
                    title="Creá una cuenta"
                    titleStyle={styles.createAccountButtonTitle}
                    buttonStyle={styles.createAccountButtonContainer}
                    onPress={callback}
                />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    formLoginContainer: {
        position: "absolute",
        backgroundColor: "#F56700",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        bottom: 0,
        height: height * 0.9,
        width: width,
        zIndex: 10,
        paddingRight: 40,
        paddingLeft: 40,
        paddingTop: 40,
        alignItems: "center",
        flex: 1,
    },
    errorMessages: {
        display: "flex",
        color: "red",
    },
    TexConteiner :{
        alignContent:"center",
        alignItems:'center'

    }

    ,
    greeting: {
        fontFamily: "AktivBold",
        fontSize: 40,
        color: "#fcfcfc",
        zIndex: 10,

        maxWidth: width * 0.65,
        marginLeft: -70,
    }
    ,
    scrollContainer: {
        flex: 1,
        width: width * 0.8,
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
    containterAllInputPasswd: {
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#adadad",
        marginBottom: 10,
        backgroundColor: "white",

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    inputLeftIcon: {
        marginRight: 5,
    },
    forgotPasswordTitle: {
        fontFamily: "AktivMedium",
        color: "#192A56",
        fontSize: 15,
        right: 0
    },
    forgotPasswordContainer: {
        alignSelf: "flex-end",
        marginBottom: 15,
    },
    loginButtonTitle: {
        fontFamily: "AktivMedium",
        color: "#fafafa",
        fontSize: 17,
    },
    loginButtonContainer: {
        backgroundColor: "#2f3640",
        borderRadius: 6,
        width: width * 0.8,
        height: 50,
        marginBottom: 30,
    },
    questionCreateAccount: {
        fontFamily: "AktivLight",
        color: "#2f3640",
        fontSize: 13,
        alignSelf: "center",
        marginBottom: 5,
    },
    createAccountButtonTitle: {
        fontFamily: "AktivMedium",
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

export default FormLogin;
