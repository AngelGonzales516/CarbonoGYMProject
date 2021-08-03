import React from "react";
import { SafeAreaView, StatusBar, Platform } from "react-native";
import { Dimensions, StyleSheet, View } from "react-native";
import { Button, Image, Text } from "react-native-elements";
import NewPublicationForm from "../UI/NewPublication/NewPublicationForm"

const {
    width,
    height
} = Dimensions.get("window");

const NewPublication = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Button
                    title="Cancelar"
                    containerStyle={styles.cancelButtonContainer}
                    buttonStyle={styles.cancelButton}
                    titleStyle={styles.cancelButtonTitle}
                    onPress={() => navigation.goBack()}
                />
            </View>
            <NewPublicationForm navigation={navigation} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    cancelButtonContainer: {
        width: width * 0.3,
        alignSelf: "flex-start",
        borderRadius: 6,
        marginTop: 10,
    },
    cancelButton: {
        backgroundColor: "#f0f0f0",
    },
    cancelButtonTitle: {
        color: "#192A56",
        fontFamily: "Aktiv_Medium",
    },
});

export default NewPublication;
