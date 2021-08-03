import React from "react"
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Input} from "react-native-elements";
import {handlerVerify} from "../../Screens/CreateUser"

const { width, height } = Dimensions.get("screen");

const Frm = ({title,content,contentSet,secure,capitalize,val,msj}) => {
    //title = "Usuario"
    return (
        <View>
            
            <Text style={styles.styleTitle}>
                {title}
            </Text>
            <Input value={content}
                        onChangeText={contentSet} 
                        style={styles.input}
                        secureTextEntry={secure}
                        autoCapitalize={capitalize}
                        errorMessage={val ? msj : ""}
            >
            </Input>
        </View>
    );
    
}

const styles = StyleSheet.create({
    styleTitle: {
      fontSize: 20,
      marginBottom: 8,
    },
    input: {
        borderWidth: 2,
        borderRadius: 7,
        borderColor: 'black',
        fontSize: 20,
        width: width * 0.8,
        marginBottom: 20
    }
});

export default Frm