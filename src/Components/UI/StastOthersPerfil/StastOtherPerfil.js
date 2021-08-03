import React from "react"
import { Dimensions, StyleSheet, View, Text } from "react-native"

import { Card, ListItem, Button, Icon, colors } from 'react-native-elements'

const { width, height } = Dimensions.get("screen");


const StasOtherPerfil = ({ seguidores }) => {
  /*  const buttons = [
        { label: "post", element: name1 },
        { label: "seguidores", element: name2 },
        { label: "ventas", element: name3 },
    ]*/
    return (
        <View style={style.VConteiner} >
            <Text style={style.TextL}>seguidores</Text>
            <Text style={style.TextSt}>{seguidores}</Text>
        </View>

    );

}

const style = StyleSheet.create({
    conteiner: {

        flexDirection: "row",
        width: width * 0.35,
        height: height * 0.02,

    },
    TextL: {
        fontSize: 12,
        color: "#487EB0"
    }
    ,
    TextSt: {
        fontSize: 17,
        color: "#2f3640",


    },
    VVConteiner: {
        alignContent: "center",
        alignItems: "center",
        width: width * 0.15,
        height: height * 0.03,
        marginBottom: 10

    },
    VConteiner: {
        backgroundColor: "#AFEEEE",
        alignItems: "center",
        flexDirection: "column",
        width: width * 0.35,
        height: height * 0.06,
        borderRadius: 10

    }
});

export default StasOtherPerfil